package com.pknuwap.udada.service;

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
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        // 임시 로그 추가
        log.debug("kakao token request - clientId: {}, redirectUri: {}, code: {}",
                clientId, redirectUri, code);

        return webClient.post()
                .uri(tokenUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "authorization_code")
                        .with("client_id", clientId)
                        .with("redirect_uri", redirectUri)
                        .with("code", code)) // form 인코딩
                .retrieve()
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