import axios from 'axios'

const api = axios.create({
    baseURL: 'https://metaservidor.herokuapp.com/'
})

export default api;