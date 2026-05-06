import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home({ activeKeywords = [] }) {
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

  // activeKeywords가 비어있으면 전체 표시, 있으면 해당 카테고리만
  const filtered = activeKeywords.length === 0
    ? notices
    : notices.filter((n) => activeKeywords.includes(n.categoryName));

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
                <p>{notice.noticedAt}</p>
                <span>{notice.categoryName}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;