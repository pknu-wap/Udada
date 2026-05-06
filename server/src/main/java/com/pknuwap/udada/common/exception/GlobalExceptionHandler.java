package com.pknuwap.udada.common.exception;

import com.pknuwap.udada.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * exception 로그 출력용 공통 예외 처리 핸들러
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        log.error("[Exception] {} : {}", e.getClass().getSimpleName(), e.getMessage(), e);
        if (e instanceof BusinessException) {
            final ErrorCode error = ((BusinessException) e).getErrorCode();
            return ResponseEntity
                    .status(error.getStatus())
                    .body(ApiResponse.failure(error));
        } else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.failure(ErrorCode.INTERNAL_SERVER_ERROR));
        }
    }

}