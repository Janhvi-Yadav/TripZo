/* ═══════════════════════════════════════════
   TRIPZO – travel.js
   Auth, Nav, Contact, Booking, Back-to-top
═══════════════════════════════════════════ */

/* ── NAV TOGGLE ── */
function toggleNav(){
  const list=document.getElementById('nav-list');
  const btn=document.getElementById('hamburger');
  if(!list) return;
  list.classList.toggle('open');
  if(btn) btn.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('#nav-list a').forEach(a=>{
    a.addEventListener('click',()=>{
      const l=document.getElementById('nav-list');
      const b=document.getElementById('hamburger');
      if(l) l.classList.remove('open');
      if(b) b.classList.remove('open');
    });
  });
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll',function(){
  const nb=document.getElementById('navbar');
  const bt=document.getElementById('backTop');
  if(nb) nb.classList.toggle('scrolled',window.scrollY>60);
  if(bt) bt.classList.toggle('visible',window.scrollY>400);
});

/* ── SEARCH ── */
function doSearch(){
  const q=(document.getElementById('heroSearch')||{}).value||'';
  if(!q.trim()) return;
  const drop=document.getElementById('searchResults');
  if(!drop) return;
  const results=[];
  Object.keys(INDIA_DATA).forEach(state=>{
    Object.keys(INDIA_DATA[state].cities).forEach(city=>{
      if(city.toLowerCase().includes(q.toLowerCase())||state.toLowerCase().includes(q.toLowerCase())){
        results.push({state,city});
      }
    });
  });
  if(!results.length){
    drop.innerHTML='<div class="search-item"><i class="fa-solid fa-circle-exclamation"></i>No results found for "'+q+'"</div>';
  } else {
    drop.innerHTML=results.slice(0,8).map(r=>
      `<div class="search-item" onclick="goBooking('${r.state}','${r.city}')">
        <i class="fa-solid fa-location-dot"></i>${r.city}, ${r.state}
      </div>`
    ).join('');
  }
  drop.classList.add('open');
}
function goBooking(state,city){
  sessionStorage.setItem('preState',state);
  sessionStorage.setItem('preCity',city);
  window.location.href='booking.html';
}
document.addEventListener('click',function(e){
  const drop=document.getElementById('searchResults');
  const wrap=document.querySelector('.hero-search');
  if(drop&&wrap&&!wrap.contains(e.target)) drop.classList.remove('open');
});
document.addEventListener('DOMContentLoaded',function(){
  const inp=document.getElementById('heroSearch');
  if(inp) inp.addEventListener('keydown',e=>{ if(e.key==='Enter') doSearch(); });
});

