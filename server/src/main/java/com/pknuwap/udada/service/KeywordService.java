package com.pknuwap.udada.service;

import com.pknuwap.udada.common.exception.BusinessException;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.dto.request.KeywordRequest;
import com.pknuwap.udada.dto.response.KeywordResponse;
import com.pknuwap.udada.entity.Keyword;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.repository.KeywordRepository;
import com.pknuwap.udada.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<KeywordResponse> getAllKeywords() {
        return keywordRepository.findAll().stream()
                .map(KeywordResponse::from)
                .toList();
    }

    @Transactional
    public KeywordResponse createKeyword(KeywordRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_INVALID));

        Keyword keyword = Keyword.builder()
                .word(request.getWord())
                .isDefault(false)
                .createdBy(user)
                .build();

        return KeywordResponse.from(keywordRepository.save(keyword));
    }

    @Transactional
    public KeywordResponse updateKeyword(Long keywordId, Long userId, KeywordRequest request) {
        Keyword keyword = keywordRepository.findById(keywordId)
                .orElseThrow(() -> new BusinessException(ErrorCode.KEYWORD_NOT_FOUND));

        if (!keyword.getCreatedBy().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.KEYWORD_NOT_OWNED);
        }

        keyword.updateWord(request.getWord());

        return KeywordResponse.from(keyword);
    }

    @Transactional
    public void deleteKeyword(Long keywordId, Long userId) {
        Keyword keyword = keywordRepository.findById(keywordId)
                .orElseThrow(() -> new BusinessException(ErrorCode.KEYWORD_NOT_FOUND));

        if (!keyword.getCreatedBy().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.KEYWORD_NOT_OWNED);
        }

        keywordRepository.delete(keyword);
    }
}