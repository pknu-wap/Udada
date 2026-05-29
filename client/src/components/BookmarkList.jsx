import React from "react";
import "./BookmarkList.css";

export default function BookmarkList({ posts, selectedPost, onSelect, onRemove }) {
  return (
    <div className="bookmark-list-box">
      <div className="bookmark-list-header">
        <h3>북마크</h3>
      </div>

      {posts.length === 0 ? (
        <div className="bookmark-empty">
          <p>아직 북마크한 공지사항이 없습니다.</p>
        </div>
      ) : (
        <ul className="bookmark-list">
          {posts.map((post) => (
            <li
              key={post.id}
              className={`bookmark-item ${selectedPost?.id === post.id
                  ? "active"
                  : selectedPost
                    ? "inactive"
                    : ""
                }`}
              onClick={() => onSelect(selectedPost?.id === post.id ? null : post)}
            >
              <span className="post-category">[{post.category}]</span>
              <span className="post-title">{post.title}</span>
              <span
                className="post-bookmark-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(post.id);
                }}
              >🔖</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}