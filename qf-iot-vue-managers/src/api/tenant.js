import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/tenant/page',
    method: 'post',
    data
  })
}
export function update(data){
  return request.post("/tenant/update",data);
}