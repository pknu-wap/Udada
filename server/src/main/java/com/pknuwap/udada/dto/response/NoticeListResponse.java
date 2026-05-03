package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Notice;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class NoticeListResponse {
    private List<NoticeDto> notices;
    private long totalCount;

    // 응답 생성
    public static NoticeListResponse of(List<NoticeDto> notices, long totalCount) {
        return NoticeListResponse.builder()
                .notices(notices)
                .totalCount(totalCount)
                .build();
    }

    @Getter
    @Builder
    public static class NoticeDto {
        private Long id;
        private String title;
        private Integer keywordId;
        private String noticedAt;

        public static NoticeDto from(Notice notice) {
            return NoticeDto.builder()
                    .id(notice.getId())
                    .title(notice.getTitle())
                    .keywordId(notice.getKeyword().getId())
                    .noticedAt(notice.getNoticedAt().toString())
                    .build();
        }
    }
}