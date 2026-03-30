import { 
  PawPrint, 
  Sparkles, 
  Heart, 
  Camera, 
  Upload, 
  User, 
  MapPin, 
  Cake, 
  Phone, 
  Mail, 
  Plus
} from "lucide-react";

import '../styles/CabinetPage.css';

export default function CabinetPage() {
  const pets = [
    { id: 1, name: "Мурка", type: "Кошка", age: "2 года", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=120&h=120&fit=crop" },
    { id: 2, name: "Рекс", type: "Собака", age: "5 лет", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=120&h=120&fit=crop" },
    { id: 3, name: "Пушок", type: "Кролик", age: "2 года", image: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=120&h=120&fit=crop" }
  ];

  return (
    <div className="cabinet-page">
      <header className="cabinet-header">
        <div className="cabinet-logo">
          <PawPrint size={24} />
          PURRFECT
        </div>
        <div className="cabinet-user">
          <div className="cabinet-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="cabinet-main">
        {/* Приветственная секция */}
        <div className="welcome-section">
          <div className="welcome-card">
            <div>
              <h1 className="welcome-title">
                Добро пожаловать! <Heart size={20} fill="currentColor" />
              </h1>
              <p className="welcome-subtitle">Личный кабинет</p>
              <p className="welcome-text">
                Управляйте своим профилем и информацией о питомцах в одном месте.
              </p>
            </div>
            <div className="profile-stats">
              <div className="stats-progress">
                <div className="progress-label">
                  <span>Профиль заполнен</span>
                  <span>85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "85%" }}></div>
                </div>
              </div>
              <p className="stats-pets">
                <PawPrint size={14} /> Активных питомцев: 3
              </p>
            </div>
          </div>
        </div>

        {/* Личная информация */}
        <div className="profile-form">
          <div className="form-header">
            <div className="form-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="form-title">Личная информация</h2>
              <p className="form-subtitle">Обновите свои данные</p>
            </div>
          </div>

          {/* Фото профиля */}
          <div className="photo-section">
            <div className="photo-wrapper">
              <div className="photo-container">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop" 
                  alt="Profile" 
                  className="profile-photo"
                />
              </div>
              <button className="photo-upload-btn">
                <Camera size={12} />
              </button>
            </div>
            <button className="upload-btn">
              <Upload size={12} /> Загрузить фото
            </button>
          </div>
        

          {/* Форма */}
          <div className="form-grid">
            <div className="form-field">
              <label><User size={14} /> Имя</label>
              <input type="text" defaultValue="Полина" />
            </div>
            <div className="form-field">
              <label><User size={14} /> Фамилия</label>
              <input type="text" defaultValue="Власова" />
            </div>
            <div className="form-field">
              <label><MapPin size={14} /> Город</label>
              <input type="text" defaultValue="Москва" />
            </div>
            <div className="form-field">
              <label><Cake size={14} /> Дата рождения</label>
              <input type="text" defaultValue="15.05.1995" />
            </div>
            <div className="form-field">
              <label><Phone size={14} /> Телефон</label>
              <input type="tel" defaultValue="+7 (916) 123-45-67" />
            </div>
            <div className="form-field">
              <label><Mail size={14} /> Email</label>
              <input type="email" defaultValue="polina@purrfect.ru" />
            </div>
          </div>

          <div className="form-actions">
            <button className="save-btn">
              <PawPrint size={16} /> Сохранить изменения
            </button>
          </div>
        </div>

        {/* Мои питомцы */}
        <div className="pets-section">
          <div className="pets-header">
            <div className="pets-title">
              <PawPrint size={20} />
              Мои питомцы
            </div>
            <button className="add-pet-btn">
              <Plus size={14} /> Добавить питомца
            </button>
          </div>
          <p className="pets-subtitle">Ваши пушистые друзья</p>
          
          <div className="pets-grid">
            {pets.map(pet => (
              <div key={pet.id} className="pet-card">
                <div className="pet-photo">
                  <img src={pet.image} alt={pet.name} />
                </div>
                <h3 className="pet-name">{pet.name}</h3>
                <p className="pet-info">{pet.type} • {pet.age}</p>
                <button className="pet-detail-btn">Подробнее →</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="cabinet-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}
