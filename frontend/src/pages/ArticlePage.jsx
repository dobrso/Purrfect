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
import { useState, useEffect } from "react";
import api from "../api";
import "../styles/ArticlePage.css";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}/`);
        // Бэкенд возвращает { article: {...} }
        setArticle(response.data.article);
      } catch (err) {
        console.error(err);
        setError('Статья не найдена');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div className="loading">Загрузка статьи...</div>;
  if (error || !article) {
    return (
      <div className="article-page">
        <header className="article-header">... (как в вашем компоненте)</header>
        <main className="article-main">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>{error || 'Статья не найдена'}</h2>
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

        {/* Если нет поля image, замените на заглушку или уберите */}
        <img src={article.image || '/default-article.jpg'} alt={article.title} className="article-hero-image" />

        <div className="article-author-section">
          <div className="author-info">
            {/* Если автор приходит как объект с avatar, иначе заглушка */}
            <img src={article.author?.avatar || '/default-avatar.png'} alt={article.author?.name || 'Автор'} className="author-avatar" />
            <div className="author-details">
              <h3>{article.author?.name || 'Автор'}</h3>
              <p>Автор статьи</p>
            </div>
          </div>
          <div className="article-meta-info">
            <span><Calendar size={16} /> {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'Дата не указана'}</span>
            <span><Clock size={16} /> ~5 мин чтения</span>
          </div>
        </div>

        <div className="article-actions">
          <button className="action-btn"><Heart size={18} /> Нравится</button>
          <button className="action-btn"><Bookmark size={18} /> Сохранить</button>
          <button className="action-btn"><Share2 size={18} /> Поделиться</button>
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