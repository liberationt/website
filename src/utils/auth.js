import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// 存入用户账号
export function setName(userName) {
    return Cookies.set("userName", userName)
}
export function getName() {
    return Cookies.get("userName")
}
