import axios from 'axios'

const instance = axios.create({
    baseUrl: 'http://localhost:7000'
});

export default instance;