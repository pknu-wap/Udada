import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notices";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";

function Home({ activeKeywords = [], searchQuery = "" }) {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices()
      .then((res) => {
        console.log("응답:", res.data);
        setNotices(res.data.data.notices);
      })
      .catch((err) => {
        console.error("공지사항 불러오기 실패", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  // 👇 검색어 + 키워드 필터링
  const filtered = notices.filter((notice) => {
    const keywordMatch =
      selectedKeyword === "전체" || notice.keywordName === selectedKeyword;
    const searchMatch =
      searchQuery === "" ||
      notice.title.includes(searchQuery) ||
      (notice.keywords ?? []).some((k) => k.word.includes(searchQuery));
    return keywordMatch && searchMatch;
  });

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
                {(notice.keywords ?? []).map((item, idx) => (
                  <span key={idx} className="keywords-badge">{item.word}</span>
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