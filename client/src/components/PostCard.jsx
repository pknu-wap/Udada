import React, { useState } from 'react';
import './PostCard.css'

//포스트 카드 공통 컴포넌트 목록에서 사용
// 포스트 카드> 헤더(제목, 북마크 버튼)
//북마크 T/F (토글)

const PostCard = ({ title, date, category }) => {
    const [isBookmarked, setisBookmarked] = React.useState(false);

    const toggleBookmark = (e) => {
        e.stopPropagation();
        setisBookmarked(!isBookmarked);
    }
    return (
        <div className="Udada-post-card">
            <div className="Udada-post-header">
                <div className="Udada-post-info">
                    <span className="Udada-post-category">{category}</span>
                    <span className="Udada-post-date">{date}</span>
                </div>
                <h2 className="Udada-post-title">{title}</h2>
                <button className={`Udada-bookmark-button${isBookmarked ? 'active' : ''}`} onClick={toggleBookmark}>
                    {isBookmarked ? '북마트됨' : '북마크안됨'}
                </button>
            </div>

            <div className="Udada-post-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default PostCard;