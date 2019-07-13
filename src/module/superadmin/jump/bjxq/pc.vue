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
               <img :src="imageUrl" alt="">
           </div>
              <ul class="info">
                  <li>{{$_info_$.name}}</li>
                  <li>地址:&nbsp;{{$_info_$.address}}</li>
                  <li>容纳人数:&nbsp;{{$_info_$.peopleNumber}}</li>
              </ul> 
       </div>
       <!-- 下部分 -->
       <p class="detail">包间详情</p>
       <div class="video">
           <img :src="imageUrl" alt="">
       </div>
	</div>
</template>

<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
       $_info_$:{},
      $_querycfg_$: {
        mod: "",
        params: {}
      },
      imageUrl:'',
      row:{}
    };
  },
  created() {
      this.$_global_$.serverPath
      this.$_detail_$()
      this.info()
  },
  methods: {
      $_detail_$() {
          this.$root.inparams.row
          this.row = this.$root.inparams.row
      },
        info(){
           this.$_sendQuery_$({
               method:"GET",
               url:`${this.$_global_$.serverPath}/zone/zone/${this.row.zoneId}/restaurant/${this.row.restaurantId}/box/${this.row.id}`,
               data:{},
               headers:{"Content-type":"application/json"}
           }).then((rsp)=>{
               //console.log(rsp)
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
};
</script>