import request from '@/utils/request'
// 所属区域树获取
export function getAddress(data) {
    return request({
      url: '/admin/base/area/tree',
      method: 'get',
      params: data,
      mask: true
    })
}

// 获取验证码
export function validateCode(id) {
  return request({
    url: '/uaa/validata/code/' + id,
    method: 'get',
    responseType: 'arraybuffer'
    // params: data
  })
}
// 登录
export function login(data) {
  return request({
    url: '/uaa/oauth/token',
    method: 'post',
    params: data
  })
}
//退出
export function logout(token) {
  return request({
    url: '/uaa/logout',
    method: 'get',
    params: { token }
  })
}
export function getInfo(token) {
  return request({
    url: '/select',
    method: 'get',
    params: { token }
  })
}
// 所有下拉框的字典数据
export function allSelectData(data) {
	return request({
		url: '/admin/system/dict/datas?dictTypes='+data,
		method: 'get'
	})
}