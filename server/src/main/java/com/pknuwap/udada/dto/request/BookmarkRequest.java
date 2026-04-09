package com.pknuwap.udada.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkRequest {

    @NotNull(message = "공지사항 ID는 필수입니다.")
    private Long noticeId;
}