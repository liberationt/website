import request from '@/utils/request'
// 列表查询
export function getTouchHistoryList(params) {
    return request({
      url: '/call/call/callinfoservice/touchHistoryList',
      method: 'get',
      params
    })
}
//详情
export function getCallInfoService(id) {
    return request({
      url: `/call/call/callinfoservice/${id}`,
      method: 'get',
    })
}
