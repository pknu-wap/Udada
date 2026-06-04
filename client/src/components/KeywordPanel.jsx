import React, { useState, useEffect } from "react";
import "./KeywordPanel.css";
import { getKeywords, addKeyword } from "../api/keywords";
import { getUserKeywords, addUserKeyword, deleteUserKeyword } from "../api/userKeywords";
import { debug } from "../utils/log";

export default function KeywordPanel({ isOpen, onClose, onUserKeywordsChange }) {
  const [keywords, setKeywords] = useState([]);
  const [userKeywords, setUserKeywords] = useState([]);
  const [input, setInput] = useState(""); // develop의 인풋 상태 추가

  useEffect(() => {
    if (!isOpen) return;
    
    // 두 API를 동시에 다루는 내 로직 유지 + 디버그 로그 추가
    Promise.all([getKeywords(), getUserKeywords()])
      .then(([keywordsRes, userKeywordsRes]) => {
        debug(keywordsRes.data); 
        
        const defaultKeywords = (keywordsRes.data.data || []).filter(kw => kw.default === true);
        setKeywords(defaultKeywords);
        
        const myKeywords = userKeywordsRes.data.data?.userKeywords || [];
        setUserKeywords(myKeywords);
      })
      .catch((err) => console.error("키워드 불러오기 실패:", err));
  }, [isOpen]);

  // 내 기능: 클릭 시 알림 키워드 토글 로직
  const toggleKeyword = async (keywordId) => {
    const existing = userKeywords.find(uk => uk.keywordId === keywordId);
    try {
      if (existing) {
        await deleteUserKeyword(existing.id);
        const next = userKeywords.filter(uk => uk.keywordId !== keywordId);
        setUserKeywords(next);
        onUserKeywordsChange?.(next.map(uk => uk.word).filter(Boolean));
      } else {
        
        const res = await addUserKeyword(keywordId);
        const word = keywords.find(kw => kw.id === keywordId)?.word;
        const next = [...userKeywords, {
          id: res.data.data.userKeywordId,
          keywordId,
          word
        }];
        setUserKeywords(next);
        onUserKeywordsChange?.(next.map(uk => uk.word).filter(Boolean));
      }
    } catch (err) {
      console.error("키워드 토글 실패:", err);
    }
  };

  // develop 기능: 인풋창에 입력해서 키워드 직접 추가하는 로직
  const handleAddKeyword = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    
    addKeyword(trimmed)
      .then((res) => {
        // 새로 추가된 키워드도 목록에 바로 반영되도록 등록
        const newKeyword = { id: res.data.id || res.data.data?.id, word: trimmed };
        setKeywords([...keywords, newKeyword]);
        setInput("");
      })
      .catch((err) => console.error("키워드 추가 실패:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="kp-overlay" onClick={onClose}>
      <div className="kp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="kp-top">
          <h2 className="kp-title">알림 키워드 설정</h2>
          <button className="kp-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="kp-desc-row">
          <span className="kp-desc">알림 받을 키워드를 선택해주세요</span>
        </div>
        
        {/* 내 기능: 활성화 스타일이 들어간 태그 목록 렌더링 */}
        <div className="kp-tags">
          {keywords.map((kw) => {
            const isSelected = userKeywords.some(uk => uk.keywordId === kw.id);
            return (
              <button
                key={kw.id}
                className={`kp-tag ${isSelected ? "kp-tag--active" : ""}`}
                onClick={() => toggleKeyword(kw.id)}
              >
                {kw.word}
              </button>
            );
          })}
        </div>

        {/* develop 기능: 하단 키워드 추가 인풋창 결합 */}
        <div className="kp-input-row">
          <input
            type="text"
            placeholder="키워드 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
          />
          <button className="kp-add-btn" onClick={handleAddKeyword}>
            ＋
          </button>
        </div>

      </div>
    </div>
  );
}