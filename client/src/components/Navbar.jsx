import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import filterIcon from "../assets/filter_icon.svg";
import searchIcon from "../assets/search.svg";

export default function Navbar({ keywords = [], onActiveKeysChange, onSearch }) {
  const [isActive, setIsActive] = useState(false);

  const [activeKeys, setActiveKeys] = useState(
    () => new Set(keywords.map((_, i) => i))
  );

  const [searchQuery, setSearchQuery] = useState("");

  const prevLenRef = React.useRef(keywords.length);
  React.useEffect(() => {
    if (keywords.length > prevLenRef.current) {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.add(keywords.length - 1);
        return next;
      });
    }
    prevLenRef.current = keywords.length;
  }, [keywords]);

  const handleSearch = () => {
    console.log("검색어:", searchQuery);
    onSearch?.(searchQuery); // 👈 Home.jsx로 검색어 전달
  };

  const toggleKey = (idx) => {
    const next = new Set(activeKeys);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setActiveKeys(next);
    onActiveKeysChange?.(next, keywords);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/home" className="logo-container">
          <img src="/logo.svg" alt="UDADA 로고" className="logo-svg" />
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-section">
          <div className={`search-wrapper ${isActive ? "active" : ""}`}>
            <button
              className={`Filter-btn ${isActive ? "active" : ""}`}
              onClick={() => setIsActive(!isActive)}
            >
              <img src={filterIcon} alt="필터" className="filter-icon" />
              필터링
            </button>
            <div className="divider" />
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="search-icon-btn" onClick={handleSearch}>
              <img src={searchIcon} alt="검색" className="search-icon" />
            </button>
          </div>
          {isActive && (
            <div className="keyword-dropdown">
              {keywords.length === 0 ? (
                <p className="keyword-dropdown-empty">설정된 키워드가 없어요</p>
              ) : (
                keywords.map((kw, idx) => (
                  <button
                    key={idx}
                    className={`keyword-dropdown-item ${
                      activeKeys.has(idx) ? "kd-active" : "kd-inactive"
                    }`}
                    onClick={() => toggleKey(idx)}
                  >
                    {kw}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}