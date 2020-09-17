import axios from 'axios';

const instance = axios.create({
    baseURL: "https://dart-kk.firebaseio.com/"
});

export default instance;