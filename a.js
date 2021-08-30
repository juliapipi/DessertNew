'use strict';
const all = document.querySelector('.all');
const upper = document.querySelector('.upper');
const lower = document.querySelector('.lower');
const first = document.querySelector('.first');
const second = document.querySelector('.second');

upper.addEventListener('click', function () {
  second.classList.add('hidden');
  first.classList.remove('hidden');
});
all.addEventListener('click', function () {
  first.classList.remove('hidden');
  second.classList.remove('hidden');
});
lower.addEventListener('click', function () {
  first.classList.add('hidden');
  second.classList.remove('hidden');
});
