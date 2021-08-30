'use strict';
const latest = document.querySelector('.moveup');
const inner = document.querySelector('.inner');

document.getElementById('overview').onclick = function () {
  location.href = 'overview.html';
};
window.addEventListener('load', function () {
  latest.classList.remove('moveup--hidden');
  inner.classList.remove('inner--hidden');
});
