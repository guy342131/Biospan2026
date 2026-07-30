// BIOSPAN 2026 — shared behaviour

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Countdown to inauguration: Sept 24 2026, 2:00 PM IST
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const target = new Date('2026-09-24T14:00:00+05:30').getTime();
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    function tick() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        countdownEl.querySelector('.countdown-label').textContent = 'Symposium is live';
        [dEl, hEl, mEl, sEl].forEach((el) => { if (el) el.textContent = '00'; });
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      const pad = (n) => String(n).padStart(2, '0');
      if (dEl) dEl.textContent = pad(days);
      if (hEl) hEl.textContent = pad(hours);
      if (mEl) mEl.textContent = pad(mins);
      if (sEl) sEl.textContent = pad(secs);
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  // Schedule day tabs
  const tabs = document.querySelectorAll('.day-tab');
  const panels = document.querySelectorAll('.day-panel');
  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
      });
    });
  }

  // Register form
  const form = document.getElementById('register-form');
  if (form) {
    const submissionField = document.getElementById('field-submission-detail');
    const submissionCheckbox = document.getElementById('wants-to-present');

    if (submissionCheckbox && submissionField) {
      submissionCheckbox.addEventListener('change', () => {
        submissionField.style.display = submissionCheckbox.checked ? 'block' : 'none';
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const summary = document.getElementById('form-success');
      const nameSpan = document.getElementById('success-name');
      form.style.display = 'none';
      if (nameSpan) nameSpan.textContent = name || 'there';
      if (summary) summary.style.display = 'block';
    });
  }
});
