package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.common.response.ErrorResponse;
import com.pknuwap.udada.dto.request.BookmarkRequest;
import com.pknuwap.udada.dto.response.BookmarkResponse;
import com.pknuwap.udada.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookmarks")
@RequiredArgsConstructor
@Tag(name = "3. 북마크")
@SecurityRequirement(name = "JWT TOKEN")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    @Operation(summary = "북마크 목록 조회", description = "로그인한 유저의 북마크 목록 조회합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "북마크 목록 조회 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 북마크 ID 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ApiResponse<BookmarkResponse.ListResponse>> getBookmarks(@AuthenticationPrincipal UserPrincipal principal) {
        BookmarkResponse.ListResponse response = bookmarkService.getBookmarks(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    @Operation(summary = "북마크 추가", description = "북마크를 추가합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "북마크 추가 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 북마크 ID 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ApiResponse<BookmarkResponse.CreateResponse>> addBookmark(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody BookmarkRequest request
    ) {
        BookmarkResponse.CreateResponse response = bookmarkService.addBookmark(principal.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(response));
    }

    // 북마크 삭제
    @DeleteMapping("/{bookmarkId}")
    @Operation(summary = "북마크 삭제", description = "북마크를 삭제합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "북마크 삭제 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 북마크 ID 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteBookmark(
            @AuthenticationPrincipal UserPrincipal principal,
            @Parameter(name = "bookmarkId", description = "북마크 ID") @PathVariable Long bookmarkId
    ) {
        bookmarkService.deleteBookmark(principal.getUserId(), bookmarkId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}