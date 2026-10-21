'use strict';
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const prev = document.getElementById('nav-prev');
  const next = document.getElementById('nav-next');
  const fullscreen = document.getElementById('fullscreen');
  const status = document.getElementById('display-status');
  let current = 0;
  function show() {
    const id = location.hash.slice(1);
    const found = slides.findIndex(slide => slide.id === id);
    current = found < 0 ? 0 : found;
    slides.forEach((slide, index) => { slide.hidden = index !== current; });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    document.getElementById('page-number').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    document.title = `${slides[current].querySelector('h1,h2').firstChild.textContent.trim()} · PGR SSARF`;
    window.scrollTo(0, 0);
  }
  function move(step) {
    const index = Math.max(0, Math.min(slides.length - 1, current + step));
    location.hash = slides[index].id;
    show();
  }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else status.textContent = 'Use your browser’s full-screen menu. / 请使用浏览器菜单中的全屏功能。';
    } catch {
      status.textContent = 'Use your browser’s full-screen menu. / 请使用浏览器菜单中的全屏功能。';
    }
  }
  fullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'Exit full screen / 退出全屏 ⛶' : 'Full screen / 全屏 ⛶';
    status.textContent = '';
  });
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  window.addEventListener('hashchange', show);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    if (!slides.some(slide => '#' + slide.id === hash)) return;
    event.preventDefault();
    location.hash = hash;
    show();
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); move(-1); }
    else if (event.key === 'Home') { event.preventDefault(); location.hash = 'overview'; show(); }
    else if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
  });
  show();
})();
