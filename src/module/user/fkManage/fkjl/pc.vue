<style scoped>
.interview {
    font-size: 14px;
}

.manage {
    padding-bottom: 45px;
    font-size: 12px;
    color: #000;
}
.export{
margin-bottom:10px;

}
.export button:first-child {
    float: left;
}

.export button:nth-child(2) {
    float: right;
}
.mt9{
   margin-top:4px; 
   margin-bottom:10px;
}
.mt10 {
    margin-top: 10px!important;
    margin-bottom:10px!important;
}
</style>
<template>
    <div class="interview">
        <div class="manage">
            &nbsp;&nbsp;访客姓名：&nbsp;&nbsp;
            <Input v-model.trim="$_searchText_$" placeholder="请输入访客姓名" style="width: 210px" /> &nbsp;&nbsp; 来访类型：&nbsp;&nbsp;
            <Select v-model="$_type_$" style="width:210px;margin-right: 2%">
                <Option v-for="item in $_Select_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             &nbsp;&nbsp;拜访时间：&nbsp;&nbsp;
            <DatePicker type="daterange" v-model="$_rq_$" ormat="yyyy-MM-dd"  placeholder="请选择拜访时间" style="width: 210px;margin-right: 2%"></DatePicker>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_searchType_$">搜索</Button>
        </div>
         <Row>
            <!-- 表格 -->
            <el-table
                    :header-cell-style="getRowClass"
                :data="$_fkInfo_$"
                style="width: 100%">
                <el-table-column
                align="center"
                prop="id"
                label="订单编号">
                </el-table-column>
                <el-table-column
                align="center"
                prop="visitorCompany"
                label="公司名称">
                </el-table-column>
                <el-table-column
                align="center"
                label="来访类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.visitorType | formatType}}</span>
                    </template>
                </el-table-column>      
                <el-table-column
                align="center"
                prop="employeeName"
                label="被访人">
                </el-table-column>
                <el-table-column
                align="center"
                prop="visitorName"
                label="访客姓名">
                </el-table-column>
                <el-table-column
                align="center"
                prop="visitorMobile"
                label="联系方式">
                </el-table-column>
                <el-table-column
                align="center"
                prop="visitReason"
                label="来访事由">
                </el-table-column>
                <el-table-column
                align="center"
                prop="visitDate"
                label="拜访时间">
                </el-table-column>
                <el-table-column
                align="center"
                label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus | formatStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                align="center"
                prop="createTime"
                label="创建时间">
                </el-table-column>
            </el-table>
        </Row>
        <br>
        <br>
        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalData_$}}条数据</span>
        <Page align="right" :total="$_totalData_$"
              style="float: right"
             show-elevator show-sizer
			 :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
    </div>
</template>
<script>
import { Table,Button,TableColumn } from 'element-ui';
import controler from './controler.js';
import 'element-ui/lib/theme-chalk/index.css';
//import axios from 'axios'
export default {
    mixins: [controler],
    components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn
    },
    filters: {
        formatStatus (val) {
            if(val === 0){
                return '待审核'
            }
            if(val === 1){
                return '审核通过'
            }
            if(val === 2){
                return '审核不通过'
            }
        },
        formatType (val) {
            if(val === 0){
                return '拜访'
            }
            if(val === 1){
                return '邀请'
            }
        }
    },
    data() {
        return {
            $_rq_$:[],
            $_totalData_$: 0, // 数据总数
            $_num_$: '10',
            $_searchText_$: '',
           
            $_type_$: '',
            $_Select_$: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 1,
                    label: '邀请'
                },
                {
                    value: 0,
                    label: '拜访'
                }
            ],
            $_fkInfo_$:[],  //列表数据
            $_pageSize_$: 10,
            $_userInfo_$:[],
            $_querycfg_$: {
                mod: '',
                params: {
                }
            }
        }
    },
    created() {
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
        this.$_list_$();
        this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#f8f8f9'
            } else {
                return ''
            }
        },
        $_list_$(){
             this.$_querycfg_$.mod = 'company/visitor/zone/'+this.$_userInfo_$.zoneId+'/records';
            this.$_fquery_$((rsp)=>{
                if (rsp.status === 200) {
                     delete this.$_querycfg_$.params.startVisitDate
                     delete this.$_querycfg_$.params.endVisitDate
                     delete this.$_querycfg_$.params.visitorType
                      delete this.$_querycfg_$.params.visitorName
                    if(rsp.data.code === 0){
                        this.$_fkInfo_$ = rsp.data.data.records;
                        this.$_totalData_$ = rsp.data.data.total
                    }else{
                        this.$Message.error('数据更新失败!');
                    }
                }
            })
        },
//数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                 this.$_list_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_list_$();
            },
        $_searchType_$() {
                if(this.$_rq_$[0] !== ''){
                    var beginDate = this.FormatAllDate(this.$_rq_$[0])
                    var endDate = this.FormatAllDate(this.$_rq_$[1])
                    this.$_querycfg_$.params.startVisitDate = beginDate;
                    this.$_querycfg_$.params.endVisitDate = endDate;
                }else{
                    this.$_querycfg_$.params.startVisitDate = '';
                    this.$_querycfg_$.params.endVisitDate = '';
                }
                this.$_querycfg_$.params.visitorName = this.$_searchText_$;
                this.$_querycfg_$.params.visitorType = this.$_type_$;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_querycfg_$.params.pageNum = 1;
                this.$_list_$();
        
    },
    // 格式化时间
        FormatAllDate(sDate) {
            var date = new Date(sDate);
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            //月
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            //日
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            //格式化后日期为：yyyy-MM-dd HH:mm:ss
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            return currentdate;
        },
    
}
}
</script>