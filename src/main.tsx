import React from 'react';
import ReactDOM from 'react-dom/client';
import { LandingPage } from './components/LandingPage';
import './styles/globals.css';

// Root = nur Landingpage (Silicon-Valley-Marketing). App = /app/ (eigene index.html).
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
