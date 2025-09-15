import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import PublicNavbar from './components/PublicNavbar'
import PrivateNavbar from './components/PrivateNavbar'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import FavouritesPage from "./pages/Favourites";

  const NavbarWrapper = () => {
  const { token } = useContext(AuthContext);
  return token ? <PrivateNavbar /> : <PublicNavbar />;
};


function App() {
  return (
      <AuthProvider>
      <NavbarWrapper />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/favourites" element={<FavouritesPage />} /> 
      </Routes>
    </AuthProvider>
  )
}

export default App
