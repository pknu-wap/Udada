package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.CrawlLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrawlLogRepository extends JpaRepository<CrawlLog, Long> {
}
