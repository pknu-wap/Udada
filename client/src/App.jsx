import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();

  const toggleBookmark = () => setIsBookmarkOpen(!isBookmarkOpen);
  const toggleKeywordPanel = () => setIsKeywordOpen(!isKeywordOpen);
  const handleActiveKeysChange = (activeSet, kws) => {
    setActiveKeywords(kws.filter((_, i) => activeSet.has(i)));
  };

  // 사이드바 숨길 페이지
  const hideSidebar = ["/", "/login", "/oauth/kakao/callback", "/email-input"].includes(location.pathname);

  return (
    <div className="app">
      {!hideSidebar && (
        <Sidebar
          isOpen={isBookmarkOpen}
          toggleBookmark={toggleBookmark}
          toggleKeyword={toggleKeywordPanel}
        />
      )}
      <div className="main-layout">
        <Routes>
          <Route path="/" element={isLoggedIn() ? <Navigate to="/home" /> : <Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/email-input" element={<EmailInput />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar
                  keywords={keywords}
                  onActiveKeysChange={handleActiveKeysChange}
                  onSearch={setSearchQuery}
                  searchQuery={searchQuery}
                />
                <div className="content-area">
                  <BookmarkPanel
                    isOpen={isBookmarkOpen}
                    onClose={() => setIsBookmarkOpen(false)}
                  />
                  <KeywordPanel
                    isOpen={isKeywordOpen}
                    onClose={() => setIsKeywordOpen(false)}
                    keywords={keywords}
                    setKeywords={setKeywords}
                  />
                  <Routes>
                    <Route
                      path="home"
                      element={
                        <Home
                          activeKeywords={activeKeywords}
                          searchQuery={searchQuery}
                        />
                      }
                    />
                    <Route path="post/:id" element={<Postdetail />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
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