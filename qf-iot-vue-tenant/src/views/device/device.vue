<template>
    <div class="app-container">
        <el-select v-model="value" v-on:change="handleOptionChange" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.name">
            </el-option>
        </el-select>

        <el-button type="primary" style="margin-left: 20px;" @click="dialogFormVisible = true">添加设备</el-button>

        <div class="app-container">
            <el-table :data="deviceList" style="width: 100%">
                <el-table-column prop="name" label="设备名称" header-align="center" align="center"></el-table-column>
                <el-table-column prop="productName" label="所属产品" header-align="center" align="center"></el-table-column>
                <el-table-column prop="deviceKey" label="Key" header-align="center" align="center"> </el-table-column>
                <el-table-column prop="active" label="设备激活状态" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.active == 1" type="warning">未激活</el-tag>
                        <el-tag v-if="scope.row.active == 2" type="success">已激活</el-tag>
                    </template>

                </el-table-column>
                <el-table-column label="开/关设备" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" @click="openSend(scope.row.deviceKey)">发送指令</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{ formatDateTime(scope.row.createTime) }}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="detail(scope.row.id, scope.row.productId)">详情</el-button>
                        <el-button @click="open(scope.row.id)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="app-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageDto.pageNow" :page-sizes="[5, 10, 50, 100]" :page-size="pageDto.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 添加弹窗 -->
        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form>
                <div class="app-container" style="margin-top: -30px;">
                    产品
                    <el-select v-model="deviceDto.productName" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.name">
                        </el-option>
                    </el-select>

                    设备类型
                    <el-select v-model="deviceDto.deviceType" clearable placeholder="请选择">
                        <el-option v-for="item in deviceTypeList" :key="item.value" :label="item.label" :value="item.name">
                        </el-option>
                    </el-select>
                </div>

                <div class="app-container">
                    <el-form-item label="设备编号">
                        <el-input autocomplete="off" v-model="deviceDto.deviceIndex"></el-input>
                    </el-form-item>

                    <el-form-item label="父设备">
                        <el-input autocomplete="off" v-model="deviceDto.parentId"></el-input>
                    </el-form-item>

                    <el-form-item label="设备名称">
                        <el-input autocomplete="off" v-model="deviceDto.name"></el-input>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="value2 = ''; deviceDto = {}; dialogFormVisible = false;">取 消</el-button>
                <el-button type="primary" @click="value2 = ''; dialogFormVisible = false; add()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 发送指令弹窗 -->
        <el-dialog title="" :visible.sync="flag">
            <el-form>
                <div class="app-container">
                    <el-select v-model="cmdParamDto.deviceSubCode" placeholder="请选择">
                        <el-option v-for="item in send" :key="item.value" :label="item.label" :value="item.sendValue">
                            {{ item.label }}
                        </el-option>
                    </el-select>
                </div>

                <div class="app-container">
                    <el-select v-model="cmdParamDto.value" placeholder="请选择">
                        <el-option v-for="item in operation" :key="item.value" :label="item.label"
                            :value="item.operationValue">
                            {{ item.label }}
                        </el-option>
                    </el-select>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false; cmdParamDto = {}">取 消</el-button>
                <el-button type="primary" @click="flag = false; sendOperation()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { page, del, all, allType, add, send } from '@/api/device'

export default {
    data() {
        return {
            send: [{
                sendValue: "3",
                label: "开/关灯"
            }],
            sendValue: "",

            operation: [{
                operationValue: "0",
                label: "打开"
            }, {
                operationValue: "1",
                label: "关闭"
            }],
            operationValue: "",
            flag: false,

            cmdParamDto: {
                deviceKey: "",
                deviceSubCode: "",
                cmdName: "",
                value: ""
            },



            // 添加设备有关的信息
            dialogFormVisible: false,
            deviceDto: {
                productName: "",
                deviceType: "",
                parentId: "",
                deviceIndex: "",
                name: ""
            },
            deviceType: "",
            deviceTypeList: [],

            // 分页信息
            pageDto: {
                pageNow: 1,
                pageSize: 5,
                where: {}
            },
            pages: 0,
            total: 0,
            deviceList: [],

            // 下拉框的值
            options: [{

            }],
            value: '',
        }
    },
    methods: {
        formatDateTime(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Intl.DateTimeFormat('zh-CN', options).format(new Date(date));
        },
        handleOptionChange() {
            this.pageDto.where.name = this.value;
            this.pageDto.pageNow = 1;
            this.search();
        },
        // 点击分页的事件
        // 点击切换每页显示条数
        handleSizeChange(size) {
            this.pageDto.pageSize = size;
            this.search();
            this.pageDto.where = {};
        },
        // 点击切换当前页
        handleCurrentChange(now) {
            this.pageDto.pageNow = now;
            this.search();
        },

        // 分页查询
        search() {
            page(this.pageDto).then(res => {
                this.deviceList = res.list;
                this.pages = res.pages;
                this.total = res.total;
            })
        },

        // 删除功能
        open(id) {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(id);
                del(id).then(res => {
                    this.pageDto.pageNow = 1;
                    this.search();
                    this.deviceList = {};
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // 详情
        detail(deviceId, productId) {
            localStorage.setItem("deviceId", deviceId);
            localStorage.setItem("productId", productId);
            this.$router.push({ path: "/detail" });
        },

        // 添加
        add() {
            add(this.deviceDto).then(res => {
                this.deviceDto = {};
                this.search();
                this.$message({
                    type: 'success',
                    message: res.message
                });
            })
        },

        // 发送指令
        openSend(deviceKey) {
            this.cmdParamDto.deviceKey = deviceKey;
            this.cmdParamDto.cmdName = "on_off";
            this.flag = true;
        },
        sendOperation() {
            send(this.cmdParamDto).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: "发送成功"
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
                this.cmdParamDto = {};
            })
        }
    },
    created() {
        this.search();

        // 查询所有产品
        all().then(res => {
            this.options = res.data;
        });

        // 查询所有设备类型
        allType().then(res => {
            this.deviceTypeList = res.data;
        })
    }
}
</script>

<style></style>
