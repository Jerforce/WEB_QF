import request from '@/utils/request'

export function find(data) {
    return request.post("/device/detail", data);
}