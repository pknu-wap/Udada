package com.pknuwap.udada.common.response;

import com.pknuwap.udada.common.exception.ErrorCode;
import org.springframework.http.HttpStatus;

public record ApiResponse<T>(boolean success, int code, T data, String message) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, HttpStatus.OK.value(), data, null);
    }

    public static <T> ApiResponse<T> failure(ErrorCode errorCode) {
        return new ApiResponse<>(false, errorCode.getStatus().value(), null, errorCode.getMessage());
    }
}