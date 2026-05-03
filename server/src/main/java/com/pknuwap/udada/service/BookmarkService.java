package com.pknuwap.udada.service;

import com.pknuwap.udada.dto.request.BookmarkRequest;
import com.pknuwap.udada.dto.response.BookmarkResponse;
import com.pknuwap.udada.entity.Bookmark;
import com.pknuwap.udada.entity.Notice;
import com.pknuwap.udada.entity.User;
import com.pknuwap.udada.repository.BookmarkRepository;
import com.pknuwap.udada.repository.NoticeRepository;
import com.pknuwap.udada.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final NoticeRepository noticeRepository;

    // 북마크 목록 조회
    public BookmarkResponse.ListResponse getBookmarks(Long userId) {
        List<BookmarkResponse> bookmarks = bookmarkRepository.findAllByUserIdWithNotice(userId)
                .stream()
                .map(BookmarkResponse::from)
                .collect(Collectors.toList());

        return BookmarkResponse.ListResponse.of(bookmarks);
    }

    // 북마크 추가
    @Transactional
    public BookmarkResponse.CreateResponse addBookmark(Long userId, BookmarkRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        Notice notice = noticeRepository.findById(request.getNoticeId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 공지사항입니다."));

        if (bookmarkRepository.existsByUserIdAndNoticeId(userId, request.getNoticeId())) {
            throw new IllegalStateException("이미 북마크한 공지사항입니다.");
        }

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .notice(notice)
                .build();

        bookmarkRepository.save(bookmark);

        return BookmarkResponse.CreateResponse.from(bookmark);
    }

    // 북마크 삭제
    @Transactional
    public void deleteBookmark(Long userId, Long bookmarkId) {
        Bookmark bookmark = bookmarkRepository.findById(bookmarkId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 북마크입니다."));

        if (!bookmark.getUser().getId().equals(userId)) {
            throw new IllegalStateException("본인의 북마크만 삭제할 수 있습니다.");
        }

        bookmarkRepository.delete(bookmark);
    }

}