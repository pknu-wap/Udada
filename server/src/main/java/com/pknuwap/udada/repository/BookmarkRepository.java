package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT b FROM Bookmark b " +
            "JOIN FETCH b.notice n JOIN FETCH n.keywords " +
            "WHERE b.user.id = :userId ORDER BY b.createdAt DESC")
    List<Bookmark> findAllByUserIdWithNotice(@Param("userId") Long userId);

    Optional<Bookmark> findByUserIdAndNoticeId(Long userId, Long noticeId);

    boolean existsByUserIdAndNoticeId(Long userId, Long noticeId);

    // 성능 최적화 북마크 누른 공지사항 id목록만 1번의 쿼리로 반환
    @Query("SELECT b.notice.id FROM Bookmark b WHERE b.user.id = :userId AND b.notice.id IN :noticeIds")
    List<Long> findBookmarkedNoticeIds(@Param("userId") Long userId, @Param("noticeIds") List<Long> noticeIds);
}