/* ── DESTINATION FILTER ── */
function filterDest(cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.dest-card').forEach(card=>{
    if(cat==='all'||card.dataset.cat===cat){
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/* ── AUTH (localStorage) ── */
const getUsers=()=>JSON.parse(localStorage.getItem('tripzo_users')||'[]');
const saveUsers=arr=>localStorage.setItem('tripzo_users',JSON.stringify(arr));

function openModal(){
  const m=document.getElementById('auth-modal');
  if(m){ m.classList.add('open'); document.body.style.overflow='hidden'; }
}
function closeModal(){
  const m=document.getElementById('auth-modal');
  if(m){ m.classList.remove('open'); document.body.style.overflow=''; }
}
window.addEventListener('click',e=>{
  const m=document.getElementById('auth-modal');
  if(m&&e.target===m) closeModal();
});
function switchModalTab(tab){
  const lc=document.getElementById('login-container');
  const sc=document.getElementById('signup-container');
  document.querySelectorAll('.m-tab').forEach((t,i)=>t.classList.toggle('active',(tab==='login'&&i===0)||(tab==='signup'&&i===1)));
  if(lc) lc.style.display=tab==='login'?'block':'none';
  if(sc) sc.style.display=tab==='signup'?'block':'none';
  ['login-error','signup-error'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
}
function toggleForm(t){switchModalTab(t);}

function handleLogin(e){
  e.preventDefault();
  const email=(document.getElementById('login-email')||{}).value?.trim();
  const pass=(document.getElementById('login-password')||{}).value;
  const errEl=document.getElementById('login-error');
  const msgEl=document.getElementById('login-err-msg');
  if(!email||!pass){if(msgEl)msgEl.textContent='Please fill in all fields.';if(errEl)errEl.style.display='flex';return;}
  const user=getUsers().find(u=>u.email===email&&u.password===pass);
  if(!user){
    if(msgEl)msgEl.textContent='Invalid email or password.';
    if(errEl)errEl.style.display='flex';
    return;
  }
  sessionStorage.setItem('tripzo_logged_in',email);
  sessionStorage.setItem('tripzo_user_name',user.name);
  updateNavForLoggedInUser(user.name);
  closeModal();
  showToast('Welcome back, '+user.name+'! 🎉');
}
function handleSignup(e){
  e.preventDefault();
  const name=(document.getElementById('signup-name')||{}).value?.trim();
  const email=(document.getElementById('signup-email')||{}).value?.trim();
  const pass=(document.getElementById('signup-password')||{}).value;
  const conf=(document.getElementById('signup-confirm-password')||{}).value;
  const errEl=document.getElementById('signup-error');
  const msgEl=document.getElementById('signup-err-msg');
  const err=msg=>{if(msgEl)msgEl.textContent=msg;if(errEl)errEl.style.display='flex';};
  if(!name||!email||!pass||!conf){err('Please fill in all fields.');return;}
  if(!/\S+@\S+\.\S+/.test(email)){err('Please enter a valid email.');return;}
  if(pass.length<6){err('Password must be at least 6 characters.');return;}
  if(pass!==conf){err('Passwords do not match.');return;}
  const users=getUsers();
  if(users.find(u=>u.email===email)){err('This email is already registered.');return;}
  users.push({name,email,password:pass});
  saveUsers(users);
  if(errEl)errEl.style.display='none';
  showToast('Account created! Please log in.');
  switchModalTab('login');
}

/* ── NAV USER STATE ── */
function updateNavForLoggedInUser(name){
  const loginLink=document.querySelector('.nav-login-btn');
  if(loginLink){
    loginLink.innerHTML='<i class="fa-solid fa-user"></i> '+name.split(' ')[0];
    loginLink.href='#';
    loginLink.onclick=e=>{e.preventDefault();if(confirm('Log out?')){sessionStorage.clear();location.reload();}};
  }
}
document.addEventListener('DOMContentLoaded',function(){
  const name=sessionStorage.getItem('tripzo_user_name');
  if(name) updateNavForLoggedInUser(name);
});

/* ── TOAST ── */
function showToast(msg){
  let t=document.getElementById('tripzo-toast');
  if(!t){
    t=document.createElement('div');
    t.id='tripzo-toast';
    t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:50px;font-size:.9rem;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,.3);transition:opacity .4s;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent=msg;
  t.style.opacity='1';
  setTimeout(()=>{t.style.opacity='0';},3000);
}

/* ── CONTACT FORM ── */
document.addEventListener('DOMContentLoaded',function(){
  const form=document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    let valid=true;
    const name=document.getElementById('cf-name');
    const email=document.getElementById('cf-email');
    const msg=document.getElementById('cf-message');
    const show=id=>{const el=document.getElementById(id);if(el)el.classList.add('show');};
    const hide=id=>{const el=document.getElementById(id);if(el)el.classList.remove('show');};
    if(!name||!name.value.trim()){show('err-cf-name');valid=false;}else{hide('err-cf-name');}
    if(!email||!/\S+@\S+\.\S+/.test(email.value)){show('err-cf-email');valid=false;}else{hide('err-cf-email');}
    if(!msg||!msg.value.trim()){show('err-cf-message');valid=false;}else{hide('err-cf-message');}
    if(!valid) return;
    const suc=document.getElementById('cf-success');
    if(suc) suc.classList.add('show');
    form.reset();
    setTimeout(()=>{if(suc)suc.classList.remove('show');},5000);
  });
});

/* ══ BOOKING PAGE ══ */
(function initBooking(){
  const stateEl=document.getElementById('placeName');
  if(!stateEl) return;

  // Populate all states from data.js
  getStates().forEach(s=>{
    const o=document.createElement('option');
    o.value=o.textContent=s;
    stateEl.appendChild(o);
  });

  // Pre-fill from search
  const preState=sessionStorage.getItem('preState');
  const preCity=sessionStorage.getItem('preCity');
  if(preState){
    stateEl.value=preState;
    window.updateCities();
    setTimeout(()=>{
      const cityEl=document.getElementById('cityName');
      if(cityEl&&preCity){ cityEl.value=preCity; window.updateSites(); }
      sessionStorage.removeItem('preState');
      sessionStorage.removeItem('preCity');
    },50);
  }

  window.updateCities=function(){
    const state=stateEl.value;
    const cityEl=document.getElementById('cityName');
    if(!cityEl) return;
    cityEl.innerHTML='<option value="">Select City</option>';
    cityEl.disabled=!state;
    const siteEl=document.getElementById('siteName');
    if(siteEl) siteEl.innerHTML='<p class="sites-hint">Select a city to see attractions</p>';
    if(!state) return;
    getCities(state).forEach(c=>{
      const o=document.createElement('option');
      o.value=o.textContent=c;
      cityEl.appendChild(o);
    });
    cityEl.disabled=false;
    window.updateSummary&&window.updateSummary();
  };

  window.updateSites=function(){
    const state=stateEl.value;
    const city=(document.getElementById('cityName')||{}).value;
    const siteEl=document.getElementById('siteName');
    if(!siteEl) return;
    siteEl.innerHTML='';
    const sites=getSites(state,city);
    if(!sites.length){siteEl.innerHTML='<p class="sites-hint">No attractions found</p>';return;}
    sites.forEach(s=>{
      const lbl=document.createElement('label');
      lbl.className='site-chip';
      lbl.innerHTML=`<input type="checkbox" value="${s}" onchange="onSiteChange(this)"> ${s}`;
      siteEl.appendChild(lbl);
    });
    window.updateSummary&&window.updateSummary();
  };

  window.onSiteChange=function(cb){
    cb.closest('.site-chip').classList.toggle('checked',cb.checked);
    window.updateSummary&&window.updateSummary();
  };

  const submitEl=document.getElementById('submit');
  if(submitEl){
    submitEl.addEventListener('click',function(e){
      e.preventDefault();
      const state=stateEl.value;
      const city=(document.getElementById('cityName')||{}).value;
      const members=(document.getElementById('members')||{}).value;
      const start=(document.getElementById('startDate')||{}).value;
      const end=(document.getElementById('endDate')||{}).value;
      const sites=Array.from(document.querySelectorAll('#siteName input:checked')).map(c=>c.value);
      let valid=true;
      const se=id=>{const el=document.getElementById(id);if(el)el.classList.add('show');valid=false;};
      const he=id=>{const el=document.getElementById(id);if(el)el.classList.remove('show');};
      if(!state){se('err-state');}else{he('err-state');}
      if(!city){se('err-city');}else{he('err-city');}
      if(!sites.length){se('err-sites');}else{he('err-sites');}
      if(!members||+members<1){se('err-members');}else{he('err-members');}
      if(!start){se('err-start');}else{he('err-start');}
      if(!end||new Date(end)<=new Date(start)){se('err-end');}else{he('err-end');}
      if(!valid) return;
      // Show confirmation
      const modal=document.getElementById('confirmModal');
      if(modal){
        const days=Math.ceil((new Date(end)-new Date(start))/86400000);
        const ref='TRP-'+Math.random().toString(36).substr(2,6).toUpperCase();
        document.getElementById('bookingRef').textContent='Booking ID: #'+ref;
        document.getElementById('modalDetails').innerHTML=`
          <div class="md-row"><span>Destination</span><span>${city}, ${state}</span></div>
          <div class="md-row"><span>Attractions</span><span>${sites.join(', ')}</span></div>
          <div class="md-row"><span>Members</span><span>${members} traveller${members>1?'s':''}</span></div>
          <div class="md-row"><span>Guide</span><span>${(document.getElementById('Guide')||{}).value||'None'}</span></div>
          <div class="md-row"><span>Dates</span><span>${fmtDate(start)} → ${fmtDate(end)}</span></div>
          <div class="md-row"><span>Duration</span><span>${days} day${days>1?'s':''}</span></div>
        `;
        modal.classList.add('open');
        document.body.style.overflow='hidden';
        // Advance steps
        ['step1','step2','step3'].forEach((id,i)=>{
          const el=document.getElementById(id);
          if(!el) return;
          el.className='step'+(i<2?' done':' active');
        });
        ['line1','line2'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.add('done');});
      }
    });
  }
  const today=new Date().toISOString().split('T')[0];
  const sd=document.getElementById('startDate');
  const ed=document.getElementById('endDate');
  if(sd){sd.min=today;sd.addEventListener('change',()=>{if(ed)ed.min=sd.value;window.updateSummary&&window.updateSummary();});}
  if(ed){ed.min=today;ed.addEventListener('change',()=>{window.updateSummary&&window.updateSummary();});}
  const membersEl=document.getElementById('members');
  if(membersEl) membersEl.addEventListener('input',()=>{window.updateSummary&&window.updateSummary();});
  const guideEl=document.getElementById('Guide');
  if(guideEl) guideEl.addEventListener('change',()=>{window.updateSummary&&window.updateSummary();});
})();

