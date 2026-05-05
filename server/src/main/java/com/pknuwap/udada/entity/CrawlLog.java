package com.pknuwap.udada.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "crawl_logs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CrawlLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO 키워드 처리 이슈!! 추후 논의사항으로, 일단 nullable true 처리
    // 어떤 키워드(출처) 기준으로 크롤링했는지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id", nullable = true)
    private Keyword keyword;

    @Column(nullable = false, length = 10)
    private String status;

    @Column(name = "parsed_count", nullable = false)
    private int parsedCount;

    @Column(name = "fail_reason", length = 255)
    private String failReason;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "finished_at")
    private LocalDateTime finishedAt;

    @Builder
    public CrawlLog(Keyword keyword, String status, int parsedCount,
                    String failReason, LocalDateTime startedAt, LocalDateTime finishedAt) {
        this.keyword = keyword;
        this.status = status;
        this.parsedCount = parsedCount;
        this.failReason = failReason;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
    }
}