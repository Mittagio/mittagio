# Referenz: React Universal Flow + Cursor-Anweisungen

Dieses Dokument enthält die **Formulierungen für Cursor** und die **React-Komponente** als Referenz.  
**Hinweis:** Mittagio ist derzeit eine **Single-Page-App in `app/index.html`** (HTML/CSS/JS). Es gibt keine React-Inserat-Komponente zum direkten Ersetzen. Die Zuordnung zum bestehenden Vanilla-Code steht in `INTEGRATION_INSERAT_VANILLA.md`.

---

## Was du Cursor sagen musst

1. **Ersetzen**  
   *"Ersetze den gesamten Inhalt meiner Inserat-Komponente durch diesen Code."*

2. **Verknüpfen**  
   *"Nutze meine bestehende onSubmit-Logik, um die Daten an die Datenbank zu senden, wenn man auf 'Inserieren' oder 'Speichern' klickt."*

3. **Bilder**  
   *"Verbinde meine Cloudinary/S3-Upload-Logik mit dem Photo-Header, sodass das Vorschaubild dort angezeigt wird."*

4. **Autovervollständigung**  
   *"Nutze meine bestehende Gericht-Liste für das Autocomplete im Gerichtsnamen-Feld."*

---

## High-End Features im Code

- **Liquid Flow:** Tastatur schließen, sanftes Scrollen zum nächsten Feld nach jeder Eingabe [cite: 2026-01-29].
- **Haptik:** Integrierte `triggerHaptic`-Funktion für Klick-Gefühl am Smartphone [cite: 2026-01-29].
- **Monetarisierung:** Klare Trennung 4,99 € Inserat vs. kostenlose Option mit Abholnummer [cite: 2026-01-26, 2026-01-29].
- **Transparenz:** Verdienst-Vorschau berechnet sofort den potenziellen Erlös [cite: 2026-01-29].

---

## Design-Hinweis (Live-App)

Im **Anbieter-Bereich** gilt ab Design-Vorgabe: **Akzent #FFDE00 (Dein Gelb)**. Die React-Referenz nutzt noch #10b981 (Emerald); bei Übernahme in die App oder eine spätere React-Version bitte auf `#FFDE00` bzw. `var(--prov-brand)` umstellen.

---

## React-Komponente (Referenz)

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mittagio Universal Flow
 * entryMode: 'inserat' | 'kochbuch' | 'wochenplan' [cite: 2026-01-29]
 */