/* ══ ACTIVITY PAGE ══ */
(function initActivity(){
  const stateEl=document.getElementById('state');
  if(!stateEl) return;
  getStates().forEach(s=>{
    const o=document.createElement('option');
    o.value=o.textContent=s;
    stateEl.appendChild(o);
  });
  window.updateCities=function(){
    const state=stateEl.value;
    const cityEl=document.getElementById('city');
    if(!cityEl) return;
    cityEl.innerHTML='<option value="">Select City</option>';
    cityEl.disabled=true;
    document.getElementById('activityChips').innerHTML='<p class="chips-hint">Select a city to see activities</p>';
    if(!state) return;
    getCities(state).forEach(c=>{
      const o=document.createElement('option');
      o.value=o.textContent=c;
      cityEl.appendChild(o);
    });
    cityEl.disabled=false;
    actUpdateSummary();
  };
  window.updateActivities=function(){
    const state=stateEl.value;
    const city=(document.getElementById('city')||{}).value;
    const chipsEl=document.getElementById('activityChips');
    if(!chipsEl) return;
    chipsEl.innerHTML='';
    const acts=getActivities(state,city);
    if(!acts.length){chipsEl.innerHTML='<p class="chips-hint">No activities found</p>';return;}
    acts.forEach(a=>{
      const icon=actIcons[a]||'⚡';
      const lbl=document.createElement('label');
      lbl.className='activity-chip';
      lbl.innerHTML=`<input type="checkbox" value="${a}" onchange="onActChange(this)"><span class="chip-icon">${icon}</span>${a}`;
      chipsEl.appendChild(lbl);
    });
    actUpdateSummary();
  };
  window.onActChange=function(cb){
    cb.closest('.activity-chip').classList.toggle('checked',cb.checked);
    actUpdateSummary();
  };
  window.changeCount=function(d){
    const el=document.getElementById('members');
    if(!el) return;
    el.value=Math.min(50,Math.max(1,(+el.value||1)+d));
    actUpdateSummary();
  };
  function actUpdateSummary(){
    const state=stateEl.value;
    const cityEl=document.getElementById('city');
    const city=cityEl?cityEl.value:'';
    const members=(document.getElementById('members')||{}).value||1;
    const date=(document.getElementById('activityDate')||{}).value;
    const acts=Array.from(document.querySelectorAll('#activityChips input:checked')).map(c=>c.value);
    const body=document.getElementById('summaryBody');
    if(!body) return;
    if(!state){body.innerHTML='<div class="sum-empty"><i class="fa-solid fa-person-hiking"></i><p>Select state to begin</p></div>';return;}
    let html='';
    const row=(ico,lbl,val)=>val?`<div class="sum-item"><div class="sum-label"><i class="fa-solid fa-${ico}"></i>${lbl}</div><div class="sum-val">${val}</div></div>`:'';
    html+=row('map','State',state);
    html+=row('city','City',city);
    if(acts.length){const tags=acts.map(a=>`<span class="sum-tag">${actIcons[a]||'⚡'} ${a}</span>`).join('');html+=`<div class="sum-item"><div class="sum-label"><i class="fa-solid fa-person-running"></i>Activities</div><div class="sum-val"><div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end">${tags}</div></div></div>`;}
    html+=row('users','Members',`${members} traveller${members>1?'s':''}`);
    html+=row('calendar','Date',date?fmtDate(date):'');
    body.innerHTML=html||'<div class="sum-empty"><i class="fa-solid fa-person-hiking"></i><p>Keep filling the form...</p></div>';
  }
  const form=document.getElementById('activityForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const state=stateEl.value;
      const cityEl=document.getElementById('city');
      const city=cityEl?cityEl.value:'';
      const members=(document.getElementById('members')||{}).value;
      const date=(document.getElementById('activityDate')||{}).value;
      const acts=Array.from(document.querySelectorAll('#activityChips input:checked')).map(c=>c.value);
      const today=new Date().toISOString().split('T')[0];
      let valid=true;
      const se=id=>{const el=document.getElementById(id);if(el)el.classList.add('show');valid=false;};
      const he=id=>{const el=document.getElementById(id);if(el)el.classList.remove('show');};
      if(!state){se('aerr-state');}else{he('aerr-state');}
      if(!city){se('aerr-city');}else{he('aerr-city');}
      if(!acts.length){se('aerr-act');}else{he('aerr-act');}
      if(!members||+members<1){se('aerr-members');}else{he('aerr-members');}
      if(!date||date<today){se('aerr-date');}else{he('aerr-date');}
      if(!valid) return;
      const modal=document.getElementById('actConfirmModal');
      if(modal){
        const ref='ACT-'+Math.random().toString(36).substr(2,6).toUpperCase();
        document.getElementById('actBookingRef').textContent='Booking ID: #'+ref;
        document.getElementById('actModalDetails').innerHTML=`
          <div class="md-row"><span>Location</span><span>${city}, ${state}</span></div>
          <div class="md-row"><span>Activities</span><span>${acts.map(a=>(actIcons[a]||'⚡')+' '+a).join(', ')}</span></div>
          <div class="md-row"><span>Members</span><span>${members} traveller${members>1?'s':''}</span></div>
          <div class="md-row"><span>Date</span><span>${fmtDate(date)}</span></div>
        `;
        modal.classList.add('open');
        document.body.style.overflow='hidden';
      }
    });
  }
  const today=new Date().toISOString().split('T')[0];
  const dateEl=document.getElementById('activityDate');
  if(dateEl){ dateEl.min=today; dateEl.addEventListener('change',actUpdateSummary);}
  const membersEl=document.getElementById('members');
  if(membersEl) membersEl.addEventListener('input',actUpdateSummary);
})();

