import { renderParamsCard } from '../api/fetch-info';
import { mainCardListEl } from '../refs';
import filmCard from '../../templates/film-card.hbs';

const libraryQueueBtn = document.querySelector('.library-queue-btn');
libraryQueueBtn.addEventListener('click', e => {
  localStorage.setItem('queueActive', true)
  localStorage.setItem('watchedActive', false)
  renderQueueFilms()});

export function renderQueueFilms() {
  let localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData === null || localStorageData.length === 0) {
    mainCardListEl.innerHTML = '<h1>Please, add queue films</h1>';
  } else {
    mainCardListEl.innerHTML = ''
    localStorageData.forEach(e => {
      renderParamsCard(e)
        .then(data => {
            const dataObj = {...data,
            year: new Date(data.release_date).getFullYear(),
            }
          mainCardListEl.insertAdjacentHTML('beforeend', filmCard([dataObj]));
        })
        .catch(() => {});
    });

  }
}