import "./Postdetail.css";
import { useParams, useNavigate } from "react-rounter-dom";
import Navbar from client / src / components / Sidebar.jsx;

const Postdetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [Post, setPost] = useState({
        id: 1,
        title: "학술 정보 서비스 이용 안내",
        content: "공지사항입니다 감기조심하세요..",
        categoryId: 1,
        category: "도서관",
        originalUrl: "공지링크가들어가다",
        noticedAt: "2024-05-20",
        isBookmarked: false
    });
    const toggleBookmark = () => {
        setPost({ ...post, isBookmarked: !post.isBookmarked });
    };

    return (
        <div className="post-detail-button">
            <button className="back-button" onClick={() => navigate(-1)}>
                {/* 뒤로 돌아가기 */}
            </button>

            <article claaName="detail-article">
                <header className="article-header">
                    <div className="header-top">
                        <hi className="article-title">{post.title}</hi>
                        <button
                            className={`bookmark-btn ${post.isBookmarked ? "active" : ""}`}
                            onClick={toggleBookmark}
                        >
                            {post.isBookmarked ? "북마크됨" : "북마크안됨"}
                        </button>
                    </div>
                    <div className="header-bottom">
                        <span className="category-tag">{post.categroyName}</span>
                        <span className="write-date">{post.noticedAt}</span>
                    </div>
                </header>
                <hr className="content-divider"/>
                <section className="article-body">
                    {post.content}
                </section>
            </article>

        </div>
    )
}