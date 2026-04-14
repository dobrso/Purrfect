import { Link, NavLink } from "react-router-dom";
import { 
  PawPrint, 
  Clock, 
  Calendar, 
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api"; // ваш axios-экземпляр
import "../styles/ArticlesPage.css";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/');
        // Бэкенд возвращает { articles: [...] }
        setArticles(response.data.articles || []);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить статьи');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Загрузка статей...</div>;
  if (error) return <div className="error">{error}</div>;

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
        <div className="articles-banner">
          <h1>Полезные статьи о питомцах 🐾</h1>
          <p>Советы экспертов по уходу, воспитанию и здоровью ваших любимцев</p>
        </div>

        <div className="articles-grid">
          {articles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="article-card">
              <div className="article-image-wrapper">
                {/* Если в статье есть поле image, иначе заглушка */}
                <img src={article.image || '/default-article.jpg'} alt={article.title} className="article-image" />
                <div className="article-overlay"></div>
                <span className="article-category">{article.category || 'Советы'}</span>
              </div>
              <div className="article-content-card">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.content?.substring(0, 120)}...</p>
                <div className="article-meta">
                  <span className="article-date">
                    <Calendar size={14} /> {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'Дата не указана'}
                  </span>
                  <span className="article-read-time">
                    <Clock size={14} /> ~5 мин
                  </span>
                </div>
                <div className="read-more">
                  Читать статью <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
          <Link to="/create-article">Написать статью</Link>
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