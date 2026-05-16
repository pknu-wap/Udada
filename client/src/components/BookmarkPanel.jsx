import React, { useState } from "react";
import BookmarkList from "./BookmarkList";
import BookmarkDetail from "./BookmarkDetail";
import "./BookmarkPanel.css";

// 나중에 API 연동하면 여기서 데이터 fetch
const dummyNotices = [
  { id: 1, title: "학술 정보 서비스 이용 안내", date: "2024-05-20", category: "도서관", content: "도서관 이용 안내 본문입니다...", isBookmarked: true },
  { id: 2, title: "2024 2학기 장학금 신청 안내", date: "2024-05-19", category: "장학금", content: "장학금 신청 방법 안내 본문입니다...", isBookmarked: false },
  { id: 3, title: "기숙사 신청 공지", date: "2024-05-18", category: "기숙사", content: "기숙사 입사 신청 안내 본문입니다...", isBookmarked: false },
];

export default function BookmarkPanel({ isOpen }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!isOpen) return null;

  const bookmarkedPosts = dummyNotices.filter((post) => post.isBookmarked);

  return (
    <div className="bookmark-panel-wrapper">
      {/* 왼쪽 */}
      <BookmarkList
        posts={bookmarkedPosts}
        selectedPost={selectedPost}
        onSelect={setSelectedPost}
      />
      {/* 오른쪽 */}
      <BookmarkDetail post={selectedPost} />
    </div>
  );
}