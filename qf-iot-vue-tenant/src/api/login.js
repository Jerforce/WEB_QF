import request from '@/utils/request'

export function login(data) {
    return request.post("/tenant/login", data);
}

export function verifyToken() {
    return request.post("/tenant/verifyToken");
  }