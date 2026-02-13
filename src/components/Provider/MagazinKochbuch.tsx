import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MASTER-SPEC: PROVIDER MAGAZIN-KOCHBUCH
 * - Design: Minimalist High-End (Mittagio: #F8F7F2, #FFDE00)
 * - Navigation: Kategorie-Pills & Horizontal Flip
 * - Deep Dive: Profilkarten-Editierung mit Echtzeit-Sync
 * - Haptik: Spring-Animationen & Vibrations-Feedback
 * - 3 Säulen: Vor Ort (🍴), Abholnummer (🧾), Mehrweg (🔄) – nur „Abholnummer“
 */

interface Dish {
  id: string;
  name: string;
  category: string;
  image: string;
  lastDate: string;
  lastPrice: string;
  totalRevenue: string;
  allergens: string[];
  features: { vorOrt: boolean; abholnummer: boolean; mehrweg: boolean };
}

const CATEGORIES = ['Alle', 'Fleisch', 'Eintopf', 'Snack', 'Vegetarisch'];

const INITIAL_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Zwiebelrostbraten',
    category: 'Fleisch',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800',
    lastDate: '12. Feb',
    lastPrice: '14,50 €',
    totalRevenue: '3.480 €',
    allergens: ['A', 'C', 'G'],
    features: { vorOrt: true, abholnummer: true, mehrweg: false },
  },
  {
    id: '2',
    name: 'Linseneintopf',
    category: 'Eintopf',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800',
    lastDate: '10. Feb',
    lastPrice: '7,90 €',
    totalRevenue: '1.120 €',
    allergens: ['I', 'J'],
    features: { vorOrt: true, abholnummer: false, mehrweg: true },
  },
];

