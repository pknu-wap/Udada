package com.pknuwap.udada.service;

import com.pknuwap.udada.common.crawler.CrawledNotice;
import com.pknuwap.udada.common.crawler.PknuCrawler;
import com.pknuwap.udada.entity.*;
import com.pknuwap.udada.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CrawlService {

    private final PknuCrawler pknuCrawler;
    private final NoticeRepository noticeRepository;
//    private final KeywordRepository keywordRepository;
//    private final UserKeywordRepository userKeywordRepository;
    private final CrawlLogRepository crawlLogRepository;

    @Transactional
    public void crawlAndNotify() {
        LocalDateTime startedAt = LocalDateTime.now();
        String status = "SUCCESS";
        String failReason = null;
        int savedCount = 0;

//        Keyword pknuKeyword = keywordRepository.findById(PKNU_KEYWORD_ID)
//                .orElseThrow(() -> new IllegalStateException("키워드가 존재하지 않습니다."));

        try {
            List<CrawledNotice> crawledList = pknuCrawler.crawl();

            for (CrawledNotice crawled : crawledList) {
                // 1. 이미 수집된 공지사항이면 스킵 (중복 방지)
                if (noticeRepository.existsByOriginalUrl(crawled.getOriginalUrl())) {
                    continue;
                }

                // 2. 새 공지사항 DB 저장
                Notice notice = noticeRepository.save(
                        Notice.builder()
                                .title(crawled.getTitle())
                                .originalUrl(crawled.getOriginalUrl())
                                .noticedAt(crawled.getNoticedAt())
                                .build()
                );
                savedCount++;

                // 3. 키워드 매칭 후 알림 발송
                sendNotificationToMatchedUsers(notice);
            }

            log.info("[CrawlService] 크롤링 완료 - 신규 저장: {}건", savedCount);
        } catch (Exception e) {
            status = "FAILED";
            failReason = e.getMessage();
            log.error("[CrawlService] 크롤링 실패: {}", e.getMessage());
        } finally {
            // 크롤링 로그 저장
            crawlLogRepository.save(CrawlLog.builder()
//                    .keyword(pknuKeyword)
                    .status(status)
                    .parsedCount(savedCount)
                    .failReason(failReason)
                    .startedAt(startedAt)
                    .finishedAt(LocalDateTime.now())
                    .build());
        }
    }

    // 공지사항 제목/본문에 키워드가 포함된 유저에게 알림 발송
    private void sendNotificationToMatchedUsers(Notice notice) {
//        List<Keyword> allKeywords = keywordRepository.findAll();
//
//        for (Keyword keyword : allKeywords) {
//            if (!containsKeyword(notice, keyword.getWord())) continue;
//
//            List<UserKeyword> userKeywords =
//                    userKeywordRepository.findAllByKeywordIdWithUser(keyword.getId());

            // TODO: 논의사항 - 이메일 or 카카오톡 알림톡 유지 (비용 문제)
//            for (UserKeyword userKeyword : userKeywords) {
//                kakaoNotificationService.send(userKeyword.getUser(), notice, keyword);
//            }
//        }
    }

    // 공지 제목 또는 본문에 키워드 포함 여부 확인
    private boolean containsKeyword(Notice notice, String keyword) {
        String lower = keyword.toLowerCase();
        boolean inTitle = notice.getTitle() != null
                && notice.getTitle().toLowerCase().contains(lower);
        boolean inContent = notice.getContent() != null
                && notice.getContent().toLowerCase().contains(lower);
        return inTitle || inContent;
    }
}