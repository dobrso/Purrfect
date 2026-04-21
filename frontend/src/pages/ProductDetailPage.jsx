import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PawPrint, Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Package, Shield, TrendingUp, Check } from "lucide-react";
import "../styles/ProductDetailPage.css";

// Временные данные (потом заменим на API)
const products = [
  {
    id: 1,
    name: "Royal Canin для кошек",
    description: "Премиум корм для взрослых кошек, 2 кг",
    fullDescription: "Royal Canin - это сбалансированный премиум корм, специально разработанный для взрослых кошек от 1 до 7 лет. Формула обеспечивает здоровье мочевыделительной системы и поддерживает идеальный вес вашего питомца.",
    price: 1299,
    category: "food",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1669296667524-906d519cbe3e?w=600&h=400&fit=crop",
    inStock: true,
    weight: "2 кг",
    ingredients: ["Дегидратированное мясо птицы", "Рис", "Кукуруза", "Животные жиры", "Витамины A, D3, E"],
    features: ["Поддержка здоровья мочевыделительной системы", "Контроль веса", "Здоровая шерсть"]
  },
  {
    id: 2,
    name: "Pro Plan для собак",
    description: "Сухой корм для взрослых собак средних пород, 3 кг",
    fullDescription: "Pro Plan - это научно разработанное питание для активных собак средних пород. Содержит комплекс OPTIBALANCE для поддержания здоровья и жизненной энергии.",
    price: 1599,
    category: "food",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1684882726821-2999db517441?w=600&h=400&fit=crop",
    inStock: true,
    weight: "3 кг",
    ingredients: ["Курица (20%)", "Сухой белок птицы", "Пшеница", "Рис", "Минералы"],
    features: ["Формула OPTIBALANCE", "Поддержка иммунитета", "Здоровая кожа и шерсть"]
  },
  {
    id: 3,
    name: "Игрушка-мышка",
    description: "Интерактивная игрушка с кошачьей мятой",
    fullDescription: "Забавная интерактивная игрушка-мышка, наполненная натуральной кошачьей мятой. Стимулирует охотничьи инстинкты и обеспечивает активную игру.",
    price: 299,
    category: "toys",
    rating: 4.4,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1589924749359-9697080c3577?w=600&h=400&fit=crop",
    inStock: true,
    features: ["Натуральная кошачья мята", "Безопасные материалы", "Стимулирует активность"]
  },
  {
    id: 4,
    name: "Когтеточка",
    description: "Когтеточка-столбик с игрушками, 50 см",
    fullDescription: "Устойчивая когтеточка с сизалевым покрытием и подвесными игрушками. Защищает вашу мебель и обеспечивает кошке здоровый уход за когтями.",
    price: 1890,
    category: "accessories",
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&h=400&fit=crop",
    inStock: true,
    features: ["Прочное сизалевое покрытие", "Устойчивое основание", "Подвесные игрушки"]
  },
  {
    id: 5,
    name: "Витамины для кошек",
    description: "Комплекс витаминов и минералов, 90 таблеток",
    fullDescription: "Полный комплекс витаминов и минералов для поддержания здоровья кошек. Укрепляет иммунитет, улучшает состояние шерсти и когтей.",
    price: 450,
    category: "health",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1717265650331-c88c15cd5f81?w=600&h=400&fit=crop",
    inStock: true,
    ingredients: ["Таурин", "Витамины группы B", "Витамин E", "Омега-3", "Кальций"],
    features: ["Укрепление иммунитета", "Здоровая шерсть", "Поддержка зрения"]
  },
  {
    id: 6,
    name: "Ошейник для собак",
    description: "Светоотражающий ошейник, регулируемый",
    fullDescription: "Прочный нейлоновый ошейник со светоотражающими элементами для безопасных прогулок в темное время суток. Регулируется по размеру.",
    price: 590,
    category: "accessories",
    rating: 4.6,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1667716705760-233650f8f3fe?w=600&h=400&fit=crop",
    inStock: true,
    features: ["Светоотражающие элементы", "Регулируемая длина", "Прочный нейлон"]
  }
];

const getProductById = (id) => products.find(p => p.id === parseInt(id));

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
    // eslint-disable-next-line
    setProduct(found);
    }
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <header className="product-detail-header">
          <Link to="/" className="product-detail-logo">
            <PawPrint size={24} />
            PURRFECT
          </Link>
          <nav className="product-detail-nav">
            <Link to="/">Главная</Link>
            <Link to="/cabinet">Личный кабинет</Link>
            <Link to="/articles">Статьи</Link>
            <Link to="/marketplace">Маркетплейс</Link>
          </nav>
          <div className="product-detail-user">
            <div className="product-detail-avatar">П</div>
            <span>Полина</span>
          </div>
        </header>
        <main className="product-detail-main">
          <div className="not-found">
            <h2>Товар не найден</h2>
            <Link to="/marketplace" className="back-link">Вернуться к покупкам</Link>
          </div>
        </main>
      </div>
    );
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const getCategoryName = () => {
    const categories = { food: "Корма", toys: "Игрушки", accessories: "Аксессуары", health: "Здоровье" };
    return categories[product.category] || product.category;
  };

  return (
    <div className="product-detail-page">
      <header className="product-detail-header">
        <Link to="/" className="product-detail-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="product-detail-nav">
          <Link to="/">Главная</Link>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/marketplace">Маркетплейс</Link>
        </nav>
        <div className="product-detail-user">
          <div className="product-detail-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="product-detail-main">
        <div className="product-detail-container">
          <Link to="/marketplace" className="back-link">
            <ArrowLeft size={18} /> Назад к покупкам
          </Link>

          <div className="product-detail-grid">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-detail-info">
              <div className="product-category-badge">{getCategoryName()}</div>
              <h1>{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} color="#fbbf24" />
                  ))}
                </div>
                <span className="rating-value">{product.rating}</span>
                <span className="reviews">({product.reviews} отзывов)</span>
              </div>

              <div className="product-price">
                <span className="price">{product.price} ₽</span>
                {product.weight && <span className="weight">/ {product.weight}</span>}
              </div>

              <p className="product-full-description">{product.fullDescription || product.description}</p>

              {product.category === 'food' && (
                <div className="financial-notice">
                  <TrendingUp size={20} />
                  <div>
                    <strong>Автоматическое планирование бюджета</strong>
                    <p>При покупке корма, товар автоматически добавляется в финансовый план вашего питомца.</p>
                  </div>
                </div>
              )}

              <div className="quantity-selector">
                <span>Количество:</span>
                <div className="quantity-controls">
                  <button onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={incrementQuantity}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button className="add-to-cart-btn" onClick={addToCart} disabled={!product.inStock}>
                {addedToCart ? <Check size={18} /> : <ShoppingCart size={18} />}
                {addedToCart ? "Добавлено в корзину" : (product.inStock ? "Добавить в корзину" : "Нет в наличии")}
              </button>
            </div>
          </div>

          {(product.ingredients || product.features) && (
            <div className="product-additional">
              {product.ingredients && (
                <div className="additional-section">
                  <h3>Состав</h3>
                  <ul>
                    {product.ingredients.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {product.features && (
                <div className="additional-section">
                  <h3>Преимущества</h3>
                  <ul>
                    {product.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="product-detail-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}