const actIcons={
  'Scuba Diving':'🤿','Paragliding':'🪂','Trekking':'🥾','Kayaking':'🛶',
  'Rock Climbing':'🧗','Camping':'⛺','Wildlife Safari':'🦁','Boating':'⛵',
  'Parasailing':'🪁','Jet Skiing':'🚤','Snorkeling':'🐠','Surfing':'🏄',
  'Hot Air Ballooning':'🎈','Camel Safari':'🐪','Zip Lining':'🌿',
  'Horse Riding':'🐴','River Rafting':'🌊','Skiing':'⛷','Snowboarding':'🏂',
  'Elephant Safari':'🐘','Boat Ride':'⛵','Heritage Tours':'🏛',
  'Cultural Tours':'🎭','Cycling':'🚴','Meditation Retreats':'🧘',
  'Mountain Biking':'🚵','Stargazing':'🔭','Yoga Retreats':'🧘',
  'Bungee Jumping':'🤸','Zorbing':'⚪','ATV Rides':'🏎',
  'Ganga Aarti':'🪔','Pilgrimage Tours':'🕌','Food Tours':'🍜',
  'Cooking Classes':'👨‍🍳','Heritage Walks':'🚶','Street Shopping':'🛍',
  'Shikara Ride':'🚣','Houseboat Stay':'🏠','Gondola Ride':'🚡',
  'Balloon Safari':'🎈','Dune Bashing':'🏜','Tea Plantation Walk':'🍵',
  'Wine Tasting':'🍷','Coffee Plantation Tours':'☕','Sand Art':'🏖',
  'Dolphin Safari':'🐬','Tiger Safari':'🐯','Jeep Safari':'🚙',
  'Bird Watching':'🦅','Mangrove Boat Tour':'🌿','Deep Sea Fishing':'🎣',
};

