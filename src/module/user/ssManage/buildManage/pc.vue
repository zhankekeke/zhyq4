<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        background: #f7f7f7;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #404040;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
    }

    .buildList {
        border-right: 2px solid #f1f1f1;
    }

    .buildList .list {
        padding: 0 5px 10px;
        box-sizing: border-box;
        overflow-y: scroll;
        height: 500px;
    }

    .buildList .list li {
        margin-top: 10px;
        padding: 5px 5px;
        border-bottom: 2px solid #f1f1f1;
        box-sizing: border-box;
    }

    .buildList .list li p {
        text-align: center;
        line-height: 30px;
        font-weight: bold;
    }

    .buildList .list li img {
        width: 100%;
        height: auto;
    }

    .floor {
        background: #d6ebfe;
        height: 60px;
        padding: 10px 0 0 0px;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .house {
        border-radius: 4px;
        margin-top: 20px;
        background: #f4f4f4;
        height: 30px;
        box-sizing: border-box;
    }

    .housetext {
        line-height: 30px;
        font-weight: bold;
        font-size: 16px;
        margin-left: 10px;
    }

    .housenum {

    }

    .housenum li {
        position: relative;
        width: 120px;
        height: 70px;
        float: left;
        margin: 15px 0 0 2%;
        border: 1px solid #ccc;
        text-align: center;
        border-radius: 4px;
        color: #545454;
    }

    .housenum li b {
        line-height: 70px;
        color: #545454;
    }

    .housenum li p {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 5px;
    }

</style>
<template>
    <div>
        <!-- 内容 -->
        <Row>
            <Col span="4">
                <div class="buildList">
                    <!-- <Button @click="$_addBuild_$()" long>添加楼宇</Button> -->
                    <ul class="list">
                        <li v-for="(item, index) in $_buildList_$" :key="index" @click="$_bulid_$(item)"
                            style="cursor: pointer; text-align: center">
                            <img v-if="item.images.length>0" :src="item.images[0].imageUrl"
                                 style="width: 160px;height: 85px;border-radius: 6px" alt="">
                            <img v-else src="./img.png" style="width: 160px;height: 85px" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col span="19" offset="1">
                <!--<Row>-->
                    <!--<Col span="24" align="left">-->
                        <!--<Button type="primary" @click="$_pmt_$()">楼宇平面图</Button>-->
                    <!--</Col>-->
                <!--</Row>-->
                <br>
                <Row>
                    <Col span="8">
                        &nbsp;&nbsp;<span style="color: black; font-size:14px;">楼宇名称：</span>
                        <span style="font-weight: bold;font-size: 16px;">{{$_trueBnum_$}}</span>
                    </Col>
                    <!--<Col span="16" align="right">-->
                    <!--<Button type="primary" @click="$_editBuild_$()">编辑楼宇</Button>-->
                    <!--<Button type="primary" @click="$_removeBuild_$($_bnum_$)">移除楼宇</Button>-->
                    <!--</Col>-->
                </Row>
                <br>
                <Row class="floor">
                    <Col span="18">
                        &nbsp;&nbsp;
                        <Button type="text" v-for="(item, index) in $_floorList_$" :key="index"
                                @click="$_changeFloor_$(item)">
                            {{item.name}}
                        </Button>
                    </Col>
                    <!--<Col span="6" align="right">-->
                    <!--<Button type="primary" @click="$_addfloor_$()">添加楼层</Button>-->
                    <!--<Button type="primary" @click="$_delfloor_$()">移除楼层</Button>-->
                    <!--</Col>-->
                </Row>
                <Row class="house">
                    <Col span="10" class="housetext">房间列表</Col>
                </Row>
                <Row>
                    <ul class="housenum">
                        <li v-for="(item, index) in $_roomList_$" :key="index">
                            <b>{{item.name}}</b>
                            <!-- <p @click="$_delHousenum_$(item.id)">X</p> -->
                        </li>
                        <li @click="$_addhousenum_$">
                            <b style="font-size:40px; font-weight: normal; color: #545454; cursor:pointer"> + </b>
                        </li>
                    </ul>
                </Row>
            </Col>
        </Row>
        <!-- 添加楼宇 -->
        <Modal v-model="$_modal1_$" title="添加楼宇">
            <Form ref="$_formValidate_$" :model="$_formValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="所属园区" prop="$_parkNum_$">
                    <Select v-model="$_formValidate_$.$_parkNum_$" placeholder="请选择">
                        <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value" slot>{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="楼宇名称" prop="$_buildName_$">
                    <Input v-model="$_formValidate_$.$_buildName_$" placeholder="请输入楼宇名称"></Input>
                </FormItem>
                <FormItem label="建筑面积" prop="$_buildArea_$">
                    <Input v-model="$_formValidate_$.$_buildArea_$" placeholder="请输入建筑面积" number></Input>
                </FormItem>
                <FormItem label="建成时间">
                    <DatePicker @on-change="$_onChange_$" type="date" placement="bottom" placeholder="请选择建成时间"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="备注信息" prop="$_buildDesc_$">
                    <Input v-model="$_formValidate_$.$_buildDesc_$" type="textarea" placeholder="请填写备注信息"></Input>
                </FormItem>
            </Form>
            <div slot="footer" align="center">
                <Button type="primary" @click="$_save_$('add')">保存</Button>
            </div>
        </Modal>
        <!-- 编辑楼宇 -->
        <Modal v-model="$_editmodal_$" title="编辑楼宇">
            <Form ref="$_editformValidate_$" :model="$_editformValidate_$" :rules="$_editBuildValidate_$"
                  :label-width="100">
                <FormItem label="楼宇名称" prop="name">
                    <Input v-model="$_editformValidate_$.name" placeholder="请输入楼宇名称"></Input>
                </FormItem>
                <FormItem label="建筑面积" prop="area">
                    <Input v-model="$_editformValidate_$.area" placeholder="请输入建筑面积" number></Input>
                </FormItem>
                <FormItem label="建成时间">
                    <DatePicker @on-change="$_onChange_$" type="date" placement="bottom" placeholder="请选择建成时间"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="备注信息" prop="desc">
                    <Input v-model="$_editformValidate_$.description" type="textarea" placeholder="请填写备注信息"></Input>
                </FormItem>
            </Form>
            <div slot="footer" align="center">
                <Button type="primary" @click="$_save_$('edit')">保存</Button>
            </div>
        </Modal>
        <!-- 添加楼层 -->
        <Modal v-model="$_addFloorModal_$" title="添加楼层">
            <Form ref="$_addFloorValidate_$" :model="$_addFloorValidate_$" :rules="$_ruleValidate_$" :label-width="100">
                <FormItem label="楼层名称" prop="$_floorName_$">
                    <Input v-model="$_addFloorValidate_$.$_floorName_$" placeholder="请输入楼层名称"></Input>
                </FormItem>
                <FormItem label="备注信息" prop="$_buildDesc_$">
                    <Input v-model="$_addFloorValidate_$.$_buildDesc_$" type="textarea" placeholder="请填写备注信息"></Input>
                </FormItem>
            </Form>
            <div slot="footer" align="center">
                <Button type="primary" @click="$_save_$('addfloor')">保存</Button>
            </div>
        </Modal>
        <!-- 添加房间 -->
        <Modal v-model="$_addFloorNumModal_$" title="添加房间">
            <Form ref="$_addFloorNumValidate_$" :model="$_addFloorNumValidate_$" :rules="$_ruleValidate_$"
                  :label-width="100">
                <FormItem label="房间号" prop="$_houseNum_$">
                    <Input v-model="$_addFloorNumValidate_$.$_houseNum_$" placeholder="请输入房间号如：1001"></Input>
                </FormItem>
                <FormItem label="备注信息" prop="$_buildDesc_$">
                    <Input v-model="$_addFloorNumValidate_$.$_houseDes_$" type="textarea" placeholder="请填写备注信息"></Input>
                </FormItem>
            </Form>
            <div slot="footer" align="center">
                <Button type="primary" @click="$_save_$('addHouse')">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import controler from './controler.js';
    import axios from 'axios'

    export default {
        mixins: [controler],
        data() {
            const validateaddr = (rule, value, callback) => {
                if (this.$_formValidate_$.$_parkNum_$ != "") {
                    callback();
                } else {
                    callback('请选择所属园区');
                }
            };
            return {
                $_selected_$: '',
                //层号
                $_fnum_$: 0,
                //索引楼号
                $_bnum_$: 0,
                //真实显示楼名称
                $_trueBnum_$: '',
                $_zoneId_$: 0, // 园区id
                $_userInfo_$: '',

                $_floorId_$: 0, // 楼层id
                $_modal1_$: false,
                $_editmodal_$: false,
                $_addFloorModal_$: false,
                $_addFloorNumModal_$: false,
                $_statusList_$: [], // 园区选择
                $_buildName_$: '', //楼房名称
                $_floorName_$: '', //楼层名称
                $_roomId_$: '', //房间号
                $_buildList_$: [  // 楼宇列表
                ],
                $_floorList_$: [], // 楼层列表
                $_roomList_$: [], // 房间列表
                $_formValidate_$: {
                    $_parkNum_$: "",
                    $_buildName_$: "",
                    $_buildArea_$: "",
                    $_buildTime_$: "",
                    $_buildDesc_$: ""
                },
                $_editformValidate_$: {},  // 编辑楼宇表单
                // 添加楼层
                $_addFloorValidate_$: {
                    $_floorName_$: "",
                    $_buildDesc_$: ""
                },
                // 添加房间
                $_addFloorNumValidate_$: {
                    $_houseNum_$: "",
                    $_houseDes_$: ""
                },
                $_ruleValidate_$: {
                    $_parkNum_$: [
                        {validator: validateaddr, trigger: 'change'}
                    ],
                    $_buildName_$: [
                        {required: true, type: 'string', message: '请输入楼宇名称', trigger: 'blur'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_buildArea_$: [
                        {required: true, type: 'number', message: '必须是数字'},
                        {type: 'number', max: 999999999, message: '面积不能超过999999999', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_floorName_$: [
                        {required: true, message: '请输入楼层名称', trigger: 'blur'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    $_houseNum_$: [
                        {required: true, message: '请输入房间号', trigger: 'blur'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请输入备注信息', trigger: 'blur'},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ]
                },
                $_editBuildValidate_$: {  // 编辑楼宇验证
                    // zoneId: [
                    //     {required: true, message: '请选择所属园区', trigger: 'blur'}
                    // ],
                    name: [
                        {required: true, message: '请输入楼宇名称', trigger: 'blur'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    area: [
                        {required: true, type: 'number', message: '必须是数字'},
                        {type: 'number', max: 999999999, message: '面积不能超过999999999', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请输入备注信息', trigger: 'blur'},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ]
                },
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_zoneId_$ = this.$_userInfo_$.zoneId
            this.$_bList_$()
            // this.$_zoneList_$()
        },
        methods: {
            // 楼宇平面图
            $_pmt_$() {
                this.$root.$_Route_$('user', 'jump', 'lypmt', {})
            },
            $_onChange_$(res) {
                this.$_formValidate_$.$_buildTime_$ = res + " 00:00:00";
                this.$_editformValidate_$.buildDate = res + " 00:00:00";
            },
            // 大楼列表
            $_bList_$() {
                this.$_buildList_$ = [];
                this.$_floorList_$ = [];
                this.$_roomList_$ = [];
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_buildList_$ = rsp.data.data
                            this.$_trueBnum_$ = rsp.data.data[0].name  // 大楼名称
                            this.$_bnum_$ = rsp.data.data[0].id  // 大楼id
                            this.$_zoneId_$ = rsp.data.data[0].zoneId  // 园区ID
                            this.$_editformValidate_$ = rsp.data.data[0]
                            this.$_editformValidate_$.zoneId = String(this.$_editformValidate_$.zoneId)
                            this.$_Flist_$()
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            // 楼层列表
            $_Flist_$() {
                this.$_floorList_$ = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_floorList_$ = rsp.data.data
                            this.$_floorId_$ = rsp.data.data[0].id
                            this.$_Rlist_$()
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            // 房间列表
            $_Rlist_$() {
                this.$_roomList_$ = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor/${this.$_floorId_$}/room`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_roomList_$ = rsp.data.data
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },

            // 搜索
            $_search_$() {
            },

            // 添加楼宇
            $_addBuild_$() {
                this.$_editformValidate_$ = {};
                this.$refs.$_formValidate_$.resetFields();
                this.$_modal1_$ = true;
            },
            // 编辑楼宇
            $_editBuild_$() {
                if (this.$_bnum_$ == 0) {
                    this.$Message.error('请选择楼宇');
                    return
                }
                this.$_editformValidate_$ = {};
                this.$_editmodal_$ = true;
            },
            //切换楼宇
            $_bulid_$(item) {
                this.$_floorList_$ = []
                this.$_roomList_$ = []
                this.$_bnum_$ = item.id;
                this.$_fnum_$ = 0;
                this.$_trueBnum_$ = item.name;
                this.$_zoneId_$ = item.zoneId
                this.$_editformValidate_$ = item
                this.$_editformValidate_$.zoneId = String(this.$_editformValidate_$.zoneId)
                this.$_Flist_$()
            },
            //移除楼宇
            $_removeBuild_$() {
                if (this.$_bnum_$ == 0) {
                    this.$Message.error('请选择楼宇');
                    return
                }
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除当前楼宇吗</p><br>',
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        //修改数据库
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('移除楼宇成功!')
                                    this.$_bList_$()
                                } else {
                                    this.$Message.error('移除楼宇失败!')
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                        this.$Message.error('删除取消');
                    }
                })
            },


            //添加楼层
            $_addfloor_$() {
                if (this.$_bnum_$ == 0) {
                    this.$Message.error('请选择楼宇');
                    return
                }
                this.$refs.$_addFloorValidate_$.resetFields()
                this.$_addFloorModal_$ = true;
            },
            //移除楼层
            $_delfloor_$() {
                if (this.$_floorId_$ == 0) {
                    this.$Message.error('请选择楼层');
                    return
                }
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确认删除当前楼层吗</p><br>',
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        //修改数据库
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor/${this.$_floorId_$}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("移除楼层成功!")
                                    this.$_Flist_$()
                                } else {
                                    this.$Message.error("移除楼层失败!")
                                }
                            }
                        })
                        //修改前端
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                        this.$Message.error('删除取消');
                    }
                });
            },
            //切换楼层
            $_changeFloor_$(item) {
                this.$_fnum_$ = item.id;
                this.$_floorId_$ = item.id
                this.$_roomList_$ = []
                this.$_Rlist_$()
            },

            //添加房间
            $_addhousenum_$() {
                if (this.$_floorId_$ == 0) {
                    this.$Message.error('请选择楼层')
                    return
                }
                this.$refs.$_addFloorNumValidate_$.$_houseNum_$ = ''
                this.$refs.$_addFloorNumValidate_$.$_houseDes_$ = ''
                this.$_addFloorNumModal_$ = true;
            },
            //移除房间
            $_delHousenum_$(id) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                        <p>确认删除该房间吗</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        //修改数据库
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor/${this.$_floorId_$}/room/${id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('删除成功');
                                    this.$_Rlist_$()
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }
                        })
                        //修改前端
                        // this.$_buildList_$[this.$_bnum_$].floor[this.$_fnum_$].housenum.splice(index, 1);


                    },
                    onCancel: () => {
                        this.$Modal.remove();
                        this.$Message.error('删除取消');
                    }
                })
            },

            //新增保存
            $_save_$(type) {
                if (type == 'add') {
                    this.$refs.$_formValidate_$.validate((valid) => {
                        if (valid) {
                            //添加数据库
                            this.$_querycfg_$.mod = `zone/zone/${this.$_formValidate_$.$_parkNum_$}/building`;
                            this.$_querycfg_$.params = {
                                name: this.$_formValidate_$.$_buildName_$,
                                area: Number(this.$_formValidate_$.$_buildArea_$),
                                buildDate: this.$_formValidate_$.$_buildTime_$,
                                description: this.$_formValidate_$.$_buildDesc_$
                            };
                            this.$_fquery_$((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("添加楼宇成功!");
                                        this.$_bList_$()
                                    }
                                } else {
                                    this.$Message.success("添加楼宇失败!");
                                }
                            });
                            this.$_modal1_$ = false
                        } else {
                            this.$Message.error('保存失败');
                        }
                    })
                }
                if (type == 'edit') {
                    this.$_editformValidate_$.area = String(this.$_editformValidate_$.area)
                    this.$refs.$_editformValidate_$.validate((valid) => {
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "PUT",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.$_editformValidate_$.zoneId}/building`,
                                data: {
                                    id: this.$_editformValidate_$.id,
                                    name: this.$_editformValidate_$.name,
                                    area: this.$_editformValidate_$.area,
                                    buildDate: this.$_editformValidate_$.buildDate,
                                    description: this.$_editformValidate_$.description,
                                    // zoneId: this.$_editformValidate_$.zoneId
                                },
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("编辑楼宇成功!")
                                        this.$_editmodal_$ = false
                                    } else {
                                        this.$Message.error("编辑楼宇失败!")
                                    }
                                }
                            })
                        } else {
                            this.$Message.error('保存失败');
                        }
                    })
                }
                if (type == 'addfloor') {
                    this.$refs.$_addFloorValidate_$.validate((valid) => {
                        if (valid) {
                            //添加数据库
                            this.$_querycfg_$.mod = `zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor`;
                            this.$_querycfg_$.params = {
                                name: this.$_addFloorValidate_$.$_floorName_$,
                                description: this.$_addFloorValidate_$.$_buildDesc_$
                            };
                            this.$_fquery_$((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("添加楼层成功!");
                                        this.$_Flist_$()
                                    }
                                } else {
                                    this.$Message.success("添加楼层失败!");
                                }
                            });
                            this.$_addFloorModal_$ = false;
                        } else {
                            this.$Message.error('保存失败');
                        }
                    })
                }
                if (type == 'addHouse') {
                    this.$refs.$_addFloorNumValidate_$.validate((valid) => {
                        if (valid) {
                            //添加数据库
                            this.$_querycfg_$.mod = `zone/zone/${this.$_zoneId_$}/building/${this.$_bnum_$}/floor/${this.$_floorId_$}/room`;
                            this.$_querycfg_$.params = {
                                name: this.$_addFloorNumValidate_$.$_houseNum_$,
                                description: this.$_addFloorNumValidate_$.$_houseDes_$
                            };
                            this.$_fquery_$((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$Message.success("添加房间成功!");
                                        this.$_Rlist_$()
                                    }
                                } else {
                                    this.$Message.success("添加房间失败!");
                                }
                            })
                            //添加前端
                            // this.$_buildList_$[this.$_bnum_$].floor[this.$_fnum_$].housenum.push(this.$_addFloorNumValidate_$.$_houseNum_$);
                            this.$_addFloorNumModal_$ = false;
                            // this.$_addFloorNumValidate_$.$_houseNum_$ = '';
                        } else {
                            this.$Message.error('保存失败');
                        }
                    })
                }
            }
        }
    }
</script>

