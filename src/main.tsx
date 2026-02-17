import React from 'react';
import ReactDOM from 'react-dom/client';
import { LandingPage } from './components/LandingPage';
import { ProviderApp } from './components/Provider/ProviderApp';
import './styles/globals.css';

const path = window.location.pathname;
const isLanding = path === '/' || path === '/index.html';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isLanding ? <LandingPage /> : <ProviderApp />}
  </React.StrictMode>
);
