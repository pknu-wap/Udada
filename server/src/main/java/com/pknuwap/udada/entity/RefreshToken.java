package com.pknuwap.udada.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Long userId;

    @Builder
    public RefreshToken(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

    // 토큰 갱신
    public void updateToken(String newToken) {
        this.token = newToken;
    }
}