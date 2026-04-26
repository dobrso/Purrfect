import { Link, NavLink } from "react-router-dom";
import { 
  PawPrint, 
  Clock, 
  Calendar, 
  ChevronRight
} from "lucide-react";

import { articlesData } from "../data/articlesData";
import "../styles/ArticlesPage.css";

export default function ArticlesPage() {
  return (
    <div className="articles-page">
      <header className="articles-header">
        <Link to="/" className="articles-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="articles-nav">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/cabinet">Личный кабинет</NavLink>
          <NavLink to="/articles" className="active">Статьи</NavLink>
        </nav>
        <div className="articles-user">
          <div className="articles-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="articles-main">
        {/* Приветственный баннер */}
        <div className="articles-banner">
          <h1>Полезные статьи о питомцах 🐾</h1>
          <p>Советы экспертов по уходу, воспитанию и здоровью ваших любимцев</p>
        </div>

        {/* Сетка статей */}
        <div className="articles-grid">
          {articlesData.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="article-card">
              <div className="article-image-wrapper">
                <img src={article.image} alt={article.title} className="article-image" />
                <div className="article-overlay"></div>
                <span className="article-category">{article.category}</span>
              </div>
              <div className="article-content-card">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <div className="article-meta">
                  <span className="article-date">
                    <Calendar size={14} /> {article.date}
                  </span>
                  <span className="article-read-time">
                    <Clock size={14} /> {article.readTime}
                  </span>
                </div>
                <div className="read-more">
                  Читать статью <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="articles-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}