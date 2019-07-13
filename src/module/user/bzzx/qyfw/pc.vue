<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';

    }

    .bg {

        background: #efefef;
        padding: 10px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mr5 {
        margin-right: 5px;
    }

    .icon {
        color: rgb(80, 80, 192);
    }

    .bg-lp {
        background: rgba(230, 243, 252, 1);
        padding: 5px;
        border: 1px solid rgba(212, 240, 252, 1);
    }

    .mr5 {
        margin-right: 5px;
    }

    .ivu-icon {
        font-size: 20px;
        vertical-align: middle;
    }

    .top-line span {
        vertical-align: middle;
        width: 40%;
    }

    .top-line Select {
        vertical-align: middle;
    }

    .ivu-input-wrapper {
        vertical-align: middle;
        width: 60%;
    }

    .top-height {
        height: 76px;
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
<template>
    <div class="zdtb">
        <!-- 左右分栏 -->
        <Row>
            <!-- 树形控件 -->
            <Col span="5" style="border-right:1px solid #ccc;height: 500px;">
                <Tree :data="$_data2_$" :load-data="loadData" @on-select-change="$_checkItem_$"></Tree>
            </Col>
            <Col span="18" offset="1">
                <br>
                <Row type="flex" align="middle">
                    <Col span="16" offset="16" align="right">
                        <Col span="4" offset="2">
                            <Button type="primary" @click="$_sortManage_$"> 分类管理</Button>
                        </Col>
                        <Col span="4" offset="2">
                            <Button  style="color: #059BFA; border: 1px solid #059BFA" type="ghost" @click="$_addQuestion_$('uploadxls')">+添加服务</Button>
                        </Col>
                    </Col>
                </Row>
                <br>
                <Row>
                    <!-- 表格 -->
                    <Col>
                        <Table ref="$_selection_$" :columns="$_columns7_$" :data="$_data6_$"></Table>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col span="24">
                        <span style="float: left; font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
                        <Page align="right" :total="total"
                              style="float: right"
                              show-elevator show-sizer
                              @on-page-size-change="$_pageNum_$"
                              @on-change="$_changePage_$"/>
                    </Col>
                </Row>
            </Col>
        </Row>
        <!-- 新增服务 -->
        <el-dialog title="新增服务" :visible.sync="$_addmodal_$">
            <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="服务名称" prop="name">
                    <el-input v-model="$_addForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="服务图标" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="true"
                                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :limit="1"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="服务分类">
                    <el-select v-model="$_addForm_$.parent" prop="parent" @change="changeParent" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.child" prop="child" placeholder="请选择">
                        <el-option v-for="item in childSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务介绍">
                    <el-input v-model="$_addForm_$.description"></el-input>
                </el-form-item>
                <el-form-item label="服务排序号">
                    <el-input v-model="$_addForm_$.sortNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click=" $_addmodal_$= false">取 消</el-button>
                <el-button type="primary" @click="$_addOK_$()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 服务编辑 -->
        <el-dialog title="服务更新">
            <el-form ref="editForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="服务名称" prop="name">
                    <el-input v-model="$_editForm_$.name"></el-input>
                </el-form-item>
                <el-form-item ref="file" label="预览图" prop="file">
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
                            :limit="1"
                             accept="image/png,image/gif,image/jpg,image/jpeg">

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="服务分类">
                    <el-select v-model="$_editForm_$.parent" prop="parent" @change="changeParent" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_editForm_$.categoryId" prop="child" placeholder="请选择">
                        <el-option v-for="item in childSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务介绍">
                    <el-input v-model="$_editForm_$.description"></el-input>
                </el-form-item>
                <el-form-item label="服务排序号">
                    <el-input v-model="$_editForm_$.sortNum"></el-input>
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
    import controler from './controler.js';
    //import  this.$_sendQuery_$ from ' this.$_sendQuery_$'
    import {Button, Form, Dialog, Input, FormItem, Upload, Select, Option} from 'element-ui';

    export default {
        mixins: [controler],
        components: {
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Upload.name]: Upload,
            [Select.name]: Select,
            [Option.name]: Option
        },
        data() {
            return {
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                total: 0,
                $_data2_$: [
                    {
                        title: '所有分类',
                        expand: true,
                        loading: false,
                        children: []
                    }
                ], // 树形控件数据
                $_columns7_$: [  // 表头
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                    },
                    {
                        title: '服务名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '服务图标',
                        key: 'imageUrl',
                        align: 'center',
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: params.row.imageUrl,
                                    width: "40px",
                                    height: '40px'
                                },
                                props: {
                                    type: 'primary',
                                    size: "small"
                                },
                                style: {
                                    verticalAlign: "middle"
                                }
                            })
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.status == 0) {
                                a = "下架";
                            }
                            if (params.row.status == 1) {
                                a = "上架";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '浏览次数',
                        key: 'viewCount',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 250,
                        render: (h, params) => {
                            var a
                            if (params.row.status == 0) {
                                a = '上架'
                            }
                            if (params.row.status == 1) {
                                a = '下架'
                            }
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
                                            this.$_show_$(params.row)
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
                                            if (params.row.status == 0) {
                                                this.$_upShelf_$(params.row)
                                            }
                                            if (params.row.status == 1) {
                                                this.$_downShelf_$(params.row)
                                            }
                                        }
                                    }
                                }, a)
                            ]);
                        }
                    }
                ],
                $_data6_$: [], // 表格数据
                $_addmodal_$: false, // 添加
                $_addForm_$: {  //新增表单
                    name: '',
                    file: '',
                    parent: '',
                    child: '',
                    description: '',
                    sortNum: ''
                },
                $_addRuleValidate_$: {
                    name: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ], file: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ], parent: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ], child: [
                        {required: true, message: '必填', trigger: 'blur'}
                    ],
                },
                parentSelect: [], // 一级分类列表
                parent: [],
                zoneId: 0,
                categoryId: 0,
                childSelect: [], // 子分类列表
                $_file_$: [], // 图片上传
                baseUrl: 'http://img.yhcode.com:88/',
                $_editmodal_$: false, // 编辑
                $_editForm_$: {}, // 编辑表单
                $_userInfo_$: {}, // 编辑表单
                imageList: [], // 编辑用图片回显
                child: 0,  // 子分类id
                parentId: 0,  // 一级分类id
            }
        },
        created() {
            this.$_global_$.serverPath
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_list_$();
            this.tableList()
        },
        methods: {
            // 获取一级分类
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/zone/' + this.$_userInfo_$.zoneId + '/service/category/' + this.categoryId + '/pageList',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                var select = {}
                                var a = {}
                                temp = {
                                    title: arr[i].name,
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId,
                                    loading: false,
                                    children: []
                                }
                                select = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                }
                                a = {
                                    id: arr[i].id,
                                    zoneId: arr[i].zoneId
                                }
                                this.$_data2_$[0].children.push(temp)
                                this.parentSelect.push(select)
                                this.parent.push(a)
                            }
                        }
                    }
                })
            },
            $_checkItem_$(e) {
                this.categoryId = e[0].id;


                this.tableList()
            },
            // 获取一级子分类
            loadData(item, callback) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/zone/${item.zoneId}/service/category/${item.id}/pageList`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records;
                            var data = []
                            if (arr.length == 0) {
                                this.$Message.success("该分类下暂无子分类!")
                            } else {
                                for (var i = 0; i < arr.length; i++) {
                                    var temp = {}
                                    temp = {
                                        title: arr[i].name,
                                        parentId: arr[i].parentId,
                                        id: arr[i].id,
                                        zoneId: arr[i].zoneId
                                    }
                                    data.push(temp)
                                }
                            }
                            callback(data)
                        }
                    }
                })
            },
            // 获取一级分类下的子分类
            changeParent(value) {
                var arr = this.parent
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == value) {
                        this.zoneId = arr[i].zoneId
                    }
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/service/category/${value}/pageList`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            return;
                            this.childSelect = []
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                }

                                this.childSelect.push(temp)
                            }
                        }
                    }
                })
            },
            // 列表数据
            tableList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.$_userInfo_$.zoneId}/category/${this.categoryId}/enterprise/service/list`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records;
                            this.total = rsp.data.data.total
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e
                this.tableList();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.tableList();
            },
            // 分类管理
            $_sortManage_$() {
                this.$root.$_Route_$('user', 'jump', 'qyfwflgl', {})
            },
            // 添加服务
            $_addQuestion_$(formName) {
                this.$root.$_Route_$('user', 'jump', 'qyfwtjqy', {})
            },
            // 添加确定
            $_addOK_$() {
                this.$_addForm_$.imageUrl = this.$_file_$.join(';')
                if (this.$_addForm_$.sortNum !== '') {
                    this.$_addForm_$.sortNum = Number(this.$_addForm_$.sortNum)
                } else {
                    this.$_addForm_$.sortNum = 0
                }
                this.$_addForm_$.file = '1'
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/enterprise/service`,
                            data: {
                                name: this.$_addForm_$.name,
                                categoryId: this.$_addForm_$.child,
                                imageUrl: 'http://localhost.com/hchs.jpg',
                                // imageUrl: this.$_addForm_$.imageUrl,
                                description: this.$_addForm_$.description,
                                sortNum: this.$_addForm_$.sortNum
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
                                    this.$_addmodal_$ = false
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    } else {
                    }
                })

            },
            // 编辑
            $_show_$(row) {
                this.$root.$_Route_$('user', 'jump', 'qyfwbj', {row: row})
            },
            // 编辑保存
            $_editOk_$() {
                this.$_editForm_$.imageUrl = this.$_file_$.join(';')
                if (this.$_addForm_$.sortNum !== '') {
                    this.$_addForm_$.sortNum = Number(this.$_addForm_$.sortNum)
                } else {
                    this.$_addForm_$.sortNum = 0
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/enterprise/service/${this.child}`,
                    data: {
                        name: this.$_editForm_$.name,
                        imageUrl: "http://localhost.com/hchs.jpg",
                        // imageUrl: this.$_editForm_$.imageUrl,
                        categoryId: this.$_editForm_$.categoryId,
                        description: this.$_editForm_$.description,
                        sortNum: this.$_editForm_$.sortNum
                    },
                    headers: {"Content-type": "application"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success(rsp.data.message)
                            this.$_editmodal_$ = false
                        } else {
                            this.$Message.error(rsp.data.message)
                        }
                    }
                })
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
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                })
            },
            //下架
            $_downShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}/offline`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
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
            // 上架
            $_upShelf_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/zone/${row.zoneId}/enterprise/service/${row.id}/online`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.tableList()
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
            // upload的自己上传
            beforeupload(file) {
            },
// 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addForm_$.file = res.data;
                this.fileChange(fileList);
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
                                a = this.baseUrl + temp_str

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
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
                                a = this.baseUrl + temp_str
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
            },
            beforeuploadEdit(file) {
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = ''
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
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = temp_str
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                // this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },
        }
    }
</script>