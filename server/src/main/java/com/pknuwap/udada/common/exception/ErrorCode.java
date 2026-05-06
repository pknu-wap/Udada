package com.pknuwap.udada.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 토큰
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "로그인된 회원 정보가 없습니다. access token을 잘 작성했는지 확인해주세요."),
    INVALID_KAKAO_TOKEN(HttpStatus.BAD_REQUEST, "잘못된 code입니다."),

    // 북마크
    BOOKMARK_ALREADY(HttpStatus.BAD_REQUEST, "이미 북마크한 공지사항입니다."),
    BOOKMARK_INVALID(HttpStatus.BAD_REQUEST, "존재하지 않는 북마크입니다."),
    BOOKMARK_NOT_OWNED(HttpStatus.BAD_REQUEST, "본인의 북마크만 삭제할 수 있습니다."),

    // 공지사항
    NOTICE_INVALID(HttpStatus.BAD_REQUEST, "존재하지 않는 공지사항입니다."),

    // 유저
    USER_INVALID(HttpStatus.BAD_REQUEST, "존재하지 않는 유저입니다."),

    // 서버 오류
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류 ㅠㅠ 미아내 ㅠㅠ 백엔드팀한테 알려주세염 ㅠㅠ");


    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
