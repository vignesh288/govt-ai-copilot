import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import LandingSection from './components/LandingSection';
import './components/LandingStyles.css';

const authViews = {
  login: 'login',
  register: 'register',
  forgot: 'forgot',
  otp: 'otp',
  reset: 'reset',
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [authState, setAuthState] = useState({ open: false, view: authViews.login });
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', fullName: '', otp: '' });
  const [authStatus, setAuthStatus] = useState({ loading: false, message: '', error: '' });

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const openAuth = (view = authViews.login) => {
    setAuthStatus({ loading: false, message: '', error: '' });
    setAuthState({ open: true, view });
  };

  const closeAuth = () => setAuthState((prev) => ({ ...prev, open: false }));

  const switchAuth = (view) => {
    setAuthStatus({ loading: false, message: '', error: '' });
    setAuthState((prev) => ({ ...prev, view }));
  };

  const updateField = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const submitAuth = async (endpoint, body) => {
    try {
      setAuthStatus({ loading: true, message: '', error: '' });
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || result.error || response.statusText || 'Authentication failed');
      }
      window.localStorage.setItem('govai_token', result.token);
      setAuthStatus({ loading: false, message: `Welcome back, ${result.fullName || result.username}!`, error: '' });
      setTimeout(() => closeAuth(), 500);
    } catch (error) {
      setAuthStatus({ loading: false, message: '', error: error.message || 'Unable to complete request' });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await submitAuth('/api/auth/login', {
      username: formData.username,
      password: formData.password,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAuthStatus({ loading: false, message: '', error: 'Passwords do not match' });
      return;
    }
    await submitAuth('/api/auth/register', {
      username: formData.username,
      password: formData.password,
      email: formData.username,
      fullName: formData.fullName,
    });
  };

  const renderAuthForm = () => {
    const { view } = authState;

    if (view === authViews.register) {
      return (
        <>
          <p className="auth-intro">Create your secure Government AI account to get fast access to services, documents, and scheme guidance.</p>
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              Full name
              <input type="text" value={formData.fullName} onChange={updateField('fullName')} placeholder="Priya Sharma" required />
            </label>
            <label>
              Email address
              <input type="email" value={formData.username} onChange={updateField('username')} placeholder="you@example.gov" required />
            </label>
            <label>
              Password
              <input type="password" value={formData.password} onChange={updateField('password')} placeholder="Create a password" required />
            </label>
            <label>
              Confirm password
              <input type="password" value={formData.confirmPassword} onChange={updateField('confirmPassword')} placeholder="Repeat password" required />
            </label>
            <button className="form-submit" type="submit" disabled={authStatus.loading}>{authStatus.loading ? 'Creating account…' : 'Create Account'}</button>
            <div className="auth-note">By creating an account, you agree to use digital services safely and securely.</div>
            {authStatus.error && <div className="auth-error">{authStatus.error}</div>}
            {authStatus.message && <div className="auth-message">{authStatus.message}</div>}
            <div className="auth-footer">
              <span>Already registered?</span>
              <button type="button" className="auth-link" onClick={() => switchAuth(authViews.login)}>Sign in</button>
            </div>
          </form>
        </>
      );
    }

    if (view === authViews.forgot) {
      return (
        <>
          <p className="auth-intro">Enter your email and we will send a one-time recovery link to reset your government service access.</p>
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Email address
              <input type="email" value={formData.email} onChange={updateField('email')} placeholder="you@example.gov" required />
            </label>
            <button className="form-submit" type="submit">Send reset link</button>
            <div className="auth-footer">
              <button type="button" className="auth-link" onClick={() => switchAuth(authViews.login)}>Back to sign in</button>
            </div>
          </form>
        </>
      );
    }

    if (view === authViews.otp) {
      return (
        <>
          <p className="auth-intro">Enter the six-digit security code sent to your registered email address.</p>
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Security code
              <input type="text" value={formData.otp} onChange={updateField('otp')} placeholder="123 456" required />
            </label>
            <button className="form-submit" type="submit">Verify code</button>
            <div className="auth-divider">Did not receive a code?</div>
            <button type="button" className="auth-link" onClick={() => switchAuth(authViews.forgot)}>Send again</button>
          </form>
        </>
      );
    }

    if (view === authViews.reset) {
      return (
        <>
          <p className="auth-intro">Set a new password for your Government AI account and continue where you left off.</p>
          <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              New password
              <input type="password" value={formData.password} onChange={updateField('password')} placeholder="New password" required />
            </label>
            <label>
              Confirm new password
              <input type="password" value={formData.confirmPassword} onChange={updateField('confirmPassword')} placeholder="Confirm password" required />
            </label>
            <button className="form-submit" type="submit">Save password</button>
            <div className="auth-footer">
              <button type="button" className="auth-link" onClick={() => switchAuth(authViews.login)}>Back to sign in</button>
            </div>
          </form>
        </>
      );
    }

    return (
      <>
        <p className="auth-intro">Sign in to continue your service requests, track applications, and receive personalized AI guidance for government programs.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email or username
            <input type="text" value={formData.username} onChange={updateField('username')} placeholder="you@example.gov" required />
          </label>
          <label>
            Password
            <input type="password" value={formData.password} onChange={updateField('password')} placeholder="Enter your password" required />
          </label>
          <div className="auth-form-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <button className="auth-link" type="button" onClick={() => switchAuth(authViews.forgot)}>Forgot Password?</button>
          </div>
          <button className="form-submit" type="submit" disabled={authStatus.loading}>{authStatus.loading ? 'Signing in…' : 'Login'}</button>
          {authStatus.error && <div className="auth-error">{authStatus.error}</div>}
          {authStatus.message && <div className="auth-message">{authStatus.message}</div>}
          <div className="auth-divider">or continue with</div>
          <div className="auth-social-grid">
            <button type="button">Google</button>
            <button type="button">Microsoft</button>
            <button type="button">DigiLocker</button>
          </div>
          <div className="auth-footer">
            <span>Need an account?</span>
            <button type="button" className="auth-link" onClick={() => switchAuth(authViews.register)}>Register now</button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <LandingSection openAuth={openAuth} theme={theme} onToggleTheme={toggleTheme} />
      {authState.open && (
        <div className="auth-overlay" role="dialog" aria-modal="true">
          <div className="auth-card">
            <div className="auth-panel auth-panel--visual">
              <div className="auth-illustration" aria-hidden="true"></div>
              <div>
                <h2>Secure access for every citizen</h2>
                <p>Sign in or create your account to get instant access to verified government services with AI guidance.</p>
                <div className="auth-feature-list">
                  <div>• One profile for all government applications</div>
                  <div>• Secure digital identity and document storage</div>
                  <div>• Notifications for updates and timelines</div>
                </div>
              </div>
            </div>
            <div className="auth-panel auth-panel--form">
              <div className="auth-header">
                <div>
                  <p className="eyebrow">Government AI Copilot</p>
                  <h2>{authState.view === authViews.register ? 'Create an account' : authState.view === authViews.forgot ? 'Recover your access' : authState.view === authViews.otp ? 'Verify security code' : authState.view === authViews.reset ? 'Reset your password' : 'Sign in to your account'}</h2>
                </div>
                <button className="close-btn" type="button" onClick={closeAuth} aria-label="Close authentication">×</button>
              </div>
              {renderAuthForm()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
