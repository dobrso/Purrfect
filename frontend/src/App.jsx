import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import MainPage from "./pages/MainPage";
import PetProfile from "./pages/PetProfile";
import AuthorizationPage from "./pages/AuthorizationPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import AppointmentPage from "./pages/AppointmentPage";
import BudgetPlanPage from "./pages/BudgetPlannerPage";
import CabinetPage from "./pages/CabinetPage";
import RegistrationPage from "./pages/RegistrationPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import BreedIdentificationPage from './pages/BreedIdentificationPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import NameGeneratorPage from "./pages/NameGeneratorPage";
import ServicesPage from "./pages/ServicesPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Загрузка...</div>;
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthorizationPage />} />
      <Route path="/registr" element={<RegistrationPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/budget" element={<BudgetPlanPage />} />
      <Route path="/pet" element={
        <PrivateRoute>
          <PetProfile />
        </PrivateRoute>
      } />
      <Route path="/cabinet" element={
        <PrivateRoute>
          <CabinetPage />
        </PrivateRoute>
      } />
      <Route path="/create-article" element={<CreateArticlePage />} />
      <Route path="/breed-identification" element={<BreedIdentificationPage />} />
      <Route path="/budget-planner" element={<BudgetPlannerPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/marketplace/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/name-generator" element={<NameGeneratorPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  );
}

export default App;