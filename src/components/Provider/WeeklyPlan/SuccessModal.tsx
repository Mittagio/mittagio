import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WeekPlan } from './useWeeklyPlan';
import { downloadCalendarIcs } from './useCalendarSync';
import styles from './Wochenplan.module.css';

/** Parst Preise wie "14,50 €" zu 14.5 */
function parsePrice(s: string): number {
  const cleaned = s.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

/** Berechnet Gesamtsumme und Verteilung aus weekPlan (Mo–Fr, Slots 0–2) */
export function computeSuccessStats(weekPlan: WeekPlan) {
  let totalEarnings = 0;
  const distribution = { vegan: 0, vegetarisch: 0, fleisch: 0 };

  for (let day = 0; day < 5; day++) {
    for (let slot = 0; slot < 3; slot++) {
      const entry = weekPlan[day][slot];
      if (entry) {
        totalEarnings += parsePrice(entry.dish.lastPrice);
        if (slot === 0) distribution.vegan++;
        else if (slot === 1) distribution.vegetarisch++;
        else distribution.fleisch++;
      }
    }
  }

  const totalDishes = distribution.vegan + distribution.vegetarisch + distribution.fleisch;
  return {
    totalDishes,
    totalEarnings: totalEarnings.toFixed(2).replace('.', ',') + ' €',
    distribution,
  };
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekPlan: WeekPlan;
  aktiveKW: number;
  /** Öffnet Team-Ansicht und triggert Screenshot-Export (WhatsApp etc.) */
  onShareTeamPreview: () => void;
  onBackToOverview: () => void;
  onHaptic?: (pattern?: number | number[]) => void;
}

/**
 * Success-Modal nach Aktivierung [cite: 2026-02-18]
 * Zusammenfassung, Team-Vorschau teilen, Billing-Info
 */
export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  weekPlan,
  aktiveKW,
  onShareTeamPreview,
  onBackToOverview,
  onHaptic,
}) => {
  const [calendarAdded, setCalendarAdded] = useState(false);
  const stats = computeSuccessStats(weekPlan);

  const handleCalendarSync = () => {
    onHaptic?.([10, 20, 10]);
    downloadCalendarIcs(weekPlan, aktiveKW);
    setCalendarAdded(true);
  };

  const handleShare = () => {
    onShareTeamPreview();
    onClose();
  };

  const handleBack = () => {
    onBackToOverview();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`fixed inset-x-4 bottom-4 sm:bottom-auto sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 max-w-md w-full rounded-[28px] overflow-hidden ${styles.meshBackground}`}
          >
            <div className="relative bg-[#F8F7F2]/98 backdrop-blur-xl p-6 pt-8 pb-7 rounded-[28px] border border-white/50 shadow-2xl">
              {/* Dezentes Konfetti-Overlay */}
              <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[28px] ${styles.successConfetti}`} />

              {/* Check-Icon mit Puls-Animation */}
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center ${styles.successCheckPulse}`}>
                  <span className="text-4xl">✓</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#1D1D1F] text-center mb-1">
                Woche aktiviert!
              </h2>
              <p className="text-sm text-[#64748b] text-center mb-6">
                Dein Wochenplan steht
              </p>

              {/* Zusammenfassung */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#64748b]">Gerichte gesamt</span>
                  <span className="font-bold text-lg text-[#1D1D1F]">{stats.totalDishes}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#64748b]">Potenzielle Einnahmen</span>
                  <span className="font-bold text-lg text-emerald-600">{stats.totalEarnings}</span>
                </div>
                {(stats.distribution.vegan > 0 || stats.distribution.vegetarisch > 0 || stats.distribution.fleisch > 0) && (
                  <p className="text-sm text-[#64748b] pt-2 border-t border-black/5">
                    {stats.distribution.vegan > 0 && (
                      <span className="mr-3">🌱 {stats.distribution.vegan}× Vegan</span>
                    )}
                    {stats.distribution.vegetarisch > 0 && (
                      <span className="mr-3">🥬 {stats.distribution.vegetarisch}× Vegetarisch</span>
                    )}
                    {stats.distribution.fleisch > 0 && (
                      <span>🥩 {stats.distribution.fleisch}× Fleisch</span>
                    )}
                  </p>
                )}
              </div>

              {/* Action-Buttons */}
              <div className="flex flex-col gap-3 mb-5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full min-h-[52px] rounded-xl font-bold bg-[#FFDE00] text-[#1a1a1a] shadow-lg shadow-[#FFDE00]/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  📤 Team-Vorschau teilen
                </button>
                <button
                  type="button"
                  onClick={handleCalendarSync}
                  disabled={calendarAdded || stats.totalDishes === 0}
                  className={`w-full min-h-[48px] rounded-xl font-bold border-2 flex items-center justify-center gap-2 transition-colors ${
                    calendarAdded
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700'
                      : 'border-black/10 text-[#64748b] hover:bg-black/5'
                  }`}
                >
                  {calendarAdded ? '✓ In Kalender eingetragen' : '📅 In meinen Handy-Kalender eintragen'}
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full min-h-[48px] rounded-xl font-bold border-2 border-black/10 text-[#64748b] hover:bg-black/5 transition-colors"
                >
                  Zurück zur Übersicht
                </button>
              </div>

              {/* Billing-Info [cite: 2026-01-29] */}
              <p className="text-[11px] text-[#94a3b8] text-center leading-relaxed">
                Keine Sorge: Abrechnung erfolgt erst bei Live-Gang des jeweiligen Inserats.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
