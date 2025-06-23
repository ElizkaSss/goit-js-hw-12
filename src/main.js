import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    hideLoadMoreButton,
    showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

const loadMoreBtn = document.querySelector('#load-more-btn');

let currentPage = 1;
let currentQuery = '';
const perPage = 15;
let totalHits = 0;


//         'Search'

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!',
            position: 'topRight',
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;

    clearGallery();
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage, perPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please, try again!',
                position: 'topRight',
            });
            return;
        }

        createGallery(data.hits);

        if (totalHits > perPage) {
            showLoadMoreButton();
        }

    } catch (err) {
        console.error(err);
        iziToast.error({
            message: 'Oops! Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
});


//               "Load more"

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;

    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage, perPage);
        createGallery(data.hits);

        scrollPage()

        const loadedImages = document.querySelectorAll('.gallery-item').length;

        if (loadedImages >= totalHits) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            })
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
        }
    } catch (err) {
        console.error(err);
        iziToast.error({
            message: 'Oops! Something went wrong. Please try again later.',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
});

function scrollPage() {
    const { height: cardHeight } = document
        .querySelector('.gallery-item')
        .getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

