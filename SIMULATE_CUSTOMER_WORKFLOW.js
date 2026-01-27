/**
 * KUNDEN-WORKFLOW SIMULATION
 * 
 * Simuliert einen kompletten Kunden-Workflow:
 * 1. Zum Swipe-Modus wechseln
 * 2. Durch mehrere Gerichte swippen (ablehnen, überspringen)
 * 3. 3 Gerichte zu Favoriten hinzufügen
 * 4. 1 Gericht in die Mittagsbox legen
 * 5. Zum Checkout gehen und bezahlen
 * 
 * AUSFÜHRUNG:
 * Öffne die Browser-Konsole (F12) und kopiere dieses Skript hinein.
 * Oder: Füge es am Ende von index.html ein (nur für Tests).
 */

(function simulateCustomerWorkflow() {
  console.log('🚀 Starte Kunden-Workflow Simulation...');
  
  // Warte bis die Seite vollständig geladen ist
  if (document.readyState !== 'complete') {
    window.addEventListener('load', simulateCustomerWorkflow);
    return;
  }
  
  // Warte kurz, damit alle Funktionen verfügbar sind
  setTimeout(() => {
    runSimulation();
  }, 1000);
  
  async function runSimulation() {
    try {
      // Schritt 1: Zum Swipe-Modus wechseln
      console.log('📱 Schritt 1: Wechsle zum Swipe-Modus...');
      await delay(500);
      
      // Prüfe ob Discover-Seite aktiv ist
      if (typeof showDiscover === 'function') {
        showDiscover();
        await delay(500);
      }
      
      // Wechsle zum Swipe-Modus
      if (typeof switchDiscoverView === 'function') {
        switchDiscoverView('swipe');
        await delay(1000);
      } else {
        console.error('❌ switchDiscoverView Funktion nicht gefunden');
        return;
      }
      
      // Warte bis Swipe-Karten gerendert sind
      await delay(1000);
      
      // Schritt 2: Durch Gerichte swippen
      console.log('🔄 Schritt 2: Swipe durch Gerichte...');
      
      // Hole verfügbare Swipe-Karten
      const swipeStack = document.getElementById('swipeStack');
      if (!swipeStack) {
        console.error('❌ Swipe-Stack nicht gefunden');
        return;
      }
      
      // Warte bis Karten geladen sind
      await delay(1000);
      
      // Simuliere Swipes: 2x ablehnen, 1x überspringen, 3x zu Favoriten
      const actions = [
        { type: 'reject', name: 'Ablehnen' },
        { type: 'reject', name: 'Ablehnen' },
        { type: 'next', name: 'Überspringen' },
        { type: 'accept', name: 'Zu Favoriten' },
        { type: 'next', name: 'Überspringen' },
        { type: 'accept', name: 'Zu Favoriten' },
        { type: 'next', name: 'Überspringen' },
        { type: 'accept', name: 'Zu Favoriten' },
      ];
      
      let favoriteOffers = [];
      
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        console.log(`  → ${action.name} (${i + 1}/${actions.length})`);
        
        await delay(800); // Warte zwischen Aktionen
        
        const currentCard = swipeStack.querySelector('.swipe-card:not([style*="opacity: 0"])');
        if (!currentCard) {
          console.log('  ⚠️ Keine weitere Karte gefunden');
          break;
        }
        
        const offerId = currentCard.dataset.offerId;
        const offer = typeof offers !== 'undefined' ? offers.find(o => o.id === offerId) : null;
        
        if (action.type === 'reject') {
          // Rot-Button klicken (Ablehnen)
          const btnReject = document.getElementById('btnSwipeReject');
          if (btnReject) {
            btnReject.click();
            await delay(400);
          }
        } else if (action.type === 'next') {
          // Grau-Button klicken (Überspringen)
          const btnNext = document.getElementById('btnSwipeNext');
          if (btnNext) {
            btnNext.click();
            await delay(400);
          }
        } else if (action.type === 'accept') {
          // Grün-Button klicken (Zu Favoriten)
          const btnLike = document.getElementById('btnSwipeLike');
          if (btnLike && offer) {
            favoriteOffers.push(offer);
            btnLike.click();
            await delay(400);
          }
        }
        
        // Warte bis Animation abgeschlossen ist
        await delay(300);
      }
      
      console.log(`✅ ${favoriteOffers.length} Gerichte zu Favoriten hinzugefügt`);
      
      // Schritt 3: 1 Gericht in die Mittagsbox legen
      console.log('🛒 Schritt 3: Lege 1 Gericht in die Mittagsbox...');
      await delay(1000);
      
      if (favoriteOffers.length > 0) {
        // Wähle das erste Favoriten-Gericht
        const offerToCart = favoriteOffers[0];
        
        // Prüfe ob Gericht Abholnummer hat
        const normalized = typeof normalizeOffer === 'function' ? normalizeOffer(offerToCart) : null;
        if (normalized && normalized.hasPickupCode) {
          // Füge zum Warenkorb hinzu
          if (typeof addToCart === 'function') {
            const added = addToCart(offerToCart);
            if (added) {
              console.log(`✅ Gericht "${normalized.dish || normalized.title}" zum Warenkorb hinzugefügt`);
              await delay(500);
            } else {
              console.log('⚠️ Gericht konnte nicht zum Warenkorb hinzugefügt werden');
            }
          }
        } else {
          console.log('⚠️ Gericht hat keine Abholnummer, kann nicht bestellt werden');
        }
      }
      
      // Schritt 4: Zum Checkout gehen
      console.log('💳 Schritt 4: Gehe zum Checkout...');
      await delay(1000);
      
      // Zeige Warenkorb
      if (typeof showCart === 'function') {
        showCart();
        await delay(1000);
      }
      
      // Klicke auf Checkout-Button
      const btnCheckout = document.getElementById('btnCheckout');
      if (btnCheckout && btnCheckout.style.display !== 'none') {
        btnCheckout.click();
        await delay(1000);
        
        // Schritt 5: Checkout ausfüllen und bezahlen
        console.log('💰 Schritt 5: Fülle Checkout aus...');
        
        // Name eingeben
        const nameInput = document.getElementById('checkoutName');
        if (nameInput) {
          nameInput.value = 'Max Mustermann';
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
          await delay(300);
        }
        
        // E-Mail eingeben (optional)
        const emailInput = document.getElementById('checkoutEmail');
        if (emailInput) {
          emailInput.value = 'max.mustermann@example.com';
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
          await delay(300);
        }
        
        // Abholzeit wählen (erste verfügbare Zeit)
        const timeSlots = document.querySelectorAll('#checkoutTimeSlots .time-slot-btn');
        if (timeSlots.length > 0) {
          timeSlots[0].click();
          await delay(300);
        }
        
        // Bezahlen (Standard Payment Button)
        await delay(1000);
        const btnStandardPayment = document.getElementById('btnStandardPayment');
        if (btnStandardPayment) {
          console.log('💳 Klicke auf Bezahlen-Button...');
          btnStandardPayment.click();
          await delay(500);
          
          // Hinweis: In Production würde hier Stripe Checkout geöffnet
          console.log('✅ Checkout-Prozess gestartet!');
          console.log('ℹ️ In Production würde jetzt Stripe Checkout geöffnet werden.');
        } else {
          console.log('⚠️ Bezahlen-Button nicht gefunden');
        }
      } else {
        console.log('⚠️ Checkout-Button nicht verfügbar oder ausgeblendet');
      }
      
      console.log('✅ Simulation abgeschlossen!');
      console.log('📊 Zusammenfassung:');
      console.log(`  - ${favoriteOffers.length} Gerichte zu Favoriten hinzugefügt`);
      console.log(`  - 1 Gericht im Warenkorb`);
      console.log(`  - Checkout-Prozess gestartet`);
      
    } catch (error) {
      console.error('❌ Fehler bei Simulation:', error);
    }
  }
  
  // Helper: Delay-Funktion
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})();
