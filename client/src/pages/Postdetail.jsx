import "./Postdetail.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Postdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const dummyParsedData = {
            id: id,
            title: "게시글 제목",
            date: "2026. 04. 30",
            content: '예시데이터',
            bookmarked: false,
        };
        setPost(dummyParsedData);
        setIsBookmarked(dummyParsedData.bookmarked);
    }, [id]);


    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    if (!post) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail-box">
                {/* 상단 헤더 영역 */}
                <div className="article-header">
                    <span className="category-tag">[{post.category || "공지"}]</span>
                    <div className="header-top">
                        <h1 className="article-title">{post.title}</h1>

                        {/* 북마크 아이콘*/}
                        <button
                            className="bookmark-btn"
                            onClick={toggleBookmark}
                        >
                            {isBookmarked ? "(t)" : "(f)"}
                        </button>
                    </div>
                    <div className="header-bottom">
                        <span>{post.date}</span>
                    </div>
                </div>

                {/* 중앙 구분선 */}
                <hr className="content-divider" />

                {/* 본문 */}
                <div className="article-body">
                    <p>
                        {post.content}
                    </p>
                </div>

                {/* 하단 구분선 및 목록으로 버튼*/}
                <hr className="content-divider" />
                <div className="button-group">
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        목록으로
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Postdetail;