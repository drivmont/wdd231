// Check Service page: records when the form was loaded
import './nav.mjs';

const timestamp = document.querySelector('#timestamp');
timestamp.value = new Date().toISOString();
