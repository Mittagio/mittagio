import React from 'react';
import { motion } from 'framer-motion';
import type { Dish } from '../Kochbuch';
import styles from './Wochenplan.module.css';

/** Micro-Badges für die 3 Säulen: Vor Ort, Abholnummer, Mehrweg */
const PILLAR_BADGES = ['🍴', '🧾', '🔄'] as const;

export interface DishCardProps {
  dish: Dish;
  price: string;
  variant?: 'hero' | 'compact' | 'column';
  onRemove?: () => void;
  onClick?: () => void;
  /** Für Slot-Machine-Animation beim Erscheinen */
  animate?: boolean;
  /** Micro-Badges (🍴🧾🔄) am Bild – Standard: true */
  showMicroBadges?: boolean;
  /** Screenshot/Team-Ansicht: nur Bild & Name, keine Preise/Buttons/Badges */
  teamView?: boolean;
  /** Lotto: slotAnimated + delay-Klasse für gestaffelte Plopp-Animation */
  lottoAnimationClass?: string;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  price,
  variant = 'hero',
  onRemove,
  onClick,
  animate = true,
  showMicroBadges = true,
  teamView = false,
  lottoAnimationClass,
}) => {
  const isColumn = variant === 'column';
  const imgSize = isColumn ? 'w-full aspect-[4/3]' : variant === 'hero' ? 'w-24 h-24' : 'w-12 h-12 rounded-lg';

  const Content = (
    <>
      {onRemove && isColumn && !teamView && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white text-lg leading-none hover:bg-black/60 transition-colors"
          aria-label="Entfernen"
        >
          ×
        </button>
      )}
      <div className={`relative flex-shrink-0 overflow-hidden rounded-xl bg-[#f1f3f5] shadow-inner`}>
        <img
          src={dish.image}
          alt={dish.name}
          className={`object-cover ${imgSize}`}
        />
        {showMicroBadges && !teamView && (
          <div className={`absolute bottom-1 left-1 flex gap-0.5 ${styles.microBadges}`} aria-hidden>
            {PILLAR_BADGES.map((icon) => (
              <span key={icon} className={styles.microBadge}>
                {icon}
              </span>
            ))}
          </div>
        )}
        {(variant === 'hero' || isColumn) && (
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"
            aria-hidden
          />
        )}
      </div>
      <div className={`flex-1 min-w-0 ${isColumn ? 'mt-auto' : ''}`}>
        <h3
          className={`font-bold leading-tight truncate text-[#1D1D1F] ${
            variant === 'hero' ? 'text-lg' : variant === 'column' ? 'text-sm' : 'text-sm'
          }`}
        >
          {dish.name}
        </h3>
        {price && !teamView ? (
          <p className={`font-bold text-[#1a1a1a] ${variant === 'hero' || isColumn ? 'mt-0.5 text-xs' : 'text-xs font-semibold text-[#86868B]'}`}>
            {price}
          </p>
        ) : null}
        {variant === 'hero' && !teamView && (
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] bg-[#FFDE00]/20 px-2 py-0.5 rounded">
            Online
          </span>
        )}
      </div>
      {onRemove && !isColumn && !teamView && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-[#86868B] hover:text-[#1a1a1a] p-1 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
          aria-label="Entfernen"
        >
          ×
        </button>
      )}
    </>
  );

  const cardClass = isColumn
    ? 'relative flex flex-col gap-2 p-3 rounded-xl bg-white/60 border border-black/5 min-h-[120px]'
    : variant === 'hero'
      ? 'flex gap-4 items-center'
      : 'flex items-center gap-2 p-3 rounded-xl bg-[#f8f9fa] border border-black/5';

  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`w-full text-left ${cardClass} ${lottoAnimationClass ?? ''}`}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={animate && !lottoAnimationClass ? { opacity: 0, y: 12 } : undefined}
      animate={animate && !lottoAnimationClass ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {Content}
    </motion.div>
  );
};

export default DishCard;
