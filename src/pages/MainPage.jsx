import "../styles/MainPage.css";
import Header from "../components/Header"


export default function App() {

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
            <a href="#">Все статьи →</a>
          </div>

          <div className="articles-grid">
            <div className="article">
              <img
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600"
                alt=""
              />
              <p>Как ухаживать за кошкой</p>
            </div>

            <div className="article">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
                alt=""
              />
              <p>Как дрессировать собаку</p>
            </div>

            <div className="article">
              <img
                src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600"
                alt=""
              />
              <p>Уход за щенком</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}