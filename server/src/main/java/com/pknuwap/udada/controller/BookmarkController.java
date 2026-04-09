package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.response.BookmarkResponse;
import com.pknuwap.udada.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    // 북마크 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<BookmarkResponse.ListResponse>> getBookmarks(
            @AuthenticationPrincipal Long userId
    ) {
        BookmarkResponse.ListResponse response = bookmarkService.getBookmarks(userId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

}