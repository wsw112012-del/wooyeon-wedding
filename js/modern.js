/* ============================================================
   MODERN.JS
   ============================================================ */

const C = WEDDING_CONFIG;

function $(id) { return document.getElementById(id); }
function setText(id, val) { const el = $(id); if (el && val) el.textContent = val; }

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2200);
}

async function doCopy(text, msg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(msg);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(msg); } catch {}
    document.body.removeChild(ta);
  }
}

window.copyAccount = function(num) { doCopy(num.replace(/-/g, ''), '계좌번호가 복사되었습니다'); };

/* ============================================================
   INJECT DATA
   ============================================================ */
function injectData() {
  document.title = `${C.groomName} ♡ ${C.brideName} 결혼합니다`;

  // 이름
  setText('hero-groom-name', C.groomName);
  setText('hero-bride-name',  C.brideName);

  // 날짜 (큰 글씨)
  const dateBig = $('hero-date-big');
  if (dateBig) {
    dateBig.textContent = `${C.weddingDateKo}\n${C.weddingTimeKo}`;
    dateBig.style.whiteSpace = 'pre-line';
  }

  // 장소
  setText('hero-venue-small', C.venueName);

  // hero 사진
  if (C.showHeroPhoto && C.heroBg) {
    const frame = $('hero-photo-frame');
    const ph    = $('hero-placeholder');
    if (frame && ph) {
      const img = document.createElement('img');
      img.src = C.heroBg;
      img.alt = '신랑 신부';
      img.className = 'hero-actual-photo';
      img.onload = () => ph.replaceWith(img);
    }
  }

  // invitation
  const invEl = $('inv-text');
  if (invEl) invEl.textContent = C.invitationText;
  setText('inv-groom-father', C.groomFather);
  setText('inv-groom-mother', C.groomMother);
  setText('inv-bride-father', C.brideFather);
  setText('inv-bride-mother', C.brideMother);
  setText('inv-groom-name',   C.groomName);
  setText('inv-bride-name',   C.brideName);

  // contacts
  setText('cc-groom', C.groomName);
  setText('cc-bride',  C.brideName);

  // d-day label
  setText('cd-date-text', `${C.weddingDateKo} ${C.weddingTimeKo}`);

  // venue
  setText('vp-name', C.venueName);
  if (C.venueHall) setText('vp-hall', C.venueHall);
  setText('vp-addr', C.venueAddress);
  const vpPhone = $('vp-phone');
  if (vpPhone && C.venuePhone) {
    vpPhone.href = `tel:${C.venuePhone}`;
    vpPhone.textContent = C.venuePhone;
  }

  // footer
  setText('ft-groom', C.groomName);
  setText('ft-bride',  C.brideName);
  setText('ft-date',   C.weddingDateKo);
}

/* ============================================================
   CONTACTS
   ============================================================ */
function initContacts() {
  const gp = C.groomPhone.replace(/[^0-9]/g, '');
  const bp = C.bridePhone.replace(/[^0-9]/g, '');
  const groomPhone = $('btn-groom-phone'), groomSms = $('btn-groom-sms');
  const bridePhone = $('btn-bride-phone'), brideSms = $('btn-bride-sms');
  if (groomPhone) groomPhone.href = `tel:${gp}`;
  if (groomSms)   groomSms.href   = `sms:${gp}`;
  if (bridePhone) bridePhone.href = `tel:${bp}`;
  if (brideSms)   brideSms.href   = `sms:${bp}`;
}

/* ============================================================
   PARENTS TOGGLE
   ============================================================ */
