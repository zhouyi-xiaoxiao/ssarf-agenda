'use strict';

(() => {
  const agenda = [...document.querySelectorAll('.agenda-item')];
  const dialog = document.getElementById('focus-dialog');
  const minutes = [5, 10, 10, 30, 10, 15, 10];
  const slots = ['11:30', '11:35', '11:45', '11:55', '12:25', '12:35', '12:50'];
  const display = document.getElementById('timer-display');
  const timerButton = document.getElementById('toggle-timer');
  const timerStatus = document.getElementById('timer-status');
  let section = 0;
  let remaining = minutes[0] * 60;
  let deadline = null;
  let interval = null;
  let printState = [];

  function renderTimer() {
    const total = Math.max(0, Math.ceil(remaining));
    display.value = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
    display.textContent = display.value;
    display.classList.toggle('is-finished', total === 0);
  }

  function pauseTimer() {
    if (deadline !== null) remaining = Math.max(0, (deadline - Date.now()) / 1000);
    clearInterval(interval);
    interval = null;
    deadline = null;
    timerButton.textContent = remaining > 0 ? 'Resume timer' : 'Start timer';
    renderTimer();
  }

  function resetTimer() {
    pauseTimer();
    remaining = minutes[section] * 60;
    timerButton.textContent = 'Start timer';
    timerStatus.textContent = 'Ready when you are.';
    renderTimer();
  }

  function tick() {
    remaining = Math.max(0, (deadline - Date.now()) / 1000);
    renderTimer();
    if (remaining === 0) {
      pauseTimer();
      timerStatus.textContent = 'Section time is up. Continue when you are ready.';
    }
  }

  function selectSection(index) {
    section = Math.max(0, Math.min(agenda.length - 1, index));
    const item = agenda[section];
    const title = item.querySelector('.item-title').firstChild.textContent.trim();
    const detail = item.querySelector('.agenda-detail');
    document.getElementById('focus-progress').textContent = `${String(section + 1).padStart(2, '0')} / 07`;
    document.getElementById('focus-slot').textContent = `${slots[section]} · ${minutes[section]} minutes`;
    document.getElementById('focus-title').textContent = title;
    document.getElementById('focus-purpose').textContent = detail.querySelector('div > p').textContent;
    const questions = document.getElementById('focus-questions');
    questions.replaceChildren(detail.querySelector('ul').cloneNode(true));
    const context = detail.querySelector('.context-note');
    if (context) questions.append(context.cloneNode(true));
    const outcome = document.getElementById('focus-outcome');
    outcome.replaceChildren(...[...detail.querySelector('.outcome').childNodes].map(node => node.cloneNode(true)));
    document.getElementById('previous-section').disabled = section === 0;
    document.getElementById('next-section').disabled = section === agenda.length - 1;
    resetTimer();
    dialog.scrollTop = 0;
  }

  document.getElementById('open-focus').addEventListener('click', () => {
    selectSection(section);
    dialog.showModal();
    document.body.classList.add('focus-open');
  });
  document.getElementById('close-focus').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    pauseTimer();
    document.body.classList.remove('focus-open');
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && section < agenda.length - 1) {
      event.preventDefault();
      selectSection(section + 1);
    } else if (event.key === 'ArrowLeft' && section > 0) {
      event.preventDefault();
      selectSection(section - 1);
    }
  });
  document.getElementById('previous-section').addEventListener('click', () => selectSection(section - 1));
  document.getElementById('next-section').addEventListener('click', () => selectSection(section + 1));
  agenda.forEach((item, index) => item.querySelector('summary').addEventListener('click', () => {
    section = index;
  }));
  timerButton.addEventListener('click', () => {
    if (deadline !== null) {
      pauseTimer();
      timerStatus.textContent = 'Paused.';
      return;
    }
    if (remaining <= 0) resetTimer();
    deadline = Date.now() + remaining * 1000;
    timerButton.textContent = 'Pause timer';
    timerStatus.textContent = 'Timer running.';
    interval = setInterval(tick, 250);
    tick();
  });
  document.getElementById('reset-timer').addEventListener('click', resetTimer);
  document.getElementById('print-agenda').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    printState = agenda.map(item => item.open);
    agenda.forEach(item => { item.open = true; });
  });
  window.addEventListener('afterprint', () => {
    agenda.forEach((item, index) => { item.open = printState[index] ?? false; });
  });
  renderTimer();
})();
