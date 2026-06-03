package com.pknuwap.udada.service;

import com.pknuwap.udada.common.exception.BusinessException;
import com.pknuwap.udada.common.exception.ErrorCode;
import com.pknuwap.udada.dto.response.NoticeDetailResponse;
import com.pknuwap.udada.dto.response.NoticeListResponse;
import com.pknuwap.udada.entity.Notice;
import com.pknuwap.udada.repository.BookmarkRepository;
import com.pknuwap.udada.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final BookmarkRepository bookmarkRepository;

    public NoticeListResponse getNoticeList(Long userId, Long keywordId, int page, int size) {
        // 최신순 정렬
        Pageable pageable = PageRequest.of(page, size, Sort.by("noticedAt").descending());

        // 키워드 유무에 따라 리포지토리 호출
        Page<Notice> noticePage = (keywordId != null)
                ? noticeRepository.findAllByKeywordIdWithKeywords(keywordId, pageable)
                : noticeRepository.findAllWithKeywords(pageable);

        List<Long> noticeIds = noticePage.getContent().stream()
                .map(Notice::getId)
                .collect(Collectors.toList());

        Set<Long> bookmarkedNoticeIds = new HashSet<>();
        if (userId != null && !noticeIds.isEmpty()) {
            bookmarkedNoticeIds.addAll(bookmarkRepository.findBookmarkedNoticeIds(userId, noticeIds));
        }

        // 엔티티 목록을 DTO 목록으로 변환
        List<NoticeListResponse.NoticeDto> noticeDtos = noticePage.getContent().stream()
                .map(notice -> {
                    boolean isBookmarked = bookmarkedNoticeIds.contains(notice.getId());
                    return NoticeListResponse.NoticeDto.from(notice, isBookmarked);
                })
                .collect(Collectors.toList());

        return NoticeListResponse.of(noticeDtos, noticePage.getTotalElements());
    }

    // 공지사항 상세 조회
    public NoticeDetailResponse getNoticeDetail(Long noticeId) {
        Notice notice = noticeRepository.findByIdWithKeywords(noticeId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOTICE_INVALID));

        return NoticeDetailResponse.from(notice);
    }
    public NoticeListResponse searchNoticesByKeywords(List<String> keywords) {
        List<Notice> notices;

        if (keywords == null || keywords.isEmpty()) {
            notices = noticeRepository.findAll();
        } else {
            notices = noticeRepository.findByKeywordWordsIn(keywords);
        }

        List<NoticeListResponse.NoticeDto> noticeDtos = notices.stream()
                .map(notice -> NoticeListResponse.NoticeDto.from(notice, false))
                .collect(Collectors.toList());

        return NoticeListResponse.of(noticeDtos, noticeDtos.size());
    }
}