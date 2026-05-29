package com.pknuwap.udada.common.crawler;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class CrawledNotice {

    private final String title;
    private final String originalUrl;
    private final LocalDateTime noticedAt;
    private final String content;
    private final List<CrawledAttachment> attachments;
}