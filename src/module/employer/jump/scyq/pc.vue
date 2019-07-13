<style>
    .myul,
    .myul li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .myul li {
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
    }

    .myul {
        margin-bottom: 20px;
    }
</style>
<template>
    <div class="container">
        <Row>
            <Col span="8" offset="8">
                <Row>
                    <h3>邀请信息</h3>
                    <p style="text-align:center">
                        <Icon type="ios-checkmark" color="green" style="font-size:60px;"></Icon>
                    </p>
                    <h1 style="font-size:20px;text-align:center">邀请成功</h1>
                    <Row>
                        <Col span="15" offset="1">
                            <ul class="myul">
                                <li><span>访客姓名：</span><span>{{obj.visitorName}}</span></li>
                                <li><span>联系方式：</span><span>{{obj.visitorMobile}}</span></li>
                                <li><span>公共名称：</span><span>{{obj.visitorCompany}}</span></li>
                                <li><span>部门名称：</span><span>{{obj.visitorOrg}}</span></li>
                            </ul>

                            <ul class="myul">
                                <li><span>来访事由：</span><span>{{obj.visitReason}}</span></li>
                                <li><span>来访时间：</span><span>{{obj.visitDate}}</span></li>
                                <li><span>会议室：</span><span>{{obj.meetingRoomName}}  ( {{obj.meetingAddress}} )</span>
                                </li>
                            </ul>
                        </Col>
                        <Col span="8" align="right">
                            <Row type="flex" justify="center" align="middle">
                                <Col span="24" align="center">
                                    <div class="img" style="width:100px;height:100px;">
                                        <img :src="obj.qrCode" style="width:100px;height:100px;">
                                    </div>
                                </Col>
                                <Col span="24" align="center" class="mt10">
                                    扫一扫,
                                    <p>将邀请信息发给好友 </p>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Row>
            </Col>
        </Row>


    </div>

</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                obj: {},
            };
        },
        methods: {
            $_handleSubmit_$() {
                this.obj = this.$root.inparams.row
            }
        },
        created() {
            this.$_handleSubmit_$()

        },
        mounted() {

        }
    };
</script>

