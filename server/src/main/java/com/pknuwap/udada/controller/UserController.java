package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.request.EmailRequest;
import com.pknuwap.udada.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 이메일 등록
    @PostMapping("/email")
    public ResponseEntity<ApiResponse<Void>> registerEmail(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody EmailRequest request
    ) {
        userService.registerEmail(principal.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}