package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.common.response.ErrorResponse;
import com.pknuwap.udada.dto.response.AuthResponse;
import com.pknuwap.udada.service.KakaoAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "1. 카카오 로그인")
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;

    @PostMapping("/kakao")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "카카오 로그인/회원가입 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 카카오 인가 코드 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @Operation(summary = "카카오 로그인", description = "카카오 인가 코드(code)로 로그인/신규 가입 처리 후 JWT 토큰을 발급합니다.")
    public ResponseEntity<ApiResponse<AuthResponse>> kakaoLogin(
            @Parameter(name = "code", description = "카카오 인가 코드") @RequestParam String code
    ) {
        AuthResponse response = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}