function initParentsToggle() {
  const btn   = $('btn-parents-toggle');
  const panel = $('parents-panel');
  if (!btn || !panel) return;

  function buildGroup(label, people) {
    if (!people || !people.length) return '';
    const rows = people.map(p => {
      const num = p.phone ? p.phone.replace(/[^0-9]/g,'') : '';
      const btns = num
        ? `<div class="pg-call"><a class="pg-btn" href="tel:${num}">전화</a><a class="pg-btn" href="sms:${num}">문자</a></div>`
        : '';
      return `<div class="pg-row"><span class="pg-relation">${p.relation}</span><span class="pg-name">${p.name}</span>${btns}</div>`;
    }).join('');
    return `<div class="parent-group"><p class="pg-side">${label}</p>${rows}</div>`;
  }

  panel.innerHTML =
    buildGroup('신 랑 측', C.groomParents) +
    buildGroup('신 부 측', C.brideParents);

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function initCountdown() {
  const target = new Date(C.weddingDatetime).getTime();
  const cdDays = $('cd-days'), cdHours = $('cd-hours');
  const cdMins = $('cd-minutes'), cdSecs = $('cd-seconds');
  const cdGrid = $('cd-grid'), cdDone = $('cd-done');
  if (!cdDays) return;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      if (cdGrid) cdGrid.style.display = 'none';
      if (cdDone) cdDone.style.display = 'block';
      return;
    }
    cdDays.textContent  = String(Math.floor(diff / 86400000)).padStart(2,'0');
    cdHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
    cdMins.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    cdSecs.textContent  = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   GALLERY + LIGHTBOX
   ============================================================ */
function initGallery() {
  const grid = $('gallery-grid'), empty = $('gallery-empty');
  const lightbox = $('lightbox'), lbImg = $('lb-img');
  const lbClose = $('lb-close'), lbPrev = $('lb-prev'), lbNext = $('lb-next'), lbCnt = $('lb-counter');
  if (!grid) return;

  const photos = (C.gallery || []).filter(Boolean);
  if (!photos.length) return;
  if (empty) empty.remove();

  let current = 0;
  photos.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const img = document.createElement('img');
    img.src = src; img.alt = `사진 ${i+1}`; img.loading = 'lazy';
    item.appendChild(img);
    item.addEventListener('click', () => openLb(i));
    grid.appendChild(item);
  });

  function openLb(idx) {
    current = idx; lbImg.src = photos[current];
    if (lbCnt) lbCnt.textContent = `${current+1} / ${photos.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
  function showIdx(idx) {
    current = (idx + photos.length) % photos.length;
    lbImg.src = photos[current];
    if (lbCnt) lbCnt.textContent = `${current+1} / ${photos.length}`;
  }

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev)  lbPrev.addEventListener('click', () => showIdx(current - 1));
  if (lbNext)  lbNext.addEventListener('click', () => showIdx(current + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });

  let tx = 0;
  lightbox.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) showIdx(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  showIdx(current - 1);
    if (e.key === 'ArrowRight') showIdx(current + 1);
    if (e.key === 'Escape')     closeLb();
  });
}

/* ============================================================
   MAP LINKS
   ============================================================ */
function initMapLinks() {
  const name = encodeURIComponent(C.venueName);
  const addr = encodeURIComponent(C.venueAddress);
  const { lat, lng } = C;

  const kakao = $('btn-kakao'), naver = $('btn-naver');
  const tmap  = $('btn-tmap'),  knavi = $('btn-knavi');
  const copy  = $('btn-copy-addr');

  if (kakao) kakao.href = `https://map.kakao.com/link/search/${name}`;
  if (naver) naver.href = `https://map.naver.com/v5/search/${addr}`;
  if (tmap)  tmap.href  = `tmap://route?goalname=${name}&goalx=${lng}&goaly=${lat}`;
  if (knavi) knavi.href = `kakaomap://route?ep=${lat},${lng}&ept=${encodeURIComponent(C.venueName)}`;
  if (copy)  copy.addEventListener('click', () => doCopy(C.venueAddress, '주소가 복사되었습니다'));

  setText('tr-subway',  C.transport?.subway  || '');
  setText('tr-bus',     C.transport?.bus     || '');
  setText('tr-parking', C.transport?.parking || '');
}

/* ============================================================
   ACCOUNTS
   ============================================================ */
function initAccounts() {
  function buildCards(accounts) {
    if (!accounts || !accounts.length) return '<p style="font-size:.82rem;text-align:center;padding:16px;color:#999">등록된 계좌가 없습니다.</p>';
    return accounts.map(a => `
      <div class="acc-card">
        <p class="acc-bank">${a.bank}</p>
        <p class="acc-number">${a.number}</p>
        <p class="acc-holder">${a.holder}</p>
        <button class="acc-copy" onclick="copyAccount('${a.number}')">복사</button>
      </div>`).join('');
  }
  const gPanel = $('acc-groom'), bPanel = $('acc-bride');
  if (gPanel) gPanel.innerHTML = buildCards(C.accounts?.groom);
  if (bPanel) bPanel.innerHTML = buildCards(C.accounts?.bride);

  document.querySelectorAll('.acc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.acc-tab').forEach(t => t.classList.remove('acc-tab--active'));
      tab.classList.add('acc-tab--active');
      const which = tab.dataset.tab;
      if (gPanel) gPanel.classList.toggle('acc-panel--hide', which !== 'groom');
      if (bPanel) bPanel.classList.toggle('acc-panel--hide', which !== 'bride');
    });
  });
}

/* ============================================================
   BOTTOM BAR
   ============================================================ */
function initBottomBar() {
  const btnCal   = $('btn-calendar');
  const btnLink  = $('btn-link-copy');
  const btnKakao = $('btn-kakao-share');
  if (btnCal)   btnCal.addEventListener('click', addToCalendar);
  if (btnLink)  btnLink.addEventListener('click', () => doCopy(C.shareUrl, '링크가 복사되었습니다'));
  if (btnKakao) btnKakao.addEventListener('click', shareKakao);
}

function addToCalendar() {
  const dt = new Date(C.weddingDatetime);
  const fmt = d => d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const end = new Date(dt.getTime() + 2 * 3600 * 1000);
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//WeddingCard//KO',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(dt)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${C.groomName} ♡ ${C.brideName} 결혼식`,
    `LOCATION:${C.venueName} ${C.venueAddress}`,
    `DESCRIPTION:${C.shareDescription || ''}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  a.download = 'wedding.ics';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

async function shareKakao() {
  const data = { title: C.shareTitle || document.title, text: C.shareDescription || '', url: C.shareUrl || location.href };
  if (navigator.share) { try { await navigator.share(data); return; } catch {} }
  doCopy(C.shareUrl || location.href, '링크가 복사되었습니다');
}

/* ============================================================
   SCROLL ANIMATION
   ============================================================ */
function initScrollAnim() {
  const sections = document.querySelectorAll('.mod-section');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  sections.forEach(s => io.observe(s));
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectData();
  initContacts();
  initParentsToggle();
  initCountdown();
  initGallery();
  initMapLinks();
  initAccounts();
  initBottomBar();
  initScrollAnim();
});
