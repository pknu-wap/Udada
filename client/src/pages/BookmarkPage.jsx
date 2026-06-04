import React, { useState, useEffect } from "react";
import BookmarkList from "../components/BookmarkList";
import BookmarkDetail from "../components/BookmarkDetail";
import "./BookmarkPage.css";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { debug } from "../utils/log";

export default function BookmarkPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getBookmarks()
      .then((res) => {
        debug("응답:", res.data);
        setPosts(res.data.data.bookmarks || []);
      })
      .catch((err) => console.error("북마크 불러오기 실패:", err));
  }, []);

  // 페이지 열릴 때 맨 위로 스크롤
  useEffect(() => {
    const el = document.querySelector('.content-area');
    if (el) el.scrollTop = 0;
  }, []);

  const handleRemoveBookmark = (noticeId) => {
    deleteBookmark(noticeId)
      .then(() => {
        setPosts((prev) => prev.filter((p) => p.id !== noticeId));
        if (selectedPost?.id === noticeId) setSelectedPost(null);
      })
      .catch((err) => console.error("북마크 삭제 실패:", err));
  };

  return (
    <div className="bookmark-page-wrapper">
      <BookmarkList
        posts={posts}
        selectedPost={selectedPost}
        onSelect={setSelectedPost}
        onRemove={handleRemoveBookmark}
      />
      <BookmarkDetail
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleBookmark={handleRemoveBookmark}
      />
    </div>
  );
}