<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
    .top{
        padding:10px 20px;
        border:1px solid #ddd;
    }
    .top .tlt{
        margin-bottom:20px;
        font-weight:normal;
        font-size:16px;
    }
    .top .gr{
        padding:10px 0 0 10px;
    }
    .top p,.top li{
        line-height:30px;
    }
    .top .bold{
        font-size:14px;
        margin:0 3px;
        color: #01A0FB;
    }
    .top .staff{
        width:100%;
    }
    .screen{
        padding:20px;
        margin:20px 0;
    }
    .table .data{
        line-height:30px;
    }
    .page{
        text-align:right;
    }
</style>
<template>
   <div class="sz">
       <div class="top">
            <Row>
                <Col span="7">
                    <div class="Housekeeper">
                        <h3 class="tlt">管家信息</h3>
                        <Row>
                            <Col span="6"><img class="staff" :src="$_housekeeper_$.image" alt=""></Col>
                            <Col span="18">
                                <div class="gr">
                                    <p>姓名：<span class="bold" style="color: #495060">{{$_housekeeper_$.name}}</span></p>
                                    <p>联系方式：<span>{{$_housekeeper_$.phone_number}}</span></p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="5" style="margin-top: 1%">
                    <p style="font-size:14px;">服务企业：</p>
                    <ul v-for="item in $_housekeeper_$.enterprise" style="font-weight: 600">
                        <li>{{item.enterprise_name}}</li>
                    </ul>
                </Col>
                <Col span="6" style="margin-top: 1%">
                    <p>综合得分：
                        <span class="bold" v-if="$_housekeeper_$.synthesize">{{$_housekeeper_$.synthesize}}</span>
                        <span class="bold" v-else>0</span>
                        分
                    </p>
                    <p>服务总次数：
                        <span class="bold" v-if="$_housekeeper_$.service_count">{{$_housekeeper_$.service_count}}</span>
                        <span class="bold" v-else>0</span>
                        次
                    </p>
                    <p>平均响应时间：
                        <span class="bold" v-if="$_housekeeper_$.avg_reply_time">{{$_housekeeper_$.avg_reply_time}}</span>
                        <span class="bold" v-else>0</span>
                        分钟
                    </p>
                    <p>平均处理时间：
                        <span class="bold" v-if="$_housekeeper_$.avg_handle_time">{{$_housekeeper_$.avg_handle_time}}</span>
                        <span class="bold" v-else>0</span>
                        小时
                    </p>
                </Col>
                <Col span="6" style="margin-top: 1%">
                    <p>综合得分：
                        <span class="bold" style="color:#FFCC01" v-if="$_housekeeper_$.synthesize">{{$_housekeeper_$.synthesize}}</span>
                        <span class="bold" style="color:#FFCC01" v-else>0</span>
                        分
                    </p>
                    <p>星级：<Rate allow-half v-model="$_housekeeper_$.star" disabled/></p>
                </Col>
            </Row>
        </div>
        <div class="screen">
            <Row>
                <Col span="24">
                    标题：&nbsp;&nbsp;<Input v-model="$_order_$" placeholder="请输入标题" style="width: 150px" />
                    &nbsp;&nbsp;分类：&nbsp;&nbsp;
                        <Select v-model="$_classification_$" style="width:150px" placeholder="全部">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    &nbsp;&nbsp;开始日期：&nbsp;&nbsp;
                        <DatePicker v-model="beginTime" type="date" split-panels placement="bottom" placeholder="请选择日期" style="width: 150px"></DatePicker>
                       &nbsp;&nbsp;结束日期：&nbsp;&nbsp;
                       <DatePicker v-model="endTime" type="date" split-panels placement="bottom" placeholder="请选择日期" style="width: 150px"></DatePicker>
                        &nbsp;&nbsp;<Button type="primary" @click="$_search_$">搜索</Button>
                    
                </Col>
            </Row>
        </div>
        <div class="table">
            <!-- 表格 -->
            <el-table :data="$_data_$" border style="width: 100%">
                <el-table-column align="center" prop="id" label="序号"></el-table-column>
                <el-table-column align="center" prop="recordTypeName" label="事项分类"></el-table-column>
                <el-table-column align="center" prop="recordTitle" label="标题"></el-table-column>
                <el-table-column align="center" prop="commiterName" label="联系人"></el-table-column>
                <el-table-column align="center" prop="commiterDeptName" label="公司"></el-table-column>
                <el-table-column align="center" prop="commiterPubtime" label="提交时间"></el-table-column>
                <el-table-column align="center" prop="handlerRecvtime" label="受理时间"></el-table-column>
                <el-table-column align="center" prop="handlerCompletime" label="处理时间"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.recordStatus | formatStatus}}</span>
           </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button v-show="scope.row.recordStatus==0" @click="$_show_$(scope.row)" type="text" size="small"> 受理</el-button>
                        <el-button v-show="scope.row.recordStatus==1" @click="$_remove_$(scope.row)" type="text" size="small">处理</el-button>
                        <el-button v-show="scope.row.recordStatus==2" @click="$_remove_$(scope.row)" type="text" size="small">再次处理</el-button>
                        <el-button v-show="scope.row.recordStatus==3" @click="$_remove_$(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 受理提示 -->
            <Modal
                v-model="$_acceptance_$"
                title="提示"
                @on-ok="$_ok_$"
                @on-cancel="$_cancel_$"
                width="300">
                <p>确定受理此问题?</p>
            </Modal>
        </div>
        <!-- 分页器 -->
       <div style="margin-top:20px;">
           <p class="data">共<span>{{$_total_$}}</span>条数据</p>
           <div class="page">
               <Page :total="$_total_$"
                     show-elevator show-sizer
                     @on-page-size-change="$_pageNum_$"
                     @on-change="$_changePage_$"/>
           </div>
       </div>
   </div>
