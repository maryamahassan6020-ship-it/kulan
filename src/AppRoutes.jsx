import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import ItemsPage from "./ItemsPage.jsx";
import ItemDetailPage from "./ItemDetailPage.jsx";
import LoginPage from "./LoginPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Public Community Home */}
            <Route path="/" element={<HomePage />} />

            {/* Public Meetings List (Weeks 13 & 14) */}
            <Route path="/meetings" element={<ItemsPage />} />
            <Route path="/items" element={<ItemsPage />} />

            {/* Public Meeting Detail (Weeks 13 & 14) */}
            <Route path="/items/:id" element={<ItemDetailPage />} />

            {/* Public Login Route (Week 15) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Route Guarded by Zustand useAuthStore (Week 15) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
