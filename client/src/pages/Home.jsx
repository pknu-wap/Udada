import React from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

function Home({ activeKeywords = [] }) {
  const navigate = useNavigate();

  const notices = [
    {
      id: 1,
      title: "학술 정보 서비스 이용 안내",
      date: "2024-05-20",
      keyword: "도서관",
    },
    {
      id: 2,
      title: "2024 2학기 장학금 신청 안내",
      date: "2024-05-19",
      keyword: "장학금",
    },
    {
      id: 3,
      title: "기숙사 신청 공지",
      date: "2024-05-18",
      keyword: "기숙사",
    },
  ];
    // activeKeywords가 비어있으면 전체 표시, 있으면 해당 카테고리만
   const filtered = activeKeywords.length === 0
    ? notices
    : notices.filter((n) => activeKeywords.includes(n.category));


  return (
    <div className="home">

      <div className="content">

        <div className="notice-list">
          {filtered.length === 0 ? (
            <p className="no-result">표시할 공지가 없어요</p>
          ) : (
            filtered.map((notice) => (
              <div
                key={notice.id}
                className="notice-card"
                onClick={() => navigate(`/post/${notice.id}`)}
              >
                <h3>{notice.title}</h3>
                <p>{notice.date}</p>
                <span>{notice.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;