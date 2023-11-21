import request from '@/utils/request'

export function pagesave(data) {
  return request({
    url: '/industry/page',
    method: 'post',
    data
  })

}

export function update(data){
  return request({
    url:'/industry/update',
    method: 'post',
    data
  })


}

export function save(data){
  return request({
    url:'/industry/save',
    method: 'post',
    data
  })


}
export function delete1(id){
  return request({
    url:'/industry/delete/'+id,
    method: 'post',
    
  })


}