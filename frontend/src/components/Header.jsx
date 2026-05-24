// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="component-header">
      <Link to="/" className="component-logo">
        <PawPrint size={24} />
        PURRFECT
      </Link>

      <nav className="component-nav">
        <Link to="/">Главная</Link>
        <Link to="/articles">Статьи</Link>
        <Link to="/marketplace">Маркетплейс</Link>
        {/* Ссылка "Личный кабинет" удалена */}
      </nav>

      <div className="auth-buttons">
        {user ? (
          <>
            <button
              onClick={() => navigate("/cabinet")}
              className="user-name-btn"
            >
              {user.username || user.email}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/auth")} className="login-btn">
            Войти
          </button>
        )}
      </div>
    </header>
  );
}