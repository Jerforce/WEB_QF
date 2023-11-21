<template>
    <div class="app-container">
        <el-row gutter="20px">
            <el-col :span="4" v-for="(item, index) in packageList" :key="index">
                <el-card class="box-card" style="width: 200px;height: 350px">
                    <div slot="header" class="clearfix">
                        <span>{{ item.name }}</span>
                      <el-button v-if="item.id!==order.packageId" @click="order(item.id)" style="float: right; padding: 3px 0"
                                 type="text">立即购买</el-button>
                      <el-button v-if="item.id===order.packageId" style="color: orange; float: right; padding: 3px 0"
                                 type="text">已购买</el-button>
<!--                        <el-button @click="order(item.id)" style="float: right; padding: 3px 0" type="text">立即购买</el-button>-->
                    </div>

                    <div class="text item">
                        <p>套餐价格：￥{{ item.price }}</p>
                        <p>套餐有效时长：{{ item.timenum }}{{ item.timeunit }}</p>
                        <p>套餐权限：</p>
                        <ul>
                            <li v-for="(pck, index) in item.perms" :key="index">
                                {{ pck.permName }}
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="支付二维码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div ref="qrcode">

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 渲染二维码
import QRCode from 'qrcodejs2-fix'
import { list, order, getPayUrl } from '@/api/package'

export default {
    data() {
        return {
            packageList: [],
            dialogVisible: false,
            ws: {},
            order: {}
        }
    },
    methods: {
        search() {
            list().then(res => {
                this.packageList = res.data;
            })
        },
        save(packageId) {
            save(packageId).then(res => {
                if (res.ok) {
                    // 获取orderId
                    var packageOrderId = res.data;

                    // 发送支付请求, 获取payUrl
                    getPayUrl(packageOrderId).then(res => {
                        if (res.ok) {
                            this.dialogVisible = true;
                            this.$nextTick(() => {
                                // 建立websocket连接
                                this.ws = new WebSocket("ws://localhost:8001/pay/" + packageOrderId);
                                var _this = this;
                                this.ws.onmessage = function (event) {
                                    console.log(event.data);
                                    if (event.data == "paysuccess") {
                                        // 关闭二维码
                                        _this.dialogVisible = false;
                                        _this.$message({
                                            type: "success",
                                            message: "支付成功"
                                        })
                                    }
                                };
                                this.ws.onopen = function (event) {
                                    console.log("open");
                                };
                                // 清空二维码
                                this.$refs.qrcode.innerHTML = "";

                                // 生成二维码
                                new QRCode(this.$refs.qrcode, {
                                    // 支付链接payUrl
                                    text: res.data,
                                    width: 200,
                                    height: 200,
                                    colorDark: '#000',    //二维码颜色
                                    colorLight: "#ffffff"  //背景颜色
                                });
                            });
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                } else {
                    this.$message.error(res.message);
                }

            })
        }
    },
    created() {
        this.search();
    }

}
</script>

<style></style>
