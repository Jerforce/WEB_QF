import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/area/page',
    method: 'post',
    data
  })
}