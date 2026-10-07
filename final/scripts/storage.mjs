// Saves and restores the visitor's category filter with localStorage
const FILTER_KEY = 'rurallink-filter';

export function saveFilter(value) {
  localStorage.setItem(FILTER_KEY, value);
}

export function loadFilter() {
  return localStorage.getItem(FILTER_KEY) ?? 'all';
}
