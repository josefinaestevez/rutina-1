(function () {
  const DAY = document.body.dataset.day;
  let currentWeek = localStorage.getItem('r1_week') || '1';

  function loadWeek(week) {
    const weekData = (RUTINA['d' + DAY] || {})['w' + week] || {};
    document.querySelectorAll('.card[data-ex]').forEach(card => {
      const d      = weekData[card.dataset.ex] || {};
      const peso   = d.peso  || '';
      const notas  = d.notas || '';
      const pesoEl   = card.querySelector('.track-peso');
      const notasEl  = card.querySelector('.track-notas');
      const fieldsEl = card.querySelector('.track-fields');
      pesoEl.textContent  = peso ? peso + ' kg' : '';
      notasEl.textContent = notas;
      fieldsEl.style.display = (peso || notas) ? '' : 'none';
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
