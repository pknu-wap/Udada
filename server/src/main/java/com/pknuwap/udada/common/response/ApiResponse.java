package com.pknuwap.udada.common.response;

import com.pknuwap.udada.common.exception.ErrorCode;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.HttpStatus;

@Schema(description = "공통 응답 로직")
public record ApiResponse<T>(boolean success, @Schema(example = "200") int code, T data, String message) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, HttpStatus.OK.value(), data, null);
    }

    public static <T> ApiResponse<T> failure(ErrorCode errorCode) {
        return new ApiResponse<>(false, errorCode.getStatus().value(), null, errorCode.getMessage());
    }
}