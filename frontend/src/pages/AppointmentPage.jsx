import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PawPrint, MapPin, Calendar, Clock, Stethoscope, User, CheckCircle2 } from "lucide-react";
import "../styles/AppointmentPage.css";

export default function AppointmentPage() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState("");

  const pets = [
    { id: 1, name: "Барсик", type: "Кот" },
    { id: 2, name: "Мурка", type: "Кошка" }
  ];

  const veterinarians = [
    {
      id: 1,
      name: "Анна Петрова",
      specialization: "Терапевт",
      experience: "8 лет опыта",
      imageUrl: "https://images.unsplash.com/photo-1753487050317-919a2b26a6ed?w=120&h=120&fit=crop"
    },
    {
      id: 2,
      name: "Дмитрий Сидоров",
      specialization: "Хирург",
      experience: "12 лет опыта",
      imageUrl: "https://images.unsplash.com/photo-1770836037793-95bdbf190f71?w=120&h=120&fit=crop"
    }
  ];

  const services = [
    { id: 1, name: "Общий осмотр", duration: "30 мин" },
    { id: 2, name: "Вакцинация", duration: "20 мин" },
    { id: 3, name: "Хирургическая операция", duration: "2 часа" },
    { id: 4, name: "Груминг", duration: "1 час" },
    { id: 5, name: "Стоматология", duration: "45 мин" }
  ];

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true }
  ];

  const isFormValid = selectedPet && selectedService && selectedVet && selectedDate && selectedTime;

  const handleSubmit = () => {
    if (isFormValid) {
      alert(`✅ Запись успешно создана!\n\nПитомец: ${selectedPet.name}\nУслуга: ${selectedService.name}\nВрач: ${selectedVet.name}\nДата: ${selectedDate}\nВремя: ${selectedTime}`);
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className="appointment-page">
      <header className="appointment-header">
        <Link to="/" className="appointment-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="appointment-nav">
          <NavLink to="/appointment" className="active">Сервисы</NavLink>
          <NavLink to="/articles">Статьи</NavLink>
          <a href="#">О проекте</a>
        </nav>
        <Link to="/auth" className="appointment-login">Войти</Link>
      </header>

      <main className="appointment-main">
        {/* Hero Section */}
        <div className="appointment-hero">
          <div className="appointment-hero-content">
            <div className="hero-badge">
              <Stethoscope size={18} />
              <span>Ветеринарная помощь</span>
            </div>
            <h1>Записаться на приём</h1>
            <p>Выберите удобное время и специалиста для вашего питомца. Мы заботимся о здоровье ваших любимцев!</p>
          </div>
        </div>

        <div className="appointment-layout">
          {/* Левая колонка — форма */}
          <div className="appointment-form-column">
            {/* Выбор питомца */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <PawPrint size={20} />
                </div>
                <div>
                  <h3>Выберите питомца</h3>
                  <p>Для кого нужна консультация</p>
                </div>
              </div>
              <div className="pet-list">
                {pets.map(pet => (
                  <button
                    key={pet.id}
                    className={`pet-btn ${selectedPet?.id === pet.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div>
                      <strong>{pet.name}</strong>
                      <span>{pet.type}</span>
                    </div>
                    {selectedPet?.id === pet.id && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор услуги */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Stethoscope size={20} />
                </div>
                <div>
                  <h3>Выберите услугу</h3>
                  <p>Тип консультации или процедуры</p>
                </div>
              </div>
              <div className="service-list">
                {services.map(service => (
                  <button
                    key={service.id}
                    className={`service-btn ${selectedService?.id === service.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service)}
                  >

                    <span className="service-name">{service.name}</span>
                    <span className="service-duration">{service.duration}</span>
                    {selectedService?.id === service.id && <CheckCircle2 size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор врача */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <User size={20} />
                </div>
                <div>
                  <h3>Выберите врача</h3>
                  <p>Наши специалисты</p>
                </div>
              </div>
              <div className="doctor-list">
                {veterinarians.map(vet => (
                  <button
                    key={vet.id}
                    className={`doctor-btn ${selectedVet?.id === vet.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVet(vet)}
                  >
                    <img src={vet.imageUrl} alt={vet.name} />
                    <div className="doctor-info">
                      <strong>{vet.name}</strong>
                      <span>{vet.specialization}</span>
                      <span className="doctor-experience">{vet.experience}</span>
                    </div>
                    {selectedVet?.id === vet.id && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор даты и времени */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3>Выберите дату и время</h3>
                  <p>Удобное для вас время приема</p>
                </div>
              </div>
              <div className="datetime-section">
                <div className="date-picker">
                  <label>Дата приема</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="time-picker">
                  <label>Время приема</label>
                  <div className="time-slots">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`submit-btn ${!isFormValid ? 'disabled' : ''}`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Записаться на приём
            </button>
          </div>

          {/* Правая колонка — информация */}
          <div className="appointment-info-column">
            <div className="info-card">
              <div className="clinic-image">
                <img
                  src="https://images.unsplash.com/photo-1724632824319-4b43e74e000c?w=400&h=200&fit=crop"
                  alt="Клиника"
                />
              </div>
              <h3>Наша клиника</h3>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <strong>Адрес</strong>
                  <p>г. Москва, ул. Примерная, д. 12</p>
                </div>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <strong>Режим работы</strong>
                  <p>Пн-Пт: 9:00 - 20:00</p>
                  <p>Сб-Вс: 10:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="info-card useful-info">
              <h3>Полезная информация</h3>
              <ul>
                <li>Приходите за 10 минут до приема</li>
                <li>Возьмите с собой ветеринарный паспорт</li>
                <li>Результаты анализов, если есть</li>
                <li>Отменить запись можно за 24 часа</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="appointment-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}