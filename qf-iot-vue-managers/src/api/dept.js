import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/depart/page',
    method: 'post',
    data
  })
}

export function update(data){
    return request.post("/depart/update",data);
}

export function save(data){
   return  request.post("/depart/save",data);
}


export function drop(deptId){
  // return  request.post("/depart/delete/"+deptId);
  return request({
    url:"/depart/delete/"+deptId,
    method:"post",
  });
}