import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthorizationPage.css';
import Header from "../components/Header";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login({ email, password });
      navigate('/cabinet'); // После успешного входа — в личный кабинет
    } catch (err) {
      setError(err.message || 'Ошибка входа. Проверьте логин и пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="center-wrapper">
        <div className="auth-card-horizontal">
          <div className="auth-image">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Питомцы"
            />
          </div>
          <div className="auth-form">
            <h2>Добро пожаловать</h2>
            <p className="subtitle">Войдите в свой аккаунт</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#">Забыли пароль?</a>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            <div className="register-link">
              Еще нет профиля? <Link to="/registr">Зарегистрируйтесь</Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 PURRFECT. Забота о ваших питомцах</p>
      </footer>
    </div>
  );
};

export default AuthPage;