import bookmarkIcon from "../assets/favourite_false.svg";
import bookmarkTrueIcon from "../assets/favourite_true.svg";

function BookmarkIcon({ bookmarked, onClick }) {
  return (
    <img
      src={bookmarked ? bookmarkTrueIcon : bookmarkIcon}
      alt="bookmark"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}

export default BookmarkIcon;
