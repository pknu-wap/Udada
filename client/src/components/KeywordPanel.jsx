import React, { useState, useEffect } from "react";
import "./KeywordPanel.css";
import { getKeywords, addKeyword } from "../api/keywords";
import { debug } from "../utils/log";

export default function KeywordPanel({
  isOpen,
  onClose,
  keywords,
  setKeywords,
}) {
  const [input, setInput] = useState("");
  const [apiKeywords, setApiKeywords] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    getKeywords()
      .then((res) => {
        debug(res.data);
        setApiKeywords(res.data.data);
      })
      .catch((err) => console.error("키워드 불러오기 실패:", err));
  }, [isOpen]);

  const handleAddKeyword = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addKeyword(trimmed)
      .then((res) => {
        setApiKeywords([
          ...apiKeywords,
          { id: res.data.id, word: res.data.word },
        ]);
        setKeywords([...keywords, trimmed]);
        setInput("");
      })
      .catch((err) => console.error("키워드 추가 실패:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="kp-overlay" onClick={onClose}>
      <div className="kp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="kp-top">
          <h2 className="kp-title">추천 키워드</h2>
          <button className="kp-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="kp-desc-row">
          <span className="kp-desc">원하는 키워드를 입력해주세요</span>
        </div>

        <div className="kp-tags">
          {apiKeywords.map((kw) => (
            <button key={kw.id} className="kp-tag">
              {kw.word}
            </button>
          ))}
        </div>

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
