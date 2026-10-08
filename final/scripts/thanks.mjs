// Form action page: reads the submitted values from the URL and displays them
import './nav.mjs';

const params = new URLSearchParams(window.location.search);
const results = document.querySelector('#results');

const fields = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'zip', label: 'ZIP Code' },
  { key: 'current', label: 'Current Service' },
  { key: 'usage', label: 'Internet Use' },
  { key: 'preference', label: 'Preferred Technology' },
  { key: 'comments', label: 'Comments' },
];

// textContent (not innerHTML) keeps anything typed into the form from running as HTML
function addRow(label, value) {
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  results.append(term, detail);
}

fields
  .filter((field) => params.get(field.key))
  .forEach((field) => addRow(field.label, params.get(field.key)));

const submitted = new Date(params.get('timestamp'));
if (!Number.isNaN(submitted.getTime())) {
  addRow('Submitted', `${submitted.toLocaleDateString()} at ${submitted.toLocaleTimeString()}`);
}

if (results.children.length === 0) {
  addRow('Notice', 'No form data was found. Please use the Check Service form.');
}
