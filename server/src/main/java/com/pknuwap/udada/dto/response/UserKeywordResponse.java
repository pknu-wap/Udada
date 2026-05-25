package com.pknuwap.udada.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserKeywordResponse {

    // 알림 키워드 목록 응답
    @Getter
    @Builder
    public static class ListResponse {
        private List<KeywordItem> userKeywords;
    }

    // 알림 키워드 단건 항목
    @Getter
    @Builder
    public static class KeywordItem {
        private Long userKeywordId;
        private Long keywordId;
        private String word;
        private String createdAt;
    }

    // 알림 키워드 추가 응답
    @Getter
    @Builder
    public static class CreateResponse {
        private Long userKeywordId;
        private String createdAt;
    }
}