import React, { useRef, useState } from 'react';
import Button from './Button';

const featureItems = [
  { title: 'Scholarships', description: 'Find education support and application guidance.' },
  { title: 'Certificates', description: 'Get clear steps for certificates like income and residence.' },
  { title: 'Government Jobs', description: 'Search vacancies and eligibility across departments.' },
  { title: 'Farmer Schemes', description: 'Access subsidies, crop help, and support programs.' },
  { title: 'Healthcare', description: 'Discover public health services and assistance options.' },
  { title: 'Women Welfare', description: 'Find programs for women’s safety, health, and livelihood.' },
  { title: 'Pensions', description: 'Check retirement benefits and application status.' },
  { title: 'Education', description: 'Explore courses, grants, and skill-building schemes.' },
];

const howItems = [
  { title: 'Ask your question', description: 'Describe your need and receive a tailored service path from the AI copilot.' },
  { title: 'Review your eligibility', description: 'AI checks scheme eligibility and highlights required documents instantly.' },
  { title: 'Submit with confidence', description: 'Complete forms, upload files, and track status in a single secure workflow.' },
];

const benefitItems = [
  { title: 'Verified information', description: 'Only approved government directives and service details are surfaced.' },
  { title: 'Digital assistance', description: 'Multilingual AI support for common citizen requests across sectors.' },
  { title: 'Time-saving workflows', description: 'From document checklists to instant submission guidance, save hours.' },
];

const statItems = [
  { value: '4.9/5', label: 'Citizen satisfaction' },
  { value: '120+', label: 'Government services' },
  { value: '30m+', label: 'Requests guided' },
  { value: '99.9%', label: 'Secure authentication' },
];

const testimonials = [
  { quote: 'The AI guide helped me complete my subsidy application in under 10 minutes.', name: 'Priya Sharma', role: 'Small business owner' },
  { quote: 'I got real-time updates on my pension status without visiting the office.', name: 'Suresh Kumar', role: 'Retired civil servant' },
  { quote: 'The service recommendations were clear and trustworthy for my family needs.', name: 'Anjali Menon', role: 'Working mother' },
];

