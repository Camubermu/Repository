document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const detail = document.getElementById('detail-panel');

  if (!grid || !detail) return;

  function renderPanel(sectionKey, title) {
    // If same section is already open, close it
    if (!detail.hasAttribute('hidden') && detail.dataset.section === sectionKey) {
      closePanel();
      return;
    }

    detail.dataset.section = sectionKey;
    detail.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'detail-panel__header';

    const h = document.createElement('div');
    h.className = 'detail-panel__title';
    h.textContent = title || sectionKey;

    const close = document.createElement('button');
    close.className = 'detail-panel__close';
    close.setAttribute('aria-label', 'Cerrar');
    close.innerHTML = '✕';
    close.addEventListener('click', closePanel);

    header.appendChild(h);
    header.appendChild(close);

    const body = document.createElement('div');
    body.className = 'detail-panel__body';
    // Empty body — ready to be filled with content for each section

    detail.appendChild(header);
    detail.appendChild(body);

    detail.removeAttribute('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closePanel() {
    detail.setAttribute('hidden', '');
    delete detail.dataset.section;
    detail.innerHTML = '';
  }

  // Delegate clicks inside the grid
  grid.addEventListener('click', function (ev) {
    const card = ev.target.closest('.card');
    if (!card) return;
    // prevent navigation fallback
    ev.preventDefault();
    const section = card.dataset.section || card.getAttribute('aria-label') || card.querySelector('.card__title')?.textContent.trim();
    const title = card.querySelector('.card__title')?.textContent.trim() || section;
    renderPanel(section, title);
  });

  // Keyboard accessibility: Enter / Space on focused card
  grid.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const card = ev.target.closest('.card');
    if (!card) return;
    ev.preventDefault();
    const section = card.dataset.section || card.getAttribute('aria-label') || card.querySelector('.card__title')?.textContent.trim();
    const title = card.querySelector('.card__title')?.textContent.trim() || section;
    renderPanel(section, title);
  });
});
