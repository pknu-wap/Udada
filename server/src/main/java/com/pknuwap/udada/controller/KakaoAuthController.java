package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.request.RefreshTokenRequest; // 💡 추가
import com.pknuwap.udada.dto.response.AuthResponse;
import com.pknuwap.udada.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; // 💡 추가
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    @PostMapping("/kakao")
    public ResponseEntity<ApiResponse<AuthResponse>> kakaoLogin(
            @RequestParam String code
    ) {
        AuthResponse response = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> reissueToken(
            @RequestBody RefreshTokenRequest request
    ) {
        AuthResponse response = kakaoAuthService.reissueToken(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}