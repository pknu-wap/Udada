package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.UserKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserKeywordRepository extends JpaRepository<UserKeyword, Long> {

    // 특정 키워드를 알림 설정한 유저 목록 조회 (알림 발송 대상 판별용)
    @Query("SELECT uk FROM UserKeyword uk JOIN FETCH uk.user WHERE uk.keyword.id = :keywordId")
    List<UserKeyword> findAllByKeywordIdWithUser(@Param("keywordId") Long keywordId);

    // 유저가 알림 설정한 키워드 목록 조회
    @Query("SELECT uk FROM UserKeyword uk JOIN FETCH uk.keyword WHERE uk.user.id = :userId ORDER BY uk.createdAt DESC")
    List<UserKeyword> findAllByUserIdWithKeyword(@Param("userId") Long userId);

    // 유저의 특정 알림 키워드 설정 단건 조회 (삭제 시 본인 검증용)
    @Query("SELECT uk FROM UserKeyword uk WHERE uk.user.id = :userId AND uk.keyword.id = :keywordId")
    Optional<UserKeyword> findByUserIdAndKeywordId(@Param("userId") Long userId, @Param("keywordId") Long keywordId);

    // 중복 설정 방지용 존재 여부 확인
    boolean existsByUserIdAndKeywordId(Long userId, Long keywordId);

    // 유저의 알림 키워드 설정 수 (키워드 개수 제한 등에 활용 가능)
    long countByUserId(Long userId);
}