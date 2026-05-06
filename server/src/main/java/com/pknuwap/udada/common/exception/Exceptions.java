package com.pknuwap.udada.common.exception;

import lombok.Getter;

public class Exceptions {
    @Getter
    private static final Exceptions instance = new Exceptions();

    private Exceptions() {}

    /** userId가 null 값인지 판별 */
    public void requireUserId(Long id) {
        if (id == null) throw new BusinessException(ErrorCode.INVALID_TOKEN);
    }

}