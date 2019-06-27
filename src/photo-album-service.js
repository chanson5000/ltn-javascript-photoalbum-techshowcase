import axios from 'axios';

export function getAllPhotos(callback) {
    axios.get('http://jsonplaceholder.typicode.com/photos')
        .then((response) => callback(null, response))
        .catch((error) => callback(error));
}