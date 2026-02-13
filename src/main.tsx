import React from 'react';
import ReactDOM from 'react-dom/client';
import { Kochbuch } from './components/Provider/Kochbuch';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Kochbuch
      onInserieren={({ dishId, dish }) => {
        console.log('Inseratsflow starten:', dishId, dish);
        if (typeof (window as unknown as { startListingFlow?: (opts: { dishId: string }) => void }).startListingFlow === 'function') {
          (window as unknown as { startListingFlow: (opts: { dishId: string }) => void }).startListingFlow({ dishId });
        }
      }}
    />
  </React.StrictMode>
);
