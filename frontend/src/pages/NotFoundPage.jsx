import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="notfound-page">
    <section className="notfound-panel">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Return to home</Link>
    </section>
  </main>
);

export default NotFoundPage;
