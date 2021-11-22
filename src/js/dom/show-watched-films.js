import { renderParamsCard } from '../api/fetch-info';
import { mainCardListEl } from '../refs';
import filmCard from '../../templates/film-card.hbs';
import { showModalError } from './modal-error';
import {libraryBtnEl } from '../refs';
import { addActiveColorLibraryWBtn, removeActiveColorLibraryQBtn } from '../dom/home-library-page-switch.js';

libraryBtnEl.addEventListener('click', e => renderWatchedFilms());
const libraryWatchedBtn = document.querySelector('.library-watched-btn');
libraryWatchedBtn.addEventListener('click', e => {
  localStorage.setItem('watchedActive', true)
  localStorage.setItem('queueActive', false)
  localStorage.setItem('searching', false);
  renderWatchedFilms();
  addActiveColorLibraryWBtn();
  removeActiveColorLibraryQBtn();
});

export function renderWatchedFilms() {
  
  let localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData === null || localStorageData.length === 0) {
    mainCardListEl.innerHTML =
      '<p style="margin:0 auto">The list is empty. Please, add watched films</p>';
  } else {
    mainCardListEl.innerHTML = ''
    localStorageData.forEach(e => {
      renderParamsCard(e)
        .then(data => {
          const dataObj = { ...data, year: new Date(data.release_date).getFullYear() };
          mainCardListEl.insertAdjacentHTML('beforeend', filmCard([dataObj]));
        })
        .catch(showModalError);
    });

  }
}