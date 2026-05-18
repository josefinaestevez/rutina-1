(function () {
  const DAY = document.body.dataset.day;

  function storageKey(week, slug) {
    return `r1_d${DAY}_s${week}_${slug}`;
  }

  let currentWeek = localStorage.getItem('r1_week') || '1';

  function loadWeek(week) {
    document.querySelectorAll('.card[data-ex]').forEach(card => {
      const data = JSON.parse(localStorage.getItem(storageKey(week, card.dataset.ex)) || '{}');
      card.querySelector('.track-peso').value = data.peso || '';
      card.querySelector('.track-notas').value = data.notas || '';
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

  document.querySelectorAll('.card[data-ex]').forEach(card => {
    const slug = card.dataset.ex;

    card.querySelector('.track-peso').addEventListener('input', e => {
      const k = storageKey(currentWeek, slug);
      const data = JSON.parse(localStorage.getItem(k) || '{}');
      data.peso = e.target.value;
      localStorage.setItem(k, JSON.stringify(data));
    });

    card.querySelector('.track-notas').addEventListener('input', e => {
      const k = storageKey(currentWeek, slug);
      const data = JSON.parse(localStorage.getItem(k) || '{}');
      data.notas = e.target.value;
      localStorage.setItem(k, JSON.stringify(data));
    });
  });

  syncNav(currentWeek);
  loadWeek(currentWeek);
})();
