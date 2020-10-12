import request from '@/utils/request'
// 客户查询
export function getPersonList(params) {
    return request({
      url: '/call/call/person/list',
      method: 'get',
      params
    })
}

//详情
//添加
export function addPersonInfor(data) {
  return request({
    url: '/call/call/person',
    method: 'post',
    data:data
  })
}
//查询
export function getPersonInfor(params) {
  return request({
    url: `/call/call/person`,
    method: 'get',
    params
  })
}
//更新
export function updateInfor(data) {
  return request({
    url: `/call/call/person`,
    method: 'put',
    data:data
  })
}
//根据手机号查询

export function getPensorInforList(params) {
  return request({
    url: `/call/call/person/listByMobile`,
    method: 'get',
    params
  })
}
//根据id查询
export function getUniqueIdInfor(params) {
  return request({
    url: `/call/call/callinfoservice/record`,
    method: 'get',
    params
  })
}
//详情中的记录
export function getCallHistory(params) {
  return request({
    url: `/call/call/callinfoservice/touchHistory`,
    method: 'get',
    params
  })
}
