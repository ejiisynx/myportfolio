document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor ── */
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  const animCursor = () => {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  };
  animCursor();
  document.querySelectorAll('a, button, .bento-card, .tag, .social-pill, .contact-row, .fact-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('grow'); ring.classList.add('grow'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('grow'); ring.classList.remove('grow'); });
  });

  /* ── Scrolled nav ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Scroll reveal observer ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

  /* ── Active nav ── */
  const secs = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let c = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 160) c = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + c));
  }, { passive: true });

  /* ── Hamburger ── */
  const tog = document.querySelector('.nav-toggle'), menu = document.querySelector('.nav-links');
  if (tog && menu) {
    tog.addEventListener('click', () => { tog.classList.toggle('open'); menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { tog.classList.remove('open'); menu.classList.remove('open'); }));
  }

  /* ── Role cycling ── */
  const roles = document.querySelectorAll('.hero-role-item'); let ri = 0;
  if (roles.length) {
    roles[ri].classList.add('hl');
    setInterval(() => { roles[ri].classList.remove('hl'); ri = (ri + 1) % roles.length; roles[ri].classList.add('hl'); }, 1800);
  }

  /* ── Hero 3D parallax on mouse ── */
  const heroRight = document.getElementById('heroRight');
  const heroContainer = document.getElementById('heroPhotoContainer');
  if (heroRight && heroContainer) {
    heroRight.addEventListener('mousemove', e => {
      const r = heroRight.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      heroContainer.style.transform = `rotateY(${nx * 8}deg) rotateX(${-ny * 6}deg) translateZ(10px)`;
    });
    heroRight.addEventListener('mouseleave', () => {
      heroContainer.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    });
  }

  /* ── About photo 3D tilt ── */
  const photo3d = document.getElementById('photo3d');
  const photoShine = document.getElementById('photoShine');
  const aboutBlock = document.getElementById('aboutPhotoBlock');
  if (photo3d && aboutBlock) {
    aboutBlock.addEventListener('mousemove', e => {
      const r = aboutBlock.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      photo3d.style.transform = `rotateY(${nx * 14}deg) rotateX(${-ny * 10}deg)`;
      if (photoShine) {
        const px = ((e.clientX - r.left) / r.width) * 100;
        const py = ((e.clientY - r.top) / r.height) * 100;
        photoShine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.1), transparent 60%)`;
      }
    });
    aboutBlock.addEventListener('mouseleave', () => {
      photo3d.style.transform = 'rotateY(0) rotateX(0)';
      if (photoShine) photoShine.style.background = '';
    });
  }

  /* ── 3D tilt on bento cards ── */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const shine = card.querySelector('.bento-shine');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${nx * 10}deg) rotateX(${-ny * 7}deg) translateZ(8px)`;
      if (shine) {
        const px = ((e.clientX - r.left) / r.width) * 100;
        const py = ((e.clientY - r.top) / r.height) * 100;
        shine.style.setProperty('--mx', px + '%');
        shine.style.setProperty('--my', py + '%');
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });

  /* ── Scroll-driven parallax ── */
  const parallaxLayers = [
    { el: document.querySelector('.blob-1'), speed: 0.15 },
    { el: document.querySelector('.blob-2'), speed: -0.1 },
    { el: document.querySelector('.blob-3'), speed: 0.2 },
  ];
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    parallaxLayers.forEach(({ el, speed }) => {
      if (el) el.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });

  /* ── Send button ── */
  const sb = document.getElementById('sendBtn');
  if (sb) {
    sb.addEventListener('click', () => {
      sb.querySelector('span').innerHTML = '<svg class="ic" width="16" height="16"><use href="#i-check"/></svg> Message sent!';
      sb.style.background = 'linear-gradient(135deg,#1D9E75,#128054)';
      sb.disabled = true;
      setTimeout(() => {
        sb.querySelector('span').innerHTML = '<svg class="ic" width="16" height="16"><use href="#i-send"/></svg> Send message';
        sb.style.background = ''; sb.disabled = false;
      }, 3500);
    });
  }

  /* ════════════════════════════════════════
     GALLERY: thumbnail switcher per card
     ════════════════════════════════════════ */
  document.querySelectorAll('.bento-card').forEach(card => {
    const mainImg  = card.querySelector('.proj-main-img img');
    const thumbs   = card.querySelectorAll('.proj-thumb');
    const imgs     = JSON.parse(card.dataset.imgs || '[]');

    // Thumbnail click → swap main image
    thumbs.forEach(thumb => {
      if (thumb.classList.contains('empty')) return;
      thumb.addEventListener('click', e => {
        e.stopPropagation();
        const idx = parseInt(thumb.dataset.idx);
        if (isNaN(idx) || !imgs[idx]) return;

        // Update active thumb
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // Swap main image with fade
        if (mainImg) {
          mainImg.style.opacity = '0';
          mainImg.style.transform = 'scale(.97)';
          setTimeout(() => {
            mainImg.src = imgs[idx];
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
          }, 180);
          mainImg.style.transition = 'opacity .18s, transform .18s';
        }
      });
    });
  });

  /* ════════════════════════════════════════
     LIGHTBOX
     ════════════════════════════════════════ */
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbTitle   = document.getElementById('lbTitle');
  const lbCounter = document.getElementById('lbCounter');
  const lbThumbs  = document.getElementById('lbThumbs');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbBackdrop= document.getElementById('lbBackdrop');

  let lbImgs  = [];
  let lbIdx   = 0;

  function lbShow(imgs, idx, title) {
    lbImgs  = imgs;
    lbIdx   = idx;
    lbTitle.textContent = title || '';
    lbRender();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function lbRender() {
    // Main image with crossfade
    lbImg.classList.add('switching');
    setTimeout(() => {
      lbImg.src = lbImgs[lbIdx];
      lbImg.alt = `Photo ${lbIdx + 1}`;
      lbImg.classList.remove('switching');
    }, 160);

    lbCounter.textContent = `${lbIdx + 1} / ${lbImgs.length}`;

    // Rebuild thumbs
    lbThumbs.innerHTML = '';
    lbImgs.forEach((src, i) => {
      const t = document.createElement('img');
      t.src = src;
      t.className = 'lb-thumb' + (i === lbIdx ? ' active' : '');
      t.alt = `Thumbnail ${i + 1}`;
      t.addEventListener('click', () => { lbIdx = i; lbRender(); });
      lbThumbs.appendChild(t);
    });

    // Arrows visibility
    lbPrev.style.opacity = lbImgs.length > 1 ? '1' : '0';
    lbNext.style.opacity = lbImgs.length > 1 ? '1' : '0';
  }

  function lbHide() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open lightbox from main image click
  document.querySelectorAll('.proj-main-img[data-open-lb]').forEach(area => {
    area.addEventListener('click', () => {
      const card  = area.closest('.bento-card');
      const imgs  = JSON.parse(card.dataset.imgs || '[]');
      const title = card.dataset.project || '';
      // Find active thumb index
      const activeThumb = card.querySelector('.proj-thumb.active');
      const startIdx    = activeThumb ? parseInt(activeThumb.dataset.idx) || 0 : 0;
      if (imgs.length) lbShow(imgs, startIdx, title);
    });
  });

  // Arrows
  lbPrev.addEventListener('click', () => {
    lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length;
    lbRender();
  });
  lbNext.addEventListener('click', () => {
    lbIdx = (lbIdx + 1) % lbImgs.length;
    lbRender();
  });

  // Close
  lbClose.addEventListener('click', lbHide);
  lbBackdrop.addEventListener('click', lbHide);

  // Keyboard: arrows + Escape
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      lbHide();
    if (e.key === 'ArrowLeft')   { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; lbRender(); }
    if (e.key === 'ArrowRight')  { lbIdx = (lbIdx + 1) % lbImgs.length; lbRender(); }
  });

  // Touch swipe support
  let tsX = null;
  lb.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    if (tsX === null) return;
    const dx = e.changedTouches[0].clientX - tsX;
    if (Math.abs(dx) > 50) {
      lbIdx = dx < 0
        ? (lbIdx + 1) % lbImgs.length
        : (lbIdx - 1 + lbImgs.length) % lbImgs.length;
      lbRender();
    }
    tsX = null;
  });

  // Add lightbox trigger to cursor grow list
  document.querySelectorAll('.proj-main-img, .proj-thumb, .lb-arrow, .lb-thumb, .lb-close').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('grow'); ring.classList.add('grow'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('grow'); ring.classList.remove('grow'); });
  });

});
