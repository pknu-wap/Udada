package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.jwt.UserPrincipal;
import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.common.response.ErrorResponse;
import com.pknuwap.udada.dto.request.KeywordRequest;
import com.pknuwap.udada.dto.response.KeywordResponse;
import com.pknuwap.udada.service.KeywordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/keywords")
@RequiredArgsConstructor
@Tag(name = "4. 키워드")
@SecurityRequirement(name = "JWT TOKEN")
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping
    @Operation(summary = "키워드 목록 조회", description = "키워드 목록을 조회합니다. [기본 제공 키워드 + 유저가 직접 추가한 키워드(추후 개발 건)]")
    public ResponseEntity<ApiResponse<List<KeywordResponse>>> getAllKeywords() {
        return ResponseEntity.ok(ApiResponse.success(keywordService.getAllKeywords()));
    }

    @PostMapping
    @Operation(summary = "키워드 추가", description = "키워드를 추가합니다.")
    public ResponseEntity<ApiResponse<KeywordResponse>> createKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody KeywordRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(keywordService.createKeyword(request, userPrincipal.getUserId())));
    }

    @PutMapping("/{keywordId}")
    @Operation(summary = "키워드 수정", description = "키워드를 수정합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "키워드 수정 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 키워드 ID 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ApiResponse<KeywordResponse>> updateKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId,
            @RequestBody KeywordRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(keywordService.updateKeyword(keywordId, userPrincipal.getUserId(), request)));
    }

    @DeleteMapping("/{keywordId}")
    @Operation(summary = "키워드 삭제", description = "키워드를 삭제합니다.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "키워드 삭제 성공"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "잘못된 키워드 ID 전달",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteKeyword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long keywordId
    ) {
        keywordService.deleteKeyword(keywordId, userPrincipal.getUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}