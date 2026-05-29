package com.pknuwap.udada.service;

import com.pknuwap.udada.common.exception.BusinessException;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.dto.request.EmailRequest;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // 이메일 등록
    @Transactional
    public void registerEmail(Long userId, EmailRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_INVALID));

        // 이미 이메일이 등록된 경우
        if (user.hasEmail()) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        user.updateEmail(request.getEmail());
    }
}
