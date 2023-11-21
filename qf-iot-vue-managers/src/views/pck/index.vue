<template>
    <div>

        <el-table :data="pckList" style="width: 100%" class="app-container">
            <el-table-column prop="id" label="套餐编号"> </el-table-column>
            <el-table-column prop="name" label="套餐名"> </el-table-column>
            <el-table-column label="状态">

                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.status==0?'启用':'禁用'}}
                </template>

            </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="套餐的权限">
                <template slot-scope="scope">
                    <p v-for="(item,index) in scope.row.perms">{{item.permName}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="creator" label="创建者"> </el-table-column>
            <el-table-column prop="createTime" label="更新时间" width="180px"> </el-table-column>
            <el-table-column prop="price" label="套餐价格"> </el-table-column>
            <el-table-column prop="timeunit" label="套餐时间单位"> </el-table-column>
            <el-table-column prop="timenum" label="套餐时间"> </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">

                    <el-button @click="gotoUpd(scope.row.id)" type="primary" size="mini"
                        icon="el-icon-edit"></el-button>
                    <el-button @click="drop(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-col :span="2" :offset="22">
            <el-button @click="dialogFormVisible = true" type="success" icon="el-icon-circle-plus">添加</el-button>
        </el-col>
        <el-dialog title="添加套餐" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="套餐名">
                    <el-input v-model="pck.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input v-model="pck.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限列表">
                    <el-checkbox-group v-model="permId">
                        <el-checkbox v-for="(item,index) in perms" :label="item.id">{{item.permName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="pck.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="套餐时间单位">
                    <el-radio-group v-model="pck.timeunit">
                        <el-radio label="月">月</el-radio>
                        <el-radio label="季度">季度</el-radio>
                        <el-radio label="年">年</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false,pck={},permId=[]">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改套餐" :visible.sync="dialogFormVisible1">
            <el-form>
                <el-form-item label="套餐名">
                    <el-input v-model="pck.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="套餐状态">
                    <el-radio-group v-model="pck.status">
                        <el-radio :label="0">启用</el-radio>
                        <el-radio :label="1">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="pck.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限列表">
                    <el-checkbox-group v-model="permId">
                        <el-checkbox v-for="(item,index) in perms" :label="item.id">{{item.permName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="套餐价格">
                    <el-input v-model="pck.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="套餐时间单位">
                    <el-radio-group v-model="pck.timeunit">
                        <el-radio label="月">月</el-radio>
                        <el-radio label="季度">季度</el-radio>
                        <el-radio label="年">年</el-radio>
                    </el-radio-group>
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
    import { all, gotoAdd, save, del, gotoupd,update} from '@/api/pck'
    export default {
        data() {
            return {
                dialogFormVisible1: false,
                dialogFormVisible: false,
                pckList: [
                ],
                pck: {
                    name: "",
                    remark: "",
                    permIds: "",
                    price: "",
                    timeunit: "",
                },
                perms: [],
                permId: [],
            }
        },
        methods: {
            search() {
                all().then(res => {
                    if (res.code == 0) {
                        this.pckList = res.data
                    }
                })
            },
            gotoAdd() {
                gotoAdd().then(res => {
                    this.perms = res.data
                })
            },
            add() {
                this.pck.permIds = JSON.stringify(this.permId)
                save(this.pck).then(res => {
                    this.$message({
                        message: res.message,
                        type: res.code == 0 ? 'success' : 'error'
                    });
                    this.dialogFormVisible = false
                    this.pck = {}
                    this.permId = []
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
            gotoUpd(id) {
                gotoupd(id).then(res => {
                    if (res.code == 0) {
                        this.pck = res.data
                        this.permId = JSON.parse(res.data.permIds)
                        this.dialogFormVisible1 = true
                    }
                })
            },
            update() {
                update(this.pck).then(res => {
                    this.$message({
                        type: res.code == 0 ? 'success' : 'error',
                        message:res.message
                    })
                    this.dialogFormVisible1=false
                    this.search()
                })
            }
        },
        created() {
            this.search()
            this.gotoAdd()
        }
    }
</script>