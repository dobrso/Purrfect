import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">🐾 PURRFECT</div>

        <nav className="nav">
          <Link to="/services">Сервисы</Link>
          <Link to="/articles">Статьи</Link>
          <a href="#">О проекте</a>
          <Link to="/marketplace">Маркетплейс</Link>
        </nav>

        <button className="login" onClick={() => navigate("/auth")}>
          Войти
        </button>
      </div>
    </header>
  );
}