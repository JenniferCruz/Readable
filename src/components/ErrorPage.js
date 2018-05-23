import React from 'react';
import { Link } from 'react-router-dom';
import FaHome from 'react-icons/lib/fa/home';

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h3>Oh no...</h3>
      <h2>Error 404</h2>
      <p>It seems like the page you are looking for does not exist.</p>
      <div><Link className="error-page-link" to="/"><FaHome/> Go Home</Link></div>
    </div>
  );
}
