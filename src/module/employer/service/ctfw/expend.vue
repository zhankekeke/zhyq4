<style scoped>
.clear:after{
    content: '';
    display: block;
    clear: both;
}
.clear{
    zoom: 1;
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
.item .item1 .img{
    height: 200px;
    width: 80%;
    overflow: hidden;
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
.item {
    padding: 15px 30px 25px 15px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #f7f7f7;
}
</style>
<template>
    <div>
        <div v-if="item.status" v-for="(item, index) in child"
        :key="index" class="item clear">
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
            </div>
            <div class="btn">
                <span class="button" @click="$_bjyd_$(item)">包间预定</span>
            </div>
        </div>
        <br>
    </div>
</template>
<script>
export default {
    props:{
        child: Array
    },
    created() {
        // console.log(this.child)
    },
    methods: {
        $_bjyd_$(row){
            this.$root.$_Route_$('employer','jump','bjyd',{row: row})
        }
    }
};
</script>

