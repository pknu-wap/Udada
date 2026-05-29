package com.pknuwap.udada.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice_attachments")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 공지사항 첨부파일 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id", nullable = false)
    private Notice notice;

    @Column(name = "file_name", nullable = false, length = 500)
    private String fileName;

    @Column(name = "file_url", nullable = false, length = 1000)
    private String fileUrl;

    @Column(name = "file_type", nullable = false, length = 20)
    private String fileType; // FILE 또는 IMAGE

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public NoticeAttachment(Notice notice, String fileName, String fileUrl, String fileType) {
        this.notice = notice;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
        this.createdAt = LocalDateTime.now();
    }
}