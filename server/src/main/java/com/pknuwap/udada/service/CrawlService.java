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
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class CrawlService {

    private final PknuCrawler pknuCrawler;
    private final NoticeRepository noticeRepository;
    private final KeywordRepository keywordRepository;
    private final UserKeywordRepository userKeywordRepository;
    private final CrawlLogRepository crawlLogRepository;
    private final EmailNotificationService emailNotificationService;

    private static final long PKNU_KEYWORD_ID = 1L;

    @Transactional
    public void crawlAndNotify() {
        LocalDateTime startedAt = LocalDateTime.now();
        String status = "SUCCESS";
        String failReason = null;
        int savedCount = 0;

        Keyword pknuKeyword = keywordRepository.findById(PKNU_KEYWORD_ID)
                .orElseThrow(() -> new IllegalStateException("키워드가 존재하지 않습니다."));

        // 유저 ID → 매칭된 공지 목록 (한 번에 모으기 위한 Map)
        Map<User, List<Notice>> userNoticeMap = new LinkedHashMap<>();

        try {
            List<CrawledNotice> crawledList = pknuCrawler.crawl();

            for (CrawledNotice crawled : crawledList) {
                // 1. 중복 공지 스킵
                if (noticeRepository.existsByOriginalUrl(crawled.getOriginalUrl())) {
                    continue;
                }

                // 2. 새 공지사항 생성
                Notice notice = Notice.builder()
                        .title(crawled.getTitle())
                        .originalUrl(crawled.getOriginalUrl())
                        .noticedAt(crawled.getNoticedAt())
                        .build();

                // 3. 키워드 매칭 후 notice_keywords 연결
                List<Keyword> allKeywords = keywordRepository.findAll();
                for (Keyword keyword : allKeywords) {
                    if (containsKeyword(notice, keyword.getWord())) {
                        notice.addKeyword(keyword);
                    }
                }

                // 4. 매칭 키워드 없으면 기본 키워드 연결
                if (notice.getKeywords().isEmpty()) {
                    notice.addKeyword(pknuKeyword);
                }

                noticeRepository.save(notice);
                savedCount++;

                // 5. 매칭된 키워드를 구독 중인 유저별로 공지 누적
                collectNoticeByUser(notice, userNoticeMap);
            }

            // 6. 유저별로 모인 공지를 한 번에 이메일 발송
            sendBatchEmail(userNoticeMap);

            log.info("[CrawlService] 크롤링 완료 - 신규 저장: {}건, 알림 발송: {}명",
                    savedCount, userNoticeMap.size());

        } catch (Exception e) {
            status = "FAILED";
            failReason = e.getMessage();
            log.error("[CrawlService] 크롤링 실패: {}", e.getMessage());

        } finally {
            crawlLogRepository.save(CrawlLog.builder()
                    .keyword(pknuKeyword)
                    .status(status)
                    .parsedCount(savedCount)
                    .failReason(failReason)
                    .startedAt(startedAt)
                    .finishedAt(LocalDateTime.now())
                    .build());
        }
    }

    // 공지의 매칭된 키워드를 구독 중인 유저별로 공지 누적
    private void collectNoticeByUser(Notice notice, Map<User, List<Notice>> userNoticeMap) {
        for (Keyword keyword : notice.getKeywords()) {
            List<UserKeyword> userKeywords =
                    userKeywordRepository.findAllByKeywordIdWithUser(keyword.getId());

            for (UserKeyword userKeyword : userKeywords) {
                User user = userKeyword.getUser();
                // 같은 유저에게 같은 공지가 중복 추가되지 않도록 체크
                userNoticeMap
                        .computeIfAbsent(user, k -> new ArrayList<>())
                        .stream()
                        .filter(n -> n.getId().equals(notice.getId()))
                        .findFirst()
                        .ifPresentOrElse(
                                n -> {}, // 이미 있으면 스킵
                                () -> userNoticeMap.get(user).add(notice)
                        );
            }
        }
    }

    // 유저별로 모인 공지를 한 번에 이메일 발송
    private void sendBatchEmail(Map<User, List<Notice>> userNoticeMap) {
        for (Map.Entry<User, List<Notice>> entry : userNoticeMap.entrySet()) {
            User user = entry.getKey();
            List<Notice> notices = entry.getValue();
            emailNotificationService.sendBatch(user, notices);
        }
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