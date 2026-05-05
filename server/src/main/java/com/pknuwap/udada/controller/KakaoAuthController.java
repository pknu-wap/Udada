package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.response.AuthResponse;
import com.pknuwap.udada.service.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    /**
     * 카카오 로그인 요청
     * @param code 클라이언트에서 카카오 서버에 받아 온 인가코드
     * */
    @PostMapping("/kakao")
    public ResponseEntity<ApiResponse<AuthResponse>> kakaoLogin(
            @RequestParam String code
    ) {
        AuthResponse response = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}