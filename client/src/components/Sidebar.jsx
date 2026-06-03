import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import homeIcon from "../assets/home.svg";
import bookmarkIcon from "../assets/favourite_sidebar.svg";
import keywordIcon from "../assets/keywordIcon.svg";
import logoutIcon from "../assets/logout.svg";
import useAuth from "../hooks/useAuth";

export default function Sidebar({ toggleKeyword }) {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-menu-group">
        <Link to="/home" className="menu-item home-btn" title="홈">
          <img src={homeIcon} alt="홈" className="homeIcon" />
        </Link>

        <Link to="/bookmarks" className="menu-item" title="북마크">
          <img src={bookmarkIcon} alt="북마크" className="bookmark" />
        </Link>

        <div
          className="menu-item keyword-btn"
          onClick={toggleKeyword} // ← Link → div로 변경
          title="설정"
        >
          <img src={keywordIcon} alt="키워드설정" />
        </div>
      </div>
      <div className="sidebar-bottom-group">
        <div className="menu-item" onClick={logout} title="로그아웃">
          <img src={logoutIcon} alt="로그아웃" className="logout" />
        </div>
      </div>
    </aside>
  );
}
