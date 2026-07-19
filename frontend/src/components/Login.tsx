import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">ログイン</h2>

        <div className="login__form">
          <input
            className="login__input"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="login__input"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="login__button" onClick={handleLogin}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}
