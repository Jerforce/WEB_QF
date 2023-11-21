<template>
    <div class="app-container">
        <el-row>
            <el-col :span="4">
                <el-input placeholder="请输入租户名" v-model="pageDto.where.name"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入租户key" v-model="pageDto.where.accessKey"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
                <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
            </el-col>
        </el-row>


        <el-table :data="tenantList" style="width: 100%">
            <el-table-column prop="name" label="租户名"> </el-table-column>
            <el-table-column prop="accessKey" label="租户key"> </el-table-column>
            <el-table-column prop="companyName" label="公司名称"> </el-table-column>
            <el-table-column prop="companyCode" label="执照编号"> </el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>
            <el-table-column label="是否可用">

                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.enable == 1" key="可用" type="success" effect="dark">
                        {{ '可用' }}
                    </el-tag>
                    <el-tag v-if="scope.row.enable == 2" key="不可用" type="danger" effect="dark">
                        {{ '不可用' }}
                    </el-tag>
                </template>

            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.auditStatus == 1" key="通过" type="success" effect="dark">
                        {{ '通过' }}
                    </el-tag>
                    <el-tag v-if="scope.row.auditStatus == 2" key="不通过" type="danger" effect="dark">
                        {{ '不通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="accessKey" label="操作">
                <template slot-scope="scope">
                    <el-button @click="upd(scope.row)" v-if="scope.row.enable == 1" type="text" size="small" 
                        style="color: red;">禁用</el-button>
                    <el-button @click="upd(scope.row)" v-if="scope.row.enable == 2" type="text" size="small">启用</el-button>
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
    import { page ,update} from "@/api/tenant";
    //导入pcd组件
    // import PCD  from '../components/pcd.vue';
    export default {
        components: {
            // // PCD:PCD
            // PCD
        },
        data() {
            return {
                tenantList: [],
                pageDto: {
                    now: 1,
                    size: 5,
                    where: {
                        name: "",
                        accessKey: "",
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
                    this.tenantList = res.data.list;
                    this.total = res.data.total;
                    this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
                });
            },
            upd(data) {
                update(data).then(res => {
                    this.$message({
                        message: res.message,
                        type: res.code==0?'success':'error'
                    })
                    this.search();
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