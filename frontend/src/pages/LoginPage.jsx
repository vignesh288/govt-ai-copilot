import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', message: '' });
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', message: '' });

    try {
      const result = await login(form);
      onLogin(result);
      navigate('/dashboard');
    } catch (error) {
      setStatus({ loading: false, error: error.message, message: '' });
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel auth-panel--form">
        <h1>Sign in</h1>
        <p>Use your Government AI Copilot account to continue.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email or username
            <input type="text" value={form.username} onChange={updateField('username')} required />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={updateField('password')} required />
          </label>
          <button type="submit" disabled={status.loading}>{status.loading ? 'Signing in…' : 'Sign in'}</button>
          {status.error && <div className="form-error">{status.error}</div>}
          {status.message && <div className="form-message">{status.message}</div>}
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