const LandingSection = ({ openAuth, theme, onToggleTheme }) => {
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantAnswer, setAssistantAnswer] = useState(null);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState('');
  const assistantRef = useRef(null);
  const assistantApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

  const askAssistant = async (question) => {
    const trimmed = question?.trim();
    if (!trimmed) return;

    setAssistantLoading(true);
    setAssistantError('');
    setAssistantAnswer(null);

    try {
      const response = await fetch(`${assistantApiUrl}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, language: 'en' }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to reach assistant');
      }
      setAssistantAnswer(result.answer || 'No answer available.');
    } catch (error) {
      setAssistantError(error.message || 'Unable to fetch assistant response');
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleAssistantSubmit = async (event) => {
    event.preventDefault();
    await askAssistant(assistantQuery);
  };

  const handleSuggestion = async (question) => {
    setAssistantQuery(question);
    await askAssistant(question);
  };

  const handleTalkToAI = () => {
    assistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={`landing-shell ${theme === 'dark' ? 'landing-shell--dark' : ''}`}>
      <header className="landing-nav">
        <div className="landing-brand">
          <div className="landing-logo" aria-hidden="true">G</div>
          <div>
            <span className="landing-brand-title">Government AI Copilot</span>
            <span className="landing-brand-subtitle">Trusted digital services with AI confidence.</span>
          </div>
        </div>

        <nav className="landing-links" aria-label="Primary navigation">
          {['Home', 'Services', 'Schemes', 'AI Assistant', 'About', 'Contact'].map((item) => (
            <button key={item} className="landing-link" type="button">{item}</button>
          ))}
        </nav>

        <div className="landing-actions">
          <button className="landing-action-text" type="button" onClick={() => openAuth('login')}>Sign In</button>
          <Button variant="primary" size="md" onClick={() => openAuth('register')}>Get Started</Button>
          <button className="landing-icon-btn" type="button" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <select className="landing-select" aria-label="Language selector">
            <option>EN</option>
            <option>HI</option>
            <option>TE</option>
          </select>
        </div>
      </header>

      <main className="landing-hero">
        <section className="landing-copy">
          <span className="eyebrow">AI-powered government services</span>
          <h1>Government Services, Simplified with AI</h1>
          <p>Ask questions, discover schemes, upload documents, and complete government services in minutes with your intelligent AI assistant.</p>

          <div className="landing-hero-actions">
            <Button variant="primary" size="lg" onClick={() => openAuth('register')}>Get Started</Button>
            <Button variant="secondary" size="lg" onClick={handleTalkToAI}>Talk to AI</Button>
            <Button variant="tertiary" size="lg">Watch Demo</Button>
          </div>

          <div className="trust-grid" role="list">
            {['Official information', 'Secure access', '24/7 AI assistance', 'Multilingual support'].map((badge) => (
              <div key={badge} className="trust-pill" role="listitem">{badge}</div>
            ))}
          </div>
        </section>

        <section className="landing-visual">
          <div className="hero-panel">
            <div className="hero-badge">AI Government Copilot</div>
            <div className="hero-card hero-card--dashboard">
              <strong>Service insights</strong>
              <span>Track applications, scheme eligibility, and status updates.</span>
            </div>
            <div className="hero-chat">
              <div className="hero-chat-header">
                <span>Citizen</span>
                <span>Active</span>
              </div>
              <div className="hero-chat-message">How do I apply for a widow pension in my state?</div>
              <div className="hero-chat-response">AI: I will guide you through the eligibility checklist and required documents.</div>
            </div>
            <div className="hero-floating-card">
              <span>Passport Renewal</span>
              <p>AI suggests next steps and timeline.</p>
            </div>
            <div className="hero-illustration" aria-hidden="true"></div>
          </div>
        </section>
      </main>

      <section className="search-section" aria-label="AI search" ref={assistantRef}>
        <div className="search-shell">
          <div className="search-content">
            <h2>Ask Government AI anything...</h2>
            <form className="search-bar-row" onSubmit={handleAssistantSubmit}>
              <input
                type="search"
                value={assistantQuery}
                onChange={(event) => setAssistantQuery(event.target.value)}
                placeholder="How can I apply for a scholarship?"
                aria-label="Search Government AI"
              />
              <button className="search-voice" type="submit" disabled={assistantLoading}>
                {assistantLoading ? 'Asking…' : 'Ask AI'}
              </button>
            </form>
            <div className="search-suggestions">
              {['Scholarships', 'Income Certificate', 'PM Kisan', 'Passport', 'Driving Licence', 'Government Jobs'].map((item) => (
                <button key={item} type="button" onClick={() => handleSuggestion(item)}>{item}</button>
              ))}
            </div>
            <div className="assistant-panel" aria-live="polite">
              {assistantError && <div className="assistant-error">{assistantError}</div>}
              {assistantAnswer && (
                <div className="assistant-card">
                  <div className="assistant-label">AI Assistant response</div>
                  <p>{assistantAnswer}</p>
                  <div className="assistant-meta">Source: official government guidance</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="featured-services" aria-labelledby="featured-services-title">
        <h2 id="featured-services-title">Featured Services</h2>
        <div className="services-grid">
          {featureItems.map((item) => (
            <article key={item.title} className="service-card">
              <div className="service-icon">•</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-header">
          <span className="eyebrow">How it works</span>
          <h2 id="process-title">A smarter path to government services</h2>
          <p>Navigate complex government systems with step-by-step AI guidance and a single secure profile.</p>
        </div>
        <div className="info-grid">
          {howItems.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-title">
        <div className="why-content">
          <span className="eyebrow">Why choose us</span>
          <h2 id="why-title">A trusted partner for every citizen journey</h2>
          <p>We combine official government services with intelligent assistance to reduce wait time, avoid errors, and keep every interaction transparent.</p>
        </div>
        <div className="why-grid">
          {benefitItems.map((item) => (
            <article key={item.title} className="why-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-section" aria-label="Impact statistics">
        <div className="stats-grid">
          {statItems.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonials-title">
        <div className="section-header">
          <span className="eyebrow">Citizen stories</span>
          <h2 id="testimonials-title">Real outcomes from trusted public services</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p>“{item.quote}”</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="landing-logo" aria-hidden="true">G</div>
            <div>
              <p>Government AI Copilot</p>
              <p>Helping citizens access government services with confidence and clarity.</p>
            </div>
          </div>
          <div>
            <h3>Quick links</h3>
            <ul className="footer-links">
              <li><button type="button">Services</button></li>
              <li><button type="button">Schemes</button></li>
              <li><button type="button">AI Assistant</button></li>
              <li><button type="button">Privacy</button></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul className="footer-links">
              <li><button type="button">Help center</button></li>
              <li><button type="button">Security</button></li>
              <li><button type="button">Contact us</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Government AI Copilot</span>
          <span>Built for secure public service delivery.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingSection;
