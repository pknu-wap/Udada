import React, { useState } from "react";
import "./KeywordPanel.css";

export default function KeywordPanel({ isOpen, onClose }) {
  const [keywords, setKeywords] = useState([
    "키워드", "키워드가길어지면알아서길어지게?"
  ]);
  const [input, setInput] = useState("");

  const addKeyword = () => {
    const trimmed = input.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="kp-overlay" onClick={onClose}>
      <div className="kp-panel" onClick={(e) => e.stopPropagation()}>

        <div className="kp-top">
          <h2 className="kp-title">추천 키워드</h2>
          <button className="kp-close" onClick={onClose}>✕</button>
        </div>

        <div className="kp-desc-row">
          <span className="kp-desc">원하는 키워드를 입력해주세요</span>
        </div>

        <div className="kp-tags">
          {keywords.map((kw, idx) => (
            <button key={idx} className="kp-tag">
              {kw}
            </button>
          ))}
        </div>

        <div className="kp-input-row">
          <input
            type="text"
            placeholder="키워드 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addKeyword()}
          />
          <button className="kp-add-btn" onClick={addKeyword}>＋</button>
        </div>

      </div>
    </div>
  );
}