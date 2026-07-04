'use strict';

// ============================================================
//  모바일 청첩장 메인 스크립트
// ============================================================

// 이미지 저장 방지
(function () {
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
})();

if (window.Kakao && !Kakao.isInitialized()) {
  Kakao.init(WEDDING_CONFIG.kakaoAppKey);
}

window.addEventListener('DOMContentLoaded', function () {
  injectWeddingData();
  initScrollAnimations();
  initCalendar();
  initCountdown();
  initContacts();
  initParentsGrid();
  initGallery();
  initGiftTabs();
  initMapLinks();
  initAddressCopy();
  initBottomBar();
  initMusicPlayer();
});

// ============================================================
//  MONTH CALENDAR (Copenhagen style)
// ============================================================
function initCalendar() {
  var grid = document.getElementById('calendar-grid');
  if (!grid) return;
  var c = WEDDING_CONFIG;
  var d = new Date(c.weddingDatetime);
  var year = d.getFullYear();
  var month = d.getMonth();
  var weddingDay = d.getDate();

  var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var captionEl = document.getElementById('calendar-caption');
  if (captionEl) captionEl.textContent = monthNames[month] + ' ' + year;

  var calHh    = d.getHours();
  var calAmpm  = calHh >= 12 ? 'pm' : 'am';
  var calH12   = pad2(calHh % 12 || 12);
  var calMin   = pad2(d.getMinutes());
  var calTime  = calH12 + ':' + calMin + calAmpm;

  var firstDay = new Date(year, month, 1).getDay();
  var lastDate = new Date(year, month + 1, 0).getDate();

  grid.innerHTML = '';
  var heads = ['S','M','T','W','T','F','S'];
  for (var i = 0; i < 7; i++) {
    var h = document.createElement('div');
    h.className = 'cal-head' + (i === 0 ? ' sun' : '');
    h.textContent = heads[i];
    grid.appendChild(h);
  }
  for (var j = 0; j < firstDay; j++) {
    var empty = document.createElement('div');
    empty.className = 'cal-day cal-day--empty';
    empty.textContent = '·';
    grid.appendChild(empty);
  }
  for (var day = 1; day <= lastDate; day++) {
    var cell = document.createElement('div');
    var dow = new Date(year, month, day).getDay();
    cell.className = 'cal-day' + (dow === 0 ? ' cal-day--sun' : '') + (day === weddingDay ? ' cal-day--wedding' : '');
    if (day === weddingDay) {
      cell.innerHTML = '<span class="cal-wedding-num">' + day + '</span><span class="cal-wedding-time">' + calTime + '</span>';
    } else {
      cell.textContent = day;
    }
    grid.appendChild(cell);
  }
}

// ============================================================
//  1. DATA INJECTION
// ============================================================
function injectWeddingData() {
  var c = WEDDING_CONFIG;

  // Page meta
  var d = new Date(c.weddingDatetime);
  var yy  = String(d.getFullYear()).slice(2);
  var mo  = pad2(d.getMonth() + 1);
  var dy  = pad2(d.getDate());
  var hh  = d.getHours();
  var h12 = pad2(hh % 12 || 12);
  var min = pad2(d.getMinutes());
  var ampm = hh >= 12 ? 'pm' : 'am';
  var shortGroom = c.groomName.slice(1);
  var shortBride = c.brideName.slice(1);
  var dayShortArr = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  var ampmUp  = hh >= 12 ? 'PM' : 'AM';
  var pageTitle = shortGroom + '&' + shortBride + '의 결혼식에 초대합니다. 🤵👰';
  var dateStr   = d.getFullYear() + '. ' + mo + '. ' + dy + '. ' + dayShortArr[d.getDay()] + ' ' + h12 + ':' + min + ' ' + ampmUp;

  document.getElementById('page-title').textContent = pageTitle;
  setAttr('og-title', 'content', pageTitle);
  setAttr('og-desc',  'content', dateStr);


  // Hero polaroid
  var dayShort = dayShortArr[d.getDay()];
  setText('polaroid-date', d.getFullYear() + '. ' + mo + '. ' + dy + ' ' + dayShort + '  ' + ampmUp + ' ' + h12 + ':' + min);
  setText('hw-venue', c.venueName);

  if (c.heroBg) {
    var posterImg = document.getElementById('hero-poster-img');
    if (posterImg) posterImg.style.backgroundImage = "url('" + c.heroBg + "')";
  }

  // Invitation
  setText('invitation-text', c.invitationText);
  setText('groom-father',    c.groomFather);
  setText('groom-mother',    c.groomMother);
  setText('groom-name-full', c.groomName);
  setText('bride-father',    c.brideFather);
  setText('bride-mother',    c.brideMother);
  setText('bride-name-full', c.brideName);

  // Countdown
  setText('countdown-date-display', c.weddingDateKo + ' ' + c.weddingTimeKo);

  // Venue
  setText('venue-name-display',    c.venueName);
  setText('venue-hall-display',    c.venueHall);
  setText('venue-address-display', c.venueAddress);
  var phoneEl = document.getElementById('venue-phone-display');
  if (phoneEl) {
    phoneEl.textContent = c.venuePhone;
    phoneEl.href = 'tel:' + c.venuePhone.replace(/[^0-9]/g, '');
  }

  // Transport
  setText('transport-subway-text',  c.transport.subway);
  setText('transport-bus-text',     c.transport.bus);
  setText('transport-parking-text', c.transport.parking);

  // Contact
  setText('contact-groom-name', c.groomName);
  setText('contact-bride-name', c.brideName);

  // Gift (accounts) panels
  buildAccountPanel('acct-panel-groom', c.accounts.groom);
  buildAccountPanel('acct-panel-bride', c.accounts.bride);

}


