import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const RegisterPage = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', fullName: '' });
  const [status, setStatus] = useState({ loading: false, error: '', message: '' });
  const navigate = useNavigate();

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus({ loading: false, error: 'Passwords do not match', message: '' });
      return;
    }

    setStatus({ loading: true, error: '', message: '' });
    try {
      const result = await register({
        username: form.username,
        password: form.password,
        fullName: form.fullName,
        email: form.username,
      });
      onLogin(result);
      navigate('/dashboard');
    } catch (error) {
      setStatus({ loading: false, error: error.message, message: '' });
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel auth-panel--form">
        <h1>Create your account</h1>
        <p>Register to save your progress and access AI-guided services.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" value={form.fullName} onChange={updateField('fullName')} required />
          </label>
          <label>
            Email address
            <input type="email" value={form.username} onChange={updateField('username')} required />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={updateField('password')} required />
          </label>
          <label>
            Confirm password
            <input type="password" value={form.confirmPassword} onChange={updateField('confirmPassword')} required />
          </label>
          <button type="submit" disabled={status.loading}>{status.loading ? 'Registering…' : 'Register'}</button>
          {status.error && <div className="form-error">{status.error}</div>}
          {status.message && <div className="form-message">{status.message}</div>}
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
