package com.pknuwap.udada.common.exception;

import com.pknuwap.udada.common.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * exception 로그 출력용 공통 예외 처리 핸들러
 * 추후 다른 오류 처리 로직도... 추가 예정...
 * */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Void>> handleException(BusinessException e) {
        log.error("[Exception] {} : {}", e.getClass().getSimpleName(), e.getMessage(), e);
        final ErrorCode error = e.getErrorCode();
        return ResponseEntity
                .status(error.getStatus())
                .body(ApiResponse.failure(error));
    }
}
