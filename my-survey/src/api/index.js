import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
/**
 * 注册
 * @param {{username:string,password:string}} credentials
 * @returns {Promise<{code: 0, data: any} | {code:1, message:string}>}
 */
export async function register(credentials) {
    const { data: existing } = await axios.get('/users', {
        params: { username: credentials.username }
    })
    if (existing.length > 0) {
        return { code: 1, message: '该用户已存在' }
    }
    const token = Math.random().toString(36).slice(-8)
    const payload = { ...credentials, token }
    const res = await axios.post('/users', payload)

    return { code: 0, data: res.data }
}
/**
 * 登录
 * @param {{username:string,password:string}} credentials
 * @returns {Promise<{code:0, data:any} | {code:1, message:string}>}
 */
export async function login(credentials) {
    try {
        const res = await axios.get('/users', {
            params: credentials
        })
        const user = res.data[0]
        if (user) {
            return { code: 0, data: user }
        } else {
            return { code: 1, message: '用户名或密码错误' }
        }
    } catch {
        return { code: 1, message: '登录失败，请重试' }
    }
}

/**
 * 创建问卷
 * @param {Object} survey  完整的问卷对象
 * @returns {Promise<{code:0,data:any}|{code:1,message:string}>}
 */
export function createSurvey(survey) {
    return axios
        .post('/surveys', survey)
        .then(res => ({ code: 0, data: res.data }))
        .catch(err => ({ code: 1, message: err.message }));
}