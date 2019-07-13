<style scoped>
    .info {
        width: 90%;
        margin: 0 auto;
    }

    .info p {
        line-height: 50px;
    }

    .info .row {
        border-bottom: 2px solid #f7f7f7;
    }

    .spinfo .img {
        float: left;
        width: 50px;
        height: 30px;
        margin: 10px 10px 10px 0;
        background: #f7f7f7;
    }

    .spinfo p {
        float: left;
        width: 50%;
        line-height: 2.2;
        margin-top: 10px;
    }

    .middle {
        width: 40%;
        margin: 0 0 20px 5%;
    }

    .middle p {
        line-height: 50px;
        font-size: 14px;
    }

    .middle .middleTitle {
        font-size: 18px;
    }

    .confirm {
        width: 40%;
        padding: 10px 0 20px 10px;
        box-sizing: border-box;
        background: #f7f7f7;
        margin-left: 5%;
    }

    .confirm .color {
        color: #f00;
        font-size: 18px;
    }
</style>
<template>
    <div>
        <!-- 订单信息 -->
        <div class="info">
            <Row class="row">
                <Col span="4" algin="center"><p>商品编号</p></Col>
                <Col span="6" algin="center"><p>商品名称</p></Col>
                <Col span="4" algin="center"><p>单价</p></Col>
                <Col span="6" algin="center"><p>数量</p></Col>
                <Col span="4" algin="center"><p>应付</p></Col>
            </Row>
            <Row class="row">
                <Col span="4" algin="center"><p>{{$_goodsData_$.id}}</p></Col>
                <Col class="spinfo" span="6" algin="center">
                    <img class="img" :src="$_imgs_$[0]">
                    <p>{{$_goodsData_$.name}}</p>
                </Col>
                <Col span="4" algin="center"><p>{{$_dj_$}}{{$_unit_$}}</p></Col>
                <Col span="6" algin="center">
                    <p>
                        数量&nbsp;&nbsp;&nbsp;
                        <InputNumber v-model="$_number_$"></InputNumber>
                    </p>
                </Col>
                <Col span="4" algin="center">
                    <p>{{$_jf_$}}{{$_unit_$}}</p>
                </Col>
            </Row>
        </div>
        <br><br>
        <!-- 备注 -->
        <div class="middle">
            <Row>
                <Col span="16">
                    <p class="middleTitle">兑换实付：&nbsp;&nbsp;{{$_jf_$}}{{$_unit_$}}</p>
                </Col>
                <Col span="8">
                    <p v-if="$_goodsData_$.goodsType==0">现金余额：&nbsp;&nbsp;{{$_accountInfo_$.balance}}元</p>
                    <p v-else>积分余额：&nbsp;&nbsp;{{$_accountInfo_$.credits}}积分</p>
                </Col>
            </Row>
            <Row>
                备注:&nbsp;&nbsp;
                <Input v-model="$_bz_$" style="width: 300px"></Input>
            </Row>
        </div>
        <!-- 确认信息 -->
        <div class="confirm">
            <p>确认支付信息:</p>
            <p class="color">合计:&nbsp;&nbsp;{{$_jf_$}}{{$_unit_$}}</p>
        </div>
        <br><br>
        <Button type="primary" @click="$_ljdh_$()" style="position: relative;left: 20%">立即兑换</Button>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_number_$: 1, // 数量
                $_dj_$: '', // 单价
                $_bz_$: '', // 备
                $_id_$: '',
                $_goodsData_$: '',
                $_accountInfo_$: '',
                $_userInfo_$: '',
                $_unit_$: '',
                $_imgs_$: [],

                $_querycfg_$: {
                    mod: "",
                    params: {}
                }
            };
        },
        computed: {
            $_jf_$() {
                if (this.$_number_$ > 0)
                    return (this.$_number_$ * 1) * (this.$_dj_$ * 1)
            }
        },
        watch: {
            $_number_$: function (value) {
                this.$_jf_$ = this.$_number_$ * 1 * (this.$_dj_$ * 1)
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_dh_$();
            this.$_goodDetails_$();
            this.$_account_$()
        },
        methods: {
            //   立即兑换
            $_ljdh_$() {
                if(this.$_goodsData_$.goodsType==0){
                    if (this.$_jf_$ > this.$_accountInfo_$.balance * 1) {
                        this.$Message.error("余额不足");
                        return
                    }
                }else{
                    if (this.$_jf_$ > this.$_accountInfo_$.credits * 1) {
                        this.$Message.error("余额不足");
                        return
                    }
                }

                if (this.$_number_$ <= 0) {
                    this.$Message.error("请选择一个合理的数量");
                    return
                }

                this.$_querycfg_$.mod = 'operate/order/createOrder';
                this.$_querycfg_$.params.goodsId = this.$_id_$;
                // this.$_querycfg_$.params.goodsName = this.$_goodsData_$.name;
                // this.$_querycfg_$.params.goodsType = this.$_goodsData_$.goodsType;
                this.$_querycfg_$.params.goodsCount = this.$_number_$;
                /*if(this.$_goodsData_$.goodsType==0){
                    //普通商品
                    this.$_querycfg_$.params.prices = this.$_goodsData_$.prices;
                }else{
                    //积分商品  代金券
                    this.$_querycfg_$.params.credits = this.$_goodsData_$.credits;
                }*/
                this.$_querycfg_$.params.remark = this.$_bz_$;
                this.$_querycfg_$.params.commiter = this.$_userInfo_$.id;
                this.$_querycfg_$.params.commiterName = this.$_userInfo_$.name;
                this.$_querycfg_$.params.commiterPhone = this.$_userInfo_$.phoneNumber;
                this.$_querycfg_$.params.department = this.$_userInfo_$.departmentId;
                this.$_querycfg_$.params.deptName = this.$_userInfo_$.departmentName;
                this.$_querycfg_$.params.enterprise = this.$_userInfo_$.enterpriseId;
                this.$_querycfg_$.params.entName = this.$_userInfo_$.enterpriseName;
                this.$_querycfg_$.params.image = this.$_userInfo_$.faceUrl;
                this.$_querycfg_$.params.zoneId = this.$_goodsData_$.zoneId;
                // this.$_querycfg_$.params.isDelivery = this.$_goodsData_$.isDelivery;

                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success(rsp.data.data);
                            this.$root.$_Route_$('employer', 'consume', 'jfsc')
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_dh_$() {
                this.$_id_$ = this.$root.inparams.id
            },

            $_goodDetails_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/goods/queryGoodsById`,
                    data: {id: this.$_id_$},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_goodsData_$ = rsp.data.data;
                            this.$_unit_$ = this.$_goodsData_$.goodsType === 0 ? "元" : "积分";
                            this.$_dj_$ = this.$_goodsData_$.goodsType === 0 ? this.$_goodsData_$.prices : this.$_goodsData_$.credits
                            this.$_imgs_$ = this.$_goodsData_$.image.split(';');

                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
            $_account_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/operate/account/accountInfo`,
                    data: {refId: this.$_userInfo_$.id, accountType: 1},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_accountInfo_$ = rsp.data.data;
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            }


        }
    }
</script>