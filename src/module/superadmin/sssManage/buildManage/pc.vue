<style scoped>

    .search {
        font-size: 14px;
    }

    .buildList {
        margin-top: 10px;
        /*height: 1000px;*/
        /*border-right: 1px solid #ececec;*/
    }

    .buildList .list li p {
        line-height: 30px;
        font-weight: bold;
        width: 90px;
        border-bottom: 1px solid #efefef;
    }

    .buildList .list li img {
        width: 100%;
        height: 70px;
        border-radius: 5px;
        margin-top: 20px;
    }

    .floor {
        background: #d6ebfe;
        height: 60px;
        padding: 15px 10px 15px;
        box-sizing: border-box;
    }

    .house {
        margin-top: 20px;
        background: #f7f7f7;
        height: 30px;
        box-sizing: border-box;
    }

    .housetext {
        line-height: 30px;
        font-weight: bold;
        margin-left: 10px;
    }

    .housenum {

    }

    .housenum li {
        position: relative;
        width: 120px;
        height: 70px;
        float: left;
        margin-top: 2%;
        margin-right: 2%;
        border: 1px solid #efefef;
        border-radius: 5px;
        text-align: center;
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

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

</style>
<template>
    <div class="search">
        <!-- 搜索 -->
        <div>
            所属园区:
            <Select @on-change='changeZone' v-model="$_selected_$" style="width:150px">
                <Option v-for="item in statusList" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            <!--&nbsp;&nbsp;楼房名称:-->
            <!--<Input v-model="$_buildName_$" placeholder="请输入" style="width: 150px"></Input>-->
            <!--&nbsp;&nbsp;楼层名称:-->
            <!--<Input v-model="$_floorName_$" placeholder="请输入" style="width: 150px"></Input>-->
            <!--&nbsp;&nbsp;房间号:-->
            <!--<Input v-model="$_roomId_$" placeholder="请输入" style="width: 150px"></Input>-->

            <!--<Button type="primary" @click="$_search_$()">搜索</Button>-->
        </div>
        <!-- 内容 -->
        <Row>
            <Col span="4" style="margin-right: 4%">
                <div class="buildList">
                    <Button type="ghost" @click="$_addBuild_$()" style="width: 100%">添加楼宇</Button>
                    <ul class="list">
                        <li v-for="(item, index) in $_buildList_$" :key="index" @click="$_bulid_$(item)"
                            style="cursor: pointer;">
                            <img v-if="item.images.length>0" :src="item.images[0].imageUrl">
                            <img v-else src="./img.png" alt="">
                            <Col style="width:100%;" align="center"><p>{{item.name}}</p></Col>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col v-if="isHaveBuild" span="19">
                <Row style="padding-right: 10px">
                    <Col span="18" style="margin-top: 14px">楼宇名称:
                        <span style="font-weight: bold">{{$_trueBnum_$}}</span>
                    </Col>
                    <Col span="6" align="right">
                        <Button type="primary" @click="$_editBuild_$()">编辑楼宇</Button>
                        <Button type="ghost" @click="$_removeBuild_$($_bnum_$)">移除楼宇</Button>
                    </Col>
                </Row>
                <br>
                <Row class="floor">
                    <Col span="18">
                        <Button type="text" v-for="(item, index) in $_floorList_$"
                                :key="index" @click="$_changeFloor_$(item)">
                            {{item.name}}
                        </Button>
                    </Col>
                    <Col span="6" align="right">
                        <Button type="primary" @click="$_addfloor_$()">添加楼层</Button>
                        <Button type="ghost" @click="$_delfloor_$()">移除楼层</Button>
                    </Col>
                </Row>
                <Row class="house">
                    <Col span="10" class="housetext">房间列表</Col>
                </Row>
                <Row>
                    <ul class="housenum">
                        <li v-for="(item, index) in $_roomList_$" :key="index">
                            <b>{{item.name}}</b>
                            <p @click="$_delHousenum_$(item.id)">x</p>
                        </li>
                        <li @click="$_addhousenum_$">
                            <b style="font-size:40px; font-weight: normal; color: #666; cursor:pointer"> + </b>
                        </li>
                    </ul>
                </Row>
            </Col>
        </Row>
        <!--&lt;!&ndash; 添加楼宇 &ndash;&gt;-->
        <!--<Modal v-model="$_modal1_$" title="添加楼宇" :mask-closable="false">-->
            <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">-->
                <!--<FormItem label="所属园区" prop="$_parkNum_$">-->
                    <!--<Select v-model="formValidate.$_parkNum_$" placeholder="请选择">-->
                        <!--<Option v-for="item in statusList" :value="item.value" :key="item.value" slot>{{ item.label-->
                            <!--}}-->
                        <!--</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="楼宇名称" prop="$_buildName_$">-->
                    <!--<Input v-model="formValidate.$_buildName_$" placeholder="请输入楼宇名称"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="预览图:" prop="file">-->
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--:action=this.$_global_$.imgUploadPath-->
                            <!--list-type="picture-card"-->
                            <!--:show-file-list="showimg"-->
                            <!--ref="addform"-->
                            <!--:limit="1"-->
                            <!--:before-upload="beforeupload"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:on-success="uploadSuccess"-->
                            <!--:on-exceed="uploadexceed"-->
                            <!--accept="image/png,image/gif,image/jpg,image/jpeg">-->
                        <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                <!--</FormItem>-->
                <!--<FormItem label="建筑面积" prop="$_buildArea_$">-->
                    <!--<Input v-model="formValidate.$_buildArea_$" placeholder="请输入建筑面积" number></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="建成时间">-->
                    <!--<DatePicker @on-change="onChange" type="date" placement="bottom" placeholder="请选择建成时间"-->
                                <!--style="width: 200px"></DatePicker>-->
                <!--</FormItem>-->
                <!--<FormItem label="备注信息" prop="$_buildDesc_$">-->
                    <!--<Input v-model="formValidate.$_buildDesc_$" type="textarea" placeholder="请填写备注信息"></Input>-->
                <!--</FormItem>-->
            <!--</Form>-->
            <!--<div slot="footer" align="center">-->
                <!--<Button type="primary" @click="$_save_$('add')">保存</Button>-->
            <!--</div>-->
        <!--</Modal>-->
        <!--&lt;!&ndash; 编辑楼宇 &ndash;&gt;-->
        <!--<Modal v-model="$_editmodal_$" title="编辑楼宇" :mask-closable="false">-->
            <!--<Form ref="editformValidate" :model="editformValidate" :rules="editBuildValidate"-->
                  <!--:label-width="100">-->
                <!--<FormItem label="楼宇名称" prop="name">-->
                    <!--<Input v-model="editformValidate.name" type="text" placeholder="请输入楼宇名称"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="预览图:" prop="file">-->
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--:action=this.$_global_$.imgUploadPath-->
                            <!--list-type="picture-card"-->
                            <!--:show-file-list="true"-->
                            <!--ref="editform"-->
                            <!--:limit="1"-->
                            <!--:file-list="imagelist"-->
                            <!--:before-upload="beforeupload"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:on-success="uploadSuccess"-->
                            <!--:on-exceed="uploadexceed"-->
                            <!--accept="image/png,image/gif,image/jpg,image/jpeg">-->
                        <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                <!--</FormItem>-->
                <!--<FormItem label="建筑面积" prop="area">-->
                    <!--<Input v-model="editformValidate.area" placeholder="请输入建筑面积" number></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="建成时间">-->
                    <!--<DatePicker @on-change="onChange" type="date" v-model="editformValidate.buildDate"-->
                                <!--placement="bottom" placeholder="请选择建成时间"-->
                                <!--style="width: 200px"></DatePicker>-->
                <!--</FormItem>-->
                <!--<FormItem label="备注信息" prop="description">-->
                    <!--<Input v-model="editformValidate.description" type="textarea" placeholder="请填写备注信息"></Input>-->
                <!--</FormItem>-->
            <!--</Form>-->
            <!--<div slot="footer" align="center">-->
                <!--<Button type="primary" @click="$_save_$('edit')">保存</Button>-->
            <!--</div>-->
        <!--</Modal>-->
        <!-- 添加楼层 -->
        <Modal v-model="$_addFloorModal_$" title="添加楼层" :mask-closable="false">
            <Form ref="$_addFloorValidate_$" :model="$_addFloorValidate_$" :rules="ruleValidate" :label-width="100">
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
        <Modal v-model="$_addFloorNumModal_$" title="添加房间" :mask-closable="false">
            <Form ref="$_addFloorNumValidate_$" :model="$_addFloorNumValidate_$" :rules="ruleValidate"
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
    import 'element-ui/lib/theme-chalk/index.css';
    import {Upload} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Upload.name]: Upload,
        },
        data() {
            // const validateimg = (rule, value, callback) => {
            //     if (this.$_file_$ != "") {
            //         callback();
            //     } else {
            //         callback('请上传图片,支持.png,.jpg格式');
            //     }
            // };
            // const validateaddr = (rule, value, callback) => {
            //     if (this.formValidate.$_parkNum_$ != "") {
            //         callback();
            //     } else {
            //         callback('请选择所属园区');
            //     }
            // };
            return {
                isHaveBuild: false,
                // showimg: true,//显示上传图片列表
                $_file_$: [],
                imagelist: [],//图片回显
                $_selected_$: '',
                //层号
                $_fnum_$: 0,
                //索引楼号
                $_bnum_$: 0,
                //真实显示楼名称
                $_trueBnum_$: '',
                $_zoneId_$: 0, // 园区id
                $_floorId_$: 0, // 楼层id
                $_modal1_$: false,
                $_editmodal_$: false,
                $_addFloorModal_$: false,
                $_addFloorNumModal_$: false,
                statusList: [], // 园区选择
                $_buildName_$: '', //楼房名称
                $_floorName_$: '', //楼层名称
                $_roomId_$: '', //房间号
                $_buildList_$: [  // 楼宇列表
                ],
                $_floorList_$: [], // 楼层列表
                $_roomList_$: [], // 房间列表
                // formValidate: {
                //     $_parkNum_$: "",
                //     $_buildName_$: "",
                //     $_buildArea_$: "",
                //     $_buildTime_$: "",
                //     $_buildDesc_$: ""
                // },
                // editformValidate: {},  // 编辑楼宇表单
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
                ruleValidate: {
                    // file: [
                    //     {required: true, validator: validateimg, trigger: 'change'}
                    // ],
                    // $_parkNum_$: [
                    //     {validator: validateaddr, trigger: 'change'}
                    // ],
                    // $_buildName_$: [
                    //     {required: true, type: 'string', message: '请输入楼宇名称', trigger: 'blur'},
                    //     {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                    //     {validator: this.$_validatestr_$, trigger: 'change'}
                    // ],
                    // $_buildArea_$: [
                    //     {required: true, type: 'number', message: '必须是数字'},
                    //     {type: 'number', max: 999999999, message: '面积不能超过999999999', trigger: 'change'},
                    //     {validator: this.$_validatestr_$, trigger: 'change'}
                    // ],
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
                    $_buildDesc_$: [
                        { message: '请输入备注信息', trigger: 'blur'},
                        { max: 200, message: '不能超过200字', trigger: 'blur'},
                        // {validator: this.$_validatestr_$, trigger: 'change'}
                    ]
                },
                // editBuildValidate: {  // 编辑楼宇验证
                //     // zoneId: [
                //     //     {required: true, message: '请选择所属园区', trigger: 'blur'}
                //     // ],
                //     file: [
                //         {required: true, validator: validateimg, trigger: 'change'}
                //     ],
                //     name: [
                //         {required: true, message: '请输入楼宇名称', trigger: 'blur'},
                //         {type: 'string', max: 20, message: '不能超过20字', trigger: 'blur'},
                //         {validator: this.$_validatestr_$, trigger: 'change'}
                //     ],
                //     area: [
                //         {required: true, type: 'number', message: '必须是数字'},
                //         {type: 'number', max: 999999999, message: '面积不能超过999999999', trigger: 'change'},
                //         {validator: this.$_validatestr_$, trigger: 'change'}
                //     ],
                //     description: [
                //         {required: true, message: '请输入备注信息', trigger: 'blur'},
                //         {type: 'string', max: 200, message: '不能超过200字', trigger: 'blur'},
                //         {validator: this.$_validatestr_$, trigger: 'change'}
                //     ]
                // },
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
            }
        },
        created() {
            this.$_zoneList_$()
        },
        methods: {
            // beforeupload() {
            //     this.showimg = true;
            // },
            // // 上传超出限制
            // uploadexceed(file, fileList) {
            //     if (file.length == 1) {
            //         this.$Message.error("只能上传一张!")
            //     }
            // },
            // // 移除
            // handleRemove(file, fileList) {
            //     this.fileRmove(fileList);
            // },
            // // 上传图片成功
            // uploadSuccess(res, file, fileList) {
            //     this.fileChange(fileList);
            // },
            // // 设置photo值
            // fileChange(fileList) {
            //     let a = '';
            //     if (fileList.length > 0) {
            //         for (let i = 0; i < fileList.length; i++) {
            //             let temp_str = '';
            //             if (fileList[i].response) {
            //                 if (fileList[i].response.code === 0) {
            //                     temp_str = fileList[i].response.data;
            //                     a = {imageUrl: this.$_global_$.imgPath + temp_str};
            //                 }
            //             }
            //         }
            //     }
            //     this.$_file_$.push(a);
            // },
            // // 移除设置photo值
            // fileRmove(fileList) {
            //     let a = '';
            //     if (fileList.length > 0) {
            //         for (let i = 0; i < fileList.length; i++) {
            //             let temp_str = '';
            //             if (fileList[i].response) {
            //                 if (fileList[i].response.code === 0) {
            //                     temp_str += fileList[i].response.data;
            //                     a = this.$_global_$.imgPath + temp_str;
            //                 }
            //             }
            //         }
            //     }
            //     this.$_file_$.pop()
            // },
            // onChange(res) {
            //     this.formValidate.$_buildTime_$ = res + " 00:00:00";
            //     this.editformValidate.buildDate = res + " 00:00:00";
            // },
            // 园区切换
            changeZone(value) {
                this.$_zoneId_$ = value
                this.$_selected_$ = value
                this.$_bList_$()
            },

            // 园区列表
            $_zoneList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 9999999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                }
                                this.statusList.push(temp)
                            }
                            this.$_zoneId_$ = arr[0].id;
                            this.$_selected_$ = arr[0].id;
                            this.$_bList_$()
                        }
                    }
                })
            },
            // 大楼列表
            $_bList_$() {
                this.$_buildList_$ = []
                this.$_floorList_$ = []
                this.$_roomList_$ = []
                this.$_trueBnum_$ = ''

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
                            this.isHaveBuild = false
                            if (rsp.data.data !== []) {
                                this.$_buildList_$ = rsp.data.data
                                this.$_trueBnum_$ = rsp.data.data[0].name  // 大楼名称
                                this.$_bnum_$ = rsp.data.data[0].id  // 大楼id
                                this.$_zoneId_$ = rsp.data.data[0].zoneId  // 园区ID
                                // this.editformValidate = rsp.data.data[0]
                                this.editformValidate = JSON.parse(JSON.stringify(rsp.data.data[0]));
                                this.editformValidate.zoneId = String(this.editformValidate.zoneId)
                                this.$_file_$ = [];
                                this.imagelist = [];
                                this.imagelist.push({url: this.editformValidate.images[0].imageUrl});
                                this.$_file_$.push({imageUrl: this.editformValidate.images[0].imageUrl});
                                this.$_Flist_$()
                                this.isHaveBuild = true
                            }
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            // 楼层列表
            $_Flist_$() {
                this.$_floorList_$ = [];
                this.$_floorId_$ = 0;

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
                            if (rsp.data.data !== []) {
                                this.$_floorList_$ = rsp.data.data
                                this.$_floorId_$ = rsp.data.data[0].id
                                this.$_Rlist_$()
                            }
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
                this.$root.$_Route_$("superadmin", "jump", "lyxz", {zoneList: this.statusList});
            },
            // 编辑楼宇
            $_editBuild_$() {
                if (this.$_bnum_$ == 0) {
                    this.$Message.error('请选择楼宇');
                    return
                }
                this.$root.$_Route_$("superadmin", "jump", "lybj", {row:this.editformValidate,imagelist:this.imagelist,zoneList: this.statusList});

            },
            //切换楼宇
            $_bulid_$(item) {
                this.$_floorList_$ = []
                this.$_roomList_$ = []
                this.$_bnum_$ = item.id;
                this.$_fnum_$ = 0;
                this.$_trueBnum_$ = item.name;
                this.$_zoneId_$ = item.zoneId
                this.editformValidate = JSON.parse(JSON.stringify(item));
                this.$_file_$ = [];
                this.imagelist = [];
                this.imagelist.push({url: this.editformValidate.images[0].imageUrl});
                this.$_file_$.push({imageUrl: this.editformValidate.images[0].imageUrl});
                // this.editformValidate = item
                this.editformValidate.buildDate = String(this.editformValidate.buildDate);
                this.editformValidate.zoneId = String(this.editformValidate.zoneId)
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
                // this.$refs.$_addFloorNumValidate_$.$_houseNum_$ = ''
                // this.$refs.$_addFloorNumValidate_$.$_houseDes_$ = ''
                //

                this.$_addFloorNumValidate_$ = {
                    $_houseNum_$: "",
                    $_houseDes_$: ""
                },
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
            // checkTime(i) {
            //     if (i < 10) {
            //         i = "0" + i
            //     }
            //     return i;
            // },

            //新增保存
            $_save_$(type) {
                // if (type == 'add') {
                //     this.$refs.formValidate.validate((valid) => {
                //         if (valid) {
                //             //添加数据库
                //             this.$_querycfg_$.mod = `zone/zone/${this.formValidate.$_parkNum_$}/building`;
                //             this.$_querycfg_$.params = {
                //                 name: this.formValidate.$_buildName_$,
                //                 area: Number(this.formValidate.$_buildArea_$),
                //                 images: this.$_file_$,
                //                 buildDate: this.formValidate.$_buildTime_$,
                //                 description: this.formValidate.$_buildDesc_$
                //             };
                //
                //             var _this = this;
                //
                //             this.$_fquery_$((rsp) => {
                //                 if (rsp.status === 200) {
                //                     if (rsp.data.code === 0) {
                //                         this.$Message.success("添加楼宇成功!");
                //                         this.$_bList_$()
                //                     }
                //                 } else {
                //                     this.$Message.success("添加楼宇失败!");
                //                 }
                //             });
                //             this.$_modal1_$ = false
                //         } else {
                //             this.$Message.error('保存失败');
                //         }
                //     })
                // }
                // if (type == 'edit') {
                //     var transdate = new Date(this.editformValidate.buildDate);
                //     this.editformValidate.buildDate = transdate.getFullYear() + '-' + this.checkTime(transdate.getMonth() + 1) + '-' + this.checkTime(transdate.getDate()) + " 00:00:00";
                //     this.$refs.editformValidate.validate((valid) => {
                //         if (valid) {
                //             this.$_sendQuery_$({
                //                 method: "PUT",
                //                 url: `${this.$_global_$.serverPath}/zone/zone/${this.$_zoneId_$}/building`,
                //                 data: {
                //                     id: this.editformValidate.id,
                //                     name: this.editformValidate.name,
                //                     images: this.$_file_$,
                //                     area: this.editformValidate.area,
                //                     buildDate: this.editformValidate.buildDate,
                //                     description: this.editformValidate.description,
                //                     zoneId: this.$_zoneId_$
                //                 },
                //                 headers: {"Content-type": "application/json"}
                //             }).then((rsp) => {
                //                 if (rsp.status === 200) {
                //                     if (rsp.data.code === 0) {
                //                         this.$Message.success("编辑楼宇成功!")
                //                         this.$_trueBnum_$ = this.editformValidate.name;
                //                         this.$_editmodal_$ = false
                //                     } else {
                //                         this.$Message.error("编辑楼宇失败!")
                //                     }
                //                 }
                //             })
                //         } else {
                //             this.$Message.error('保存失败');
                //         }
                //     })
                // }
                if (type == 'addfloor') {
                    for (var i = 0; i < this.$_floorList_$.length; i++) {
                        if (this.$_addFloorValidate_$.$_floorName_$ == this.$_floorList_$[i].name) {
                            this.$Message.warning('楼层名不能重复');
                            return;
                        }
                    }
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

                            var _this = this;
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