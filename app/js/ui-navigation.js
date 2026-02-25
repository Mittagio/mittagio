/* Mittagio UI-Navigation – showView, setMode, Navigation [Big Split] */
(function(){
  'use strict';
  var LS = window.LS;
  var save = window.save;
  var mode = window.mode;
  var views = window.views || {
    start:'v-discover', discover:'v-discover', fav:'v-fav', orders:'v-orders', cart:'v-cart', profile:'v-profile',
    pickupCode:'v-pickup-code', checkout:'v-checkout', orderSuccess:'v-order-success', providerLogin:'v-provider-login',
    providerHome:'v-provider-home', providerPickups:'v-provider-pickups', providerCookbook:'v-provider-cookbook',
    providerProfile:'v-provider-profile', providerBilling:'v-provider-billing', providerWeek:'v-provider-week'
  };
  var setProviderPageHeader = window.setProviderPageHeader;
  var renderChips = window.renderChips;
  var renderDiscover = window.renderDiscover;
  var renderFavorites = window.renderFavorites;
  var renderOrders = window.renderOrders;
  var renderCart = window.renderCart;
  var renderProviderHome = window.renderProviderHome;
  var renderProviderPickups = window.renderProviderPickups;
  var renderProviderProfile = window.renderProviderProfile;
  var renderBilling = window.renderBilling;
  var renderCookbook = window.renderCookbook;
  var renderWeekPlan = window.renderWeekPlan;
  var renderWeekPlanBoard = window.renderWeekPlanBoard;
  var updateProfileView = window.updateProfileView;
  var updateHeaderBasket = window.updateHeaderBasket;
  var provider = window.provider;
  var customer = window.customer;
  var ensureProviderFab = window.ensureProviderFab;
  var updateProviderProfileWelcome = window.updateProviderProfileWelcome;
  var checkSessionValidity = window.checkSessionValidity;
  var getScrollElForView = window.getScrollElForView;
  var RESTORE_SCROLL_KEY = window.RESTORE_SCROLL_KEY;
  var closeFullscreenCode = window.closeFullscreenCode;
  var closeQuickPostSheet = window.closeQuickPostSheet;
  var closePublishFeeModal = window.closePublishFeeModal;
  var closeCookbookActionSheet = window.closeCookbookActionSheet;
  var closeCookbookLiveSheet = window.closeCookbookLiveSheet;
  var closeCookbookWeekSheet = window.closeCookbookWeekSheet;
  var closeWeekAddSheet = window.closeWeekAddSheet;
  var hideWeekUndoSnackbar = window.hideWeekUndoSnackbar;
  var startConnectivityCheck = window.startConnectivityCheck;
  var weekPlanKWIndex = window.weekPlanKWIndex;
  var weekPlanDay = window.weekPlanDay;
  var weekPlanMode = window.weekPlanMode;
  var getWeekIndexForDate = window.getWeekIndexForDate;

  function setCustomerNavActive(go){
    document.querySelectorAll('#customerNav .navbtn').forEach(b=>b.classList.toggle('active', b.dataset.go===go));
  }
  function setProviderNavActive(go){
    document.querySelectorAll('#providerNav .navbtn').forEach(b=>b.classList.toggle('active', b.dataset.pgo===go));
  }

  function showView(id){
    const view = document.getElementById(id);
    if(!view){
      console.error('View not found:', id);
      const fallbackView = document.getElementById(views.discover || 'v-discover');
      if(fallbackView) fallbackView.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    var isProviderView = (id && id.indexOf('v-provider-') === 0);
    var customerViewIds = [views.start, views.discover, views.fav, views.orders, views.cart, views.profile, views.orderSuccess, views.pickupCode, views.checkout].filter(Boolean);
    if(!isProviderView && customerViewIds.indexOf(id) !== -1){
      document.body.classList.remove('provider-mode');
      window.mode = 'customer';
      try { if(typeof save === 'function' && typeof LS !== 'undefined') save(LS.mode, window.mode); } catch(e) {}
    }
    if(isProviderView){
      document.body.classList.add('provider-mode');
      if(typeof history !== 'undefined' && history.scrollRestoration !== undefined) history.scrollRestoration = 'manual';
      try {
        document.getElementById('quickPostBd')?.classList.remove('active');
        document.getElementById('quickPostSheet')?.classList.remove('active');
        document.getElementById('publishFeeBd')?.classList.remove('active');
        document.getElementById('publishFeeSheet')?.classList.remove('active');
      } catch(e) {}
    }
    view.classList.add('active');
    if(id === 'v-pickup-code') view.style.display = 'flex';
    else if(id === 'v-provider-week') view.style.cssText = 'display:flex; flex-direction:column; min-height:100vh; visibility:visible; opacity:1;';
    else if(id === 'v-provider-cookbook') view.style.cssText = 'display:flex !important; flex-direction:column !important; height:100vh; height:100dvh; max-height:100vh; max-height:100dvh; overflow:hidden; visibility:visible; opacity:1; width:100%; position:relative;';
    else if(isProviderView) view.style.cssText = 'display:block !important; min-height:100vh; height:auto; width:100%; visibility:visible; opacity:1; position:relative;';
    else view.style.display = 'block';
    document.querySelectorAll('.view').forEach(v => {
      if(v === view) return;
      v.classList.remove('active');
      v.style.setProperty('display', 'none', 'important');
    });
    /* Body-Klassen zentral: alte entfernen, nur neue setzen [cite: GLOBAL NATIVE NAV 2026-02-23] */
    document.body.classList.remove('provider-week-active', 'provider-cookbook-active');
    if (id !== 'v-provider-cookbook') document.body.classList.remove('cookbook-from-dashboard');
    if (id === 'v-provider-week') document.body.classList.add('provider-week-active');
    else if (id === 'v-provider-cookbook') document.body.classList.add('provider-cookbook-active');
    window.scrollTo({ top: 0, behavior: isProviderView ? 'auto' : 'smooth' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    if (isProviderView) {
      var activeEl = document.getElementById(id);
      if (activeEl && activeEl.scrollIntoView) activeEl.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          window.scrollTo({ top: 0, behavior: 'auto' });
          if (document.documentElement) document.documentElement.scrollTop = 0;
          if (document.body) document.body.scrollTop = 0;
          var el = document.getElementById(id);
          if (el) { if (el.scrollTop) el.scrollTop = 0; if (el.scrollIntoView) el.scrollIntoView({ block: 'start', behavior: 'auto' }); }
          var mainEl = document.querySelector('main');
          if (mainEl && mainEl.scrollTop) mainEl.scrollTop = 0;
          var appEl = document.getElementById('app');
          if (appEl && appEl.scrollTop) appEl.scrollTop = 0;
        });
      });
    } else if (id === 'v-provider-login') {
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ window.scrollTo({ top: 0, behavior: 'auto' }); }); });
    }
    try {
      localStorage.setItem('mittagio_last_view', id);
      localStorage.setItem('mittagio_last_mode', window.mode);
    } catch(e) { console.error('Failed to save view state', e); }
    if(typeof lucide !== 'undefined') lucide.createIcons();
    if(id === 'v-provider-profile' && typeof updateProviderProfileWelcome === 'function') updateProviderProfileWelcome();
    if(typeof closeFullscreenCode === 'function') closeFullscreenCode();
    if(typeof closeQuickPostSheet === 'function') closeQuickPostSheet();
    if(typeof closePublishFeeModal === 'function') closePublishFeeModal();
    if(typeof closeCookbookActionSheet === 'function') closeCookbookActionSheet();
    if(typeof closeCookbookLiveSheet === 'function') closeCookbookLiveSheet();
    if(typeof closeCookbookWeekSheet === 'function') closeCookbookWeekSheet();
    const topbar = document.querySelector('.topbar');
    if(topbar){
      if(customerViewIds.indexOf(id) !== -1) topbar.classList.add('customer-context');
      else topbar.classList.remove('customer-context');
    }
    const toggleTopbar = document.getElementById('toggleDiscoverViewTopbar');
    if(toggleTopbar){
      toggleTopbar.style.display = (id === views.discover) ? 'flex' : 'none';
    }
    const fabModeToggle = document.getElementById('fabModeToggle');
    if(fabModeToggle && id !== views.discover){
      fabModeToggle.style.display = 'none';
    }
    const isProv = window.mode === 'provider';
    const isCustomerOrStart = window.mode === 'customer' || window.mode === 'start';
    const customerNavEl = document.getElementById('customerNav');
    const providerNavWrapEl = document.getElementById('providerNavWrap');
    if(customerNavEl) customerNavEl.style.display = isCustomerOrStart ? 'flex' : 'none';
    if(providerNavWrapEl) providerNavWrapEl.style.display = isProv ? 'block' : 'none';
    if(isCustomerOrStart){
      var go = (id === 'v-discover') ? 'discover' : (id === 'v-profile') ? 'profile' : (id === 'v-cart') ? 'cart' : (id === 'v-fav') ? 'fav' : (id === 'v-orders') ? 'orders' : null;
      if(go) setCustomerNavActive(go);
    }
    if(window.mode === 'provider') ensureProviderFab(id === 'v-provider-home');
    else ensureProviderFab(false);
  }

  function setMode(next, opts){
    if (next == null || next === undefined) return;
    if (!LS || typeof save !== 'function'){ console.warn('setMode: LS/save nicht geladen'); return; }
    opts = (opts && typeof opts === 'object') ? opts : {};
    window.mode = next;
    save(LS.mode, window.mode);
    const isProv = window.mode==='provider';
    const isStart = window.mode==='start';
    const isCustomer = window.mode==='customer';
    const customerNav = document.getElementById('customerNav');
    const providerNavWrap = document.getElementById('providerNavWrap');
    const providerNav = document.getElementById('providerNav');
    const statusIndicator = document.getElementById('providerStatusIndicator');
    if(customerNav) customerNav.style.display = (isCustomer || isStart) ? 'flex' : 'none';
    if(providerNavWrap) providerNavWrap.style.display = isProv ? 'block' : 'none';
    if(statusIndicator) statusIndicator.style.display = (isProv && provider && provider.loggedIn) ? 'flex' : 'none';
    if(isProv && provider && provider.loggedIn){
      document.body.classList.add('provider-mode');
      if(typeof history !== 'undefined' && history.scrollRestoration !== undefined) history.scrollRestoration = 'manual';
      try {
        document.getElementById('quickPostBd')?.classList.remove('active');
        document.getElementById('quickPostSheet')?.classList.remove('active');
        document.getElementById('publishFeeBd')?.classList.remove('active');
        document.getElementById('publishFeeSheet')?.classList.remove('active');
      } catch(e) {}
    } else {
      document.body.classList.remove('provider-mode');
    }
    updateHeaderBasket();
    if(opts.skipView) return;
    if(isStart){
      if(!customer || !customer.loggedIn){
        setMode('customer');
        showDiscover();
        return;
      }
      showStart();
      return;
    }
    if(isProv){
      if(!provider || !provider.loggedIn){
        showView(views.providerLogin);
      } else {
        const lastView = localStorage.getItem('mittagio_last_view');
        const lastMode = localStorage.getItem('mittagio_last_mode');
        const providerMainViews = ['v-provider-home','v-provider-pickups','v-provider-week','v-provider-cookbook','v-provider-profile','v-provider-billing'];
        const canRestore = lastMode === 'provider' && lastView && providerMainViews.indexOf(lastView) !== -1 && document.getElementById(lastView);
        if(canRestore){
          showView(lastView);
          var navGo = (lastView === 'v-provider-home') ? 'provider-home' : (lastView === 'v-provider-pickups') ? 'provider-pickups' : (lastView === 'v-provider-week') ? 'provider-week' : (lastView === 'v-provider-cookbook') ? 'provider-cookbook' : (lastView === 'v-provider-profile' || lastView === 'v-provider-billing') ? 'provider-profile' : 'provider-home';
          setProviderNavActive(navGo);
          var headerTitles = { 'v-provider-home':'Meine Küche', 'v-provider-pickups':'Abholnummern', 'v-provider-week':'Wochenplan', 'v-provider-cookbook':'Mein Kochbuch', 'v-provider-profile':'Mein Profil', 'v-provider-billing':'Mein Profil' };
          if(typeof setProviderPageHeader === 'function' && headerTitles[lastView]) setProviderPageHeader(headerTitles[lastView]);
          requestAnimationFrame(function(){
            if(lastView === 'v-provider-home') renderProviderHome();
            else if(lastView === 'v-provider-pickups') renderProviderPickups();
            else if(lastView === 'v-provider-week'){ if(typeof renderWeekPlanBoard === 'function') renderWeekPlanBoard(); else renderWeekPlan(); }
            else if(lastView === 'v-provider-cookbook') renderCookbook();
            else if(lastView === 'v-provider-profile') renderProviderProfile();
            else if(lastView === 'v-provider-billing') renderBilling();
            var scrollEl = getScrollElForView ? getScrollElForView(lastView) : null;
            var savedScroll = null;
            try { savedScroll = sessionStorage.getItem(RESTORE_SCROLL_KEY + '_' + lastView); } catch(s){}
            if(scrollEl && savedScroll !== null && savedScroll !== '' && !isNaN(parseInt(savedScroll,10))){
              scrollEl.scrollTop = parseInt(savedScroll,10);
              try { sessionStorage.removeItem(RESTORE_SCROLL_KEY + '_' + lastView); } catch(r){}
            } else if(lastView === 'v-provider-home' && scrollEl && scrollEl.scrollTop) scrollEl.scrollTop = 0;
            if(typeof lucide !== 'undefined') lucide.createIcons();
          });
        } else {
          showProviderHome();
        }
      }
    } else {
      const lastView = localStorage.getItem('mittagio_last_view');
      const lastMode = localStorage.getItem('mittagio_last_mode');
      if((lastMode === 'customer' || lastMode === 'start') && lastView && document.getElementById(lastView)){
        showView(lastView);
        if(lastView === views.discover) { renderChips(); renderDiscover(); }
        else if(lastView === views.fav) renderFavorites();
        else if(lastView === views.orders) renderOrders();
        else if(lastView === views.profile) updateProfileView();
        else if(lastView === 'v-start') window.renderStart();
      } else {
        showDiscover();
      }
    }
  }

  function handleLogoClick(){
    if(window.mode === 'provider'){
      showProviderHome();
    } else if(window.mode === 'start'){
      showStart();
    } else {
      showDiscover();
    }
  }

  function pushViewState(state, url, doPush){
    if (doPush === false) {
      if (typeof history.replaceState === 'function') history.replaceState(state, '', url || location.pathname);
      return;
    }
    if (window.__navSuppressPush) return;
    url = url || location.pathname;
    if (typeof history.replaceState === 'function' && history.length === 1) {
      history.replaceState(state, '', url);
      if (typeof history.pushState === 'function') history.pushState(state, '', url);
    } else if (typeof history.pushState === 'function') {
      history.pushState(state, '', url);
    }
  }

  /** Aktuelle Sektion aus aktivem View [cite: GLOBAL NATIVE NAV 2026-02-23] */
  function getCurrentSection(){
    var av = document.querySelector('.view.active');
    if (!av || !av.id) return null;
    var map = { 'v-provider-home':'dashboard', 'v-provider-cookbook':'cookbook', 'v-provider-week':'week', 'v-provider-profile':'profile', 'v-provider-pickups':'pickups', 'v-provider-billing':'billing' };
    return map[av.id] || av.id;
  }

  /** Wizard/InseratCard offen? [cite: GLOBAL NATIVE NAV 2026-02-23] */
  function isWizardOpen(){
    var w = document.getElementById('wizard');
    var wbd = document.getElementById('wbd');
    return !!(w && wbd && (w.classList.contains('active') || wbd.classList.contains('active')));
  }

  /** Profil-Sub (Settings, Business, etc.) sichtbar? [cite: GLOBAL NATIVE NAV 2026-02-23] */
  function isProfileSubOpen(){
    var main = document.getElementById('providerProfileMainContent');
    return !!(main && main.style.display === 'none');
  }

  /** Andere Sheets/Modals offen (KW-Selector, Magic-Sheet, CreateFlow, WeekAdd)? [cite: GLOBAL NATIVE NAV 2026-02-23] */
  function isAnySheetOpen(){
    var ids = ['kwSelectorSheet','weekMagicSheet','createFlowSheet','quickPostSheet','publishFeeSheet','codeSheet','codeBd','weekAddSheet'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && (el.classList.contains('active') || (el.style && el.style.display !== 'none'))) return true;
    }
    var kwBd = document.getElementById('kwSelectorBd');
    var magicBd = document.getElementById('weekMagicSheetBd');
    var createBd = document.getElementById('createFlowBd');
    var weekAddBd = document.getElementById('weekAddSheetBd');
    if (kwBd && kwBd.style.display !== 'none') return true;
    if (magicBd && magicBd.style.display !== 'none') return true;
    if (createBd && createBd.classList.contains('active')) return true;
    if (weekAddBd && weekAddBd.style.display !== 'none') return true;
    return false;
  }

  /** showSection: Zentrale Navigation mit History + Body-Klassen [cite: GLOBAL NATIVE NAV 2026-02-23] */
  function showSection(sectionId, doPush){
    if (doPush === undefined) doPush = true;
    window.__navSuppressPush = !doPush;
    var fn = null;
    if (sectionId === 'dashboard') fn = showProviderHome;
    else if (sectionId === 'cookbook') fn = showProviderCookbook;
    else if (sectionId === 'week') fn = showProviderWeek;
    else if (sectionId === 'profile') fn = showProviderProfile;
    else if (sectionId === 'pickups') fn = showProviderPickups;
    else if (sectionId === 'billing') fn = showProviderBilling;
    if (fn) {
      fn();
      if (!doPush && typeof history.replaceState === 'function') {
        var viewMap = { dashboard:'v-provider-home', cookbook:'v-provider-cookbook', week:'v-provider-week', profile:'v-provider-profile', pickups:'v-provider-pickups', billing:'v-provider-billing' };
        history.replaceState({ section: sectionId, view: viewMap[sectionId], mode: window.mode }, '', location.pathname);
      }
    }
    window.__navSuppressPush = false;
  }

  /** handleBack: Zentrale Zurück-Logik – nutzt history.back() für echten Verlauf [cite: DASHBOARD 2.1] */
  function handleBack(){
    try { if (typeof haptic === 'function') haptic(6); else if (navigator.vibrate) navigator.vibrate(10); } catch(e){}
    if (window.mode === 'provider') {
      if (isWizardOpen() && typeof closeMastercard === 'function') {
        closeMastercard();
        return;
      }
      if (isProfileSubOpen() && typeof showProviderProfileSub === 'function') {
        showProviderProfileSub(null);
        return;
      }
      if (isAnySheetOpen()) {
        if (typeof closeWeekAddSheet === 'function') closeWeekAddSheet();
        if (typeof closeWeekMagicSheet === 'function') closeWeekMagicSheet();
        if (typeof closeKWSelector === 'function') closeKWSelector();
        if (typeof closeCreateFlowSheet === 'function') closeCreateFlowSheet();
        if (typeof closeQuickPostSheet === 'function') closeQuickPostSheet();
        if (typeof closePublishFeeModal === 'function') closePublishFeeModal();
        return;
      }
    }
    if (typeof history !== 'undefined' && history.length > 1) {
      history.back();
    } else {
      if (window.mode === 'provider' && typeof showProviderHome === 'function') showProviderHome();
      else if (typeof showDiscover === 'function') showDiscover();
    }
  }

  /** Popstate: Hardware-Zurück – UI aus event.state wiederherstellen [cite: DASHBOARD 2.1] */
  function initPopstateHandler(){
    window.addEventListener('popstate', function(event){
      try { if (navigator.vibrate) navigator.vibrate(10); } catch(e){}
      if (window.mode !== 'provider') return;
      if (isWizardOpen() && (typeof closeMastercardWithAnim === 'function' || typeof closeMastercard === 'function')) {
        var wiz = document.getElementById('wizard');
        if (wiz && wiz.getAttribute('data-flow') === 'listing' && typeof closeMastercardWithAnim === 'function') {
          var card = document.querySelector('#wizard .mastercard-container, #wizard .liquid-master-panel');
          closeMastercardWithAnim(card);
        } else {
          closeMastercard();
        }
        return;
      }
      if (isProfileSubOpen() && typeof showProviderProfileSub === 'function') {
        showProviderProfileSub(null);
        return;
      }
      if (isAnySheetOpen()) {
        if (typeof closeWeekAddSheet === 'function') closeWeekAddSheet();
        if (typeof closeWeekMagicSheet === 'function') closeWeekMagicSheet();
        if (typeof closeKWSelector === 'function') closeKWSelector();
        if (typeof closeCreateFlowSheet === 'function') closeCreateFlowSheet();
        if (typeof closeQuickPostSheet === 'function') closeQuickPostSheet();
        if (typeof closePublishFeeModal === 'function') closePublishFeeModal();
        return;
      }
      /* Wochenplan: Slide-Out bei Hardware-Zurück [cite: 2026-02-18, 2026-02-25] */
      if (document.body.classList.contains('provider-week-active') && typeof closeWeekplanWithNativeAnim === 'function') {
        var targetSection = (event.state && event.state.section) ? event.state.section : 'dashboard';
        closeWeekplanWithNativeAnim(targetSection);
        return;
      }
      /* Gesten-Fix: Im Kochbuch führt Zurück-Wischen zum Dashboard, App nicht verlassen [cite: 2026-02-18, 2026-02-25] */
      var cookbookView = document.getElementById('v-provider-cookbook');
      if (cookbookView && cookbookView.classList.contains('active')) {
        try { if (navigator.vibrate) navigator.vibrate(5); } catch(e){}
        showSection('dashboard', false);
        return;
      }
      var state = event.state;
      /* Fail-Safe: state null/undefined obwohl Wochenplan oder Kochbuch aktiv – zwingend zum Dashboard [cite: 2026-02-25] */
      if (!state || state.section == null) {
        var current = getCurrentSection();
        if (current === 'week' || current === 'cookbook') {
          try { if (navigator.vibrate) navigator.vibrate(5); } catch(e){}
          showSection('dashboard', false);
          return;
        }
      }
      if (state && state.section) {
        showSection(state.section, false);
        if (state.section === 'week') {
          if (typeof state.week === 'number') window.weekPlanKWIndex = state.week;
          if (typeof state.day === 'string') window.weekPlanDay = state.day;
          if (typeof renderWeekPlanBoard === 'function') renderWeekPlanBoard();
        }
      } else {
        var current = getCurrentSection();
        if (current && current !== 'dashboard') showSection('dashboard', false);
      }
    });
  }

  function showStart(){
    const navBtn = document.querySelector('#customerNav button[data-go="discover"]');
    if(navBtn){
      document.querySelectorAll('#customerNav .navbtn').forEach(b=>b.classList.remove('active'));
      navBtn.classList.add('active');
    }
    showView(views.start);
    window.renderStart();
    pushViewState({view: 'start', mode: window.mode}, location.pathname);
  }

  function showDiscover(){
    setCustomerNavActive('discover');
    showView(views.discover);
    renderChips();
    renderDiscover();
    ensureProviderFab(false);
    document.querySelectorAll('[id="pickupCodeContainer"]').forEach(function(el){ el.innerHTML = ''; });
    const dynamicView = document.getElementById('v-pickup-code-dynamic');
    if(dynamicView && dynamicView.parentNode) dynamicView.parentNode.removeChild(dynamicView);
    const fabModeToggle = document.getElementById('fabModeToggle');
    if(fabModeToggle) fabModeToggle.style.display = 'flex';
    const toggleTopbar = document.getElementById('toggleDiscoverViewTopbar');
    if(toggleTopbar) toggleTopbar.style.display = 'flex';
    pushViewState({view: 'discover', mode: window.mode}, location.pathname);
  }
  function showFav(){
    setCustomerNavActive('fav');
    showView(views.fav);
    const toggleTopbar = document.getElementById('toggleDiscoverViewTopbar');
    if(toggleTopbar) toggleTopbar.style.display = 'none';
    renderFavorites();
    const upcomingPreview = document.getElementById('favUpcomingPreview');
    if(upcomingPreview){
      upcomingPreview.style.display = 'none';
      upcomingPreview.style.opacity = '0';
    }
    pushViewState({view: 'fav', mode: window.mode}, location.pathname);
  }
  function showOrders(){
    setCustomerNavActive('orders');
    showView(views.orders);
    renderOrders();
    pushViewState({view: 'orders', mode: window.mode}, location.pathname);
  }
  function showCart(){
    setCustomerNavActive('cart');
    showView(views.cart);
    renderCart();
    pushViewState({view: 'cart', mode: window.mode}, location.pathname);
  }
  function showProfile(){
    setCustomerNavActive('profile');
    const pickupCodeView = document.getElementById('v-pickup-code');
    if(pickupCodeView){
      pickupCodeView.style.display = 'none';
      pickupCodeView.classList.remove('active');
    }
    showView(views.profile);
    updateProfileView();
    lucide.createIcons();
    pushViewState({view: 'profile', mode: window.mode}, location.pathname);
  }

  function openCodeSheetWithOrder(order){
    if(!order) return;
    const code = order.pickupCode || order.code || '';
    window.activeOrderId = order.id;
    const codeTextEl = document.getElementById('codeText');
    const codeProviderEl = document.getElementById('codeProvider');
    const codeSummaryEl = document.getElementById('codeSummary');
    const codePickupWindowEl = document.getElementById('codePickupWindow');
    const codePickupTimeEl = document.getElementById('codePickupTime');
    const codeStatusEl = document.getElementById('codeStatus');
    const btnToggle = document.getElementById('btnToggleOrderStatus');
    const isPickedUp = order.status === 'PICKED_UP' || order.status === 'abgeholt';
    var offers = window.offers || [];
    if(codeTextEl) codeTextEl.textContent = code || '–';
    if(codeProviderEl) codeProviderEl.textContent = order.providerName || 'Anbieter';
    if(codeSummaryEl) codeSummaryEl.textContent = order.dishName || order.summary || '–';
    if(codePickupWindowEl) codePickupWindowEl.textContent = order.pickupWindow ? 'Essenszeit: ' + order.pickupWindow : 'Essenszeit: –';
    if(codePickupTimeEl) codePickupTimeEl.textContent = order.pickupTime || 'offen';
    if(codeStatusEl) codeStatusEl.textContent = isPickedUp ? 'Status: abgeholt' : 'Status: offen';
    if(btnToggle) btnToggle.textContent = isPickedUp ? 'Als offen markieren' : 'Als abgeholt markieren';
    const logoEl = document.getElementById('codeProviderLogo');
    if(logoEl){
      const offer = offers.length ? offers.find(o => o.providerName === order.providerName) : null;
      if(offer && offer.providerLogo) logoEl.innerHTML = '<img src="' + (offer.providerLogo || '') + '" alt="Logo" />';
      else logoEl.innerHTML = '';
    }
    document.getElementById('codeBd').classList.add('active');
    document.getElementById('codeSheet').classList.add('active');
    if(typeof lucide !== 'undefined') setTimeout(function(){ lucide.createIcons(); }, 50);
  }

  function showPickupCode(orderId){
    const getOrderById = window.getOrderById;
    const order = getOrderById ? getOrderById(orderId) : null;
    if(!order){
      window.showToast('Bestellung nicht gefunden');
      showDiscover();
      return;
    }
    if(order.status !== 'PAID' && order.status !== 'PICKED_UP'){
      window.showToast('Zahlung noch nicht bestätigt');
      showOrders();
      return;
    }
    window.currentPickupOrderId = orderId;
    openCodeSheetWithOrder(order);
  }

  function showProviderHome(){
    if(!checkSessionValidity()) return;
    setProviderNavActive('provider-home');
    showView(views.providerHome);
    if(typeof setProviderPageHeader === 'function') setProviderPageHeader('Meine Küche');
    renderProviderHome();
    function scrollProviderHomeToTop(){
      window.scrollTo(0, 0);
      if(document.documentElement) document.documentElement.scrollTop = 0;
      if(document.body) document.body.scrollTop = 0;
      var home = document.getElementById('v-provider-home');
      if(home && home.scrollTop) home.scrollTop = 0;
      var wrap = home && home.querySelector('.dashboard-floating-wrap');
      if(wrap && wrap.scrollTop) wrap.scrollTop = 0;
      var mainEl = document.querySelector('main');
      if(mainEl && mainEl.scrollTop) mainEl.scrollTop = 0;
    }
    scrollProviderHomeToTop();
    setTimeout(scrollProviderHomeToTop, 50);
    setTimeout(scrollProviderHomeToTop, 150);
    requestAnimationFrame(function(){ requestAnimationFrame(scrollProviderHomeToTop); });
    if(window.mode === 'provider' && provider && provider.loggedIn){
      startConnectivityCheck();
      if(typeof lucide !== 'undefined') setTimeout(() => lucide.createIcons(), 50);
    }
    const providerNavBackRow = document.getElementById('providerNavBackRow');
    if(providerNavBackRow) providerNavBackRow.style.display = 'none';
    pushViewState({section: 'dashboard', view: 'provider-home', mode: window.mode}, location.pathname);
  }
  function showProviderPickups(){
    if(!checkSessionValidity()) return;
    document.body.classList.remove('provider-week-active');
    if(typeof closeWeekAddSheet === 'function') closeWeekAddSheet();
    if(typeof hideWeekUndoSnackbar === 'function') hideWeekUndoSnackbar();
    document.querySelectorAll('.kw-move-overlay').forEach(function(o){ o.remove(); });
    var wb = document.getElementById('weekAddSheetBd');
    var ws = document.getElementById('weekAddSheet');
    if(wb) wb.style.display = 'none';
    if(ws){ ws.classList.remove('active'); ws.style.display = 'none'; }
    var wu = document.getElementById('weekUndoSnackbar');
    if(wu){ wu.classList.remove('active'); wu.style.display = 'none'; }
    setProviderNavActive('provider-pickups');
    showView(views.providerPickups);
    if(typeof setProviderPageHeader === 'function') setProviderPageHeader('Abholnummern');
    renderProviderPickups();
    const providerNavBackRow = document.getElementById('providerNavBackRow');
    if(providerNavBackRow) providerNavBackRow.style.display = 'block';
    pushViewState({section: 'pickups', view: 'provider-pickups', mode: window.mode}, location.pathname);
  }
  function showProviderWeek(preselectDay, preselectKW){
    if(!checkSessionValidity()) return;
    var params = new URLSearchParams(location.search);
    var urlWeek = params.get('week');
    var urlDay = params.get('day');
    if (urlWeek !== null && urlWeek !== '') { var w = parseInt(urlWeek, 10); if (!isNaN(w) && w >= 0 && w < 8) window.weekPlanKWIndex = w; }
    if (urlDay !== null && urlDay !== '' && /^\d{4}-\d{2}-\d{2}$/.test(urlDay)) window.weekPlanDay = urlDay;
    if (preselectDay && typeof preselectDay === 'string') { window.weekPlanDay = preselectDay; if (typeof getWeekIndexForDate === 'function') window.weekPlanKWIndex = Math.max(0, getWeekIndexForDate(preselectDay)); }
    if (typeof preselectKW === 'number' && preselectKW >= 0 && preselectKW < 8) window.weekPlanKWIndex = preselectKW;
    window.weekPlanMode = 'overview';
    /* Handy-Back-Taste: Vor Wochenplan immer Dashboard-State im Stack, damit popstate zum Dashboard führt [cite: Plan Wochenplan 2026-02-25] */
    if (typeof history !== 'undefined' && (!history.state || history.state.section !== 'dashboard')) {
      if (typeof history.pushState === 'function') history.pushState({ section: 'dashboard', view: 'provider-home', mode: typeof window.mode !== 'undefined' ? window.mode : 'provider' }, '', location.pathname);
    }
    setProviderNavActive('provider-week');
    showView(views.providerWeek);
    if(typeof setProviderPageHeader === 'function') setProviderPageHeader('Wochenplan');
    if(typeof renderWeekPlanBoard === 'function') renderWeekPlanBoard(); else renderWeekPlan();
    var newPath = location.pathname + '?week=' + window.weekPlanKWIndex + '&day=' + window.weekPlanDay;
    pushViewState({section: 'week', view: 'provider-week', mode: window.mode, week: window.weekPlanKWIndex, day: window.weekPlanDay}, newPath);
    /* Master-Fix: Kein scroll-basierter Header – weekHeaderCompact bleibt permanent sticky */
  }
  function showProviderCookbook(){
    if(!checkSessionValidity()) return;
    if(typeof window.closeSaveSuccessSheet === 'function') window.closeSaveSuccessSheet();
    if(typeof closeCookbookActionSheet === 'function') closeCookbookActionSheet();
    document.body.classList.remove('provider-week-active');
    if(window.createFlowOriginView === 'dashboard') document.body.classList.add('cookbook-from-dashboard');
    setProviderNavActive('provider-cookbook');
    showView(views.providerCookbook);
    if(typeof setProviderPageHeader === 'function') setProviderPageHeader('Mein Kochbuch');
    renderCookbook();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(typeof renderCookbook === 'function') renderCookbook(); }); });
    const providerNavBackRow = document.getElementById('providerNavBackRow');
    if(providerNavBackRow) providerNavBackRow.style.display = 'none';
    pushViewState({section: 'cookbook', view: 'provider-cookbook', mode: window.mode}, location.pathname);
  }
  function showProviderProfile(){
    if(!checkSessionValidity()) return;
    setProviderNavActive('provider-profile');
    showView(views.providerProfile);
    if(typeof setProviderPageHeader === 'function') setProviderPageHeader('Mein Profil');
    window.showProviderProfileSub(null);
    renderProviderProfile();
    if(typeof lucide !== 'undefined') setTimeout(function(){ lucide.createIcons(); }, 80);
    const providerNavBackRow = document.getElementById('providerNavBackRow');
    if(providerNavBackRow) providerNavBackRow.style.display = 'block';
    pushViewState({section: 'profile', view: 'provider-profile', mode: window.mode}, location.pathname);
  }
  function showProviderBilling(){
    if(!checkSessionValidity()) return;
    setProviderNavActive('provider-profile');
    showView(views.providerBilling);
    renderBilling();
    pushViewState({section: 'billing', view: 'provider-billing', mode: window.mode}, location.pathname);
  }

  function showCheckout(){
    var cart = window.cart;
    var offers = window.offers || [];
    var normalizeOffer = window.normalizeOffer;
    var isNavigatingBack = window.isNavigatingBack;
    var navigationHistory = window.navigationHistory || [];
    var locationQuery = window.locationQuery;
    var activeCat = window.activeCat;
    var activeDay = window.activeDay;
    var activeDiscoverFilter = window.activeDiscoverFilter;
    var isoDate = window.isoDate;
    if(!cart || !cart.items || !cart.items.length){
      showCart();
      return;
    }
    var hasPayment = cart.items.every(function(it){
      var o = offers.find(function(x){ return x.id===it.offerId; });
      return o && normalizeOffer(o).hasPickupCode;
    });
    if(!hasPayment){
      alert('Diese Bestellung enthält Gerichte ohne Abholnummer. Bitte wähle Angebote mit Abholnummer aus.');
      return;
    }
    var total = 0;
    cart.items.forEach(function(it){
      var o = offers.find(function(x){ return x.id===it.offerId; });
      if(o){
        var normalized = normalizeOffer(o);
        total += Number(normalized.price||0) * it.qty;
      }
    });
    if(total <= 0){
      alert('Bitte wähle mindestens ein Gericht aus.');
      return;
    }
    window.renderCheckout(total);
    showView(views.checkout);
    setCustomerNavActive('cart');
    if(!isNavigatingBack && navigationHistory && navigationHistory.push){
      navigationHistory.push({
        view: 'cart',
        locationQuery: locationQuery || '',
        activeCat: activeCat || null,
        activeDay: activeDay || (isoDate ? isoDate(new Date()) : ''),
        activeFilter: activeDiscoverFilter || 'near',
        scrollY: window.scrollY
      });
      pushViewState({view: 'checkout'}, '#checkout');
    }
  }

  window.showView = showView;
  window.setMode = setMode;
  window.setCustomerNavActive = setCustomerNavActive;
  window.setProviderNavActive = setProviderNavActive;
  window.showSection = showSection;
  window.getCurrentSection = getCurrentSection;
  window.isWizardOpen = isWizardOpen;
  window.isProfileSubOpen = isProfileSubOpen;
  window.isAnySheetOpen = isAnySheetOpen;
  window.showStart = showStart;
  window.showDiscover = showDiscover;
  window.showFav = showFav;
  window.showOrders = showOrders;
  window.showCart = showCart;
  window.showProfile = showProfile;
  window.showProviderHome = showProviderHome;
  window.showProviderPickups = showProviderPickups;
  window.showProviderWeek = showProviderWeek;
  window.showProviderCookbook = showProviderCookbook;
  window.showProviderProfile = showProviderProfile;
  window.showProviderBilling = showProviderBilling;
  window.showCheckout = showCheckout;
  window.handleLogoClick = handleLogoClick;
  window.handleBack = handleBack;
  window.pushViewState = pushViewState;
  window.openCodeSheetWithOrder = openCodeSheetWithOrder;
  window.showPickupCode = showPickupCode;
  if (typeof window.addEventListener === 'function') initPopstateHandler();
})();
