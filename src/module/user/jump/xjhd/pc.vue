<style scoped>
    .wrap {
        width: 600px;
    }
</style>
<template>
    <div>
        <Form class="wrap" :rules="formValidate" ref="form" :model="$_Form_$" :label-width="100">
            <FormItem label="活动名称" prop="title">
                <Input v-model.trim="$_Form_$.title" placeholder="请输入活动名称"></Input>
            </FormItem>
            <FormItem label="活动地址" prop="address">
                <Input v-model.trim="$_Form_$.address" placeholder="请输入活动地址"></Input>
            </FormItem>
            <FormItem label="标题图" prop="file">
                <el-upload
                        class="avatar-uploader"
                        action="http://api.yhcode.com:88/oss/file/upload/form"
                        list-type="picture-card"
                        ref="uploadxls"
                        :show-file-list="true"
                                        :before-upload="beforeupload"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                                        accept="image/png,image/gif,image/jpg,image/jpeg">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </FormItem>
            <FormItem label="活动介绍">
                <!-- <Input v-model.trim="$_Form_$.content" placeholder="请输入活动介绍"></Input> -->
                <quill-editor ref="myTextEditor"
                              v-model.trim="$_Form_$.content"
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
            </FormItem>
            <Row>
                <Col span="12">
                    <FormItem label="开始时间" prop="beginDate">
                        <DatePicker v-model="$_Form_$.beginDate" type="datetime" style="width:200px"
                                    :options="startTimeOptions" @on-change="startTimeChange" placeholder="请选择起止时间"
                                    format="yyyy-MM-dd HH:mm"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="结束时间" prop="endDate">
                    <DatePicker v-model="$_Form_$.endDate" type="datetime" style="width:200px"
                    :options="endTimeOptions" @on-change="endTimeChange" placeholder="请选择起止时间"
                format = "yyyy-MM-dd HH:mm"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="是否需要报名" prop="apply">
                        <RadioGroup v-model="$_Form_$.apply">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="人数限制" prop="peopleNumber">
                        <Input v-model="$_Form_$.peopleNumber" placeholder="请输入人数限制"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="联系人" prop="contactName">
                        <Input v-model="$_Form_$.contactName" placeholder="请填写联系人"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="联系方式" prop="contactNumber">
                        <Input v-model="$_Form_$.contactNumber" placeholder="请填写联系方式"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发放代金券">
                        <Select v-model="$_Form_$.couponId" placeholder="请选择代金券" style="width:200px">
                            <Option v-for="item in voucherList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="代金券数量">
                        <Input v-model="$_Form_$.couponCount"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="活动附件">
                <Upload
                        :before-upload="handleUploadFile"
                        :on-remove="handleRemoveFile"
                        :on-success="uploadSuccessFile"
                        action="http://api.yhcode.com:88/oss/file/upload/form">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                </Upload>
            </FormItem>
            <FormItem align="center">
                <Button type="primary" @click="$_save_$()">保存</Button>
                <Button type="ghost" style="margin-left: 8px" @click="$_cancel_$()">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import controler from "./controler.js";
    import {Upload} from "element-ui";
    import {quillEditor} from 'vue-quill-editor'

    export default {
        mixins: [controler],
        components: {
            quillEditor,
            [Upload.name]: Upload,
        },
        data() {
            const $_ygsl_$ = (rule, value, callback) => {
                var reg = /^\d{1,6}$/
                if (!reg.test(value)) {
                    callback("人数不能超过六位数!")
                }
            };
            const $_phone_$ = (rule, value, callback) => {
                var reg = /^[1][3,4,5,7,6,8][0-9]{9}$/
                if (!reg.test(value)) {
                    callback("请输入正确的手机号码!")
                } else {
                    callback()
                }
            };
            const $_validatenum_$ = (rule, value, callback) => {
                var reg = /^([1-9]\d*)|0$/
                var reg1 = /[\u4e00-\u9fa5]/
                if (!reg.test(value)) {
                    callback("请输入正整数!")
                } else if (reg1.test(value)) {
                    callback("不能包含汉字!")
                } else {
                    callback()
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
                startTimeOptions: {}, //开始日期设置
                endTimeOptions: {}, //结束日期设置
                editorOption: {modules: {toolbar: '#toolbar'}},
                $_Form_$: {
                    title: '',
                    address: '',
                    content: '',
                    beginDate: '',
                    endDate: '',
                    apply: '0',
                    couponId: '',
                    couponName: '',
                    contactName: '',
                    contactNumber: '',
                    files: '',
                    couponCount: '',
                    peopleNumber: '0'
                },
                formValidate: {
                    //管理员图片验证
                    file: [
                        {required: true, validator: validateimg, trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '活动名称不能为空', trigger: 'change'},
                        {type: 'string', max: 50, message: '活动名称不能超过50个字', trigger: 'change'},
                        // {validator: this.$_validatestr_$, trigger:'change'}
                    ], address: [
                        {required: true, message: '地址不能为空', trigger: 'change'},
                        {type: 'string', max: 100, message: '地址不能超过100个字', trigger: 'change'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ], peopleNumber: [
                        {required: true, message: '人数限制不能为空', trigger: 'change'},
                        // {validator: $_ygsl_$, trigger:'blur'}
                    ],
                    contactName: [
                        {required: true, message: '联系人不能为空', trigger: 'blur'},
                        {validator: this.$_validatestr_$, trigger: 'change'}
                    ], contactNumber: [
                        {required: true, message: '联系方式不能为空', trigger: 'blur'},
                        {validator: $_phone_$, trigger: 'change'}
                    ], couponCount: [
                        {required: true, message: '代金券数量不能为空', trigger: 'change'},
                        {validator: $_validatenum_$, trigger: 'change'}
                    ],
                    beginDate: [
                        {required: true, message: '开始时间不能为空', trigger: 'change'}
                    ],
                    endDate: [
                        {required: true, message: '结束时间不能为空', trigger: 'change'}
                    ]
                    
                },
                voucherList: [
                ],
                $_file_$: [],
                baseUrl: 'http://img.yhcode.com:88/',
                files: [],
                $_querycfg_$: {
                    mod: '',
                    params: {}
                }
            }
        },
        created() {
            this.$_validatestr_$
            this.$_global_$.serverPath;
            this.vList()
        },
        methods: {
            $_edit_$() {
                this.$root.inparams.id
            },
            startTimeChange: function (e) { //设置开始时间
                this.$_Form_$.beginDate = e;
                this.endTimeOptions = {
                    disabledDate: date => {
                        let startTime = this.$_Form_$.beginDate ? new Date(this.$_Form_$.beginDate).valueOf() : '';
                        return date && (date.valueOf() < startTime);
                    }
                }
            },
            endTimeChange: function (e) { //设置结束时间
                var date = new Date(e).valueOf()
                this.$_Form_$.endDate = this.FormatAllDate(date);
                let endTime = this.$_Form_$.endDate ? new Date(this.$_Form_$.endDate).valueOf(): '';
                this.startTimeOptions = {
                    disabledDate(date) {
                        return date && date.valueOf() > endTime;
                    }
                }
            },
            // 格式化时间
            FormatAllDate(sDate) {
                var date = new Date(sDate);
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                //月
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                //日
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                //时
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                //分
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                //秒
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                //格式化后日期为：yyyy-MM-dd HH:mm:ss
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hours + seperator2 + minutes + seperator2 + seconds;
                return currentdate;
            },
            // 保存
            $_save_$() {
                // console.log(this.voucherList);return;
                this.$set(this.$_Form_$, 'images', JSON.stringify(this.$_file_$))
                this.$set(this.$_Form_$, 'files', this.files.join(','))
                this.$_Form_$.file = '123'
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_Form_$.beginDate = this.FormatAllDate(this.$_Form_$.beginDate)
                this.$_Form_$.endDate = this.FormatAllDate(this.$_Form_$.endDate)
                if (this.$_Form_$.couponId == '请选择') {
                    this.$_Form_$.couponId = null
                    this.$_Form_$.couponCount = null
                    this.$refs.form.validate((valid) => {
                        //  //console.log(valid)
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/company/activity`,
                                data: {
                                    "zoneId": userInfo.zoneId,
                                    "beginDate": this.$_Form_$.beginDate,
                                    "address": this.$_Form_$.address,
                                    "endDate": this.$_Form_$.endDate,
                                    "apply": this.$_Form_$.apply,
                                    "peopleNumber": this.$_Form_$.peopleNumber,
                                    "contactName": this.$_Form_$.contactName,
                                    "contactNumber": this.$_Form_$.contactNumber,
                                    "title": this.$_Form_$.title,
                                    "content": this.$_Form_$.content,
                                    "couponId": this.$_Form_$.couponId,
                                    "couponCount": this.$_Form_$.couponCount,
                                    "files": this.$_Form_$.files,
                                    images: this.$_Form_$.images,
                                },
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((rsp) => {
                                // //console.log(rsp)
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
                                    } else {
                                        this.$Message.error('新建活动失败！');
                                    }
                                }
                            })
                        }
                    })
                } else {
                    for(var i = 0; i < this.voucherList.length; i++){

                        if(this.$_Form_$.couponId ==this.voucherList[i].value){
                            this.$_Form_$.couponName = this.voucherList[i].label
                            // console.log(this.$_Form_$.couponName);return;                            
                        }
                    }  
                    this.$refs.form.validate((valid) => {
                        //  //console.log(valid)
                        if (valid) {
                            this.$_sendQuery_$({
                                method: "POST",
                                url: `${this.$_global_$.serverPath}/company/activity`,
                                data: {
                                    "zoneId": userInfo.zoneId,
                                    "beginDate": this.$_Form_$.beginDate,
                                    "address": this.$_Form_$.address,
                                    "endDate": this.$_Form_$.endDate,
                                    "apply": this.$_Form_$.apply,
                                    "peopleNumber": this.$_Form_$.peopleNumber,
                                    "contactName": this.$_Form_$.contactName,
                                    "contactNumber": this.$_Form_$.contactNumber,
                                    "title": this.$_Form_$.title,
                                    "content": this.$_Form_$.content,
                                    "couponId": this.$_Form_$.couponId,
                                    "couponCount": this.$_Form_$.couponCount,
                                    "couponName": this.$_Form_$.couponName,
                                    "files": this.$_Form_$.files,
                                    images: this.$_Form_$.images,
                                },
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((rsp) => {
                                // //console.log(rsp)
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
                                    } else {
                                        this.$Message.error('新建活动失败！');
                                    }
                                }
                            })
                        }
                    })
                }

            },
            // 取消
            $_cancel_$() {
                this.$root.$_Route_$('user', 'informManage', 'hdManage', {})
            },
            // 获取代金券类型列表
            vList() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/voucher/list`,
                    data: {
                        "zoneId": userInfo.zoneId
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                }
                                this.voucherList.push(temp)
                            }
                        }
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
                this.$_Form_$.file = res.data;
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
                                //   //console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                // //console.log(this.$_file_$)
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
                                //   //console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                // //console.log(this.$_file_$)

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
                    // //console.log(rsp);

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.url)
                        }
                    }
                });
            },
            // 文件上传
            handleUploadFile(file) {
                // //console.log(file)
            },
            // 上传成功
            uploadSuccessFile(response, file, fileList) {
                this.files = []
                for (var i = 0; i < fileList.length; i++) {
                    var temp = fileList[i].name
                    this.files.push(temp)
                }
            },
            // 移除
            handleRemoveFile(file, fileList) {
                var temp = file.name
                this.files.pop(temp)
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

