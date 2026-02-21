/* Mittagio App-Logic – Warenkorb, Bestellungen, Abholnummer [Big Split] */
(function(){
  'use strict';
  var SESSION_COOKIE_DAYS = 30;
  if(typeof window !== 'undefined') window.SESSION_COOKIE_DAYS = SESSION_COOKIE_DAYS;

  var LS = window.LS;
  var load = window.load;
  var save = window.save;
  var loadOrders = window.loadOrders;
  var saveOrders = window.saveOrders;
  var offers = window.offers;
  var cart = window.cart;
  var isoDate = window.isoDate;

  if(!loadOrders || !saveOrders){ console.warn('app-logic: loadOrders/saveOrders nicht geladen'); return; }

  function addOrder(order){
    if(order.pickupCode && order.status !== 'PAID'){
      order.pickupCode = undefined;
      order.pickupCodeActivatedAt = undefined;
    }
    var ordersList = loadOrders();
    ordersList.push(order);
    saveOrders(ordersList);
    return order;
  }
  function updateOrder(orderId, patch){
    var ordersList = loadOrders();
    var index = ordersList.findIndex(function(o){ return o.id === orderId; });
    if(index === -1) return null;
    var order = ordersList[index];
    if(patch.pickupCode && patch.status !== 'PAID' && order.status !== 'PAID'){
      patch.pickupCode = undefined;
      patch.pickupCodeActivatedAt = undefined;
    }
    var updated = Object.assign({}, order, patch, { updatedAt: Date.now() });
    ordersList[index] = updated;
    saveOrders(ordersList);
    return updated;
  }
  function getOrderById(orderId){
    var ordersList = loadOrders();
    return ordersList.find(function(o){ return o.id === orderId; }) || null;
  }
  function listActiveOrders(){
    var ordersList = loadOrders();
    return ordersList.filter(function(o){
      return o.status === 'CREATED' || o.status === 'PAYMENT_PENDING' || o.status === 'PAID';
    });
  }
  function generatePickupCode(len){
    len = len || 5;
    var alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    var code = '';
    for(var i = 0; i < len; i++){
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    var ordersList = loadOrders();
    var existingCodes = ordersList.filter(function(o){ return o.pickupCode; }).map(function(o){ return o.pickupCode; });
    if(existingCodes.indexOf(code) >= 0){
      for(var attempt = 0; attempt < 10; attempt++){
        code = '';
        for(i = 0; i < len; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
        if(existingCodes.indexOf(code) < 0) break;
      }
    }
    return code;
  }
  function assignPickupCode(params){
    var providerId = params.providerId, pickupDate = params.pickupDate, dishId = params.dishId;
    var offs = (typeof offers !== 'undefined' ? offers : []);
    var todayOffers = offs.filter(function(o){
      return o.providerId === providerId && o.day === pickupDate && o.active !== false;
    }).sort(function(a, b){
      var timeA = a.createdAt || 0, timeB = b.createdAt || 0;
      if(timeA !== timeB) return timeA - timeB;
      return (a.id || '').localeCompare(b.id || '');
    });
    var dishIndex = todayOffers.findIndex(function(o){ return o.id === dishId; });
    var dishLetter, runningNumber, pickupCode;
    if(dishIndex === -1){
      dishLetter = 'A';
    } else {
      var position = Math.min(dishIndex, 4);
      dishLetter = String.fromCharCode(65 + position);
    }
    var ordersList = loadOrders();
    var existingOrders = ordersList.filter(function(o){
      return o.providerId === providerId && o.pickupDate === pickupDate && o.dishLetter === dishLetter && o.status === 'PAID';
    });
    runningNumber = existingOrders.length + 1;
    pickupCode = runningNumber + dishLetter;
    return { dishLetter: dishLetter, runningNumber: runningNumber, pickupCode: pickupCode };
  }
  function generateDishLetterPickupCode(orderId, dishId, providerIdVal, day){
    var pickupDate = day || (isoDate && isoDate(new Date())) || '';
    var result = assignPickupCode({ providerId: providerIdVal, pickupDate: pickupDate, dishId: dishId });
    return { code: result.pickupCode, dishLetter: result.dishLetter, runningNumber: result.runningNumber };
  }
  function updateHeaderBasket(){
    var badge = document.getElementById('bottomNavBasketBadge');
    if(!badge) return;
    var raw = load(LS.cart, []);
    var c = (raw != null && raw !== undefined) ? raw : [];
    var itemCount = (c && c.items && Array.isArray(c.items))
      ? c.items.reduce(function(sum, it){ return sum + (it && it.qty != null ? it.qty : 0); }, 0)
      : (Array.isArray(c) ? c.length : 0);
    if(itemCount > 0){
      badge.textContent = itemCount > 99 ? '99+' : itemCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
    if(typeof lucide !== 'undefined') setTimeout(function(){ lucide.createIcons(); }, 50);
  }
  function getRemainingPickupMinutes(pickupWindow){
    if(!pickupWindow || typeof pickupWindow !== 'string') return null;
    var match = pickupWindow.match(/(\d{1,2}):(\d{2})\s*[–\-]\s*(\d{1,2}):(\d{2})/);
    if(!match) return null;
    var endH = parseInt(match[3], 10), endM = parseInt(match[4], 10);
    var now = new Date();
    var nowM = now.getHours() * 60 + now.getMinutes();
    var endMinutes = endH * 60 + endM;
    if(nowM >= endMinutes) return 0;
    return endMinutes - nowM;
  }
  function addToCart(o){
    if(!o || !o.hasPickupCode){
      if(typeof alert === 'function') alert('Ohne Abholnummer nur ansehen.');
      return false;
    }
    var c = window.cart;
    if(!c){ c = { providerId: o.providerId, providerName: o.providerName, items: [], pickupTime: '' }; window.cart = c; }
    var idx = c.items.findIndex(function(i){ return i.offerId === o.id; });
    if(idx >= 0) c.items[idx].qty += 1;
    else c.items.push({ offerId: o.id, qty: 1 });
    save(LS.cart, c);
    updateHeaderBasket();
    return true;
  }

  // Provider-Login (aus script.js hierher verschoben [Big Split])
  function performProviderLogin(email){
    var cryptoId = window.cryptoId;
    var saveFn = window.save;
    var LSref = window.LS;
    var providerRef = window.provider;
    var setCookieFn = window.setCookie;
    var sessionName = window.SESSION_COOKIE_NAME || 'mittagio_session_id';
    var sessionDays = window.SESSION_COOKIE_DAYS || 30;
    var loadFn = window.load;
    var closeModal = window.closeProviderLoginModal;
    var showToastFn = window.showToast;
    var setModeFn = window.setMode;
    var showProviderHomeFn = window.showProviderHome;
    var startListingFlowFn = window.startListingFlow;
    var updateProfileViewFn = window.updateProfileView;
    if(!cryptoId || !saveFn || !providerRef || !setCookieFn){ console.warn('performProviderLogin: Abhängigkeiten fehlen'); return; }
    var newSessionId = cryptoId();
    var sessionData = { email: email, sessionId: newSessionId, createdAt: Date.now(), lastActivity: Date.now() };
    saveFn(LSref.providerSession, sessionData);
    saveFn('mittagio_current_session_id', newSessionId);
    setCookieFn(sessionName, newSessionId, sessionDays);
    providerRef.loggedIn = true;
    providerRef.email = email;
    providerRef.current_session_id = newSessionId;
    if(email === 'demo@mittagio.de' || email === 'thomas@thomas-kurz.de'){
      var demoProfile = loadFn('mittagio_demo_provider_profile', null);
      if(demoProfile){
        providerRef.profile = providerRef.profile || {};
        providerRef.profile.name = demoProfile.name || providerRef.profile.name;
        providerRef.profile.address = demoProfile.address || providerRef.profile.address;
        providerRef.profile.street = demoProfile.street || providerRef.profile.street;
        providerRef.profile.zip = demoProfile.zip || providerRef.profile.zip;
        providerRef.profile.city = demoProfile.city || providerRef.profile.city;
        providerRef.profile.logoData = demoProfile.logoData != null ? demoProfile.logoData : providerRef.profile.logoData;
        providerRef.profile.mealWindow = demoProfile.mealWindow || providerRef.profile.mealWindow;
        if(demoProfile.phone != null) providerRef.profile.phone = demoProfile.phone;
        if(demoProfile.email != null) providerRef.profile.email = demoProfile.email;
        if(demoProfile.website != null) providerRef.profile.website = demoProfile.website;
        if(demoProfile.mealStart != null) providerRef.profile.mealStart = demoProfile.mealStart;
        if(demoProfile.mealEnd != null) providerRef.profile.mealEnd = demoProfile.mealEnd;
      }
    }
    saveFn(LSref.provider, providerRef);
    try { localStorage.setItem('user_role', 'provider'); } catch(e){}
    if(closeModal) closeModal();
    if(showToastFn) showToastFn('Erfolgreich eingeloggt! 🎉', 2000);
    if(typeof updateProfileViewFn === 'function') updateProfileViewFn();
    if(setModeFn) setModeFn('provider', { skipView: true });
    providerRef.onboardingCompleted = true;
    saveFn(LSref.provider, providerRef);
    if(showProviderHomeFn) showProviderHomeFn();
    setTimeout(function(){
      if(typeof startListingFlowFn === 'function') startListingFlowFn({ entryPoint: 'dashboard' });
    }, 150);
  }

  window.addOrder = addOrder;
  window.updateOrder = updateOrder;
  window.getOrderById = getOrderById;
  window.listActiveOrders = listActiveOrders;
  window.generatePickupCode = generatePickupCode;
  window.assignPickupCode = assignPickupCode;
  window.generateDishLetterPickupCode = generateDishLetterPickupCode;
  window.updateHeaderBasket = updateHeaderBasket;
  window.getRemainingPickupMinutes = getRemainingPickupMinutes;
  window.addToCart = addToCart;
  window.performProviderLogin = performProviderLogin;
})();
