package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Notice;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class NoticeDetailResponse {
    private Long id;
    private String title;
    private String content;
    private String originalUrl;
    private List<KeywordResponse> keywords;
    private String noticedAt;
    private List<AttachmentResponse> attachments;

    //응답 생성
    public static NoticeDetailResponse from(Notice notice) {
        return NoticeDetailResponse.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .originalUrl(notice.getOriginalUrl())
                .keywords(notice.getKeywords().stream()
                        .map(KeywordResponse::from)
                        .collect(Collectors.toList()))
                .noticedAt(notice.getNoticedAt() != null ? notice.getNoticedAt().toString() : "")
                .attachments(notice.getAttachments() != null ? notice.getAttachments().stream()
                        .map(AttachmentResponse::from)
                        .collect(Collectors.toList()) : List.of())
                .build();

    }
}
