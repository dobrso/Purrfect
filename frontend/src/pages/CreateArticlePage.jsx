import React, { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { PawPrint, Calendar, Clock, ChevronRight } from 'lucide-react';
import api from '../api';
import '../styles/CreateArticlePage.css';

const CreateArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Вы не авторизованы. Пожалуйста, войдите.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/articles/', { title, content });
      console.log('Статья создана:', response.data);
      navigate('/articles');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Сессия истекла. Пожалуйста, войдите снова.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Ошибка при создании статьи. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-page">
      {/* Шапка такая же, как на других страницах */}
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
            ← Назад к статьям
          </Link>
        </div>

        <div className="create-article-form-container">
          <h1 className="create-article-title">✍️ Создать новую статью</h1>
          
          {error && (
            <div className="create-article-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-article-form">
            <div className="form-group">
              <label htmlFor="title">Заголовок статьи</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: 5 правил ухода за кошкой"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Содержание</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="Введите текст статьи... Вы можете использовать разметку, но пока поддерживается обычный текст."
                required
                disabled={loading}
              />
            </div>

            <div className="create-article-actions">
              <button 
                type="submit" 
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Публикация...' : 'Опубликовать'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/articles')}
                className="cancel-btn"
                disabled={loading}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>

        {/* Блок рекомендации (как на странице статьи) */}
        <div className="read-more-section">
          <h3>🐾 Поделитесь опытом</h3>
          <p>Ваша статья поможет другим заботливым хозяевам</p>
          <Link to="/articles" className="read-more-link">
            Посмотреть все статьи <ChevronRight size={18} />
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
};

export default CreateArticlePage;