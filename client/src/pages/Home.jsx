import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home({ activeKeywords = [] }) {
  const navigate = useNavigate();

  const [notices] = useState([
    {
      id: 1,
      title: "게시글1",
      noticedAt: "2026. 04. 11",
      categoryName: "도서관",
    },
    {
      id: 2,
      title: "게시글1",
      noticedAt: "2026. 04. 11",
      categoryName: "도서관",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filtered =
    selectedCategory === "전체"
      ? notices
      : notices.filter(
          (notice) => notice.categoryName === selectedCategory
        );

  return (
    <div className="home">
      <div className="content">

      
        {/* 테이블 헤더 */}
        <div className="notice-header">
          <span>번호</span>
          <span>카테고리</span>
          <span>제목</span>
          <span>작성일</span>
          <span>북마크</span>
        </div>

        {/* 공지 리스트 */}
        <div className="notice-list">
          {filtered.map((notice) => (
            <div
              key={notice.id}
              className="notice-row"
              onClick={() => navigate(`/post/${notice.id}`)}
            >
              <span>{notice.id}</span>
              <span>[{notice.categoryName}]</span>
              <span>{notice.title}</span>
              <span>{notice.noticedAt}</span>
              <span>🔖</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;