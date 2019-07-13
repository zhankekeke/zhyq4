<style scoped>
.left{
    width: 60%;
    float:left;
}
.right{
    width: 35%;
    float: right;
}
.wrap{
    margin-top: 15px;
    width: 80%;
    border-radius: 6px;
    border: 1px solid #dddee1;
    padding: 15px;
}
.wrap .title{
    line-height: 25px;
}
.box1 {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #e4e4e3;
    border-radius: 5px;
    line-height: 30px;
}

.line25 {
    line-height: 25px;
}

.mustPay >>>.ivu-form-item-label:before{
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
}
.companyRadio{
    display: block;
    height: 35px;
    font-size: 14px
}
</style>
<template>
   <div>
       <!-- 表单 -->
       <div class="left">
           <Form ref="addForm" :rules="addFormValidate" :model="$_addForm_$" :label-width="80">
                <FormItem label="接收人" prop="users">
                    <Input v-model="$_usernamelist_$" disabled></Input>
                </FormItem>
                <FormItem label="通知类型" prop="types">
                    <Select v-model="$_addForm_$.types" @on-change="$_changeOption_$" style="width: 40%;">
                        <Option value="0">普通通知</Option>
                        <Option value="1">活动通知</Option>
                        <Option value="2">缴费通知</Option>
                    </Select>
                    <Button v-show="$_modal1_$" type="primary" @click="$_choiceHd_$">选择活动</Button>
                    <div v-show="$_modal3_$">已选择活动“{{this.$_hdInfo_$.title}}”</div>
                    <Button v-show="$_paymodal1_$" type="primary" @click="$_choiceCompany_$">选择企业</Button>
                </FormItem>
                <FormItem v-show="$_paymodal1_$" label="应缴费用" prop="pay" class="mustPay">
                    <Input v-model="$_addForm_$.pay"></Input>
                </FormItem>
                <FormItem label="文章标题" prop="title">
                    <Input v-model="$_addForm_$.title"></Input>
                </FormItem>
                <FormItem label="摘要" prop="description">
                    <Input v-model="$_addForm_$.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
               <FormItem label="通知内容" prop="content">
                    <quill-editor ref="myTextEditor"
                                    v-model="$_addForm_$.content"
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
                                    <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                                    <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                                    <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                                </svg> </button>
                            </span>
                        </div>
                    </quill-editor>
                </FormItem>
                <br><br>
                <FormItem label="附件">
                    <Upload  
                    :before-upload="handleUpload"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    action="http://api.yhcode.com:88/oss/file/upload/form">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                    </Upload>
                </FormItem>
                <FormItem align="center">
                    <Button type="primary" @click="$_send_$()">发送</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="$_cancel_$()">取消</Button>
                </FormItem>
           </Form>
       </div>
       <!-- 选择框 -->
       <div class="right" v-show="$_paymodal2_$">
           <div class="box1 line25" ref="step1">
               <div style="float:left; width:45%">
                   企业列表：
                   <Tree ref="tree"
                         :data="$_data_$"
                         @on-select-change="$_choice_$"
                         @on-toggle-expand="$_selectTree_$"
                         @on-check-change="$_check_$"
                         show-checkbox style="height: 520px;overflow: auto">
                   </Tree>
               </div>
               <div style="float: left; margin-left:10%; width: 35%; font-weight: normal;">
                   <span style="font-size: 14px;">部门员工列表：</span>
                   <span v-if="$_ygList_$.length == 0" style="font-size: 12px;"><br/>请选择部门查看</span>
                   <span v-else style="height: 520px;overflow: auto">
                        <CheckboxGroup @on-change="$_newData_$" style="margin-top: 8px;overflow-y:auto;height:400px;"
                                       v-model="checkAllGroup">
                            <Checkbox v-for="item in $_ygList_$" :label="item.id">
                                <span>{{item.name}}</span>
                            </Checkbox>
                        </CheckboxGroup>
                        </span>
               </div>
               <div style="clear: both"></div>
           </div>
       </div>

       <!-- 活动的弹框 -->
       <Modal v-model="$_modal2_$" title="选择活动" @on-cancel="$_cancel2_$" width="650" :mask-closable="false">
           <Table border :columns="$_columns_$" :data="$_data2_$"></Table>
           <div slot="footer">
               <Button type="ghost" @click="$_cancel2_$">取消</Button>
           </div>
       </Modal>

       <!--企业列表的弹框-->
       <Modal v-model="$_paymodal3_$"
              title="选择要通知的企业"
              @on-cancel="$_cancelCompany_$"
              @on-ok="choiceThisCompany"
              width="300"
              :mask-closable="false">
           <RadioGroup v-model="$_thisCompanys_$">
               <Radio class="companyRadio" v-for="item in $_data3_$" :label="item.id">{{item.name}}</Radio>
           </RadioGroup>
       </Modal>
   </div>
