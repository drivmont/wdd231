// Technology Explorer page: loads, filters, and displays the technologies
import './nav.mjs';
import { getTechnologies } from './data.mjs';
import { openModal } from './modal.mjs';
import { saveFilter, loadFilter } from './storage.mjs';

const container = document.querySelector('#tech-list');
const filterSelect = document.querySelector('#category-filter');
const resultCount = document.querySelector('#result-count');

let technologies = [];

function displayTechnologies(list) {
  container.innerHTML = list.map((tech) => `
    <article class="tech-card">
      <h2>${tech.name}</h2>
      <p class="badge">${tech.category}</p>
      <dl class="tech-details">
        <dt>Speed</dt><dd>${tech.speed}</dd>
        <dt>Range</dt><dd>${tech.range}</dd>
        <dt>Latency</dt><dd>${tech.latency}</dd>
      </dl>
      <button type="button" class="button" data-id="${tech.id}">Details<span class="sr-only"> about ${tech.name}</span></button>
    </article>
  `).join('');

  resultCount.textContent = `Showing ${list.length} of ${technologies.length} technologies`;
}

function applyFilter(category) {
  const filtered = category === 'all'
    ? technologies
    : technologies.filter((tech) => tech.category === category);
  displayTechnologies(filtered);
}

async function init() {
  technologies = await getTechnologies('data/technologies.json');

  if (technologies.length === 0) {
    container.innerHTML = '<p class="error">Sorry, the technology list could not be loaded. Please try again later.</p>';
    return;
  }

  const savedFilter = loadFilter();
  filterSelect.value = savedFilter;
  applyFilter(filterSelect.value);
}

filterSelect.addEventListener('change', () => {
  saveFilter(filterSelect.value);
  applyFilter(filterSelect.value);
});

// One listener on the container handles every Details button (event delegation)
container.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const tech = technologies.find((item) => item.id === Number(button.dataset.id));
  openModal(tech);
});

init();
