package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.response.NoticeDetailResponse;
import com.pknuwap.udada.dto.response.NoticeListResponse;
import com.pknuwap.udada.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<ApiResponse<NoticeListResponse>> getNotices(
            @RequestParam(required = false) Long keywordId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        NoticeListResponse response = noticeService.getNoticeList(keywordId, page, size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity<ApiResponse<NoticeDetailResponse>> getNoticeDetail(@PathVariable Long noticeId) {
        NoticeDetailResponse response = noticeService.getNoticeDetail(noticeId);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<NoticeListResponse>> searchNoticesByKeywords(
            @RequestParam(value = "keywords", required = false) List<String> keywords) {

        NoticeListResponse response = noticeService.searchNoticesByKeywords(keywords);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}