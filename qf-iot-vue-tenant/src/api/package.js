import request from '@/utils/request'

export function list() {
    return request.post("/package/list");
}

export function order(packageId) {
    return request.get("/package-order/order/" + packageId);
}
export function save(packageId) {
    return request({
        url: '/package-order/save/' + packageId,
        method: 'post'
    })
}

export function getPayUrl(packageOrderId) {
    return request.get("/pay/getPayUrl/" + packageOrderId);
}
export function find() {
    return request.post("/package-order/findByOrder");
}
