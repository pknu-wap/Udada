package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    boolean existsByOriginalUrl(String originalUrl);

    // 전체 공지 목록 조회 (최신순, 키워드 fetch join)
    @Query("SELECT n FROM Notice n ORDER BY n.noticedAt DESC")
    Page<Notice> findAllWithKeywords(Pageable pageable);

    // 특정 키워드가 포함된 공지 목록 조회 (최신순)
    @Query(value = "SELECT DISTINCT n FROM Notice n JOIN n.keywords k WHERE k.id = :keywordId ORDER BY n.noticedAt DESC",
            countQuery = "SELECT COUNT(DISTINCT n) FROM Notice n JOIN n.keywords k WHERE k.id = :keywordId")
    Page<Notice> findAllByKeywordIdWithKeywords(@Param("keywordId") Long keywordId, Pageable pageable);

    // 상세 조회 (키워드 fetch join)
    @Query("SELECT n FROM Notice n JOIN FETCH n.keywords WHERE n.id = :id")
    Optional<Notice> findByIdWithKeywords(@Param("id") Long id);

    @Query("SELECT DISTINCT n FROM Notice n " +
            "JOIN n.keywords k " +
            "WHERE k.word IN :keywords " +
            "ORDER BY n.noticedAt DESC")
    List<Notice> findByKeywordWordsIn(@Param("keywords") List<String> keywords);
}