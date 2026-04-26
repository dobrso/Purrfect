import { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Sparkles, RefreshCw, Heart, Star } from "lucide-react";
import "../styles/NameGeneratorPage.css";

const nameDatabase = {
  cat: {
    male: {
      black: ["Куро", "Ночка", "Люцифер", "Тень", "Блэки", "Дарк", "Шадоу", "Черныш"],
      white: ["Снежок", "Айс", "Юки", "Пломбир", "Облачко", "Фрост", "Кефир", "Фрости", "Широ"],
      ginger: ["Рыжик", "Симба", "Мандарин", "Персик", "Солнышко", "Гарфилд", "Апельсин", "Феникс"],
      gray: ["Пылинка", "Грей", "Тучка", "Смок", "Пепел", "Дымок", "Шторм", "Туман"],
      brown: ["Браун", "Шоколад", "Каштан", "Трюфель", "Булочка", "Марон", "Орех", "Твикс"],
      playful: ["Шустрик", "Бандит", "Тишка", "Жужа", "Пират", "Шалун", "Искра", "Марсик"],
      lazy: ["Дрёма", "Пончик", "Кексик", "Тихон", "Плюшка", "Булка", "Зефир", "Батон"],
      smart: ["Барон", "Шерлок", "Граф", "Мерлин", "Декстер", "Зевс", "Умняшик", "Тесла"],
      anime: ["Какаши", "Тоторо", "Киба", "Нобу", "Наоки", "Рен", "Исаги", "Луффи","Годжо", "Хёма", "Шикамару"],
      music: ["Макан", "Дрейк", "Курт", "Билан", "Гуф", "Джони", "Лепс", "Нойз"],
      game: ["Спайк", "Леон", "Мортис", "Итэр", "Флинс", "Варка", "Рики", "Никс", "Беннет"],
    },
    female: {
      black: ["Ночка", "Тень", "Пантера", "Черника", "Багира", "Комочек", "Энигма"],
      white: ["Снежинка", "Юки", "Луна", "Лилия", "Сметанка", "Ваниль", "Айс", "Фрости"],
      ginger: ["Рыжуля", "Симба", "Мармеладка", "Карамелька", "Персик", "Злата", "Лисса", "Солнышко"],
      gray: ["Дымка", "Серафима", "Тучка", "Серебрянка", "Грейси", "Мышка", "Пылинка", "Пепел"],
      brown: ["Брауни", "Шоколадка", "Милка", "Трюфель", "Мокко", "Ириска", "Орешек", "Карамелька"],
      playful: ["Жужа", "Лютик", "Искра", "Блошка", "Зигги", "Пушинка", "Стрекоза", "Флейта"],
      lazy: ["Соня", "Малышка", "Ленивица", "Дрёма", "Пёрышко", "Мармеладка", "Сахарок", "Клубничка"],
      smart: ["Гера", "Афина", "Полли", "Грета", "Ария", "Ирис", "Алиса", "Ава", "Умняша"],
      anime: ["Сакура", "Хината", "Кики", "Мими", "Павер", "Сейлор", "Мао", "Макима"],
      music: ["Мелоди", "Ария", "Адель", "Ариана", "Лирика", "Кетти", "Нюша", "Сара"],
      game: ["Колетт", "Джесси", "Мона", "Биби", "Марси", "Алли", "Часка", "Линея"],
    }
  },
  dog: {
    male: {
      black: ["Блэк", "Тень", "Нуар", "Уголек", "Куро", "Барон", "Зорро", "Найт"],
      white: ["Снежок", "Сноу", "Айс", "Умка", "Коттон", "Фрост", "Каспер", "Облако"],
      ginger: ["Рыжик", "Бурбон", "Фокс", "Руди", "Голд", "Ричи", "Рассел", "Арчи"],
      brown: ["Браун", "Шоколад", "Каштан", "Трюфель", "Бруно", "Марон", "Орех", "Твикс"],
      playful: ["Бублик", "Прыгун", "Вихрь", "Зигзаг", "Торнадо", "Спарки", "Денди", "Бим"],
      lazy: ["Ленивец", "Малыш", "Пончик", "Соник", "Кузя", "Батон", "Мишка", "Пухля"],
      smart: ["Умник", "Винчи", "Цезарь", "Шерлок", "Брейн", "Фрейд", "Орфей", "Зевс"],
      anime: ["Бакуго", "Мидори", "Кенма", "Итачи", "Шикамару", "Тоджи", "Нанами", "Годжо"],
      music: ["Макан", "Дрейк", "Курт", "Билан", "Гуф", "Джони", "Лепс", "Нойз"],
      game: ["Спайк", "Леон", "Мортис", "Итэр", "Флинс", "Варка", "Рики", "Никс", "Беннет"],
    },
    female: {
      black: ["Ночка", "Тень", "Пантера", "Черника", "Багира", "Комочек", "Энигма"],
      white: ["Снежинка", "Юки", "Луна", "Лилия", "Сметанка", "Ваниль", "Айс", "Фрости"],
      ginger: ["Рыжуля", "Симба", "Мармеладка", "Карамелька", "Персик", "Злата", "Лисса", "Солнышко"],
      gray: ["Дымка", "Серафима", "Тучка", "Серебрянка", "Грейси", "Мышка", "Пылинка", "Пепел"],
      brown: ["Брауни", "Шоколадка", "Милка", "Трюфель", "Каштанка", "Ириска", "Орешек", "Карамелька"],
      playful: ["Жужа", "Лютик", "Искра", "Блошка", "Зигги", "Пушинка", "Стрекоза", "Флейта"],
      lazy: ["Соня", "Малышка", "Ленивица", "Дрёма", "Пёрышко", "Мармеладка", "Сахарок", "Клубничка"],
      smart: ["Гера", "Афина", "Полли", "Грета", "Ария", "Ирис", "Алиса", "Ава", "Умняша"],
      anime: ["Сакура", "Хината", "Кики", "Мими", "Павер", "Сейлор", "Мао", "Макима"],
      music: ["Мелоди", "Ария", "Адель", "Ариана", "Лирика", "Кетти", "Нюша", "Сара"],
      game: ["Колетт", "Джесси", "Мона", "Биби", "Марси", "Алли", "Часка", "Линея"],
    }
  }
};

