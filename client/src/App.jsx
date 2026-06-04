import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoCallback from "./pages/KaKaoCallback";
import Postdetail from "./pages/Postdetail";
import EmailInput from "./pages/EmailInput";
import useAuth from "./hooks/useAuth";
import KeywordPanel from "./components/KeywordPanel";
import { getKeywords } from "./api/keywords";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();
const toggleBookmark = () => setIsBookmarkOpen((prev) => !prev);
const toggleKeywordPanel = () => setIsKeywordOpen((prev) => !prev);
  const handleActiveKeysChange = (activeSet, kws) => {
    setActiveKeywords(kws.filter((_, i) => activeSet.has(i)));
  };

  const hideSidebar = ["/", "/login", "/oauth/kakao/callback", "/email-input"].includes(location.pathname);
  const showShell = isLoggedIn() && !hideSidebar;

  useEffect(() => {
    if (!isLoggedIn()) return;
    getKeywords().then(res => {
      const defaultKeywords = (res.data.data || []).filter(kw => kw.default === true);
      setKeywords(defaultKeywords.map(kw => kw.word));
    })
    .catch(err => console.error("기본 제공 키워드 불러오기 실패:", err));
  }, [loggedIn]);

  return (
    <div className="app">
      {showShell && (
        <Sidebar
          isOpen={isBookmarkOpen}
          toggleBookmark={toggleBookmark}
          toggleKeyword={toggleKeywordPanel}
        />
      )}
      <div className="main-layout">

        {showShell && (
          <>
            <Navbar
              keywords={keywords}
              onActiveKeysChange={handleActiveKeysChange}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
            />
            <BookmarkPanel
              isOpen={isBookmarkOpen}
              onClose={() => setIsBookmarkOpen(false)}
            />
            <KeywordPanel
              isOpen={isKeywordOpen}
              onClose={() => setIsKeywordOpen(false)}
            />
          </>
        )}

<div className="content-area">
  <Routes>
    <Route path="/" element={isLoggedIn() ? <Navigate to="/home" /> : <Intro />} />
    <Route path="/login" element={<Login />} />
    <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
    <Route path="/email-input" element={<EmailInput />} />

    <Route
      path="/home"
      element={isLoggedIn() ? <Home activeKeywords={activeKeywords} searchQuery={searchQuery} /> : <Navigate to="/login" replace />}
    />
    <Route
      path="/post/:id"
      element={isLoggedIn() ? <Postdetail /> : <Navigate to="/login" replace />}
    />

    <Route path="*" element={<Navigate to={isLoggedIn() ? "/home" : "/login"} replace />} />
  </Routes>
</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;