<template>
    <div class="app-container">
        <el-row>
            <el-col :span="4">
                <el-input placeholder="请输入模型名称" v-model="pageDto.where.propertyName"></el-input>
            </el-col>
            <el-col :span="4">
                <el-select placeholder="选择全部设备类型" v-model="pageDto.where.deviceTypeId">
                    <el-option :value="deviceTypeId">选择全部设备类型</el-option>
                    <el-option v-for="(item,index) in typeList" :value="item.id" :key="item.id" :label="item.name">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select placeholder="选择模型类型属性" v-model="pageDto.where.modelType">
                    <el-option :value="modelType">选择模型类型属性</el-option>
                    <el-option value="1" key="id" label="属性"></el-option>
                    <el-option value="2" key="id" label="事件"></el-option>
                    <el-option value="3" key="id" label="服务"></el-option>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
                <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
                <el-button @click="dialogFormVisible = true" type="success" icon="el-icon-circle-plus">添加</el-button>

            </el-col>


        </el-row>
        <el-table :data="modelList" style="width: 100%">
            <el-table-column prop="propertyName" label="物模型名称"> </el-table-column>
            <el-table-column prop="deviceTypeName" label="设备类型"> </el-table-column>
            <el-table-column label="物模型类型">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.modelType==1" type="success">属性</el-tag>
                    <el-tag v-if="scope.row.modelType==2" type="success">事件</el-tag>
                    <el-tag v-if="scope.row.modelType==3" type="success">服务</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
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
        <el-dialog title="添加物模型" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="物模型名称">
                    <el-input v-model="model.propertyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="model.deviceTypeId" placeholder="请选择设备类型">
                        <el-option v-for="(item,index) in typeList" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物模型类型">
                    <el-select v-model="model.modelType" placeholder="选择物模型类型">
                        <el-option value="1" key="id" label="属性"></el-option>
                        <el-option value="2" key="id" label="事件"></el-option>
                        <el-option value="3" key="id" label="服务"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" autocomplete="off" v-model="model.description">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false,pck={},permId=[]">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改设备类型" :visible.sync="dialogFormVisible1">
            <el-form>
                <el-form-item label="物模型名称">
                    <el-input v-model="model.propertyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="model.deviceTypeId" placeholder="请选择设备类型">
                        <el-option v-for="(item,index) in typeList" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物模型类型">
                    <el-select v-model="model.modelType" placeholder="选择物模型类型" >
                        <el-option :value="1" key="id" label="属性"></el-option>
                        <el-option :value="2" key="id" label="事件"></el-option>
                        <el-option :value="3" key="id" label="服务"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" autocomplete="off" v-model="model.description">
                    </el-input>
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
    import { page, save, gotoupd, update } from "@/api/model";
    //导入pcd组件
    // import PCD  from '../components/pcd.vue';
    export default {
        components: {
            // // PCD:PCD
            // PCD
        },
        data() {
            return {
                dialogFormVisible: false,
                dialogFormVisible1:false,
                modelList: [],
                typeList: [],
                pageDto: {
                    now: 1,
                    size: 5,
                    where: {
                        propertyName: "",
                        modelType: "",
                        deviceTypeId: "",
                    },
                },
                modelType: "",
                pages: 0,
                total: 0,
                deviceTypeId: "",
                model: {
                    name: "",
                    deviceTypeId: "",
                    modelType:"",
                    description: ""
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
                    this.modelList = res.data.pageResult.list;
                    this.total = res.data.pageResult.total;
                    this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
                    this.typeList = res.data.deviceTypeList
                });
            },
            add() {
                save(this.model).then(res => {
                    this.$message({
                        message: res.message,
                        type: res.code == 0 ? 'success' : 'error'
                    });
                    this.dialogFormVisible = false
                    this.model = {}
                    this.search()
                })
            },
            gotoUpd(id) {
                gotoupd(id).then(res => {
                    if (res.code == 0) {
                        this.model = res.data
                        this.dialogFormVisible1 = true
                    }
                })
            },
            update() {
                update(this.model).then(res => {
                    this.$message({
                        type: res.code == 0 ? 'success' : 'error',
                        message: res.message
                    })
                    this.dialogFormVisible1 = false
                    this.model = {}
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