<style scoped>

  .situation {
    background: #f7f7f7;
    padding: 20px;
  }

  .xq{
    background-image: url("/static/employers/hys/1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    padding: 2% 40px 0 80px;
    height:100%;
  }
  .xq p {
    line-height: 30px;
    font-size: 14px;
  }

  .btn span {
    border-radius: 5px;
    color: #fff;
    padding: 10px 20px;
    margin-left: 20px;
  }
  .bac {
    height: 80px;
    width: 100%;
    background: url('/static/employers/hys/kdc.png') no-repeat left center;
    background-size: 100% 100%;
  }

  .bac span {
    font-size: 14px;
  }

  .switch {
    padding: 3px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 5px;
  }

  .active {
    border-color: #999;
    background: #999;
    color: #fff;
  }

  .status b {
    font-weight: normal;
  }

  .status .use{
    width: 100%;
    height: 50px;
    background-color: #f00;
    display: block
  }
  .status .free{
    width: 100%;
    height: 50px;
    cursor:pointer;
    background-color:#6c6;
    display: block
  }
  .status .ordered{
    width: 100%;
    height: 50px;
    background-color: #fc6;
    display: block
  }
  .status .clean{
    width: 100%;
    height: 50px;
    background-color: #999;
    display: block
  }
  .status .supply{
    width: 100%;
    height: 50px;
    display: block
  }
</style>
<template>
  <div>
    <div class="situation">
      <p style="font-size:16px;font-weight:bold;">会议室基本情况</p>
      <br>
      <Row style="padding:0 30px;height: 300px">
        <Col span="14" style="height: 100%">
          <Carousel autoplay loop style="margin-right:30px;">
            <CarouselItem v-for="item in carousel" style="height:300px;">
              <div class="demo-carousel">
                <img :src="item.imageUrl" style="width: 100%;height: 300px">
              </div>
            </CarouselItem>
          </Carousel>
        </Col>
        <Col span="8" class="xq">
          <p>会议室名称:&nbsp;&nbsp;{{row.name}}</p>
          <br>
          <p>地址:&nbsp;&nbsp;{{row.address}}</p>
          <br>
          <p>面积:&nbsp;&nbsp;{{row.area}}平方米</p>
          <br>
          <p>容纳人数:&nbsp;&nbsp;{{row.peopleNumber}}人以内</p>
          <br>
          <p v-if="this.row.meetingConfig != null">消费:&nbsp;&nbsp;{{row.meetingConfig.price*60}}元/时</p>
        </Col>
      </Row>
    </div>
    <br>
    <div>
      <p style="font-size:16px;font-weight:bold;">会议室详情</p>
      <br>
      <div v-html="row.description"></div>
    </div>
    <br>
    <div>
      <p style="font-size:16px;font-weight:bold;">会议室预约情况</p>
      <br>
      <Row>
        <Col span="12" style="font-size:14px;" class="sz">
          <span @click="$_qh_$" class="switch active">{{$_jt_$}}</span>
          <span @click="$_qh_$" class="switch">{{$_mt_$}}</span>
          <span @click="$_qh_$" class="switch">{{$_ht_$}}</span>
          &nbsp;&nbsp;选择日期:
          <DatePicker @on-change="$_qh_$" type="date" placeholder="请选择日期" style="width: 150px"></DatePicker>
        </Col>
        <Col span="12" style="text-align:right;" class="btn">
          <span style="background:#f00">使用中</span>
          <span style="background:#6c6">空闲</span>
          <span style="background:#fc6">已约</span>
          <span style="background:#999">清扫</span>
        </Col>
      </Row>
      <br>
      <div>
        <Row style="padding-top:30px;">
          <Col span="2" style="text-align:center;line-height:80px;font-size:16px;">凌晨</Col>
          <Col span="22">
            <div class="bac">
              <span style="position:absolute;top:-20px;left:-1%;">00:00</span>
              <span style="position:absolute;top:-20px;left:15.1%;">01:00</span>
              <span style="position:absolute;top:-20px;left:31.55%;">02:00</span>
              <span style="position:absolute;top:-20px;left:48%;">03:00</span>
              <span style="position:absolute;top:-20px;left:64.5%;">04:00</span>
              <span style="position:absolute;top:-20px;left:81%;">05:00</span>
              <span style="position:absolute;top:-20px;right:-1%;">06:00</span>
            </div>
            <div class="status"
                 style="height: 50px; margin-left: 8px; margin-right: 9px; margin-top: -40px;">
              <p v-for="(item, index) in $_hysStatus_$[0].lc" :key="index"
                 style="width:1.388889%; float: left">

                <span class="free" v-if="item == 0 && $_hysStatus_$[0].lc[index+1] !=0 && $_hysStatus_$[0].lc[index-1] !=0"
                      style="border-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].lc[index+1] !=0"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].lc[index-1] !=0"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0"></span>

                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].lc[index+1] !=1 && $_hysStatus_$[0].lc[index-1] !=1"
                      style="border-radius: 6px;">
                                      <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].lc[index+1] !=1"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].lc[index-1] !=1"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1">
                                    <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>

                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].lc[index+1] !=2 && $_hysStatus_$[0].lc[index-1] !=2 "
                      style="border-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].lc[index+1] !=2"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].lc[index-1] !=2"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2"></span>

                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].lc[index+1] !=3 && $_hysStatus_$[0].lc[index-1] !=3"
                      style="border-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].lc[index+1] !=3"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].lc[index-1] !=3"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3"></span>

                <span class="supply" v-else></span>
              </p>
            </div>
          </Col>
        </Row>
        <Row style="padding-top:30px;">
          <Col span="2" style="text-align:center;line-height:80px;font-size:16px;">上午</Col>
          <Col span="22">
            <div class="bac">
              <span style="position:absolute;top:-20px;left:-1%;">06:00</span>
              <span style="position:absolute;top:-20px;left:15.1%;">07:00</span>
              <span style="position:absolute;top:-20px;left:31.55%;">08:00</span>
              <span style="position:absolute;top:-20px;left:48%;">09:00</span>
              <span style="position:absolute;top:-20px;left:64.5%;">10:00</span>
              <span style="position:absolute;top:-20px;left:81%;">11:00</span>
              <span style="position:absolute;top:-20px;right:-1%;">12:00</span>
            </div>
            <div class="status"
                 style="height: 50px; margin-left: 8px; margin-right: 9px; margin-top: -40px;">
              <p v-for="(item, index) in $_hysStatus_$[0].sw" :key="index"
                 style="width:1.388889%; float: left">
                <span class="free" v-if="item == 0 && $_hysStatus_$[0].sw[index+1] !=0 && $_hysStatus_$[0].sw[index-1] !=0"
                      style="border-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].sw[index+1] !=0"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].sw[index-1] !=0"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0"></span>

                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].sw[index+1] !=1 && $_hysStatus_$[0].sw[index-1] !=1"
                      style="border-radius: 6px;">
                                      <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].sw[index+1] !=1"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].sw[index-1] !=1"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1">
                                    <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>

                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].sw[index+1] !=2 && $_hysStatus_$[0].sw[index-1] !=2 "
                      style="border-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].sw[index+1] !=2"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].sw[index-1] !=2"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2"></span>

                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].sw[index+1] !=3 && $_hysStatus_$[0].sw[index-1] !=3"
                      style="border-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].sw[index+1] !=3"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].sw[index-1] !=3"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3"></span>
                <span class="supply" v-else></span>
              </p>
            </div>
          </Col>
        </Row>
        <Row style="padding-top:50px;">
          <Col span="2" style="text-align:center;line-height:80px;font-size:16px;">下午</Col>
          <Col span="22">
            <div class="bac">
              <span style="position:absolute;top:-20px;left:-1%;">12:00</span>
              <span style="position:absolute;top:-20px;left:15.1%;">13:00</span>
              <span style="position:absolute;top:-20px;left:31.55%;">14:00</span>
              <span style="position:absolute;top:-20px;left:48%;">15:00</span>
              <span style="position:absolute;top:-20px;left:64.5%;">16:00</span>
              <span style="position:absolute;top:-20px;left:81%;">17:00</span>
              <span style="position:absolute;top:-20px;right:-1%;">18:00</span>
            </div>
            <div class="status"
                 style="height: 50px; margin-left: 8px; margin-right: 9px; margin-top: -40px;">
              <p v-for="(item, index) in $_hysStatus_$[0].zw" :key="index"
                 style="width:1.388889%; float: left">
                <span class="free" v-if="item == 0 && $_hysStatus_$[0].zw[index+1] !=0 && $_hysStatus_$[0].zw[index-1] !=0"
                      style="border-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].zw[index+1] !=0"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].zw[index-1] !=0"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0"></span>

                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].zw[index+1] !=1 && $_hysStatus_$[0].zw[index-1] !=1"
                      style="border-radius: 6px;">
                                      <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].zw[index+1] !=1"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].zw[index-1] !=1"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1">
                                    <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>

                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].zw[index+1] !=2 && $_hysStatus_$[0].zw[index-1] !=2 "
                      style="border-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].zw[index+1] !=2"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].zw[index-1] !=2"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2"></span>

                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].zw[index+1] !=3 && $_hysStatus_$[0].zw[index-1] !=3"
                      style="border-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].zw[index+1] !=3"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].zw[index-1] !=3"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3"></span>
                <span class="supply" v-else></span>
              </p>
            </div>
          </Col>
        </Row>
        <Row style="padding-top:50px; padding-bottom: 50px">
          <Col span="2" style="text-align:center;line-height:80px;font-size:16px;">晚上</Col>
          <Col span="22">
            <div class="bac">
              <span style="position:absolute;top:-20px;left:-1%;">18:00</span>
              <span style="position:absolute;top:-20px;left:15.1%;">19:00</span>
              <span style="position:absolute;top:-20px;left:31.55%;">20:00</span>
              <span style="position:absolute;top:-20px;left:48%;">21:00</span>
              <span style="position:absolute;top:-20px;left:64.5%;">22:00</span>
              <span style="position:absolute;top:-20px;left:81%;">23:00</span>
              <span style="position:absolute;top:-20px;right:-1%;">24:00</span>
            </div>
            <div class="status"
                 style="height: 50px; margin-left: 8px; margin-right: 9px; margin-top: -40px;">
              <p v-for="(item, index) in $_hysStatus_$[0].xw" :key="index"
                 style="width:1.388889%; float: left">
                <span class="free" v-if="item == 0 && $_hysStatus_$[0].xw[index+1] !=0 && $_hysStatus_$[0].xw[index-1] !=0"
                      style="border-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].xw[index+1] !=0"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0 && $_hysStatus_$[0].xw[index-1] !=0"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="free" v-else-if="item == 0"></span>

                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].xw[index+1] !=1 && $_hysStatus_$[0].xw[index-1] !=1"
                      style="border-radius: 6px;">
                                      <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].xw[index+1] !=1"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1 && $_hysStatus_$[0].xw[index-1] !=1"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="ordered" v-else-if="item == 1">
                                    <!--<Poptip trigger="hover" style="width: 100%; height:100%;display: block;">
                                        <div slot="content">
                                            <b>预约人：XXX</b><br/>
                                            <b>部门：XXX</b><br/>
                                            <b>会议主题：XXX</b>
                                        </div>
                                    </Poptip>-->
                                </span>

                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].xw[index+1] !=2 && $_hysStatus_$[0].xw[index-1] !=2 "
                      style="border-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].xw[index+1] !=2"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2 && $_hysStatus_$[0].xw[index-1] !=2"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="clean" v-else-if="item == 2"></span>

                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].xw[index+1] !=3 && $_hysStatus_$[0].xw[index-1] !=3"
                      style="border-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].xw[index+1] !=3"
                      style="border-top-right-radius: 6px;border-bottom-right-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3 && $_hysStatus_$[0].xw[index-1] !=3"
                      style="border-top-left-radius: 6px;border-bottom-left-radius: 6px;"></span>
                <span class="use" v-else-if="item == 3"></span>
                <span class="supply" v-else></span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import controler from './controler.js';

  export default {
    mixins: [controler],
    data() {
      return {
          carousel:[],
        row: '',
        $_info_$: {},
        url: '',
        $_hysmc_$: '坦山会议室',
        $_dz_$: '',
        $_mj_$: '',
        $_rnrs_$: '',
        $_xhjf_$: '',
        $_bz_$: '',
        $_jt_$: '今天',
        $_mt_$: '',
        $_ht_$: '',
        $_sj_$: [],
        $_hysStatus_$: [
          {
            lc: [],
            sw: [],
            zw: [],
            xw: [],
          }
        ],
        $_querycfg_$: {
          mod: '',
          params: {}
        }
      }
    },
    methods: {
      $_xx_$() {
        this.$_sendQuery_$({
          method: "GET",
          url: this.$_global_$.serverPath+`/zone/zone/${this.row.zoneId}/meeting/${this.row.id}`,
          data: {},
          headers: {
            "Content-type": "application/json"
          }
        }).then((rsp) => {
          if (rsp.status === 200) {
            if (rsp.data.code === 0) {
              this.$_info_$ = rsp.data.data;
              this.carousel=rsp.data.data.images;
              this.url = rsp.data.data.images[0].imageUrl;

              this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath+`/zone/zone/` + this.row.zoneId + `/meeting/` + this.row.id + `/detail`,
                data: {},
                headers: {
                  "Content-type": "application/json"
                }
              }).then((rsc) => {
                if (rsc.status === 200) {
                  if (rsc.data.code === 0) {
                    if(rsc.data.data.meetingRecord){
                      this.$_yyData_$(rsc.data.data.meetingRecord)
                    }else{
                      let timeConfig = rsc.data.data.meetingRoom.meetingConfig
                      let startTime = timeConfig.startTime;  //开始时间
                      let endTime = timeConfig.endTime;    //结束时间
                      let startArr = startTime.split(':');  //开始时间转数组
                      let endArr = endTime.split(':');  //结束时间转数组
                      let hourDiff = Math.abs(endArr[0]-startArr[0]);   //小时差值
                      let minuteDiff = Math.abs(endArr[1]-startArr[1]); //分钟差值
                      let timeStep = (hourDiff*60+minuteDiff)/5;  //时间差值的步长值


                      startTime = startTime.replace(":","");
                      endTime = endTime.replace(":","");

                      let Front11 = startTime+endTime+"000";
                      let behind = "0".repeat(timeStep);
                      let reslt = {"reserveConfig":Front11+behind};
                      this.$_yyData_$(reslt);
                    }
                  }
                }
              });
            } else {
              this.$Message.error('数据获取失败!');
            }
          }
        })
      },
      $_detail_$() {
        this.row = this.$root.inparams.row;
      },
      $_qh_$(e) {
        let nowDay = '';
        if ($(e.target).length != 0) {
          let now = $(e.target)[0].innerText;
          if (now == '今天') {
            //当天日期
            let date3 = new Date();
            nowDay = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate());
          } else {
            nowDay = now;
          }
        } else {
          nowDay = e;
        }
        this.row.nowDay = nowDay;
        this.$_sendQuery_$({
          method: "POST",
          url: this.$_global_$.serverPath+`/zone/zone/` + this.row.zoneId + `/meeting/` + this.row.id + `/detail`,
          data: {
            "reserveDate": nowDay
          },
          headers: {
            "Content-type": "application/json"
          }
        }).then((rsp) => {
          if (rsp.status === 200) {
            if (rsp.data.code === 0) {
              if(rsp.data.data.meetingRecord){
                this.$_yyData_$(rsp.data.data.meetingRecord)
              }else{
                let timeConfig = rsp.data.data.meetingRoom.meetingConfig;
                let startTime = timeConfig.startTime;  //开始时间
                let endTime = timeConfig.endTime;    //结束时间
                let startArr = startTime.split(':');  //开始时间转数组
                let endArr = endTime.split(':');  //结束时间转数组
                let hourDiff = Math.abs(endArr[0]-startArr[0]);   //小时差值
                let minuteDiff = Math.abs(endArr[1]-startArr[1]); //分钟差值
                let timeStep = (hourDiff*60+minuteDiff)/5;  //时间差值的步长值


                startTime = startTime.replace(":","");
                endTime = endTime.replace(":","");

                let Front11 = startTime+endTime+"000";
                let behind = "0".repeat(timeStep);
                let reslt = {"reserveConfig":Front11+behind};
                this.$_yyData_$(reslt);
              }
            }
          }
        });

        if ($(e.target).hasClass('active')) {
          $(e.target).siblings('span').removeClass('active')
        } else {
          $(e.target).addClass('active').siblings('span').removeClass('active')
        }
      },
      //整理预约数据
      $_yyData_$(data) {
          this.$_hysStatus_$= [
              {
                  sw: [],
                  zw: [],
                  xw: [],
                  lc: [],
              }
          ];
          //会议室可预约时间的起始时间
          let starttime = [];
          starttime.push(data.reserveConfig.substr(0,2));
          starttime.push(data.reserveConfig.substr(2,2));
          let bcdata1 = (starttime[0]*60+starttime[1]*1)/5;
          let yydataq = '';

          for(let i=0;i<bcdata1;i++){
            yydataq += '9';
          }

          //会议室可预约时间的结束时间
          let endtime = [];
          endtime.push(data.reserveConfig.substr(4,2));
          endtime.push(data.reserveConfig.substr(6,2));
          let bcdata2 = ((24-endtime[0])*60-endtime[1])/5;
          let yydatah = '';

          for(let i=0;i<bcdata2;i++){
            yydatah += '9';
          }

          let yydata = data.reserveConfig.substr(11);
          yydata = yydataq+yydata+yydatah;

          let lc = yydata.substr(0, 72);
          let sw = yydata.substr(72, 72);
          let zw = yydata.substr(144,72);
          let xw = yydata.substr(216,72);
          for (let i = 0; i < lc.length; i++) {
              this.$_hysStatus_$[0].lc.push(lc.substr(i, 1));
          }
          for (let i = 0; i < sw.length; i++) {
              this.$_hysStatus_$[0].sw.push(sw.substr(i, 1));
          }
          for (let i = 0; i < zw.length; i++) {
              this.$_hysStatus_$[0].zw.push(zw.substr(i, 1));
          }
          for (let i = 0; i < xw.length; i++) {
            this.$_hysStatus_$[0].xw.push(xw.substr(i, 1));
          }

      },
      $_formatNum_$(str) {
        var newStr = "";
        var count = 0;
        for (var i = str.length - 1; i >= 0; i--) {
          if (count % 1 == 0 && count != 0) {
            newStr = str.charAt(i) + "," + newStr;
          } else {
            newStr = str.charAt(i) + newStr;
          }
          count++;
        }
        str = newStr; //自动补小数点后两位
        return str;
      },
      //预定会议室
      $_toDetails_$(){
       // this.$root.$_Route_$("employer","jump","hysyy",{row:this.row})
      },
    }
    ,
    created() {
      //前一天日期
      let date2 = new Date();
      this.$_detail_$();
      this.row.nowDay=date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
      date2.setTime(date2.getTime() + 24 * 60 * 60 * 1000);
      this.$_mt_$ = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
      date2.setTime(date2.getTime() + 24 * 60 * 60 * 1000);
      this.$_ht_$ = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate());
      this.$_xx_$();

    }
    ,
  }
</script>