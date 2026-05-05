import React, { useState } from 'react';
import { recognizeBreed } from '../../services/api'; // путь может отличаться
import './BreedIdentificationPage.css';

const BreedIdentificationPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [breedResult, setBreedResult] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setBreedResult('');
      setConfidence(null);
      setError('');
    }
  };

  // Отправка фото на бэкенд
  const handleIdentifyBreed = async () => {
    if (!selectedFile) {
      setError('Пожалуйста, сначала загрузите фото');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await recognizeBreed(selectedFile);
      setBreedResult(result.breed);
      setConfidence(result.confidence);
    } catch (err) {
      setError(err || 'Ошибка при распознавании породы');
      console.error('Ошибка:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Очистка загруженного фото
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setBreedResult('');
    setConfidence(null);
    setError('');
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

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleIdentifyBreed}
              className="identify-btn"
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? 'Анализируем...' : 'Определить породу'}
            </button>

            {breedResult && (
              <div className="result-box">
                <p>🐾 Порода: <strong>{breedResult}</strong></p>
                {confidence && (
                  <p className="confidence">
                    Уверенность: {Math.round(confidence * 100)}%
                  </p>
                )}
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