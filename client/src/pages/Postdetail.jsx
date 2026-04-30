import "./Postdetail.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Postdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [Post, setPost] = useState(null);
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
        setPost({ ...post, isBookmarked: !post.isBookmarked });
    };

    if (!post) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div style={{ padding: "40px", backgroundColor: "#fff", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", border: "1px solid #eee", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>

                {/* 상단 헤더 영역 */}
                <div className="article-header">
                    <div className="header-top">
                        <h1 className="article-title">{post.title}</h1>

                        {/* 북마크 아이콘*/}
                        <button
                            onClick={toggleBookmark}
                            style={{ background: "none", border: "none", fontSize: "2rem", cursor: "pointer", color: "#004080" }}
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
                    <p style={{ whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                        {post.content}
                    </p>
                </div>

                {/* 하단 구분선 및 목록으로 버튼*/}
                <hr className="content-divider" style={{ marginTop: "50px" }} />
                <div style={{ textAlign: "right" }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ padding: "10px 25px", backgroundColor: "#004080", color: "#fff", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        목록으로
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Postdetail;