import React, { useState } from 'react';
import '../styles/BudgetPlannerPage.css';

const BudgetPlannerPage = () => {
  // Состояния формы
  const [animalType, setAnimalType] = useState('cat');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [season, setSeason] = useState('year');
  const [livingCondition, setLivingCondition] = useState('indoor');
  const [hasGivenBirth, setHasGivenBirth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Простая валидация
    if (!age || isNaN(age) || age <= 0) {
      alert('Пожалуйста, введите корректный возраст (число больше 0)');
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Имитация запроса к ML-модели
    setTimeout(() => {
      // Заглушка: генерируем примерный бюджет в зависимости от типа животного
      let budget = '';
      switch (animalType) {
        case 'cat':
          budget = '3500–5500 ₽/мес';
          break;
        case 'dog':
          budget = '4500–7000 ₽/мес';
          break;
        case 'parrot':
          budget = '1500–2500 ₽/мес';
          break;
        case 'hamster':
          budget = '800–1500 ₽/мес';
          break;
        case 'rabbit':
          budget = '2000–3500 ₽/мес';
          break;
        default:
          budget = '3000–5000 ₽/мес';
      }
      setResult(budget);
      setIsLoading(false);
    }, 2000);
  };

  // Сброс формы (опционально)
  const handleReset = () => {
    setAnimalType('cat');
    setGender('male');
    setAge('');
    setSeason('year');
    setLivingCondition('indoor');
    setHasGivenBirth(false);
    setResult(null);
  };

  return (
    <div className="budget-page">
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
        <div className="budget-card-horizontal">
          <div className="budget-image">
            <img
              src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Питомец и бюджет"
            />
          </div>
          <div className="budget-form">
            <h2>Планировщик бюджета</h2>
            <p className="subtitle">
              Расскажите о вашем питомце, и мы сформируем примерный план расходов
            </p>

            <form onSubmit={handleSubmit}>
              {/* Тип животного */}
              <div className="input-group">
                <label>Кто у вас живёт?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="animalType"
                      value="cat"
                      checked={animalType === 'cat'}
                      onChange={() => setAnimalType('cat')}
                    />
                    Кошка
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="animalType"
                      value="dog"
                      checked={animalType === 'dog'}
                      onChange={() => setAnimalType('dog')}
                    />
                    Собака
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="animalType"
                      value="parrot"
                      checked={animalType === 'parrot'}
                      onChange={() => setAnimalType('parrot')}
                    />
                    Попугай
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="animalType"
                      value="hamster"
                      checked={animalType === 'hamster'}
                      onChange={() => setAnimalType('hamster')}
                    />
                    Хомяк
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="animalType"
                      value="rabbit"
                      checked={animalType === 'rabbit'}
                      onChange={() => setAnimalType('rabbit')}
                    />
                    Кролик
                  </label>
                </div>
              </div>

              {/* Пол */}
              <div className="input-group">
                <label>Пол</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                    />
                    Мужской
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                    />
                    Женский
                  </label>
                </div>
              </div>

              {/* Возраст (лет) */}
              <div className="input-group">
                <label htmlFor="age">Возраст (лет)</label>
                <input
                  type="number"
                  id="age"
                  placeholder="Например, 3"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              {/* Время года */}
              <div className="input-group">
                <label>Время года (для сезонных расходов)</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="season"
                      value="winter"
                      checked={season === 'winter'}
                      onChange={() => setSeason('winter')}
                    />
                    Зима
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="season"
                      value="spring"
                      checked={season === 'spring'}
                      onChange={() => setSeason('spring')}
                    />
                    Весна
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="season"
                      value="summer"
                      checked={season === 'summer'}
                      onChange={() => setSeason('summer')}
                    />
                    Лето
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="season"
                      value="autumn"
                      checked={season === 'autumn'}
                      onChange={() => setSeason('autumn')}
                    />
                    Осень
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="season"
                      value="year"
                      checked={season === 'year'}
                      onChange={() => setSeason('year')}
                    />
                    В течение года
                  </label>
                </div>
              </div>

              {/* Условия проживания */}
              <div className="input-group">
                <label>Где живёт питомец?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="living"
                      value="indoor"
                      checked={livingCondition === 'indoor'}
                      onChange={() => setLivingCondition('indoor')}
                    />
                    Только в доме
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="living"
                      value="outdoor"
                      checked={livingCondition === 'outdoor'}
                      onChange={() => setLivingCondition('outdoor')}
                    />
                    Гуляет на улице
                  </label>
                </div>
              </div>

              {/* Дополнительный вопрос для самок */}
              {gender === 'female' && (
                <div className="input-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={hasGivenBirth}
                      onChange={(e) => setHasGivenBirth(e.target.checked)}
                    />
                    Были ли роды (или возможны в будущем)?
                  </label>
                  <small className="hint">
                    Это влияет на рекомендации по ветеринарным расходам
                  </small>
                </div>
              )}

              <div className="button-group">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Анализируем...' : 'Рассчитать бюджет'}
                </button>
                <button type="button" onClick={handleReset} className="reset-btn">
                  Очистить
                </button>
              </div>
            </form>

            {result && (
              <div className="result-box">
                <h3>🧾 Примерный бюджет на месяц</h3>
                <p className="budget-amount">{result}</p>
                <p className="budget-detail">
                  *Включает корма, игрушки, ветеринарные расходы и непредвиденные траты.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 PURRFECT. Забота о ваших питомцах</p>
      </footer>
    </div>
  );
};

export default BudgetPlannerPage;