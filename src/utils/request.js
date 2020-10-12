import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
import {Msg} from '@/utils/tools';
import { removeToken } from '@/utils/auth'

export const API_URL = 'http://192.168.10.123:8771/sys'
var allResquest = 0;
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    paramsSerializer: params => { // 查询字符串中的数组不使用方括号
			return qs.stringify(params, { indices: false })
		},
    timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
      if (store.getters.token) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
            config.headers['filterMode'] = localStorage.getItem('dataType')
        }
      config.headers['project'] = "csr"
      allResquest = allResquest + 1;
      if (config.mask !== true)  {
        Msg.loading()
      }
      return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get information such as headers or status
     * Please return  response => response
     */
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        allResquest = allResquest - 1;
        const res = response.data;
        if (response.status === 200) {
          if (allResquest === 0) {
            Msg.hideLoading();
          }
            // 50008 系统无此账号
            // 50010 账号禁用
            // 50012 账号或密码错误
            // 50013 主账号被禁用，禁止登录
            // 50014 token失效
            // 50015 登录失败，无操作权限，请联系系统管理员!
            // 50016 验证码错误
            // 429   限流 服务器拥挤，请稍后再试
            // -999  未知错误
            // 403  无权限
            if (res.code === 50008 || res.code === 50010 || res.code === 50012 || res.code === 50013 ||
              res.code === 50016 || res.code === 50015 || res.code === 429 || res.code === -999 || res.code === 403 || res.code === 500) {
                Message({
                    message: res.msg || 'error',
                    type: 'error',
                    duration: 5 * 1000,
                    offset: 0
                })
              return Promise.reject(res.msg || 'error')
            } else if (res.code === 50014) {
              if (store.getters.token) {
                removeToken()
              }
              MessageBox.alert( res.msg,'错误提示', {
                confirmButtonText: '确定',
                callback: action => {
                  store.dispatch('logout')
                  router.push(`/login`)
                }
              })
              return false
            }
            return res
        }
    },
    error => {
        allResquest = allResquest - 1;
        Msg.hideLoading();
        Message({
            message: '服务拥挤，请稍后重试！',
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