const UniversalMittagioFlow = ({ entryMode = 'inserat' }) => {
  const [step, setStep] = useState('photo');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [showAllergens, setShowAllergens] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Fleisch');
  const [activeIcons, setActiveIcons] = useState({ vorOrt: true, mehrweg: false, abholnummer: false });
  const [pricingOption, setPricingOption] = useState('standard'); // 'standard' oder 'abholnummer'

  const scrollRef = useRef(null);

  // Haptisches Feedback Funktion [cite: 2026-01-29]
  const triggerHaptic = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      const patterns = { light: 10, medium: [15, 10, 15], success: [20, 50, 20] };
      navigator.vibrate(patterns[type] || 10);
    }
  };

  // Auto-Scroll Logik für den Liquid-Flow [cite: 2026-01-29]
  const scrollToNext = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/10 p-4 font-sans antialiased">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg backdrop-blur-3xl bg-white/70 border border-white/40 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col"
      >
        
        {/* 1. PHOTO HEADER [cite: 2026-01-29, 2026-02-02] */}
        <section id="photo-section" className="relative h-56 w-full bg-gray-200/40 group overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 group-active:scale-95 transition-transform cursor-pointer">
            <span className="text-4xl text-gray-400">📸</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Foto hinzufügen</span>
          </div>
          <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay pointer-events-none" />
        </section>

        {/* 2. DIE DREI SÄULEN (DIREKT UNTER BILD) [cite: 2026-01-27, 2026-02-02] */}
        <div className="flex justify-between gap-3 px-6 py-4">
          {[
            { id: 'vorOrt', label: 'Vor Ort', emoji: '🍴' },
            { id: 'abholnummer', label: 'Abholnummer', emoji: '🧾' },
            { id: 'mehrweg', label: 'Mehrweg', emoji: '🔄' }
          ].map((icon) => (
            <motion.button
              key={icon.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                triggerHaptic();
                setActiveIcons(prev => ({ ...prev, [icon.id]: !prev[icon.id] }));
              }}
              className={`flex-1 flex flex-col items-center py-4 rounded-3xl border transition-all ${
                activeIcons[icon.id] 
                ? 'bg-[#FFDE00] border-[#FFDE00] text-[#1a1a1a] shadow-lg' 
                : 'bg-white/40 border-white/60 text-gray-400'
              }`}
            >
              <span className="text-2xl">{icon.emoji}</span>
              <span className="text-[9px] mt-1 font-black uppercase tracking-tighter">{icon.label}</span>
            </motion.button>
          ))}
        </div>

        {/* 3. INPUT AREA (LIQUID FLOW) [cite: 2026-01-29] */}
        <div className="px-6 space-y-5 pb-8 overflow-y-auto max-h-[50vh] no-scrollbar">
          <div id="name-field">
            <input 
              type="text" 
              placeholder="Was kochst du heute?"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              onBlur={() => scrollToNext('category-field')}
              className="w-full bg-white/50 border-none ring-1 ring-black/5 rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-[#FFDE00] transition-all"
            />
          </div>

          <div id="category-field" className="flex overflow-x-auto gap-2 no-scrollbar py-1">
            {['Fleisch', 'Vegetarisch', 'Vegan', 'Salat'].map(cat => (
              <button 
                key={cat}
                onClick={() => { triggerHaptic(); setSelectedCategory(cat); scrollToNext('price-field'); }}
                className={`flex-none px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                  selectedCategory === cat 
                  ? 'bg-[#FFDE00] text-[#1a1a1a] shadow-md' 
                  : 'bg-white/40 text-gray-500 border border-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            <button 
              onClick={() => { triggerHaptic(); setShowAllergens(!showAllergens); }}
              className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2"
            >
              {showAllergens ? '▼ Allergene schließen' : '▶ Allergene angeben?'}
            </button>
            <AnimatePresence>
              {showAllergens && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-2 pt-3">
                    {['A', 'B', 'C', 'D', 'G', 'L'].map(a => (
                      <div key={a} className="bg-white/40 border border-white/60 p-3 rounded-xl text-center text-xs font-bold text-gray-500">
                        {a}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div id="price-field" className="relative group">
            <input 
              type="text" 
              inputMode="decimal"
              placeholder="Preis z.B. 8,50 €"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-white/80 border-none ring-2 ring-black/5 rounded-2xl px-5 py-5 text-2xl font-black text-center text-[#1a1a1a] placeholder:text-gray-300 focus:ring-4 focus:ring-[#FFDE00]/20 transition-all shadow-inner"
            />
            {price && <div className="text-[10px] text-center mt-2 font-bold text-gray-400 uppercase">Möglicher Verdienst: {(parseFloat(price.replace(',','.')) * 30).toFixed(2)} €*</div>}
          </div>
        </div>

        {/* 4. DREI-WEGE ABSCHLUSS-LOGIK [cite: 2026-01-29, 2026-02-04] */}
        <section className="p-6 bg-white/40 border-t border-white/60">
          {entryMode === 'inserat' ? (
            <div className="space-y-3">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => { triggerHaptic('success'); setPricingOption('standard'); }}
                className={`w-full py-5 rounded-2xl font-black text-center uppercase tracking-tighter transition-all ${
                  pricingOption === 'standard' ? 'bg-[#FFDE00] text-[#1a1a1a] shadow-xl scale-100' : 'bg-gray-200/50 text-gray-400'
                }`}
              >
                Jetzt für 4,99 € inserieren
              </motion.button>
              
              <div className="text-center text-[10px] font-black text-gray-400">ODER</div>

              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => { triggerHaptic('success'); setPricingOption('abholnummer'); }}
                className={`w-full py-4 rounded-2xl border-2 flex flex-col items-center transition-all ${
                  pricingOption === 'abholnummer' 
                  ? 'border-[#FFDE00] bg-[#FFDE00]/10 text-[#1a1a1a]' 
                  : 'border-white/20 bg-white/10 text-gray-400'
                }`}
              >
                <span className="font-black uppercase text-sm text-[#1a1a1a]">Für 0,00 € inserieren</span>
                <span className="text-[9px] font-bold">Inkl. Abholnummer (0,89 € pro Vorgang)</span>
              </motion.button>
            </div>
          ) : (
            <motion.button 
              whileTap={{ scale: 0.96 }}
              onClick={() => triggerHaptic('success')}
              className="w-full py-5 bg-[#FFDE00] text-[#1a1a1a] font-black rounded-2xl shadow-xl uppercase"
            >
              {entryMode === 'kochbuch' ? 'Im Kochbuch speichern' : 'Im Wochenplan speichern'}
            </motion.button>
          )}
        </section>
      </motion.div>
    </div>
  );
};

export default UniversalMittagioFlow;
```

(Akzentfarben in der Referenz auf #FFDE00 angepasst.)
