import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/product/page',
    method: 'post',
    data
  })
}