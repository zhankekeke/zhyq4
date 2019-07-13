<style scoped>
.lm {
  color: red;
  font-size: 30px;
}

.bg {
  /*background: #efefef;*/
  padding: 10px;
}
.ivu-modal-body{
  padding:0;
}
.ivu-form-item {
  margin-bottom: 0px;
}

.hysbox li {
  line-height: 24px;

  height: 24px;
}
.dialog-footer{
  padding-top:10px;
  text-align:right;
}
</style>
<template>
  <div>
    <div class="bg">
      <Row type="flex" align="middle">
        <Col align="middle">
        <span>访客姓名：</span>
        <Input v-model="$_fangkeName_$" placeholder="请输入访客姓名" style="width:160px"></Input>
        </Col>
        <Col align="left">
        &nbsp;&nbsp;拜访日期:&nbsp;&nbsp;
            <DatePicker placeholder="请选择日期范围" v-model="$_rq_$" type="daterange" format="yyyy-MM-dd" placement="bottom-end" style="width: 290px"></DatePicker>
        </Col>
        <Col align="middle">
        <span>　来访类型：</span>
        <Select v-model="$_selected_$" style="width:150px">
          <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="2" align="middle">
        <Button type="primary" @click="$_search_$()">搜索</Button>
        </Col>
      </Row>
    </div>
    <br>
    <Row>
      <Col align="right">
      <Button type="primary" @click="$_newInvite_$()">+ 新建邀请</Button>
      </Col>
    </Row>
    <Row>
      <el-table
    :data="$_data6_$"
    :border="false"
    style="width: 100%">
     <el-table-column
            align="center"
            label="序号"
            width="50">
             <template scope="scope"><span>{{scope.$index+(pageNo - 1) * $_pageSize_$ + 1}} </span></template>
    </el-table-column>
    <el-table-column 
    prop="visitorType" 
    label="来访类型"
    align="center">
          <template slot-scope="scope">
            <span>{{scope.row.visitorType | visitorType}}</span>
          </template>
    </el-table-column>
    <el-table-column prop="visitorName" label="来访名称" align="center">
        </el-table-column>
        <el-table-column prop="employeeMobile" label="联系方式" align="center">
        </el-table-column>
        <el-table-column prop="visitorOrg" label="单位名称" align="center">
        </el-table-column>
        <el-table-column prop="visitReason" label="来访事由" align="center">
        </el-table-column>
        <el-table-column prop="visitDate" label="拜访时间" align="center">
        </el-table-column>
        <el-table-column prop="meetingRoomName" label="会议室" align="center">
        </el-table-column>
         <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.auditStatus | formatStatus}}</span>
          </template>
        </el-table-column>
     <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button v-show ="!scope.row.visitorType == 1" @click="$_agree_$(scope.row.id)" type="text" size="small">同意</el-button>
                        <el-button v-show ="!scope.row.visitorType == 1" @click="$_disagree_$(scope.row.id)" type="text" size="small">不同意</el-button>
                        <el-button  @click="$_show_$(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
  </el-table>
    </Row>
    <br>
    <br>
    <Row>
        <span>共有{{$_totalSize_$}}条数据</span>
      <Page align="right" 
      :total="$_totalSize_$" 
      :page-size="$_pageSize_$" 
      show-elevator show-sizer 
      @on-page-size-change="$_pageNum_$" 
      @on-change="$_changePage_$" />
    </Row>
    <!-- 详情 -->
   
    <!--不同意原因-->
    <Modal v-model="$_modalDisagree_$" title="不同意原因">
      <div slot="footer" align="center">
        <Form ref="editform" :rules="editFormValidate" :model="$_editform_$" :label-width="80">
          <FormItem label="管家详情">
            <Input type="textarea" v-model="$_editform_$.textarea"></Input>
          </FormItem>
        </Form>
        <div slot="footer" class="dialog-footer">
        <Button type="primary" @click="$_handleReason_$()">确定</Button>
          <Button type="primary" @click="$_handleCancel_$()">取消</Button>
          </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import controler from "./controler.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select, Option, Table, TableColumn } from 'element-ui';
