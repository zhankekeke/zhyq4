<style scoped>
.clear:after{
    content: '';
    display: block;
    clear:both;
}
.clear{
    zoom: 1;
}
.top{
    margin-top: 50px;
}
.topimg{
    float: left;
    width: 750px;
    height: 400px;
    margin-right: 30px;
}
.info{
    list-style:none;
    float: left;
}
.info li:nth-child(1){
    line-height: 40px;
    font-size: 16px;
}
.info li{
    line-height: 30px;
    font-size:14px;
}
.detail {
    line-height: 50px;
    font-size: 16px;
}
.video{
    width: 930px;
    height: 530px;
    margin: 0 auto;
}
</style>
<template>
   <div>
       <!-- 上部分 -->
       <div class="top clear">
           <div class="topimg">
               <img :src="imageUrl" width="100%" height="400px">
           </div>
              <ul class="info">
                  <li>名称：{{$_info_$.name}}</li>
                  <li>餐厅地址：&nbsp;{{$_info_$.address}}</li>
                  <li>容纳人数：&nbsp;{{$_info_$.peopleNumber}}</li>
                  <li>剩余餐位数：&nbsp;{{$_info_$.freeCount}}</li>
                  <li>对接厂商：&nbsp;{{$_info_$.configDescription}}</li>
              </ul> 
       </div>
       <!-- 下部分 -->
       <p class="detail">餐厅详情</p>
       <br><br>
       <!-- <div class="video">
           <img :src="imageUrl" alt="" width="100%" height="500px">
       </div> -->
       <p v-html="'备注：'+$_info_$.description"></p>
       <div align="center">
    <Button type="primary" @click="$_tc_$()">退出</Button></div>
   </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
           $_info_$:{},
           $_querycfg_$: {
                mod: "",
                params: {}
            },
            row:{},
            imageUrl:''
        }
    },
    created(){
        this.$_global_$.serverPath
        this.$_detail_$()
        this.info()
    },
    methods: {
       $_detail_$() {
        this.$root.inparams.row
        console.log(this.$root.inparams.row)
        this.row =this.$root.inparams.row
        console.log(this.row)
       },
       $_tc_$(){
          this.$root.$_Route_$("user", "ssManage", "diningManage", {});
       },
       info(){
           this.$_sendQuery_$({
               method:"GET",
               url:`${this.$_global_$.serverPath}/zone/zone/${this.row.zoneId}/restaurant/${this.row.id}`,
               data:{},
               headers:{"Content-type":"application/json"}
           }).then((rsp)=>{
               console.log(rsp)
               if(rsp.status === 200){
                   if(rsp.data.code === 0){
                       this.$_info_$ = rsp.data.data
                       this.imageUrl = rsp.data.data.images[0].imageUrl
                   }else{
                       this.$Message.error(rsp.data.message)
                   }
               }
           })
       }
    }
}
</script>