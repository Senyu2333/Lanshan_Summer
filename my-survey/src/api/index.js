import axios from "axios";
import './mock.js'
axios.defaults.baseURL ='/api'
/**
@param {Object} credentials
@param {string} credentials.username
@param {string} credentials.password
@return {Promise<{code:number,data:{id:string,username:string,token:string}}>}
**/

export function login(credentials){
    return axios
    .post('/login',{credentials})
        .then(res => res.data)
}

/**
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 * @returns {Promise<{code: number, data: {id: string, username: string, token: string}}>}
 */

export function register(credentials){
    return axios
    .post('/register',{credentials})
    .then(res => res.data)
}