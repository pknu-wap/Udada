package com.pknuwap.udada.service;

import com.pknuwap.udada.common.exception.BusinessException;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.common.jwt.JwtProvider;
import com.pknuwap.udada.dto.response.AuthResponse;
import com.pknuwap.udada.dto.response.KakaoTokenResponse;
import com.pknuwap.udada.dto.response.KakaoUserInfoResponse;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final WebClient webClient;

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.token-uri}")
    private String tokenUri;

    @Value("${kakao.user-info-uri}")
    private String userInfoUri;

    @Value("${kakao.login-client-secret}")
    private String clientSecret;

    @Transactional
    public AuthResponse kakaoLogin(String code) {
        // 1. 인가 코드로 카카오 액세스 토큰 발급
        KakaoTokenResponse kakaoToken = getKakaoToken(code);

        // 2. 카카오 액세스 토큰으로 유저 정보 조회
        KakaoUserInfoResponse userInfo = getKakaoUserInfo(kakaoToken.getAccessToken());

        // 3. 신규 유저면 DB 저장, 기존 유저면 조회
        String kakaoId = String.valueOf(userInfo.getKakaoId());
        boolean isNewUser = !userRepository.existsByKakaoId(kakaoId);

        User user = userRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .kakaoId(kakaoId)
                                .build()
                ));

        // 4. JWT 발급
        String accessToken = jwtProvider.generateToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .isNewUser(isNewUser)
                .build();
    }

    // 카카오 서버에 액세스 토큰 요청
    private KakaoTokenResponse getKakaoToken(String code) {
        // 임시 로그
        log.debug("kakao token request - clientId: {}, redirectUri: {}, clientSecret: {}, code: {}",
                clientId, redirectUri, clientSecret, code);

        BodyInserters.FormInserter<String> formData =
                BodyInserters.fromFormData("grant_type", "authorization_code")
                        .with("client_id", clientId)
                        .with("redirect_uri", redirectUri)
                        .with("code", code)
                        .with("client_secret", clientSecret);

        return webClient.post()
                .uri(tokenUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(formData)
                .retrieve()
                .onStatus(status -> status == HttpStatus.BAD_REQUEST, response ->
                        response.bodyToMono(String.class)
                                .map(body -> new BusinessException(ErrorCode.INVALID_KAKAO_TOKEN))
                )
                .bodyToMono(KakaoTokenResponse.class)
                .block();
    }

    // 카카오 서버에 유저 정보 요청
    private KakaoUserInfoResponse getKakaoUserInfo(String kakaoAccessToken) {
        return webClient.get()
                .uri(userInfoUri)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessToken)
                .retrieve()
                .bodyToMono(KakaoUserInfoResponse.class)
                .block();
    }
}