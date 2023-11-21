import request from '@/utils/request'

export function page(data) {
    return request.post("/industry/page", data);
}