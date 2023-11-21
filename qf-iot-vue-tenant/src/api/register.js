import request from '@/utils/request'

export function register(data) {
    return request.post("/tenant/register", data);
}