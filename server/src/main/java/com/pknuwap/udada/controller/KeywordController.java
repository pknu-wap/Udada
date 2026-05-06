package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.request.KeywordRequest;
import com.pknuwap.udada.dto.response.KeywordResponse;
import com.pknuwap.udada.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/keywords")
@RequiredArgsConstructor
public class KeywordController {

    private final KeywordService keywordService;

    //전체 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<KeywordResponse>>> getAllKeywords() {
        return ResponseEntity.ok(ApiResponse.success(keywordService.getAllKeywords()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<KeywordResponse>> createKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal, // 타입 변경
            @RequestBody KeywordRequest request) {

        return ResponseEntity.ok(ApiResponse.success(keywordService.createKeyword(request, userPrincipal.getUserId())));
    }

    // 키워드 수정
    @PutMapping("/{keywordId}")
    public ResponseEntity<ApiResponse<KeywordResponse>> updateKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId,
            @RequestBody KeywordRequest request) {
        return ResponseEntity.ok(ApiResponse.success(keywordService.updateKeyword(keywordId, userPrincipal.getUserId(), request)));
    }

    // 키워드 삭제
    @DeleteMapping("/{keywordId}")
    public ResponseEntity<ApiResponse<Void>> deleteKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId) {
        keywordService.deleteKeyword(keywordId, userPrincipal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}