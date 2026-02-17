import React from 'react';

export function LandingPage() {
  const goToApp = () => {
    window.location.href = '/app';
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-semibold tracking-tight text-slate-900">Mittagio</span>
          <button
            type="button"
            onClick={goToApp}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Zur App
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Dein Gericht online. In 30 Sekunden. Ohne Abo.
            </h1>
            <p className="mt-6 text-lg text-slate-600 sm:text-xl">
              Maximale Geschwindigkeit für Gastros & Metzger. 4,99 € pro Inserat.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={goToApp}
                className="w-full rounded-full bg-emerald-500 px-8 py-4 text-base font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 sm:w-auto"
              >
                Jetzt starten
              </button>
              <a
                href="#preise"
                className="w-full rounded-full border border-slate-300 bg-white px-8 py-4 text-center text-base font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                Preise ansehen
              </a>
            </div>
          </div>
        </section>

        {/* 3 Säulen */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
              Drei Säulen. Eine App.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              So bringen Gastronomen und Metzger ihr Mittagsangebot in Sekunden online.
            </p>
            <div className="mt-16 grid gap-12 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
                <span className="text-4xl" role="img" aria-hidden>🍴</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Vor Ort</h3>
                <p className="mt-2 text-slate-600">
                  Gäste essen bei dir – kein Versand, keine Lieferlogistik. Einfach Abholung oder Tisch.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
                <span className="text-4xl" role="img" aria-hidden>🧾</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Abholnummer</h3>
                <p className="mt-2 text-slate-600">
                  Jeder Gast bekommt eine Abholnummer – Schlange überspringen, 0,89 € pro Abholnummer.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
                <span className="text-4xl" role="img" aria-hidden>🔄</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Mehrweg</h3>
                <p className="mt-2 text-slate-600">
                  Nachhaltig unterwegs: Mehrweg-Option für Gäste, die mit eigenem Behälter abholen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preise */}
        <section id="preise" className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-center text-2xl font-semibold text-slate-900 sm:text-3xl">
              Klare Preise. Kein Abo.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Du zahlst nur, wenn du inserierst. Keine monatlichen Fixkosten.
            </p>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-slate-900">4,99 €</span>
                  <span className="text-slate-500">pro Inserat</span>
                </div>
                <p className="mt-3 text-slate-600">
                  Einmaliges Inserat für einen Tag – Fixpreis, ohne Abholnummer-System.
                </p>
                <button
                  type="button"
                  onClick={goToApp}
                  className="mt-6 w-full rounded-full border-2 border-yellow-400 bg-white py-3 text-base font-medium text-slate-800 transition hover:bg-yellow-50"
                >
                  Für 4,99 € inserieren
                </button>
              </div>
              <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/30 p-8 ring-2 ring-emerald-500/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-slate-900">0,89 €</span>
                  <span className="text-slate-500">pro Abholnummer</span>
                </div>
                <p className="mt-3 text-slate-600">
                  Gratis inserieren – du zahlst nur die Abholnummer pro Gast. Egal wie viele Portionen.
                </p>
                <button
                  type="button"
                  onClick={goToApp}
                  className="mt-6 w-full rounded-full bg-emerald-500 py-3 text-base font-medium text-white transition hover:bg-emerald-600"
                >
                  Gratis mit Abholnummer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-100 bg-slate-900 py-24 text-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              In 30 Sekunden live.
            </h2>
            <p className="mt-4 text-slate-300">
              Kein Abo, keine versteckten Kosten. Einfach Gericht hochladen und Preis eintragen.
            </p>
            <button
              type="button"
              onClick={goToApp}
              className="mt-8 rounded-full bg-white px-8 py-4 text-base font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Jetzt starten
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          Mittagio – Mittagsangebote & Abholnummer. Keine Schiefertafeln. Nur Code.
        </div>
      </footer>
    </div>
  );
}
