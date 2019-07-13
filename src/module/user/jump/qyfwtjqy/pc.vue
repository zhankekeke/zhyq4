<style scoped>
    /*.lm {*/
    /*color: blue;*/
    /*font-size: 30px;*/
    /*}*/

    /*.zdtb {*/
    /*font-size: 12px;*/
    /*!* padding:0px 5% 0px 5%; *!*/
    /*color: #666;*/
    /*line-height: 18px;*/
    /*font-family: 'MicrosoftYaHei', 'Microsoft YaHei';*/

    /*}*/

    /*.bg {*/

    /*background: #efefef;*/
    /*padding: 10px;*/
    /*}*/

    /*.mt10 {*/
    /*margin-top: 10px;*/
    /*}*/

    /*.mr5 {*/
    /*margin-right: 5px;*/
    /*}*/

    /*.icon {*/
    /*color: rgb(80, 80, 192);*/
    /*}*/

    /*.bg-lp {*/
    /*background: rgba(230, 243, 252, 1);*/
    /*padding: 5px;*/
    /*border: 1px solid rgba(212, 240, 252, 1);*/
    /*}*/

    /*.mr5 {*/
    /*margin-right: 5px;*/
    /*}*/

    /*.ivu-icon {*/
    /*font-size: 20px;*/
    /*vertical-align: middle;*/
    /*}*/

    /*.top-line span {*/
    /*vertical-align: middle;*/
    /*width: 40%;*/
    /*}*/

    /*.top-line Select {*/
    /*vertical-align: middle;*/
    /*}*/

    /*.ivu-input-wrapper {*/
    /*vertical-align: middle;*/
    /*width: 60%;*/
    /*}*/

    /*.top-height {*/
    /*height: 76px;*/
    /*}*/

    /*!*上传图片样式*!*/
    /*.avatar-uploader .el-upload {*/
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
    /*}*/

    /*.avatar-uploader .el-upload:hover {*/
    /*border-color: #409EFF;*/
    /*}*/

    /*.avatar-uploader-icon {*/
    /*font-size: 28px;*/
    /*color: #8c939d;*/
    /*width: 178px;*/
    /*height: 178px;*/
    /*line-height: 178px;*/
    /*text-align: center;*/
    /*}*/

    /*.avatar {*/
    /*width: 178px;*/
    /*height: 178px;*/
    /*display: block;*/
    /*}*/

    .el-input {
        width: 350px;
    }

    .el-select {
        /*width: 280px;*/
    }

    .quill-editor {
        width: 350px;
    }

    .ql-toolbar.ql-snow {
        padding: 0;
    }

    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }

    >>> .el-form-item__label {
        font-size: 12px;
    }

    >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

    >>> .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }

