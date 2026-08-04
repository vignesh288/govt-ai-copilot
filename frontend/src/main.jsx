import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const BACKEND_URL = 'http://127.0.0.1:8081';

const stats = [
  { label: 'Active cases', value: '2,480', tone: '#0f3d8a' },
  { label: 'Avg. response time', value: '11 hrs', tone: '#0f766e' },
  { label: 'Resolution rate', value: '94%', tone: '#b45309' },
  { label: 'Citizen satisfaction', value: '4.8/5', tone: '#7c3aed' }
];

const queue = [
  { title: 'Road maintenance', count: '126 open', tag: 'High priority' },
  { title: 'Waste collection', count: '98 open', tag: 'Pending review' },
  { title: 'Public safety', count: '44 open', tag: 'Escalated' }
];

const schemeCards = [
  { name: 'Road safety support', status: 'Available', description: 'Funding and repairs for streetlight and sidewalk safety issues.' },
  { name: 'Sanitation relief initiative', status: 'Open', description: 'Support for waste management and drainage remediation requests.' },
  { name: 'Utility hardship program', status: 'Active', description: 'Subsidies and fast-track support for essential utility restoration.' }
];

const documentGuides = [
  { title: 'Proof of residence', detail: 'Accepted: utility bill, ration card, or tenant affidavit.' },
  { title: 'Issue declaration', detail: 'Use the guided form to describe the complaint clearly and accurately.' },
  { title: 'Supporting photo', detail: 'Upload a photo or scanned document to speed resolution.' }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [complaints, setComplaints] = useState([]);
  const [runtimeMessage, setRuntimeMessage] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [draft, setDraft] = useState({
    name: 'Priya Nair',
    department: 'Road maintenance',
    priority: 'High',
    summary: 'Streetlight near the school crossing is malfunctioning and creates safety concerns for school commuters.'
  });

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/complaints`);
        if (!response.ok) {
          throw new Error('Unable to load complaints');
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setRuntimeMessage(error.message || 'Unable to load complaint data');
      }
    };

    loadComplaints();
  }, []);

  const handleSubmitComplaint = async () => {
    try {
      setRuntimeMessage('Submitting complaint...');
      const submitResponse = await fetch(`${BACKEND_URL}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenName: draft.name,
          title: `${draft.department} issue`,
          description: draft.summary,
          department: draft.department,
          priority: draft.priority,
          language: 'English'
        })
      });

      if (!submitResponse.ok) {
        throw new Error('Complaint submission failed');
      }

      const created = await submitResponse.json();
      const suggestResponse = await fetch(`${BACKEND_URL}/api/complaints/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${draft.department} issue`,
          detail: draft.summary,
          department: draft.department
        })
      });

      if (!suggestResponse.ok) {
        throw new Error('AI suggestion failed');
      }

      const suggestion = await suggestResponse.json();
      setAiDraft(suggestion.officerMessage || suggestion.recommendedAction || 'AI response prepared.');
      setComplaints((current) => [created, ...current]);
      setRuntimeMessage(`Complaint #${created.id} created successfully.`);
    } catch (error) {
      setRuntimeMessage(error.message || 'Unable to submit complaint');
    }
  };

  const suggestedReply = aiDraft || `Dear ${draft.name || 'Citizen'}, we have registered your concern under ${draft.department}. Our team will review the matter and respond with the next action plan within the promised service window.`;

  return (
    <div className="shell">
      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Inter, "Segoe UI", Arial, sans-serif; background: #eef5ff; color: #102a43; }
        .shell { min-height: 100vh; padding: 24px; background: radial-gradient(circle at top left, rgba(15, 61, 138, 0.12), transparent 36%), linear-gradient(180deg, #eef5ff 0%, #ffffff 100%); }
        .content { max-width: 1240px; margin: 0 auto; }
        .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; background: rgba(255,255,255,0.96); border-radius: 22px; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06); }
        .brand { display: flex; align-items: center; gap: 14px; font-weight: 800; color: #0f3d8a; font-size: 1.1rem; }
        .brand-badge { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; color: white; background: linear-gradient(135deg, #0f3d8a, #1d4ed8); box-shadow: 0 10px 20px rgba(15, 61, 138, 0.22); }
        .brand-label { display: flex; flex-direction: column; line-height: 1.1; }
        .brand-label span { font-size: 0.78rem; color: #475569; text-transform: uppercase; letter-spacing: 0.14em; }
        .nav-links { display: flex; gap: 10px; flex-wrap: wrap; }
        .nav-links button { border: none; background: transparent; color: #344e72; cursor: pointer; font: inherit; letter-spacing: 0.01em; padding: 10px 14px; border-radius: 999px; transition: background 200ms, color 200ms; }
        .nav-links button:hover { background: rgba(15, 61, 138, 0.08); }
        .nav-links button.active { background: #0f3d8a; color: white; }
        .btn { border: none; border-radius: 999px; padding: 12px 20px; font-weight: 700; cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #0f3d8a, #2563eb); color: #fff; box-shadow: 0 14px 24px rgba(15, 61, 138, 0.2); }
        .btn-secondary { background: #eff6ff; color: #0f3d8a; }
        .hero { display: grid; grid-template-columns: 1.2fr 0.85fr; gap: 22px; margin-top: 24px; }
        .hero-copy { padding: 30px 30px 28px; background: rgba(255,255,255,0.92); border-radius: 28px; border: 1px solid rgba(15, 23, 42, 0.08); }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.76rem; color: #0f3d8a; font-weight: 800; }
        .eyebrow::before { content: ' '; width: 28px; height: 1px; background: #0f3d8a; display: inline-block; }
        .headline { font-size: clamp(2.4rem, 4vw, 3.6rem); line-height: 1.02; margin: 20px 0 18px; color: #0f172a; }
        .subtext { max-width: 620px; line-height: 1.75; color: #334155; font-size: 1.03rem; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
        .hero-panel { position: relative; min-height: 420px; padding: 28px; background: linear-gradient(180deg, #0f3d8a 0%, #2563eb 100%); border-radius: 28px; color: white; box-shadow: 0 26px 60px rgba(15, 61, 138, 0.18); }
        .hero-panel h2 { margin: 0 0 14px; font-size: 1.6rem; }
        .hero-panel p { margin: 0 0 22px; line-height: 1.7; color: rgba(255,255,255,0.88); }
        .hero-panel .panel-list { display: grid; gap: 12px; }
        .hero-panel .panel-card { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18); border-radius: 20px; padding: 16px; }
        .hero-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 24px; }
        .stat-card { background: #ffffff; border-radius: 20px; padding: 18px 20px; border: 1px solid rgba(15, 23, 42, 0.08); }
        .stat-card strong { display: block; font-size: 1.75rem; color: #0f172a; margin-bottom: 6px; }
        .stat-card span { color: #475569; font-size: 0.95rem; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin: 28px 0; }
        .feature-card { display: flex; flex-direction: column; gap: 16px; padding: 24px; border-radius: 24px; background: white; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 16px 38px rgba(15, 23, 42, 0.04); }
        .feature-pill { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 16px; font-size: 1.4rem; background: #eff6ff; }
        .feature-card h3 { margin: 0; font-size: 1.1rem; color: #0f3d8a; }
        .feature-card p { margin: 0; line-height: 1.75; color: #475569; }
        .section-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }
        .tab-btn { appearance: none; border: 1px solid rgba(15, 23, 42, 0.12); border-radius: 999px; background: white; color: #334155; padding: 12px 18px; font-weight: 700; cursor: pointer; transition: background 180ms, border-color 180ms, color 180ms; }
        .tab-btn.active { background: #0f3d8a; border-color: #0f3d8a; color: white; }
        .workspace { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 20px; }
        .panel { background: white; border-radius: 24px; padding: 26px; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 18px 38px rgba(15, 23, 42, 0.05); }
        .panel-title { margin: 0 0 18px; color: #0f3d8a; font-size: 0.95rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 800; }
        .field { display: grid; gap: 10px; margin-bottom: 18px; }
        .field label { font-size: 0.92rem; color: #334155; font-weight: 700; }
        .field input, .field select, .field textarea { width: 100%; border-radius: 16px; border: 1px solid #cbd5e1; background: #f8fafc; padding: 12px 14px; color: #0f172a; font: inherit; }
        .field textarea { min-height: 138px; resize: vertical; }
        .mini-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .status-card { background: #f8fafc; border-radius: 20px; padding: 18px; border: 1px solid rgba(15, 23, 42, 0.08); }
        .status-top { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; margin-bottom: 10px; }
        .pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; font-size: 0.82rem; font-weight: 700; background: #e0f2fe; color: #075985; }
        .pill.high { background: #fee2e2; color: #b91c1c; }
        .pill.medium { background: #fef9c3; color: #92400e; }
        .pill.low { background: #dcfce7; color: #166534; }
        .list-grid { display: grid; gap: 14px; }
        .message-box { background: #fff; border: 1px solid #cbd5e1; border-radius: 18px; padding: 18px; min-height: 138px; color: #334155; line-height: 1.7; }
        .document-card, .scheme-card, .case-card, .dashboard-card { background: #f8fafc; border-radius: 20px; padding: 18px; border: 1px solid rgba(15, 23, 42, 0.08); }
        .case-card strong, .dashboard-card strong { color: #0f3d8a; }
        .case-card p, .document-card p, .scheme-card span, .dashboard-card p { margin: 8px 0 0; color: #475569; }
        .status-line { color: #475569; font-size: 0.95rem; }
        .note { background: #eff6ff; border-radius: 18px; padding: 18px; color: #0f3d8a; border: 1px solid rgba(15, 61, 138, 0.12); }
        .small { color: #64748b; font-size: 0.94rem; line-height: 1.7; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .dashboard-card h3 { margin: 0 0 10px; font-size: 1.05rem; color: #0f3d8a; }
        .scheme-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; }
        .scheme-card h4, .document-card h4 { margin: 0 0 8px; font-size: 1rem; color: #0f3d8a; }
        .content-divider { height: 1px; background: rgba(15, 23, 42, 0.08); margin: 24px 0; }
        @media (max-width: 1080px) { .feature-grid, .hero { grid-template-columns: 1fr; } .workspace { grid-template-columns: 1fr; } .hero-panel { min-height: auto; } }
        @media (max-width: 820px) { .topbar { flex-direction: column; align-items: stretch; } .nav-links { justify-content: center; } .hero-copy, .hero-panel { border-radius: 22px; } .feature-grid { grid-template-columns: 1fr; } .mini-grid, .grid-2, .grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      <div className="content">
        <header className="topbar">
          <div className="brand">
            <div className="brand-badge">Gov</div>
            <div className="brand-label">
              <span>Government AI Copilot</span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Primary navigation">
            <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            <button className={activeTab === 'citizen' ? 'active' : ''} onClick={() => setActiveTab('citizen')}>Citizen Services</button>
            <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab('ai')}>AI Assist</button>
            <button className={activeTab === 'schemes' ? 'active' : ''} onClick={() => setActiveTab('schemes')}>Schemes</button>
            <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>Document Assist</button>
            <button className={activeTab === 'officer' ? 'active' : ''} onClick={() => setActiveTab('officer')}>Officer Console</button>
            <button className={activeTab === 'insights' ? 'active' : ''} onClick={() => setActiveTab('insights')}>Insights</button>
          </nav>

          <button className="btn btn-primary">Citizen Portal</button>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">Civic service intelligence</div>
            <h1 id="hero-title">A modern government portal for complaint intake, case routing, and citizen trust.</h1>
            <p className="subtext">
              Government AI Copilot blends accessible self-service, transparent workflows, and AI-guided case handling for public agencies.
              Citizens can submit grievances, access schemes, and upload supporting documents without paperwork.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setActiveTab('citizen')}>Submit an issue</button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('ai')}>Open AI assistant</button>
            </div>
            <div className="hero-stats">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <strong style={{ color: item.tone }}>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-panel" role="complementary">
            <h2>Built for accountable public service</h2>
            <p>Track every complaint, generate officer guidance, and make decisions from case trends rather than paper forms.</p>
            <div className="panel-list">
              <div className="panel-card">
                <strong>24/7 citizen access</strong>
                <p>Residents can lodge a grievance from any device and review the status of every request.</p>
              </div>
              <div className="panel-card">
                <strong>AI-backed case routing</strong>
                <p>Auto-classify complaints, recommend departments, and surface follow-up instructions for field teams.</p>
              </div>
              <div className="panel-card">
                <strong>Scheme match finder</strong>
                <p>Link citizen support cases to available public schemes, subsidies, and service programs instantly.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="feature-grid" aria-label="Primary features">
          <article className="feature-card">
            <div className="feature-pill">1</div>
            <h3>Grievance portal</h3>
            <p>Enable citizens to submit issues with clear categories, supporting evidence, and expected service timelines.</p>
          </article>
          <article className="feature-card">
            <div className="feature-pill">2</div>
            <h3>AI guidance</h3>
            <p>Provide officers with pre-written responses, next-step recommendations, and audit-friendly rationale.</p>
          </article>
          <article className="feature-card">
            <div className="feature-pill">3</div>
            <h3>Scheme navigator</h3>
            <p>Show relevant government programs that apply to each citizen case and help them find the right benefits.</p>
          </article>
          <article className="feature-card">
            <div className="feature-pill">4</div>
            <h3>Document assistant</h3>
            <p>Offer citizens quick access to essential forms, checklists, and upload guidance for faster approvals.</p>
          </article>
          <article className="feature-card">
            <div className="feature-pill">5</div>
            <h3>Officer console</h3>
            <p>Collect complaints, prioritize cases, and keep resolution activity transparent for supervisors.</p>
          </article>
          <article className="feature-card">
            <div className="feature-pill">6</div>
            <h3>Insights & audits</h3>
            <p>Monitor service equity, case resolution performance, and the health of public service workflows.</p>
          </article>
        </section>

        <section className="section-tabs" role="tablist" aria-label="Application tabs">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'citizen', label: 'Citizen Services' },
            { id: 'ai', label: 'AI Assist' },
            { id: 'schemes', label: 'Schemes' },
            { id: 'documents', label: 'Document Assist' },
            { id: 'officer', label: 'Officer Console' },
            { id: 'insights', label: 'Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </section>

        {activeTab === 'dashboard' && (
          <section className="grid-2" aria-labelledby="dashboard-title">
            <div className="panel">
              <div className="panel-title">Government service scorecard</div>
              <div className="dashboard-card">
                <h3 id="dashboard-title">Public service snapshot</h3>
                <p>Track case volume, active routes, and audit readiness in a single pane of glass for operational teams.</p>
              </div>
              <div className="grid-3" style={{ marginTop: '18px' }}>
                <div className="dashboard-card">
                  <strong>12,800</strong>
                  <p>Requests received this month.</p>
                </div>
                <div className="dashboard-card">
                  <strong>92%</strong>
                  <p>On-time service delivery target met.</p>
                </div>
  