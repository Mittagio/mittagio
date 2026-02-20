import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DISHES } from '../Kochbuch';
import { useWeeklyPlan } from './useWeeklyPlan';
import { DishCard } from './DishCard';
import { MagicPlanerSheet } from './MagicPlanerSheet';
import { SuccessModal } from './SuccessModal';
import { useScreenshotExport } from './useScreenshotExport';
import { TAGE_MO_FR, SLOT_LABELS, type SeasonSet } from './useWeeklyPlan';
import styles from './Wochenplan.module.css';

/**
 * Elastic Canvas Layout [cite: 2026-02-18]
 * Team-Ansicht: Ultra-clean Grid (Bild & Name) für Screenshots
 * Export: html2canvas → JPEG teilen/herunterladen
 */
export const WeeklyPlan: React.FC = () => {
  const [kebabOpen, setKebabOpen] = useState(false);
  const [lottoLoading, setLottoLoading] = useState(false);
  const [lottoJustFilled, setLottoJustFilled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [teamView, setTeamView] = useState(false);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const { exportAsImage } = useScreenshotExport();

  const {
    aktiveKW,
    setAktiveKW,
    weekPlan,
    pickerOpen,
    pickerTarget,
    openSlotPicker,
    openGlobalPicker,
    closePicker,
    selectDishForSlot,
    removeSlot,
    formatPreis,
    triggerHaptic,
    dishes,
    fillLotto,
    loadSaisonSet,
    isSilentPricing,
  } = useWeeklyPlan({
    dishes: DISHES,
    rennerIds: ['1', '2'],
    lazyBillingEnabled: true,
  });

  const handleLotto = () => {
    setLottoLoading(true);
    setTimeout(() => {
      fillLotto();
      setLottoLoading(false);
      setLottoJustFilled(true);
      setTimeout(() => setLottoJustFilled(false), 1000);
      setTimeout(() => setShowSuccessModal(true), 1300);
    }, 400);
  };

  const handleExportAsImage = async () => {
    triggerHaptic([10, 20, 10]);
    await exportAsImage(screenshotRef.current);
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans text-[#1D1D1F] ${styles.meshBackground}`}>
      {/* 1. HEADER – ausgeblendet in Team-Ansicht */}
      {!teamView && (
        <header className="bg-white/75 backdrop-blur-xl border-b border-black/5 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3 min-h-[56px]">
            <h1 className="text-xl font-bold tracking-tight text-[#1D1D1F]">Wochenplan</h1>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic();
                  setKebabOpen((o) => !o);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#64748b] hover:bg-black/5 transition-colors"
                aria-label="Menü"
                aria-expanded={kebabOpen}
              >
                <span className="text-xl leading-none">⋮</span>
              </button>
              <AnimatePresence>
                {kebabOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setKebabOpen(false)}
                      aria-hidden
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-1 w-48 py-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/5 z-40"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic();
                          setTeamView(true);
                          setKebabOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[#1D1D1F] hover:bg-black/5"
                      >
                        📸 Team-Ansicht
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleLotto();
                          setKebabOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[#1D1D1F] hover:bg-black/5"
                      >
                        🎲 Lotto füllen
                      </button>
                      {(['winter', 'sommer', 'fruhling', 'herbst'] as SeasonSet[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            loadSaisonSet(s);
                            setKebabOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-semibold text-[#64748b] hover:bg-black/5"
                        >
                          {s === 'winter' ? '❄️' : s === 'sommer' ? '☀️' : s === 'fruhling' ? '🌸' : '🍂'}{' '}
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      )}

      {/* 2. ELASTIC CANVAS / SCREENSHOT-BEREICH – ref für html2canvas */}
      <main
        ref={screenshotRef}
        data-screenshot-root
        className={`flex-1 overflow-y-auto p-4 space-y-4 relative z-[1] ${
          teamView ? 'pb-24' : 'pb-[140px]'
        } ${teamView ? 'bg-[#F8F7F2]' : ''}`}
      >
        {teamView && (
          <div className="mb-3 px-1">
            <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight">Wochenplan KW {aktiveKW}</h2>
          </div>
        )}
        {TAGE_MO_FR.map((tag, dayIndex) => {
          const contentKey = weekPlan[dayIndex].map((s) => s?.dishId ?? '-').join('');
          return (
            <motion.section
              key={`${tag}-${contentKey}`}
              initial={lottoJustFilled ? { opacity: 0, y: 24, scale: 0.96 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: lottoJustFilled ? 0.45 : 0.25,
                delay: lottoJustFilled ? dayIndex * 0.08 : 0,
                ease: lottoJustFilled ? [0.34, 1.56, 0.64, 1] : 'easeOut',
              }}
              className="rounded-[24px] overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm border border-black/5"
            >
              <h2 className="px-4 py-2 text-sm font-bold text-[#64748b] uppercase tracking-widest bg-white/50 border-b border-black/5">
                {tag}
              </h2>
              <div className="grid grid-cols-3 gap-3 p-4">
                {[0, 1, 2].map((slot) => {
                  const slotIndex = dayIndex * 3 + slot;
                  const delayClass = slotIndex < 15 ? styles[`slotDelay${slotIndex + 1}` as keyof typeof styles] : '';
                  const lottoAnimationClass =
                    lottoJustFilled && dayIndex < 5
                      ? `${styles.slotAnimated} ${delayClass}`.trim()
                      : undefined;
                  return (
                  <div key={slot} className="flex flex-col min-w-0">
                    {!teamView && (
                      <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1.5">
                        {SLOT_LABELS[slot]}
                      </span>
                    )}
                    {lottoLoading && dayIndex < 5 ? (
                      <div
                        className={`flex flex-col items-center justify-center min-h-[100px] p-3 rounded-xl bg-[#F8F7F2] border-2 border-dashed border-[#FFDE00]/40 ${styles.slotLoading}`}
                      >
                        <span className="text-lg text-[#FFDE00] opacity-80">🎲</span>
                        <span className="text-[10px] text-[#94a3b8] mt-1">…</span>
                      </div>
                    ) : weekPlan[dayIndex][slot] ? (
                      <DishCard
                        dish={weekPlan[dayIndex][slot]!.dish}
                        price={isSilentPricing ? '' : formatPreis(weekPlan[dayIndex][slot]!.dish.lastPrice)}
                        variant="column"
                        onRemove={() => removeSlot(dayIndex, slot)}
                        showMicroBadges={!teamView}
                        animate={!lottoAnimationClass}
                        teamView={teamView}
                        lottoAnimationClass={lottoAnimationClass}
                      />
                    ) : teamView ? (
                      <div className="flex flex-col items-center justify-center min-h-[80px] p-3 rounded-xl bg-[#f1f3f5]/50 border border-dashed border-black/10">
                        <span className="text-[10px] text-[#94a3b8]">–</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic();
                          openSlotPicker(dayIndex, slot);
                        }}
                        className={`flex flex-col items-center justify-center min-h-[100px] p-3 rounded-xl border-2 border-dashed border-black/15 bg-[#F8F7F2]/60 transition-colors ${styles.emptySlot}`}
                      >
                        <span className="text-2xl text-[#cbd5e1] mb-1">+</span>
                        <span className="text-[10px] font-medium text-[#94a3b8]">Hinzufügen</span>
                      </button>
                    )}
                  </div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </main>

      {/* 3. BOTTOM – ausgeblendet in Team-Ansicht */}
      {!teamView && (
        <footer
          className="fixed bottom-0 left-0 right-0 z-20 pt-4 px-4 bg-gradient-to-t from-[#F8F7F2] via-[#F8F7F2]/95 to-transparent"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className={`rounded-2xl p-3 ${styles.sheetGlass}`}>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[5, 6, 7, 8, 9].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    triggerHaptic();
                    setAktiveKW(kw);
                  }}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 min-h-[48px] ${
                    aktiveKW === kw
                      ? styles.kwPillActive
                      : 'bg-white/80 text-[#64748b] border border-black/10'
                  }`}
                >
                  KW {kw}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-[#64748b] mt-2 text-center">
              KW {aktiveKW} wird geplant
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              openGlobalPicker();
            }}
            className="fixed bottom-6 right-6 z-30 w-16 h-16 rounded-full bg-[#FFDE00] text-[#1a1a1a] shadow-xl shadow-[#FFDE00]/40 flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform"
            style={{ bottom: 'max(6rem, calc(env(safe-area-inset-bottom) + 3rem))' }}
            aria-label="Magic-Planer öffnen"
          >
            ✨
          </button>
        </footer>
      )}

      {/* 4. TEAM-ANSICHT BAR – Zurück & Als Bild teilen */}
      {teamView && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 flex gap-3 p-4 bg-white/95 backdrop-blur-xl border-t border-black/5"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              setTeamView(false);
            }}
            className="flex-1 min-h-[52px] rounded-xl font-bold border-2 border-black/10 text-[#64748b] hover:bg-black/5 transition-colors"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={handleExportAsImage}
            className="flex-1 min-h-[52px] rounded-xl font-bold bg-[#FFDE00] text-[#1a1a1a] shadow-lg shadow-[#FFDE00]/30 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            📤 Als Bild teilen
          </button>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        weekPlan={weekPlan}
        aktiveKW={aktiveKW}
        onHaptic={triggerHaptic}
        onShareTeamPreview={() => {
          setTeamView(true);
          setTimeout(() => exportAsImage(screenshotRef.current), 450);
        }}
        onBackToOverview={() => {
          setTeamView(false);
        }}
      />

      <MagicPlanerSheet
        isOpen={pickerOpen}
        onClose={closePicker}
        dishes={dishes}
        pickerTarget={pickerTarget}
        onSelectDish={(dish) => {
          triggerHaptic([10, 30, 10]);
          selectDishForSlot(dish);
        }}
        onLotto={handleLotto}
        onSaisonSet={(s) => loadSaisonSet(s)}
      />
    </div>
  );
};

export default WeeklyPlan;
