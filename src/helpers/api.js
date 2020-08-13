import axios from 'axios';


export const api = axios.create({
    baseURL: "https://back-isw-pabellon.herokuapp.com/api/v1/",
    timeout: 20000,
});
