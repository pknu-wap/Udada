package com.pknuwap.udada.common.crawler;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CrawledNotice {

    private final String title;
    private final String originalUrl;
    private final LocalDateTime noticedAt;
}