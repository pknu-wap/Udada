package com.pknuwap.udada.common.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EmailVerificationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    // 이메일 검증 없이 허용할 경로
    private static final List<String> WHITELIST = List.of(
            "/api/v1/auth/kakao",
            "/api/v1/users/email"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String requestUri = request.getRequestURI();

        // 화이트리스트 경로는 검증 스킵
        if (WHITELIST.stream().anyMatch(requestUri::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증된 유저만 검증 (비인증 요청은 Security에서 처리)
        if (authentication != null && authentication.getPrincipal() instanceof Long userId) {
            User user = userRepository.findById(userId).orElse(null);

            if (user != null && !user.hasEmail()) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(objectMapper.writeValueAsString(ApiResponse.failure(ErrorCode.EMAIL_NOT_REGISTERED)));
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}