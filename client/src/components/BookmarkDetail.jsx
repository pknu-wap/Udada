import React from "react";
import "./BookmarkDetail.css";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { getNoticeDetail } from "../api/notices";

export default function BookmarkDetail({ post, onClose, onToggleBookmark }) {
  if (!post) {
    return (
      <div className="bookmark-detail-empty">
        <p>목록에서 글을 선택해 상세 내용을 확인하세요.</p>
      </div>
    );
  }

  return (
    <div className="bookmark-detail-viewer">
      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-title-row">
          <h2 className="detail-title">{post.title}</h2>
          <button className="detail-bookmark-btn" onClick={() => onToggleBookmark(post.id)}>
            <img
              src={post.isBookmarked ? bookmarkTrueIcon : bookmarkIcon}
              alt="북마크"
              className="detail-bookmark-icon"
            />
          </button>
          </div>
          <div className="detail-meta">
            <span>{post.date}</span>
            <span>|</span>
            <span>{post.category}</span>
          </div>
        </div>
        <hr className="detail-divider" />
        <div className="detail-body">
          {post.content}
        </div>
        <hr className="detail-divider" />
        <div className="detail-footer">
          <button className="detail-link-btn" onClick={onClose}>목록으로</button>
        </div>
      </div>
    </div>
  );
}