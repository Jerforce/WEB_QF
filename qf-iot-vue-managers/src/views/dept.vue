<template>
  <div class="app-container">
    <!-- 条件框 -->
    <el-row>
        <el-col :span="4">
            <el-input @clear="search()"  placeholder="请输入部门名" v-model="pageDto.where.deptName" clearable> </el-input>
        </el-col>
        <el-col :span="2">
            <el-button @click="pageDto.now=1;search()" type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
         <el-col :span="2">
            <el-button @click="dialogFormVisible=true"  type="success" icon="el-icon-circle-plus">添加</el-button>
        </el-col>
    </el-row>
    
    <el-table  :data="departList" style="width: 100%">
      <el-table-column prop="deptId" label="ID"> </el-table-column>
      <el-table-column prop="deptName" label="部门名称"> </el-table-column>
      <el-table-column prop="leader" label="部门领导"> </el-table-column>
   
      <el-table-column  label="状态"> 

          <!-- 自定义渲染 -->
          <template slot-scope="scope">
             {{scope.row.status==0?'启用':'禁用'}}
          </template>

      </el-table-column>
      <el-table-column   label="操作"> 

           <template slot-scope="scope">
             <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
             <el-button @click="drop(scope.row.deptId)" type="danger" size="mini" icon="el-icon-delete"></el-button>     

           </template>

      </el-table-column>

    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageDto.now"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pageDto.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>


    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="部门名称" >
                <el-input v-model="dept.deptName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="部门领导" >
                <el-input v-model="dept.leader" autocomplete="off"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </div>
     </el-dialog>
  </div>
</template>
<script>
//导入dept api
import { page, update, save ,drop} from "@/api/dept";
//导入pcd组件
// import PCD  from '../components/pcd.vue';
export default {
  components: {
    // // PCD:PCD
    // PCD
  },
  data() {
    return {
      dialogFormVisible:false,
      departList: [],
      pageDto: {
        now: 1,
        size: 5,
        where: {},
      },
      pages: 0,
      dept: {
        deptName: "",
        leader: "",
      },
      total: 0,
    };
  },
  methods: {
    drop(deptId){
         //与服务端交互
         drop(deptId).then(res=>{
            if(res.code==0){
                this.$message({
                  type:"success",
                  message:res.msg
                })

                this.search();
            }
         })
    },
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
        this.departList = res.list;
        this.pages = res.pages;
        this.total = res.total;
      });
    },
    save() {
      if (this.dept.deptId) {
        update(this.dept).then((res) => {
          this.pageDto.now = 1;
          this.search();
          this.dept = {};
        });
      } else {
        save(this.dept).then((res) => {
          this.pageDto.now = 1;
          this.search();
          this.dept = {};
          this.dialogFormVisible = false;
          this.$message({
            message: res.msg,
            type: 'error'
          });
        });
      }
    },
  },
  created() {
   
    this.search();    
  },
};
</script>

<style lang="">
</style>