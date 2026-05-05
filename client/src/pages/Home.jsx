import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("http://localhost:3000/api/v1/notices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotices(data.notices);
        setLoading(false);
      })
      .catch((err) => {
        console.error("공지사항 불러오기 실패:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="home">
      <Sidebar />

      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력하세요" />
        </div>

        <div className="category-filter">
          <button>전체</button>
          <button>장학금</button>
          <button>도서관</button>
          <button>기숙사</button>
        </div>

        <div className="notice-list">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="notice-card"
              onClick={() => navigate(`/post/${notice.id}`)}
            >
              <h3>{notice.title}</h3>
              <p>{notice.noticedAt}</p>
              <span>{notice.categoryName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;