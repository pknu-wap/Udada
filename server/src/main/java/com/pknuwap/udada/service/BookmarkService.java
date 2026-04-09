package com.pknuwap.udada.service;

import com.pknuwap.udada.dto.response.BookmarkResponse;
import com.pknuwap.udada.repository.BookmarkRepository;
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

    // 북마크 목록 조회
    public BookmarkResponse.ListResponse getBookmarks(Long userId) {
        List<BookmarkResponse> bookmarks = bookmarkRepository.findAllByUserIdWithNotice(userId)
                .stream()
                .map(BookmarkResponse::from)
                .collect(Collectors.toList());

        return BookmarkResponse.ListResponse.of(bookmarks);
    }

}