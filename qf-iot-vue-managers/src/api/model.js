import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/model-template/page',
    method: 'post',
    data
  })
}
export function save(data) {
    return request({
      url: '/model-template/save',
      method: 'post',
      data
    })
  }
  export function gotoupd(id) {
    return request({
      url: "/model-template/gotoUpd/" + id,
      method: "post"
    })
  }
  export function update(data) {
    return request({
      url: '/model-template/update',
      method: 'post',
      data
    })
  }