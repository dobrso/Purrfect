import React, { useState } from 'react';
import '../styles/AuthorizationPage.css'; 
import Header from "../components/Header"
import { Link } from "react-router-dom";
const AuthPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', login, 'Password:', password);
    // Здесь логика авторизации
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

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="login">Логин</label>
                <input
                  type="text"
                  id="login"
                  placeholder="Введите логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
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

              <button type="submit" className="submit-btn">Войти</button>
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