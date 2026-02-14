import React, { useState } from 'react';
import { Kochbuch } from './Kochbuch';
import { MagazinKochbuch } from './MagazinKochbuch';
import { Wochenplan } from './Wochenplan';

type ProviderView = 'kochbuch' | 'magazin' | 'wochenplan';

/**
 * Einstieg Anbieter-Bereich: Kochbuch, Magazin-Kochbuch und Wochenplan mit Tab-Umschaltung.
 * Inseratflow (UniversalFlow) öffnet sich nur beim Klick auf Hinzufügen/Neues Gericht – kein eigener Tab.
 */
export const ProviderApp: React.FC = () => {
  const [view, setView] = useState<ProviderView>('kochbuch');

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      {/* Tab-Leiste: Kochbuch | Magazin | Wochenplan (z-50 damit über Magazin-Fullscreen) */}
      <nav className="sticky top-0 z-50 flex bg-white/90 backdrop-blur-md border-b border-black/5">
        <button
          type="button"
          onClick={() => setView('kochbuch')}
          className={`flex-1 py-4 font-bold text-sm transition-colors ${
            view === 'kochbuch'
              ? 'text-[#1a1a1a] border-b-2 border-[#FFDE00] bg-[#FFDE00]/10'
              : 'text-[#86868B] hover:text-[#1a1a1a]'
          }`}
        >
          Kochbuch
        </button>
        <button
          type="button"
          onClick={() => setView('magazin')}
          className={`flex-1 py-4 font-bold text-sm transition-colors ${
            view === 'magazin'
              ? 'text-[#1a1a1a] border-b-2 border-[#FFDE00] bg-[#FFDE00]/10'
              : 'text-[#86868B] hover:text-[#1a1a1a]'
          }`}
        >
          Magazin
        </button>
        <button
          type="button"
          onClick={() => setView('wochenplan')}
          className={`flex-1 py-4 font-bold text-sm transition-colors ${
            view === 'wochenplan'
              ? 'text-[#1a1a1a] border-b-2 border-[#FFDE00] bg-[#FFDE00]/10'
              : 'text-[#86868B] hover:text-[#1a1a1a]'
          }`}
        >
          Wochenplan
        </button>
      </nav>

      {view === 'kochbuch' && (
        <Kochbuch
          onInserieren={({ dishId, dish }) => {
            console.log('Inseratsflow starten:', dishId, dish);
            if (typeof (window as unknown as { startListingFlow?: (opts: { dishId: string }) => void }).startListingFlow === 'function') {
              (window as unknown as { startListingFlow: (opts: { dishId: string }) => void }).startListingFlow({ dishId });
            }
          }}
        />
      )}
      {view === 'magazin' && <MagazinKochbuch />}
      {view === 'wochenplan' && <Wochenplan />}
    </div>
  );
};

export default ProviderApp;
