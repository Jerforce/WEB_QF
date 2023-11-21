import request from '@/utils/request'

export function all() {
  return request({
    url: '/package-tenant-perms/all',
    method: 'post'
  })
}
export function save(data) {
  return request({
    url: '/package-tenant-perms/save',
    method: 'post',
    data
  })
}
export function del(permId) {
    return request({
      url: "/package-tenant-perms/delete/" + permId,
      method: "post",
    })
  }
  export function gotoupd(id) {
    return request({
      url: "/package-tenant-perms/gotoUpd/" + id,
      method: "post"
    })
  }
  export function update(data) {
    return request({
      url: '/package-tenant-perms/update',
      method: 'post',
      data
    })
  }