/* Mittagio UI-Views – Render-Funktionen [Big Split]
 * Enthält: renderInseratCard (S25 100x100 Edge-to-Edge Master), renderDiscover, …
 * [cite: 2026-02-18 INSERATSFLOW_S25_KONZEPT]
 *
 * STICKY-GEWALT [2026-02-21]: Dashboard + Abholnummern nutzen .sticky-header und .sticky-sub-bar.
 * Struktur (index.html): Scroll-Container (dashboard-floating-wrap, pickups-floating-wrap) enthält
 * direkt: 1) Header (.sticky-header), 2) KPIs/Filter (.sticky-sub-bar), 3) Content (scrollt darunter).
 * KPI-Karten und Filter-Buttons liegen NICHT im scrollbaren Listen-Container – sie sind Geschwister.
 */
(function(){
  'use strict';
  var esc = typeof window !== 'undefined' && window.esc ? window.esc : function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };

  /** Inserat-Card Master: 100x100 Bild links, Text rechts. Edge-to-Edge, keine Schatten/Boxen.
   * Nutzung: Feed, Kochbuch, Wochenplan – alle Listen einheitlich.
   * @param {Object} data - { id, image, name, price, time, pillars?, pillarIcons?, compact?, dataOfferId?, dataCookbookId?, dataDate? }
   * @param {boolean} data.compact - Wochenplan: nur Name + Preis, kleinere Kachel
   * @param {Array} data.pillarIcons - S25 Dashboard: 5 Säulen [{ icon, active, pillar }] → Klick = Deep-Link Mastercard
   */
  function renderInseratCard(data){
    var id = data.id || '';
    var img = data.image || 'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70';
    var name = esc(data.name || 'Gericht');
    var price = esc(String(data.price || '0'));
    var time = esc(String(data.time || ''));
    var pillars = (data.pillars !== undefined) ? data.pillars : '🍴 🧾 🔄';
    var pillarIcons = data.pillarIcons;
    var compact = !!data.compact;
    var dataOfferId = data.dataOfferId ? ' data-offer-id="' + esc(String(data.dataOfferId)) + '"' : '';
    var dataCookbookId = data.dataCookbookId ? ' data-cookbook-id="' + esc(String(data.dataCookbookId)) + '"' : '';
    var dataDate = data.dataDate ? ' data-date="' + esc(String(data.dataDate)) + '"' : '';
    var hasAbhol = !!(data.hasPickupCode);
    var badgeHtml = hasAbhol ? '<span class="prov-card-abhol-badge" style="position:absolute;bottom:6px;right:6px;padding:4px 8px;border-radius:8px;background:rgba(15,23,42,0.9);color:#fff;font-size:11px;font-weight:800;">🧾</span>' : '';
    if (compact) {
      return '<div class="prov-card inserat-bar-card kw-slot-compact"' + dataOfferId + dataCookbookId + dataDate + ' role="button" tabindex="0" style="display:flex;align-items:center;padding:8px 12px;border-radius:12px;background:#fff;border:1px solid #e5e7eb;width:100%;margin:0 0 6px 0;box-shadow:0 1px 3px rgba(0,0,0,0.04);cursor:pointer;">' +
        '<div style="width:48px;height:48px;min-width:48px;border-radius:10px;overflow:hidden;flex-shrink:0;position:relative;">' +
          '<img src="' + esc(img) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70\'">' +
        '</div>' +
        '<div style="flex:1;padding-left:12px;min-width:0;">' +
          '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:14px;margin:0;color:#1a1a1a;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + name + '</h3>' +
          '<span style="font-weight:700;font-size:14px;color:#10b981;">' + price + '</span>' +
        '</div>' +
      '</div>';
    }
    var pillarsBlock = '';
    if (pillarIcons && pillarIcons.length) {
      var titles = { dineIn: 'Vor Ort', reuse: 'Mehrweg', allergens: 'Allergene', extras: 'Extras', pickupCode: 'Abholnummer' };
      pillarsBlock = '<div class="prov-list-item-pillars dashboard-five-pillars">' + pillarIcons.map(function(p) {
        var active = !!p.active;
        var cls = 'dashboard-pillar-icon icon-pill' + (active ? ' active' : ' inactive');
        var title = titles[p.pillar] || p.pillar;
        return '<span class="' + cls + '" data-pillar="' + esc(String(p.pillar)) + '" role="button" tabindex="0" title="' + esc(title) + '" aria-label="' + esc(title) + '">' + esc(String(p.icon)) + '</span>';
      }).join('') + '</div>';
    } else {
      pillarsBlock = '<div style="font-size:14px;margin:4px 0;">' + pillars + '</div>';
    }
    return '<div class="prov-card inserat-bar-card prov-list-item"' + dataOfferId + dataCookbookId + dataDate + ' role="button" tabindex="0" style="display:flex;align-items:center;padding:12px 0;border-bottom:1px solid #e5e7eb;width:100%;background:transparent;margin:0;border-radius:0;box-shadow:none;cursor:pointer;">' +
      '<div class="prov-list-item-img-wrap" style="width:100px;height:100px;min-width:100px;border-radius:12px;overflow:hidden;margin-left:0;flex-shrink:0;position:relative;">' +
        '<img src="' + esc(img) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70\'">' +
        badgeHtml +
      '</div>' +
      '<div class="prov-list-item-body" style="flex:1;padding-left:16px;display:flex;flex-direction:column;min-width:0;">' +
        '<h3 class="prov-list-item-title" style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;margin:0;color:#1a1a1a;line-height:1.3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">' + name + '</h3>' +
        pillarsBlock +
        '<div class="prov-list-item-meta-row" style="display:flex;justify-content:flex-start;align-items:center;margin-top:auto;">' +
          '<span class="price-tag" style="font-weight:800;font-size:1.25rem;">' + price + '</span>' +
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
