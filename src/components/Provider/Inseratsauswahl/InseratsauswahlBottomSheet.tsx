import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dish } from '../Kochbuch';
import { DISHES } from '../Kochbuch';
import { getDraft, hasDraft } from '../../services/draftService';
import { QuickEditNumPad } from './QuickEditNumPad';

interface InseratsauswahlBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNeuesGericht: () => void;
  onResumeDraft: () => void;
  onRennerSelect: (payload: { dishId: string; dish: Dish; price?: number }) => void;
}

/** Renner = Top-Gerichte aus dem Kochbuch (DISHES) */
const RENNER: Dish[] = DISHES;

export const InseratsauswahlBottomSheet: React.FC<InseratsauswahlBottomSheetProps> = ({
  isOpen,
  onClose,
  onNeuesGericht,
  onResumeDraft,
  onRennerSelect,
}) => {
  const [draftExists, setDraftExists] = useState(false);
  const [quickEditTarget, setQuickEditTarget] = useState<{ dish: Dish } | null>(null);

  useEffect(() => {
    setDraftExists(hasDraft());
  }, [isOpen]);

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof window?.navigator?.vibrate === 'function') {
      window.navigator.vibrate(pattern);
    }
  };

  const handleDraftResume = () => {
    triggerHaptic([10, 30, 10]);
    onResumeDraft();
    onClose();
  };

  const handleNeuesGericht = () => {
    triggerHaptic([10, 30, 10]);
    onNeuesGericht();
    onClose();
  };

  const handleRennerSelect = (dish: Dish) => {
    triggerHaptic(10);
    onRennerSelect({ dishId: dish.id, dish });
    onClose();
  };

  const handleQuickEditConfirm = (dish: Dish, price: number) => {
    triggerHaptic([10, 30, 10]);
    setQuickEditTarget(null);
    onRennerSelect({ dishId: dish.id, dish, price });
    onClose();
  };

  if (!isOpen) return null;

  const draft = getDraft();

  return (
    <>
      {/* Backdrop – z-index über TabBar (TabBar z-50, Sheet z-[60]) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet – Full-Overlay, TabBar komplett verdecken */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed inset-x-0 bottom-0 z-[70] bg-white rounded-t-[28px] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-black/15 rounded-full mx-auto mt-2 flex-shrink-0" />

        {/* Header */}
        <div className="px-4 pt-2 pb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1D1D1F]">Inseratsauswahl</h2>
          <p className="text-sm text-[#86868B] mt-1">Deine Renner oder neues Gericht</p>
        </div>

        {/* Scrollbarer Body – flex-grow overflow-y-auto */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 -webkit-overflow-scrolling-touch inseratsauswahl-scroll">
          {/* Draft-Slot */}
          <AnimatePresence>
            {draftExists && draft && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                type="button"
                onClick={handleDraftResume}
                className="w-full text-left mb-4 p-4 rounded-2xl bg-[#FFDE00]/15 border border-[#FFDE00]/30 hover:bg-[#FFDE00]/25 transition-colors"
              >
                <p className="text-sm font-semibold text-[#86868B]">Weiter mit</p>
                <p className="text-lg font-bold text-[#1D1D1F] mt-1">
                  {draft.name || 'Unbenannt'}
                </p>
                {draft.price > 0 && (
                  <p className="text-sm font-semibold text-[#86868B] mt-1">
                    {draft.price.toFixed(2).replace('.', ',')} €
                  </p>
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Renner-Grid – 2 Spalten, keine 3 Säulen */}
          <p className="text-sm font-bold text-[#86868B] uppercase tracking-wider mb-3">
            Deine Renner
          </p>
          <div className="grid grid-cols-2 gap-3 pb-4">
            {RENNER.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#f1f3f5] group"
              >
                <img
                  src={dish.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-white/90 text-sm font-bold text-[#1D1D1F]">
                  {dish.lastPrice}
                </div>
                <p className="absolute bottom-3 left-3 right-3 font-bold text-white truncate [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                  {dish.name}
                </p>

                {/* Quick-Edit Stift-Icon – z-20 damit über dem Tap-Bereich */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic(10);
                    setQuickEditTarget({ dish });
                  }}
                  className="absolute top-2 left-2 z-20 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"
                  aria-label="Preis bearbeiten"
                >
                  <span className="text-base">✎</span>
                </button>

                {/* Quick-Edit NumPad Overlay */}
                <AnimatePresence>
                  {quickEditTarget?.dish.id === dish.id && (
                    <QuickEditNumPad
                      dishName={dish.name}
                      initialPrice={
                        (dish.lastPrice ?? '')
                          .replace(/\s*€\s*/g, '')
                          .trim()
                          .replace('.', ',') || '0'
                      }
                      onConfirm={(price) => handleQuickEditConfirm(dish, price)}
                      onClose={() => setQuickEditTarget(null)}
                    />
                  )}
                </AnimatePresence>

                {/* Tap = Auswählen (ohne Quick-Edit) */}
                <button
                  type="button"
                  onClick={() => handleRennerSelect(dish)}
                  className="absolute inset-0"
                  aria-label={`${dish.name} auswählen`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fixierter Airbnb-Footer – + Neues Gericht erstellen */}
        <div className="flex-shrink-0 p-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-black/5">
          <button
            type="button"
            onClick={handleNeuesGericht}
            className="w-full py-4 rounded-2xl bg-[#FFDE00] text-[#1a1a1a] font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
          >
            + Neues Gericht erstellen
          </button>
        </div>
      </motion.div>
    </>
  );
};
