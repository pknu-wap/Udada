package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Notice;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class NoticeListResponse {
    private List<NoticeDto> notices;
    @Schema(example = "1")
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
        @Schema(example = "1")
        private Long id;
        private String title;
        private String noticedAt;
        private List<KeywordResponse> keywords;
        private boolean isBookmarked;

        public static NoticeDto from(Notice notice, boolean isBookmarked) {
            return NoticeDto.builder()
                    .id(notice.getId())
                    .title(notice.getTitle())
                    .noticedAt(notice.getNoticedAt() != null ? notice.getNoticedAt().toString() : "")
                    .keywords(notice.getKeywords().stream()
                            .map(KeywordResponse::from)
                            .collect(Collectors.toList()))
                    .isBookmarked(isBookmarked)
                    .build();
        }
    }
}