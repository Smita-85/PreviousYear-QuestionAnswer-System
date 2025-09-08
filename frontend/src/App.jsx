import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import PublicNavbar from './components/PublicNavbar'
import PrivateNavbar from './components/PrivateNavbar'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from "./pages/Landing";

const NavbarWrapper = () => {
  const { user } = useContext(AuthContext);
  return user ? <PrivateNavbar /> : <PublicNavbar />;
};
function App() {
  return (
      <AuthProvider>
      {/* ✅ Navbar always shown depending on login state */}
      <NavbarWrapper />

      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
