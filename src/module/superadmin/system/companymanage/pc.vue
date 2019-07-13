<style scoped>
    .zdtb {
        font-size: 14px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .list {
        width: 427px;
        margin-top: 5px;
        max-height: 180px;
        overflow-y: auto;
    }

    >>> .ivu-table-cell {
        padding: 0;
    }

</style>
<template>
    <div>
        <div class="zdtb">
            <span>园区：</span>
            <Select v-model="$_zone_$" @on-change='changeZone' placeholder="请选择园区" style="width:210px">
                <Option v-for="item in $_zoneList_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            <span style="margin-left: 25px">企业名称：</span>
            <Input v-model="$_companyName_$" placeholder="请输入企业名称" style="width:210px"></Input>
            <span style="margin-left: 25px">地址类型：</span>
            <Select v-model="$_selected_$" style="width:210px;margin-right: 25px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            <Button type="primary" @click="$_cNameSearch_$">搜索</Button>
        </div>

        <Button type="primary" @click="$_addCompany_$" style="float: right;margin-top: 10px">+ 新增企业</Button>
        <p style="clear: both"></p>
        <!-- 首行框 -->

        <Row class="mt10">


            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <!-- 管理员分配 -->
            <Modal v-model="$_modal2_$"
                   title="人员分配" :mask-closable="false">
                <Transfer class="mt10"
                          :data="$_data2_$"
                          :operations="['解除','分配']" :titles="['未分配','已分配']"
                          :target-keys="$_targetKeys2_$"
                          :render-format="$_render2_$"
                          @on-change="$_handleChange2_$">
                </Transfer>
                <div slot="footer" class="dialog-footer">
                    <Button type="primary" @click="$_modal2_$ = false">取消</Button>
                    <Button type="primary" @click="$_handleManager_$()">确定</Button>
                </div>
            </Modal>
            <!-- 编辑 -->
            <Modal width="700" v-model="$_modalEdit_$" title="企业基本信息" :mask-closable="false">
                <Form ref="$_formValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                    <FormItem label="所属园区：">
                        <!-- <Input v-model="$_formValidate_$.name" placeholder="请输入园区名称"></Input> -->
                        <Select disabled v-model="$_formValidate_$.zoneId" @on-change="chosezone" placeholder="园区"
                                class="input" style="width:140px">
                            <Option v-for="(item,index) in zones" :label="item.label" :value="item.value" :key="index">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="企业名称：" prop="name">
                        <Input v-model="$_formValidate_$.name" placeholder="请输入企业名称"></Input>
                    </FormItem>
                    <FormItem label="注册地址：" prop="registerAddress">
                        <Input v-model="$_formValidate_$.registerAddress" placeholder="请输入注册地址"></Input>
                    </FormItem>

                    <FormItem label="注册资金：" prop="registeredCapital">
                        <Input v-model="$_formValidate_$.registeredCapital" placeholder="请输入注册资金" style="width:80%"
                               number></Input>&nbsp;万元
                    </FormItem>
                    <FormItem label="法人名称：" prop="legalPerson">
                        <Input v-model="$_formValidate_$.legalPerson" placeholder="请输入法人名称"></Input>
                    </FormItem>
                    <!--<FormItem label="员工数量：" prop="scale">-->
                    <!--<Input v-model="$_formValidate_$.scale" placeholder="请输入员工数量" style="width:80%" number></Input>&nbsp;人-->
                    <!--</FormItem>-->
                    <FormItem label="经营范围：" prop="businessScope">
                        <Input v-model="$_formValidate_$.businessScope" type="textarea" :rows="4" placeholder="请输入经营范围"></Input>
                    </FormItem>
                    <FormItem label="行业类别：" prop="sectors">
                        <Select v-model="$_formValidate_$.sectors" placeholder="请选择">
                            <Option v-for="(item,index) in  industry" :label="item.label" :value="item.value"
                                    :key="index">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="营业执照：" prop="file">
                        <el-upload
                                class="avatar-uploader"
                                :action=this.$_global_$.imgUploadPath
                                list-type="picture-card"
                                :show-file-list="true"
                                ref="editupload"
                                :limit="1"
                                :on-exceed="uploadexceed"
                                :before-upload="beforeuploadEdit"
                                :on-remove="handleRemoveEdit"
                                :on-success="uploadSuccessEdit"
                                :file-list="imageList"
                                 accept="image/png,image/gif,image/jpg,image/jpeg">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </FormItem>
                    <FormItem label="企业地址：" prop="addressType">
                        <Select v-model="$_formValidate_$.addressType" placeholder="请选择地址类型" class="input"
                                style="width:100px;">
                            <Option v-for="item in addressList" :value="item.value" :key="item.value">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem v-if="$_formValidate_$.addressType  == 0" label="请输入：">
                        <Input v-model="$_formValidate_$.address" placeholder="请输入企业地址"></Input>
                    </FormItem>
                    <FormItem v-if="$_formValidate_$.addressType  == 1" label="企业地址关联">
                        <Select :label-in-value="true" v-model="$_formValidate_$.building" @on-change="building"
                                placeholder="建筑" class="input" style="width:100px;">
                            <Option v-for="(item,index) in buildings" :key="index" :label="item.label"
                                    :value="item.value">
                            </Option>
                        </Select>
                        <Select :label-in-value="true" v-model="$_formValidate_$.floorId" @on-change="chosefloor"
                                placeholder="楼层" class="input" style="width:140px">
                            <Option v-for="(item,index) in floors" :key="index" :label="item.label" :value="item.value">
                            </Option>
                        </Select>
                        <Select :label-in-value="true" @on-change="choseroom" v-model="$_formValidate_$.roomIds"
                                placeholder="房间" class="input" style="width:120px;">
                            <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                            </Option>
                        </Select>

                        <Button type="primary" style="height:39px;" @click="addRoom">添加</Button>
                        <ul class="list">
                            <li style="height:39px;line-height:39px; margin-bottom:5px;"
                                v-for="(item,index) in $_formValidate_$.positions" :key="index">
                                楼：{{item.build}}
                                <span v-if="!item.floorId == ''">层：{{item.floor}}</span>
                                <span v-if="!item.roomIds == ''">房间：{{item.room}}</span>
                                <Button type="primary" style="height:39px; float:right" @click="delRoom(index)">删除
                                </Button>
                            </li>
                        </ul>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="ghost" @click="editCancel()">取消</Button>
                    <Button type="primary" @click="editOk()" style="margin-left: 8px">确定</Button>
                </div>
            </Modal>
        </Row>
        <div class="mt10">共{{total}}条数据</div>
        <br>
        <Row style="float: right">
            <Page align="right" :total="total"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>

</template>

<script>
    import controler from './controler.js';
    import {Button, Select, Option, Table, TableColumn, Upload} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Select.name]: Select,
            [Button.name]: Button,
            [Option.name]: Option,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Upload.name]: Upload,
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            const validatecont = (rule, value, callback) => {
                if (this.$_formValidate_$.addressType == '0') {
                    //手动输入
                    if ((this.$_formValidate_$.address != "") && (this.$_formValidate_$.address != undefined)) {
                        callback();
                    } else {
                        callback('请输入企业地址');
                    }
                } else {
                    if (this.positionsubmit.length > 0) {
                        callback();
                    } else {
                        callback('请选择企业地址');
                    }
                }
            };
            return {
                $_companyName_$: "", // 公司名称
                $_selected_$: "", // 默认选中
                $_zone_$: '', // 选择园区
                $_zoneList_$: [],  // 园区列表
                $_statusList_$: [ // 状态值
                    {
                        value: 0,
                        label: "手动输入"
                    },
                    {
                        value: 1,
                        label: "地址关联"
                    }
                ],
                $_modalEdit_$: false,
                $_modal2_$: false,
                $_modal3_$: false,
                $_relationModel2_$: "",
                $_relationModel3_$: "",
                $_relationModel4_$: "",
                $_data2_$: [],
                $_targetKeys2_$: [],
                //传api
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_formValidate_$: {},
                $_ruleValidate_$: {
                    name: [
                        {required: true, type: 'string', message: '请输入企业名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '企业名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    registerAddress: [
                        {required: true, type: 'string', message: '请输入注册地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '注册地址不能超过100个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    registeredCapital: [
                        {required: true, type: 'number', message: '请填写注册资金,如：1000', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {type: 'number', max: 999999999, message: '注册资金不能超过999999999', trigger: 'change'},
                    ],
                    legalPerson: [
                        {required: true, type: 'string', message: '请填写法人名称', trigger: 'change'},
                        {type: 'string', max: 50, message: '法人名称不能超过50个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    // scale: [
                    //     {required: true,type: 'number', message: '请输入员工数量', trigger: 'change' },
                    //     {validator: this.$_validatepostiveint_$, trigger:'change'},
                    //     {type: 'number', max: 999999, message: '员工数量不能超过999999', trigger: 'change'},
                    // ],
                    businessScope: [
                        {required: true, type: 'string', message: '请输入经营范围', trigger: 'change'},
                        {type: 'string', max: 200, message: '经营范围不能超过200个字', trigger: 'change'}
                    ],
                    sectors: [
                        {required: true, message: '请选择行业类别', trigger: 'blur'}
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                    addressType: [
                        // {required: true, validator: validatecont, trigger: 'change'}
                    ],
                },

                $_columns7_$: [
                    {
                        title: '编号',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.$_page_$ - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: '企业名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '所在地址',
                        key: 'registerAddress',
                        align: 'center',
                        render: (h, params) => {
                            let a;
                            if (params.row.addressType == 0) {
                                a = params.row.address;
                            } else {
                                a = params.row.registerAddress;
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '地址类型',
                        key: 'addressType',
                        align: 'center',
                        render: (h, params) => {
                            let a;
                            if (params.row.addressType == 0) {
                                a = "手动输入";
                            }
                            if (params.row.addressType == 1) {
                                a = "地址关联";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '法人名称',
                        key: 'legalPerson',
                        align: 'center',
                    },
                    {
                        title: '注册资金',
                        key: 'registeredCapital',
                        align: 'center',
                    },
                    {
                        title: '经营范围',
                        key: 'businessScope',
                        align: 'center',
                    },
                    {
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
                    {
                        title: '入驻时间',
                        key: 'createDate',
                        align: 'center',
                        width: 115,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            let a = JSON.parse(JSON.stringify(params.row));
                                            this.$_show_$(a)
                                        }
                                    }
                                }, '编辑 | '),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
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
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row)
                                        }
                                    }
                                }, ' | 管理员分配'),
                            ]);
                        }
                    }
                ],
                $_data6_$: [],  // 表格数据
                industry: [  // 行业类别
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
                //A 农、林、牧、渔业； B 采矿业； C 制造业； D 电力、热力、燃气及水生产和供应业； E 建筑业； F 批发和零售业； G 交通运输、仓储和邮政业； H 住宿和餐饮业； I 信息传输、软件和信息技术服务业； J 金融业； K 房地产业； L 租赁和商务服务业； M 科学研究和技术服务业； N 水利、环境和公共设施管理业； O 居民服务、修理和其他服务业； P 教育； Q 卫生和社会工作； R 文化、体育和娱乐业； S 公共管理、社会保障和社会组织； T 国际组织
                addressList: [  // 地址类型
                    {value: 0, label: "手动输入"},
                    {value: 1, label: "地址关联"}
                ],
                imageList: [],
                $_file_$: [],
                zones: [],
                buildings: [],
                floors: [],
                rooms: [],
                zoneId: 0,
                buildId: 0,
                floorId: 0,
                positions: [],
                showList: {
                    build: '',
                    floor: '',
                    room: ''
                },
                submitList: {
                    floorId: null,
                    roomIds: null,
                    buildingId: null
                },
                positionsubmit: [],
                $_pageSize_$: 10,
                $_page_$: 1,
                total: 0,
                companyId: 0,
                select: [],
                del: [],
                originManagerList: [], // 源列表
                targetList: [], // 目的列表
                yfpList: [], // 已经拥有的管理员
                userInfo: {}
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.userInfo = JSON.parse(cookie);
            this.zoneId = this.userInfo.zoneId;
            this.$_zList_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            changeZone(value) {
                this.zoneId = value
                this.$_zone_$ = value
                this.$_list_$()
            },
            // 表格数据
            $_list_$() {
                this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/enterprise/manager`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            // 获取园区列表
            $_zList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {pageSize: 99999},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.data.data) {
                        let arr = rsp.data.data.records;
                        for (let i = 0; i < arr.length; i++) {
                            let temp = {};
                            temp = {value: arr[i].id, label: arr[i].name}
                            this.$_zoneList_$.push(temp)
                        }
                        this.zoneId = this.$_zoneList_$[0].value;
                        this.$_zone_$ = this.$_zoneList_$[0].value;
                        this.$_list_$();
                    }
                })
            },
            // 新增企业
            $_addCompany_$() {
                this.$root.$_Route_$('superadmin', 'jump', 'addcompany', {})
            },
            // 搜索
            $_cNameSearch_$() {
                this.$_querycfg_$.params.name = this.$_companyName_$.trim();
                this.$_querycfg_$.params.addressType = this.$_selected_$;
                if (this.$_zone_$) {
                    this.zoneId = this.$_zone_$;
                }
                this.$_querycfg_$.params.pageNum = 1;
                this.$_list_$();
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_page_$ = e;
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_pageSize_$ = e;
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
            // 编辑
            $_show_$(row) {
                this.$_modalEdit_$ = true;
                this.$_formValidate_$ = row;
                var posiarr = this.$_formValidate_$.positions;
                if (posiarr) {
                    for (var j = 0; j < posiarr.length; j++) {
                        let buildingId = posiarr[j].buildingId;
                        this.$_sendQuery_$({
                            method: "GET",
                            url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr1 = rsp.data.data;
                                    for (let i = 0; i < arr1.length; i++) {
                                        if (arr1[i].id == buildingId) {
                                            for (var k = 0; k < posiarr.length; k++) {
                                                if (posiarr[k].buildingId == buildingId) {
                                                    posiarr[k].build = arr1[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })

                        let floorId = posiarr[j].floorId;

                        this.$_sendQuery_$({
                            method: "GET",
                            url: this.$_global_$.serverPath + '/zone/zone/' + this.zoneId + '/building/' + buildingId + '/floor',
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr2 = rsp.data.data;
                                    for (let i = 0; i < arr2.length; i++) {
                                        if (arr2[i].id == floorId) {
                                            for (var k = 0; k < posiarr.length; k++) {
                                                if (posiarr[k].floorId == floorId) {
                                                    posiarr[k].floor = arr2[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })

                        let roomIds = posiarr[j].roomIds;
                        this.$_sendQuery_$({
                            method: "GET",
                            url: this.$_global_$.serverPath + '/zone/zone/' + this.zoneId + '/building/' + buildingId + '/floor/' + floorId + '/room',
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr3 = rsp.data.data;
                                    for (let i = 0; i < arr3.length; i++) {
                                        if (arr3[i].id == roomIds) {
                                            for (var k = 0; k < posiarr.length; k++) {
                                                if (posiarr[k].roomIds == roomIds) {
                                                    posiarr[k].room = arr3[i].name
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                }


                //字符串类型转换
                this.$_formValidate_$.scale = row.scale - 0;
                this.$_formValidate_$.registeredCapital = row.registeredCapital - 0;

                this.$_file_$ = [];
                this.imageList = [];
                this.$_file_$ = row.businessLicense.split(',');
                this.imageList.push({url: row.businessLicense});
                if (row.addressType == 0) {
                    this.positionsubmit = []
                } else {
                    this.positionsubmit = row.positions
                }
                this.zoneId = row.zoneId;
                this.zList();
                this.bList()
            },
            // 编辑确定
            editOk() {
                // debugger
                // this.$_formValidate_$.file = '123';
                this.$set(this.$_formValidate_$, 'businessLicense', this.$_file_$.join(','));

                this.$refs.$_formValidate_$.validate((valid) => {
                    if (valid) {
                        if (this.$_formValidate_$.addressType == 0) {
                            //手动输入企业地址
                            this.$_sendQuery_$({
                                method: "PUT",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                data: {
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    sectors: this.$_formValidate_$.sectors,
                                    address: this.$_formValidate_$.address,
                                    registerAddress: this.$_formValidate_$.registerAddress,
                                    city: this.$_formValidate_$.city,
                                    county: this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions: [
                                        {floorId: null, roomIds: null, buildingId: null}
                                    ],
                                    province: this.$_formValidate_$.province,
                                    registeredCapital: this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("更新企业成功!");
                                        this.$_file_$ = [];
                                        this.$_modalEdit_$ = false;
                                        this.$_list_$();
                                    } else {
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                        else {
                            //地址关联企业地址
                            let subposition = [];
                            for (var i = 0; i < this.positionsubmit.length; i++) {
                                subposition[i] = {};
                                subposition[i].buildingId = this.positionsubmit[i].buildingId
                                subposition[i].floorId = this.positionsubmit[i].floorId
                                subposition[i].roomIds = this.positionsubmit[i].roomIds
                            }
                            this.$_sendQuery_$({
                                method: "PUT",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_formValidate_$.zoneId}/enterprise`,
                                data: {
                                    businessLicense: this.$_formValidate_$.businessLicense,
                                    // businessLicense: '/biz/1001.png',
                                    sectors: this.$_formValidate_$.sectors,
                                    address: "",
                                    registerAddress: this.$_formValidate_$.registerAddress,
                                    city: this.$_formValidate_$.city,
                                    county: this.$_formValidate_$.county,
                                    businessScope: this.$_formValidate_$.businessScope,
                                    scale: this.$_formValidate_$.scale,
                                    positions: subposition,
                                    province: this.$_formValidate_$.province,
                                    registeredCapital: this.$_formValidate_$.registeredCapital,
                                    legalPerson: this.$_formValidate_$.legalPerson,
                                    name: this.$_formValidate_$.name,
                                    id: this.$_formValidate_$.id,
                                    addressType: this.$_formValidate_$.addressType
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("更新企业成功!")
                                        this.$_file_$ = [];
                                        this.$_modalEdit_$ = false;
                                        this.$_list_$();
                                    } else {
                                        this.$Message.error("更新企业失败!")
                                    }
                                }
                            })
                        }
                    }
                });
            },
            //编辑取消
            editCancel() {
                this.$_modalEdit_$ = false;
            },
            //穿梭框实现,管理员源列表数据
            $_getManagerData_$() {
                this.originManagerList = [];
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/search`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                let arr = rsp.data.data.records;
                                for (let i = 0; i < arr.length; i++) {
                                    let temp = {};
                                    temp = {
                                        key: arr[i].id,
                                        label: arr[i].name
                                    };
                                    this.originManagerList.push(temp)
                                }
                            }
                            this.$_data2_$ = this.originManagerList
                        }
                    }
                })

            },
            //管理员目的列表数据
            $_getManagerKeys_$() {
                this.yfpList = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${this.companyId}/employee/admin`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            if (arr) {
                                for (var i = 0; i < arr.length; i++) {
                                    this.yfpList.push(arr[i].id)
                                }
                            } else {

                            }
                            this.$_targetKeys2_$ = this.yfpList
                        }
                    }
                })
            },
            // 管理员
            $_render2_$(item) {
                return item.label;
            },
            // 管理员
            $_handleChange2_$(newTargetKeys, direction, moveKeys) {
                if (direction == 'right') {
                    this.$_targetKeys2_$ = newTargetKeys;
                    if (this.$_targetKeys2_$.length != 0 && this.del.length != 0) {
                        for (var i = 0; i < this.$_targetKeys2_$.length; i++) {
                            let flag = false;
                            let k;
                            for (let j = 0; j < this.del.length; j++) {
                                // debugger
                                if (this.$_targetKeys2_$[i] == this.del[j]) {
                                    k = j;
                                    flag = true;
                                }
                            }
                            if (flag) {
                                this.del.splice(k, 1)
                            }
                        }
                    }
                } else {
                    let moveKey = [];
                    if (this.yfpList.length != 0 && this.del.length == 0) {
                        for (let i = 0; i < moveKeys.length; i++) {
                            let flag = false;
                            for (let j = 0; j < this.yfpList.length; j++) {
                                if (moveKeys[i] == this.yfpList[j]) {
                                    flag = true;
                                }
                            }
                            if (flag) {
                                moveKey.push(moveKeys[i]);
                                this.del = moveKey
                            }
                        }
                    }
                    if (moveKey.length != 0 && this.del.length != 0) {
                        for (let i = 0; i < moveKey.length; i++) {
                            let flag = true;
                            for (let j = 0; j < this.del.length; j++) {
                                if (moveKey[i] == this.del[j]) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                this.del.push(moveKey[i])
                            }
                        }
                    } else if (moveKey.length != 0 && this.del.length == 0) {
                        this.del = moveKey
                    }
                    this.$_targetKeys2_$ = newTargetKeys;
                }

            },
            // 管理员分配确认
            $_handleManager_$() {
                this.select = [];
                //已经分配的管理员
                if (this.yfpList.length != 0) {  // 如果已经有管理员
                    // 把穿梭框右侧的列表新增的部分筛选出来
                    for (let i = 0; i < this.$_targetKeys2_$.length; i++) {
                        let flag = true;
                        for (let j = 0; j < this.yfpList.length; j++) {
                            if (this.$_targetKeys2_$[i] == this.yfpList[j]) {
                                flag = false
                            }
                        }
                        if (flag) {
                            this.select.push(this.$_targetKeys2_$[i])
                        }
                    }
                } else {
                    this.select = this.$_targetKeys2_$
                }
                if (this.$_targetKeys2_$.length != 0) {
                    // 管理员设置接口
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/enterprise/${this.companyId}/admin`,
                        data: {
                            add: this.select,
                            del: this.del
                        },
                        headers: {"Content-type": "application/json"}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$_modal2_$ = false
                                this.$Message.success("分配成功!")
                            }
                        }
                    })
                } else {
                    this.$Message.error("企业必须有一个管理员!")
                }
            },
            // 获取园区信息
            zList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 99999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data.records;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                };
                                this.zones.push(temp)
                            }
                        }
                    }
                })
            },
            //获取建筑列表
            bList() {
                this.buildings = [],
                    this.$_sendQuery_$({
                        method: "GET",
                        url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                        data: {},
                        headers: {"Content-type": "application/json"}
                    }).then((rsp) => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                let arr = rsp.data.data;
                                for (let i = 0; i < arr.length; i++) {
                                    let temp = {};
                                    temp = {
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.buildings.push(temp)
                                }
                            }
                        }
                    })
            },
            //获取楼层信息
            fList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
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
            rList() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let arr = rsp.data.data;
                            for (let i = 0; i < arr.length; i++) {
                                let temp = {};
                                temp = {
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
            chosezone(value) {
                this.zoneId = value;
                this.buildings = [];
                this.floors = [];
                this.rooms = [];
                this.bList()
            },
            //更改建筑
            building(value) {
                this.buildId = value.value;
                this.floors = [];
                this.rooms = [];
                this.showList.build = value.label;
                this.submitList.buildingId = value.value;
                this.fList()
            },
            //更改楼层
            chosefloor(value) {
                this.floorId = value.value;
                this.rooms = [];
                this.showList.floor = value.label;
                this.submitList.floorId = value.value;
                this.rList()
            },
            // 更改房间
            choseroom(value) {
                this.showList.room = value.label;
                this.submitList.roomIds = value.value
            },
            //添加地址信息
            addRoom() {
                if (this.submitList.buildingId !== null) {
                    var sublist = JSON.parse(JSON.stringify(this.submitList));
                    var list = JSON.parse(JSON.stringify(this.showList));
                    for (var i in list) {
                        sublist[i] = list[i];
                    }
                    this.positionsubmit.push(sublist);
                    this.positions.push(list);
                    this.$_formValidate_$.positions = this.positionsubmit
                } else {
                    this.$Message.error("请正确选择地址!")
                }
            },
            // 删除地址信息
            delRoom(index) {
                this.positions.splice(index, 1);
                this.positionsubmit.splice(index, 1);
            },
            // 上传超出限制
            uploadexceed(file, fileList) {
                if (file.length == 1) {
                    this.$Message.error("营业执照只能上传一张!")
                }
            },
            beforeuploadEdit(file) {
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                // this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
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
                                a = this.$_global_$.imgPath + temp_str;
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
                                a = temp_str;
                            }
                        }
                    }
                }
                this.$_file_$.pop(a);
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
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/enterprise/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除公司成功!");
                                    this.$_list_$()
                                } else {
                                    this.$Message.error("删除公司失败!")
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                })
            },
            // 管理员分配
            $_allot_$(row) {
                this.$_modal2_$ = true;
                this.companyId = row.id;
                this.zoneId = row.zoneId;
                this.$_getManagerData_$();
                this.$_getManagerKeys_$();
                this.del = []
            }
        },
    }
</script>







