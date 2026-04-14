import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({ username, email, password, password_confirmation: confirmPassword });
      navigate('/cabinet');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации. Попробуйте другой email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <header className="header">
        <div className="logo">PURRFECT</div>
        <nav className="nav">
          <Link to="/appointment">Сервисы</Link>
          <Link to="/articles">Статьи</Link>
          <a href="#">О проекте</a>
        </nav>
        <Link to="/auth" className="login-btn-header">Войти</Link>
      </header>

      <div className="center-wrapper">
        <div className="reg-card-horizontal">
          <div className="reg-image">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Питомцы"
            />
          </div>
          <div className="reg-form">
            <h2>Регистрация</h2>
            <p className="subtitle">
              Присоединяйтесь к PURRFECT и заботьтесь о ваших питомцах
            </p>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Имя пользователя</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
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
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="*********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </form>

            <div className="login-link">
              Уже есть аккаунт? <Link to="/auth">Войдите</Link>
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

export default RegistrationPage;