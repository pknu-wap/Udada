import React from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const notices = [
    {
      id: 1,
      title: "학술 정보 서비스 이용 안내",
      date: "2024-05-20",
      category: "도서관",
    },
    {
      id: 2,
      title: "2024 2학기 장학금 신청 안내",
      date: "2024-05-19",
      category: "장학금",
    },
    {
      id: 3,
      title: "기숙사 신청 공지",
      date: "2024-05-18",
      category: "기숙사",
    },
  ];

  return (
    <div className="home">

      <div className="content">

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
              <p>{notice.date}</p>
              <span>{notice.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;