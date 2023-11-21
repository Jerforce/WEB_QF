<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-input placeholder="请输入设备名称" v-model="pageDto.where.name"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入设备标识" v-model="pageDto.where.deviceKey"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择全部设备类型" v-model="pageDto.where.deviceTypeId">
          <el-option :value="typeId">选择全部设备类型</el-option>
          <el-option v-for="(item,index) in typeList" :value="item.id" :key="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="请选择设备激活状态" value-key="id" v-model="pageDto.where.active">
          <el-option :value="active">请选择设备激活状态</el-option>
          <el-option value="0" key="id" label="激活"></el-option>
          <el-option value="1" key="id" label="未激活"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
        <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
      </el-col>
    </el-row>


    <el-table :data="deviceList" style="width: 100%">
      <el-table-column prop="name" label="设备名称"> </el-table-column>
      <el-table-column prop="deviceKey" label="设备标识"> </el-table-column>
      <el-table-column prop="typeName" label="设备类型"> </el-table-column>
      <el-table-column prop="productName" label="所属产品"> </el-table-column>
      <el-table-column label="父设备id">
        <!-- 自定义渲染 -->
        <template slot-scope="scope">
          {{scope.row.parentId==0?'无':scope.row.parentId}}
        </template>
      </el-table-column>
      <el-table-column prop="tenantName" label="所属租户"> </el-table-column>
      <el-table-column label="激活状态">
        <!-- 自定义渲染 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.active==1" type="success">激活</el-tag>
          <el-tag v-if="scope.row.active!=1" type="danger">未激活</el-tag>
        </template>

      </el-table-column>
      <el-table-column label="在线状态">
        <el-tag>离线</el-tag>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" style="width: 180px;"> </el-table-column>

      <el-table-column label="操作" style="width: 300px;">
        <template slot-scope="scope">
          <el-button type="text" size="small">查询数据</el-button>
          <el-button type="text" size="small">发指令</el-button>
          <el-button type="text" size="small">指令日志</el-button>
        </template>
      </el-table-column>
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
  import { page } from "@/api/device";
  //导入pcd组件
  // import PCD  from '../components/pcd.vue';
  export default {
    components: {
      // // PCD:PCD
      // PCD
    },
    data() {
      return {
        deviceList: [],
        typeList: [],
        pageDto: {
          now: 1,
          size: 5,
          where: {
            name: "",
            deviceKey: "",
            deviceTypeId: "",
            active: "",
          },
        },
        typeId: "",
        pages: 0,
        total: 0,
        active: ""
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
          this.deviceList = res.data.pageResult.list;
          this.total = res.data.pageResult.total;
          this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
          this.typeList = res.data.typeList
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