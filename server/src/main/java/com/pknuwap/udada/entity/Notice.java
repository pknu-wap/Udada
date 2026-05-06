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

    // notice_keywords 중간 테이블을 통한 N:M 관계
    @ManyToMany
    @JoinTable(
            name = "notice_keywords",
            joinColumns = @JoinColumn(name = "notice_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    private List<Keyword> keywords = new ArrayList<>();

    @OneToMany(mappedBy = "notice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @Builder
    public Notice(String title, String content, String originalUrl, LocalDateTime noticedAt) {
        this.title = title;
        this.content = content;
        this.originalUrl = originalUrl;
        this.noticedAt = noticedAt;
        this.crawledAt = LocalDateTime.now();
    }

    // 키워드 추가
    public void addKeyword(Keyword keyword) {
        this.keywords.add(keyword);
    }
}