package com.pknuwap.udada.service;

import com.pknuwap.udada.common.exception.BusinessException;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.dto.response.UserKeywordResponse;
import com.pknuwap.udada.entity.Keyword;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.entity.UserKeyword;
import com.pknuwap.udada.repository.KeywordRepository;
import com.pknuwap.udada.repository.UserKeywordRepository;
import com.pknuwap.udada.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserKeywordService {

    private final UserKeywordRepository userKeywordRepository;
    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;

    // 알림 키워드 설정 목록 조회
    public UserKeywordResponse.ListResponse getUserKeywords(Long userId) {
        List<UserKeyword> userKeywords = userKeywordRepository.findAllByUserIdWithKeyword(userId);

        List<UserKeywordResponse.KeywordItem> items = userKeywords.stream()
                .map(uk -> UserKeywordResponse.KeywordItem.builder()
                        .userKeywordId(uk.getId())
                        .keywordId(uk.getKeyword().getId())
                        .word(uk.getKeyword().getWord())
                        .createdAt(uk.getCreatedAt().toString())
                        .build())
                .collect(Collectors.toList());

        return UserKeywordResponse.ListResponse.builder()
                .userKeywords(items)
                .build();
    }

    // 알림 키워드 설정 추가
    @Transactional
    public UserKeywordResponse.CreateResponse addUserKeyword(Long userId, Long keywordId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_INVALID));

        Keyword keyword = keywordRepository.findById(keywordId)
                .orElseThrow(() -> new BusinessException(ErrorCode.KEYWORD_NOT_FOUND));

        if (userKeywordRepository.existsByUserIdAndKeywordId(userId, keywordId)) {
            throw new BusinessException(ErrorCode.USER_KEYWORD_ALREADY_EXISTS);
        }

        UserKeyword userKeyword = UserKeyword.builder()
                .user(user)
                .keyword(keyword)
                .build();

        userKeywordRepository.save(userKeyword);

        return UserKeywordResponse.CreateResponse.builder()
                .userKeywordId(userKeyword.getId())
                .createdAt(userKeyword.getCreatedAt().toString())
                .build();
    }

    // 알림 키워드 설정 해제
    @Transactional
    public void deleteUserKeyword(Long userId, Long userKeywordId) {
        UserKeyword userKeyword = userKeywordRepository.findById(userKeywordId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_KEYWORD_INVALID));

        // 본인 키워드 설정인지 검증
        if (!userKeyword.getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.USER_KEYWORD_FORBIDDEN);
        }

        userKeywordRepository.delete(userKeyword);
    }
}