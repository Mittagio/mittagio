import React from 'react';

const APP_URL = '/app/';

export function LandingPage() {
  const goToApp = () => {
    window.location.href = APP_URL;
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-semibold tracking-tight text-slate-900">Mittagio</span>
          <a
            href={APP_URL}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Zur App
          </a>
        </div>
      </header>

      <main>
        {/* Hero: Headline + Bild + CTA */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Dein Gericht online. In 30 Sekunden. Ohne Abo.
            </h1>
            <p className="mt-6 text-lg text-slate-600 sm:text-xl">
              Maximale Geschwindigkeit für Gastros & Metzger. 4,99 € pro Inserat.
            </p>
            <div className="mt-10">
              <a
                href={APP_URL}
                className="inline-flex rounded-full bg-[#FFD700] px-8 py-4 text-base font-bold text-slate-900 shadow-lg shadow-amber-300/30 transition hover:bg-amber-400 active:scale-[0.98]"
              >
                Jetzt für 4,99 € inserieren
              </a>
            </div>
          </div>
        </section>

        {/* Hauptbild: Clean, viel Weißraum */}
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-4xl">
            <img
              src="https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=1200&q=80"
              alt="Mittagsangebote – frisch, nah, unkompliziert"
              className="w-full rounded-2xl object-cover shadow-sm"
            />
          </div>
        </section>

        {/* 3 Säulen: direkt unter dem Hauptbild */}
        <section className="border-t border-slate-100 bg-slate-50/50 py-20">
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
                <a
                  href={APP_URL}
                  className="mt-6 block w-full rounded-full border-2 border-[#FFD700] bg-white py-3 text-center text-base font-bold text-slate-800 transition hover:bg-amber-50"
                >
                  Jetzt für 4,99 € inserieren
                </a>
              </div>
              <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/30 p-8 ring-2 ring-emerald-500/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-slate-900">0,89 €</span>
                  <span className="text-slate-500">pro Abholnummer</span>
                </div>
                <p className="mt-3 text-slate-600">
                  Gratis inserieren – du zahlst nur die Abholnummer pro Gast. Egal wie viele Portionen.
                </p>
                <a
                  href={APP_URL}
                  className="mt-6 block w-full rounded-full bg-emerald-500 py-3 text-center text-base font-medium text-white transition hover:bg-emerald-600"
                >
                  Gratis mit Abholnummer
                </a>
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
            <a
              href={APP_URL}
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Jetzt für 4,99 € inserieren
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          Mittagio – Mittagsangebote & Abholnummer. Clean. Kein Abo.
        </div>
      </footer>
    </div>
  );
}
