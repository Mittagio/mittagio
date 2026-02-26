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
    var showAbholBadge = data.showAbholBadge !== false;
    var badgeHtml = (hasAbhol && showAbholBadge) ? '<span class="prov-card-abhol-badge s5-views-abhol-badge">🧾</span>' : '';
    if (compact) {
      return '<div class="prov-card inserat-bar-card kw-slot-compact s5-views-compact-card"' + dataOfferId + dataCookbookId + dataDate + ' role="button" tabindex="0">' +
        '<div class="s5-views-compact-img-wrap">' +
          '<img src="' + esc(img) + '" alt="" class="s5-views-img-cover" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70\'">' +
        '</div>' +
        '<div class="s5-views-compact-body">' +
          '<h3 class="s5-views-compact-title">' + name + '</h3>' +
          '<span class="s5-views-compact-price">' + price + '</span>' +
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
      pillarsBlock = '<div class="s5-views-pillars-text">' + pillars + '</div>';
    }
    return '<div class="prov-card inserat-bar-card prov-list-item s5-views-list-card"' + dataOfferId + dataCookbookId + dataDate + ' role="button" tabindex="0">' +
      '<div class="prov-list-item-img-wrap s5-views-list-img-wrap">' +
        '<img src="' + esc(img) + '" alt="" class="s5-views-img-cover" onerror="this.src=\'https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=200&q=70\'">' +
        badgeHtml +
      '</div>' +
      '<div class="prov-list-item-body s5-views-list-body">' +
        '<h3 class="prov-list-item-title s5-views-list-title">' + name + '</h3>' +
        pillarsBlock +
        '<div class="prov-list-item-meta-row' + (data.dashboardCard ? ' prov-list-item-meta-row-dashboard' : '') + ' s5-views-meta-row">' +
          '<span class="price-tag' + (data.dashboardCard ? ' prov-list-item-price-informational' : '') + ' s5-views-price-tag">' + price + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /** Single Source: Header-Titel für alle 5 Anbieter-Seiten beim Laden setzen.
   * Jede Seite ruft diese Funktion mit dem jeweiligen Titel auf.
   * Wochenplan-FAB (#weekMagicFab): Klickbarkeit/Z-Index/Position in app/style.css (Agent 2026-02-25).
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
