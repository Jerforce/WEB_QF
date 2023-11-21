<template>
    <div class="app-container">
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入产品名称" v-model="pageDto.where.name"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入用户名" v-model="pageDto.where.username"></el-input>
        </el-col>
        <el-col :span="4">
            <el-input placeholder="请输入产品标识" v-model="pageDto.where.productKey"></el-input>
          </el-col>
        <el-col :span="4">
        <el-select placeholder="请选择行政区" value-key="code"  v-model="pageDto.where.areaCode">
            <el-option :value="typeId">请选择行政区</el-option>
            <el-option v-for="(item,index) in areaList" :value="item.code" :key="item.code" :label="item.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
        <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
        <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
      </el-col>
      </el-row>
  
  
      <el-table :data="productList" style="width: 100%">
        <el-table-column prop="name" label="产品名称"> </el-table-column>
        <el-table-column label="所属租户">
            <template slot-scope="scope">
                <el-tag  type="success">{{scope.row.tenantName}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="areaName" label="行政区"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="productKey" label="产品标识key"> </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageDto.now"
        :page-sizes="[5, 10, 50, 100]" :page-size="pageDto.size" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  <script>
    //导入dept api
    import { page } from "@/api/product";
    //导入pcd组件
    // import PCD  from '../components/pcd.vue';
    export default {
      components: {
        // // PCD:PCD
        // PCD
      },
      data() {
        return {
          productList: [],
          areaList: [],
          pageDto: {
            now: 1,
            size: 5,
            where: {
              name:"",
              username:"",
              productKey:"",
              areaCode:"",
            },
          },
          pages: 0,
          total: 0,
        };
      },
      methods: {
        handleSizeChange(size) {
          this.pageDto.size = size;
          this.search();
        },
        handleCurrentChange(now) {
          this.pageDto.now = now;
          this.search();
        },
        search() {
          page(this.pageDto).then((res) => {
            this.productList = res.data.pageResult.list;
            this.total = res.data.pageResult.total;
            this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
            this.areaList = res.data.areaList
          });
        },
      },
      created() {
        this.search();
      },
    };
  </script>
  
  <style lang="">
  </style>