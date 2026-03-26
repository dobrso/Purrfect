import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PetProfile from "./pages/PetProfile";
import AuthorizationPage from "./pages/AuthorizationPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import AppointmentPage from "./pages/AppointmentPage";
import BudgetPlanPage from "./pages/BudgetPlanPage";
import CabinetPage from "./pages/CabinetPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/pet" element={<PetProfile />} />
      <Route path="/auth" element={<AuthorizationPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/budget" element={<BudgetPlanPage />} />
      <Route path="/cabinet" element={<CabinetPage />} />
    </Routes>
  );
}

export default App;