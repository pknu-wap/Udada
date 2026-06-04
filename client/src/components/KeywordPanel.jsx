import React, { useState, useEffect } from "react";
import "./KeywordPanel.css";
import { getKeywords } from "../api/keywords";
import { getUserKeywords, addUserKeyword, deleteUserKeyword } from "../api/userKeywords";

export default function KeywordPanel({ isOpen, onClose }) {
  const [keywords, setKeywords] = useState([]);       // 기본 제공 키워드 목록
  const [userKeywords, setUserKeywords] = useState([]); // 내가 설정한 키워드 목록

  useEffect(() => {
    if (!isOpen) return;

    // 기본 키워드 + 내 알림 키워드 동시에 불러오기
    Promise.all([getKeywords(), getUserKeywords()])
      .then(([keywordsRes, userKeywordsRes]) => {
        // default:true인 것만 표시
        const defaultKeywords = (keywordsRes.data.data || []).filter(kw => kw.default === true);
        setKeywords(defaultKeywords);

        // 내가 설정한 키워드 목록
        const myKeywords = userKeywordsRes.data.data?.userKeywords || [];
        setUserKeywords(myKeywords);
      })
      .catch((err) => console.error("키워드 불러오기 실패:", err));
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="kp-overlay" onClick={onClose}>
      <div className="kp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="kp-top">
          <h2 className="kp-title">알림 키워드 설정</h2>
          <button className="kp-close" onClick={onClose}>✕</button>
        </div>

        <div className="kp-desc-row">
          <span className="kp-desc">이메일로 알림 받을 키워드를 선택해주세요</span>
        </div>

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
      </div>
    </div>
  );
}