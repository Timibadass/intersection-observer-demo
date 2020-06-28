import axios from "axios";
let baseURL = 'https://jsonplaceholder.typicode.com'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000
})

export default instance