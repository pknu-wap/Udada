import React, { useState } from "react";
import "./BookmarkPanel.css";

// dummyData
const dummyNotices = [
  { id: 1, title: "학술 정보 서비스 이용 안내", date: "2024-05-20", category: "도서관", content: "도서관 이용 안내 본문입니다...", isBookmarked: true },
  { id: 2, title: "2024 2학기 장학금 신청 안내", date: "2024-05-19", category: "장학금", content: "장학금 신청 방법 안내 본문입니다...", isBookmarked: false },
  { id: 3, title: "기숙사 신청 공지", date: "2024-05-18", category: "기숙사", content: "기숙사 입사 신청 안내 본문입니다...", isBookmarked: false },
];

export default function BookmarkPanel({ isOpen }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!isOpen) return null;

  const bookmarkedPosts = dummyNotices.filter((post) => post.isBookmarked);

  const handleTitleClick = (post) => {
    // 이미 선택된 글을 다시 누르면 상세창 닫기, 아니면 해당 글 열기
    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <div className="bookmark-panel-wrapper">
      {/* 왼쪽: 게시글 목록 회색 상자*/}
      <div className="bookmark-list-box">
        <div className="bookmark-list-header">
          <h3>북마크 목록</h3>
        </div>
        
        {/* 0개일 때 빈 화면 보여주기*/}
        {bookmarkedPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
            <p>아직 북마크한 공지사항이 없습니다.</p>
          </div>
        ) : (
          <ul className="bookmark-list">
            {bookmarkedPosts.map((post) => (
              <li 
                key={post.id} 
                className={`bookmark-item ${selectedPost?.id === post.id ? "active" : ""}`}
                onClick={() => handleTitleClick(post)}
              >
                <span className="post-category">[{post.category}]</span>
                <span className="post-title">{post.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 오른쪽: 게시글 상세 내용*/}
      {selectedPost ? (
        <div className="bookmark-detail-viewer">
          <div className="detail-header">
            <div className="detail-header-top">
              <h2 className="detail-title">{selectedPost.title}</h2>
            </div>
            <div className="detail-meta">
              <span>{selectedPost.date}</span>
              <span>|</span>
              <span>{selectedPost.category}</span>
            </div>
          </div>
          <hr className="detail-divider" />
          <div className="detail-body">
            {selectedPost.content}
          </div>
        </div>
      ) : (
        <div className="bookmark-detail-viewer" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
          <p>목록에서 글을 선택해 상세 내용을 확인하세요.</p>
        </div>
      )}
    </div>
  );
}