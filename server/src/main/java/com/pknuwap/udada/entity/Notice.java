package com.pknuwap.udada.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "notices")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO 삭제 예정, 테이블로 별도 분리
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id", nullable = true)
    private Keyword keyword;

    @Column(nullable = false, length = 500)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "original_url", nullable = false, unique = true, length = 500)
    private String originalUrl;

    @Column(name = "noticed_at")
    private LocalDateTime noticedAt;

    @Column(name = "crawled_at", nullable = false, updatable = false)
    private LocalDateTime crawledAt;

    @OneToMany(mappedBy = "notice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Builder
    public Notice(Keyword keyword, String title, String content, String originalUrl, LocalDateTime noticedAt) {
        this.keyword = keyword;
        this.title = title;
        this.content = content;
        this.originalUrl = originalUrl;
        this.noticedAt = noticedAt;
        this.crawledAt = LocalDateTime.now();
    }
}