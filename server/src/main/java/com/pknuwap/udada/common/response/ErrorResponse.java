package com.pknuwap.udada.common.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/** 스웨거를 위해 생성.. */
@Schema(name = "ErrorResponse")
@Getter
public class ErrorResponse {

    @Schema(example = "false")
    private boolean success;

    @Schema(example = "400")
    private int code;

    @Schema(
            description = "응답 데이터",
            nullable = true,
            example = "null"
    )
    private Object data;

    private String message;
}