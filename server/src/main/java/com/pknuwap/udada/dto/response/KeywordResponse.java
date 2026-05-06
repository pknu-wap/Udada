package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.Keyword;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KeywordResponse {
    private Long id;
    private String word;

    public static KeywordResponse from(Keyword keyword) {
        return KeywordResponse.builder()
                .id(keyword.getId())
                .word(keyword.getWord())
                .build();
    }
}
