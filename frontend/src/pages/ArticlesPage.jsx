import { Link } from "react-router-dom";
import {
  PawPrint,
  Clock,
  Calendar,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api";
import "../styles/ArticlesPage.css";

// Массив ссылок на картинки-заглушки (можно заменить на свои)
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=200&fit=crop"
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/');
        setArticles(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить статьи');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Функция для получения случайной картинки-заглушки
  const getRandomPlaceholder = () => {
    return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
  };

  if (loading) return <div className="loading">Загрузка статей...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="articles-page">
      <main className="articles-main">
        <div className="articles-banner">
          <h1>Полезные статьи о питомцах 🐾</h1>
          <p>Советы экспертов по уходу, воспитанию и здоровью ваших любимцев</p>
        </div>

        <div className="articles-grid">
          {articles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="article-card">
              <div className="article-image-wrapper">
                {/* Если есть article.image – используем его, иначе случайную заглушку */}
                <img
                  src={article.image || getRandomPlaceholder()}
                  alt={article.title}
                  className="article-image"
                />
                <div className="article-overlay"></div>
                <span className="article-category">Статья</span>
              </div>
              <div className="article-content-card">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">
                  {article.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                </p>
                <div className="article-meta">
                  <span className="article-date">
                    <Calendar size={14} />{' '}
                    {article.created_at
                      ? new Date(article.created_at).toLocaleDateString()
                      : 'Дата не указана'}
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
          <Link to="/create-article" className="create-article-card">
            + Написать статью
          </Link>
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