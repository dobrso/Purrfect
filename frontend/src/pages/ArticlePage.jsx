import { useParams, Link, NavLink } from "react-router-dom";
import { 
  PawPrint, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Heart, 
  Bookmark, 
  Share2,
  ChevronRight
} from "lucide-react";

import { articlesData } from "../data/articlesData";
import "../styles/ArticlePage.css";

export default function ArticlePage() {
  const { id } = useParams();
  
  // Находим статью напрямую
  const article = articlesData.find(item => item.id === Number(id));

  console.log("ID из URL:", id);
  console.log("Найденная статья:", article);


  if (!article) {
    return (
      <div className="article-page">
        <header className="article-header">
          <Link to="/" className="article-logo">
            <PawPrint size={24} />
            PURRFECT
          </Link>
          <nav className="article-nav">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/cabinet">Личный кабинет</NavLink>
            <NavLink to="/articles">Статьи</NavLink>
          </nav>
          <div className="article-user">
            <div className="article-avatar">П</div>
            <span>Полина</span>
          </div>
        </header>
        <main className="article-main">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>Статья не найдена</h2>
            <Link to="/articles" style={{ color: '#f97316', marginTop: '16px', display: 'inline-block' }}>
              Вернуться к статьям
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="article-page">
      <header className="article-header">
        <Link to="/" className="article-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="article-nav">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/cabinet">Личный кабинет</NavLink>
          <NavLink to="/articles">Статьи</NavLink>
        </nav>
        <div className="article-user">
          <div className="article-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="article-main">
        <div className="article-back">
          <Link to="/articles" className="back-link">
            <ArrowLeft size={18} /> Назад к статьям
          </Link>
        </div>

        <img src={article.image} alt={article.title} className="article-hero-image" />

        <div className="article-author-section">
          <div className="author-info">
            <img src={article.author.avatar} alt={article.author.name} className="author-avatar" />
            <div className="author-details">
              <h3>{article.author.name}</h3>
              <p>Автор статьи</p>
            </div>
          </div>
          <div className="article-meta-info">
            <span><Calendar size={16} /> {article.date}</span>
            <span><Clock size={16} /> {article.readTime} чтения</span>
          </div>
        </div>

        <div className="article-actions">
          <button className="action-btn">
            <Heart size={18} /> Нравится
          </button>
          <button className="action-btn">
            <Bookmark size={18} /> Сохранить
          </button>
          <button className="action-btn">
            <Share2 size={18} /> Поделиться
          </button>
        </div>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className="read-more-section">
          <h3>🐾 Понравилась статья?</h3>
          <p>У нас есть ещё много полезных материалов для заботливых хозяев</p>
          <Link to="/articles" className="read-more-link">
            Читать другие статьи <ChevronRight size={18} />
          </Link>
        </div>
      </main>

      <footer className="article-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}