import request from '@/utils/request'

export function page(data) {
    return request.post("/device/page", data);
}

export function myDevice(data) {
    return request.post("/device/myDevice", data);
}

export function del(id) {
    return request.get("/device/delete/"+id);
}

export function all() {
    return request.post("/device/allProduct")
}

export function allType() {
    return request.post("/device/allType")
}

export function add(data) {
    return request.post("/device/add", data)
}

export function send(data) {
    return request.post("/device/cmd", data)
}

