import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notices";

function Home({ activeKeywords = [] }) {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices()
      .then((res) => {
        setNotices(res.data.notices);
      })
      .catch((err) => {
        console.error("공지사항 불러오기 실패", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filtered =
    selectedCategory === "전체"
      ? notices
      : notices.filter(
          (notice) => notice.categoryName === selectedCategory
        );

  if (loading) return <div>불러오는 중...</div>;

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