const colors = [
  { value: "black", label: "🖤 Чёрный"},
  { value: "white", label: "🤍 Белый" },
  { value: "ginger", label: "🧡 Рыжий" },
  { value: "gray", label: "💿 Серый"},
  { value: "brown", label: "🤎 Коричневый" }
];

const personalities = [
  { value: "playful", label: "🎾 Игривый", desc: "Любит бегать и играть" },
  { value: "lazy", label: "😴 Ленивый", desc: "Обожает спать и лежать" },
  { value: "smart", label: "🧠 Умный", desc: "Быстро всё понимает" }
];

const hobbies = [
  { value: "anime", label: " Аниме", icon: "⛩️" },
  { value: "music", label: "Музыка", icon: "🎵" },
  { value: "game", label: " Игры", icon: "🎮" }
];

export default function NameGeneratorPage() {
  const [petType, setPetType] = useState("cat");
  const [gender, setGender] = useState("male");
  const [color, setColor] = useState("");
  const [personality, setPersonality] = useState("");
  const [hobby, setHobby] = useState("");
  const [generatedNames, setGeneratedNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNames = () => {
    setLoading(true);
    setTimeout(() => {
      const db = nameDatabase[petType]?.[gender] || nameDatabase.cat.male;
      let names = [];
      
      if (color && db[color]) {
        names.push(...db[color]);
      }
      if (personality && db[personality]) {
        names.push(...db[personality]);
      }
      if (hobby && db[hobby]) {
        names.push(...db[hobby]);
      }
      
      if (names.length === 0) {
        names = db.playful || ["Бим", "Бом", "Мурзик", "Шарик"];
      }
      
      const unique = [...new Set(names)];
      const shuffled = unique.sort(() => 0.5 - Math.random());
      setGeneratedNames(shuffled.slice(0, 8));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="generator-page">
      <header className="generator-header">
        <Link to="/" className="generator-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="generator-nav">
          <Link to="/">Главная</Link>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/marketplace">Маркетплейс</Link>
        </nav>
        <div className="generator-user">
          <div className="generator-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="generator-main">
        <div className="generator-hero">
          <div className="generator-hero-content">
            <h1>✨ Генератор имён для питомца</h1>
            <p>Расскажи о своём любимце — мы подберём идеальное имя!</p>
          </div>
        </div>

        <div className="generator-container">
          <div className="generator-form">
            {/* Тип питомца */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3>Кто у вас живёт?</h3>
                  <p>Выберите вид питомца</p>
                </div>
              </div>
              <div className="pet-type-buttons">
                <button
                  className={`pet-type-btn ${petType === "cat" ? "active" : ""}`}
                  onClick={() => setPetType("cat")}
                >
                  🐱 Кошка
                </button>
                <button
                  className={`pet-type-btn ${petType === "dog" ? "active" : ""}`}
                  onClick={() => setPetType("dog")}
                >
                  🐶 Собака
                </button>
              </div>
            </div>

            {/* Пол */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Heart size={20} />
                </div>
                <div>
                  <h3>Пол питомца</h3>
                  <p>Кто у вас — мальчик или девочка?</p>
                </div>
              </div>
              <div className="gender-buttons">
                <button
                  className={`gender-btn ${gender === "male" ? "active" : ""}`}
                  onClick={() => setGender("male")}
                >
                  Мальчик
                </button>
                <button
                  className={`gender-btn ${gender === "female" ? "active" : ""}`}
                  onClick={() => setGender("female")}
                >
                  Девочка
                </button>
              </div>
            </div>

            {/* Цвет */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Star size={20} />
                </div>
                <div>
                  <h3>Какой цвет шерсти?</h3>
                  <p>Выберите основной цвет питомца</p>
                </div>
              </div>
              <div className="color-buttons">
                {colors.map(c => (
                  <button
                    key={c.value}
                    className={`color-btn ${color === c.value ? "active" : ""}`}
                    onClick={() => setColor(c.value)}
                  >
                    <span className="color-emoji">{c.emoji}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Характер */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Heart size={20} />
                </div>
                <div>
                  <h3>Какой он/она по характеру?</h3>
                  <p>Выберите основную черту</p>
                </div>
              </div>
              <div className="personality-grid">
                {personalities.map(p => (
                  <button
                    key={p.value}
                    className={`personality-btn ${personality === p.value ? "active" : ""}`}
                    onClick={() => setPersonality(p.value)}
                  >
                    <div className="personality-text">
                      <strong>{p.label}</strong>
                      <span>{p.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Хобби */}
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-icon">
                  <Star size={20} />
                </div>
                <div>
                  <h3>Любимая тематика</h3>
                  <p>Что нравится вам и вашему питомцу</p>
                </div>
              </div>
              <div className="hobby-grid">
                {hobbies.map(h => (
                  <button
                    key={h.value}
                    className={`hobby-btn ${hobby === h.value ? "active" : ""}`}
                    onClick={() => setHobby(h.value)}
                  >
                    <span className="hobby-icon">{h.icon}</span>
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="generate-btn" onClick={generateNames}>
              <RefreshCw size={18} />
              Сгенерировать имена
            </button>
          </div>

          {loading && (
            <div className="loading-spinner">
              <RefreshCw size={32} className="spinning" />
              <p>Подбираем идеальное имя...</p>
            </div>
          )}

          {generatedNames.length > 0 && !loading && (
            <div className="results-section">
              <h2>🎉 Варианты имён</h2>
              <div className="names-grid">
                {generatedNames.map((name, index) => (
                  <div key={index} className="name-card">
                    <div className="name-icon">
                      {petType === "cat" ? "🐱" : "🐶"}
                    </div>
                    <div className="name-text">{name}</div>
                    <button
                      className="choose-btn"
                      onClick={() => alert(`Вы выбрали имя "${name}"! 🎉`)}
                    >
                      Выбрать
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="generator-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}