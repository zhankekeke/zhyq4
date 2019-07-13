<style scoped>
 .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    }
    .bg {
        padding: 10px;
    }
    .mt10 {
        margin-top: 10px;
    }
    .mr5 {
        margin-right: 5px;
    }
    .mt300 {
        margin-top: 300px;
    }
    .btclass {
        background: #3399ff;
    }
    /*上传图片样式*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }

</style>
<template>
    <div class="zdtb">
        <div class="company-manabge bg">
            <span style=" color: black">企业名称：</span>
            <Input v-model.trim="$_companyName_$" placeholder="请输入企业名称" style="width:210px;margin-right: 20px;"></Input>
            <Button type="primary" @click="$_cNameSearch_$">搜索</Button>
        </div>
        <Row type="flex" align="middle">
            <Col span="16" offset="8" align="right" pull="1">
                <Button type="primary" @click="$_addCompany_$" class="mt10">+ 新增企业</Button>
                <!-- <Button type="primary" @click="$_companyExport_$" class="mt10">导出</Button> -->
            </Col>
        </Row>
        <!-- 首行框 -->

        <Row class="mt10">
            <Table  :columns="$_columns7_$" :data="$_data6_$"></Table>
            <br>
            <br>
            <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
            <Page align="right" :total="total"
                  style="float: right"
             show-elevator show-sizer
			 :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>

            <!-- 管理员分配 -->
            <Modal v-model="$_modal2_$" title="管理员分配" :mask-closable="false">
                <el-transfer
                        class="mt10"
                        v-model="rightData"
                        :props="{key:'id',label:'name'}"
                        :titles="['列表1','列表2']"
                        :data="leftData"
                        @change="handleChange"
                        >
                </el-transfer>
                 <div slot="footer" align="center">
                    <Button type="ghost" @click="$_modal2_$ = false">取消</Button>
                    <Button type="primary" @click="$_handleManager_$()">确定</Button>
                </div>
            </Modal>
            <!-- 管家分配 -->
            <Modal v-model="$_modal3_$"
                   title="管家分配" :mask-closable="false">
                <Transfer
                        class="mt10"
                        :data="$_data1_$"
                        :target-keys="$_targetKeys1_$"
                        :render-format="$_render1_$"
                        :operations="['解除','分配']"
                        :titles="['管家列表','已分配的管家']"
                        @on-change="$_handleChange1_$">
                </Transfer>
                <div slot="footer" align="center">
                    <Button type="ghost" @click="$_modal3_$ = false">取消</Button>
                    <Button type="primary" @click="$_handleGj_$()">确定</Button>
                </div>
            </Modal>
            <!-- 编辑模态框 -->
            <Modal v-model="$_modalEdit_$" title="企业基本信息" :mask-closable="false">
                <Form ref="$_formValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                    <FormItem label="所属园区：">
                         <Input v-model="$_thisZoneInfo_$.name" disabled></Input>
                    </FormItem>
                    <FormItem label="企业名称：" prop="name">
                        <Input v-model="$_formValidate_$.name" placeholder="请输入企业名称"></Input>
                    </FormItem>
                    <FormItem label="注册地址：" prop="registerAddress">
                        <Input v-model.trim="$_formValidate_$.registerAddress" placeholder="请输入企业地址"></Input>
                    </FormItem>
                    <FormItem label="注册资金：" prop="registeredCapital">
                        <Input v-model="$_formValidate_$.registeredCapital" placeholder="请输入注册资金"></Input>
                    </FormItem>
                    <FormItem label="法人名称：" prop="legalPerson">
                        <Input v-model="$_formValidate_$.legalPerson" placeholder="请输入法人名称"></Input>
                    </FormItem>
                    <FormItem label="经营范围：" prop="businessScope">
                        <Input v-model="$_formValidate_$.businessScope" type="textarea" :rows="4" placeholder="请输入经营范围"></Input>
                    </FormItem>
                    <FormItem label="行业类别：" prop="sectors">
                        <Select v-model.trim="$_formValidate_$.sectors" placeholder="请选择">
                            <Option v-for="(item,index) in industry" :label="item.label" :value="item.value" :key="index">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="营业执照：" prop="file">
                        <el-upload
                            class="avatar-uploader"
                            :action="this.$_global_$.imgUploadPath"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="false"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                        <img v-if="$_file_$" :src="$_file_$" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

         
                    </FormItem>
                    <FormItem label="企业地址：" prop="addressType">
                        <Select v-model="$_formValidate_$.addressType" placeholder="地址类型" class="input" style="width:100px;">
                            <Option v-for="item in addressList" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem v-if="$_formValidate_$.addressType  == 0" label="注册地址：">
                        <Input v-model="$_formValidate_$.address" placeholder="请输入园区名称"></Input>
                    </FormItem>
                    <FormItem v-if="$_formValidate_$.addressType  == 1" label="企业地址关联">
                        <Select :label-in-value="true" v-model="$_formValidate_$.building" @on-change="building" placeholder="建筑" class="input" style="width:100px;">
                        <Option v-for="(item,index) in buildings" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true" v-model="$_formValidate_$.floorId" @on-change="chosefloor" placeholder="楼层" class="input" style="width:140px">
                        <Option v-for="(item,index) in floors" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true" @on-change="choseroom" v-model="$_formValidate_$.roomIds" placeholder="房间" class="input" style="width:120px;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                   
                    <Button type="primary" style="height:39px;" @click="addRoom">添加</Button>
                    <ul class="list">
                            <li style="height:39px;line-height:39px; margin-bottom:5px;"  v-for="(item,index) in $_formValidate_$.positions" :key="index">
                            楼：{{item.build}}
                            <span v-if="!item.floorId == ''">层：{{item.floor}}</span>
                            <span  v-if="!item.roomIds == ''">房间：{{item.room}}</span>
                            <Button  type="primary" style="height:39px; float:right" @click="delRoom(index)">删除</Button>
                        </li>
                    </ul>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="ghost" @click="$_modalEdit_$ = false">取消</Button>
                    <Button type="primary" @click="editOk()" style="margin-left: 8px">确定</Button>
                </div>
            </Modal>
        </Row>
        <br>
      

    </div>
</template>

<script>
    import controler from './controler.js';
import { Button, Select, Option, Table, TableColumn,Upload,Transfer} from 'element-ui';
    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
            [Transfer.name]: Transfer
        },
        data() {
            const $_validatenum_$ = (rule,value,callback) =>{
                var reg = /^([1-9]\d*)|0$/
                var reg1 = /[\u4e00-\u9fa5]/
                if(!reg.test(value)){
                    callback("请输入正整数!")
                }else if(reg1.test(value)){
                    callback("不能包含汉字!")
                }else{
                    callback()
                }
            };
            return {
                $_modalEdit_$: false,
                $_modal2_$: false,
                $_modal3_$: false,
                //穿梭框id和name
                $_stewardId_$: '',
                $_stewardName_$: '',
                //
                $_relationModel2_$: "",
                $_relationModel3_$: "",
                $_relationModel4_$: "",
                $_companyName_$: "",

                $_thisUserInfo_$: '', //当前账号信息
                $_thisZoneInfo_$: {}, //当前园区信息
                $_allGjInfo_$: {},  //所有管家的信息
                $_EnterpriseGj_$: [], //当前公司管家id
                //
                $_data1_$: [],
                $_targetKeys1_$: [],
                rightData:[],
                leftData:[],
                rightRole:[],

                $_targetKeys2_$:[],
                select:[],
                baseUrl: 'http://img.yhcode.com:88/',
                originManagerList:[], // 源列表
                targetList:[], // 目的列表
                yfpList:[], // 已经拥有的管理员
                // 表单数据绑定
                $_formValidate_$: {},
                // 表单验证
                $_ruleValidate_$: {
                    name: [
                        {required: true, message: '请填写企业名称', trigger: 'blur'},
                        {type: 'string', max:50, message:'企业名称不能超过50个字', trigger:'change'},
                        {validator: this.$_validatestr_$, trigger:'change'}
                    ],
                    registerAddress: [
                        { required: true, type: 'string', message: '请输入注册地址', trigger: 'change' },
                        {type: 'string', max:100, message:'注册地址不能超过100个字', trigger:'change'}
                    ],
                    registeredCapital: [
                        {required: true, message: '请填写注册资金', trigger: 'change'},
                        {validator: $_validatenum_$, trigger:'change'},
                        {max:9, message:'注册资金不能超过9位数',trigger:'change'},
                    ],
                    legalPerson: [
                        {required: true, message: '请填写法人姓名', trigger: 'blur'},
                        {type: 'string', max:20, message:'法人姓名不能超过20个字', trigger:'change'},
                        {validator: this.$_validatestr_$, trigger:'change'}
                    ],
                    businessScope: [
                        {required: true, message: '请填写经营范围', trigger: 'blur'},
                        {type: 'string', max:200, message:'经营范围不能超过200个字', trigger:'change'},
                    ],
                    sectors: [
                        {required: true, message: '请选择行业类别', trigger: 'blur'}
                    ],
                   
                },
                // 表格数据
                $_columns7_$: [
                    {
                        title: '序号',
                        width: 100,
                        align: 'center',
                         render:(h,params) =>{
                            return h('span',params.index + (this.pageNum- 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: '企业名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '所在地址',
                        key: 'address',
                        align: 'center',
                        render: (h, params) => {
                            var g;
                            if (params.row.addressType == 0) {
                            g = params.row.address;
                            }
                            if (params.row.addressType == 1) {
                            g = params.row.registerAddress;
                            }
                            return h("span", {}, g);
                        }
                    },
                      {
                        title: '地址类型',
                        key: 'addressType',
                        align: 'center',
                        render: (h, params) => {
                            var g;
                            if (params.row.addressType == 0) {
                            g = "手动输入";
                            }
                            if (params.row.addressType == 1) {
                            g = "地址关联";
                            }
                            return h("span", {}, g);
                        }
                    },
                    {
                        title: '注册资金',
                        key: 'registeredCapital',
                        align: 'center',
                    },
                    {
                        title: '法人名称',
                        key: 'legalPerson',
                        align: 'center',
                    },{
                        title: '行业类别',
                        key: 'sectors',
                        align: 'center',
                        render: (h, params) => {
                            let a;
                            switch (params.row.sectors) {
                                case "1":
                                    a = '农、林、牧、渔业';
                                    break;
                                case "2":
                                    a = '采矿业';
                                    break;
                                case "3":
                                    a = '制造业';
                                    break;
                                case "4":
                                    a = '电力、热力、燃气及水生产和供应业';
                                    break;
                                    case "5":
                                    a = '建筑业';
                                    break;    
                                    case "6":
                                    a = '批发和零售业';
                                    break;
                                    case "7":
                                    a = '交通运输、仓储和邮政业';
                                    break;
                                    case "8":
                                    a = '住宿和餐饮业';
                                    break;
                                    case "9":
                                    a = '信息传输、软件和信息技术服务业';
                                    break;
                                    case "10":
                                    a = '金融业';
                                    break;
                                    case "11":
                                    a = '房地产业';
                                    break;
                                    case "12":
                                    a = '租赁和商务服务业';
                                    break;
                                    case "13":
                                    a = '科学研究和技术服务业';
                                    break;
                                    case "14":
                                    a = '水利、环境和公共设施管理业';
                                    break;
                                    case "15":
                                    a = '居民服务、修理和其他服务业';
                                    break;
                                    case "16":
                                    a = '教育';
                                    break;
                                    case "17":
                                    a = '卫生和社会工作';
                                    break;
                                    case "18":
                                    a = '文化、体育和娱乐业';
                                    break;
                                    case "19":
                                    a = '公共管理、社会保障和社会组织';
                                    break;
                                    case "20":
                                    a = '国际组织';
                                    break;
                                default:
                                    a = params.row.sectors;
                            }
                            return h("span", {}, a);
                        }
                    },
                    // {
                    //     title: '企业人数',
                    //     key: 'scale',
                    //     align: 'center',
                    // },
                    {
                        title: '经营范围',
                        key: 'businessScope',
                        align: 'center',
                    },
                    {
                        title: '入驻时间',
                        key: 'createDate',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            let a = JSON.parse( JSON.stringify(params.row) );
                                            this.$_bianji_$(a)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#f56c6c"

                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row)

                                        },
                                    }
                                }, '删除'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row)
                                        }
                                    }
                                }, '管理员分配'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_mangerAllot_$(params.row)
                                        }
                                    }
                                }, '管家分配')
                            ]);
                        }
                    }
                ],
                $_data6_$: [],  // 表格数据
                total:0, // 数据条数
                $_pageSize_$: 12,
                industry:[  // 行业类别
                    {label: '农、林、牧、渔业', value: '1'},
                    {label: '采矿业', value: '2'},
                    {label: '制造业', value: '3'},
                    {label: '电力、热力、燃气及水生产和供应业', value: '4'},
                    {label: '建筑业', value: '5'},
                    {label: '批发和零售业', value: '6'},
                    {label: '交通运输、仓储和邮政业', value: '7'},
                    {label: '住宿和餐饮业', value: '8'},
                    {label: '信息传输、软件和信息技术服务业', value: '9'},
                    {label: '金融业', value: '10'},
                    {label: '房地产业', value: '11'},
                    {label: '租赁和商务服务业', value: '12'},
                    {label: '科学研究和技术服务业', value: '13'},
                    {label: '水利、环境和公共设施管理业', value: '14'},
                    {label: '居民服务、修理和其他服务业', value: '15'},
                    {label: '教育', value: '16'},{label: '卫生和社会工作', value: '17'},{label: '文化、体育和娱乐业', value: '18'},{label: '公共管理、社会保障和社会组织', value: '19'},{label: '国际组织', value: '20'}
                ],
                addressList:[  // 地址类型
                {value: 0, label: "手动输入"},
                    {value: 1, label: "地址关联"}
                ],
                $_file_$:[],
                imageList:[],
                zones:[],
                 buildings:[],
                floors:[],
                rooms:[],
                zoneId:0,
                buildId:0,
                floorId:0,
                positions:[],
                showList:{
                    build:'',
                    floor:'',
                    room:''
                },
                submitList:{
                    floorId:null,
                    roomIds: null,
                    buildingId: null
                },
                positionsubmit:[],
                $_list_$: '',
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                originList:[],
                enterpriseInfo:0,  //当前企业信息
                obj:{},
                originManagerList:[],
                companyId:'',
                zoneId:'',
                del:[],
                pageNum:1,
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);
            this.getZoneInfo(); //获取当前园区的基本信息

            this.$_global_$.serverPath;
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        mounted() {

        },
        watch: {
            model() {
            },
            
        },
        methods: {
            // 表格数据
            $_List_$(){
                this.$_querycfg_$.mod = `zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/search`;
                this.$_fquery_$((rsp)=>{
                    if(rsp.status === 200){
                         delete this.$_querycfg_$.params.name;
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total
                            this.pageNum = rsp.data.data.current
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                 this.$_List_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                 this.$_List_$();
            },
            $_addCompany_$() {
                this.$root.$_Route_$('user', 'jump', 'xzqy', {})

            },
            // 导出
            $_companyExport_$() {

            },
            // 搜索
            $_cNameSearch_$() {
                if(this.$_companyName_$){
                    this.$_querycfg_$.params.name = this.$_companyName_$;
                }
                this.$_List_$()
            },
            //穿梭框,获取管家列表数据
            $_getStewardData_$() {

                //获取当前园区所有管家列表
                let $_mockData_$ = []; //要返回的管家列表
                let arr = []; //所有管家的列表
                let now = []; //当前公司的管家

                this.$_sendQuery_$({
                    method:"POST",
                    url:`${this.$_global_$.serverPath}/steward/steward/queryStewardByCondition`,
                    data:{"zone_id":this.$_thisUserInfo_$.zoneId}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            arr = rsp.data.data;
                            this.$_allGjInfo_$ = arr;
                            //获取当前公司的管家
                            this.$_targetKeys1_$ = this.$_getStewardKeys_$();

                            for(let i =0; i<arr.length;i++){
                                let temp = {};
                                temp = {
                                    key: arr[i].id,
                                    label: arr[i].name,
                                    phone: arr[i].phoneNumber,
                                    sex:arr[i].sex

                                };
                                $_mockData_$.push(temp)
                            } 
                            this.originList = $_mockData_$
                        }
                    }
                });

                return $_mockData_$;
            },
            //当前公司的管家数据
            $_getStewardKeys_$() {
                let target =[];

                this.$_sendQuery_$({
                    method:"POST",
                    url:`${this.$_global_$.serverPath}/steward/enterprise/queryAssignedEnterpriseByCondition`,
                    data:{"zone_id":this.$_thisUserInfo_$.zoneId,"enterprise_id":this.enterpriseInfo.id}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            let arr = rsp.data.data;
                            for(let i = 0; i<arr.length; i++){
                                let temp = '';
                                temp = arr[i].stewardId;
                                target.push(temp)
                            }
                        }
                    }
                });
                this.$_EnterpriseGj_$ = target;
                return target
            },
            // 管家
            $_render1_$(item) {
                return item.label;
            },
            // 管家
            $_handleChange1_$(newTargetKeys, direction, moveKeys) {
                if(newTargetKeys.length>1){
                    this.$Message.error("只允许选择一个管家!")
                }else{
                    this.$_targetKeys1_$ = newTargetKeys;
                }
                
            },
            //穿梭框实现,管理员源列表数据
            $_getManagerData_$() {
               this.leftData = []
               this.$_sendQuery_$({
                  method:"POST",
                  url:`${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/search`,
                  data:{},
                  headers:{"Content-type":"application/json"}
               }).then(rsp=>{
                  // console.log(rsp)
                   if(rsp.status === 200){
                       if(rsp.data.code === 0){
                           //console.log(rsp)
                           var leftRole = rsp.data.data.records
                           for(var i=0;i<leftRole.length;i++){
                               var temp = {}
                               temp={
                                   id:leftRole[i].id,
                                   name:leftRole[i].name
                               }
                               this.leftData.push(temp)
                               //console.log(this.rightData)
                           }
                       }

                   }
               })


            },
            //管理员目的列表数据
            $_getManagerKeys_$() {
                this.rightData = []
                this.$_sendQuery_$({
                    method:"GET",
                    url:`${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/admin`,
                    data:{},
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            var arr = rsp.data.data
                            if(arr){
                                for(var i = 0; i<arr.length;i++){
                                    this.rightData.push(arr[i].id)
                                }
                            }else{

                            }
                            //this.rightRole = this.rightData
                            //this.$_targetKeys2_$ = this.yfpList
                        }
                    }
                })
            },
            // 管理员
            $_render2_$(item) {
                return item.label;
            },
            handleChange(value,direction,moveKey){
                console.log(value)//当前右边‘列表数据
                console.log(direction)//移动得方向
                console.log(moveKey)//移动得数据
                if(direction= 'right'){
                    //在原有的基础上新的数据
                     this.rightRole = value
                    // console.log(this.rightRole)

                     var left = []
                     if(this.rightRole.length != 0 && moveKey.length !=0){
                         for(var i = 0;i<moveKey.length;i++){
                             let flag = true
                             for(var j=0;j<this.rightRole.length;j++){
                                   if(moveKey[i] == this.rightRole[i]){
                                       flag = false
                                   }
                             }
                             //左边添加两个，右边删除两个
                             left.push(moveKey[i])
                             //console.log(left)
                             this.del= left
                         }
                     }
 
                }
                if(direction = 'left'){
               // console.log(this.leftData)
                    //this.leftData = value
                    //左边新的数据与移动得做对比
                    var right = []
                    //两个数组中一样得部分
                   if(this.leftData.length !=0 && moveKey.length !=0){
                       for(var i=0;i<moveKey.length;i++){
                           let flag = true
                           for(var j=0;j<this.leftData.length;j++){
                               if(moveKey[i] == this.leftData[j]){
                                   flag = false
                               }
                           }
                           right.push(moveKey[i])
                           //console.log(right)
                           this.del = right
                       }
                       
                       
                   }
                }
             
            },
            // 管理员
            // 管理员分配确认
            $_handleManager_$(){
               this.select = []
               if(this.rightRole.length !=0){
                 for(var i=0;i<this.rightData.length;i++){
                     let flag=true
                     for(var j=0;j<this.rightRole.length;j++){
                         if(this.rightData[i] == this.rightRole[j]){
                             flag = false
                         }

                     }
                     //rightData  每次请求获取的数据
                     this.select.push(this.rightData[i])
                    // console.log(this.select)
                 }
               }else{
                   for(var i=0;i<this.rightData.length;i++){
                       this.select.push(this.rightData[i])
                   }
               }
             // 管理员设置接口
                this.$_sendQuery_$({
                    method:"POST",
                    url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/${this.companyId}/admin`,
                    data:{
                        add:this.select,
                        del:this.del
                    },
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.$_modal2_$ = false
                            this.$Message.success("分配成功!")
                        }
                    }
                })
              

            },
            // 编辑企业信息
            $_bianji_$(row) {
                this.$_modalEdit_$ = true;
                this.$_formValidate_$ = row;
                var posiarr=this.$_formValidate_$.positions;
                if(posiarr){
                    for(var j=0;j<posiarr.length;j++){
                        let buildingId=posiarr[j].buildingId;
                        this.$_sendQuery_$({
                            method:"GET",
                            url:this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building`,
                            data:{},
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    let arr1 = rsp.data.data;
                                    for(let i =0;i<arr1.length;i++){
                                        if(arr1[i].id==buildingId){
                                            for(var k=0;k<posiarr.length;k++){
                                                if(posiarr[k].buildingId==buildingId){
                                                    posiarr[k].build=arr1[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })

                        let floorId=posiarr[j].floorId;

                        this.$_sendQuery_$({
                            method:"GET",
                            url:this.$_global_$.serverPath + '/zone/zone/'+this.$_thisUserInfo_$.zoneId+'/building/'+buildingId+'/floor',
                            data:{},
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    let arr2 = rsp.data.data;
                                    for(let i =0;i<arr2.length;i++){
                                        if(arr2[i].id==floorId){
                                            for(var k=0;k<posiarr.length;k++){
                                                if(posiarr[k].floorId==floorId){
                                                    posiarr[k].floor=arr2[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })

                        let roomIds=posiarr[j].roomIds;
                        this.$_sendQuery_$({
                            method:"GET",
                            url:this.$_global_$.serverPath + '/zone/zone/'+this.$_thisUserInfo_$.zoneId+'/building/'+buildingId+'/floor/'+floorId+'/room',
                            data:{},
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    let arr3 = rsp.data.data;
                                    for(let i =0;i<arr3.length;i++){
                                        if(arr3[i].id==roomIds){
                                            for(var k=0;k<posiarr.length;k++){
                                                if(posiarr[k].roomIds==roomIds){
                                                    posiarr[k].room=arr3[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                this.$_file_$ = [];
                this.imageList = [];
                this.$_file_$ = row.businessLicense.split(',');
                this.imageList.push({url: row.businessLicense});
                this.positionsubmit = row.positions;
                if(row.addressType == 0){ //手动输入
                    this.positionsubmit = []
                }else{
                    this.positionsubmit = row.positions //地址关联
                }
                this.zoneId = row.zoneId;
                this.bList()
            },
            // 删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该企业吗</p><br>        
                    `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise/${row.id}`,
                            data:{},
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success("删除公司成功!")
                                    this.$_List_$()
                                }else{
                                    this.$Message.error("删除公司失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                })
            },
            // 编辑企业基本信息
            editOk(){
                this.$_formValidate_$.file = '123';
                this.$_formValidate_$.businessLicense = this.$_file_$
                // this.$set(this.$_formValidate_$, 'businessLicense',this.$_file_$.join(','));
                if(this.$_formValidate_$.addressType == 0 && this.$_formValidate_$.address != ''){
                    this.$refs.$_formValidate_$.validate((valid)=>{
                        if(valid){
                            this.$_sendQuery_$({
                                method:"PUT",
                                url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise`,
                                data:{
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    sectors: this.$_formValidate_$.sectors,
                                    registerAddress:this.$_formValidate_$.registerAddress,
                                    address: this.$_formValidate_$.address,
                                    city: this.$_formValidate_$.city,
                                    county:this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions:[
                                        {floorId:null,roomIds:null,buildingId:null}
                                    ],
                                    province:this.$_formValidate_$.province,
                                    registeredCapital:this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers:{"Content-type":"application/json"}
                            }).then((rsp)=>{
                                if(rsp.status === 200){
                                    if(rsp.data.code === 0){
                                        this.$Message.success("更新企业成功!")
                                        this.$_file_$ = [];
                                        this.$_modalEdit_$ = false
                                        this.$_List_$();
                                    }else{
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                    })
                }else if(this.$_formValidate_$.addressType == 1){
                     this.$refs.$_formValidate_$.validate((valid)=>{
                        if(valid){
                            this.$_sendQuery_$({
                                method:"PUT",
                                url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}/enterprise`,
                                data:{
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    // businessLicense: '/biz/1001.png',
                                    sectors: this.$_formValidate_$.sectors,
                                    address: "",
                                    registerAddress:this.$_formValidate_$.$registerAddress,
                                    city: this.$_formValidate_$.city,
                                    county:this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions:this.positionsubmit,
                                    province:this.$_formValidate_$.province,
                                    registeredCapital:this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers:{"Content-type":"application/json"}
                            }).then((rsp)=>{
                                if(rsp.status === 200){
                                    if(rsp.data.code === 0){
                                        this.$Message.success("更新企业成功!")
                                        this.$_file_$ = [];
                                         this.$_modalEdit_$=false;
                                         this.$_List_$();
                                    }else{
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                    })
                }
            },
            // 管理员分配
            $_allot_$(row) {
                this.$_modal2_$ = true;
                this.enterpriseInfo = row;
                 this.companyId = row.id;
                 this.zoneId = row.zoneId;
                 this.del = []
                 this.select=[]
                this.$_getManagerData_$()
                this.$_getManagerKeys_$()
            },
            //管家分配
            $_mangerAllot_$(row) {
                this.$_modal3_$ = true;
                this.enterpriseInfo = row;
                this.$_targetKeys1_$ = [];  //清空穿梭框右侧数据
                this.$_data1_$ = this.$_getStewardData_$();  //获取管家列表
            },
            $_cancel_$() {
                this.$_modal3_$ = false
            },
            //管家分配确定
            $_handleGj_$() {
                let sendSteward = {};   //要分配的管家的信息

                for(let i=0;i<this.$_allGjInfo_$.length;i++){
                    if(this.$_allGjInfo_$[i].id == this.$_targetKeys1_$[0]){
                        sendSteward = this.$_allGjInfo_$[i];
                        break;
                    }
                }
                let sendData2 = {
                    "stewardId": sendSteward.id,
                    "stewardName": sendSteward.name,
                    "stewardSex": sendSteward.sex,
                    "stewardPhoneNumber": sendSteward.phoneNumber,
                    "zoneId": this.$_thisUserInfo_$.zoneId,
                    "enterpriseList": [{"enterpriseId":this.enterpriseInfo.id,"enterpriseName":this.enterpriseInfo.name}]
                };

                if(this.$_EnterpriseGj_$.length === 0){
                    //当前企业没有管家
                    this.allotSteward(sendData2);

                }else{
                    //当前企业有管家
                    //需要解绑当前管家的企业

                    let sendData1={
                        "stewardId": this.$_EnterpriseGj_$[0],
                        "zoneId": this.$_thisUserInfo_$.zoneId,
                        "enterpriseList": [{"enterpriseId":this.enterpriseInfo.id}]
                    };
                    //需要先解绑当前管家
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/steward/enterprise/remove`,
                        data: sendData1
                    }).then(rec => {
                        if (rec.status === 200) {
                            if (rec.data.code === 0) {
                                //解绑当前管家成功
                                if(this.$_targetKeys1_$.length===0){
                                    //解绑成功
                                    this.$Message.success('企业解绑管家成功');
                                }else{
                                    //分配新管家
                                    this.allotSteward(sendData2);
                                }

                            }else{
                                this.$Message.error("企业分配管家失败");
                            }
                        }else{
                            this.$Message.error("网络繁忙，请稍后再试");
                        }

                    })
                }
                this.$_modal3_$ = false;
            },
            //给企业分配管家
            allotSteward(sendData){
                //企业分配管家
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/steward/enterprise/assign`,
                    data: sendData
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$Message.success(res.data.data);
                        }else{
                            this.$Message.error("企业分配管家失败");
                        }
                    }else{
                        this.$Message.error("网络繁忙，请稍后再试");
                    }
                });
            },
            //获取当前园区基本信息
            getZoneInfo(){
                this.$_sendQuery_$({
                    method:"GET",
                    url:`${this.$_global_$.serverPath}/zone/zone/${this.$_thisUserInfo_$.zoneId}`,
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.$_thisZoneInfo_$ = rsp.data.data;
                        }
                    }
                })
            },
     //获取楼层列表
      bList(){
        this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
            if(rsp.status === 200){
                if(rsp.data.code === 0){
                    let arr = rsp.data.data;
                        for(let i =0;i<arr.length;i++){
                            let temp ={};
                            temp ={
                                label: arr[i].name,
                                value: arr[i].id
                            };
                            this.buildings.push(temp)
                        }
                }
            }
        })
      },
    //   获取楼层信息
    fList(){
      this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building/${this.buildId}/floor`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
            if(rsp.status === 200){
                if(rsp.data.code === 0){
                    let arr = rsp.data.data;
                        for(let i =0;i<arr.length;i++){
                            let temp ={};
                            temp ={
                                label: arr[i].name,
                                value: arr[i].id
                            };
                            this.floors.push(temp)
                        }
                }
            }
        })  
    },
    // 获取房间信息
    rList(){
        this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.$_thisUserInfo_$.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
            if(rsp.status === 200){
                if(rsp.data.code === 0){
                    let arr = rsp.data.data;
                        for(let i =0;i<arr.length;i++){
                            let temp ={};
                            temp ={
                                label: arr[i].name,
                                value: arr[i].id
                            };
                            this.rooms.push(temp)
                        }
                }
            }
        })  
    },
    // 更该园区
        chosezone(value){
            this.zoneId = value;
            this.buildings=[];
            this.floors = [];
            this.rooms = [];
            this.bList()
        },
        //更改建筑
        building(value){
            this.buildId = value.value;
            this.floors = [];
            this.rooms = [];
            this.showList.build = value.label;
            this.submitList.buildingId = value.value;
            this.fList()
        },
        //更改楼层
        chosefloor(value){
            this.floorId = value.value;
            this.rooms = [];
            this.showList.floor = value.label;
            this.submitList.floorId = value.value;
            this.rList()
        },
        // 更改房间
        choseroom(value){
            this.showList.room = value.label;
            this.submitList.roomIds = value.value
        },
        //添加地址信息
        addRoom(){
            if(this.submitList.buildingId !== null){
                this.positionsubmit.push(this.submitList)
                this.positions.push(this.showList)
               this.$_formValidate_$.positions = this.positionsubmit
            }else{
                this.$Message.error("请正确选择地址!")
            }
            
        },
        // 删除地址信息
        delRoom(index){
            this.positions.splice(index,1);
            this.positionsubmit.splice(index,1)
        },
            beforeuploadEdit(file) {
            },
            uploadexceed(file,fileList){
                if(file.length == 1){
                    this.$Message.error("营业执照只能上传一张!")
                }
            },
			// 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
			 // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_file_$ = this.baseUrl+res.data
                // this.$_editForm_$.file = res.data;
                // this.fileChangeEdit(fileList);
                // this.$refs.file.clearValidate();
            },
			// 设置photo值
            fileChangeEdit(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str;

                            }
                        }
                    }
                }
                this.$_file_$.push(a);
            },
			// 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = '';
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            }

        }


    }
</script>