// ============================================================
//  2. SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  var els = document.querySelectorAll('.fade-in-section');
  if (!els.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { observer.observe(el); });
}

// ============================================================
//  3. COUNTDOWN
// ============================================================
function initCountdown() {
  var target = new Date(WEDDING_CONFIG.weddingDatetime);

  function tick() {
    var diff = target - new Date();
    if (diff <= 0) {
      document.getElementById('countdown-grid').style.display = 'none';
      document.getElementById('countdown-done').style.display = 'block';
      return;
    }
    setText('cd-days',    pad2(Math.floor(diff / 86400000)));
    setText('cd-hours',   pad2(Math.floor((diff % 86400000) / 3600000)));
    setText('cd-minutes', pad2(Math.floor((diff % 3600000)  / 60000)));
    setText('cd-seconds', pad2(Math.floor((diff % 60000)    / 1000)));
  }
  tick();
  setInterval(tick, 1000);
}

// ============================================================
//  4. CONTACTS — 신랑신부 연락처
// ============================================================
function initContacts() {
  var c = WEDDING_CONFIG;
  setContactHref('btn-groom-phone', 'tel', c.groomPhone);
  setContactHref('btn-groom-sms',   'sms', c.groomPhone);
  setContactHref('btn-bride-phone', 'tel', c.bridePhone);
  setContactHref('btn-bride-sms',   'sms', c.bridePhone);
}

function setContactHref(id, proto, phone) {
  var el = document.getElementById(id);
  if (!el) return;
  var clean = phone.replace(/[^0-9]/g, '');
  el.href = proto + ':' + clean;
}

function buildAccountPanel(panelId, accounts) {
  var panel = document.getElementById(panelId);
  if (!panel || !accounts || !accounts.length) return;
  panel.innerHTML = accounts.map(function (acc) {
    return (
      '<div class="account-card">' +
        '<div class="account-row" data-account="' + esc(acc.number) + '">' +
          '<span class="bank-name">' + esc(acc.bank) + '</span>' +
          '<span class="account-number">' + esc(acc.number) + '</span>' +
          '<button class="btn-copy" onclick="copyAccount(this)">복사</button>' +
        '</div>' +
        '<p class="account-holder">예금주: ' + esc(acc.holder) + '</p>' +
      '</div>'
    );
  }).join('');
}

// ============================================================
//  5. PARENTS GRID — 혼주 연락처
// ============================================================
function initParentsGrid() {
  var panel = document.getElementById('parents-panel');
  if (!panel) return;
  buildParentsPanel(panel);
}

function buildParentsPanel(panel) {
  var c = WEDDING_CONFIG;
  var groomHtml = (c.groomParents || []).map(parentCard).join('');
  var brideHtml = (c.brideParents || []).map(parentCard).join('');
  panel.innerHTML =
    '<div class="parents-col">' + groomHtml + '</div>' +
    '<div class="parents-col">' + brideHtml + '</div>';
}

function parentCard(p) {
  var clean = (p.phone || '').replace(/[^0-9]/g, '');
  var cls = 'btn-parent-contact' + (clean ? '' : ' btn-parent-contact--disabled');
  var telTag  = clean ? 'a href="tel:' + clean + '"' : 'span aria-disabled="true"';
  var smsTag  = clean ? 'a href="sms:' + clean + '"' : 'span aria-disabled="true"';
  var telEnd  = clean ? 'a' : 'span';
  var btns =
    '<div class="parent-btns">' +
      '<' + telTag + ' class="' + cls + '" aria-label="전화">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.06 1.22 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/></svg>' +
      '</' + telEnd + '>' +
      '<' + smsTag + ' class="' + cls + '" aria-label="문자">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="14" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>' +
      '</' + telEnd + '>' +
    '</div>';
  return (
    '<div class="parent-card">' +
      '<div class="parent-info">' +
        '<div class="parent-relation">' + esc(p.relation) + '</div>' +
        '<div class="parent-name">' + esc(p.name) + '</div>' +
      '</div>' +
      btns +
    '</div>'
  );
}

