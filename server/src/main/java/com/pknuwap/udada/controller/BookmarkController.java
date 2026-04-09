package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.request.BookmarkRequest;
import com.pknuwap.udada.dto.response.BookmarkResponse;
import com.pknuwap.udada.service.BookmarkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    // 북마크 추가
    @PostMapping
    public ResponseEntity<ApiResponse<BookmarkResponse.CreateResponse>> addBookmark(
            @AuthenticationPrincipal Long userId,
            @Valid @RequestBody BookmarkRequest request
    ) {
        BookmarkResponse.CreateResponse response = bookmarkService.addBookmark(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    // 북마크 삭제
    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity<ApiResponse<Void>> deleteBookmark(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long bookmarkId
    ) {
        bookmarkService.deleteBookmark(userId, bookmarkId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}