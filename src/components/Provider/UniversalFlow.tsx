import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const triggerHaptic = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
};

const CATEGORIES = ['Mit Fleisch', 'Vegetarisch', 'Vegan', 'Salat'];

interface Extra {
  id: string;
  label: string;
  active: boolean;
  price: string;
}

const defaultExtras: Extra[] = [
  { id: 'salat', label: 'Beilagensalat', active: false, price: '' },
  { id: 'mayo', label: 'Mayo', active: false, price: '' },
  { id: 'brot', label: 'Brot', active: false, price: '' },
];

// Platzhalter: warmes Gastro-Küchenbild (Unsplash)
const KITCHEN_BG = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80';
const SAMPLE_DISH = 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80';

export const UniversalFlow: React.FC = () => {
  const [price, setPrice] = useState('8,50');
  const [activeCat, setActiveCat] = useState<string>('Mit Fleisch');
  const [logistics, setLogistics] = useState({ vorOrt: true, abholnummer: true, mehrweg: false });
  const [extras, setExtras] = useState<Extra[]>(defaultExtras);
  const [expandedExtraId, setExpandedExtraId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const priceNum = parseFloat(price.replace(',', '.')) || 0;
  const earnings = priceNum * 30;

  const toggleExtra = (id: string) => {
    triggerHaptic();
    setExtras((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    );
    setExpandedExtraId((prev) => (prev === id ? null : id));
  };

  const setExtraPrice = (id: string, value: string) => {
    setExtras((prev) =>
      prev.map((e) => (e.id === id ? { ...e, price: value } : e))
    );
  };

  const toggleLogistics = (key: keyof typeof logistics) => {
    triggerHaptic();
    setLogistics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToNext = (selector: string) => {
    requestAnimationFrame(() => {
      const el = containerRef.current?.querySelector(selector);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const dismissKeyboard = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  useEffect(() => {
    if (expandedExtraId) scrollToNext(`[data-extra="${expandedExtraId}"]`);
  }, [expandedExtraId]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
    >
      {/* Hintergrund: warmes Gastro-Bild, stark unscharf */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url(${KITCHEN_BG})`,
          filter: 'blur(64px)',
          transform: 'scale(1.1)',
        }}
      />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full max-w-md backdrop-blur-3xl bg-white/70 border border-white/40 shadow-glass rounded-4xl overflow-hidden z-10 my-8"
      >
        {/* 1. FOTO-HEADER (randlos) */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={SAMPLE_DISH}
            alt="Gericht"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => { triggerHaptic(); dismissKeyboard(); }}
            className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center gap-1"
          >
            <span>📷</span> Foto ändern
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* 2. NAME & BESCHREIBUNG */}
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900">Rindergulasch</h1>
            <p className="text-gray-500 font-medium mt-1">mit Spätzle und Blaukraut</p>
          </div>

          {/* 3. KATEGORIE-PILLS (haptisch, federnd) */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={() => {
                  triggerHaptic();
                  setActiveCat(cat);
                  dismissKeyboard();
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  activeCat === cat
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200/50'
                    : 'bg-white/40 text-gray-600 border border-white/50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* 4. PREIS & PROFIT */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center">
              <input
                ref={priceInputRef}
                type="text"
                inputMode="decimal"
                value={price}
                onChange={(e) => { setPrice(e.target.value); triggerHaptic(); }}
                onFocus={() => triggerHaptic()}
                onBlur={() => scrollToNext('[data-logistics]')}
                placeholder="0,00"
                className="text-6xl font-black bg-transparent border-none text-center w-48 p-0 focus:ring-0 text-gray-900 placeholder:text-gray-300 outline-none"
              />
              <span className="text-4xl font-black text-gray-400 ml-1">€</span>
            </div>
            <p className="text-emerald-600 font-black text-sm uppercase tracking-wider mt-2">
              Dein Verdienst (30×): {earnings.toFixed(2)} €
            </p>
          </div>

          {/* 5. LOGISTIK-BAR (inneres Glas-Panel) */}
          <div
            data-logistics
            className="bg-white/30 backdrop-blur-xl rounded-3xl p-4 flex justify-between items-center border border-white/50 shadow-sm"
          >
            <div className="flex gap-6 text-2xl">
              <button
                type="button"
                onClick={() => toggleLogistics('vorOrt')}
                className={logistics.vorOrt ? 'text-gray-900' : 'text-gray-400 grayscale opacity-70'}
              >
                🍴
              </button>
              <button
                type="button"
                onClick={() => toggleLogistics('abholnummer')}
                className={logistics.abholnummer ? 'text-gray-900' : 'text-gray-400 grayscale opacity-70'}
              >
                🧾
              </button>
              <button
                type="button"
                onClick={() => toggleLogistics('mehrweg')}
                className={logistics.mehrweg ? 'text-gray-900' : 'text-gray-400 grayscale opacity-70'}
              >
                🔄
              </button>
            </div>
            <div className="text-sm font-bold text-gray-600 flex items-center gap-1">
              <span>🕒</span> 11:30 – 14:00
            </div>
          </div>

          {/* 6. ALLERGENE LINK */}
          <button
            type="button"
            onClick={() => { triggerHaptic(); scrollToNext('[data-extras]'); }}
            className="w-full text-center text-xs font-bold text-gray-400 uppercase tracking-widest"
          >
            Allergene angeben ›
          </button>

          {/* 7. EXTRAS (Pills + Slide-In Preisfeld) */}
          <div data-extras className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase mr-2">Extras:</span>
              {extras.map((extra) => (
                <div key={extra.id} className="flex flex-wrap items-center gap-2 justify-center">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleExtra(extra.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      extra.active
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-700'
                        : 'bg-white/40 border border-white/50 text-gray-600'
                    }`}
                  >
                    {extra.label}
                  </motion.button>
                  <AnimatePresence>
                    {expandedExtraId === extra.id && (
                      <motion.div
                        data-extra={extra.id}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="overflow-hidden flex items-center gap-1"
                      >
                        <input
                          type="text"
                          inputMode="decimal"
                          value={extra.price}
                          onChange={(e) => setExtraPrice(extra.id, e.target.value)}
                          onFocus={() => triggerHaptic()}
                          placeholder="0,00 €"
                          className="w-20 text-sm font-bold bg-white/50 border border-white/60 rounded-lg px-2 py-1 text-gray-800 text-center outline-none focus:ring-2 ring-emerald-400"
                        />
                        <span className="text-xs font-bold text-gray-500">€</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* 8. ABSCHLUSS-BUTTONS */}
          <div className="space-y-3 pt-4">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={triggerHaptic}
              className="w-full py-5 bg-yellow-400 text-black font-black rounded-3xl shadow-xl uppercase tracking-tight text-lg hover:bg-yellow-500 transition-colors"
            >
              Jetzt für 4,99 € inserieren
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={triggerHaptic}
              className="w-full py-4 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-700 font-black rounded-3xl uppercase tracking-tight text-sm hover:bg-emerald-500/20 transition-colors"
            >
              Oder gratis mit Abholnummer (0,89 €)
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UniversalFlow;
