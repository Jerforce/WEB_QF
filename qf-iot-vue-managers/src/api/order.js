import request from '@/utils/request'

export function all() {
  return request({
    url: '/package-order/all',
    method: 'post'
  })
}
  export function del(orderId) {
    return request({
      url: "/package-order/delete/" + orderId,
      method: "post",
    })
  }