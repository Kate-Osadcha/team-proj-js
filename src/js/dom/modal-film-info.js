import { renderParamsCard } from '../api/fetch-info';
import filmCard from '../../templates/film-info.hbs';
import { backdrop, modalFrame, mainCardListEl, bodyEl } from '../refs';
import { toggleToWatched } from '../storage/add-to-watched.js';
import { toggleToQueue } from '../storage/add-to-queue.js';

let id = 'id';

function renderMovieSearchParam(id) {
  renderParamsCard(id)
    .then(data => {
      modalFrame.innerHTML = filmCard(data);

      const addWatched = document.querySelector('.js-addWatched');
      addWatched.addEventListener('click', e => toggleToWatched(data.id));
      const addQueue = document.querySelector('.js-addQueue');
      addQueue.addEventListener('click', e => toggleToQueue(data.id));
    })
    .catch(() => {});
}

mainCardListEl.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  id = e.target.dataset.id;
  renderMovieSearchParam(id);
  backdrop.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  window.addEventListener('keydown', modalCloseByEsc);
  backdrop.addEventListener('click', backdropClick);
  closeByButton();
});

function modalClose() {
  window.removeEventListener('keydown', modalCloseByEsc);
  backdrop.removeEventListener('click', backdropClick);
  backdrop.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  modalFrame.innerHTML = '';
}

function backdropClick(e) {
  if (e.currentTarget === e.target) {
    modalClose();
  }
}

function modalCloseByEsc(e) {
  if (e.code === 'Escape') {
    modalClose();
  }
}

function closeByButton() {
  const modalCloseBtn = document.querySelector('.close-btn');
  modalCloseBtn.addEventListener('click', modalClose);
}