function fmtDate(d){
  if(!d) return '';
  return new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
}

function closeConfirmModal(){
  ['confirmModal','actConfirmModal'].forEach(id=>{
    const m=document.getElementById(id);
    if(m) m.classList.remove('open');
  });
  document.body.style.overflow='';
}

/* ══════════════════════════════════════════════
   ADDITIONS — Image lazy load, mobile nav overlay,
   newsletter, keyboard search, smooth scroll polish
══════════════════════════════════════════════ */

/* ── LAZY IMAGE FADE-IN ── */
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.onload = () => img.classList.add('loaded');
          if (img.complete) img.classList.add('loaded');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    imgs.forEach(img => io.observe(img));
  } else {
    imgs.forEach(img => img.classList.add('loaded'));
  }
});

/* ── MOBILE NAV OVERLAY ── */
(function() {
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'navOverlay';
  overlay.onclick = function() {
    const list = document.getElementById('nav-list');
    const btn  = document.getElementById('hamburger');
    if (list) list.classList.remove('open');
    if (btn)  btn.classList.remove('open');
    overlay.classList.remove('open');
  };
  document.body.appendChild(overlay);

  const origToggle = window.toggleNav;
  window.toggleNav = function() {
    origToggle && origToggle();
    overlay.classList.toggle('open',
      document.getElementById('nav-list')?.classList.contains('open'));
  };

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#nav-list a').forEach(a => {
      a.addEventListener('click', () => overlay.classList.remove('open'));
    });
  });
})();

