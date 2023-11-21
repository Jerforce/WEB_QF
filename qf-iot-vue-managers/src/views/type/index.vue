<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-input placeholder="请输入设备名称" v-model="pageDto.where.name"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择全部设备行业" v-model="pageDto.where.industryId">
          <el-option :value="industryId">选择全部设备行业</el-option>
          <el-option v-for="(item,index) in industryList" :value="item.id" :key="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="选择全部设备类型" v-model="pageDto.where.deviceType">
          <el-option :value="deviceType">选择全部设备类型</el-option>
          <el-option value="1" key="id" label="网关"></el-option>
          <el-option value="2" key="id" label="传感器"></el-option>
          <el-option value="3" key="id" label="继电器"></el-option>
          <el-option value="4" key="id" label="摄像头"></el-option>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
        <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
        <el-button @click="dialogFormVisible = true" type="success" icon="el-icon-circle-plus">添加</el-button>

      </el-col>


    </el-row>
    <el-table :data="typeList" style="width: 100%">
      <el-table-column prop="name" label="设备类型名称"> </el-table-column>
      <el-table-column prop="industryName" label="所属行业"> </el-table-column>
      <el-table-column label="设备类型">
        <!-- 自定义渲染 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.deviceType==1" type="success">网关</el-tag>
          <el-tag v-if="scope.row.deviceType==2" type="success">传感器</el-tag>
          <el-tag v-if="scope.row.deviceType==3" type="success">继电器</el-tag>
          <el-tag v-if="scope.row.deviceType==4" type="success">摄像头</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期"> </el-table-column>
      <el-table-column prop="updateTime" label="修改日期"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="gotoUpd(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageDto.now"
      :page-sizes="[5, 10, 50, 100]" :page-size="pageDto.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="添加设备类型" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="设备类型名">
          <el-input v-model="type.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备所属行业">
          <el-select v-model="type.industryId" placeholder="请选择设备行业">
            <el-option v-for="(item,index) in industryList" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="type.deviceType" placeholder="选择全部设备类型">
            <el-option value="1" key="id" label="网关"></el-option>
            <el-option value="2" key="id" label="传感器"></el-option>
            <el-option value="3" key="id" label="继电器"></el-option>
            <el-option value="4" key="id" label="摄像头"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false,pck={},permId=[]">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改设备类型" :visible.sync="dialogFormVisible1">
      <el-form>
        <el-form-item label="设备类型名">
          <el-input v-model="type.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备所属行业">
          <el-select v-model="type.industryId" placeholder="请选择设备行业">
            <el-option v-for="(item,index) in industryList" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="type.deviceType" placeholder="选择全部设备类型">
            <el-option :value="1" key="id" label="网关"></el-option>
            <el-option :value="2" key="id" label="传感器"></el-option>
            <el-option :value="3" key="id" label="继电器"></el-option>
            <el-option :value="4" key="id" label="摄像头"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  //导入dept api
  import { page, save ,gotoupd,update} from "@/api/type";
  //导入pcd组件
  // import PCD  from '../components/pcd.vue';
  export default {
    components: {
      // // PCD:PCD
      // PCD
    },
    data() {
      return {
        dialogFormVisible1:false,
        dialogFormVisible: false,
        typeList: [],
        intustryList: [],
        pageDto: {
          now: 1,
          size: 5,
          where: {
            name: "",
            industryId: "",
            deviceType: "",
          },
        },
        industryId: "",
        pages: 0,
        total: 0,
        deviceType: "",
        type: {
          name: "",
          industryId: "",
          deviceType: ""
        }
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
          this.typeList = res.data.pageResult.list;
          this.total = res.data.pageResult.total;
          this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
          this.industryList = res.data.industryList
        });
      },
      add() {
        save(this.type).then(res => {
          this.$message({
            message: res.message,
            type: res.code == 0 ? 'success' : 'error'
          });
          this.dialogFormVisible = false
          this.type = {}
          this.search()
        })
      },
      gotoUpd(id) {
        gotoupd(id).then(res => {
          if (res.code == 0) {
            this.type = res.data
            this.dialogFormVisible1 = true
          }
        })
      },
      update() {
        update(this.type).then(res => {
          this.$message({
            type: res.code == 0 ? 'success' : 'error',
            message: res.message
          })
          this.dialogFormVisible1 = false
          this.type = {}
          this.search()
        })
      }
    },
    created() {
      this.search();
    },
  };
</script>

<style lang="">
</style>