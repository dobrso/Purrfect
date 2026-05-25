import { useParams, Link } from "react-router-dom";
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

// Массив ссылок на картинки-заглушки
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&h=400&fit=crop"
];

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}/`);
        setArticle(response.data);
      } catch (err) {
        console.error(err);
        setError('Статья не найдена');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const getRandomPlaceholder = () => {
    return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
  };

  if (loading) return <div className="loading">Загрузка статьи...</div>;
  if (error || !article) {
    return (
      <div className="article-page">
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
      <main className="article-main">
        <div className="article-back">
          <Link to="/articles" className="back-link">
            <ArrowLeft size={18} /> Назад к статьям
          </Link>
        </div>

        {/* Изображение статьи: если есть article.image – берём его, иначе случайную заглушку */}
        <img
          src={article.image || getRandomPlaceholder()}
          alt={article.title}
          className="article-hero-image"
        />

        <div className="article-author-section">
          <div className="author-info">
            {/* Аватар автора: если есть – показываем, иначе заглушка */}
            <img
              src={article.author?.avatar || '/default-avatar.png'}
              alt={article.author?.username || 'Автор'}
              className="author-avatar"
            />
            <div className="author-details">
              <h3>{article.author?.username || 'Автор'}</h3>
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