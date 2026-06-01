import React from "react";
import "./BookmarkList.css";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";
import { getBookmarks, deleteBookmark } from "../api/bookmarks";
import { getNoticeDetail } from "../api/notices";

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
              key={post.bookmarkId}
              className={`bookmark-item ${selectedPost?.bookmarkId === post.bookmarkId
                  ? "active"
                  : selectedPost
                    ? "inactive"
                    : ""
                }`}
              onClick={() => onSelect(selectedPost?.bookmarkId === post.bookmarkId ? null : post)}
            >
              <span className="post-keyword">{post.keywordName}</span>
              <span className="post-title">{post.title}</span>
              <span
                className="post-bookmark-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(post.bookmarkId);
                }}
              ><img src={bookmarkTrueIcon} alt="북마크" className="bookmarktrue" /></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}