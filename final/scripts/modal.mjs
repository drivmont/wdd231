// Shows technology details in an accessible <dialog> modal
const dialog = document.querySelector('#tech-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeButton = document.querySelector('#dialog-close');

export function openModal(tech) {
  dialogContent.innerHTML = `
    <h2 id="dialog-title">${tech.name}</h2>
    <p class="badge">${tech.category}</p>
    <p>${tech.description}</p>
    <dl class="tech-details">
      <dt>Speed</dt><dd>${tech.speed}</dd>
      <dt>Range</dt><dd>${tech.range}</dd>
      <dt>Latency</dt><dd>${tech.latency}</dd>
      <dt>Relative Cost</dt><dd>${tech.cost}</dd>
      <dt>Line of Sight</dt><dd>${tech.lineOfSight}</dd>
      <dt>Best For</dt><dd>${tech.bestFor}</dd>
    </dl>
  `;
  dialog.showModal();
}

closeButton.addEventListener('click', () => dialog.close());

// Close when the visitor clicks the backdrop outside the dialog box
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
