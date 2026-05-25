import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
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
  Plus,
} from "lucide-react";
import { getPets, addPet, deletePet, updateProfile, updateProfileAvatar } from "../api";
import "../styles/CabinetPage.css";

export default function CabinetPage() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    city: "",
    birth_date: "",
    phone: "",
    email: "",
  });
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPetForm, setShowPetForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    animal_type: "cat",
    breed: "",
    age: "",
    city: "",
    color: "",
  });
  const fileInputRef = useRef(null);

  // Загрузка данных пользователя из контекста
  useEffect(() => {
    if (user) {
      setProfile({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        city: user.city || "",
        birth_date: user.birth_date || "",
        phone: user.phone || "",
        email: user.email || "",
      });
      setAvatar(user.avatar || null);
    }
  }, [user]);

  // Загрузка списка питомцев
  useEffect(() => {
    const loadPets = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const petsData = await getPets(user.id);
        setPets(petsData);
      } catch (err) {
        console.error("Ошибка загрузки питомцев:", err);
        setMessage("Не удалось загрузить питомцев");
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, [user]);

  // Сохранение профиля (текстовые поля) на сервер
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const updatedUser = await updateProfile(profile);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage("Профиль успешно обновлён");
    } catch (err) {
      console.error(err);
      setMessage("Ошибка сохранения: " + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Обработчик выбора файла для аватара
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const updatedUser = await updateProfileAvatar(file);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // Добавляем базовый URL для аватара, если он относительный
      const avatarUrl = updatedUser.avatar ? `http://127.0.0.1:8000${updatedUser.avatar}` : null;
      setAvatar(avatarUrl);
      setMessage("Аватар успешно обновлён");
    } catch (err) {
      console.error(err);
      setMessage("Ошибка загрузки аватара");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Добавление питомца
  const handleAddPet = async (e) => {
    e.preventDefault();
    if (!newPet.name.trim()) {
      setMessage("Введите имя питомца");
      return;
    }
    try {
      const petData = {
        name: newPet.name,
        animal_type: newPet.animal_type,
        breed: newPet.breed || "",
        age: parseInt(newPet.age, 10) || 0,
        city: newPet.city,
        color: newPet.color,
        owner: user.id,
      };
      const response = await addPet(petData);
      const addedPet = response.pet || response;
      setPets([...pets, addedPet]);
      setNewPet({ name: "", animal_type: "cat", breed: "", age: "", city: "", color: "" });
      setShowPetForm(false);
      setMessage("Питомец добавлен");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || err.message;
      setMessage("Ошибка добавления: " + errorMsg);
    }
  };

  // Удаление питомца
  const handleDeletePet = async (petId) => {
    if (!window.confirm("Удалить питомца?")) return;
    try {
      await deletePet(petId);
      setPets(pets.filter(p => p.id !== petId));
      setMessage("Питомец удалён");
    } catch (err) {
      setMessage("Ошибка удаления");
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  if (loading) return <div className="cabinet-loading">Загрузка...</div>;
  if (!user) return <div className="cabinet-loading">Пожалуйста, войдите в аккаунт</div>;

  const filledFields = Object.values(profile).filter(v => v && v.trim && v.trim().length > 0).length;
  const profilePercent = Math.round((filledFields / 6) * 100);

  return (
    <div className="cabinet-page">
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
                  <span>{profilePercent}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${profilePercent}%` }}></div>
                </div>
              </div>
              <p className="stats-pets">
                <PawPrint size={14} /> Активных питомцев: {pets.length}
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
                  src={avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop"}
                  alt="Profile"
                  className="profile-photo"
                />
              </div>
              <button
                className="photo-upload-btn"
                onClick={handleAvatarClick}
                disabled={uploading}
              >
                <Camera size={12} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <button
              className="upload-btn"
              onClick={handleAvatarClick}
              disabled={uploading}
            >
              <Upload size={12} /> {uploading ? "Загрузка..." : "Загрузить фото"}
            </button>
          </div>

          {/* Форма профиля */}
          <form onSubmit={handleProfileSave}>
            <div className="form-grid">
              <div className="form-field">
                <label><User size={14} /> Имя</label>
                <input
                  type="text"
                  value={profile.first_name}
                  onChange={(e) => handleProfileChange("first_name", e.target.value)}
                  placeholder="Введите имя"
                />
              </div>
              <div className="form-field">
                <label><User size={14} /> Фамилия</label>
                <input
                  type="text"
                  value={profile.last_name}
                  onChange={(e) => handleProfileChange("last_name", e.target.value)}
                  placeholder="Введите фамилию"
                />
              </div>
              <div className="form-field">
                <label><MapPin size={14} /> Город</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => handleProfileChange("city", e.target.value)}
                  placeholder="Ваш город"
                />
              </div>
              <div className="form-field">
                <label><Cake size={14} /> Дата рождения</label>
                <input
                  type="text"
                  value={profile.birth_date}
                  onChange={(e) => handleProfileChange("birth_date", e.target.value)}
                  placeholder="ДД.ММ.ГГГГ"
                />
              </div>
              <div className="form-field">
                <label><Phone size={14} /> Телефон</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div className="form-field">
                <label><Mail size={14} /> Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            {message && <div className="form-message">{message}</div>}

            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={saving}>
                <PawPrint size={16} /> {saving ? "Сохранение..." : "Сохранить изменения"}
              </button>
            </div>
          </form>
        </div>

        {/* Мои питомцы */}
        <div className="pets-section">
          <div className="pets-header">
            <div className="pets-title">
              <PawPrint size={20} />
              Мои питомцы
            </div>
            <button className="add-pet-btn" onClick={() => setShowPetForm(!showPetForm)}>
              <Plus size={14} /> Добавить питомца
            </button>
          </div>
          <p className="pets-subtitle">Ваши пушистые друзья</p>

          {showPetForm && (
            <div className="pet-form-container">
              <form onSubmit={handleAddPet} className="pet-form">
                <input
                  type="text"
                  placeholder="Кличка"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  required
                />
                <select
                  value={newPet.animal_type}
                  onChange={(e) => setNewPet({ ...newPet, animal_type: e.target.value })}
                >
                  <option value="cat">Кошка</option>
                  <option value="dog">Собака</option>
                  <option value="parrot">Попугай</option>
                  <option value="hamster">Хомяк</option>
                  <option value="rabbit">Кролик</option>
                </select>
                <input
                  type="text"
                  placeholder="Порода"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Возраст (лет)"
                  value={newPet.age}
                  onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                />

                {/* 👇 НОВЫЕ ПОЛЯ ВСТАВЬ ЗДЕСЬ */}
                <input
                  type="text"
                  placeholder="Город"
                  value={newPet.city}
                  onChange={(e) => setNewPet({ ...newPet, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Окрас (цвет)"
                  value={newPet.color}
                  onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
                />

                <div className="pet-form-buttons">
                  <button type="submit">Добавить</button>
                  <button type="button" onClick={() => setShowPetForm(false)}>Отмена</button>
                </div>
              </form>
            </div>
          )}
          {pets.length === 0 ? (
            <div className="no-pets">У вас пока нет питомцев. Нажмите "Добавить питомца"</div>
          ) : (
            <div className="pets-grid">
              {pets.map((pet) => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-photo">
                    <img
                      src={pet.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=120&h=120&fit=crop"}
                      alt={pet.name}
                    />
                  </div>
                  <h3 className="pet-name">{pet.name}</h3>
                  <p className="pet-info">
                    {pet.animal_type === "cat" ? "Кошка" : pet.animal_type === "dog" ? "Собака" : pet.animal_type} • {pet.age || "0"} лет
                    {pet.breed && `, ${pet.breed}`}
                  </p>
                  <button onClick={() => handleDeletePet(pet.id)} className="pet-detail-btn delete">
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
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