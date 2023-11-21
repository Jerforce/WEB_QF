<template >
  <div class="app-container">
    <!-- 条件框 -->
    <el-row>
      <el-col :span="4">
        <el-input @clear="search()" v-model="pagedto.where.name" placeholder="请输入行业名称" clearable> </el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="pagedto.now = 1, search()" type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleAdd()" type="success" icon="el-icon-circle-plus">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="IntustryList" stripe style="width: 100% ">
      <el-table-column prop="name" label="行业名称" width="400">
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="400">
      </el-table-column>

      <el-table-column prop="address" label="操作" width="800">
        <template slot-scope="scope">
          <el-button @click="updateee(scope.row)" type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="deletee(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>

    </el-table>




    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagedto.pagenow"
      :page-sizes="[5, 10, 50, 100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="行业修改" :visible.sync="dialogFormVisibleupdate">
      <el-form :model="form">

        <el-form-item label="行业名称">
          <el-input v-model="intusupdate.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-input v-model="intusupdate.createTime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button @click="add()" type="primary">确 定</el-button>

      </div>
    </el-dialog>
    <el-dialog :modal="intusupdate" title="行业管理" :visible.sync="dialogFormVisiblesave">
      <el-form :rules="rules" :model="intusupdate" ref="intusupdateRef">
        <el-form-item prop="name">
          <el-input v-model="intusupdate.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item prop="createTime">
          <el-date-picker v-model="intusupdate.createTime" align="right" type="date" placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button>取 消</el-button>
      <el-button @click="add('intusupdateRef')" type="primary">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { pagesave, save, update, delete1 } from "@/api/Indus";
import webUrlSearchParams from "core-js/modules/web.url-search-params";
export default {
  data() {
    return {
      dialogFormVisiblesave: false,
      dialogFormVisibleupdate: false,
      Intustryname: "",

      IntustryList: [],
      pagedto: {
        now: 1,
        size: 5,
        where: {
          name: ""
        },
      },
      pages: 0,
      total: 0,

      intusupdate: {
        id: "",
        name: "",
        createTime: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },

        ]

      }

    }
  },
  methods: {
    search() {

      pagesave(this.pagedto).then(res => {
        if (res.code == 200) {
          this.IntustryList = res.data.list;
          this.pages = res.data.pages;
          this.total = res.data.total;

        }
      })
    },
    handleSizeChange(size) {
      this.pagedto.size = size;
      this.search();
    },
    handleCurrentChange(now) {
      this.pagedto.now = now;
      this.search();
    },

    updateee(row) {
      this.dialogFormVisiblesave = true;
      this.intusupdate = row;


    },
    handleAdd() {
      this.intusupdate = {};
      this.dialogFormVisiblesave = true;

    },
    add(ref) {
      //表单校验
      this.$refs[ref].validate((valid) => {
        if (valid) {

          if (this.intusupdate.id) {
            update(this.intusupdate).then(res => {
              this.dialogFormVisiblesave = false;
              if (res.code == 200) {
                this.pagedto.now = now;
                this.search();
                this.$message({
                  message: '恭喜你，修改成功！',
                  type: 'success'
                })
              }

            })


          } else {


            save(this.intusupdate).then(res => {
              this.dialogFormVisiblesave = false;
              if (res.code == 200) {
                this.pagedto.now = 1;
                this.search();
                this.$message({
                  message: '恭喜你，添加成功！',
                  type: 'success'
                })
              } else {
                this.dialogFormVisiblesave = false;
                this.search();
                this.$message({
                  message: '添加失败！',
                  type: 'errer'
                })


              }

            });

          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    deletee(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete1(id).then(res=> {
            if (res.code == 200) {
                this.pagedto.now = 1;
                this.search();
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
              } else {
                this.dialogFormVisiblesave = false;
                this.search();
                this.$message({
                  message: '添加失败！',
                  type: 'errer'
                })


              }
       

      })
         
        });
     

    }









  },
  created() {
    this.search()
  }
}


</script>