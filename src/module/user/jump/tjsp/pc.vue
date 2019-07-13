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

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
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
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
<template>
    <div class="zdtb">
        <!-- 添加 -->
        <div title="添加商品">
            <el-form ref="addForm" :model="$_addForm_$" :rules="addValidator" label-width="90px">
                <el-form-item label="商品名称" prop="name" >
                    <el-input v-model="$_addForm_$.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="catalog">
                    <el-select v-model="$_addForm_$.catalog" placeholder="请选择">
                        <el-option
                                v-for="item in catlogList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum">
                    <el-input v-model="$_addForm_$.sortNum" placeholder="请输入排序号"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-tag :key="tag" v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @blur="handleInputConfirm"></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="商品类型" prop="goodsType">
                    <el-select v-model="$_addForm_$.goodsType" placeholder="请选择">
                        <el-option
                                v-for="item in goodsTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '0'" prop="prices">
                    <el-input v-model="$_addForm_$.prices" placeholder="元/件"></el-input>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '1'" prop="credits">
                    <el-input v-model="$_addForm_$.credits" placeholder="积分/件"></el-input>
                </el-form-item>
                <el-form-item label="单价" v-if="$_addForm_$.goodsType === '2'" prop="credits">
                    <el-input v-model="$_addForm_$.credits" placeholder="积分/件"></el-input>
                </el-form-item>
                <el-form-item label="代金券" v-if="$_addForm_$.goodsType === '2'" prop="voucherId">
                    <el-select v-model="$_addForm_$.voucherId" placeholder="请选择代金券">
                        <el-option
                                v-for="item in voucherList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存" prop="repertory">
                    <el-input v-model="$_addForm_$.repertory" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="是否需要配送" prop="isDelivery">
                    <el-radio v-model="$_addForm_$.isDelivery" label="1">是</el-radio>
                    <el-radio v-model="$_addForm_$.isDelivery" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="上传图片" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="uplods"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png,image/gif,image/jpg,image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情" prop="info">
                    <!--<el-input v-model="$_addForm_$.info"></el-input>-->

                    <quill-editor ref="myTextEditor"
                                  v-model="$_addForm_$.info"
                                  :options="editorOption"
                                  placeholder="请输入商品详情"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @change="onEditorChange($event)">
                        <div id="toolbar" slot="toolbar">
        <span class="ql-formats">
        <button class="ql-bold">Bold</button><!--控制粗细-->
        <button class="ql-italic">Italic</button>    <!--控制切斜-->
        <button class="ql-underline">下划线</button>    <!--下划线-->
        <button class="ql-link">link</button>    <!--链接-->
        </span>
                            <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
        </select>
        </span>
                            <span class="ql-formats">
        <button class="ql-list" value="ordered"></button><!--序号-->
        <button class="ql-list" value="bullet"></button>    <!--点-->
        <button class="ql-list" value="ql-blockquote"></button>    <!--引用-->
        <button class="ql-code-block"></button>    <!--代码-->
        </span>
                            <span class="ql-formats">
        <select class="ql-color">
        <option selected></option>
        <option value="red"></option>
        <option value="orange"></option>
        <option value="yellow"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="purple"></option>
        </select>
        <select class="ql-background">
        <option selected></option>
        <option value="red"></option>
        <option value="orange"></option>
        <option value="yellow"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="purple"></option>
        </select>
        </span>
                            <span class="ql-formats"><!--控制大小-->
        <select class="ql-size">
        <option value="small">小字体</option>
        <option selected value="false">中字体</option>
        <option value="large">大字体</option>
        <option value="huge">超大字</option>
        </select>
        </span>
                            <span class="ql-formats">
        <button type="button" @click="imgClick" style="outline:none">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3"
                                        y="4"></rect>
        <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
        <polyline class="ql-even ql-fill"
                  points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg> </button>
        </span>
                        </div>
                    </quill-editor>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="$_addOK_$()">保 存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Table,
        Button,
        TableColumn,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Option,
        Tag,
        Radio,
        Upload
    } from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';
    import {quillEditor} from 'vue-quill-editor'


    export default {
        mixins: [controler],
        components: {
            quillEditor,
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
        filters: {
            formatType(val) {
                if (val == 0) {
                    return '普通商品'
                }
                if (val == 1) {
                    return '积分商品'
                }
                if (val == 2) {
                    return '代金券'
                }
            }
        },
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
            return {
                editorOption: {modules: {toolbar: '#toolbar'}},

                zoneId: '',
                $_file_$: [],
                baseUrl: 'http://img.yhcode.com:88/',
                $_addForm_$: {  // 添加表单
                    name: '',
                    catalog: '',
                    tags: '',
                    goodsType: '',
                    prices: '',
                    credits: '',
                    repertory: '',
                    isDelivery: '1',
                    info: ''
                },
                addValidator: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'change'},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$,message: '存在非法字符', trigger: 'change'}
                    ],
                    sortNum:[
                        {required: true, message: '请输入排序号', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, message: '请输入数字',trigger: 'change'}
                    ],
                    catalog: [
                        {required: true, message: '请输入商品分类', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    prices:[
                        {required: true, message: '请输入单价', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, message: '请输入正整数',trigger: 'change'}
                    ],
                    credits:[
                        {required: true, message: '请输入单价', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, message: '请输入正整数',trigger: 'change'}
                    ],
                    voucherId:[
                        {required: true, message: '请选择代金券', trigger: 'change'},
                    ],
                    repertory:[
                        {required: true, message: '请输入库存', trigger: 'change'},
                        {max: 10, message: '不能超过10位数', trigger: 'change'},
                        {validator: this.$_validatenum_$, message: '请输入数字',trigger: 'change'}
                    ],
                    goodsType: [
                        {required: true, message: '请输入商品类型', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    info:[
                        {max: 100, message: '不能超过100字', trigger: 'change'},
                    ],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                },
                catlogList: [], // 商品分类列表
                dynamicTags: [], // 标签临时存放数组
                inputVisible: false, // 标签输入框可见性
                inputValue: '', // 标签输入绑定
                voucherList:[],  //代金券列表
                goodsTypeList: [  // 商品类型列表
                    {
                        value: "0",
                        label: "普通商品"
                    },
                    {
                        value: "1",
                        label: "积分商品"
                    },
                    {
                        value: "2",
                        label: "代金券"
                    }
                ],
                $_editForm_$: {  // 编辑商品表单
                    file: ''
                },
                imageList: [], // 编辑商品图片回显
                id: '',  // 删除时使用
            }
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;
            this.$_cList_$()
            this.vouchList();
        },
        methods: {
            //获取代金券
            vouchList(){
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/voucher/page',
                    data: {
                        pageNum:1,
                        pageSize:999999,
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                }
                                this.voucherList.push(temp)
                            }
                        }
                    }
                })
            },
            // 获取分类列表
            $_cList_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/operate/catalog/queryCatalogList',
                    data: {
                        visible:'0',
                        zoneId: this.zoneId
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id + '',
                                    label: arr[i].name
                                }
                                this.catlogList.push(temp)
                            }
                        } else {
                        }
                    }
                })
            },

            // 添加确定
            $_addOK_$() {
                this.$_addForm_$.tags = this.dynamicTags.join(';')
                this.$_addForm_$.image = this.$_file_$.join(';')
                this.$_addForm_$.zoneId = this.zoneId
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + '/operate/goods/createGoods',
                            data: this.$_addForm_$,
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.data);
                                    this.$root.$_Route_$('user', 'jfscManage', 'spManage', {zoneId: this.$_zoneId_$})
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    }
                })
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
                this.fileChange(fileList);
            },
            // 设置photo值
            fileChange(fileList) {
                let a = ''
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.baseUrl + temp_str
                                //   this.$_file_$.push(a)
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmove(fileList) {
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
                this.$_file_$.pop(a)
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
                this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.file.clearValidate();
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

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
            },
            // 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                this.$set(this.$_editForm_$, 'images', this.$_file_$)
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
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.url)
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
    };
</script>