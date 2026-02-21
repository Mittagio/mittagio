/* Mittagio UI-Views – Render-Funktionen [Big Split]
 * Enthält: renderInseratCard (S25 100x100 Edge-to-Edge Master), renderDiscover, …
 * [cite: 2026-02-18 INSERATSFLOW_S25_KONZEPT]
 */
(function(){
  'use strict';
  var esc = typeof window !== 'undefined' && window.esc ? window.esc : function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };

  /** Inserat-Card Master: 100x100 Bild links, Text rechts. Edge-to-Edge, keine Schatten/Boxen.
   * Nutzung: Feed, Kochbuch, Wochenplan – alle Listen einheitlich.
   * @param {Object} data - { id, image, name, price, time, pillars?, dataOfferId?, dataCookbookId?, dataDate? }
   */
  function renderInseratCard(data){
    var id = data.id || '';
    var img = data.image || 'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70';
    var name = esc(data.name || 'Gericht');
    var price = esc(String(data.price || '0'));
    var time = esc(String(data.time || ''));
    var pillars = (data.pillars !== undefined) ? data.pillars : '🍴 🧾 🔄';
    var dataOfferId = data.dataOfferId ? ' data-offer-id="' + esc(String(data.dataOfferId)) + '"' : '';
    var dataCookbookId = data.dataCookbookId ? ' data-cookbook-id="' + esc(String(data.dataCookbookId)) + '"' : '';
    var dataDate = data.dataDate ? ' data-date="' + esc(String(data.dataDate)) + '"' : '';
    return '<div class="prov-card inserat-bar-card"' + dataOfferId + dataCookbookId + dataDate + ' role="button" tabindex="0" style="display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #e5e7eb;width:100%;background:transparent;margin:0;border-radius:0;box-shadow:none;cursor:pointer;">' +
      '<div style="width:100px;height:100px;min-width:100px;border-radius:12px;overflow:hidden;margin-left:0;flex-shrink:0;">' +
        '<img src="' + esc(img) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70\'">' +
      '</div>' +
      '<div style="flex:1;padding-left:16px;display:flex;flex-direction:column;min-width:0;">' +
        '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;margin:0;color:#1a1a1a;line-height:1.3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">' + name + '</h3>' +
        '<div style="font-size:14px;margin:4px 0;">' + pillars + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">' +
          '<span style="font-weight:700;font-size:15px;">' + price + '</span>' +
          '<span style="font-size:12px;color:#6b7280;">' + time + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /** Single Source: Header-Titel für alle 5 Anbieter-Seiten beim Laden setzen.
   * Jede Seite ruft diese Funktion mit dem jeweiligen Titel auf.
   * @param {string} title - z.B. "Meine Küche", "Meine Abholung", "Wochenplan", "Mein Kochbuch", "Mein Profil"
   */
  function setProviderPageHeader(title){
    if(typeof document === 'undefined' || !title) return;
    var sel = '.view.active .dynamic-header .prov-page-header-title, .view.active .dynamic-header .system-header-title, .view.active .dynamic-header h1';
    var el = document.querySelector(sel);
    if(el) el.textContent = String(title);
    var weekTitle = document.getElementById('weekHeaderTitle');
    if(weekTitle && document.querySelector('.view.active#v-provider-week')) weekTitle.textContent = String(title);
  }

  if(typeof window !== 'undefined'){
    window.renderInseratCard = renderInseratCard;
    window.setProviderPageHeader = setProviderPageHeader;
  }
})();
