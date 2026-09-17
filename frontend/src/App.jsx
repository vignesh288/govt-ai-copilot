import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingSection from './components/LandingSection';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import './components/LandingStyles.css';

const getStoredToken = () => window.localStorage.getItem('govai_token');

function LandingRoute({ theme, onToggleTheme }) {
  const navigate = useNavigate();

  return (
    <LandingSection
      openAuth={(view) => navigate(view === 'register' ? '/register' : '/login')}
      theme={theme}
      onToggleTheme={onToggleTheme}
    />
  );
}

function App() {
  const [token, setToken] = useState(getStoredToken());
  const [theme, setTheme] = useState('light');

  const handleLogin = (response) => {
    if (response?.token) {
      window.localStorage.setItem('govai_token', response.token);
      setToken(response.token);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('govai_token');
    setToken(null);
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRoute theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
