import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import ItemsPage from "./ItemsPage.jsx";
import ItemDetailPage from "./ItemDetailPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { AuthModal } from "./components/AuthModal";

export function AppRoutes() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authFlow, setAuthFlow] = useState("signIn");

  const handleOpenAuth = (flow = "signIn") => {
    setAuthFlow(flow);
    setAuthOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar onOpenAuth={handleOpenAuth} />

        <div className="flex-1">
          <Routes>
            {/* Original Kulan Community Home */}
            <Route path="/" element={<HomePage />} />

            {/* Week 13 API List Page */}
            <Route path="/meetings" element={<ItemsPage />} />
            <Route path="/items" element={<ItemsPage />} />

            {/* Week 13 API Detail Page */}
            <Route path="/items/:id" element={<ItemDetailPage />} />
          </Routes>
        </div>

        {/* Original Kulan Auth Modal for Sign In & Sign Up */}
        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          initialFlow={authFlow}
        />
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