export const MagazinKochbuch: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
  const [activeTab, setActiveTab] = useState('Alle');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredDishes = useMemo(
    () => dishes.filter((d) => activeTab === 'Alle' || d.category === activeTab),
    [dishes, activeTab]
  );

  const currentDish = filteredDishes[activeIndex];

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  const updateCurrentDish = (updates: Partial<Dish>) => {
    if (!currentDish) return;
    setDishes((prev) => prev.map((d) => (d.id === currentDish.id ? { ...d, ...updates } : d)));
    triggerHaptic(5);
  };

  const handleSave = () => {
    triggerHaptic([10, 30, 10]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsEditing(false);
    }, 1500);
  };

  if (filteredDishes.length === 0) {
    return (
      <div className="fixed inset-0 bg-[#F8F7F2] flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 mx-auto text-4xl">
            📖
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Dein Erfolgstagebuch ist noch leer.</h2>
          <p className="text-[#86868B] mb-8 max-w-xs mx-auto text-sm">
            Inseriere dein erstes Gericht und wir füllen dein Kochbuch automatisch mit Bestsellern.
          </p>
          <button
            type="button"
            className="w-full py-4 bg-[#FFDE00] text-[#1a1a1a] rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            Jetzt erstes Gericht inserieren
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#F8F7F2] flex flex-col overflow-hidden antialiased select-none">
      {/* 1. Pill Navigation (Top) */}
      {!isEditing && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pt-12 pb-6 px-4 z-20"
        >
          <h1 className="text-2xl font-bold text-[#1D1D1F] mb-4 ml-2">Mein Kochbuch</h1>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveTab(cat);
                  setActiveIndex(0);
                  triggerHaptic(5);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat
                    ? 'bg-[#FFDE00] text-[#1a1a1a] shadow-md'
                    : 'bg-white text-[#86868B] border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Magazin (Horizontal Flip) */}
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isEditing && currentDish ? (
            <motion.div
              key={currentDish.id}
              layoutId={`card-${currentDish.id}`}
              initial={{ x: 300, opacity: 0, rotateY: 15 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              exit={{ x: -300, opacity: 0, rotateY: -15 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100 && activeIndex < filteredDishes.length - 1)
                  setActiveIndex((i) => i + 1);
                else if (info.offset.x > 100 && activeIndex > 0) setActiveIndex((i) => i - 1);
                triggerHaptic(10);
              }}
              onClick={() => {
                setIsEditing(true);
                triggerHaptic(10);
              }}
              className="w-[88%] h-[75%] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col cursor-pointer"
            >
              <img
                src={currentDish.image}
                className="h-[55%] w-full object-cover"
                alt={currentDish.name}
              />
              <div className="p-8 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1D1D1F] leading-tight mb-2">
                    {currentDish.name}
                  </h2>
                  <div className="h-px w-12 bg-[#FFDE00] mx-auto mb-4" />
                  <p className="text-[#86868B] text-lg font-medium">
                    {currentDish.lastDate} • {currentDish.lastPrice}
                  </p>
                </div>
                <div className="bg-[#F8F7F2] rounded-2xl py-3 px-6 mx-auto text-[#1a1a1a] font-bold text-sm tracking-widest">
                  Gesamtumsatz: {currentDish.totalRevenue}
                </div>
              </div>
            </motion.div>
          ) : currentDish ? (
            /* 3. Deep-Dive Profilkarte (Edit-Modus) */
            <motion.div
              layoutId={`card-${currentDish.id}`}
              className="fixed inset-0 z-50 bg-white flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-sm font-bold text-[#86868B]"
                >
                  Abbrechen
                </button>
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#1D1D1F]">
                  Profilkarte
                </h3>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-[#FFDE00] text-[#1a1a1a] font-bold"
                >
                  Speichern
                </button>
              </div>

              <div className="relative h-56 rounded-[24px] overflow-hidden mb-8 shadow-xl">
                <img
                  src={currentDish.image}
                  className="w-full h-full object-cover"
                  alt={currentDish.name}
                />
                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg text-[10px] font-bold text-[#1a1a1a]">
                  📷 Bild ändern
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8F7F2] p-4 rounded-2xl text-center">
                    <p className="text-[9px] text-[#86868B] uppercase font-black">Umsatz</p>
                    <p className="text-xl font-bold text-[#1D1D1F]">{currentDish.totalRevenue}</p>
                  </div>
                  <div className="bg-[#F8F7F2] p-4 rounded-2xl text-center">
                    <p className="text-[9px] text-[#86868B] uppercase font-black">Verkäufe</p>
                    <p className="text-xl font-bold text-[#1D1D1F]">240×</p>
                  </div>
                </div>

                {/* 3 Säulen: Vor Ort, Abholnummer, Mehrweg */}
                <div>
                  <p className="text-xs font-bold mb-3 text-[#86868B] uppercase tracking-widest">
                    Prozess-Icons
                  </p>
                  <div className="flex gap-4">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        updateCurrentDish({
                          features: { ...currentDish.features, vorOrt: !currentDish.features.vorOrt },
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        updateCurrentDish({
                          features: { ...currentDish.features, vorOrt: !currentDish.features.vorOrt },
                        })
                      }
                      className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${
                        currentDish.features.vorOrt
                          ? 'bg-[#FFDE00]/20 border-[#FFDE00] opacity-100'
                          : 'bg-[#f1f3f5] border-transparent opacity-40'
                      }`}
                    >
                      <span className="text-2xl mb-1">🍴</span>
                      <span className="text-[8px] font-bold">Vor Ort</span>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        updateCurrentDish({
                          features: {
                            ...currentDish.features,
                            abholnummer: !currentDish.features.abholnummer,
                          },
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        updateCurrentDish({
                          features: {
                            ...currentDish.features,
                            abholnummer: !currentDish.features.abholnummer,
                          },
                        })
                      }
                      className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${
                        currentDish.features.abholnummer
                          ? 'bg-[#FFDE00]/20 border-[#FFDE00] opacity-100'
                          : 'bg-[#f1f3f5] border-transparent opacity-40'
                      }`}
                    >
                      <span className="text-2xl mb-1">🧾</span>
                      <span className="text-[8px] font-bold uppercase tracking-tight">
                        Abholnummer
                      </span>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        updateCurrentDish({
                          features: { ...currentDish.features, mehrweg: !currentDish.features.mehrweg },
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        updateCurrentDish({
                          features: {
                            ...currentDish.features,
                            mehrweg: !currentDish.features.mehrweg,
                          },
                        })
                      }
                      className={`flex-1 flex flex-col items-center p-4 rounded-2xl border transition-all ${
                        currentDish.features.mehrweg
                          ? 'bg-[#FFDE00]/20 border-[#FFDE00] opacity-100'
                          : 'bg-[#f1f3f5] border-transparent opacity-40'
                      }`}
                    >
                      <span className="text-2xl mb-1">🔄</span>
                      <span className="text-[8px] font-bold uppercase tracking-tight">Mehrweg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold mb-3 text-[#86868B] uppercase tracking-widest">
                    Allergene (A–N)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['A', 'C', 'G', 'I', 'J', 'K', 'L'].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => {
                          const newAller = currentDish.allergens.includes(k)
                            ? currentDish.allergens.filter((a) => a !== k)
                            : [...currentDish.allergens, k];
                          updateCurrentDish({ allergens: newAller });
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                          currentDish.allergens.includes(k)
                            ? 'bg-[#1D1D1F] text-white'
                            : 'bg-[#f1f3f5] text-[#86868B]'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Action Bar */}
      {!isEditing && currentDish && (
        <div className="h-32 px-6 flex items-center z-30">
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="w-full bg-white/80 backdrop-blur-xl rounded-[28px] p-3 shadow-2xl flex items-center justify-between gap-3 border border-white/20"
          >
            <button
              type="button"
              className="flex-1 py-4 text-[10px] font-black tracking-widest text-[#1D1D1F]"
              onClick={() => {
                setIsEditing(true);
                triggerHaptic(10);
              }}
            >
              Bearbeiten
            </button>
            <button type="button" className="flex-1 py-4 text-[10px] font-black tracking-widest text-[#1D1D1F]">
              Wochenplan
            </button>
            <button
              type="button"
              onClick={() => triggerHaptic([10, 30, 10])}
              className="flex-[1.8] py-4 bg-[#FFDE00] text-[#1a1a1a] rounded-[20px] font-black text-[10px] tracking-[0.15em] shadow-lg active:scale-95 transition-transform"
            >
              Auswählen
            </button>
          </motion.div>
        </div>
      )}

      {/* Victory Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-2xl p-12 rounded-[48px] shadow-2xl flex flex-col items-center">
              <div className="w-20 h-20 bg-[#FFDE00] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#FFDE00]/30">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-black text-xl tracking-tighter uppercase text-[#1D1D1F]">
                Gespeichert!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagazinKochbuch;
