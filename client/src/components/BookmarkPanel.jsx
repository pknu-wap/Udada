import React, { useState } from "react";
import BookmarkList from "./BookmarkList";
import BookmarkDetail from "./BookmarkDetail";
import "./BookmarkPanel.css";

// 나중에 API 연동하면 여기서 데이터 fetch
const dummyNotices = [
  { id: 1, title: "학술 정보 서비스 이용 안내", date: "2024-05-20", category: "도서관", content: "도서관 이용 안내 본문입니다...", isBookmarked: true },
  { id: 2, title: "2024 2학기 장학금 신청 안내", date: "2024-05-19", category: "장학금", content: "장학금 신청 방법 안내 본문입니다...", isBookmarked: true },
  { id: 3, title: "기숙사 신청 공지", date: "2024-05-18", category: "기숙사", content: "기숙사 입사 신청 안내 본문입니다...", isBookmarked: true },
];

export default function BookmarkPanel({ isOpen }) {
  const [posts, setPosts] = useState(dummyNotices.filter(p => p.isBookmarked));
  const [selectedPost, setSelectedPost] = useState(null);

  const handleRemoveBookmark = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (selectedPost?.id === postId) setSelectedPost(null); // 상세도 닫기
  };

  if (!isOpen) return null;

  return (
    <div className="bookmark-panel-wrapper">
      {/* 왼쪽 */}
      <BookmarkList
        posts={posts}
        selectedPost={selectedPost}
        onSelect={setSelectedPost}
        onRemove={handleRemoveBookmark}
      />
      {/* 오른쪽 */}
      <BookmarkDetail post={selectedPost} />
    </div>
  );
}