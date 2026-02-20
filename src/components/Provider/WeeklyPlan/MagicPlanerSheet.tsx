import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dish } from '../Kochbuch';
import { TAGE, SLOT_LABELS, type SeasonSet } from './useWeeklyPlan';
import styles from './Wochenplan.module.css';

const SAISON_LABELS: Record<SeasonSet, string> = {
  winter: '❄️ Winter',
  sommer: '☀️ Sommer',
  fruhling: '🌸 Frühling',
  herbst: '🍂 Herbst',
};

export interface MagicPlanerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  pickerTarget: { day: number; slot: number } | null;
  onSelectDish: (dish: Dish) => void;
  /** Magic-Modus: Lotto & Saison */
  onLotto: () => void;
  onSaisonSet: (set: SeasonSet) => void;
}

/** Airbnb-Style Bottom-Sheet: 3 Kacheln oder Dish-Picker */
export const MagicPlanerSheet: React.FC<MagicPlanerSheetProps> = ({
  isOpen,
  onClose,
  dishes,
  pickerTarget,
  onSelectDish,
  onLotto,
  onSaisonSet,
}) => {
  const [showSaisonSub, setShowSaisonSub] = useState(false);
  const isMagicMode = pickerTarget === null;

  useEffect(() => {
    if (!isOpen) setShowSaisonSub(false);
  }, [isOpen]);

  const handleLotto = () => {
    onLotto();
    onClose();
  };

  const handleSaison = (set?: SeasonSet) => {
    if (set) {
      onSaisonSet(set);
      setShowSaisonSub(false);
      onClose();
    } else {
      setShowSaisonSub(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] max-h-[75vh] flex flex-col ${styles.sheetGlass}`}
          >
            <div className="pt-3 pb-2 px-4">
              <div className={styles.sheetHandle} aria-hidden />
            </div>

            <AnimatePresence mode="wait">
              {showSaisonSub && isMagicMode ? (
                <motion.div
                  key="saison"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 pb-3">
                    <button
                      type="button"
                      onClick={() => setShowSaisonSub(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full text-[#64748b] hover:bg-black/5"
                      aria-label="Zurück"
                    >
                      ←
                    </button>
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Saison-Sets wählen</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {(Object.keys(SAISON_LABELS) as SeasonSet[]).map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSaison(s)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#F8F7F2] border border-black/5 hover:bg-[#FFDE00]/15 hover:border-[#FFDE00]/30 transition-colors text-left"
                      >
                        <span className="text-2xl">{SAISON_LABELS[s].split(' ')[0]}</span>
                        <span className="font-bold text-[#1D1D1F]">{SAISON_LABELS[s]}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : isMagicMode ? (
                <motion.div
                  key="magic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="p-4 pb-2 border-b border-black/5">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">Magic-Planer</h3>
                    <p className="text-sm text-[#86868B] mt-1">Woche blitzschnell planen</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLotto}
                      className="w-full flex items-center gap-5 p-5 rounded-[24px] bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-colors text-left"
                    >
                      <span className="text-4xl">🎲</span>
                      <div>
                        <p className="font-bold text-lg text-[#1D1D1F]">Lotto-Woche</p>
                        <p className="text-sm text-[#64748b] mt-0.5">15 zufällige Gerichte · Mo–Fr</p>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSaison()}
                      className="w-full flex items-center gap-5 p-5 rounded-[24px] bg-gradient-to-br from-sky-500/20 to-sky-600/10 border-2 border-sky-500/30 hover:border-sky-500/50 transition-colors text-left"
                    >
                      <span className="text-4xl">🌦️</span>
                      <div>
                        <p className="font-bold text-lg text-[#1D1D1F]">Saison-Sets</p>
                        <p className="text-sm text-[#64748b] mt-0.5">Winter, Sommer, Frühling, Herbst</p>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-5 p-5 rounded-[24px] bg-gradient-to-br from-amber-500/15 to-amber-600/5 border-2 border-amber-500/20 opacity-70 cursor-not-allowed text-left"
                      disabled
                    >
                      <span className="text-4xl">📋</span>
                      <div>
                        <p className="font-bold text-lg text-[#1D1D1F]">Geführte Planung</p>
                        <p className="text-sm text-[#64748b] mt-0.5">Demnächst verfügbar</p>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="dish"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  <div className="p-4 pb-2 border-b border-black/5">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">
                      Gericht wählen · {TAGE[pickerTarget!.day]} {SLOT_LABELS[pickerTarget!.slot]}
                    </h3>
                    <p className="text-sm text-[#86868B] mt-1">
                      Tipp: Leeren Slot antippen, um hier zu landen.
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                    {dishes.map((dish) => (
                      <motion.button
                        key={dish.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectDish(dish)}
                        className="w-full flex gap-4 items-center p-4 rounded-2xl bg-[#F8F7F2] border border-black/5 hover:bg-[#FFDE00]/15 hover:border-[#FFDE00]/30 transition-colors text-left"
                      >
                        <img
                          src={dish.image}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#1D1D1F] truncate">{dish.name}</p>
                          <p className="text-sm text-[#86868B]">{dish.lastPrice}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MagicPlanerSheet;
