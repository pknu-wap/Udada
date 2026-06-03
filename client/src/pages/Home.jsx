import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notices";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";


function Home({ activeKeywords = [] }) {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(new Set());

 useEffect(() => {
  getNotices()
    .then((res) => {
      console.log("백엔드 API 전체 응답 데이터:", res);
      console.log("res.data.data.notices 데이터:", res?.data);

      const data = res?.data?.data?.notices||[];

      setNotices(data); // notices 세팅

      if (Array.isArray(data)) {
        setBookmarked(
          new Set(data.filter((n) => n && n.isBookmarked).map((n) => n.id))
        );
      }
    })
    .catch((err) => {
      console.error("공지사항 불러오기 실패", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  

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
      : notices.filter((notice) => notice.keywordName === selectedKeyword);

  if (loading) return <div>불러오는 중...</div>;

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
                <span className="keywords-badge">{notice.keywordName}</span>
                {/* {(notice. ?? []).map((kw, idx) => (
                  <span key={idx} className="keywords-badge">{kw}</span>
                ))} */}
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