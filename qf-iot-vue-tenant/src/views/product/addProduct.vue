<template>
    <div class="app-container">
        <el-page-header @back="goBack" content="新建产品">
        </el-page-header>

        <div class="app-container">
            <p>产品名称：</p>
            <el-input placeholder="请输入内容" v-model="productName" style="width: 300px;"></el-input>
        </div>

        <div class="app-container" style="margin-top: -30px;">
            <p>所属区域：</p>
            <el-select placeholder="请选择" v-model="provinceId" @change="cityId = ''; districtId = ''; provinceChange()">
                <el-option v-for="item in provinceList" :key="item.value" :label="item.name" :value="item.code">
                    {{ item.name }}
                </el-option>
            </el-select>

            <el-select placeholder="请选择" v-model="cityId" @change="districtId = ''; cityChange()" :disabled="cityFlag"
                style="margin-left: 20px;">
                <el-option v-for="item in cityList" :key="item.value" :label="item.name" :value="item.code">
                    {{ item.name }}
                </el-option>
            </el-select>

            <el-select placeholder="请选择" :disabled="districtFlag" v-model="districtId" style="margin-left: 20px;">
                <el-option v-for="item in districtList" :key="item.value" :label="item.name" :value="item.code">
                    {{ item.name }}
                </el-option>
            </el-select>
        </div>
        <div class="app-container" style="margin-top: -20px;">
            <el-button @click="addProduct" type="primary">添加</el-button>
        </div>
    </div>
</template>

<script>
import { add, selectAllArea, selectCityByProvinceId, selectDistrictByCityId } from '@/api/product'

export default {
    data() {
        return {
            productName: "",

            areaList: [],
            // 省
            provinceList: [],
            provinceName: "",
            provinceId: "",

            // 市
            cityList: [],
            cityName: "",
            cityId: "",

            // 区
            districtList: [],
            districtName: "",
            districtId: "",

            cityFlag: true,
            districtFlag: true,

            product: {},
            productDto: {},
        }
    },
    methods: {
        // 省的变化事件
        provinceChange() {
            // 根据provinceId查询对应的cityList
            selectCityByProvinceId(this.provinceId).then(res => {
                this.cityList = res.data;
            })
            this.cityFlag = false;
        },

        // 市的变化事件
        cityChange() {
            // 根据cityName查询对应的districtList
            selectDistrictByCityId(this.cityId).then(res => {
                this.districtList = res.data;
            })
            this.districtFlag = false;
        },

        // 区的变化事件, 如果省的下拉框选了直辖市, 就隐藏区县的下拉框
        

        // 返回上一页
        goBack() {
            this.$router.push({ path: "/product" });
        },

        // 添加产品
        addProduct() {
            this.productDto.productName = this.productName;
            this.productDto.provinceId = this.provinceId;
            this.productDto.cityId = this.cityId;
            this.productDto.districtId = this.districtId;

            add(this.productDto).then(res => {
                if (res.code == 200) {
                    this.$router.push({ path: "/myProduct" });
                }
            })
        }
    },
    created() {
        // 页面加载完毕后渲染地区信息
        selectAllArea().then(res => {
            this.areaList = res.data;
            this.areaList.forEach(item => {
                if (item.level == 1) {
                    this.provinceList.push(item);
                }
            });
        })
    }
}
</script>

<style></style>