</template>
<script>
import controler from './controler.js';
import {quillEditor} from 'vue-quill-editor'
export default {
    mixins: [controler],
    components: {
        quillEditor
    },
    data() {
        const validatetime = (rule, value, callback) => {
            let regEn = /[`~!@#$%^&*_+<>:{}.\/'[\]]/im;
            let regCn = /[#￥ |]/im;
            if (regEn.test(value) || regCn.test(value)) {
                callback('输入包含非法字符');
            } else {
                callback();
            }
        };
        const validaReceiver = (rule, value, callback) => {
            if(this.$_addForm_$.types==2){
                if(this.$_thisCompanys_$==''){
                    callback('请选择接收的企业');
                }else{
                    callback();
                }
            }else{
                if(this.$_ygInfo_$.length==0){
                    callback('请选择接收人');
                }else{
                    callback()
                }
            }
        };
        //验证通知缴费
        const validatePay = (rule, value, callback) => {
            if(this.$_addForm_$.types==2){
                //当通知类型为缴费通知时，进行相关验证
                if(value){
                    let reg = /^\+?[1-9]([0-9]*|[0-9]*\.\d{1,2})$/;
                    if (!reg.test(value)) {
                        callback("请输入正确的费用!")
                    } else {
                        callback()
                    }
                }else{
                    callback("请填写应缴费用")
                }

            }else{
                callback()
            }
        };
        return {
            editorOption: {modules: {toolbar: '#toolbar'}},
            $_modal1_$: false,   //选择活动按钮
            $_modal2_$: false,   //选择活动列表弹窗
            $_modal3_$: false,   //选择活动后显示已选择内容
            $_paymodal1_$: false,  //选择缴费通知后显示的缴费内容
            $_paymodal2_$: false,  //右侧选择员工默认为显示
            $_paymodal3_$: false,  //选择企业的弹框
            $_thisCompanys_$: '',  //选择要通知的企业
            $_data3_$: [],  //企业列表弹窗
            $_columns_$: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 60
                },
                {
                    title: '标题',
                    key: 'title',
                    align: 'center',
                    width: 200
                },
                {
                    title: '有效期',
                    key: 'beginDate',
                    align: 'center',
                    render: (h, params) => {
                        let text = `${params.row.beginDate}--${params.row.endDate}`;
                        return h(
                            "span",
                            {},
                            text
                        );
                    }
                },

                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 80,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.choiceThis(params.row)
                                    }
                                }
                            }, '选择'),
                        ]);
                    }
                }
            ],
            $_data2_$: [],   //弹窗列表
            $_name_$: '',
            $_hdInfo_$: {},
            $_addForm_$: {
                   users: '',
                   types: '',
                   title: '',
                   description: '',
                   content: '',
                   files:''
            },
            addFormValidate: {
               users: [
                { required: true, validator: validaReceiver, trigger: 'change' }
                ],
               types: [
                { required: true, message: '请选择通知类型', trigger: 'change' }
               ],
                pay: [
                    //验证
                    {validator: validatePay, trigger: 'change'}
                ],
               title: [
                   { required: true, message: '请填写文章标题', trigger: 'change' },
                   //长度验证
                   {type: 'string', max: 100, message: '文章标题不能超过50字', trigger: 'change'},
                   //特殊字符验证
                   {validator: validatetime, trigger: 'change'}
               ],
               description:[
                   //长度验证
                   {type: 'string', max: 500, message: '摘要不能超过500字', trigger: 'change'}
               ],
               content:[
                   //长度验证
                   {type: 'string', max: 1000, message: '摘要不能超过1000字', trigger: 'change'}
               ]
            },
            $_data_$: [],
            checkAllGroup: [],
            $_ygNum_$: 0,  //员工数量
            $_ygInfo_$: [],
            $_ygList_$: [],
            userInfo:{},
            upurl:'',
            $_bumen_$:[],
            $_usernamelist_$: '',
            $_current_$: 0,
            companyId:0,
            user:[],
            files:[]
        }
        
    },
    created(){
        this.$_global_$.serverPath
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.userInfo = JSON.parse(cookie);
        this.getAllCompany()
    },
    methods: {
        $_addTz_$() {
            this.$root.inparams.id
        },


        //右侧获取企业、员工列表 start
        $_choice_$(rep) {
            this.checkAllGroup = [];
            if (rep.length > 0) {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/company/company/${rep[0].enterpriseId}/department/${rep[0].id}/employee`,
                    data: {}
                }).then(rsp => {
                    this.$_djqForm_$.recvCount = rsp.data.data.records.length;
                    this.$_ygNum_$ = rsp.data.data.records.length;
                    if (rsp.data.data.records.length > 0) {
                        this.$_ygInfo_$ = rsp.data.data.records;
                    }
                });
            }
        },
        //展开树形菜单
        $_selectTree_$(rep) {
            if (rep.parentId == 'top') {
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/company/company/${rep.id}/department`,
                }).then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            if (res.data.data) {
                                this.$_bumen_$ = [];
                                for (let i = 0; i < res.data.data.length; i++) {
                                    this.$_bumen_$.push(res.data.data[i]);
                                    if (res.data.data[i].child) {
                                        this.$_hy_$(res.data.data[i]);
                                    }
                                }
                                let bumen = this.$_dg_$(this.$_bumen_$);
                                this.$_data_$[rep.index].children = bumen;
                            }
                        }
                    }
                });
            }
        },
        //数据还原
        $_hy_$(node, num = 0) {
            if (!node) {
                return;
            }
            if (num !== 0) {
                this.$_bumen_$.push(node);
            }
            num++;
            if (node.child && node.child.length > 0) {
                let i = 0;
                for (i = 0; i < node.child.length; i++) {
                    this.$_hy_$(node.child[i], num);
                }
            }
        },
        //菜单递归
        $_dg_$(data) {
            let val = [];
            // 删除 所有 children,以防止多次调用
            data.forEach(function (item) {
                delete item.children;
            });

            // 将数据存储为 以 id 为 KEY 的 map 索引数据列
            let map = {};
            data.forEach(function (item) {
                map[item.id] = item;
            });
            data.forEach(function (item) {
                item.title = item.name;
                item.children = [];
                // 以当前遍历项，parentId,去map对象中找到索引的id
                let parent = map[item.parentId];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                    val.push(item);
                }
            });
            return val;
        },
        $_check_$(e) {
            this.checkAllGroup = [];
            this.$_ygList_$ = [];
            this.$_ygInfo_$ = [];
            if (e.length > 0) {
                this.$_current_$ = 1;
                let resData = [];
                for (let i = 0; i < e.length; i++) {
                    if (e[i].parentId != "top" && e[i].title != "暂无数据") {
                        resData.push(
                            e[i]
                        )
                    }
                }
                for (let i = 0; i < resData.length; i++) {
                    this.$_sendQuery_$({
                        method: "POST",
                        url: `${this.$_global_$.serverPath}/company/company/${resData[i].enterpriseId}/department/${resData[i].id}/employee`,
                        data:{}
                    }).then(rsp => {
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                let arr = [];
                                if (rsp.data.data.records.length > 0) {
                                    for (let j = 0; j < rsp.data.data.records.length; j++) {
                                        this.$_ygList_$.push(rsp.data.data.records[j]);
                                    }
                                    this.$_ygInfo_$ = this.$_ygList_$;

                                    for(let i=0;i<this.$_ygInfo_$.length;i++){
                                        arr.push(this.$_ygInfo_$[i].name);
                                    }
                                    this.$_usernamelist_$ = arr.join(';');
                                }
                            }
                        }
                    });
                }
            } else {
                this.$_current_$ = 0;
            }
        },
        //json数据去重
        UniquePay(paylist) {
            let payArr = [paylist[0]];
            for (let i = 1; i < paylist.length; i++) {
                let payItem = paylist[i];
                let repeat = false;
                for (let j = 0; j < payArr.length; j++) {
                    if (payItem.id == payArr[j].id) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    payArr.push(payItem);
                }
            }
            return payArr;
        },
        //右侧获取企业、员工列表 end


        //选择通知类型
        $_changeOption_$(vl){
            this.$_modal3_$ = false;
            this.$_hdInfo_$ = {};
            if(vl==1){
                //活动通知，应弹出活动列表勾选
                this.$_modal1_$ = true;
                this.$_paymodal1_$ = false;
                this.$_paymodal2_$ = true;
            }else if(vl==0){
                //普通通知
                this.$_modal1_$ = false;
                this.$_paymodal1_$ = false;
                this.$_paymodal2_$ = true;
            }else if(vl==2){
                //缴费通知
                this.$_modal1_$ = false;
                this.$_paymodal1_$ = true;
                this.$_paymodal2_$ = false;
            }

        },
        //选择活动按钮
        $_choiceHd_$(){
            this.$_modal2_$ = true;
            this.$_data2_$ = [];

            //请求活动列表
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/company/activity/search`,
                data: {
                    pageNum: 1,
                    pageSize: 99999,
                },
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        if(rsp.data.data.records.length>0){
                            //有活动
                            let list = rsp.data.data.records;

                            //获取当前时间的时间戳
                            let nowtime = new Date().getTime();

                            for(let i=0;i<list.length;i++){
                                //活动必须为上架的活动
                                if(list[i].status == 1){
                                    //获取当前活动结束时间的时间戳
                                    let et = Date.parse(new Date(list[i].endDate));

                                    //需要满足结束时间必须长于当前时间点至少一个小时
                                    if((et-nowtime)>=1000*60*60){
                                        this.$_data2_$.push(list[i]);
                                    }
                                }
                            }
                        }
                    }
                }
            })

        },
        //取消活动列表弹窗
        $_cancel2_$(){
            this.$_modal2_$ = false;
            this.$_modal3_$ = false;
            this.$_hdInfo_$ = {};
        },
        //选择该活动
        choiceThis(item){
            this.$_hdInfo_$ = item;
            this.$_modal2_$ = false;
            this.$_modal3_$ = true;
        },

        //选择企业按钮
        $_choiceCompany_$(){
            this.$_paymodal3_$ = true;
        },
        //取消企业列表弹窗
        $_cancelCompany_$(){
            this.$_paymodal3_$ = false;
        },
        //选择相关企业
        choiceThisCompany(){
            for(let i=0;i<this.$_data3_$.length;i++){
                if(this.$_data3_$[i].id==this.$_thisCompanys_$){
                    this.$_usernamelist_$ = this.$_data3_$[i].name;
                    break;
                }
            }
        },

        // 获取全部公司
        getAllCompany(){
            //园区企业列表
            this.$_sendQuery_$({
                method: "POST",
                url: `${this.$_global_$.serverPath}/zone/zone/${this.userInfo.zoneId}/enterprise/search`,
                data:{
                    pageSize: 99999
                }
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.$_data_$ = [];
                        this.$_data3_$ = [];
                        this.$_data3_$ = res.data.data.records;
                        for (let i = 0; i < res.data.data.records.length; i++) {
                            let info = {
                                title: res.data.data.records[i].name,
                                id: res.data.data.records[i].id,
                                index: i,
                                parentId: "top",
                                expand: false,
                                children: [
                                    {
                                        disabled: true,
                                        title: "暂无数据"
                                    }
                                ]
                            };
                            this.$_data_$.push(info);
                        }
                    }
                }
            });
        },

        // 文件上传
        handleUpload(file){
        },
        // 上传成功
        uploadSuccess(response,file,fileList){
            this.upurl = response.data
            this.files = [];
            for(var i= 0; i<fileList.length;i++){
                var temp = fileList[i].name;
                this.files.push(temp)
            }
        },
        // 移除
        handleRemove(file,fileList){
            var temp = file.name;
            this.files.pop(temp)
        },
        //   发送
        $_send_$(){
            this.$_addForm_$.files = this.files.join(",");
            this.$refs.addForm.validate((valid) => {
                if(valid){
                    if(this.$_addForm_$.types==1){
                        if(!this.$_hdInfo_$.id){
                            this.$Message.error('请选择一个活动');
                            return false;
                        }
                    }
                    let sendData = {
                        "description": this.$_addForm_$.description,
                        "zoneId": this.userInfo.zoneId,
                        "files": this.upurl,
                        "enterpriseId": this.userInfo.enterpriseId,
                        "title": this.$_addForm_$.title,
                        "type": Number(this.$_addForm_$.types),
                        "activityId": Number(this.$_hdInfo_$.id),
                        "content": this.$_addForm_$.content,
                    };

                    if(this.$_addForm_$.types==2){
                        //缴费通知
                        sendData.companyId = this.$_thisCompanys_$;
                        sendData.paymentAccount = this.$_addForm_$.pay;
                    }else{
                        //其他通知
                        this.user = [];
                        for(let i=0;i<this.$_ygInfo_$.length;i++){
                            let thuser = {"uid":0,"read":0,"name":''};
                            thuser.uid = this.$_ygInfo_$[i].id;
                            thuser.name = this.$_ygInfo_$[i].name;
                            this.user.push(thuser);
                        }
                        sendData.users = JSON.stringify(this.user);
                    }

                    this.$_sendQuery_$({
                        method:"POST",
                        url:`${this.$_global_$.serverPath}/company/notice`,
                        data:sendData,
                        headers:{
                            "Content-type":"application/json"
                        }
                    }).then((rsp)=>{
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                this.$root.$_Route_$('user','informManage','inform',{})
                            }else{
                                this.$Message.error('通知发布失败!');
                            }
                        }
                    })
                }
            })
        },
        // 取消
        $_cancel_$() {
            this.$root.$_Route_$('user','informManage','inform',{})
        },
         onEditorBlur() {//失去焦点事件
            },
        onEditorFocus() {//获得焦点事件
        },
        onEditorChange() {//内容改变事件
        },
        /*点击上传图片按钮*/
        imgClick() {
            /*内存创建input file*/
            var input = document.createElement('input');
            input.type = 'file';
            input.name = this.fileName;
            input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
            input.onchange = this.onFileChange;
            input.click()
        },
        /*选择上传图片切换*/
        onFileChange(e) {
            var self = this;
            var fileInput = e.target;
            if (fileInput.files.length == 0) {
                return
            }
            this.editor.focus();
            if (fileInput.files[0].size > 1024 * 1024 * 100) {
                this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
            }
            let data = new FormData;
            data.append('file', fileInput.files[0]);
            this.$_sendQuery_$({
                method: "POST",
                url: 'http://api.yhcode.com:88/oss/file/upload/form',
                data: data
            }).then(rsp => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        self.editor.insertEmbed(self.editor.getSelection().index, 'image', rsp.data.url)
                    }
                }
            });
        },
        $_newData_$(e){
            let arr = [];
            let arr1 = [];
            for (let i = 0; i < e.length; i++) {
                for (let j = 0; j < this.$_ygList_$.length; j++) {
                    if (e[i] === this.$_ygList_$[j].id) {
                        arr.push(this.$_ygList_$[j]);
                    }
                }
            }
            this.$_ygInfo_$ = arr;
            for(let i=0;i<this.$_ygInfo_$.length;i++){
                arr1.push(this.$_ygInfo_$[i].name);
            }
            this.$_usernamelist_$ = arr1.join(';');
        }
    },
    computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
    },
    watch: {
        checkAllGroup(curVal, oldVal) {
            if (curVal.length > 0) {
                this.$_current_$ = 1;
                this.$_ygNum_$ = 0;
                this.$_ygNum_$ = curVal.length;
            } else {
                this.$_ygNum_$ = 0;
                this.$_current_$ = 0;
            }
        },
        $_ygList_$(newData, oldData) {
            if (newData.length > 0) {
                this.$_ygNum_$ = 0;
                let res = this.UniquePay(newData);
                this.checkAllGroup = [];
                this.$_ygNum_$ = res.length;
                for (let k = 0; k < res.length; k++) {
                    this.checkAllGroup.push(res[k].id);
                }
            }
        }

    },
}
</script>