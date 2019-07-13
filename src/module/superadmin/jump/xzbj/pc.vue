<style scoped>
    .lm {
        margin-left: 100px;
        width: 400px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .el-input {
        width: 280px;
    }

    .el-select {
        width: 280px;
    }

    .quill-editor {
        width: 280px;
    }

    .ql-toolbar.ql-snow {
        padding: 0;
    }

    >>> .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
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

    .ivu-btn-ghost {
        color: #059BFA;
        border-color: #059BFA;
    }


</style>
<template>
    <div class="lm">
        包间基本信息
        <br/>
        <br/>
        <br/>
        <!-- 新增包间 -->
        <div>
            <el-form ref="addBjForm" :model="$_addBjForm_$" :rules="addBjFormValidate" label-width="80px">
                <el-form-item label="所属餐厅" prop="restaurantId">
                    <el-select v-model="$_addBjForm_$.restaurantId" placeholder="请选择">
                        <el-option
                                v-for="item in allRestaurantSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            ref="uploadbj"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            accept="image/png, image/gif, image/jpg, image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="包间名称" prop="name">
                    <el-input v-model="$_addBjForm_$.name" placeholder="请输入包间名称"></el-input>
                </el-form-item>
                <el-form-item label="包间地址" prop="address">
                    <el-input v-model="$_addBjForm_$.address" placeholder="请输入包间地址"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNumber">
                    <el-input v-model="$_addBjForm_$.peopleNumber" placeholder="请输入容纳人数"></el-input>
                </el-form-item>
                <el-form-item label="包间描述" prop="description">
                    <quill-editor ref="myTextEditor"
                                  v-model="$_addBjForm_$.description"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @change="onEditorChange($event)"
                                  aria-placeholder="在这里输入描述">
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
                    </quill-editor>
                </el-form-item>
            </el-form>
            <br/>
            <div style="text-align: center">
                <Button type="ghost" @click="onBack">取 消</Button>
                <Button type="primary" @click="$_saveBj_$()">保 存</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        Button,
        Form,
        Dialog,
        Input,
        FormItem,
        Select,
        Upload,
        Option,
        Radio
    }
        from "element-ui";
    import controler from "./controler.js";
    import "element-ui/lib/theme-chalk/index.css";
    import {quillEditor} from 'vue-quill-editor'

    export default {
        mixins: [controler],
        components: {
            quillEditor,
            // expandTable,
            [Button.name]: Button,
            [Form.name]: Form,
            [Dialog.name]: Dialog,
            [Input.name]: Input,
            [FormItem.name]: FormItem,
            [Select.name]: Select,
            [Upload.name]: Upload,
            [Option.name]: Option,
            [Radio.name]: Radio
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
                zoneSelect: [],// 园区列表
                zoneId: 0, // 园区id
                buildId: 0, // 大楼id
                floorId: 0, // 楼层id

                buildSelect: [], // 大楼列表
                floorSelect: [], //楼层列表
                roomSelect: [], //房间列表
                $_diningInfo_$: [],//表格数据
                imageList: [], // 编辑图片回显

                $_addModal_$: false, // 新增餐厅
                $_editModal_$: false, // 编辑餐厅

                $_addForm_$: {},
                $_editForm_$: {}, // 编辑餐厅表单


                roomList: [], // 临时保存房间列表
                restaurantSelect: [],  // 餐厅下拉选择
                allRestaurantSelect: [],  // 餐厅下拉选择


                $_addBjForm_$: {
                    // 包间表单
                    name: "",
                    address: "",
                    peopleNumber: "",
                    description: ""
                },
                addBjFormValidate: {
                    // 包间新增验证
                    name: [
                        {required: true, message: "请输入包间名称", trigger: "change"},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    address: [
                        // {required: true, message: "请输入包间地址", trigger: "change"},
                        {type: 'string', max: 100, message: '不能超过100字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    description: [
                        {required: true, message: "描述不能为空", trigger: "change"},
                        {type: 'string', max: 200, message: '不能超过200字', trigger: 'change'}],
                    peopleNumber: [
                        {required: true, message: "请输入容纳人数", trigger: "change"},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 6, message: '不能超过6位数', trigger: 'change'}],
                    restaurantId: [
                        {required: true, message: "必填", trigger: "change"},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    file: [
                        {required: true, validator: validateimg, trigger: "change"}],
                },

                $_file_$: [],

                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                // userInfo:{},  // 当前登录人信息
            };
        },
        created() {
            this.zoneId = this.$root.inparams.row;
            this.$_addBjForm_$ = {};
            this.restaurantList();
        },
        methods: {
            onBack() {
                this.$root.$_Route_$("superadmin", "sssManage", "diningManage");
            },
            // 获取餐厅下拉列表（所有餐厅）
            restaurantList() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/restaurant/search`,
                    data: {pageSize: 10000},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                }
                                this.allRestaurantSelect.push(temp)
                            }
                        }
                    }
                })
            },

            // 新增包间确定
            $_saveBj_$() {
                this.$set(this.$_addBjForm_$, "images", this.$_file_$);
                // this.$_addBjForm_$.file = '123'
                this.$refs.addBjForm.validate(valid => {
                    if (valid) {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/restaurant/${this.$_addBjForm_$.restaurantId}/box`,
                            data: {
                                name: this.$_addBjForm_$.name,
                                peopleNumber: this.$_addBjForm_$.peopleNumber,
                                address: this.$_addBjForm_$.address,
                                description: this.$_addBjForm_$.description,
                                images: this.$_addBjForm_$.images
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success(rsp.data.message)
                                    this.$root.$_Route_$("superadmin", "sssManage", "diningManage");
                                    // this.dList()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    } else {
                        this.$Message.error("信息填写不完整!");
                    }
                });

            },
            // upload的自己上传
            beforeupload(file) {
            },
            // 移除
            handleRemove(file, fileList) {
                //console.log(file, fileList);
                this.fileRmove(fileList);
            },
            // 上传图片成功
            uploadSuccess(res, file, fileList) {
                this.$_addForm_$.file = res.data;
                this.fileChange(fileList);
                this.$refs.file.clearValidate();
            },
            // 设置photo值
            fileChange(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.$_global_$.imgPath + temp_str};
                                //console.log(a);
                            }
                        }
                    }
                }
                this.$_file_$.push(a);
                //console.log(this.$_file_$);
            },
            // 移除设置photo值
            fileRmove(fileList) {
                let a = {};
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.$_global_$.imgPath + temp_str};
                                //console.log(a);
                            }
                        }
                    }
                }
                this.$_file_$.pop(a);
                //console.log(this.$_file_$);
                this.$set(this.$_addForm_$, "images", this.$_file_$);
            },

            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
                // //console.log(this.$_content_$);
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
                    url: this.$_global_$.imgUploadPath,
                    data: data
                }).then(rsp => {
                    //console.log(rsp);

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