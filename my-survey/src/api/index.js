import axios from "axios";
axios.defaults.baseURL ='/api'
/**
 * 注册
 * @param {{username:string,password:string}} credentials
 * @returns {Promise<{code: number, data: any}|{code:1,message:string}>}
 */
export function register(credentials){
    return axios
        .post('/users', credentials)
        .then(res=>({code:0,data:res.data}))
        .catch(()=>({code:1,message:"用户名已被占用"}))
}
/**
 * 登录
 * @param {{username:string,password:string}} credentials
 * @returns {Promise<{code:0,data:any}|{code:1,message:string}>}
 */
export function login(credentials) {
    return axios
        .get('/users', {
            params: credentials
        })
        .then(res => {
            const u = res.data[0]
            if (u) {
                return { code: 0, data: u }
            } else {
                return { code: 1, message: '用户名或密码错误' }
            }
        })
        .catch(() => ({ code: 1, message: '登录失败，请重试' }))
}