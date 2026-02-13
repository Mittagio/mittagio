import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProviderApp } from './components/Provider/ProviderApp';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderApp />
  </React.StrictMode>
);