export default {
  mixins: [controler],
  components: {
    [Select.name]: Select,
    [Button.name]: Button,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  filters: {
    formatStatus(val) {
      if (val === 0) {
        return '待审核'
      }
      if (val === 1) {
        return '审核通过'
      }
      if (val === 2) {
        return '审核不通过'
      }
    },

    visitorType(val) {
      if (val === 0) {
        return '拜访'
      }
      if (val === 1) {
        return '邀请'
      }
    }
  },
  data() {
    return {
       scope: {
             $index: 1,
          },
     pageNo: 1,
      myobj: {},
      id: 0,
      status: '',
      $_totalSize_$: 0,
      $_modalxq_$: false,
      $_modalDisagree_$: false,
      $_fangkeName_$: "",
      $_myRecord_$: "",
      $_selected_$: "全部",
      $_rq_$:[],
      $_pageSize_$: 5,//默认
      $_ruleValidate_$: {},
       $_editform_$: {
        textarea: ''
      },
      editFormValidate: {
        textarea: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      $_statusList_$: [
        // 状态值
        {
          value: "全部",
          label: "全部"
        },
        {
          value: 0,
          label: "拜访"
        },
        {
          value: 1,
          label: "邀请"
        }
      ],
      $_data6_$: [],
      $_querycfg_$: {
        mod: "",
        params: {
        }
      },
    };
  },

  created() {
    this.$_list_$();
    this.$_global_$.serverPath
    this.$_querycfg_$.params.pageNum = 1;
    this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
  },
  methods: {
   
    //封装
    $_list_$() {
      //debugger
      this.$_querycfg_$.mod = 'company/visitor/employee/records';
    //   this.$_querycfg_$.params.pageNum = 1;
    // this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
      var _this = this;
      this.$_fquery_$((rsp) => {
        if (rsp.status === 200) {
        delete this.$_querycfg_$.params.visitorName;
        delete this.$_querycfg_$.params.startVisitDate;
        delete this.$_querycfg_$.params.endVisitDate;
        delete this.$_querycfg_$.params.visitorType;
          if (rsp.data.code === 0) {
            this.pageNo = rsp.data.data.current;
            this.$_data6_$ = rsp.data.data.records;
            this.$_totalSize_$ = rsp.data.data.total*1;
          }
        }
      })
    },
    //搜索
    $_search_$() {
      if (this.$_fangkeName_$) {
        this.$_querycfg_$.params.visitorName = this.$_fangkeName_$;
      }
      if(this.$_rq_$){
            this.$_querycfg_$.params.startVisitDate = this.$_rq_$[0]
            this.$_querycfg_$.params.endVisitDate = this.$_rq_$[1]
       }
      if (this.$_selected_$ != "全部") {
        this.$_querycfg_$.params.visitorType = this.$_selected_$;
      }
      this.$_list_$()
    },
    $_newInvite_$() {
      this.$root.$_Route_$("employer", "jump", "xjyq", {});
    },
    //同意修改
    $_agree_$(id) {
      this.$_querycfg_$.mod = `company/visitor/audit/pass/${id}`;
      this.$_querycfg_$.params = {};
      //var _this = this;
      this.$_fquery_$((rsp) => {
        if (rsp.status === 200) {
          if (rsp.data.code === 0) {
            this.$Message.success("修改成功");
            // // 刷新列表
            this.$_list_$()

          }
          else {
            this.$Message.error(rsp.data.message);
          }
        }
      })
    },
    //不同意
     $_disagree_$(id) {
       this.id = id;
       this.$refs.editform.resetFields();
        this.$_modalDisagree_$=true
     
    },
    $_handleReason_$(){
      this.$_sendQuery_$({
         method: 'POST',
                url: `${this.$_global_$.serverPath}/company/visitor/audit/nopass/${this.id}`,
                data: {
                     "auditDesc": this.$_editform_$.textarea
                }, 
              headers:{
              "Content-type":"application/json"
            }
      }).then((res)=>{
         if(res.data.code === 0){
           this.$Message.success("修改成功");
           this.$_modalDisagree_$=false
         }else{
           this.$Message.error(res.data.message);
           this.$_modalDisagree_$=false
         }
         for (let key in this.$_editform_$) {
             this.$_editform_$[key] = ''
           }
      });
     
      this.$_list_$()
    },
    //取消
   $_handleCancel_$(){
     this.$_modalDisagree_$ = false;
   },
    $_show_$(row) {
     //  this.id =id
     // this.$root.$_Route_$('employer', 'jump', 'scyqxq', {id:this.id})
        this.$root.$_Route_$('employer', 'jump', 'scyq', { row: row})

    },
    //分页
    $_changePage_$(e) {
      this.$_querycfg_$.params.pageNum = e;
      this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
      this.$_list_$()
    },
    //页面显示的数据条数
    $_pageNum_$(e) {
      this.$_pageSize_$ = e;
      this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
      this.$_list_$()
    },
  }
};
</script>