package com.pknuwap.udada.service;

import com.pknuwap.udada.dto.response.NoticeDetailResponse;
import com.pknuwap.udada.dto.response.NoticeListResponse;
import com.pknuwap.udada.entity.Notice;
import com.pknuwap.udada.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;

    // TODO: 키워드가 여러개 설정되어 있을 때, 공지사항 조회 기능 수정 필요
    public NoticeListResponse getNoticeList(Integer keywordId, int page, int size) {
        // 최신순 정렬
        Pageable pageable = PageRequest.of(page, size, Sort.by("noticedAt").descending());

        // 키워드 유무에 따라 리포지토리 호출
        Page<Notice> noticePage = (keywordId != null)
                ? noticeRepository.findAllByKeywordId(keywordId, pageable)
                : noticeRepository.findAll(pageable);

        // 엔티티 목록을 DTO 목록으로 변환
        List<NoticeListResponse.NoticeDto> dtos = noticePage.getContent().stream()
                .map(NoticeListResponse.NoticeDto::from)
                .collect(Collectors.toList());

        return NoticeListResponse.of(dtos, noticePage.getTotalElements());
    }

    //존재하지 않는 공지사항 조회
    public NoticeDetailResponse getNoticeDetail(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 공지사항 입니다. id=" + noticeId));

        return NoticeDetailResponse.from(notice);
    }
}