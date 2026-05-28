import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import homeIcon from "../assets/home.svg";
import bookmarkIcon from "../assets/favourite_sidebar.svg";
import keywordIcon from "../assets/keywordIcon.svg";
import logoutIcon from "../assets/logout.svg";

export default function Sidebar({ toggleBookmark, isOpen, toggleKeyword }) {

  const handleLogout = () => {
    console.log("로그아웃");
    navigate("/"); // 로그아웃 후 인트로로 이동
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-menu-group">

        <Link to="/" className="menu-item home-btn" title="홈">
          {/* svg파일 교체 예정 */}
          <img src={homeIcon} alt="홈" className="homeIcon" />
        </Link>

        <div
          className={`menu-item ${isOpen ? "active" : ""}`}
          onClick={toggleBookmark}
          style={{ cursor: 'pointer' }}
          title="북마크"
        >
          <img src={bookmarkIcon} alt="북마크" className="bookmark" />
        </div>

        <div
          className="menu-item keyword-btn"
          onClick={toggleKeyword}   // ← Link → div로 변경
          title="설정" title="설정">
          <img src={keywordIcon} alt="검색"/>
        </div>

      </div>
      <div className="sidebar-bottom-group">
        <div
          className="menu-item"
          onClick={handleLogout}
          title="로그아웃"
        >
          <img src={logoutIcon} alt="검색" className="logout" />
        </div>
      </div>
    </aside>
  );
}