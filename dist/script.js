'use strict';

(() => {
  const agenda = [...document.querySelectorAll('.agenda-item')];
  let printState = [];

  document.getElementById('print-agenda').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    printState = agenda.map(item => item.open);
    agenda.forEach(item => { item.open = true; });
  });
  window.addEventListener('afterprint', () => {
    agenda.forEach((item, index) => { item.open = printState[index] ?? false; });
  });
  document.querySelectorAll('.priority-card').forEach(link => link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.open = true;
  }));
})();
