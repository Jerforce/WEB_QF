<template>
    <div class="app-container">
        <el-row>
            <el-col :span="4">
                <el-input placeholder="请输入行政编码" v-model="pageDto.where.code"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入行政名称" v-model="pageDto.where.name"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="pageDto.now=1,search()">搜索</el-button>
                <el-button type="danger" @click="pageDto.where={},pageDto.now=1,search()">清空</el-button>
            </el-col>
        </el-row>


        <el-table :data="areaList" style="width: 100%">
            <el-table-column prop="code" label="行政编码"> </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column label="等级">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    <p v-if="scope.row.level==1">省级</p>
                    <p v-if="scope.row.level==2">地级市</p>
                    <p v-if="scope.row.level==3">区/县</p>
                    <p v-if="scope.row.level==4">乡/镇</p>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    <p v-if="scope.row.type==1">省</p>
                    <p v-if="scope.row.type==2">自治区</p>
                    <p v-if="scope.row.type==3">直辖市</p>
                    <p v-if="scope.row.type==4">特别行政区</p>
                    <p v-if="scope.row.type==5">地级市</p>
                    <p v-if="scope.row.type==6">地区</p>
                    <p v-if="scope.row.type==7">自治州</p>
                    <p v-if="scope.row.type==8">盟</p>
                    <p v-if="scope.row.type==9">市辖区</p>
                    <p v-if="scope.row.type==10">县</p>
                    <p v-if="scope.row.type==11">县级市</p>
                    <p v-if="scope.row.type==12">自治县</p>
                    <p v-if="scope.row.type==13">旗</p>
                    <p v-if="scope.row.type==14">自治旗</p>
                    <p v-if="scope.row.type==15">特区</p>
                    <p v-if="scope.row.type==16">林区</p>
                </template>
            </el-table-column>
            <el-table-column prop="abname" label="简称"> </el-table-column>
            <el-table-column prop="pid" label="父编码"> </el-table-column>
            <el-table-column prop="pname" label="父名称"> </el-table-column>
            <el-table-column prop="note" label="备注"> </el-table-column>
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
    import { page } from "@/api/area";
    //导入pcd组件
    // import PCD  from '../components/pcd.vue';
    export default {
        components: {
            // // PCD:PCD
            // PCD
        },
        data() {
            return {
                areaList: [],
                pageDto: {
                    now: 1,
                    size: 5,
                    where: {
                        code: "",
                        name: "",
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
                    this.areaList = res.data.list;
                    this.total = res.data.total;
                    this.pages = this.total % this.pageDto.size == 0 ? this.total / this.pageDto.size : this.total / this.pageDto.size + 1;
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