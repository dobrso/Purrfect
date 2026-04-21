import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PawPrint, ShoppingCart, Star, Heart, Package } from "lucide-react";
import "../styles/MarketplacePage.css";

const products = [
  {
    id: 1,
    name: "Royal Canin для кошек",
    description: "Премиум корм для взрослых кошек, 2 кг",
    price: 1299,
    category: "food",
    rating: 4.8,
    reviews: 156,
    image: "https://royalcanin.ru/_nuxt/product-cat-mobile-1_2x.B9HwfjbC.webp",
    inStock: true
  },
  {
    id: 2,
    name: "Pro Plan для собак",
    description: "Сухой корм для взрослых собак средних пород, 3 кг",
    price: 1599,
    category: "food",
    rating: 4.9,
    reviews: 234,
    image: "https://petobzor.com/wp-content/uploads/2018/02/Korm-dlya-sobak-Pro-Plan-otzyvy.jpg",
    inStock: true
  },
  {
    id: 3,
    name: "Игрушка-мышка",
    description: "Интерактивная игрушка с кошачьей мятой",
    price: 299,
    category: "toys",
    rating: 4.4,
    reviews: 45,
    image: "https://img-edg.joomcdn.net/5df77a0376770419bcbfaf867f259a2c2fbc83e0_original.jpeg",
    inStock: true
  },
  {
    id: 4,
    name: "Когтеточка",
    description: "Когтеточка-столбик с игрушками, 50 см",
    price: 1890,
    category: "accessories",
    rating: 4.8,
    reviews: 178,
    image: "https://catpeople.ru/assets/cache_image/images/kotovodstvo/kogtetochka-dlya-koshek/001_870x510_f3e.jpg",
    inStock: true
  },
  {
    id: 5,
    name: "Витамины для кошек",
    description: "Комплекс витаминов и минералов, 90 таблеток",
    price: 450,
    category: "health",
    rating: 4.7,
    reviews: 67,
    image: "https://vizoovi.ru/thumbs/143/veda_6___e4525cc9-504x712x0-d.jpg",
    inStock: true
  },
  {
    id: 6,
    name: "Ошейник для собак",
    description: "Светоотражающий ошейник, регулируемый",
    price: 590,
    category: "accessories",
    rating: 4.6,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1667716705760-233650f8f3fe?w=400&h=300&fit=crop",
    inStock: true
  }
];

const categories = [
  { id: "all", name: "Все товары", icon: "📦" },
  { id: "food", name: "Корма", icon: "🐟" },
  { id: "toys", name: "Игрушки", icon: "🎾" },
  { id: "accessories", name: "Аксессуары", icon: "🦴" },
  { id: "health", name: "Здоровье", icon: "💊" }
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
  updateCartCount();
  window.addEventListener('cartUpdated', updateCartCount);
  return () => window.removeEventListener('cartUpdated', updateCartCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} добавлен в корзину`);
  };

  return (
    <div className="marketplace-page">
      <header className="marketplace-header">
        <Link to="/" className="marketplace-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="marketplace-nav">
          <Link to="/">Главная</Link>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/marketplace" className="active">Маркетплейс</Link>
        </nav>
        <div className="marketplace-user">
          <div className="marketplace-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="marketplace-main">
        <div className="marketplace-hero">
          <div className="marketplace-hero-content">
            <h1>Маркетплейс</h1>
            <p>Всё необходимое для ваших питомцев</p>
          </div>
        </div>

        <div className="categories-section">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Кнопка перехода в корзину */}
        <div className="cart-button-wrapper">
          <Link to="/cart" className="cart-link-btn">
            <ShoppingCart size={18} />
            Перейти в корзину
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </Link>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/marketplace/${product.id}`} className="product-image-link">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="favorite-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(product.id) ? "#f97316" : "none"}
                      color={favorites.includes(product.id) ? "#f97316" : "#9ca3af"}
                    />
                  </button>
                </div>
              </Link>
              <div className="product-info">
                <Link to={`/marketplace/${product.id}`} className="product-title">
                  {product.name}
                </Link>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span>{product.rating}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price} ₽</span>
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <Package size={64} color="#d1d5db" />
            <p>В этой категории пока нет товаров</p>
          </div>
        )}
      </main>

      <footer className="marketplace-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}