import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickEditNumPadProps {
  dishName: string;
  initialPrice: string;
  onConfirm: (price: number) => void;
  onClose: () => void;
}

const NUMPAD_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',', '⌫'];

export const QuickEditNumPad: React.FC<QuickEditNumPadProps> = ({
  dishName,
  initialPrice,
  onConfirm,
  onClose,
}) => {
  const [value, setValue] = useState(initialPrice.replace('.', ','));

  const handleKey = (key: string) => {
    if (typeof window?.navigator?.vibrate === 'function') window.navigator.vibrate(10);
    if (key === '⌫') {
      setValue((v) => {
        const next = v.slice(0, -1);
        return next === '' || next === '-' ? '0' : next;
      });
      return;
    }
    if (key === ',') {
      if (!value.includes(',')) setValue((v) => (v === '0' ? '0,' : v + ','));
      return;
    }
    if (key === '0' && value === '0') return;
    if (value === '0' && key !== ',') {
      setValue(key);
      return;
    }
    setValue((v) => v + key);
  };

  const parsePrice = (s: string): number => {
    const cleaned = s.replace(',', '.');
    return parseFloat(cleaned) || 0;
  };

  const handleConfirm = () => {
    if (typeof window?.navigator?.vibrate === 'function') window.navigator.vibrate([10, 30, 10]);
    onConfirm(parsePrice(value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl border border-black/5 shadow-xl p-4"
    >
      <p className="text-sm font-semibold text-[#86868B] mb-2 truncate max-w-full">{dishName}</p>
      <p className="text-3xl font-bold text-[#1D1D1F] tracking-tight mb-4 min-h-[2.5rem]">
        {value || '0'} €
      </p>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
        {NUMPAD_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => handleKey(key)}
            className="h-12 rounded-xl bg-[#F8F7F2] border border-black/5 font-bold text-[#1D1D1F] active:scale-95 transition-transform"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-4 w-full max-w-[200px]">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-xl border-2 border-black/10 font-bold text-[#86868B]"
        >
          Abbrechen
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="flex-1 py-3 rounded-xl bg-[#FFDE00] text-[#1a1a1a] font-bold shadow-lg active:scale-95"
        >
          Übernehmen
        </button>
      </div>
    </motion.div>
  );
};
