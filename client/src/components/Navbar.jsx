import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Navbar({ toggleKeywordPanel }) {
  // 카테고리 활성화 상태 관리
  const [isActive, setIsActive] = useState(false);

  const handleCategoryClick = () => {
    setIsActive(!isActive); // 색상 토글
    if (toggleKeywordPanel) toggleKeywordPanel(); // 패널 열기 기능 실행
  };

  return (
    <nav className="navbar-container">
      {/* 로고 왼쪽 배치 */}
      <div className="navbar-left">
        <Link to="/home" className="logo-container">
          <img src="/logo.svg" alt="UDADA 로고" className="logo-svg" />
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-section">
          {/* 카테고리 버튼 (회색 -> 클릭 시 붉은색) */}
          <button
            className={`category-btn ${isActive ? "active" : ""}`}
            onClick={handleCategoryClick}
          >
            카테고리
          </button>
          {/* 검색바 */}

          <div className="search-wrapper">
            <input type="text" className="search-input" placeholder="검색어를 입력" />
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>
      </div>
    </nav>
  );
}