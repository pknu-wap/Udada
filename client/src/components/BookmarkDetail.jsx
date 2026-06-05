import React from "react";
import "./BookmarkDetail.css";
import bookmarkTrueIcon from "../assets/favourite_true.svg";

export default function BookmarkDetail({ post, onClose, onToggleBookmark }) {
  if (!post) {
    return (
      <div className="bookmark-detail-empty">
        <p>목록에서 글을 선택해 상세 내용을 확인하세요.</p>
      </div>
    );
  }

  const fileAttachments = post.attachments?.filter(
    (file) => file.fileType?.toUpperCase() === "FILE"
  ) || [];

  return (
    <div className="bookmark-detail-viewer">
      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-title-row">
            <h2 className="detail-title">{post.title}</h2>
            <button
              className="detail-bookmark-btn"
              onClick={() => onToggleBookmark(post.noticeId)}
            >
              <img
                src={bookmarkTrueIcon}
                alt="북마크"
                className="detail-bookmark-icon"
              />
            </button>
          </div>
          <div className="detail-meta">
            <span>{post.noticedAt}</span>
            <span>|</span>
            <span>{post.keywordName}</span>
          </div>
        </div>
        <hr className="detail-divider" />
        <div 
          className="detail-body article-body" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {fileAttachments.length > 0 && (
          <div className="attachments-section">
            <h3 className="attachments-title">첨부파일</h3>
            <ul className="attachments-list">
              {fileAttachments.map((file) => (
                <li key={file.id} className="attachment-item">
                  <a 
                    href={file.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download={file.fileName}
                  >
                    📎 {file.fileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <hr className="detail-divider" />
        <div className="detail-footer">
          <button className="detail-link-btn" onClick={onClose}>
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
