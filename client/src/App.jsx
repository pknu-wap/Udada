import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BookmarkPanel from "./components/BookmarkPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Postdetail from "./pages/Postdetail";
import KeywordPanel from "./components/KeywordPanel";
import "./App.css";

function App() {

  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);
  const [keywords, setKeywords] = useState(["도서관", "장학금", "기숙사"]);

  const toggleBookmark = () => {
    setIsBookmarkOpen(!isBookmarkOpen);
  };

  const toggleKeywordPanel = () => {
    setIsKeywordOpen(!isKeywordOpen);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar
          isOpen={isBookmarkOpen}
          toggleBookmark={toggleBookmark}
          toggleKeyword={toggleKeywordPanel} />

        <div className="main-layout">
          <Routes>
            {/* 인트로 페이지 */}
            <Route path="/" element={<Intro />} />

            {/* 홈 페이지 (Navbar 포함) */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar keywords={keywords} />
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
                      <Route path="/home" element={<Home />} />
                      {/* 로그인 페이지 */}
                      <Route path="/login" element={<Login />} />
                      {/*상세페이지*/}
                      <Route path="/post/:id" element={<Postdetail />} />
                    </Routes>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;