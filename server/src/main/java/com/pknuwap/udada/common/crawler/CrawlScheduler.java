package com.pknuwap.udada.common.crawler;

import com.pknuwap.udada.service.CrawlService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CrawlScheduler {

    private final CrawlService crawlService;

    // 매일 자정 (00:00) 실행
    @Scheduled(cron = "0 0 0 * * *")
    public void scheduleCrawl() {
        log.info("[CrawlScheduler] 크롤링 스케줄 시작");
        crawlService.crawlAndNotify();
        log.info("[CrawlScheduler] 크롤링 스케줄 완료");
    }
}