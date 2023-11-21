import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/device-type/page',
    method: 'post',
    data
  })
}
export function save(data) {
    return request({
      url: '/device-type/save',
      method: 'post',
      data
    })
  }
  export function gotoupd(id) {
    return request({
      url: "/device-type/gotoUpd/" + id,
      method: "post"
    })
  }
  export function update(data) {
    return request({
      url: '/device-type/update',
      method: 'post',
      data
    })
  }