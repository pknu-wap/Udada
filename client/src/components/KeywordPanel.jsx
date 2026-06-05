import React, { useState, useEffect } from "react";
import "./KeywordPanel.css";
import { getKeywords } from "../api/keywords";
/* import { getKeywords, addKeyword } from "../api/keywords"; addkeyword는 추후 개발시 추가 */
import { getUserKeywords, addUserKeyword, deleteUserKeyword } from "../api/userKeywords";
import { debug } from "../utils/log";

export default function KeywordPanel({
  isOpen,
  onClose,
}) {
  /*const [input, setInput] = useState("");*/
  const [apiKeywords, setApiKeywords] = useState([]);
  const [userKeywords, setUserKeywords] = useState([]); 

  useEffect(() => {
    if (!isOpen) return;
    Promise.all([getKeywords(), getUserKeywords()])
      .then(([allRes, userRes]) => {
        debug(allRes.data);
        debug(userRes.data);
        setApiKeywords(allRes.data?.data || []);
        setUserKeywords(userRes.data?.userKeywords || []);
      })
      .catch((err) => console.error("키워드 불러오기 실패:", err));
  }, [isOpen]);

/*  const handleAddKeyword = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addKeyword(trimmed)
      .then((res) => {
        setApiKeywords([
          ...apiKeywords,
          { id: res.data.id, word: res.data.word },
        ]);
        setInput("");
      })
      .catch((err) => console.error("키워드 추가 실패:", err));
  };
키워드 추가는 추후 개발건
*/

const handleToggle = async (kw) => {
    const existing = userKeywords.find((uk) => uk.keywordId === kw.id);

    if (existing) {
      try {
        await deleteUserKeyword(existing.id);
        setUserKeywords((prev) => prev.filter((uk) => uk.id !== existing.id));
      } catch (err) {
        console.error("키워드 알림 해제 실패:", err);
      }
    } else {
      try {
        const res = await addUserKeyword(kw.id);
        setUserKeywords((prev) => [
          ...prev,
          { id: res.data?.userKeywordId, keywordId: kw.id, word: kw.word },
        ]);
      } catch (err) {
        console.error("키워드 알림 등록 실패:", err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="kp-overlay" onClick={onClose}>
      <div className="kp-panel" onClick={(e) => e.stopPropagation()}>
        <div className="kp-top">
          <h2 className="kp-title">알람 설정 키워드</h2>
          <button className="kp-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="kp-desc-row">
          <span className="kp-desc">이메일로 알람 받고 싶은 키워드를 설정해주세요!</span>
        </div>

        <div className="kp-tags">
          {apiKeywords.map((kw) => {
            const isActive = userKeywords.some((uk) => uk.keywordId === kw.id);
              return (
              <button
                key={kw.id}
                className={`kp-tag${isActive ? " active" : ""}`}
                onClick={() => handleToggle(kw)}
              >
                {kw.word}
              </button>
            );
          })}
        </div>

        <div className="kp-input-row kp-input-disabled">
          <input
            type="text"
            placeholder="키워드 입력"
            disabled
            /*onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
            추후 개발건
            */
          />
          <button className="kp-add-btn" disabled /* onClick={handleAddKeyword} */>
            ＋
          </button>
        </div>
        <p className="kp-coming-soon">🔒 키워드 추가 기능은 추후 개발 예정입니다</p>
      </div>
    </div>
  );
}
