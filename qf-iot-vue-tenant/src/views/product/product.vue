<template>
    <div class="app-container">
        <el-row>
            <el-col :span="4">
                <el-card class="box-card" style="width: 200px;height: 110px">
                    <div class="text item">
                        创建产品<br>
                        <h5>产品是同品类设备的集合</h5>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="box-card" style="width: 200px;height: 110px">
                    <div class="text item">
                        创建设备<br>
                        <h5>创建设备获取连接平台所需的身份信息</h5>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="box-card" style="width: 200px;height: 110px">
                    <div class="text item">
                        设备端开发<br>
                        <h5>继承LinkSDK，开发设备端程序</h5>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="box-card" style="width: 200px;height: 110px">
                    <div class="text item">
                        查看上报数据<br>
                        <h5>查看设备上报的属性数据SDK，开发设备端程序</h5>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="box-card" style="width: 200px;height: 110px">
                    <div class="text item">
                        接下来建议您：<br>
                        <h5>配置数据流转</h5>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="app-container">

            <el-table :data="productList" style="width: 100%">
                <el-table-column prop="name" label="产品名称" header-align="center" align="center"></el-table-column>
                <el-table-column prop="productKey" label="productKey" header-align="center"
                    align="center"></el-table-column>

                <el-table-column label="创建时间" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{ formatDateTime(scope.row.createTime) }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showDetail(scope.row.id); drawer = true" type="primary"
                            style="margin-left: 16px;">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="app-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pageDto.pageNow" :page-sizes="[5, 10, 50, 100]" :page-size="pageDto.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <el-drawer title="产品详情" :visible.sync="drawer" :with-header="true">
            <div class="app-container" style="margin-top: -20px;">
                <p>产品ID：{{ detail.id }}</p><br>
                <p>产品名称：{{ detail.name }}</p><br>
                <p>ProductKey：{{ detail.productKey }}</p><br>
                <p>创建时间：{{ detail.createTime }}</p><br>
                <p>用户名：{{ detail.username }}</p><br>
                <!-- <p>密码：{{ detail.password }}</p> -->
            </div>

        </el-drawer>
    </div>
</template>

<script>
import { page, detail } from '@/api/product'

export default {
    data() {
        return {
            drawer: false,
            dialogFormVisible: false,

            // 分页信息
            pageDto: {
                pageNow: 1,
                pageSize: 5,
                where: {}
            },
            pages: 0,
            total: 0,
            productList: [],
            detail: {}
        }
    },
    methods: {
        formatDateTime(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Intl.DateTimeFormat('zh-CN', options).format(new Date(date));
        },

        // 点击分页的事件
        // 点击切换每页显示条数
        handleSizeChange(size) {
            this.pageDto.pageSize = size;
            this.search();
            this.pageDto.where = {};
        },
        // 点击切换当前页
        handleCurrentChange(now) {
            this.pageDto.pageNow = now;
            this.search();
        },

        search() {
            page(this.pageDto).then(res => {
                this.productList = res.list;
                this.pages = res.pages;
                this.total = res.total;
            })
        },

        showDetail(id) {
            this.dialogFormVisible = true;
            detail(id).then(res => {
                this.detail = res.data;
            })
        },
    },
    created() {
        this.search();
    }
}
</script>

<style></style>