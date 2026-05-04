import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Navbar({ toggleKeywordPanel }) {
  return (
    <div className="navbar-container">
      {/* 로고 왼쪽 배치 */}
      <div className="navbar-left"></div>

      <div className="navbar-right">
        <div className="search-section">
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="검색어를 입력" />
            <button className="search-btn">🔍</button>
          </div>

          <button className="keyword-btn" onClick={toggleKeywordPanel}>
            # 키워드 설정
          </button>

          {/* 구분선 및 로그인 */}
          <div className="nav-divider"></div>
        </div>
      </div>
    </div>
  );
}