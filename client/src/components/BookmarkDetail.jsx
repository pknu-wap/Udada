import React from "react";
import "./BookmarkDetail.css";

export default function BookmarkDetail({ post }) {
  if (!post) {
    return (
      <div className="bookmark-detail-viewer bookmark-detail-empty">
        <p>목록에서 글을 선택해 상세 내용을 확인하세요.</p>
      </div>
    );
  }

  return (
    <div className="bookmark-detail-viewer">
      <div className="detail-header">
        <div className="detail-card">
          <h2 className="detail-title">{post.title}</h2>
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
      </div>
    </div>
  );
}