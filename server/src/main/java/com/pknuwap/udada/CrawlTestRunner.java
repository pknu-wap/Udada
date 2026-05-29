package com.pknuwap.udada; //크롤링 테스트

import com.pknuwap.udada.service.CrawlService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
//@Component
@RequiredArgsConstructor
public class CrawlTestRunner implements CommandLineRunner {

    private final CrawlService crawlService;

    @Override
    public void run(String... args) throws Exception {
        log.info("=========================================");
        log.info("🚀 [테스트] 부경대 공지사항 크롤링을 시작합니다...");
        log.info("=========================================");

        try {
            crawlService.crawlAndNotify();
            log.info("✅ [테스트] 크롤링 및 DB 저장이 성공적으로 끝났습니다!");
        } catch (Exception e) {
            log.error("❌ [테스트] 크롤링 구동 중 에러 발생: {}", e.getMessage(), e);
        }

        log.info("=========================================");
    }
}