<style scoped>
    .info {
        width: 80%;
        padding: 20px 20px 20px 50px;
        box-sizing: border-box;
    }

    .info p {
        font-size: 14px;
        font-weight: bold;
        line-height: 30px;
    }

    .top{
        margin-top: 20px;
    }
    .top .top_title{
        display: inline-block;
        width: 65px;
        text-align: justify;
        text-align-last: justify;
        text-justify:distribute-all-lines;
    }
    .top .top_content{
        display: inline-block;
        margin-left: 15px;
    }

    .content {
        width: 80%;
        margin-left: 50px;
    }

    .normal {
        font-size: 14px;
        font-weight: bold;
        padding: 10px;
    }

    .fj {
        font-size: 14px;
        line-height: 30px;
    }
</style>


<template>
    <div style="background: #f7f7f7;padding: 25px;font-size: 14px">
        <div style="background: #fff">
            <div class="info">
                <div class="top">
                    <span class="top_title">标题</span>:
                    <span class="top_content">{{this.$_infoDetail_$.title}}</span>
                </div>
                <div class="top">
                    <span class="top_title">发送时间</span>:
                    <span class="top_content">{{this.$_infoDetail_$.createDate}}</span>
                </div>
                <div class="top">
                    <span class="top_title">摘要</span>:
                    <span class="top_content">{{this.$_infoDetail_$.description}}</span>
                </div>
                <div class="top">
                    <span class="top_title">接收人</span>:
                    <span class="top_content">{{this.$_infoDetail_$.receivers}}</span>
                </div>
                <div class="top">
                    <span class="top_title">通知类型</span>:
                    <span class="top_content" v-if="this.$_infoDetail_$.type=0">普通通知</span>
                    <span class="top_content" v-if="this.$_infoDetail_$.type=1">活动通知</span>
                    <span class="top_content" v-if="this.$_infoDetail_$.type=2">缴费通知</span>
                </div><span v-if='this.$_infoDetail_$.type==2'>
                <div class="top">
                    <span class="top_title">缴费金额</span>:
                    <span class="top_content">{{this.$_infoDetail_$.noticePayment.paymentAccount}}元</span>
                </div></span>
                 <span v-if="this.$_infoDetail_$.type == 2">
                <div class="top">
                    <span class="top_title">缴费时间</span>:
                    <span class="top_content" v-if="this.$_infoDetail_$.noticePayment.payStatus == 1">{{this.$_infoDetail_$.noticePayment.payTime}}</span>
                    <span class="top_content" v-else-if="this.$_infoDetail_$.noticePayment.payStatus == 0">未缴费</span>
                </div></span>
                <div class="top">
                    <span class="top_title">详情</span>:
                    <div class="normal" v-html="this.$_infoDetail_$.content"></div>
                </div>
            </div>
            <!-- 内容 -->
            <div class="content">
                <p class="fj">
                    附件:<a :href="upurl" v-if="this.$_infoDetail_$.files">下载附件</a>
                </p>
            </div>
            <div align="center" style="padding: 30px;width: 80%">
                <Button type="success" @click="$_pay_$" v-if="this.$_infoDetail_$.noticePayment.payStatus == 0">缴费</Button>
                <Button type="primary" @click="$_close_$()">关闭</Button>
            </div>
        </div>

    </div>


</template>


<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_infoDetail_$: '',
                uppurl: 'http://img.yhcode.com:88/',
                upurl: ''
            }
        },
        created() {
            this.$_detail_$();
        },
        methods: {
            // 详情
            $_detail_$() {
                this.$_infoDetail_$ = this.$root.inparams.id;
                if (this.$root.inparams.type) {
                    this.$_read_$()
                }

                this.upurl = this.uppurl + this.$_infoDetail_$.files;
            },
            // 关闭
            $_close_$() {
                this.$root.$_Route_$('employer', 'work', 'tzfb', {});
            },
            //缴费
            $_pay_$(){
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/operate/account/noticePayment/${this.$_infoDetail_$.id}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$root.$_Route_$('employer', 'work', 'tzfb');
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },

            $_read_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/company/notice/${this.$_infoDetail_$.id}/read`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            // var arr = rsp.data.data;
                            // if (isAdd) {
                            //     this.$_employeeList_$ = this.$_employeeList_$.concat(arr.records);
                            // } else {
                            //     this.$_employeeList_$ = arr.records;
                            // }
                            // this.total = arr.total * 1
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            }
        }
    };
</script>