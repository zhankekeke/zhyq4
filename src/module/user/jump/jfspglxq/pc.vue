<!--<style scoped>-->
<!--.demo-carousel{-->
<!--width:100%;-->
<!--background:rgb(64, 64, 122);-->
<!--color:red;-->
<!--}-->
<!---->
<!--p{-->
<!--font-size:24px;-->
<!--}-->
<!--.spinfo li{-->
<!--font-size:20px;-->
<!--color:#333;-->
<!--margin-bottom:24px;-->
<!--}-->
<!---->
<!--.imgBox{-->
<!--width:400px;-->
<!--padding:20px;-->
<!--border:1px solid red;-->
<!--box-sizing: border-box-->
<!--}-->
<!--</style>-->
<!--<template>-->
<!--<div>-->
<!--<Row class="topbox">-->

<!--<Col span="10" >-->
<!--<div class="imgBox">-->
<!--<Carousel autoplay v-model="value2" loop>-->
<!--&lt;!&ndash; <CarouselItem v-for="data in topImg">-->
<!--<img :src="data">-->
<!--</CarouselItem> &ndash;&gt;-->
<!--<CarouselItem >-->
<!--<img src="https://www.baidu.com/img/bd_logo1.png">-->
<!--</CarouselItem>-->
<!--<CarouselItem >-->
<!--<img src="https://www.baidu.com/img/bd_logo1.png">-->
<!--</CarouselItem>-->
<!--<CarouselItem >-->
<!--<img src="https://www.baidu.com/img/bd_logo1.png">-->
<!--</CarouselItem>-->
<!--<CarouselItem >-->
<!--<img src="https://www.baidu.com/img/bd_logo1.png">-->
<!--</CarouselItem>-->
<!--</Carousel>-->
<!--</div>-->
<!--</Col>-->
<!--<Col span="12" offset="2">-->
<!--<div class="info">-->
<!--<ul class="spinfo">-->
<!--<li >{{info.info}}</li>-->
<!--<li >{{info.prices}}</li>-->
<!--<li >{{info.repertory}}</li>-->
<!--</ul> -->
<!--</div>-->
<!--</Col>-->
<!--</Row>-->
<!--<br>-->
<!--<p >-->
<!--商品详情-->
<!--</p>-->
<!--<Row>-->
<!--<div>-->
<!--<img :src="info.image">-->
<!--<br>-->
<!--<br>-->
<!--</div>-->
<!---->
<!--</Row>-->
<!--</div>-->
<!---->
<!--</template>-->
<!--<script>import controler from './controler.js';-->
<!--import axios from 'axios'-->
<!--export default {-->
<!--mixins: [controler],-->
<!--data() {-->
<!--return {-->
<!--value2: 0,-->
<!--items:[-->
<!--{-->
<!--title:"进口触感封面；彩色烫金效果；侧面尊贵描黑",-->
<!--},{-->
<!--price:"单价：260积分",-->
<!--},{-->
<!--kucun:"10件",-->
<!--},{-->
<!--number:"1",-->
<!--},{-->
<!--totol:"260积分"-->
<!--},-->
<!--]   ,-->
<!--bottomImg:[-->
<!--{one:"https://www.baidu.com/img/bd_logo1.png"},-->
<!--{two:"https://www.baidu.com/img/bd_logo1.png"},-->
<!--],-->
<!--topImg:{-->
<!--"a":"https://www.baidu.com/img/bd_logo1.png",-->
<!--"b":"https://www.baidu.com/img/bd_logo1.png",-->
<!--"c":"https://www.baidu.com/img/bd_logo1.png",-->
<!--"d":"https://www.baidu.com/img/bd_logo1.png",-->

<!--},-->
<!--id:0,-->
<!--info:{}-->
<!--}-->
<!--},-->
<!--created(){-->
<!--this.$_show_$()-->
<!--this.$_info_$()-->
<!--},-->
<!--methods: {-->
<!--$_show_$ () {-->
<!--this.$root.inparams.id-->
<!--this.id = this.$root.inparams.id-->
<!--console.log(this.id)-->
<!--},-->
<!--// 获取商品详情-->
<!--$_info_$(){-->
<!--axios({-->
<!--method:"POST",-->
<!--url:'http://api.yhcode.com:88/operate/goods/queryGoodsById',-->
<!--data:{-->
<!--id: this.id+''-->
<!--},-->
<!--headers:{-->
<!--"Content-type":"application/json"-->
<!--}-->
<!--}).then((rsp)=>{-->
<!--console.log(rsp)-->
<!--if(rsp.status === 200){-->
<!--if(rsp.data.code === 0){-->
<!--this.info = rsp.data.data-->
<!--}else{-->
<!--this.$Message.error('数据获取失败!');-->
<!--}-->
<!--}-->
<!--})-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->


<style scoped>
    .swiper {
        margin-right: 20px;
    }

    .swiper img {
        width: 100%;
        height: 100%;
    }

    .info p {
        line-height: 60px;
        font-size: 14px;
    }

    .info .title {
        font-size: 16px;
        font-weight: bold;
    }

    .detail {
        font-size: 20px;
        line-height: 80px;
    }
</style>
<template>
    <div>
        <Row>
            <!-- 轮播图 -->
            <Col span="14">
                <Carousel autoplay v-model="$_zmdvalue_$" loop class="swiper">
                    <CarouselItem v-for="(item,index) in $_images_$" :key="index" style="height:357px">
                        <div class="demo-carousel">
                            <img :src="item" alt="">
                        </div>
                    </CarouselItem>
                </Carousel>
            </Col>
            <!-- 信息 -->
            <Col class="info" span="9" offset="1">
                <p class="title">{{$_goodsData_$.name}}</p>
                <p>单价:&nbsp;<span style="font-size: 16px">{{$_dj_$}}{{$_unit_$}}</span></p>
                <p>库存:&nbsp;{{$_goodsData_$.repertory-$_goodsData_$.salesCount}}</p>
                <p>数量:&nbsp;{{$_number_$}}</p>
                <p>小计:&nbsp;{{$_jf_$}}积分</p>
                <Button type="primary" @click="$_dh_$()">立即兑换</Button>
            </Col>
        </Row>
        <br>
        <p class="detail" v-html="$_goodsData_$.info"></p>
        <br>
        <div align="center">
          <Button type="primary" @click="$_tc_$()">退出</Button></div>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_zmdvalue_$: 0,
                $_number_$: 1, // 数量
                $_dj_$: '', // 单价
                $_bz_$: '', // 备
                $_id_$: '',
                $_goodsData_$: '',
                $_accountInfo_$: '',
                $_userInfo_$: '',
                $_unit_$: '',
                $_images_$: [],

                $_querycfg_$: {
                    mod: "module",
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
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            // this.$_fquery_$();
            this.$_id_$ = this.$root.inparams.id;
            this.$_goodDetails_$()
        },
        methods: {
            $_xq_$() {
                this.$root.inparams.id
            },
            $_dh_$() {
                this.$root.$_Route_$('employer', 'jump', 'jfdh', {id: this.$_id_$})
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            },
            $_tc_$(){
                 this.$root.$_Route_$("user", "jfscManage", "spManage", {}) 
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
                            //console.log(rsp.data)
                            this.$_goodsData_$ = rsp.data.data;
                            this.$_unit_$ = this.$_goodsData_$.goodsType === 0 ? "元" : "积分";
                            this.$_dj_$ = this.$_goodsData_$.goodsType === 0 ? this.$_goodsData_$.prices : this.$_goodsData_$.credits
                            this.$_images_$ = this.$_goodsData_$.image.split(';');
                        } else {
                            this.$Message.error(rsp.data.message);
                        }
                    }
                })
            },
        }
    };
</script>