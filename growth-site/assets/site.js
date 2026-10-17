(() => {
  const search = document.querySelector('#guide-search');
  const cards = [...document.querySelectorAll('.guide-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  if (!search || !cards.length || !count || !empty) return;

  let category = 'Todos';
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const searchable = cards.map((card) => normalize(card.textContent));

  function update() {
    const query = normalize(search.value.trim());
    let visible = 0;
    cards.forEach((card, index) => {
      const matches = (category === 'Todos' || card.dataset.category === category)
        && searchable[index].includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'roteiro encontrado' : 'roteiros encontrados'}`;
    empty.hidden = visible !== 0;
  }

  search.addEventListener('input', update);
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { search.value = ''; update(); }
  });
  filters.forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    update();
  }));
})();
