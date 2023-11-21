import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/device/page',
    method: 'post',
    data
  })
}