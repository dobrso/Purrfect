import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Header() {
    const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">🐾 PURRFECT</div>

        <nav className="nav">
          <a href="#">Сервисы</a>
          <Link to="/articles">Статьи</Link>
          <a href="#">О проекте</a>
        </nav>

        <button className="login" onClick = {() => navigate("/auth")}>Войти</button>
      </div>
    </header>
  );
}