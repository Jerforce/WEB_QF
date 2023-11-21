import request from '@/utils/request'

export function all() {
  return request({
    url: '/package/all',
    method: 'post'
  })
}
export function gotoAdd() {
  return request({
    url: '/package-tenant-perms/gotoAdd',
    method: 'post'
  })
}
export function save(data) {
  return request({
    url: '/package/save',
    method: 'post',
    data
  })
}
export function del(pckId) {
  return request({
    url: "/package/delete/" + pckId,
    method: "post",
  })
}
export function gotoupd(id) {
  return request({
    url: "/package/gotoUpd/" + id,
    method: "post"
  })
}
export function update(data) {
  return request({
    url: '/package/update',
    method: 'post',
    data
  })
}
