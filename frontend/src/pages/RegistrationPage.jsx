import React, { useState } from 'react';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Регистрация:', { firstName, lastName, email, password });
    // здесь логика отправки
  };

  return (
    <div className="registration-page">
      <header className="header">
        <div className="logo">PURRFECT</div>
        <nav className="nav">
          <a href="#">Сервисы</a>
          <a href="#">Статьи</a>
          <a href="#">О проекте</a>
        </nav>
        <button className="login-btn-header">Войти</button>
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

            <form onSubmit={handleSubmit}>
              <div className="name-row">
                <div className="input-group half">
                  <label htmlFor="firstName">Имя</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Иван"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group half">
                  <label htmlFor="lastName">Фамилия</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Иванов"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
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
                  placeholder="*********"
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

              <button type="submit" className="submit-btn">
                Зарегистрироваться
              </button>
            </form>

            <div className="login-link">
              Уже есть аккаунт? <a href="#">Войдите</a>
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