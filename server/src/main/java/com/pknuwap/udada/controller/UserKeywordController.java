package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.response.UserKeywordResponse;
import com.pknuwap.udada.service.UserKeywordService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user-keywords")
@RequiredArgsConstructor
public class UserKeywordController {

    private final UserKeywordService userKeywordService;

    @GetMapping
    public ResponseEntity<ApiResponse<UserKeywordResponse.ListResponse>> getUserKeywords(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        UserKeywordResponse.ListResponse response = userKeywordService.getUserKeywords(userPrincipal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    // 💡 JSON Body로 들어오는 요청을 처리하는 방식 (@RequestBody)
    @PostMapping
    public ResponseEntity<ApiResponse<UserKeywordResponse.CreateResponse>> addUserKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody UserKeywordReq request
    ) {
        UserKeywordResponse.CreateResponse response = userKeywordService.addUserKeyword(userPrincipal.getUserId(), request.getKeywordId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @DeleteMapping("/{userKeywordId}")
    public ResponseEntity<ApiResponse<Void>> deleteUserKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long userKeywordId
    ) {
        userKeywordService.deleteUserKeyword(userPrincipal.getUserId(), userKeywordId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // 💡 프론트엔드 Request Body 매핑용 임시 DTO
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserKeywordReq {
        private Long keywordId;
    }
}