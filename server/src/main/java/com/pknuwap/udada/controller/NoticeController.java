package com.pknuwap.udada.controller;

import com.pknuwap.udada.common.response.ApiResponse;
import com.pknuwap.udada.dto.response.NoticeDetailResponse;
import com.pknuwap.udada.dto.response.NoticeListResponse;
import com.pknuwap.udada.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ApiResponse<NoticeListResponse> getNotices(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        NoticeListResponse response = noticeService.getNoticeList(categoryId, page, size);
        return ApiResponse.success(response);
    }

    @GetMapping("/{noticeId}")

    public ApiResponse<NoticeDetailResponse> getNoticeDetail(@PathVariable Long noticeId) {
        NoticeDetailResponse response = noticeService.getNoticeDetail(noticeId);

        return ApiResponse.success(response);
    }
}