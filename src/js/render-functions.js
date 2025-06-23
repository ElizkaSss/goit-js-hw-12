import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
loader.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>
    `
  ).join('');

  galleryContainer.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block'; 
}

export function hideLoader() {
  loader.style.display = 'none';
}


//export function showLoader() {
 // loader.classList.remove('hidden');
//}

//export function hideLoader() {
 // loader.classList.add('hidden');
//}