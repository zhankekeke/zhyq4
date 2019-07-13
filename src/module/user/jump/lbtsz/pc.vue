<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .bg {
        background: #efefef;
        padding: 10px;
    }

    .ivu-modal-body {
        padding: 0;
    }

    .ivu-form-item {
        margin-bottom: 0px;
    }

    .hysbox li {
        line-height: 24px;
        height: 24px;
    }

    .dialog-footer {
        padding-top: 10px;
        text-align: right;
    }
</style>
<template>
    <div>
        <Row>
            <Col align="right">
                <Button type="primary" @click="$_addLbt_$('addform')">新建轮播图</Button>
            </Col>
        </Row>
        <br>
        <el-dialog title="编辑轮播图" :visible.sync="$_editLbt_$">
            <el-form ref="editForm" :model="$_editForm_$" :rules="addValidator" label-width="90px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="$_editForm_$.name" placeholder="请输入轮播图名称"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="$_editForm_$.type" placeholder="请选择">
                        <el-option
                                v-for="item in  typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转链接" prop="url">
                    <el-input v-model="$_editForm_$.url" placeholder="请输入跳转链接"></el-input>
                </el-form-item>
                <el-form-item label="排序号" prop="seqId">
                    <el-input v-model="$_editForm_$.seqId" width="220px"
                              placeholder="轮播图分类排序码（越大越靠前）"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="uploadxls"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_editLbt_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_saveLbt_$()">保 存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加轮播图" :visible.sync="$_modalAdd_$">
            <el-form ref="addForm" :model="$_addForm_$" :rules="addValidator" label-width="90px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入轮播图名称"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="$_addForm_$.type" placeholder="请选择">
                        <el-option
                                v-for="item in  typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="跳转链接" prop="url">
                    <el-input v-model="$_addForm_$.url" width="220px" placeholder="请输入跳转链接"></el-input>
                </el-form-item>
                <el-form-item label="排序号" prop="seqId">
                    <el-input v-model="$_addForm_$.seqId" width="220px" placeholder="轮播图分类排序码（越大越靠前）"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="addform"
                            :limit="1"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :on-exceed ="uploadexceed"
                                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_modalAdd_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_addOK_$()">保 存</el-button>
            </div>
        </el-dialog>
        <Row class="mt10">
            <el-table
                    :header-cell-style="getRowClass"
                    :data="$_data6_$"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="index"
                        width="60"
                        label="序号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column align="center" label="预览图">
                    <template slot-scope="scope">
                                                
                        <div style="width:40px;height:40px">
                            <img style="width:40px;height:40px" :src="scope.row.image | showimage" alt="">
                        </div>
                                          
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="跳转链接">
                    <template slot-scope="scope">
                                                <span>{{scope.row | link}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="类型">
                    <template slot-scope="scope">
                                                <span>{{scope.row.type | formatType}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态">
                    <template slot-scope="scope">
                                                <span>{{scope.row.publishStatus | formatStatus}}</span>
                                            
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="seqId"
                        label="排序号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column label="操作"
                                 align="center" width="200">
                    <template slot-scope="scope">
                        <el-button @click="$_delete_$(scope.row)" type="text" size="small"><span style="color:#f56c6c">删除</span></el-button>
                        <el-button @click="$_edit_$(scope.row)" type="text" size="small"><span style="color:#059BFA">编辑</span></el-button>
                        <el-button v-show="scope.row.publishStatus == 1" @click="$_upLbt_$(scope.row)" type="text"
                                   size="small"><span style="color:#059BFA">上架</span>
                        </el-button>
                        <el-button v-show="scope.row.publishStatus == 0" @click="$_downLbt_$(scope.row)" type="text"
                                   size="small"><span style="color:#059BFA">下架</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </Row>
        <!-- 详情 -->
    </div>
</template>
<script>
    import controler from "./controler.js";
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {
        Table, Button, TableColumn, Form, Dialog,
        Input, FormItem, Select, Option, Tag, Radio, Upload
    } from 'element-ui';

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
            [Option.name]: Option,
            [Tag.name]: Tag,
            [Radio.name]: Radio,
            [Upload.name]: Upload,
        },
        //过滤
        filters: {
            showimage(val){
                var arr=val.split(';');
                return arr[0];
            },
            formatType(val) {
                if (val === 0) {
                    return 'pc'
                }
                if (val === 1) {
                    return 'app'
                }

            },
            link(val) {
                return val.type === 0 ? val.appUrl : val.pcUrl;
            },
            formatStatus(val) {
                if (val == 0) {
                    return '上架'
                }
                if (val == 1) {
                    return '下架'
                }
            }
        },
        data() {
            const validateurl = (rule, value, callback) => {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                    + "[a-z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,4})?" // 端口- :80
                    + "((/?)|" // a slash isn't required if there is no file name
                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                var re = new RegExp(strRegex);
                //re.test()
                if (re.test(this.$_addForm_$.url)) {
                    callback();
                } else {
                    callback('请输入正确格式的链接');
                }
            };
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                //创建列表zoneId
                zoneId: 0,
                imgName: '',
                publishStatus: 0,
                visible: false,
                uploadList: [],
                $_model10_$: [],
                $_formValidate_$: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                formValidate: {
                    $_commondityName_$: "",
                    $_tag_$: "",
                    $_drinks_$: "",
                    $_stock_$: "",
                    $_price_$: "",
                    $_distribution_$: "",
                    $_upload_$: "",
                    $_desc_$: ""
                },
                $_modalAddCommondity_$: false,
                $_orderTime_$: "",
                $_goodsName_$: "",  // 轮播图名称
                $_modalAdd_$: false,  // 添加轮播图模态框
                $_editLbt_$: false, // 编辑轮播图模态框
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                typeList: [{value: 0, label: 'pc'}, {value: 1, label: 'app'}],
                $_data6_$: [], // 表格数据
                $_pageSize_$: 2, // 每页条数
                $_file_$: [],
                baseUrl: 'http://img.yhcode.com:88/', // 图片基础路径
                $_addForm_$: {  // 添加表单
                    name: '',
                    type: '',
                    image: '',
                    seqId: '',
                    upload: ''
                },
                addValidator: {
                    name: [
                        {required: true, message: '请输入轮播图名称', trigger: 'change'},
                        {max:20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    url: [
                        {required: true, message: '请输入跳转链接', trigger: 'change'},
                        {max:50, message: '不能超过50字', trigger: 'change'},
                        {required: true, validator: validateurl, trigger: "change"},
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}
                    ],
                    seqId: [
                        {required: true, message: '请输入排序号', trigger: 'change'},
                        {max:6, message: '不能超过6位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, trigger: 'change'}
                    ]
                },
                catlogList: [], // 轮播图分类列表
                dynamicTags: [], // 标签临时存放数组
                inputVisible: false, // 标签输入框可见性
                inputValue: '', // 标签输入绑定
                $_editForm_$: {  // 编辑轮播图表单
                    file: '',
                    type: ''
                },
                imageList: [], // 编辑轮播图图片回显
            }
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;

            this.$_list_$();
            // this.$_global_$.serverPath
        },
        watch: {
            $_editLbt_$(e) {
                if (e == false) {
                    this.imageList = [];
                }
            }
        },
        methods: {
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#f8f8f9'
                } else {
                    return ''
                }
            },
            //  获取轮播图列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/mallCarousel/queryCarouselImageList',
                    data: {
                        zoneId: this.zoneId
                    }
                }).then((rsp) => {
                    //console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data
                        }
                    }
                })
            },
            //添加轮播图
            $_addLbt_$(addForm) {
                if (this.$refs[addForm] !== undefined) {
                    this.$refs[addForm].clearFiles();
                }
                for (let key in this.$_addForm_$) {
                    this.$_addForm_$[key] = ''
                }
                this.$_addForm_$.type = 0;
                this.$_modalAdd_$ = true;
            },
            // 添加确定
            $_addOK_$() {
                this.$_file_$=this.$_file_$.join(';');
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/createCarouselImage',
                            data: {
                                name: this.$_addForm_$.name,
                                type: String(this.$_addForm_$.type),
                                publishStatus: "1",
                                zoneId: this.zoneId,
                                image: this.$_file_$,
                                seqId: this.$_addForm_$.seqId,
                                pcUrl: this.$_addForm_$.url,
                                appUrl: this.$_addForm_$.url,
                            }
                        }).then((rsp) => {
                            //console.log(rsp);
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data)
                                } else {
                                    this.$Message.success(rsp.data.message)
                                }
                                this.$_list_$()
                            }
                            this.$_modalAdd_$ = false;
                        })
                    }
                })
            },
            //删除
            $_delete_$(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认删除该轮播图吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/delCarouselImage',
                            data: {
                                id: row.id,
                                name: row.name
                            },
                        }).then((rsp) => {
                            //console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }

                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
            },
            // 编辑
            $_edit_$(row) {
                this.$_file_$ = [];
                var arr=row.image.split(';');
                for (var key in arr) {
                    var temp={};
                    temp.name=key;
                    temp.url=arr[key];
                    this.imageList.push(temp);
                    this.$_file_$.push(temp.url);
                }
                // 标签处理
                this.$_editForm_$ = row;
                this.$_editForm_$.url=this.$_editForm_$.appUrl;
                // this.$_editForm_$.file = '123';   //  如果不选择修改图片时这样可以通过验证
                this.$_editForm_$.isDelivery = '1';
                this.$_editLbt_$ = true
            },
            // 编辑确定
            $_saveLbt_$(row) {
                this.$_file_$ = this.$_file_$.join(';');
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/updateCarouselImage',
                            data: {
                                id: this.$_editForm_$.id,
                                name: this.$_editForm_$.name,
                                type: this.$_editForm_$.type,
                                seqId: this.$_editForm_$.seqId,
                                //图片上传
                                image: this.$_file_$,
                                zoneId: this.zoneId
                            },
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            //console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data)
                                    this.$_list_$()
                                } else {

                                    this.$Message.error(rsp.data.message)
                                }
                            }
                            this.$_editLbt_$ = false

                        })
                    }
                })
            },


            upAndDownCarouselImage(row, vis) {
                let text = vis == 0 ? "下架" : "上架";
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>确认${text}该轮播图吗？</p><br>`,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/mallCarousel/upAndDownCarouselImage',
                            data: {
                                id: row.id,
                                name: row.name,
                                publishStatus: 1 - vis,
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data)
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {

                    }
                })
            },
            // 上架
            $_upLbt_$(row) {
                this.upAndDownCarouselImage(row, 1);
            },
            $_downLbt_$(row) {
                this.upAndDownCarouselImage(row, 0);

            },
            // upload的自己上传
            beforeupload(file) {

            },
            // 上传超出限制
            uploadexceed(file,fileList){
                if(file.length == 1){
                    this.$Message.error("只能上传一张!")
                }
            },
// 移除
            handleRemove(file, fileList) {
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                this.$_file_$=[];
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl+ temp_str
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = '';
                this.$_file_$=[];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str
                                this.$_file_$.push(a);
                            }
                        }
                    }
                }
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            beforeuploadEdit(file) {
                if (this.$_file_$.length>0) {
                    this.$Message.error("只能上传一张!")
                    return false;
                }
                this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.fileChangeEdit(fileList);

            },
            // 设置photo值
            fileChangeEdit(fileList) {
                let a = '';
                this.$_file_$=[];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl+ temp_str;
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = '';
                this.$_file_$=[];
                // this.imageList.pop();
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str
                            }
                        }else{
                            a = fileList[i].url;
                        }
                        this.$_file_$.push(a)
                    }
                }

            },
        }
    }
</script>
<style>
    .ivu-message{
        z-index: 9999;
    }
</style>