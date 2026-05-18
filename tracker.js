(function () {
  const DAY = document.body.dataset.day;

  function storageKey(week, slug) {
    return `r1_d${DAY}_s${week}_${slug}`;
  }

  let currentWeek = localStorage.getItem('r1_week') || '1';

  function loadWeek(week) {
    document.querySelectorAll('.card[data-ex]').forEach(card => {
      const data = JSON.parse(localStorage.getItem(storageKey(week, card.dataset.ex)) || '{}');
      const pesoEl = card.querySelector('.track-peso');
      const notasEl = card.querySelector('.track-notas');
      const fieldsEl = card.querySelector('.track-fields');
      pesoEl.textContent = data.peso ? `${data.peso} kg` : '';
      notasEl.textContent = data.notas || '';
      fieldsEl.style.display = (data.peso || data.notas) ? '' : 'none';
    });
  }

  function syncNav(week) {
    document.querySelectorAll('.week-nav [data-week]').forEach(a => {
      a.classList.toggle('active', a.dataset.week === week);
    });
  }

  document.querySelectorAll('.week-nav [data-week]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      currentWeek = a.dataset.week;
      localStorage.setItem('r1_week', currentWeek);
      syncNav(currentWeek);
      loadWeek(currentWeek);
    });
  });

  syncNav(currentWeek);
  loadWeek(currentWeek);
})();
