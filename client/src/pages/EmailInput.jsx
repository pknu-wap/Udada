import { useState } from "react";
import "./EmailInput.css";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식이 아니에요.");
      return;
    }

    setLoading(true);
    try {
      // TODO: 이메일 저장 API 호출
      // await api.post("/user/email", { email });
      console.log("이메일 저장:", email);
    } catch (err) {
      setError("오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // TODO: 이메일 없이 넘어가기
    console.log("이메일 입력 건너뜀");
  };

  return (
    <div className="email-page">
      <div className="email-card">
        <div className="email-icon">✉️</div>

        <h1 className="email-title">이메일을 알려주세요</h1>
        <p className="email-desc">
          알림 받을 이메일 주소를 입력해주세요.
        </p>

        <div className={`email-input-wrap ${error ? "has-error" : ""}`}>
          <input
            type="email"
            className="email-input"
            placeholder="example@email.com"
            value={email}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            autoFocus
          />
        </div>

        {error && <p className="email-error">{error}</p>}

        <button
          className="email-btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "저장 중..." : "확인"}
        </button>

      </div>
    </div>
  );
};

export default EmailInput;