import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import PublicNavbar from './components/PublicNavbar'
import PrivateNavbar from './components/PrivateNavbar'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";

  const NavbarWrapper = () => {
  const { user, token } = useContext(AuthContext);
  return user && token ? <PrivateNavbar /> : <PublicNavbar />;
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
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
