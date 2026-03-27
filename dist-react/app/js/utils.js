/* Mittagio Utils – Haptik, Datum, Formatierung, Normalisierung [Big Split] */
(function(){
  'use strict';

  function haptic(ms){ try { if(navigator.vibrate) navigator.vibrate(ms !== undefined ? ms : 10); } catch(e){} }
  function euro(n){ const v = Number(n||0); return v.toFixed(2).replace('.',',') + ' €'; }
  function cryptoId(){ return 'id_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16); }
  function esc(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#039;'}[c])); }
  function getDayName(date){ const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']; return days[date.getDay()]; }
  function isoDate(d){ return d.toISOString().slice(0,10); }
  function fmtDay(d, includeToday){
    const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const wd = weekdays[d.getDay()];
    const day = String(d.getDate()).padStart(2,'0');
    const month = String(d.getMonth()+1).padStart(2,'0');
    if(includeToday){
      const today = new Date();
      if(d.toDateString() === today.toDateString()) return `Heute, ${wd} ${day}.${month}.`;
    }
    return `${wd}, ${day}.${month}.`;
  }
  function fmtDateWithTime(d, timeRange){ return fmtDay(d) + (timeRange ? ` · ${timeRange}` : ''); }
  function allergenFirstWord(label){ if(!label) return ''; return String(label).trim().split(/\s+/)[0] || label; }

  const SESSION_COOKIE_DAYS = 30;
  function getCookie(name){
    const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }
  function setCookie(name, value, days){
    const maxAge = (days || SESSION_COOKIE_DAYS) * 24 * 60 * 60;
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + maxAge + '; SameSite=Lax';
  }
  function deleteCookie(name){ document.cookie = name + '=; path=/; max-age=0'; }

  const DEFAULT_MEAL_WINDOW = '11:30 – 14:00';
  function buildAddress(p){
    if(p && p.address && String(p.address).trim()) return String(p.address).trim();
    const rest = [p?.zip, p?.city].filter(Boolean).join(' ').trim();
    return [p?.street, rest].filter(Boolean).join(', ');
  }
  function parseAddress(addr){
    const raw = String(addr||'').trim();
    const out = { address: raw, street:'', zip:'', city:'' };
    if(!raw) return out;
    const parts = raw.split(',').map(s=>s.trim()).filter(Boolean);
    if(parts.length) out.street = parts[0];
    if(parts.length > 1){
      const rest = parts.slice(1).join(', ');
      const m = rest.match(/^(\d{4,6})\s*(.*)$/);
      if(m){ out.zip = m[1]; out.city = m[2] || ''; }
      else out.city = rest;
    }
    return out;
  }
  function normalizeProviderProfile(p){
    const base = { name:'', address:'', street:'', zip:'', city:'', mealWindow:DEFAULT_MEAL_WINDOW, mealStart:'11:30', mealEnd:'14:00', lunchWeekdays:[1,2,3,4,5], phone:'', email:'', website:'', logoData:'', kitchenEmail:'', autoSelloutTime:'', reuseEnabledByDefault:false, abholnummerEnabledByDefault:false, wantsAllergensByDefault:false, defaultExtras:[], defaultAllergens:[] };
    const out = {...base, ...(p||{})};
    if(!Array.isArray(out.defaultExtras)) out.defaultExtras = [];
    if(!Array.isArray(out.defaultAllergens)) out.defaultAllergens = [];
    if(!out.address) out.address = buildAddress(out);
    if(!out.mealWindow) out.mealWindow = DEFAULT_MEAL_WINDOW;
    if(!Array.isArray(out.lunchWeekdays)) out.lunchWeekdays = [1,2,3,4,5];
    return out;
  }
  function formatLunchWeekdays(arr){
    const labels = ['','Mo','Di','Mi','Do','Fr','Sa','So'];
    if(!arr || arr.length===0) return '–';
    const sorted = [...arr].sort((a,b)=>a-b);
    if(sorted.length===7) return 'Mo–So';
    if(sorted.length===5 && sorted[0]===1 && sorted[4]===5) return 'Mo–Fr';
    return sorted.map(d=>labels[d]).filter(Boolean).join(', ');
  }
  function seededInfoKey(str){ const s = String(str||''); let h = 0; for(let i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) % 10000; } return h; }
  function seededInfo(str){ const h = seededInfoKey(str); return { distanceKm: Number((0.5 + (h % 80) / 10).toFixed(1)) }; }
  function normalizeOffer(o){
    const out = {...(o||{})};
    if(!out.dish && out.title) out.dish = out.title;
    if(!out.imageUrl && out.img) out.imageUrl = out.img;
    if(!out.pickupWindow && out.time) out.pickupWindow = out.time;
    if(!out.category && out.diet) out.category = out.diet;
    if(out.address && (!out.providerStreet && !out.providerZip && !out.providerCity)){
      const parsed = parseAddress(out.address);
      out.providerStreet = out.providerStreet || parsed.street || '';
      out.providerZip = out.providerZip || parsed.zip || '';
      out.providerCity = out.providerCity || parsed.city || '';
    }
    out.providerStreet = out.providerStreet || '';
    out.providerZip = out.providerZip || '';
    out.providerCity = out.providerCity || '';
    out.hasPickupCode = !!out.hasPickupCode;
    out.dineInPossible = !!out.dineInPossible;
    if(out.active === undefined) out.active = true;
    const info = seededInfo(out.dish || out.providerName || out.providerId);
    if(out.distanceKm == null) out.distanceKm = info.distanceKm;
    return out;
  }

  /* Expose to global */
  window.haptic = haptic;
  window.euro = euro;
  window.cryptoId = cryptoId;
  window.esc = esc;
  window.getDayName = getDayName;
  window.isoDate = isoDate;
  window.fmtDay = fmtDay;
  window.fmtDateWithTime = fmtDateWithTime;
  window.allergenFirstWord = allergenFirstWord;
  window.getCookie = getCookie;
  window.setCookie = setCookie;
  window.deleteCookie = deleteCookie;
  window.buildAddress = buildAddress;
  window.parseAddress = parseAddress;
  window.normalizeProviderProfile = normalizeProviderProfile;
  window.formatLunchWeekdays = formatLunchWeekdays;
  window.seededInfo = seededInfo;
  window.normalizeOffer = normalizeOffer;
  window.DEFAULT_MEAL_WINDOW = DEFAULT_MEAL_WINDOW;
  window.SESSION_COOKIE_DAYS = SESSION_COOKIE_DAYS;
})();
