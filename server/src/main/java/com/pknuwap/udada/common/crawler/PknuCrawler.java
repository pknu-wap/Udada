package com.pknuwap.udada.common.crawler;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
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
            DateTimeFormatter.ofPattern("yyyy.MM.dd");

    public List<CrawledNotice> crawl() {
        List<CrawledNotice> results = new ArrayList<>();

        try {
            Document doc = Jsoup.connect(TARGET_URL)
                    .userAgent("Mozilla/5.0")
                    .timeout(10_000)
                    .get();

            // 공지사항 목록 행 선택
            Elements rows = doc.select("table.bdListTbl tbody tr");

            for (Element row : rows) {
                // 공지 고정글(notice 클래스) 제외
                if (row.hasClass("notice")) continue;

                Element titleEl = row.selectFirst("td.bdlTitle a");
                Element dateEl = row.selectFirst("td.bdlDate");

                if (titleEl == null || dateEl == null) continue;

                String title = titleEl.text().trim();
                String relUrl = titleEl.attr("href");
                String originalUrl = relUrl.startsWith("http") ? relUrl : BASE_URL + relUrl;
                String dateStr = dateEl.text().trim();

                LocalDateTime noticedAt = parseDate(dateStr);

                results.add(CrawledNotice.builder()
                        .title(title)
                        .originalUrl(originalUrl)
                        .noticedAt(noticedAt)
                        .build());
            }

            log.info("[PknuCrawler] 크롤링 완료 - 수집된 공지 수: {}", results.size());

        } catch (IOException e) {
            log.error("[PknuCrawler] 크롤링 실패: {}", e.getMessage());
            throw new RuntimeException("크롤링 중 오류가 발생했습니다.", e);
        }

        return results;
    }

    private LocalDateTime parseDate(String dateStr) {
        try {
            return LocalDateTime.parse(dateStr + " 00:00",
                    DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
        } catch (Exception e) {
            log.warn("[PknuCrawler] 날짜 파싱 실패: {}", dateStr);
            return null;
        }
    }
}