import React, { useState } from 'react';
import '../styles/BreedIdentificationPage.css';

const BreedIdentificationPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [breedResult, setBreedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setBreedResult(''); // сбрасываем предыдущий результат
    }
  };

  // Имитация запроса к ML-модели
  const handleIdentifyBreed = () => {
    if (!selectedFile) {
      alert('Пожалуйста, сначала загрузите фото');
      return;
    }

    setIsLoading(true);
    setBreedResult('');

    // Симуляция задержки ответа сервера
    setTimeout(() => {
      // Список популярных пород для демонстрации
      const breeds = [
        'Сибирская кошка',
        'Мейн-кун',
        'Британская короткошёрстная',
        'Шотландская вислоухая',
        'Сфинкс',
        'Персидская кошка',
        'Бенгальская кошка',
        'Абиссинская кошка'
      ];
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      setBreedResult(randomBreed);
      setIsLoading(false);
    }, 1500);
  };

  // Очистка загруженного фото
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setBreedResult('');
  };

  return (
    <div className="breed-page">
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
        <div className="breed-card-horizontal">
          <div className="breed-image">
            <img
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Разные породы кошек"
            />
          </div>
          <div className="breed-form">
            <h2>Распознавание породы</h2>
            <p className="subtitle">
              Загрузите фото и узнайте породу вашего питомца
            </p>

            <div className="upload-area">
              <label htmlFor="file-upload" className="upload-label">
                📸 Выбрать фото
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {previewUrl && (
                <div className="preview-container">
                  <img src={previewUrl} alt="Предпросмотр" className="preview-image" />
                  <button type="button" onClick={handleClear} className="clear-btn">
                    ✖ Удалить
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleIdentifyBreed}
              className="identify-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Определяем...' : 'Определить породу'}
            </button>

            {breedResult && (
              <div className="result-box">
                <p>🔍 Порода: <strong>{breedResult}</strong></p>
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

export default BreedIdentificationPage;