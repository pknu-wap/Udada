package com.pknuwap.udada.common.crawler;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CrawledAttachment {
    private final String fileName;
    private final String fileUrl;
    private final String fileType;
}