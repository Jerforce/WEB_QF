<template>
    <div class="app-container">
        <el-page-header @back="goBack" content="设备详情">
        </el-page-header>


        <el-collapse v-model="activeNames" @change="handleChange" class="app-container" style="width: 500px;">
            <el-collapse-item title="产品名称" name="1" width="300px" style="display: inline;">
              <div>{{product.name}}</div>
            </el-collapse-item>

            <el-collapse-item title="设备类型" name="2">
                <div v-if="deviceType1.deviceType == 1">设备类型：网关</div><br>
                <div v-if="deviceType1.deviceType == 2">设备类型：传感器</div><br>
                <div v-if="deviceType1.deviceType == 3">设备类型：继电器</div><br>
                <div v-if="deviceType1.deviceType == 4">设备类型：摄像头</div><br>
            </el-collapse-item>

            <el-collapse-item title="设备的Key" name="3">
              <div>{{device.deviceKey}}</div>
            </el-collapse-item>

            <el-collapse-item title="设备的Secret" name="4">
              <div>{{device.deviceSecret}}</div>
            </el-collapse-item>
          </el-collapse>



        <el-tabs v-model="activeName" @tab-click="handleClick">

            <el-tab-pane label="设备信息" name="first" selected>
                <span>产品名称：{{ product.name }}</span><br>
                <hr>
                <span>ProductKey：{{ product.productKey }}</span><br>
                <hr>
                <span>设备名称：{{ device.name }}</span><br>
                <hr>
                <span>创建时间：{{ device.createTime }}</span>
            </el-tab-pane>

            <el-tab-pane label="Topic列表" name="second">
                <div v-for="(item, index) in deviceTopicList">{{ item.topic }}</div>
            </el-tab-pane>

            <el-tab-pane label="物模型数据" name="third"></el-tab-pane>
            <el-tab-pane label="上报数据" name="fourth"></el-tab-pane>
            <el-tab-pane label="发送数据" name="fifth"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import { find } from '@/api/detail'

export default {
    data() {
        return {
            device: {
                deviceName: "",
                deviceKey: "",
                createTime: "",
                deviceSecret: ""
            },
            product: {
                name: "",
            },
            deviceType1: {
                name: "",
            },
            deviceIdAndProductId: {
                deviceId: "",
                productId: ""
            },
            deviceTopicList: [],
            activeName: 'first'

        }
    },
    methods: {
        search() {
            this.deviceIdAndProductId.deviceId = localStorage.getItem("deviceId");
            this.deviceIdAndProductId.productId = localStorage.getItem("productId");

            find(this.deviceIdAndProductId).then(res => {
                this.device = res.data.device;
                this.product = res.data.product;
                this.deviceType1 = res.data.deviceType1;
                this.deviceTopicList = res.data.deviceTopicList;
            })
        },
        goBack() {
            this.$router.push({path: "/device"});
        }
    },
    created() {
        this.search();
    }
}
</script>

<style></style>