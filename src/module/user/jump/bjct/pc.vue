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
    <div>
        <div title="更新餐厅信息">
            <el-form ref="editForm" :model="$_addForm_$" :rules="addFormValidate" label-width="90px">
                <el-form-item ref="file" label="预览图" prop="file">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :file-list="fileList2"
                            accept="image/png, image/gif, image/jpg, image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="餐厅名称" prop="name">
                    <el-input v-model="$_addForm_$.name" placeholder="请输入餐厅名称"></el-input>
                </el-form-item>
                <el-form-item label="地址关联" prop="addressDs">
                    <el-select v-model="$_addForm_$.buildingId" @change="changeBuild"
                               placeholder="请选择">
                        <el-option v-for="item in buildSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.floorId" @change="changeFloor" placeholder="请选择">
                        <el-option v-for="item in floorSelect" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="$_addForm_$.roomIds" placeholder="请选择">
                        <el-option v-for="item in roomSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="地址" prop="address">
                    <el-input v-model="$_addForm_$.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="容纳人数" prop="peopleNumber">
                    <el-input v-model="$_addForm_$.peopleNumber" placeholder="请输入容纳人数"></el-input>
                </el-form-item>
                <el-form-item label="视频地址">
                    <el-radio v-model="$_addForm_$.showVideo" label="0">否</el-radio>
                    <el-radio v-model="$_addForm_$.showVideo" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="实时人数">
                    <el-radio v-model="$_addForm_$.showPeople" label="0">否</el-radio>
                    <el-radio v-model="$_addForm_$.showPeople" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="预订电话" prop="telephone">
                    <el-input v-model="$_addForm_$.telephone" placeholder="请输入预订电话"></el-input>
                </el-form-item>
                <el-form-item label="餐厅描述" prop="description">
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
                <el-form-item label="对接厂商">
                    <el-input v-model="$_addForm_$.configDescription"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="$_saveEdit_$()">确 定</el-button>
                <el-button type="primary" @click="$_fanhui_$()">返 回</el-button>
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
            const validateadrs = (rule, value, callback) => {
                if (this.$_addForm_$.building != "" && this.$_addForm_$.floorId != "" && this.$_addForm_$.roomIds != "") {
                    callback();
                } else {
                    callback('请选择地址');
                }
            };
            const number = (rule, value, callback) => {
                if(/^[0-9]*[1-9][0-9]*$/.test(Number(value))){
                    callback()
                }else{
                    callback(new Error('容纳人数应为正整数!'))
                }
                };
            const validatephone = (rule, value, callback) => {
                if (!(/^1[345789]\d{9}$/.test(value))) {
                    callback('请输入正确的手机号');
                } else {
                    callback();
                }
            };
            return {
                editorOption: {modules: {toolbar: '#toolbar'}},
                row: {},
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

                $_addForm_$: {
                    roomIds: []
                },


                // roomList: [], // 临时保存房间列表
                restaurantSelect: [],  // 餐厅选择

                addFormValidate: {// 新增验证
                    name: [
                        {required: true, message: "餐厅名称不能为空", trigger: "change"},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    file: [
                        {required: true,validator:validateimg , trigger: "change"}],
                    addressDs: [
                        {required: true, validator: validateadrs, trigger: "change"}],
                    address: [
                        {required: true, message: "餐厅地址不能为空", trigger: "change"},
                        {type: 'string', max: 20, message: '不能超过20字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger: 'change'}
                        ],
                    peopleNumber: [
                        { validator:number,trigger: 'change'},
                        {max: 6, message: '容纳人数不能超过6位数', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}],
                    description: [
                        {required: true, message: "餐厅描述不能为空", trigger: "change"},
                        {type: 'string', max: 500, message: '不能超过500字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger: 'change'}
                    ],
                    telephone: [
                        {required: true,validator: this.$_validatephone_$, trigger: 'change'}],
                },
                $_file_$: [],
                urll:'',
                fileList2:[],
                baseUrl: "http://img.yhcode.com:88/",
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                // userInfo:{},  // 当前登录人信息
            };
        },
        created() {
            this.zoneId = this.$root.inparams.zoneId;
            this.$_addForm_$ = this.$root.inparams.diningList;
            if (this.$_addForm_$.images.length > 0) {
                    for (let i = 0; i <this.$_addForm_$.images.length; i++) {
                        this.fileList2.push({
                            url: this.$_addForm_$.images[i].imageUrl
                        })
                        this.$_file_$.push({imageUrl:this.$_addForm_$.images[i].imageUrl})
                    }
                    ////console.log(this.imageList)
                }
            this.$_addForm_$.showPeople = "" + this.$_addForm_$.showPeople;
            this.$_addForm_$.showVideo = "" + this.$_addForm_$.showVideo;
            this.$_bList_$();
        },
        methods: {
            // 获取大楼列表
            $_bList_$() {
                this.buildSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    //console.log(rsp)
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
            $_fanhui_$(){
                this.$root.$_Route_$("user", "ssManage", "diningManage", {});
            },
            // 获取楼层列表
            $_fList_$() {
                this.floorSelect = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    //console.log(rsp)
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
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    //console.log(rsp)
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
            // 更改大楼
            changeBuild(value) {
                //console.log(value);
                this.buildId = value
                this.floorSelect = []
                this.roomSelect = []
                this.$_addForm_$.floorId = ''
                this.$_addForm_$.roomIds = [];
                this.$_fList_$()

            },
            // 更该楼层
            changeFloor(value) {
                //console.log(value);
                this.floorId = value
                this.roomSelect = []
                this.$_rList_$()
            },
            // 餐厅编辑保存
            $_saveEdit_$() {
                // //console.log(this.$_addForm_$);return;
                // this.$_addForm_$.file = '123';
                // this.$_addForm_$.roomIds = this.roomList.join(",");
                // this.$set(this.$_addForm_$, "images", this.$_file_$);
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        //console.log(this.$_addForm_$)
                        this.$_sendQuery_$({
                            method: "PUT",
                            url: `${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/restaurant`,
                            data: {
                                floorId: this.$_addForm_$.floorId,
                                roomIds: this.$_addForm_$.roomIds,
                                images: this.$_addForm_$.images,
                                peopleNumber: this.$_addForm_$.peopleNumber,
                                name: this.$_addForm_$.name,
                                description: this.$_addForm_$.description,
                                zoneId: this.$_addForm_$.zoneId,
                                id: this.$_addForm_$.id,
                                buildingId: this.$_addForm_$.buildingId,
                                configDescription: this.$_addForm_$.configDescription,
                                address: this.$_addForm_$.address,
                                telephone: this.$_addForm_$.telephone,
                                showPeople: Number(this.$_addForm_$.showPeople),
                                showVideo: Number(this.$_addForm_$.showVideo)
                            },
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            //console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("修改餐厅信息成功!")
                                    this.$_ffhui_$()
                                    this.$_editModal_$ = false
                                } else {
                                    this.$Message.error("修改餐厅信息失败!")
                                }
                            }
                        })
                    } else {
                        this.$Message.error("操作失败!");
                    }
                });
                //console.log(this.$_addForm_$);
            },
            $_ffhui_$(){
                this.$root.$_Route_$("user", "ssManage", "diningManage", {});
            },

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
                                a = {imageUrl: this.baseUrl + temp_str};
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
                                a = {imageUrl: this.baseUrl + temp_str};
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
                    url: 'http://api.yhcode.com:88/oss/file/upload/form',
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