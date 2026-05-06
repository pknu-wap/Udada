import "./Postdetail.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Postdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        // 토큰 없으면 로그인 페이지로 튕겨내기
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3000/api/v1/notices/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setIsBookmarked(data.isBookmarked);
            })
            .catch((err) => {
                console.error("공지사항 불러오기 실패:", err);
            });
    }, [id]);

    const toggleBookmark = () => {
        if (isBookmarked) {
            fetch(`http://localhost:3000/api/v1/bookmarks/${bookmarkId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                })
                .catch((err) => console.error("북마크 삭제 실패:", err));
        } else {
            fetch("http://localhost:3000/api/v1/bookmarks", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ noticeId: id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsBookmarked(true);
                    setBookmarkId(data.bookmarkId);
                })
                .catch((err) => console.error("북마크 추가 실패:", err));
        }
    };

    if (!post) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail-box">
                <div className="article-header">
                    <span className="category-tag">[{post.keywordName || "공지"}]</span>
                    <div className="header-top">
                        <h1 className="article-title">{post.title}</h1>
                        <button className="bookmark-btn" onClick={toggleBookmark}>
                            {isBookmarked ? "★" : "☆"}
                        </button>
                    </div>
                    <div className="header-bottom">
                        <span>{post.noticedAt}</span>
                    </div>
                </div>

                <hr className="content-divider" />

                <div className="article-body">
                    <p>{post.content}</p>
                </div>

                <hr className="content-divider" />
                <div className="button-group">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Postdetail;