</style>
<template>
    <div class="zdtb">
        <!-- 新增服务 -->
        <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
            <el-form-item label="服务名称" prop="name">
                <el-input v-model="$_addForm_$.name" placeholder="请输入服务名称"></el-input>
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
                    <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="$_addForm_$.child" prop="child" placeholder="请选择">
                    <el-option v-for="item in childSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务介绍" prop="description">
                <quill-editor ref="myTextEditor"
                              v-model="$_addForm_$.description"
                              :options="editorOption"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @change="onEditorChange($event)">
                    <div id="toolbar" slot="toolbar">
                            <span class="ql-formats">
                                <button class="ql-bold">Bold</button><!--控制粗细-->
                                <button class="ql-italic">Italic</button>    <!--控制切斜-->
                                <button class="ql-underline">下划线</button>    <!--下划线-->
                                <button class="ql-link">link</button>    <!--链接-->
                                <button class="ql-list" value="ordered"></button><!--序号-->
                                <button class="ql-list" value="bullet"></button>    <!--点-->
                                <!--<button class="ql-list" value="ql-blockquote">.</button>    &lt;!&ndash;引用&ndash;&gt;-->
                                <button class="ql-code-block"></button>    <!--代码-->
                                <button type="button" @click="imgClick" style="outline:none">
                                    <svg viewBox="0 0 18 18">
                                    <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                                    <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                                    <polyline class="ql-even ql-fill"
                                              points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                                    </svg>
                                </button>
                            </span>

                        <!--<span class="ql-formats">-->
                        <!--<select class="ql-align">-->
                        <!--<option selected="selected"></option>-->
                        <!--<option value="center"></option>-->
                        <!--<option value="right"></option>-->
                        <!--<option value="justify"></option>-->
                        <!--</select>-->
                        <!--<select class="ql-color">-->
                        <!--<option selected></option>-->
                        <!--<option value="red"></option>-->
                        <!--<option value="orange"></option>-->
                        <!--<option value="yellow"></option>-->
                        <!--<option value="green"></option>-->
                        <!--<option value="blue"></option>-->
                        <!--<option value="purple"></option>-->
                        <!--</select>-->
                        <!--<select class="ql-background">-->
                        <!--<option selected></option>-->
                        <!--<option value="red"></option>-->
                        <!--<option value="orange"></option>-->
                        <!--<option value="yellow"></option>-->
                        <!--<option value="green"></option>-->
                        <!--<option value="blue"></option>-->
                        <!--<option value="purple"></option>-->
                        <!--</select>-->
                        <!--<select class="ql-size">-->
                        <!--<option value="small">小字体</option>-->
                        <!--<option selected value="false">中字体</option>-->
                        <!--<option value="large">大字体</option>-->
                        <!--<option value="huge">超大字</option>-->
                        <!--</select>&lt;!&ndash;控制大小&ndash;&gt;-->
                        <!--</span>-->
                    </div>
                    <!--<div id="toolbar" slot="toolbar">-->
                    <!--<span class="ql-formats">-->
                    <!--<button class="ql-bold">Bold</button>&lt;!&ndash;控制粗细&ndash;&gt;-->
                    <!--<button class="ql-italic">Italic</button>    &lt;!&ndash;控制切斜&ndash;&gt;-->
                    <!--<button class="ql-underline">下划线</button>    &lt;!&ndash;下划线&ndash;&gt;-->
                    <!--<button class="ql-link">link</button>    &lt;!&ndash;链接&ndash;&gt;-->
                    <!--</span>-->
                    <!--<span class="ql-formats">-->
                    <!--<select class="ql-align">-->
                    <!--<option selected="selected"></option>-->
                    <!--<option value="center"></option>-->
                    <!--<option value="right"></option>-->
                    <!--<option value="justify"></option>-->
                    <!--</select>-->
                    <!--</span>-->
                    <!--<span class="ql-formats">-->
                    <!--<button class="ql-list" value="ordered"></button>&lt;!&ndash;序号&ndash;&gt;-->
                    <!--<button class="ql-list" value="bullet"></button>    &lt;!&ndash;点&ndash;&gt;-->
                    <!--<button class="ql-list" value="ql-blockquote"></button>    &lt;!&ndash;引用&ndash;&gt;-->
                    <!--<button class="ql-code-block"></button>    &lt;!&ndash;代码&ndash;&gt;-->
                    <!--</span>-->
                    <!--<span class="ql-formats">-->
                    <!--<select class="ql-color">-->
                    <!--<option selected></option>-->
                    <!--<option value="red"></option>-->
                    <!--<option value="orange"></option>-->
                    <!--<option value="yellow"></option>-->
                    <!--<option value="green"></option>-->
                    <!--<option value="blue"></option>-->
                    <!--<option value="purple"></option>-->
                    <!--</select>-->
                    <!--<select class="ql-background">-->
                    <!--<option selected></option>-->
                    <!--<option value="red"></option>-->
                    <!--<option value="orange"></option>-->
                    <!--<option value="yellow"></option>-->
                    <!--<option value="green"></option>-->
                    <!--<option value="blue"></option>-->
                    <!--<option value="purple"></option>-->
                    <!--</select>-->
                    <!--</span>-->
                    <!--<span class="ql-formats">&lt;!&ndash;控制大小&ndash;&gt;-->
                    <!--<select class="ql-size">-->
                    <!--<option value="small">小字体</option>-->
                    <!--<option selected value="false">中字体</option>-->
                    <!--<option value="large">大字体</option>-->
                    <!--<option value="huge">超大字</option>-->
                    <!--</select>-->
                    <!--</span>-->
                    <!--<span class="ql-formats">-->
                    <!--<button type="button" @click="imgClick" style="outline:none">-->
                    <!--<svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3"-->
                    <!--y="4"></rect>-->
                    <!--<circle class="ql-fill" cx="6" cy="7" r="1"></circle>-->
                    <!--<polyline class="ql-even ql-fill"-->
                    <!--points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>-->
                    <!--</svg> </button>-->
                    <!--</span>-->
                    <!--</div>-->
                </quill-editor>
            </el-form-item>
            <el-form-item label="服务排序号" prop="sortNum">
                <el-input v-model.number="$_addForm_$.sortNum" placeholder="服务排序号"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center">
            <Button type="ghost" @click="$_addmodal_$()">取 消</Button>
            <Button type="primary" @click="$_addOK_$()">确 定</Button>
        </div>
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
                editorOption: {modules: {toolbar: '#toolbar'}},
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
                                        color: "#f56c6c"
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
                                        color: "#67c23a"

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
                        {required: true, message: '问题名称不能为空', trigger: 'change'},
                        {type: 'string', validator: this.$_validatestr_$, trigger: 'change'},
                        {
                            type: 'string', max: 20, message: '服务名称不能超过20字', trigger: 'change'
                        }
                    ],
                    description: [
                        {type: 'string', max: 500, message: '服务介绍不能超过500字', trigger: 'change'}
                    ],
                    sortNum: [
                        {type: 'number', message: '分类排序必须是数字', trigger: 'change'},
                        {type: 'number', max: 9999, message: '分类排序不能超过9999', trigger: 'change'}
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
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${item.zoneId}/service/category/${item.id}/list`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data;
                            var data = []
                            if (arr.length == 0) {
                                this.$Message.success("该分类下暂无子分类!")
                            } else {
                                for (var i = 0; i < arr.length; i++) {
                                    var temp = {}
                                    temp = {
                                        title: arr[i].name,
                                        parentId: arr[i].parentId,
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
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/service/category/${value}/list`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
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
                this.$_querycfg_$.mod = 'zone/zone/' + this.$_userInfo_$.zoneId + '/category/' + this.categoryId + '/enterprise/service/list';
                this.$_fquery_$((rsp) => {
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
            $_addmodal_$() {
                this.$root.$_Route_$('user', 'bzzx', 'qyfw', {})
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
                                imageUrl: this.$_addForm_$.imageUrl,
                                description: this.$_addForm_$.description,
                                sortNum: this.$_addForm_$.sortNum
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.$root.$_Route_$('user', 'bzzx', 'qyfw', {})
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
                this.imageList = []
                this.imageList.push({url: row.imageUrl})
                this.$_editForm_$ = row
                this.child = row.id
                this.$_editForm_$.file = '123'
                this.$_file_$ = []
                this.$_file_$.push(row.imageUrl)
                // this.id = row.categoryId
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/service/category/${row.categoryId}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.parentId = rsp.data.data.parentId
                            this.$_editForm_$.parent = rsp.data.data.parentId
                            this.zoneId = rsp.data.data.zoneId
                            this.$_sendQuery_$({
                                method: "GET",
                                url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/service/category/${this.parentId}/list`,
                                data: {},
                                headers: {"Content-type": "application/json"}
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        var arr = rsp.data.data
                                        this.childSelect = []
                                        for (var i = 0; i < arr.length; i++) {
                                            var temp = {}
                                            temp = {
                                                label: arr[i].name,
                                                value: arr[i].id
                                            }
                                            this.childSelect.push(temp)
                                        }
                                    } else {
                                        this.$Message.error(rsp.data.message)
                                    }
                                }
                            })
                        } else {
                            this.$Message.error(rsp.data.message)
                        }
                    }
                })


                this.$_editmodal_$ = true

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
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
                // console.log(this.$_content_$);
            },
            /*点击上传图片按钮*/
            imgClick() {
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this
                var fileInput = e.target
                if (fileInput.files.length == 0) {
                    return
                }
                this.editor.focus()
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
                }
                var data = new FormData
                data.append('file', fileInput.files[0]);
                this.$_sendQuery_$({
                    method: "POST",
                    url: 'http://api.yhcode.com:88/oss/file/upload/form',
                    data: data
                }).then(rsp => {

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', rsp.data)
                        }
                    }
                });
                // this.$_sendQuery_$.post(this.uploadUrl, data).then(function (res) {
                //     if (res.data) {
                //         self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.url)
                //     }
                // })
            },

        },
        props: {
            value: {type: String}, /*上传图片的地址*/
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
    }
</script>