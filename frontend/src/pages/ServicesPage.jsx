import { Link } from "react-router-dom";
import { PawPrint, Sparkles, Stethoscope, Calculator, Search, ArrowRight } from "lucide-react";
import "../styles/ServicesPage.css";

export default function ServicesPage() {
  return (
    <div className="services-page">
      <header className="services-header">
        <Link to="/" className="services-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="services-nav">
          <Link to="/">Главная</Link>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/marketplace">Маркетплейс</Link>
        </nav>
        <div className="services-user">
          <div className="services-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="services-main">
        <div className="services-hero">
          <div className="services-hero-content">
            <h1>Наши сервисы</h1>
            <p>Забота о ваших питомцах в каждом сервисе</p>
          </div>
        </div>

        <div className="services-grid">
          {/* Генератор имён */}
          <Link to="/name-generator" className="service-card">
            <div className="service-icon">
              <Sparkles size={32} />
            </div>
            <h2>Генератор имён</h2>
            <p>Подберите идеальное имя для вашего питомца. Учитываем характер, цвет и ваши предпочтения</p>
            <div className="service-btn">
              Выбрать имя <ArrowRight size={16} />
            </div>
          </Link>

          {/* Запись к ветеринару */}
          <Link to="/appointment" className="service-card">
            <div className="service-icon">
              <Stethoscope size={32} />
            </div>
            <h2>Запись к ветеринару</h2>
            <p>Выберите удобное время и специалиста для вашего питомца. Мы заботимся о здоровье</p>
            <div className="service-btn">
              Записаться <ArrowRight size={16} />
            </div>
          </Link>

          {/* Планировщик бюджета */}
          <Link to="/budget-planner" className="service-card">
            <div className="service-icon">
              <Calculator size={32} />
            </div>
            <h2>Планировщик бюджета</h2>
            <p>Рассчитайте примерные расходы на содержание питомца. Учитываем возраст, условия проживания и сезон</p>
            <div className="service-btn">
              Рассчитать <ArrowRight size={16} />
            </div>
          </Link>

          {/* Определение породы */}
          <Link to="/breed-identification" className="service-card">
            <div className="service-icon">
              <Search size={32} />
            </div>
            <h2>Определение породы</h2>
            <p>Загрузите фото питомца и узнайте его породу. Быстро и бесплатно</p>
            <div className="service-btn">
              Определить <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      </main>

      <footer className="services-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}