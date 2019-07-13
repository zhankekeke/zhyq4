<style scoped>
  .basic{
      width: 50%;
      margin: 0 auto;
  }
</style>
<template>
    <div class="basic">
      <p class="title">会议室基本信息</p>
      <Form
        ref="addAssembForm"
        :rules="addAssembFormValidate"
        :model="$_addAssembForm_$"
        :label-width="90"
      >
         <FormItem label="所属园区:" prop="zoneId">
                <Select disabled v-model="$_addAssembForm_$.zoneId" 
                 placeholder="园区" 
                class="input" style="width:240px">
                <Option v-for="(item,index) in zones" 
                :label="item.label" 
                :value="item.value" 
                :key="index"></Option>
               </Select>
       </FormItem>
       <FormItem label="预览图:" prop="file">
                   <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            ref="uploadxls"
                            :show-file-list="true"
                            :before-upload="beforeupload"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :file-list="imageList"
                            accept="image/png, image/gif, image/jpg, image/jpeg">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                            class="avatar-uploader"
                            :action=this.$_global_$.imgUploadPath
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="editupload"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
       </FormItem>
         <FormItem label="会议室名称:" prop="name">
          <Input v-model="$_addAssembForm_$.name"></Input>
        </FormItem>
        <FormItem  label="地址关联" prop="add">
                        <Select :label-in-value="true" 
                        v-model="$_addAssembForm_$.buildingId" 
                        @on-change="building" 
                        placeholder="建筑" class="input" style="width:100px;">
                        <Option v-for="(item,index) in buildings" 
                        :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true"
                    v-model="$_addAssembForm_$.floorId" 
                    @on-change="chosefloor" placeholder="楼层" class="input" style="width:100px">
                        <Option v-for="(item,index) in floors" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
                    <Select :label-in-value="true"  
                    v-model="$_addAssembForm_$.roomIds" placeholder="房间" class="input" style="width:100px;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
          </FormItem>
           <FormItem label="会议室地址:" prop="address">
          <Input v-model="$_addAssembForm_$.address"></Input>
        </FormItem>
        <FormItem label="面积:">
          <Input v-model="$_addAssembForm_$.area"></Input>
        </FormItem>
        <FormItem label="容纳人数:" prop="peopleNumber">
          <Input v-model="$_addAssembForm_$.peopleNumber"></Input>
        </FormItem>
        <FormItem label="会议室描述:" prop="description">
          <!-- <Input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            v-model="$_addAssembForm_$.description"
          ></Input> -->
          <quill-editor ref="myTextEditor"
                          v-model="$_addAssembForm_$.description"
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
         <FormItem label="对接对象:" prop="configDescription">
          <Input
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            v-model="$_addAssembForm_$.configDescription"
          ></Input>
        </FormItem>
        <FormItem align="center">
          <Button type="primary" @click="$_secondNext_$()">保存</Button>
        </FormItem>
      </Form>
    </div>
