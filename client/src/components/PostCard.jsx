import React, { useState } from 'react';


//포스트 카드 공통 컴포넌트
// 포스트 카드> 헤더(제목, 북마크 버튼)>내용
//북마크 T/F (토글)

const PostCard = ({ title, content }) => {
    const [isBookmarked, setisBookmarked] = React.useState(false);

    const toggleBookmark = () => {
        setisBookmarked(!isBookmarked);
    }
    return (
        <div className="-Udada-post-card">
            <div className="Udada-post-header">
                <h2 className="Udada-post-title">{title}</h2>
                <button className={`Udada-bookmark-button${isBookmarked?'active':''}`} onClick={toggleBookmark}>
                    {isBookmarked ? '1' : '2'}
                </button>
            </div>

            <div className="Udada-post-content">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default PostCard;