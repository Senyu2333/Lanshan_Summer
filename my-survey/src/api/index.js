import axios from "axios";
import './mock.js'
axios.defaults.baseURL ='/api'
/**
@param {Object} credentials
@param {string} credentials.username
@param {string} credentials.password
@return Promise
**/

export function login(credentials){
    return axios
    .post('/login',{credentials})
        .then(res => res.data)

}