import "./Postdetail.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoticeDetail } from "../api/notices";
import { addBookmark, deleteBookmark } from "../api/bookmarks";
import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";

const Postdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkId, setBookmarkId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        

        // 토큰 없으면 로그인 페이지로 튕겨내기
        if (!token) {
            navigate("/login");
            return;
        }
    getNoticeDetail(id)
        .then((res) => {
            const data =res.data.data;
            setPost(data);
            setIsBookmarked(data.isBookmarked??false);
            if (data.isBookmarked && data.bookmarkId) {
                setBookmarkId(data.bookmarkId);
            }
        })
        .catch((err) => {
            console.error("공지사항 불러오기 실패:", err);
        });
}, [id]);

    const toggleBookmark = () => {
        if (isBookmarked) {
            deleteBookmark(bookmarkId)
                .then(() => {
                    setIsBookmarked(false);
                    setBookmarkId(null);
                })
                .catch((err) => console.error("북마크 삭제 실패:", err));
        } else {
            addBookmark(Number(id))
                .then((res) => {
                    setIsBookmarked(true);
                    setBookmarkId(res.data.bookmarkId);
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
                    <span className="keyword-tag">{post.keywords?.[0]?.word || "공지"}</span>
                    <div className="header-top">
                        <h1 className="article-title">{post.title}</h1>
                        <button className="bookmark-btn" onClick={toggleBookmark}>
                            <img
                                src={isBookmarked ? bookmarkTrueIcon : bookmarkIcon}
                                alt="북마크"
                                className="bookmark-icon"
                            />
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