import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notices";
import { addBookmark, deleteBookmark } from "../api/bookmarks";
import BookmarkIcon from "../components/BookmarkIcon";
import useAuth from "../hooks/useAuth";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
};

function Home({ activeKeywords = [], searchQuery = "" }) {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    getNotices()
      .then((res) => {
        console.log("응답:", res.data);
        const data = res?.data?.data?.notices || [];
        const sorted = [...data].sort((a, b) => a.id - b.id);
        setNotices(sorted);
      })
      .catch((err) => {
        console.error("공지사항 불러오기 실패", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [selectedKeyword, setSelectedKeyword] = useState("전체");

  // 검색어 + 키워드 필터링
  const filtered = notices.filter((notice) => {
    const keywordMatch =
      activeKeywords.length === 0 ||
      (notice.keywords ?? []).some((k) => activeKeywords.includes(k.word));
    const searchMatch =
      searchQuery === "" ||
      notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.keywords ?? []).some((k) =>
        k.word?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return keywordMatch && searchMatch;
  });

  const toggleBookmark = async (noticeId, isBookmarked) => {
    try {
      if (isBookmarked) {
        await deleteBookmark(noticeId);
      } else {
        await addBookmark(noticeId);
      }
      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === noticeId
            ? { ...notice, bookmarked: !notice.bookmarked }
            : notice,
        ),
      );
    } catch (err) {
      console.error("북마크 처리 실패", err);
    }
  };

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
          {filtered.map((notice) => {
            const keywords = notice.keywords ?? [];
            const firstKeyword = keywords[0];
            const restKeywords = keywords.slice(1);
            return (
              <div
                key={notice.id}
                className="notice-row"
                onClick={() => navigate(`/post/${notice.id}`)}
              >
                <span>{notice.id}</span>
                <span className="keywords-badges">
                  {firstKeyword && (
                    <span className="keywords-badge">{firstKeyword.word}</span>
                  )}
                  {restKeywords.length > 0 && (
                    <span
                      className="keywords-more"
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{restKeywords.length}
                      <div className="keywords-tooltip">
                        {keywords.map((item, idx) => (
                          <span key={idx} className="keywords-badge">
                            {item.word}
                          </span>
                        ))}
                      </div>
                    </span>
                  )}
                </span>
                <span>{notice.title}</span>
                <span>{formatDate(notice.noticedAt)}</span>
                <BookmarkIcon
                  bookmarked={notice.bookmarked}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(notice.id, notice.bookmarked);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
