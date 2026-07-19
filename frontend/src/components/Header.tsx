import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">Home</Link>

        <div className="nav__right">
          {user ? (
            <>
              <span className="nav__user">
                こんにちは {user.name}
              </span>
              <button className="nav__button" onClick={logout}>
                ログアウト
              </button>
            </>
          ) : (
            <Link to="/login" className="nav__button nav__button--login">
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
