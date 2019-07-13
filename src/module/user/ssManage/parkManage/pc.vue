<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .search {
        padding: 15px 0 15px 15px;
        margin-bottom: 15px;
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #000;
    }

    .ivu-btn {
        font-size: 14px;
    }

    .title {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        color: #333;
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
        height: 178px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .tableHead{
        color: #000;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            停车场名称：&nbsp;&nbsp;
            <Input v-model="$_parkName_$" style="width: 210px;margin-right: 2%" placeholder="请输入停车场名称"></Input>
            &nbsp;&nbsp;状态：&nbsp;&nbsp;
            <Select v-model="$_selected_$" style="width:210px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div>
            <br>
            <Row>
                <!-- 表格 -->
                <el-table
                        :header-cell-style="getRowClass"
                        header-row-class-name="tableHead"
                        :data="$_parkInfo_$"
                        ref="multipleTable"
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            type="index"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column align="center" label="缩略图">
                        <template slot-scope="scope">                          
                            <!-- <div style="width:40px;height:40px" align="center"> -->
                                <img style= "width: 110px;height: 50px;border-radius: 5px;margin: 20px 0px;" :src="scope.row.images[0].imageUrl" alt="">
                            <!-- </div> -->
                                              
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="停车场名称">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="地址">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="placeNumber"
                            label="车位数">
                    </el-table-column>
                    <el-table-column
                    align="center"
                    prop="peopleNumber"
                    label="余位">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createDate"
                            label="创建时间">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="状态">
                        <template slot-scope="scope">
                                                    <span v-if="scope.row.status==0">下架</span>
                                                    <span v-else> 上架</span>
                                                
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     align="center" width="200">
                        <template slot-scope="scope">
                            <el-button @click="$_edit_$(scope.row)" type="text" size="small">编辑</el-button>
                            <!-- <el-button @click="$_remove_$(scope.row)" type="text" size="small">删除</el-button> -->
                            <el-button v-show="scope.row.status === 0" @click=" $_start_$(scope.row)" type="text"
                                       size="small">上架
                            </el-button>
                            <el-button v-show="scope.row.status === 1" @click=" $_abandon_$(scope.row)" type="text"
                                       size="small">下架
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </Row>
            <br>
            <!-- page分页 -->
            <Row>
                <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{$_totalSize_$}}条数据</span>
                <Page align="right" :total="$_totalSize_$"
                      style="float: right"
                      show-elevator
                      :page-size="$_pageSize_$"
                      @on-page-size-change="$_pageNum_$"
                      @on-change="$_changePage_$"/>
            </Row>
        </div>
        <!-- 编辑 -->
        <el-dialog :title="$_title_$" :visible.sync="$_editmodal_$" :close-on-click-modal="false">
            <el-form ref="editForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <!-- <el-form-item label="所属园区" prop="zoneId">
                    <el-select v-model="$_editForm_$.zoneId" disabled @change="changeZone" placeholder="请选择">
                        <el-option
                                v-for="item in zoneList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item ref="fileEdit" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="editupload"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="停车场名称" prop="name">
                    <el-input v-model="$_editForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="车位数" prop="placeNumber">
                    <el-input v-model.number="$_editForm_$.placeNumber"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="$_editForm_$.address"></el-input>
                </el-form-item>
                <el-form-item label="对接厂商" prop="configDescription">
                    <el-input v-model="$_editForm_$.configDescription"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_editmodal_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_editOk_$()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {Table, Button, TableColumn, Form, Dialog, Input, FormItem, Select, Upload, Option} from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';

    export default {
        mixins: [controler],
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [TableColumn.name]: TableColumn,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
        },
        filters: {
            formatStatus(val) {
                if (val === 0) {
                    return '下架'
                }
                if (val === 1) {
                    return '上架'
                }
            }
        },
        data() {
            return {
                $_parkName_$: "", // 停车场名称
                $_selected_$: 1, // 默认选中
                $_yqSelected_$: "",
                $_userInfo_$: {},
                $_statusList_$: [ // 状态值
                    {
                        value: 1,
                        label: "全部"
                    },
                    {
                        value: 2,
                        label: "上架"
                    },
                    {
                        value: 3,
                        label: "下架"
                    }
                ],
                $_totalSize_$: 0, //数据总数
                $_pageSize_$: 12, // 默认每页条数
                $_parkInfo_$: [],//虚拟表格数据
                $_addmodal_$: false,  // 新增停车场弹窗
                $_addsfmodal_$: false,  // 
                $_title_$: "停车场基本信息",// 新增停车场弹窗标题
                $_sftitle_$: "收费标准",// 收费标准弹窗标题
                $_file_$: [],
                dialogImageUrl: '',
                baseUrl: 'http://img.yhcode.com:88/',
                id: 0, //用于存放zoneId
                zoneList: [],
                rows: '',
                buildId: 0, // 大楼id
                floorId: 0, // 楼层id
                buildSelect: [], // 大楼列表
                floorSelect: [], //楼层列表
                roomSelect: [], //房间列表
                $_addForm_$: {
                    name: '',
                    address: '',
                    description: '',
                    placeNumber: '',
                    images: '',
                    file: '',
                    configDescription: '',
                    zoneId: '',
                    floorId: '',
                    roomIds: '',
                    buildingId: ''
                },
                $_addsfForm_$: {
                    externalDesc: '',
                    tempDesc: ''
                },
                roomList: [],
                $_addsfRuleValidate_$: {
                    externalDesc: [
                        {required: true, message: '临时车辆收费不能为空！', trigger: 'change'},
                        //{type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '临时车辆收费不能超过20字', trigger: 'change'
                        }
                    ],
                    tempDesc: [
                        {required: true, message: '外来车辆收费不能为空!', trigger: 'change'},
                        //{type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '外来车辆收费不能超过20字', trigger: 'change'
                        }
                    ]

                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '请输入停车场名称!', trigger: 'change'},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'
                        }
                    ],
                    placeNumber: [
                        {required: true, message: '车位数不能为空!', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {type: 'number', max: 999999, message: '数字不能超过6位数', trigger: 'change'}
                    ],
                    address: [
                        {required: true, message: '地址不能为空!', trigger: 'change'},
                        //{type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 100, message: '地址不能超过100字', trigger: 'change'
                        }
                        // {required: true, message: '地址不能为空!', trigger: 'change'}
                    ],
                    zoneId: [
                        {required: true, message: '园区不能为空!', trigger: 'change'},
                    ],
                    buildingId: [{required: true, message: "必填", trigger: "change"}],
                    roomIds: [{required: true, message: "必填", trigger: "change"}],
                    floorId: [{required: true, message: "必填", trigger: "change"}]
                },
                $_editmodal_$: false,  // 编辑弹窗
                $_editForm_$: {},
                imageList: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                zoneId: 0
            };

        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_list_$()
        },
        methods: {
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#f8f8f9'
                } else {
                    return ''
                }
            },
            // 获取大楼列表

            $_bList_$() {
                this.buildSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.id}/building`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {value: arr[i].id, label: arr[i].name}
                                this.buildSelect.push(temp)
                            }
                        } else {
                            this.$Message.error('获取大楼列表失败!');
                        }
                    }
                })
            },
            // 获取楼层列表
            $_fList_$() {
                this.floorSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.id}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {value: arr[i].id, label: arr[i].name}
                                this.floorSelect.push(temp)
                            }
                        } else {
                            this.$Message.error('获取楼层列表失败!');
                        }
                    }
                })
            },
            // 获取房间列表
            $_rList_$() {
                this.roomSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.id}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {value: arr[i].id, label: arr[i].name}
                                this.roomSelect.push(temp)
                            }
                        } else {
                            this.$Message.error('获取房间列表失败!');
                        }
                    }
                })
            },
            // 更改园区
            changeZone(value) {
                this.zoneId = value;
                this.$_list_$()

            },
            // 更改大楼
            changeBuild(value) {
                console.log(value);
                this.buildId = value
                this.floorSelect = []
                this.roomSelect = []
                this.$_addForm_$.floorId = ''
                this.roomList = []
                this.$_fList_$()

            },
            // 更该楼层
            changeFloor(value) {
                console.log(value);
                this.floorId = value
                this.roomSelect = []
                this.roomList = []
                this.$_rList_$()
            },
            // 获取停车场列表
            $_list_$(status = 1) {
                this.$_querycfg_$.mod = `zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_totalSize_$ = rsp.data.data.total
                            if (status != 1) {
                                status == 2 ? status = 1 : status = 0;
                                this.$_parkInfo_$ = [];
                                for (let i = 0; i < rsp.data.data.records.length; i++) {
                                    if (rsp.data.data.records[i].status == status) {
                                        this.$_parkInfo_$.push(rsp.data.data.records[i]);
                                    }
                                }
                            } else {
                                this.$_parkInfo_$ = rsp.data.data.records

                            }
                            delete  this.$_querycfg_$.params.name;
                        }
                        else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            //   搜索
            $_search_$() {
                if (this.$_parkName_$) {
                    this.$_querycfg_$.params.name = this.$_parkName_$;
                }
                if (this.$_selected_$ != 1) {
                    this.$_list_$(this.$_selected_$);
                    return;
                }
                this.$_list_$();
            },
            // 停车场编辑
            $_edit_$(row) {
                this.rows = JSON.parse(JSON.stringify(row));
                if (this.rows.images.length > 0) {
                    for (let i = 0; i < this.rows.images.length; i++) {
                        this.imageList.push({
                            url: this.rows.images[i].imageUrl
                        })
                    }
                }
                this.roomList = []
                if(this.rows.roomIds){
                    var arr = this.rows.roomIds.split(',')
                    console.log(arr)
                    for (var i = 0; i < arr.length; i++) {
                        var b = Number(arr[i])
                        this.roomList.push(b)
                    }
                }
                
                this.$_editForm_$ = this.rows
                console.log(this.$_editForm_$)
                // console.log(this.$_editForm_$)
                this.$_file_$ = []
                // console.log(row)
                this.$_file_$ = this.rows.images
                this.id = this.rows.zoneId
                // this.buildId = this.rows.buildingId
                // this.floorId = this.rows.floorId
                // this.$_bList_$()
                // this.$_fList_$()
                // this.$_rList_$()
                // console.log(this.$_file_$)
                this.$_editmodal_$ = true
            },
            // 停车场删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/parkinglot/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除成功!")
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            // 编辑确定
            $_editOk_$() {
                this.$_editForm_$.file = '123'
                this.$_editForm_$.roomIds = this.roomList.join(',')
                this.$set(this.$_editForm_$, 'images', this.$_file_$)
                console.log(this.$_editForm_$)
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: this.$_global_$.serverPath + `/zone/zone/${this.$_editForm_$.zoneId}/parkinglot`,
                            data: {
                                id: this.$_editForm_$.id,
                                name: this.$_editForm_$.name,
                                placeNumber: this.$_editForm_$.placeNumber,
                                description: this.$_editForm_$.description,
                                zoneId: this.$_editForm_$.zoneId,
                                buildingId: this.$_editForm_$.buildingId,
                                floorId: this.$_editForm_$.floorId,
                                roomIds: this.$_editForm_$.roomIds,
                                address: this.$_editForm_$.address,
                                status: this.$_editForm_$.status,
                                images: this.$_editForm_$.images
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_editmodal_$ = false
                                    for (let key in this.$_editForm_$) {
                                        this.$_editForm_$[key] = ''
                                    }
                                    this.$Message.success('数据更新成功!');
                                    this.$_list_$()
                                } else {
                                    this.$_editmodal_$ = false
                                    this.$Message.error('数据更新失败!');
                                }
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            // 编辑取消
            $_editCancel_$() {
                this.$refs.editForm.resetFields();
                this.$_list_$();
            },
            // 下架
            $_abandon_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${row.zoneId}/parkinglot/${row.id}/offline`;
                        this.$_querycfg_$.params = {}
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('下线成功!');
                                    this.$_list_$()
                                }
                                else {
                                    this.$Message.error('下线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            // 上架
            $_start_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${row.zoneId}/parkinglot/${row.id}/online`;
                        this.$_querycfg_$.params = {}
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('上线成功!');
                                    this.$_list_$()
                                }
                                else {
                                    this.$Message.error('上线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            // 阻止upload的自己上传，进行再操作
            beforeupload(file) {
            },
            // 阻止upload的自己上传，进行再操作
            beforeuploadEdit(file) {
            },
            // 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addForm_$.file = res.data;
                this.fileChange(fileList);
                this.$refs.file.clearValidate();
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.fileEdit.clearValidate();
            },
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.baseUrl + temp_str}
                                console.log(a)

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                console.log(this.$_file_$)
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.baseUrl + temp_str}
                                console.log(a)

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                console.log(this.$_file_$)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                                console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                console.log(this.$_file_$)
                this.$set(this.$_addForm_$, 'images', this.$_file_$)
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = {}
                let b = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                                // b= {url: temp_str}
                                console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                console.log(this.$_file_$)
                // this.imageList.pop(b)
                this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },
        },
        watch: {
            $_editmodal_$(e) {
                if (e == false) {
                    this.imageList = [];
                }
            }
        }
    };
</script>