// ============================================================
//  6. GALLERY — 2-column grid + lightbox
// ============================================================
var galleryPhotos = [];
var lightboxIdx   = 0;

function initGallery() {
  var photos = WEDDING_CONFIG.gallery || [];
  var grid   = document.getElementById('gallery-grid');
  var empty  = document.getElementById('gallery-empty');

  if (!photos.length) {
    if (empty) empty.style.display = 'flex';
    return;
  }

  galleryPhotos = photos;
  if (empty) empty.remove();

  grid.innerHTML = photos.map(function (src, i) {
    return (
      '<div class="gallery-cell" data-index="' + i + '" role="img" aria-label="사진 ' + (i + 1) + '">' +
        '<div class="gallery-photo" style="background-image:url(\'' + esc(src) + '\')"></div>' +
      '</div>'
    );
  }).join('');

  grid.addEventListener('click', function (e) {
    var cell = e.target.closest('.gallery-cell');
    if (cell) openLightbox(parseInt(cell.dataset.index, 10));
  });
}

function openLightbox(idx) {
  lightboxIdx = idx;
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  img.style.backgroundImage = "url('" + galleryPhotos[idx] + "')";
  updateLightboxCounter();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxGo(delta) {
  lightboxIdx = (lightboxIdx + delta + galleryPhotos.length) % galleryPhotos.length;
  document.getElementById('lightbox-img').style.backgroundImage = "url('" + galleryPhotos[lightboxIdx] + "')";
  updateLightboxCounter();
}

function updateLightboxCounter() {
  setText('lightbox-counter', (lightboxIdx + 1) + ' / ' + galleryPhotos.length);
}

document.addEventListener('DOMContentLoaded', function () {
  var lb = document.getElementById('lightbox');
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', function () { lightboxGo(-1); });
  document.getElementById('lightbox-next').addEventListener('click', function () { lightboxGo(+1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.id === 'lightbox-img') closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lightboxGo(-1);
    if (e.key === 'ArrowRight')  lightboxGo(+1);
  });
  // Swipe on lightbox
  var startX = 0;
  lb.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  lb.addEventListener('pointerup',   function (e) {
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 50) lightboxGo(dx < 0 ? 1 : -1);
  });
});

// ============================================================
//  7. GIFT TABS
// ============================================================
function initGiftTabs() {
  var section = document.getElementById('accounts');
  if (!section) return;
  var tabs = section.querySelectorAll('.tab-btn');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('tab-active'); });
      tab.classList.add('tab-active');
      var target = tab.dataset.tab;
      document.getElementById('acct-panel-groom').classList.toggle('accounts-panel--hidden', target !== 'groom');
      document.getElementById('acct-panel-bride').classList.toggle('accounts-panel--hidden', target !== 'bride');
    });
  });
}

// ============================================================
//  8. MAP LINKS
// ============================================================
function initMapLinks() {
  var c = WEDDING_CONFIG;
  var name = encodeURIComponent(c.venueName);

  // 티맵: 앱 딥링크 시도 → 미설치 시 스토어로 이동
  var tmapBtn = document.getElementById('btn-tmap-nav');
  if (tmapBtn) {
    tmapBtn.href = '#';
    tmapBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var appUrl = 'tmap://route?goalname=' + name +
                   '&goalx=' + c.lng + '&goaly=' + c.lat +
                   '&reqCoordType=WGS84GEO&resCoordType=WGS84GEO';
      var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      var storeUrl = isIOS
        ? 'https://apps.apple.com/kr/app/id431589174'
        : 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku';
      var timer = setTimeout(function () { location.href = storeUrl; }, 1200);
      window.addEventListener('blur',     function () { clearTimeout(timer); }, { once: true });
      window.addEventListener('pagehide', function () { clearTimeout(timer); }, { once: true });
      location.href = appUrl;
    });
  }

  setHref('btn-kakao-navi', 'https://map.kakao.com/?q=' + name);
  setHref('btn-naver-nav',  'https://map.naver.com/v5/search/' + name);

  var mapEl = document.getElementById('venue-map-embed');
  if (mapEl && c.lat && c.lng) {
    mapEl.style.height = '300px';
    var script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=' + c.kakaoAppKey + '&autoload=false';
    script.onload = function () {
      kakao.maps.load(function () {
        var map = new kakao.maps.Map(mapEl, {
          center: new kakao.maps.LatLng(c.lat, c.lng),
          level: 4,
        });
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(c.lat, c.lng),
          map: map,
        });
        var infoWindow = new kakao.maps.InfoWindow({
          content: '<div data-iw="venue" style="padding:8px 12px;font-size:13px;font-family:\'Noto Sans KR\',sans-serif;white-space:nowrap;line-height:1.4;text-align:center;">' + c.venueName + '</div>',
        });
        infoWindow.open(map, marker);
        // Kakao InfoWindow outer wrapper has a fixed width — force it to 115px.
        function resizeIW() {
          var inner = mapEl.querySelector('[data-iw="venue"]');
          if (!inner) return;
          var node = inner.parentElement;
          while (node && node !== mapEl) {
            var st = node.style;
            if (st && st.border && st.background) {
              node.style.width = '115px';
              break;
            }
            node = node.parentElement;
          }
        }
        setTimeout(resizeIW, 0);
        setTimeout(resizeIW, 200);
      });
    };
    document.head.appendChild(script);
  }
}

