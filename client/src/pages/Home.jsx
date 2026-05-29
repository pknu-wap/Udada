import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";

function Home({ activeKeywords = [] }) {
  const navigate = useNavigate();

  const [notices] = useState([
    {
      id: 1,
      title: "게시글1",
      noticedAt: "2026. 04. 11",
      keywords: ["도서관", "학교"],
      isBookmarked: true,
    },
    {
      id: 2,
      title: "게시글1",
      noticedAt: "2026. 04. 11",
      keywords: ["도서관"],
      isBookmarked: false,
    },
  ]);

  const [bookmarked, setBookmarked] = useState(
    () => new Set(notices.filter((n) => n.isBookmarked).map((n) => n.id))
  );

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const [selectedKeyword, setSelectedKeyword] = useState("전체");

  const filtered =
    selectedKeyword === "전체"
      ? notices
      : notices.filter(
          (notice) => notice.keywords.includes(selectedKeyword)
        );

  return (
    <div className="home">
      <div className="content">


        {/* 테이블 헤더 */}
        <div className="notice-header">
          <span>번호</span>
          <span>키워드</span>
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
              <span className="keywords-badges">
                {(notice.keywords ?? []).map((kw, idx) => (
                  <span key={idx} className="keywords-badge">{kw}</span>
                ))}
              </span>
              <span>{notice.title}</span>
              <span>{notice.noticedAt}</span>
              <img
                src={bookmarked.has(notice.id) ? bookmarkTrueIcon : bookmarkIcon}
                alt="북마크"
                className="bookmark-icon"
                onClick={(e) => toggleBookmark(e, notice.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;