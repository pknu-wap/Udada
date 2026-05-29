package com.pknuwap.udada.common.crawler;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class PknuCrawler {

    private static final String TARGET_URL = "https://www.pknu.ac.kr/main/163";
    private static final String BASE_URL = "https://www.pknu.ac.kr";
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd"); // 부경대 페이지 보니까 . 이 아니라 -로 돼있어서 수정함

    public List<CrawledNotice> crawl() {
        List<CrawledNotice> results = new ArrayList<>();

        try {
            Document doc = Jsoup.connect(TARGET_URL)
                    .userAgent("Mozilla/5.0")
                    .timeout(10_000)
                    .get();

            // 디버깅
            System.out.println("====== [Jsoup HTML 출력 시작] ======");
            System.out.println(doc.text()); // 또는 doc.html()
            System.out.println("====== [Jsoup HTML 출력 끝] ======");

            // 공지사항 목록 행 선택
            Elements rows = doc.select("table.brdList tbody tr"); //bdListTbl이 아니라 brdList에 들어있어서 수정함

            for (Element row : rows) {
                // 공지 고정글(notice 클래스) 제외
                if (row.hasClass("noti")) continue;

                Element titleEl = row.selectFirst("td.bdlTitle a");
                Element dateEl = row.selectFirst("td.bdlDate");

                if (titleEl == null || dateEl == null) continue;

                String title = titleEl.text().trim();
                String relUrl = titleEl.attr("href");
                String originalUrl = relUrl.startsWith("?") ? TARGET_URL + relUrl : relUrl;
                String dateStr = dateEl.text().trim();

                LocalDateTime noticedAt = parseDate(dateStr);

                if (noticedAt == null) {
                    noticedAt = LocalDateTime.now();
                }

                DetailResult detailResult = crawlDetailPage(originalUrl);

                results.add(CrawledNotice.builder()
                        .title(title)
                        .originalUrl(originalUrl)
                        .noticedAt(noticedAt)
                        .content(detailResult.getContent())
                        .attachments(detailResult.getAttachments())
                        .build());
            }

            log.info("[PknuCrawler] 크롤링 완료 - 수집된 공지 수: {}", results.size());

        } catch (IOException e) {
            log.error("[PknuCrawler] 크롤링 실패: {}", e.getMessage());
            throw new RuntimeException("크롤링 중 오류가 발생했습니다.", e);
        }

        return results;
    }

    public DetailResult crawlDetailPage(String detailUrl) {
        List<CrawledAttachment> attachments = new ArrayList<>();
        String content = "";

        try {
            Document detailDoc = Jsoup.connect(detailUrl).userAgent("Mozilla/5.0").timeout(5000).get();

            Element contentEl = detailDoc.selectFirst(".bdvTxt");
            if (contentEl != null) {
                content = contentEl.text().trim();
            }

            // 첨부파일 다운로드 링크 수집
            Elements fileLinks = detailDoc.select(".attachedFile a");
            //TODO : 부경대 홈페이지 HTML 보니까 파일 위치가 여기인 것 같긴한데 예외가 있을 듯함..
            for (Element fileLink : fileLinks) {
                String fileName = fileLink.text().trim();
                String relLink = fileLink.attr("href");

                if (relLink.isEmpty() || relLink.startsWith("javascript")) continue;

                // 상대 경로 주소일 경우
                String downloadUrl = relLink.startsWith("http") ? relLink : BASE_URL + relLink;

                attachments.add(new CrawledAttachment(fileName, downloadUrl, "FILE"));
            }

            // 본문 이미지 주소 수집
            Elements images = detailDoc.select(".bdvTxt img"); //TODO: 위와 동일
            for (Element img : images) {
                String src = img.attr("src");
                if (src.isEmpty()) continue;

                String imageUrl = src.startsWith("http") ? src : BASE_URL + src;
                String imgName = "본문이미지_" + System.currentTimeMillis(); // 본문 이미지는 파일명이 따로 없으므로 임의 지정

                attachments.add(new CrawledAttachment(imgName, imageUrl, "IMAGE"));
            }

        } catch (Exception e) {
            log.warn("[PknuCrawler] 상세 페이지 파싱 실패 (URL: {}): {}", detailUrl, e.getMessage());
        }
        return new DetailResult(content, attachments);
    }

    private LocalDateTime parseDate(String dateStr) {
        try {
            return LocalDate.parse(dateStr,DATE_FORMATTER).atStartOfDay();
        } catch (Exception e) {
            log.warn("[PknuCrawler] 날짜 파싱 실패: {}, 에러 원인: {}", dateStr, e.getMessage());
            return null;
        }
    }

    @lombok.Getter
    public static class DetailResult {
        private final String content;
        private final List<CrawledAttachment> attachments;

        public DetailResult(String content, List<CrawledAttachment> attachments) {
            this.content = content;
            this.attachments = attachments;
        }
    }
}
