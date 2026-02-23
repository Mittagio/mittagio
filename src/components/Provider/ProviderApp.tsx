import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Kochbuch } from './Kochbuch';
import { MagazinKochbuch } from './MagazinKochbuch';
import { Wochenplan } from './Wochenplan';
import { InseratsauswahlBottomSheet } from './Inseratsauswahl';

type ProviderView = 'kochbuch' | 'magazin' | 'wochenplan';

/**
 * Einstieg Anbieter-Bereich: Kochbuch, Magazin-Kochbuch und Wochenplan mit Tab-Umschaltung.
 * Inseratflow (UniversalFlow) öffnet sich nur beim Klick auf Hinzufügen/Neues Gericht – kein eigener Tab.
 * FAB „+“ öffnet Inseratsauswahl-BottomSheet (z-[70]), TabBar wird beim Öffnen überlagert.
 */
export const ProviderApp: React.FC = () => {
  const [view, setView] = useState<ProviderView>('kochbuch');
  const [inseratsauswahlOpen, setInseratsauswahlOpen] = useState(false);

  /* body overflow: hidden wenn Sheet offen – verhindert Scroll-Chaining */
  useEffect(() => {
    if (inseratsauswahlOpen) {
      document.body.classList.add('inseratsauswahl-sheet-open');
    } else {
      document.body.classList.remove('inseratsauswahl-sheet-open');
    }
    return () => document.body.classList.remove('inseratsauswahl-sheet-open');
  }, [inseratsauswahlOpen]);

  const handleNeuesGericht = () => {
    if (typeof (window as unknown as { startListingFlow?: (opts: object) => void }).startListingFlow === 'function') {
      (window as unknown as { startListingFlow: (opts: object) => void }).startListingFlow({});
    }
  };

  const handleResumeDraft = () => {
    if (typeof (window as unknown as { startListingFlow?: (opts: object) => void }).startListingFlow === 'function') {
      (window as unknown as { startListingFlow: (opts: object) => void }).startListingFlow({ draftRestore: true });
    }
  };

  const handleRennerSelect = (payload: { dishId: string; dish: { id: string; name: string }; price?: number }) => {
    if (typeof (window as unknown as { startListingFlow?: (opts: object) => void }).startListingFlow === 'function') {
      (window as unknown as { startListingFlow: (opts: object) => void }).startListingFlow({
        dishId: payload.dishId,
        price: payload.price,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] relative">
      {/* Tab-Leiste: Kochbuch | Magazin | Wochenplan (z-50) – wird von Sheet (z-[70]) überlagert */}
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
            if (typeof (window as unknown as { startListingFlow?: (opts: { dishId: string }) => void }).startListingFlow === 'function') {
              (window as unknown as { startListingFlow: (opts: { dishId: string }) => void }).startListingFlow({ dishId });
            }
          }}
        />
      )}
      {view === 'magazin' && <MagazinKochbuch />}
      {view === 'wochenplan' && <Wochenplan />}

      {/* FAB / TabBar-Plus: Öffnet Inseratsauswahl – z-40 unter Sheet (z-[70]) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-xl rounded-full py-2 px-4 shadow-xl border border-black/5">
          <button
            type="button"
            onClick={() => setInseratsauswahlOpen(true)}
            className="w-14 h-14 rounded-full bg-[#FFDE00] text-[#1a1a1a] flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#FFDE00]/30 active:scale-95 transition-transform"
            aria-label="Gericht hinzufügen / Inseratsauswahl"
          >
            +
          </button>
          <span className="text-sm font-bold text-[#1D1D1F] pr-2">Gericht hinzufügen</span>
        </div>
      </div>

      {/* Inseratsauswahl BottomSheet – z-[70] über TabBar/FAB, Slide-up Animation */}
      <AnimatePresence>
        {inseratsauswahlOpen && (
          <InseratsauswahlBottomSheet
            isOpen={inseratsauswahlOpen}
            onClose={() => setInseratsauswahlOpen(false)}
            onNeuesGericht={handleNeuesGericht}
            onResumeDraft={handleResumeDraft}
            onRennerSelect={handleRennerSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderApp;
