<template>
    <div>
        <el-table :data="orderList" style="width: 100%" class="app-container">
            <el-table-column prop="id" label="ID" width="180px"> </el-table-column>
            <el-table-column prop="tenantId" label="租户id" width="180px"> </el-table-column>
            <el-table-column prop="packageId" label="套餐id"> </el-table-column>
            <el-table-column label="支付时间" width="180px">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.payTime==null?'暂无数据':scope.row.payTime}}
                </template>
            </el-table-column>
            <el-table-column label="支付状态">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.payStatus==0?'未支付':'已支付'}}
                </template>
            </el-table-column>
            <el-table-column prop="money" label="支付金额"> </el-table-column>
            <el-table-column label="支付订单号" width="180px">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.payno==null?'暂无数据':scope.row.payno}}
                </template>
            </el-table-column>
            <el-table-column label="套餐开始时间" width="180px">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.startTime==null?'暂无数据':scope.row.startTime}}
                </template>
            </el-table-column>
            <el-table-column label="套餐结束时间" width="180px">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.endTime==null?'暂无数据':scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column label="下单时间" width="180px">
                <!-- 自定义渲染 -->
                <template slot-scope="scope">
                    {{scope.row.createTime==null?'暂无数据':scope.row.createTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button @click="drop(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import { all, del } from '@/api/order'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                orderList: []
            }
        },
        methods: {
            search() {
                all().then(res => {
                    if (res.code == 0) {
                        this.orderList = res.data
                    }
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
            }
        },
        created() {
            this.search()
        }
    }
</script>