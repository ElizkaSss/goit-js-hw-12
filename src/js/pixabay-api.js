import axios from 'axios';

const API_KEY = '50969769-837e1e35a02cf09097b5591db';
const URL = 'https://pixabay.com/api/';
;

export async function getImagesByQuery(query, page = 1, perPage = 15) {
    const response = await axios.get(URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: perPage,
        }
    })

    return response.data;
}