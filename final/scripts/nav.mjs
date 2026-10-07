// Responsive navigation: toggles the menu on small screens
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