</template>
<script>
import { Table,Button,TableColumn } from 'element-ui';
import controler from './controler.js';
import 'element-ui/lib/theme-chalk/index.css';
export default {
    mixins: [controler],
    components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn
    },
    filters: {
        formatStatus (val) {
            if(val == 0){
                return '未受理'
            }
            if(val == 1){
                return '已受理'
            }
            if(val == 2){
                return '处理中'
            }
            if(val == 3){
                return '已完成'
            }
        }
    },
    data() {
        return {
            $_order_$:'',
           $_housekeeper_$:{},
            $_row_$:{},
           $_name_$:'王乐乐',
           $_phone_$:188888888,
           $_score_$:99,
           $_frequency_$:88,
           $_corresponding_$:30,
           $_time_$:5,
           $_value_$: 2.4,
           $_enterprise_$:[1,2,3],
           $_total_$:0,   //总条数
           $_classification_$:'全部',
           $_acceptance_$:false,  // 受理提示框
            $_data_$: [],   // 表格数据
             cityList: [   // 分类列表
                 {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '物业保修'
                },
                {
                    value: 2,
                    label: '投诉建议'
                },
                {
                    value: 3,
                    label: '企业服务咨询'
                },
                 {
                     value: 4,
                     label: '留言信息'
                 }
            ],
            $_text_$: '', // 提示信息
            $_id_$: 0,
            $_title_$:'',
            $_querycfg_$: {
                    mod: '',
                    params: {}
            },
            beginTime:'',
            endTime:'',
            userInfo:{}
        }
    },
    methods: {
        //获取管家详细信息
        housekeeper(){
            this.$_sendQuery_$({
                method:"POST",
                url:`${this.$_global_$.serverPath}/steward/steward/queryStewardDetails`,
                data: {
                    refEmployee:this.userInfo.id
                },
                headers:{"Content-type":"application/json"}
            }).then((rsp)=>{
                if(rsp.status === 200){
                    if(rsp.data.code === 0){
                        this.$_housekeeper_$=rsp.data.data;
                        this.$_housekeeper_$.star = Math.floor(this.$_housekeeper_$.star/20*10)/10;
                        this.$_housekeeper_$.synthesize = Math.floor(this.$_housekeeper_$.synthesize/20*10)/10;
                        //请求列表数据
                        this.$_list_$()
                    }
                }
            })
        },
        //订单搜索
        $_search_$(){
             if (this.$_order_$) {
                this.$_querycfg_$.params.recordTitle = this.$_order_$;
            }else{
                 delete this.$_querycfg_$.params.recordTitle;
             }
            if (this.$_classification_$ != "全部") {
                this.$_querycfg_$.params.recordTypeCode = this.$_classification_$;
            }else{
                delete this.$_querycfg_$.params.recordTypeCode;
            }
            if (this.beginTime){
                var d = new Date(this.beginTime);
                var a=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                this.$_querycfg_$.params.beginTime = a
            }else{
                delete this.$_querycfg_$.params.beginTime;
            }
            if (this.endTime){
                var b = new Date(this.endTime);
                var c=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate()
                this.$_querycfg_$.params.endTime = c
            }else{
                delete this.$_querycfg_$.params.endTime;
            }
            this.$_list_$();
        },
        //受理
        $_show_$(row) {
            this.$_row_$=row;
            this.$_id_$ = row.id;
            this.$_title_$ = row.recordTitle;
            this.$_acceptance_$=true;

        },
        //处理
        $_remove_$(row) {
            this.$root.$_Route_$('employer','jump','fwcl',{row:row,hfaceurl:this.$_housekeeper_$.image})
        },
        //受理确定
        $_ok_$() {
            this.$_querycfg_$.mod = 'steward/steward/acceptServiceRecord';
            this.$_querycfg_$.params = {};
            this.$_querycfg_$.params.serviceRecordId = this.$_id_$
            this.$_querycfg_$.params.recordTitle = this.$_title_$
            this.$_fquery_$((rsp)=>{
                if(rsp.status === 200){
                    if (rsp.data.code === 0) {
                        this.$_text_$ = rsp.data.data;
                        this.$Message.success(this.$_text_$);
                        this.$_row_$.recordStatus=1;
                        // this.autorecovery();
                    }
                    
                    else{
                        this.$Message.error('服务受理失败');
                    }
                    
                }
            })
            
        },
        //系统自动回复
        autorecovery(){
            this.$_sendQuery_$({
                method:"POST",
                url:`${this.$_global_$.serverPath}/steward/steward/createServiceItem`,
                data:{
                    recordId: this.$_row_$.id,
                    itemRoler: "h",
                    name: this.$_row_$.stewardName,
                    phoneNumber: this.$_row_$.stewardPhoneNumber,
                    itemTitle: "",
                    itemInfo: "您的问题已经开始处理",
                    image: ""
                },
                headers:{"Content-type":"application/json"}
            }).then((rsp)=>{

                if(rsp.status === 200){
                    if(rsp.data.code === 0){

                    }
                }
            })
        },
        // 请求列表数据
        $_list_$() {
            this.$_querycfg_$.mod = 'steward/steward/queryRecordPageList';
            this.$_querycfg_$.params.zoneId = this.userInfo.zoneId;
            // this.$_querycfg_$.params.stewardId = this.userInfo.id;
            this.$_querycfg_$.params.stewardId = this.$_housekeeper_$.id;
            this.$_fquery_$((rsp)=>{
                if (rsp.status === 200) {
                    // 表格数据
                    if (rsp.data.code === 0) {
                        this.$_data_$ = rsp.data.data.records
                        this.$_total_$ = Number(rsp.data.data.total);
                    }
                    
                }
            })
            
        },
        //取消
        $_cancel_$() {
            
        },  
         //数据下一页
            $_changePage_$(e) {
                if (this.$_order_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_order_$;
                }
                if (this.$_classification_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_classification_$;
                }
                if (this.beginTime){
                    var d = new Date(this.beginTime);
                    var a=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                    this.$_querycfg_$.params.beginTime = a
                }
                if (this.endTime){
                    var b = new Date(this.endTime);
                    var c=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate()
                    this.$_querycfg_$.params.endTime = c
                }
                this.$_querycfg_$.params.current =  e
                 this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                 this.$_list_$();
            },   
    },
    created(){
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        this.$_querycfg_$.params.size = 10
        //获取管家详细信息
        this.housekeeper();
    }
}
</script>