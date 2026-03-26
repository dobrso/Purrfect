import { Link } from "react-router-dom";
import "../styles/MainPage.css";
import Header from "../components/Header";

export default function MainPage() {
  const popularArticles = [
    {
      id: 1,
      title: "Как ухаживать за кошкой",
      image: "https://yac-wh-sb-prod-s3-media-07001.storage.yandexcloud.net/media/images/1-header-thumb_1674641837990.original.png",
    },
    {
      id: 2,
      title: "Как дрессировать собаку",
      image: "https://smart-dogs.ru/upload/iblock/931/9311186554ad324ca9354ab8c02d8ad3.jpg",
    },
    {
      id: 4,
      title: "Признаки заболеваний: когда срочно к врачу",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600",
    },
  ];

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <h1>
              Все о заботе и уходе <br />
              за вашими питомцами
            </h1>
            <p className="subtitle">Сервис для заботливых хозяев</p>
            <div className="search">
              <input placeholder="Например, как ухаживать за кошкой?" />
              <button>🔍</button>
            </div>
            <div className="tags">
              <span>Как выбрать корм</span>
              <span>Как научить собаку командам</span>
              <span>Как ухаживать за шерстью</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="pets">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
                alt="pet"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="container services-grid">
          <div className="services-left">
            <div className="services-head">
              <h2>Сервисы</h2>
              <a href="#">Все сервисы →</a>
            </div>
            <div className="cards">
              <div className="card">
                <div className="icon">📄</div>
                <p>Статьи и блог</p>
              </div>
              <div className="card">
                <div className="icon">🐾</div>
                <p>Распознавание породы</p>
              </div>
              <div className="card">
                <div className="icon">💳</div>
                <p>Прогноз трат</p>
              </div>
              <div className="card">
                <div className="icon">💬</div>
                <p>Онлайн-консультация</p>
              </div>
              <div className="card">
                <div className="icon">🔎</div>
                <p>Генератор кличек</p>
              </div>
              <div className="card">
                <div className="icon">✂</div>
                <p>Груминг</p>
              </div>
            </div>
          </div>
          <aside className="useful">
            <h3>🐾 Полезные услуги</h3>
            <div className="useful-item">Передержка и отели</div>
            <div className="useful-item">Выгул и присмотр</div>
            <div className="useful-item">Запись на груминг</div>
          </aside>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles">
        <div className="container">
          <div className="articles-head">
            <h2>Популярные статьи</h2>
            <Link to="/articles">Все статьи →</Link>
          </div>
          <div className="articles-grid">
            {popularArticles.map((article) => (
              <Link
                to={`/article/${article.id}`}
                key={article.id}
                className="article"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <img src={article.image} alt={article.title} />
                <p>{article.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}