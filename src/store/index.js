import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { login, logout, getInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import qs from 'qs'

export default new Vuex.Store({
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    accountData: {},
    sysUserConfig: null // 企业设置
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_DATA: (state, data) => {
      state.data = data
    },
    SET_SYS_USER_CONFIG: (state, sysUserConfig) => {
      state.sysUserConfig = sysUserConfig
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const {seatNumber, username, password, code, deviceId } = userInfo
      localStorage.setItem('username', username)
      return new Promise((resolve, reject) => {
        const queryStr = location.search.slice(1)
        const query = qs.parse(queryStr)
        login({
          seatNumber:seatNumber,
          username: username.trim(),
          password: password,
          validCode: code,
          deviceId: deviceId,
          grant_type: 'password',
          client_id: 'fO4iq61pPVuhbPSKmAgNF3mt',
          client_secret: 'RBDjX9yl4MouiDazfMJza9LZ',
          redirect_url: query.redirect
        }).then(response => {
          const { access_token } = response
          commit('SET_TOKEN', access_token)
          setToken(access_token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { roles, name, avatar, introduction } = response
          commit('SET_ROLES', roles)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          localStorage.removeItem('seatNumber')
          sessionStorage.removeItem('uniqueId')
          // location.reload()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  },
  modules: {},
  getters : {
    //判断是否有token,如果没有重新赋值，返回给state的token
    token(state) {
      if (!state.token) {
        state.token = getToken()
      }
      return state.token
    }
  }
});
