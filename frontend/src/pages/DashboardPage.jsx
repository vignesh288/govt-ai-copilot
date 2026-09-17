import React from 'react';
import { logout } from '../api/auth';

const DashboardPage = ({ onLogout }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-panel">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Welcome</p>
            <h1>Your dashboard</h1>
          </div>
          <button type="button" onClick={handleLogout}>Sign out</button>
        </header>
        <div className="dashboard-content">
          <p>This is the starting point for your Government AI Copilot services.</p>
          <p>Future feature pages will include schemes, assistant, applications, documents, notifications, and profile management.</p>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
