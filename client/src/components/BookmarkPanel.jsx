import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import BookmarkDetail from "./BookmarkDetail";
import "./BookmarkPanel.css";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { getNoticeDetail } from "../api/notices";

export default function BookmarkPanel({ isOpen }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

   useEffect(() => {
    if (!isOpen) return;

    getBookmarks()
      .then((res) => {
        setPosts(res.data.bookmarks);
      })
      .catch((err) => console.error("북마크 불러오기 실패:", err));
  }, [isOpen]);

  const handleRemoveBookmark = (postId) => {
    deleteBookmark(postId)
      .then(() => {
        setPosts(prev => prev.filter(p => p.bookmarkId !== postId));
        if (selectedPost?.bookmarkId === postId) setSelectedPost(null);
      })
      .catch((err) => console.error("북마크 삭제 실패:", err));
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
      <BookmarkDetail
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleBookmark={handleRemoveBookmark}
      />
    </div>
  );
}