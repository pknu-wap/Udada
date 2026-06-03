import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList";
import BookmarkDetail from "./BookmarkDetail";
import "./BookmarkPanel.css";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { getNoticeDetail } from "../api/notices";
import { debug } from "../utils/log";

export default function BookmarkPanel({ isOpen }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    getBookmarks()
      .then((res) => {
        debug("응답:", res.data);
        setPosts(res.data.data.bookmarks||[]);
      })
      .catch((err) => console.error("북마크 불러오기 실패:", err));
  }, [isOpen]);

  const handleRemoveBookmark = (postId) => {
    deleteBookmark(postId)
      .then(() => {
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        if (selectedPost?.id === postId) setSelectedPost(null);
      })
      .catch((err) => console.error("북마크 삭제 실패:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="bookmark-panel-wrapper">
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
