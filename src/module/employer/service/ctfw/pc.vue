<style scoped>
.search {
  padding: 15px 0 15px 15px;
  background: #f7f7f7;
  margin-bottom: 15px;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  color: #404040;
}
.item {
    padding: 15px 30px 25px 15px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #f7f7f7;
}
.item .item1 .img{
    height: 200px;
    width: 80%;
    overflow: hidden;
    /*background: #d11c1c;*/
}
.cont{
    padding-top: 20px;
    box-sizing: border-box;
    float: left;
    width: 25%;
}
.title{
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
}
p{
    font-size: 14px;
    line-height: 30px;
}
span{
    font-size: 16px;
    color: rgb(209, 115, 38);
}
.btn{
    padding-top: 70px;
    box-sizing: border-box;
    float: left;
    width: 25%;
}
.item .item1{
    float: left;
    width: 25%;
}
.item .btn .button{
    display: block;
    padding: 15px 0;
    width: 180px;
    text-align: center;
    color: #fff;
    background: #2d8cf0;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
}
.clear:after{
    content: '';
    display: block;
    clear: both;
}
.clear{
    zoom: 1;
}
.wrap{
    height: 300px;
}
</style>
<template>
   <div>
       <!-- 搜索 -->
       <div class="search">
            餐厅名称:&nbsp;&nbsp;
            <Input v-model="$_name_$" style="width: 210px" placeholder="请输入餐厅名称"></Input>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div v-for="(item, index) in $_list_$" :key="index">
                <div v-if="item.boxList.length == 0" class="item clear">
                    <div class="item1">
                        <div class="img">
                            <img v-if="item.images.length>0" :src="item.images[0].imageUrl" style="width: 100%;height: 100%" alt="">
                        </div>
                    </div>
                    <div class="cont">
                        <p class="title">{{item.name}}</p>
                        <p>餐厅地址:&nbsp;&nbsp;{{item.address}}</p>
                        <p>容纳人数:&nbsp;&nbsp;{{item.peopleNumber}}人</p>
                    </div>
                    <div class="cont">
                        <p v-if="item.freeCount">剩余餐位:&nbsp;&nbsp;<span>{{item.freeCount}}</span></p>
                        <p v-if="item.level==0">拥挤程度:&nbsp;&nbsp;低}</p>
                        <p v-if="item.level==1">拥挤程度:&nbsp;&nbsp;中</p>
                        <p v-if="item.level>1">拥挤程度:&nbsp;&nbsp;高</p>
                    </div>
                    <div class="btn">
                        <span class="button" @click="$_detail_$(item)">详情</span>
                    </div>
                </div>
                <br>
                <div v-if="item.boxList.length != 0" class="item clear">
                    <div class="clear">
                        <div class="item1">
                            <div class="img">
                                <img v-if="item.images.length>0" :src="item.images[0].imageUrl" style="width: 100%;height: 100%" alt="">
                            </div>
                        </div>
                        <div class="cont">
                            <p class="title">{{item.name}} (商务餐厅)</p>
                            <p>餐厅地址:&nbsp;&nbsp;{{item.address}}</p>
                            <p>容纳人数:&nbsp;&nbsp;{{item.peopleNumber}}人</p>
                        </div>
                        <div class="cont">
                        </div>
                        <div class="btn">
                            <span class="button" ref='btn' @click="$_yd_$(index)">包间</span>
                        </div>
                    </div>
                    <br>
                    <div class="expend" v-show="showType[index]">
                        <expend-list :child="item.boxList"></expend-list>
                    </div>

                </div>
                <br>
            </div>
        </div>
        <br>
        <!-- 分页 -->
        <Row>
            <!-- <Page align="right" :total="100" show-sizer show-elevator></Page> -->
            <Page align="right" :total="$_total_$"
             show-elevator show-sizer
			 :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
   </div>
</template>
<script>
import controler from './controler.js';
import expendList from './expend'

export default {
    mixins: [controler],
    components:{ expendList },
    data() {
        return {
            showType:{},
            $_userInfo_$:{},
            value1: '1',
           $_name_$: '', // 餐厅名称
           $_list_$: [],
           $_total_$:0,
           $_querycfg_$: {
                mod: "",
                params: {}
            },
            $_pageSize_$:3,
        }
    },
    created() {
      let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
      this.$_userInfo_$ = JSON.parse(cookie);
      this.$_global_$.serverPath
      this.list();
      this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
  },
    methods: {
        // 获取餐厅列表
        list(){
            this.$_querycfg_$.mod = 'zone/zone/'+this.$_userInfo_$.zoneId+'/restaurant/search';
            this.$_querycfg_$.params.status='1';
            this.$_fquery_$((rsp)=>{
                console.log(rsp)
                if(rsp.status === 200){
                    if (rsp.data.code === 0) {
                        this.$_list_$ = rsp.data.data.records
                        this.$_total_$ = rsp.data.data.total
                        console.log(this.$_list_$);
                    }
                }
            })
        },
        //    搜索
        $_search_$(){
            if(this.$_name_$){
                this.$_querycfg_$.params.name = this.$_name_$;
                this.list()
            }else{
                delete this.$_querycfg_$.params.name;
                this.list();
            }
        },
        //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                 this.list();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.list();
            },
        // 详情
        $_detail_$(row){
            console.log(row)
            this.$root.$_Route_$('employer','jump','ctffxq',{row:row})
        },
        // 包间预定
        $_yd_$(index){
           this.$set(this.showType, index, !this.showType[index]);
        },
    }
}
</script>