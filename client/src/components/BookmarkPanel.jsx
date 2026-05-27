import React, { useState, useEffect } from "react";
import "./BookmarkPanel.css";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { getNoticeDetail } from "../api/notices";

export default function BookmarkPanel({ isOpen }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    getBookmarks()
      .then((res) => {
        setBookmarks(res.data.bookmarks);
      })
      .catch((err) => console.error("북마크 불러오기 실패:", err));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTitleClick = (bookmark) => {
    if (selectedPost && selectedPost.id === bookmark.noticeId) {
      setSelectedPost(null);
      return;
    }
    getNoticeDetail(bookmark.noticeId)
      .then((res) => setSelectedPost(res.data))
      .catch((err) => console.error("공지사항 불러오기 실패:", err));
  };

  const handleDeleteBookmark = (e, bookmarkId) => {
    e.stopPropagation();
    deleteBookmark(bookmarkId)
      .then(() => {
        setBookmarks(bookmarks.filter((b) => b.bookmarkId !== bookmarkId));
        if (selectedPost) setSelectedPost(null);
      })
      .catch((err) => console.error("북마크 삭제 실패:", err));
  };

  return (
    <div className="bookmark-panel-wrapper">
      {/* 왼쪽: 게시글 목록 */}
      <div className="bookmark-list-box">
        <div className="bookmark-list-header">
          <h3>북마크 목록</h3>
        </div>

        {bookmarks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
            <p>아직 북마크한 공지사항이 없습니다.</p>
          </div>
        ) : (
          <ul className="bookmark-list">
            {bookmarks.map((bookmark) => (
              <li
                key={bookmark.bookmarkId}
                className={`bookmark-item ${selectedPost?.id === bookmark.noticeId ? "active" : ""}`}
                onClick={() => handleTitleClick(bookmark)}
              >
                <span className="post-category">[{bookmark.keywordName}]</span>
                <span className="post-title">{bookmark.title}</span>
                <button
                  className="bookmark-delete-btn"
                  onClick={(e) => handleDeleteBookmark(e, bookmark.bookmarkId)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 오른쪽: 게시글 상세 */}
      {selectedPost ? (
        <div className="bookmark-detail-viewer">
          <div className="detail-header">
            <div className="detail-header-top">
              <h2 className="detail-title">{selectedPost.title}</h2>
            </div>
            <div className="detail-meta">
              <span>{selectedPost.noticedAt}</span>
              <span>|</span>
              <span>{selectedPost.keywordName}</span>
            </div>
          </div>
          <hr className="detail-divider" />
          <div className="detail-body">{selectedPost.content}</div>
        </div>
      ) : (
        <div className="bookmark-detail-viewer" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
          <p>목록에서 글을 선택해 상세 내용을 확인하세요.</p>
        </div>
      )}
    </div>
  );
}