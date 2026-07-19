import { useState } from "react";
import { useAuth } from "../AuthContext";
import "./Login.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, fetchUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);

      if (res?.ok) {
        toast.success("ログインしました！");
        navigator("/");
      } else {
        const data = await res.json();

        if (data.error === "EMAIL_NOT_FOUND") {
          toast.error("メールアドレスが存在しません");
        } else if (data.error === "Invalid credentials") {
          toast.error("メールアドレスまたはパスワードが違います");
        } else {
          toast.error("ログインに失敗しました");
        }
      }
    } catch {
      toast.error("通信エラーが発生しました");
    }
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
