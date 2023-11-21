<template>
    <div class="app-container">
        <el-table :data="industryList" style="width: 100%">
            <el-table-column prop="id" label="行业id" header-align="center" align="center"> </el-table-column>
            <el-table-column prop="name" label="行业名称" header-align="center" align="center"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间" header-align="center" align="center" show-overflow-tooltip></el-table-column>
        </el-table>

        <div class="app-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageDto.pageNow" :page-sizes="[5, 10, 50, 100]" :page-size="pageDto.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
  
<script>

import { page } from '@/api/industry'

export default {
    data() {
        return {
            // 分页信息
            pageDto: {
                pageNow: 1,
                pageSize: 5,
                where: {}
            },
            pages: 0,
            total: 0,
            industryList: [],

        }
    },

    methods: {
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
                this.industryList = res.list;
                this.pages = res.pages;
                this.total = res.total;
            })
        }
    },
    created() {
        this.search();
    }
}
</script>