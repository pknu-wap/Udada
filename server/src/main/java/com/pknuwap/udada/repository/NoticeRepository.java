package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    //전체 조회시 카테고리ID에 해당하는 공지사항만
    Page<Notice> findAllByCategoryId(Integer categoryId, Pageable pageable);
}