</template>
<script>
    import controler from './controler.js';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import {Upload} from 'element-ui'
    import {quillEditor} from 'vue-quill-editor'
    export default {
        components:{
            quillEditor,
            [Upload.name]: Upload
        },
        mixins: [controler],
        data() {
            const validateimg = (rule, value, callback) => {
                if (this.$_file_$ != "") {
                    callback();
                } else {
                    callback('请上传图片,支持.png,.jpg格式');
                }
            };
             const validateaddr = (rule, value, callback) => {
                if (this.$_addAssembForm_$.buildingId != "" && this.$_addAssembForm_$.floorId != "") {
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
            return{
                editorOption: {modules: {toolbar: '#toolbar'}},
                row:{},
                $_addAssembForm_$: {},
                addAssembFormValidate: {
                    //基本信息表单验证
                    building:[{
                    required: true, message: "必填", trigger: "blur"
                    }],
                    file: [
                        {required: true,validator: validateimg, trigger: "change"}],
                   name: [
                        {required: true, message: "请输入会议室名称", trigger: "change"},
                        {type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'},
                        //特殊字符验证
                        {validator: this.$_validatestr_$, trigger: 'change'}
                        ],
                   add: [{required: true, validator: validateaddr, trigger: 'change'}],
                  address: [
                       {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
                        {type: 'string', max: 100, message: '地址不能超过100字', trigger: 'change'},
                       ],
                peopleNumber:[
                        {required: true,validator:this.$_validatepostiveint_$,trigger:'change'}
                        ],   
                },
                zoneId:0,
                buildId:0,
                floorId:0,
                zones:[],
                buildings:[],
                floors:[],
                rooms:[],
                imageList:[],
                $_file_$:[]
            }
        },
        methods: {
            $_edit_$() {
                this.$_addAssembForm_$ = this.$root.inparams.row;
                this.row = this.$root.inparams.row;
                //console.log(this.row)
                if (this.row.images.length > 0) {
                    for (let i = 0; i < this.row.images.length; i++) {
                        this.imageList.push({
                            url: this.row.images[i].imageUrl
                        })
                    }
                    ////console.log(this.imageList)
                }
                ////console.log(this.row)
                this.zoneId = this.row.zoneId
                this.buildId = this.row.buildingId
                this.floorId = this.row.floorId
                this.$_addAssembForm_$.roomIds  = Number(this.row.roomIds)  
                this.$_addAssembForm_$.zoneId  = ''+this.row.zoneId
                this.$_addAssembForm_$.buildingId  = this.row.buildingId
                for(var i=0;i<this.$_addAssembForm_$.images.length;i++){
                this.imageList[i]={};
                this.imageList[i].url=this.$_addAssembForm_$.images[i].imageUrl;
                this.$_file_$[i]={imageUrl:''};
                this.$_file_$[i].imageUrl=this.$_addAssembForm_$.images[i].imageUrl;
            }
            },
            // 保存
             $_secondNext_$(){
                this.$_addAssembForm_$.images = this.$_file_$
                this.$set(this.$_addAssembForm_$, "images", this.$_file_$);
                ////console.log(this.$_addAssembForm_$)
                this.$refs.addAssembForm.validate(valid=>{
                    if(valid){
                    this.$_sendQuery_$({
                    method:"PUT",
                    url:`${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
                    data:{
                    name: this.$_addAssembForm_$.name,
                    buildingId: Number(this.$_addAssembForm_$.buildingId),
                    floorId: Number(this.$_addAssembForm_$.floorId),
                    roomIds: this.$_addAssembForm_$.roomIds,
                    area: Number(this.$_addAssembForm_$.area),
                    images: this.$_addAssembForm_$.images,
                    peopleNumber: this.$_addAssembForm_$.peopleNumber,
                    configDescription: this.$_addAssembForm_$.configDescription,
                    description: this.$_addAssembForm_$.description,
                    address: this.$_addAssembForm_$.address,
                    id: this.row.id
                    },
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    //console.log(rsp)
                    if(rsp.status === 200){
                    if(rsp.data.code === 0){
                        this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {id: 1});
                    }else{
                        this.$_Message.error(rsp.data.message)
                       }
                   }
                  })
                    }
                })
               
            },
            //获取园区信息
            zList(){
                this.$_sendQuery_$({
                        method:"POST",
                        url:`${this.$_global_$.serverPath}/zone/zone/search`,
                        data:{},
                        headers:{"Content-type":"application/json"}
                    }).then((rsp)=>{
                        //console.log(rsp)
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                var arr = rsp.data.data.records;
                                for(var i =0;i<arr.length;i++){
                                    var temp ={};
                                    temp ={
                                        label: arr[i].name,
                                        value: arr[i].id+''
                                    };
                                    this.zones.push(temp)
                                }
                            }
                        }
                    })
            },
            // 获取大楼信息
            bList(){
               // this.$_addAssembForm_$.buildingId=''
                this.$_sendQuery_$({
                method:"GET",
                url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
                data:{},
                headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    //console.log(rsp)
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            var arr = rsp.data.data;
                                for(var i =0;i<arr.length;i++){
                                    var temp ={};
                                    temp ={
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.buildings.push(temp)
                                }
                                //console.log(this.buildings,this.$_addAssembForm_$.buildingId)
                        }
                    }
                })
            },
            // 获取楼层信息
             fList(){
                this.$_sendQuery_$({
                    method:"GET",
                    url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
                    data:{},
                    headers:{"Content-type":"application/json"}
                    }).then((rsp)=>{
                        //console.log(rsp)
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                var arr = rsp.data.data;
                                    for(var i =0;i<arr.length;i++){
                                        var temp ={};
                                        temp ={
                                            label: arr[i].name,
                                            value: arr[i].id
                                        };
                                        this.floors.push(temp)
                                    }
                                    //console.log(this.floors,this.$_addAssembForm_$.floorId)
                            }
                        }
                    })  
            },
            // 获取房间信息
            rList(){
                this.$_sendQuery_$({
                method:"GET",
                url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
                data:{},
                headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    //console.log(rsp)
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            var arr = rsp.data.data;
                                for(var i =0;i<arr.length;i++){
                                    var temp ={};
                                    temp ={
                                        label: arr[i].name,
                                        value: arr[i].id
                                    };
                                    this.rooms.push(temp)
                                }
                        }
                    }
                })  
            },
            // 切换大楼
            building(value){
               this.$_addAssembForm_$.floorId=''
               this.$_addAssembForm_$.roomIds=''
                this.buildId = value.value
                this.floors = []
                this.rooms = []
                this.fList()
            },
            // 切换楼层
            chosefloor(value){
                this.$_addAssembForm_$.roomIds=''
                    this.floorId = value.value
                    this.rooms = []
                    this.rList()
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
                this.$_addAssembForm_$.file = res.data;
                this.fileChange(fileList);
                // this.$refs.file.clearValidate();
            },
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
            fileRmove(fileList) {
                let a = {};
                this.$_file_$=[];
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = "";
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str = fileList[i].response.data;
                                a = {imageUrl:this.$_global_$.imgPath + temp_str};
                            }
                        }else{
                            temp_str = fileList[i].url;
                            a = {imageUrl:temp_str};
                        }
                        this.$_file_$.push(a);
                    }
                }
                // this.$set(this.$_addForm_$, "images", this.$_file_$);
            },
            beforeuploadEdit(file) {
            },
			// 移除
            handleRemoveEdit(file, fileList) {
                //console.log(file, fileList);
                this.fileRmoveEdit(fileList);
            },
			 // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_addAssembForm_$.file = res.data;
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
                                a = {imageUrl: this.$_global_$.imgPath + temp_str}
                                //console.log(a)

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                //console.log(this.$_file_$)
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
                                //console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                //console.log(this.$_file_$)
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
        created() {
            this.$_global_$.serverPath
            this.$_edit_$()	
            this.zList()
            this.bList()
            this.fList()
            this.rList()

        },
         computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        }
    }
    
</script>