// ============================================================
//  9. ADDRESS COPY
// ============================================================
function initAddressCopy() {
  var btn = document.getElementById('btn-copy-addr');
  if (!btn) return;
  btn.addEventListener('click', function () {
    doCopy(WEDDING_CONFIG.venueAddress, '주소가 복사되었습니다 ✓');
  });
}

// ============================================================
//  10. BOTTOM ACTION BAR
// ============================================================
function initBottomBar() {
  // 일정 등록
  document.getElementById('btn-calendar').addEventListener('click', function () {
    addToCalendar();
  });

  // 링크 복사
  document.getElementById('btn-link-copy').addEventListener('click', function () {
    var url = WEDDING_CONFIG.shareUrl || location.href;
    doCopy(url, '링크가 복사되었습니다 ✓');
  });

  // 카카오톡 공유 — Kakao SDK 피드 템플릿
  document.getElementById('btn-kakao-share').addEventListener('click', function () {
    var c = WEDDING_CONFIG;
    var siteUrl  = c.shareUrl || location.origin;
    var imageUrl = siteUrl + '/assets/images/og-image.jpg';

    if (window.Kakao && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: c.groomName + ' ♡ ' + c.brideName,
          description: c.weddingDateKo + ' ' + c.weddingTimeKo + '\n' + c.venueName,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
        buttons: [{
          title: '모바일청첩장 바로가기',
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        }],
      });
    } else {
      doCopy(siteUrl, '링크가 복사되었습니다\n카카오톡에 붙여넣기 하세요 ✓');
    }
  });
}

// 일정 등록 — iOS/Android 모두 대응
function addToCalendar() {
  var c = WEDDING_CONFIG;
  var start = new Date(c.weddingDatetime);
  var end   = new Date(start.getTime() + 2 * 3600000); // +2시간

  function icsDate(d) {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  var ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:' + icsDate(start),
    'DTEND:' + icsDate(end),
    'SUMMARY:' + c.groomName + ' ♡ ' + c.brideName + ' 결혼식',
    'LOCATION:' + c.venueName + ' ' + c.venueAddress,
    'DESCRIPTION:' + c.weddingDateKo + ' ' + c.weddingTimeKo,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href     = url;
  a.download = 'wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('일정 파일을 저장했습니다 📅');
}

// ============================================================
//  11. MUSIC PLAYER
// ============================================================
function initMusicPlayer() {
  var src = WEDDING_CONFIG.musicSrc;
  if (!src) return;
  var audio = document.getElementById('bgm');
  var btn   = document.getElementById('btn-music');
  if (!audio || !btn) return;

  audio.src = src;
  btn.hidden = false;

  var userStopped = false;

  btn.addEventListener('click', function () {
    if (audio.paused) {
      userStopped = false;
      audio.play().then(function () {
        btn.classList.add('is-playing');
      }).catch(function () {});
    } else {
      userStopped = true;
      audio.pause();
      btn.classList.remove('is-playing');
    }
  });

  audio.addEventListener('ended', function () {
    if (!userStopped) {
      audio.currentTime = 0;
      audio.play().catch(function () {});
    }
  });
}

// ============================================================
//  ACCOUNT COPY (global — called from inline onclick)
// ============================================================
window.copyAccount = function (btn) {
  var row = btn.closest('.account-row');
  if (row) doCopy(row.dataset.account.replace(/-/g, ''), '계좌번호가 복사되었습니다 ✓');
};

// ============================================================
//  UTILITIES
// ============================================================
function doCopy(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function () { showToast(successMsg); })
      .catch(function () { fallbackCopy(text, successMsg); });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (e) {
    showToast('복사에 실패했습니다. 직접 복사해주세요.');
  }
  document.body.removeChild(ta);
}

var toastTimer = null;
function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2800);
}

function setText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

function setAttr(id, attr, val) {
  var el = document.getElementById(id);
  if (el) el.setAttribute(attr, val);
}

function setHref(id, href) {
  var el = document.getElementById(id);
  if (el) el.href = href;
}

function pad2(n) { return String(n).padStart(2, '0'); }

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
