import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Dish {
  id: string;
  name: string;
  image: string;
  lastDate: string;
  lastPrice: string;
  totalRevenue: string;
}

// Mittagio Provider-Design: #F8F7F2 (BG), #FFDE00 (Akzent). Apple-Alternative: #F5F5F7, #007AFF.

// --- Mock Data ---
const DISHES: Dish[] = [
  { id: '1', name: 'Zwiebelrostbraten', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=500', lastDate: '12. Feb', lastPrice: '14,50 €', totalRevenue: '3.480 €' },
  { id: '2', name: 'Linseneintopf', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500', lastDate: '10. Feb', lastPrice: '7,90 €', totalRevenue: '1.120 €' },
  { id: '3', name: 'Leberkäseweckle', image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=500', lastDate: '11. Feb', lastPrice: '3,50 €', totalRevenue: '2.450 €' },
];

const WEEK_DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

interface KochbuchProps {
  /** Verknüpfung mit Inseratsflow: wird beim Klick auf AUSWÄHLEN mit { dishId, dish } aufgerufen. In der Vanilla-App: startListingFlow({ dishId }) */
  onInserieren?: (payload: { dishId: string; dish: Dish }) => void;
}

export const Kochbuch: React.FC<KochbuchProps> = ({ onInserieren }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedDish = DISHES.find(d => d.id === selectedId);

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  const handleAction = (type: 'inserieren' | 'wochenplan') => {
    if (type === 'inserieren') {
      if (selectedDish && onInserieren) {
        onInserieren({ dishId: selectedDish.id, dish: selectedDish });
      } else if (selectedDish && typeof (window as unknown as { startListingFlow?: (opts: { dishId: string }) => void }).startListingFlow === 'function') {
        (window as unknown as { startListingFlow: (opts: { dishId: string }) => void }).startListingFlow({ dishId: selectedDish.id });
      }
      return;
    }
    triggerHaptic([10, 30, 10]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedId(null);
      setShowWeekPicker(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] p-4 pb-32 font-sans antialiased">
      <header className="mb-8 mt-4 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">Mein Kochbuch</h1>
        <p className="text-[#86868B] text-sm mt-1 font-medium">Deine Umsatz-Könige</p>
      </header>

      {/* Bestseller Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar">
        {DISHES.map(dish => (
          <motion.div
            key={`best-${dish.id}`}
            whileTap={{ scale: 0.96 }}
            className="min-w-[160px] snap-center bg-white rounded-[24px] p-3 shadow-sm border border-black/5"
          >
            <img src={dish.image} className="w-full h-24 object-cover rounded-[18px] mb-2" alt={dish.name} />
            <p className="font-bold text-xs truncate text-[#1D1D1F]">{dish.name}</p>
            <p className="text-[#1D1D1F] font-bold text-sm">{dish.totalRevenue}</p>
          </motion.div>
        ))}
      </div>

      {/* Main List */}
      <div className="space-y-4 mt-4">
        {DISHES.map(dish => (
          <motion.div
            key={dish.id}
            onClick={() => {
              setSelectedId(dish.id);
              triggerHaptic(10);
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            className={`relative bg-white rounded-[24px] overflow-hidden transition-all duration-300 border-2 cursor-pointer
              ${selectedId === dish.id ? 'border-[#FFDE00] shadow-xl' : 'border-transparent shadow-sm border-black/5'}`}
          >
            <img src={dish.image} className="w-full h-48 object-cover" alt={dish.name} />
            <div className="p-5">
              <h2 className="text-lg font-bold text-[#1D1D1F]">{dish.name}</h2>
              <p className="text-[#86868B] text-sm mt-1 font-medium">
                {dish.lastDate} • {dish.lastPrice} • {dish.totalRevenue}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sticky Bottom Action Bar */}
      <AnimatePresence>
        {selectedId && !showWeekPicker && (
          <motion.div
            initial={{ translateY: 100 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 100 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed bottom-6 left-4 right-4 bg-white/80 backdrop-blur-xl rounded-[24px] p-4 shadow-2xl flex items-center justify-between gap-3 border border-white/20"
          >
            <button type="button" className="flex-1 py-4 font-bold text-sm text-[#1D1D1F]" onClick={() => console.log('Edit')}>Bearbeiten</button>
            <button type="button" className="flex-1 py-4 font-bold text-sm text-[#1D1D1F]" onClick={() => setShowWeekPicker(true)}>📅 Wochenplan</button>
            <button
              type="button"
              className="flex-[1.5] py-4 bg-[#FFDE00] text-[#1a1a1a] rounded-[18px] font-bold text-sm shadow-lg active:scale-95 transition-transform"
              onClick={() => handleAction('inserieren')}
            >
              Auswählen
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Week Picker Overlay – Overshoot (stiffness: 400, damping: 28), Buttons hüpfen (y: 10 → 0) */}
      <AnimatePresence>
        {showWeekPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-end"
            onClick={() => setShowWeekPicker(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white rounded-t-[28px] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              <p className="text-sm font-bold text-[#86868B] mb-4">In den Wochenplan</p>
              <div className="grid grid-cols-4 gap-3">
                {WEEK_DAYS.map((day, i) => (
                  <motion.button
                    key={day}
                    type="button"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 28 }}
                    className="py-4 rounded-2xl font-bold text-sm bg-[#F8F7F2] text-[#1D1D1F] border border-black/5 active:scale-95"
                    onClick={() => handleAction('wochenplan')}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="bg-white rounded-full p-6 border-2 border-[#FFDE00] shadow-xl"
            >
              <span className="text-4xl">✓</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Kochbuch;
