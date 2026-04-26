import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PawPrint, Trash2, Plus, Minus, ArrowRight, ShoppingCart, Package, TrendingUp } from "lucide-react";
import "../styles/CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showFinancialNotice, setShowFinancialNotice] = useState(false);
  const navigate = useNavigate();

  const loadCart = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  useEffect(() => {
  loadCart();
  window.addEventListener('cartUpdated', loadCart);
  return () => window.removeEventListener('cartUpdated', loadCart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const hasFoodItems = cartItems.some(item => item.category === 'food');

  const handleCheckout = () => {
    if (hasFoodItems) {
      setShowFinancialNotice(true);
      setTimeout(() => setShowFinancialNotice(false), 3000);
    }
    localStorage.removeItem('cart');
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => navigate('/marketplace'), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <header className="cart-header">
          <Link to="/" className="cart-logo">
            <PawPrint size={24} />
            PURRFECT
          </Link>
          <nav className="cart-nav">
            <Link to="/">Главная</Link>
            <Link to="/cabinet">Личный кабинет</Link>
            <Link to="/articles">Статьи</Link>
            <Link to="/marketplace">Маркетплейс</Link>
          </nav>
          <div className="cart-user">
            <div className="cart-avatar">П</div>
            <span>Полина</span>
          </div>
        </header>
        <main className="cart-main">
          <div className="empty-cart">
            <ShoppingCart size={80} color="#d1d5db" />
            <h2>Корзина пуста</h2>
            <p>Добавьте товары из нашего маркетплейса</p>
            <Link to="/marketplace" className="shop-now-btn">Перейти к покупкам</Link>
          </div>
        </main>
        <footer className="cart-footer">
          <PawPrint size={14} />
          © 2026 PURRFECT. Забота о ваших питомцах с любовью
          <PawPrint size={14} />
        </footer>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <Link to="/" className="cart-logo">
          <PawPrint size={24} />
          PURRFECT
        </Link>
        <nav className="cart-nav">
          <Link to="/">Главная</Link>
          <Link to="/cabinet">Личный кабинет</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/marketplace">Маркетплейс</Link>
        </nav>
        <div className="cart-user">
          <div className="cart-avatar">П</div>
          <span>Полина</span>
        </div>
      </header>

      <main className="cart-main">
        <h1 className="cart-title">Корзина</h1>
        <p className="cart-subtitle">{getTotalItems()} {getTotalItems() === 1 ? 'товар' : 'товаров'}</p>

        <div className="cart-grid">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/marketplace/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/marketplace/${item.id}`} className="cart-item-title">
                    {item.name}
                  </Link>
                  <p className="cart-item-description">{item.description}</p>
                  <div className="cart-item-price">
                    {item.price} ₽
                  </div>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Итого</h3>
            <div className="summary-row">
              <span>Товары ({getTotalItems()}):</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка:</span>
              <span className="free">Бесплатно</span>
            </div>
            <div className="summary-total">
              <span>Всего:</span>
              <span>{getTotalPrice()} ₽</span>
            </div>

            {hasFoodItems && (
              <div className="financial-plan-notice">
                <TrendingUp size={16} />
                <span>Корма будут добавлены в финансовый план</span>
              </div>
            )}

            {showFinancialNotice && (
              <div className="checkout-notice">
                <Package size={18} />
                <span>Заказ оформлен! Корма добавлены в финансовый план вашего питомца</span>
              </div>
            )}

            <button className="checkout-btn" onClick={handleCheckout}>
              Оформить заказ <ArrowRight size={18} />
            </button>

            <Link to="/marketplace" className="continue-shopping">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </main>

      <footer className="cart-footer">
        <PawPrint size={14} />
        © 2026 PURRFECT. Забота о ваших питомцах с любовью
        <PawPrint size={14} />
      </footer>
    </div>
  );
}