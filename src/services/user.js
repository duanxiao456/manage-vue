import {LOGIN, REGISTER, ROUTES} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'
import Mock from "mockjs";

const user = Mock.mock({
    avatar: '@AVATAR',
    address: '@CITY',
    position: '@POSITION'
})

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
    return request(LOGIN, METHOD.POST, {userName: name, password: password})
        .then(res => {
            let result = {}
            if (res.data.loginName === name) {
                result.code = 0
                result.message = Mock.mock('@TIMEFIX').CN + '，欢迎回来'
                result.data = {}
                result.data.user = user
                result.data.user.name = res.data.userName
                result.data.token = 'Authorization:' + Math.random()
                result.data.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000)
                result.data.permissions = [{id: 'queryForm', operation: ['add', 'edit']}]
                result.data.roles = [{id: 'admin', operation: ['add', 'edit', 'delete']}]
            } else {
                result.code = -1
                result.message = '账户名或密码错误!'
            }
            return result
        })
        .catch(error => {
            console.log(error)
        })
}

/**
 * 注册服务
 * @param user 用户实体
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function register(user) {
    return request(REGISTER, METHOD.POST, user)
        .then(res => {
            let result = {}
            if (res.data === 1) {
                result.code = 0
            } else {
                result.code = -1
            }
            return result
        })
        .catch(error => {
            console.log(error)
        })
}

export async function getRoutesConfig() {
    return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
    localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
    localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
    localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
    removeAuthorization()
}

export default {
    login,
    logout,
    getRoutesConfig
}
