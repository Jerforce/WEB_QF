import request from '@/utils/request'

export function page(data) {
    return request.post("/product/page", data);
}

export function myProduct(data) {
    return request.post("/product/myProduct", data);
}

export function detail(id) {
    return request.get("/product/detail/" + id);
}

export function add(data) {
    return request.post("/product/add", data);
}

export function del(id) {
    return request.get("/product/delete" + id);
}

export function selectAllArea() {
    return request.post("/area/selectArea");
}

export function selectCityByProvinceId(provinceId) {
    return request.get("/area/selectCityByProvinceId/" + provinceId);
}

export function selectDistrictByCityId(cityId) {
    return request.get("/area/selectDistrictByCityId/" + cityId);
}