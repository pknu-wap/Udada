package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
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
    public ResponseEntity<List<KeywordResponse>> getAllKeywords() {
        return ResponseEntity.ok(keywordService.getAllKeywords());
    }

    @PostMapping
    public ResponseEntity<KeywordResponse> createKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal, // 타입 변경
            @RequestBody KeywordRequest request) {

        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        System.out.println("현재 SecurityContext의 Authentication: " + auth);

        // 만약 여기서도 null이 나온다면, 토큰 자체가 안 넘어오는 것입니다.
        if (userPrincipal == null) {
            throw new RuntimeException("로그인이 필요합니다.");
        }

        return ResponseEntity.ok(keywordService.createKeyword(request, userPrincipal.getUserId()));
    }

    // 키워드 수정
    @PutMapping("/{keywordId}")
    public ResponseEntity<KeywordResponse> updateKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId,
            @RequestBody KeywordRequest request) {
        return ResponseEntity.ok(keywordService.updateKeyword(keywordId, userPrincipal.getUserId(), request));
    }

    // 키워드 삭제
    @DeleteMapping("/{keywordId}")
    public ResponseEntity<Void> deleteKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId) {
        keywordService.deleteKeyword(keywordId, userPrincipal.getUserId());
        return ResponseEntity.noContent().build();
    }
}