<style scoped>
    .tlt{
      padding:20px 10px; 
    } 
    .tlt p{
      font-size:14px;
    }
</style>
<template>
    <div class="sz">
        <div class="tlt">
            <p style="font-weight:bold;">订单信息:</p>
            <br>
            <p>订单编号:&nbsp;&nbsp;{{$_number_$}}&nbsp;&nbsp;&nbsp;&nbsp;创建时间:&nbsp;&nbsp;{{$_time_$}}</p>
            <br>
            <p><span style="font-weight:bold;">用户信息:</span>&nbsp;&nbsp;{{$_user_$[2]}}&nbsp;&nbsp;&nbsp;&nbsp;{{$_user_$[0]}}&nbsp;&nbsp;&nbsp;&nbsp;{{$_user_$[1]}}</p>
        </div>
        <br>
        <Table border :columns="$_columns_$" :data="$_data_$"></Table>
        <br>
        <p style="font-size:14px;text-align:right;">订单总金额:&nbsp;<span style="font-weight:bold;font-size:15px;">{{$_price_$}}</span></p>
    </div>
</template>
<script>
    import controler from './controler.js';
    export default {
        mixins: [controler],
        data() {
            return {
                $_number_$:'', //订单编号
                $_time_$:'',  //订单创建时间
                $_user_$:[],  //用户信息
                $_price_$:'',  //订单总金额(或积分)
                $_orderId_$:'',  //订单id

                $_columns_$:[
                    {
                        title: '商品名称',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let c;
                            c=params.row.orderGoods[0].goodsName;
                            return h ('span',{},c)
                        }

                    },
                    {
                        align:'center',
                        title: '单价',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let d = params.row.orderGoods[0];
                            let p = '';
                            if(d.goodsType==0){
                                //普通商品
                                p = d.goodsPrices + '元';
                            }else{
                                //积分商品或代金券
                                p = d.goodsCredits + '积分';
                            }
                            return h ('span',{},p)
                        }
                    },
                    {
                        align:'center',
                        title: '数量',
                        key: 'orderGoods',
                        render:(h,params)=>{
                            let e;
                            e=params.row.orderGoods[0].goodsCount;
                            return h ('span',{},e)
                        }
                    },
                    {
                        title: '商品类型',
                        key: 'orderGoods',
                        align:'center',
                        render:(h,params)=>{
                            let f = '';
                            switch (params.row.orderGoods[0].goodsType) {
                                case 0:
                                    f='普通商品';
                                    break;
                                case 1:
                                    f='积分商品';
                                    break;
                                default:
                                    f='代金券商品';
                                    break;
                            }
                            return h ('span',{},f)
                        }
                    },
                    {
                        align:'center',
                        title: '状态',
                        key: 'orderState',
                        render:(h,params)=>{
                            let d;
                            switch (params.row.orderState) {
                                case 1:
                                    d="已支付";
                                    break;
                                case 2:
                                    d="已发货";
                                    break;
                                default:
                                    d="已完成";
                                    break;
                            }
                            return h('span',{},d)
                        }
                    },
                    {
                        title: '总价合计',
                        key: 'orderPrices',
                        align:'center',
                        render:(h,params)=>{
                            return h('span',{},this.$_price_$)
                        }
                    }
                ],
                $_data_$:[],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            }
        },
        created() {
            this.$_ddxx_$();
            this.$_list_$()
        },
        methods: {
            $_list_$(){
                this.$_querycfg_$.mod = 'operate/order/queryOrderDetailsById';
                this.$_querycfg_$.params.orderId = this.$_orderId_$;
                this.$_fquery_$((rsp)=>{
                    if(rsp.status === 200){
                        if (rsp.data.code === 0) {
                            let data = rsp.data.data;
                            this.$_user_$.push(data.commiterName);
                            this.$_user_$.push(data.commiterPhone);
                            this.$_user_$.push(data.entName);
                            if(data.orderPrices){
                                //花费总金额（普通商品）
                                this.$_price_$ = data.orderPrices + '元';
                            }else{
                                //花费总积分（积分商品和代金券）
                                this.$_price_$ = data.orderCredits + '积分';
                            }
                            this.$_data_$.push(data);
                        }
                    }
                })
            },
            fmtDate(obj) {
                var date = new Date(obj);
                var y = 1900 + date.getYear();
                var m = "0" + (date.getMonth() + 1);
                var d = "0" + date.getDate();
                return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
            },
            $_ddxx_$(){
                let ddxq = this.$root.inparams.id;
                this.$_number_$ = ddxq.orderNumber;
                this.$_time_$ = this.fmtDate(ddxq.commiteTime);
                this.$_orderId_$ = ddxq.id;
            }
        }
    }
</script>