<style scoped>
.top{
    width: 90%;
    padding: 30px 50px 10px 50px;
    box-sizing: border-box;
    background: #f7f7f7;
    margin: 0 auto;
}
.top p{
    font-size: 12px;
    margin-bottom: 10px;
}
.btn{
    width: 79%;
    margin-top: 30px;
}
.info{
    width: 80%;
    margin: 0 auto;
    padding: 20px 20px 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
}
.img{
    width: 150px;
    height: 90px;
    /* background: #f7f7f7; */
}
.info p{
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
}
.content{
    width: 80%;
    margin: 20px auto 0;
}
.title{
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
}
.normal{
    font-size: 14px;
    line-height: 30px;
}
.time{
    text-align: right;
    line-height: 50px;
}
.fj{
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
}
</style>



<template>
    <div>
        <div class="info">
            <Row>
                <Col span="18">
                    <p>标题：&nbsp;{{this.$_infoDetail_$.title}}</p>
                    <p style="color: #545454;font-weight: normal">发布时间：&nbsp;{{this.$_infoDetail_$.createDate}}</p>
                    <p style="color: #545454;font-weight: normal">发起人：&nbsp;{{this.$_infoDetail_$.createUserName}}</p>
                    <p style="color: #545454;font-weight: normal">接收人：&nbsp;{{this.$_infoDetail_$.receivers}}</p>
                    <p style="color: #545454;font-weight: normal">通知类型：&nbsp;{{this.$_infoDetail_$.typename}}</p>
                    <p style="color: #545454;font-weight: normal" v-if="$_infoDetail_$.type == 2">缴费金额：&nbsp;{{this.$_infoDetail_$.noticePayment.paymentAccount}}元</p>
                    <span v-if="$_infoDetail_$.type == 2">
                    <p style="color: #545454;font-weight: normal" v-if="$_infoDetail_$.noticePayment.payStatus == 1">缴费时间：&nbsp;{{this.$_infoDetail_$.noticePayment.payTime}}</p>
                    <p style="color: #545454;font-weight: normal" v-else-if="$_infoDetail_$.noticePayment.payStatus == 0">缴费时间：&nbsp;未缴费</p></span>
                    <p style="color: #545454;font-weight: normal">摘要：&nbsp;{{this.$_infoDetail_$.description}}</p>
                </Col>
            </Row>
        </div>
        <!-- 内容 -->
        <div class="content">
            <p class="title">通知内容:</p>
            <p class="normal" v-html ="this.$_infoDetail_$.content">
            </p>
            <p class="fj">
                附件:<a :href="upurl" v-if="this.$_infoDetail_$.files">下载附件</a>
            </p>
        </div>
        <div align="center">
        <Button type="primary" @click="$_close_$()">关闭</Button></div>
  </div>

  
</template>




<script>
import controler from "./controler.js";
export default {
  mixins: [controler],
  data() {
    return {
      row:'',
      uppurl:'http://img.yhcode.com:88/',
      upurl:''
    }
  },
  created() {
    this.$_detail_$();   
  },
  methods: {
    // 详情
    $_detail_$() {
      this.row = this.$root.inparams.row;
      this.$_infoDetail_$ = {};
      this.$_infoDetail_$ = this.row;
      this.upurl = this.uppurl+this.$_infoDetail_$.files;
    },
    // 关闭
    $_close_$() {
      this.$root.$_Route_$('user','informManage','inform',{});
    }
  }
};
</script>