/* ── KEYBOARD SHORTCUT: / to focus search ── */
document.addEventListener('keydown', function(e) {
  const inp = document.getElementById('heroSearch');
  if (!inp) return;
  if (e.key === '/' && document.activeElement !== inp) {
    e.preventDefault();
    inp.focus();
    inp.select();
  }
  if (e.key === 'Escape') {
    const drop = document.getElementById('searchResults');
    if (drop) drop.classList.remove('open');
    inp.blur();
  }
});

/* ── NEWSLETTER FORM ── */
document.addEventListener('DOMContentLoaded', function() {
  const nlForm = document.getElementById('nlForm');
  if (!nlForm) return;
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailEl = document.getElementById('nl-email');
    const sucEl   = document.getElementById('nl-success');
    if (!emailEl) return;
    const email = emailEl.value.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    // Save to localStorage
    const subs = JSON.parse(localStorage.getItem('tripzo_newsletter') || '[]');
    if (!subs.includes(email)) {
      subs.push(email);
      localStorage.setItem('tripzo_newsletter', JSON.stringify(subs));
    }
    emailEl.value = '';
    if (sucEl) sucEl.classList.add('show');
    setTimeout(() => sucEl && sucEl.classList.remove('show'), 4000);
    showToast('🎉 Subscribed! Welcome to Tripzo.');
  });
});

/* ── ACTIVE NAV ON SCROLL (index.html only) ── */
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id], div.stats-bar');
  const navLinks = document.querySelectorAll('#nav-list a');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('nav-active'));
        const id = entry.target.id;
        const match = document.querySelector(`#nav-list a[href="#${id}"]`);
        if (match) match.classList.add('nav-active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => io.observe(s));
});

/* ── CONFIRMATION MODAL CLOSE ON OVERLAY CLICK ── */
document.addEventListener('click', function(e) {
  ['confirmModal', 'actConfirmModal'].forEach(id => {
    const m = document.getElementById(id);
    if (m && e.target === m) closeConfirmModal();
  });
});

/* ── ESCAPE TO CLOSE MODALS ── */
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  closeConfirmModal();
  closeModal();
});
