import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import filterIcon from "../assets/filter_icon.svg";
import searchIcon from "../assets/search.svg";
import logoIcon from "../assets/logo.svg";

export default function Navbar({keywords = [], onActiveKeysChange, onSearch, searchQuery: externalQuery = "" }) {
  const [isActive, setIsActive] = useState(false);
  const [activeKeys, setActiveKeys] = useState(new Set());

  const [searchQuery, setSearchQuery] = useState(externalQuery);

  const isInitializedRef = React.useRef(false);
  React.useEffect(() => {
    if (keywords.length > 0 && !isInitializedRef.current) {
      const defaultKeys = new Set(keywords.map((kw) => kw.word));
      setActiveKeys(defaultKeys);
      onActiveKeysChange?.([...defaultKeys]);
      isInitializedRef.current = true;
    }
  }, [keywords]);

  React.useEffect(() => {
    setSearchQuery(externalQuery);
  }, [externalQuery]);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    console.log("검색어:", trimmed);
    onSearch?.(trimmed);
  };

  const toggleKey = (word) => {
    const next = new Set(activeKeys);
    next.has(word) ? next.delete(word) : next.add(word);
    setActiveKeys(next);
    onActiveKeysChange?.([...next]);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/home" className="logo-container">
          <img src={logoIcon} alt="홈" className="logoIcon" />
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
                keywords.map((kw) => (
                  <button
                    key={kw.id}
                    className={`keyword-dropdown-item ${activeKeys.has(kw.word) ? "kd-active" : "kd-inactive"
                      }`}
                    onClick={() => toggleKey(kw.word)}
                  >
                    {kw.word}
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