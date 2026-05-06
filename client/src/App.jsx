import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Postdetail from "./pages/Postdetail";

import KeywordPanel from "./components/KeywordPanel";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);
  const [keywords, setKeywords] = useState(["도서관", "장학금", "기숙사"]);
  const [activeKeywords, setActiveKeywords] = useState(["도서관", "장학금", "기숙사"]);

  const toggleBookmark = () => setIsBookmarkOpen(!isBookmarkOpen);
  const toggleKeywordPanel = () => setIsKeywordOpen(!isKeywordOpen);
  const handleActiveKeysChange = (activeSet, kws) => {
    setActiveKeywords(kws.filter((_, i) => activeSet.has(i)));
  };

  // 사이드바 숨길 페이지
  const hideSidebar = ["/", "/login", "/oauth/kakao/callback"].includes(location.pathname);

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
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar keywords={keywords} onActiveKeysChange={handleActiveKeysChange} />
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
                    <Route path="/home" element={<Home activeKeywords={activeKeywords} />} />
                    <Route path="/post/:id" element={<Postdetail />} />
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
