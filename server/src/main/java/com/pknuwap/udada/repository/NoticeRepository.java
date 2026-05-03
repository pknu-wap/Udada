package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    // 키워드 ID에 해당하는 공지사항만 조회
    Page<Notice> findAllByKeywordId(Integer keywordId, Pageable pageable);
}