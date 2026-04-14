import React, { useState } from 'react';
import './PostCard.css'

//포스트 카드 공통 컴포넌트 목록에서 사용
// 포스트 카드> 헤더(제목, 북마크 버튼)
//북마크 T/F (토글)

const PostCard = ({ id, title, date, category }) => {
    const [isBookmarked, setisBookmarked] = React.useState(false);

    const toggleBookmark = (e) => {
        e.stopPropagation();
        setisBookmarked(!isBookmarked);
    }
    return (
        <div className="Udada-post-card">
            <div className="Udada-post-id">{id}</div>
            <div className="post-title-wrapper">
                <span className="Udada-post-title">
                    [{category}]{title}
                </span>
            </div>
            <div className="Udada-post-date">{date}</div>
            <button className={`Udada-bookmark-button${isBookmarked ? 'active' : ''}`} onClick={toggleBookmark}>
                {isBookmarked ? '북마트됨' : '북마크안됨'}
            </button>
        </div>

    );
};

export default PostCard;