package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Bookmark;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class BookmarkResponse {

    private Long bookmarkId;
    private Long noticeId;
    private String title;
    private String categoryName;
    private LocalDateTime noticedAt;
    private LocalDateTime createdAt;

    public static BookmarkResponse from(Bookmark bookmark) {
        return BookmarkResponse.builder()
                .bookmarkId(bookmark.getId())
                .noticeId(bookmark.getNotice().getId())
                .title(bookmark.getNotice().getTitle())
                .categoryName(bookmark.getNotice().getCategory().getName())
                .noticedAt(bookmark.getNotice().getNoticedAt())
                .createdAt(bookmark.getCreatedAt())
                .build();
    }

    // 북마크 추가 응답용
    @Getter
    @Builder
    public static class CreateResponse {
        private Long bookmarkId;
        private LocalDateTime createdAt;

        public static CreateResponse from(Bookmark bookmark) {
            return CreateResponse.builder()
                    .bookmarkId(bookmark.getId())
                    .createdAt(bookmark.getCreatedAt())
                    .build();
        }
    }

    // 북마크 목록 응답용
    @Getter
    @Builder
    public static class ListResponse {
        private List<BookmarkResponse> bookmarks;

        public static ListResponse of(List<BookmarkResponse> bookmarks) {
            return ListResponse.builder()
                    .bookmarks(bookmarks)
                    .build();
        }
    }
}