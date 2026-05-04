package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Notice;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoticeDetailResponse {
    private Long id;
    private String title;
    private String content;
    private String originalUrl;
    private Integer keywordId;
    private String noticedAt;

    //응답 생성
    public static NoticeDetailResponse from(Notice notice) {
        return NoticeDetailResponse.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .originalUrl(notice.getOriginalUrl())
                .keywordId(notice.getKeyword().getId())
                .noticedAt(notice.getNoticedAt() != null ? notice.getNoticedAt().toString() : "")
                .build();

    }
}
