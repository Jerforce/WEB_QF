<template>
    <div>

        <el-table :data="permList" style="width: 100%" class="app-container">
            <el-table-column prop="id" label="ID"> </el-table-column>
            <el-table-column prop="permName" label="权限名字"> </el-table-column>
            <el-table-column prop="permUrl" label="权限访问uri地址"> </el-table-column>
            <el-table-column prop="permDesc" label="权限描述"> </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">

                    <el-button @click="gotoUpd(scope.row.id)" type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button @click="drop(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-col :span="2" :offset="22">
            <el-button @click="dialogFormVisible = true" type="success" icon="el-icon-circle-plus">添加</el-button>
        </el-col>
        <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="权限名字">
                    <el-input v-model="perm.permName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限访问uri地址">
                    <el-input v-model="perm.permUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="perm.permDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改权限" :visible.sync="dialogFormVisible1">
            <el-form>
                <el-form-item label="权限名字">
                    <el-input v-model="perm.permName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限访问uri地址">
                    <el-input v-model="perm.permUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="perm.permDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1= false,perm={}">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { all, save, del,gotoupd,update } from '@/api/perm'
export default {
    data() {
        return {
            dialogFormVisible1:false,
            dialogFormVisible: false,
            permList: [
            ],
            perm: {
                permname: "",
                permUrl: "",
                permDesc: ""
            }
        }
    },
    methods: {
        search() {
            all().then(res => {
                if (res.code == 0) {
                    this.permList = res.data
                }
            })
        },
        add() {
            save(this.perm).then(res => {
                this.$message({
                    message: res.message,
                    type: res.code == 0 ? 'success' : 'error'
                });
                this.dialogFormVisible = false
                this,perm={}
                this.search()
            })
        },
        drop(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del(id).then(res => {
                    this.$message({
                        type: res.code == 0 ? 'success' : 'error',
                        message: '删除成功!'
                    })
                    this.search()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        gotoUpd(id){
            gotoupd(id).then(res=>{
                if(res.code==0){
                    this.perm=res.data
                    this.dialogFormVisible1=true
                }
            })
        },
        update() {
                update(this.perm).then(res => {
                    this.$message({
                        type: res.code == 0 ? 'success' : 'error',
                        message: '添加成功!'
                    })
                    this.dialogFormVisible1=false
                    this.perm={}
                    this.search()
                })
            }

    },
    created() {
        this.search()
    }
}
</script>