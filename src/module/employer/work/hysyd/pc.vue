<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
    .bg {
    background: #efefef;
    padding: 10px;
}
.ivu-form-item{
    margin-bottom:0px;
}
.hysbox li{
    line-height:24px;
    height:24px;
}
</style>
<template>
   <div>
       <div class="bg">
            <Row type="flex"  align="middle">
                <Col span="6" align="middle">
                    <span >会议室名称：</span>
                    <Input v-model="$_hysName_$" placeholder="请输入会议室名称" style="width:160px"></Input>
                </Col>
                <Col span="8" align="middle">
                    <span >容纳人数：</span>
                    <Input v-model="$_peopleB_$" placeholder="最小容纳人数" style="width:100px"></Input>
                    <span>——</span>
                    <Input v-model="$_peopleE_$" placeholder="最大容纳人数" style="width:100px"></Input>
                </Col>
                <Col span="2"  align="middle">
                    <Button type="primary" @click="$_search_$()">搜索</Button>
                </Col>
            </Row>
       </div>
       <br>
        <Row>
            <Col align="right">
                <Button type="primary" @click="$_myRecord_$">我的预约记录</Button>
            </Col>
        </Row>

        <Row>
            <Col  v-for="(item, index) in hysData" :key="index" span="8" style="padding:20px">
                <Row style="padding:10px;border:1px solid #efefef;height: 190px;overflow: hidden">
                    <Col align="center">
                        <img :src="item.images[0].imageUrl" style="width: 100%;height: 170px" width="50%">
                    </Col>

                </Row>

                <Row style="padding:10px;border:1px solid #efefef">
                    <Col span="12">
                        <ul class="hysbox">
                            <li style="font-size:20px;">{{item.name}}</li>
                            <li><span>地址：</span>{{item.address}}</li>
                            <li><span>容纳人数：</span>{{item.peopleNumber}}</li>
                        </ul>
                    </Col>
                    <Col span="12" align="right">
                        <span>{{item.price*60}}元/小时</span>
                    </Col>
                </Row>
                <Row style="border:1px solid #efefef">
                    <Col span="12" align="center">
                       <div @click="$_Details_$(item)" style="padding:10px; margin:0 auto; cursor:pointer">详情</div>
                    </Col>
                     <Col span="12" align="center" style="padding:10px; margin:0 auto;background:rgba(102, 153, 255, 1)">
                        <div style="cursor:pointer" @click="$_toDetails_$(item)" >立即预定</div>
                     </Col>
                </Row>
            </Col>

        </Row>
        <br>

        <br>
        <Row class='Row' >
            <Col align="right">
                <Page :total="$_total_$"
             show-elevator show-sizer
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
            </Col>
        </Row>

   </div>
</template>
<script>
import controler from './controler.js';
import axios from "axios"
export default {
    mixins: [controler],
    data() {
        return {
            $_hysName_$:"",
            $_peopleB_$: '',  //会议室最小容纳人数
            $_peopleE_$: '',  //会议室最大容纳人数
            $_thisUserInfo_$:{},

            $_formValidate_$: {
                    date: '',
                },
            $_ruleValidate_$: {
            },
            $_total_$: 0, // 数据总数
            hysData:[], // 列表数据
            $_querycfg_$: {
                    mod: '',
                    params: {}
            }
        }
    },
    created(){
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.$_thisUserInfo_$ = JSON.parse(cookie);

        this.$_list_$()
    },
    methods: {
        // 获取列表
        $_list_$(){
            this.$_querycfg_$.mod = 'zone/zone/'+this.$_thisUserInfo_$.zoneId+'/meetings';
            this.$_fquery_$((rsp)=>{
                if (rsp.status === 200) {
                    if(rsp.data.code === 0){
                        this.hysData = rsp.data.data.records
                        this.$_total_$ = rsp.data.data.total
                    }else{
                         this.$Message.error('获取数据失败!');
                    }
                }
            })
        },
        // 搜索
       $_search_$(){
           this.$_querycfg_$.params.name = this.$_hysName_$;
           this.$_querycfg_$.params.peopleNumberB = this.$_peopleB_$;
           this.$_querycfg_$.params.peopleNumberE = this.$_peopleE_$;
           this.$_list_$();
       },
       //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = 10;
                 this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_list_$();
            },
    //    详情
       $_Details_$(item){
           this.$root.$_Route_$("employer", "jump", "hysxq", {row:item})
       },
    //    立即预定
       $_toDetails_$(item){
            this.$root.$_Route_$("employer","jump","hysljyd",{row:item})
       },
    //    我的预约记录
       $_myRecord_$(){
           this.$root.$_Route_$("employer","jump","myyyjl")
       }
    }
}
</script>