<style scoped>
.step {
  width: 700px;
  height: 60px;
  margin: 0 auto 20px;
  position: relative;
}

.step .stepcont {
  position: absolute;
  top: 0;
  left: 18%;
}

.basic {
  width: 600px;
  margin: 0 auto;
}

.title {
  line-height: 50px;
  font-weight: bold;
}

.complete {
  padding-top: 100px;
}

.img {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.completeTitle {
  font-size: 20px;
  line-height: 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 150px;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <div>
    <!-- 步骤条 -->
    <div class="step">
      <Steps class="stepcont" :current="current" size="small">
        <Step content="会议室基本信息"></Step>
        <Step content="会议室配置"></Step>
        <Step content="完成"></Step>
      </Steps>
    </div>
    <!-- 会议室基本信息 -->
    <div class="basic" v-show="$_basic_$">
      <p class="title">会议室基本信息</p>
      <Form
        ref="addAssembForm"
        :rules="addAssembFormValidate"
        :model="$_addAssembForm_$"
        :label-width="90"
      >
         <FormItem label="所属园区:" prop="zoneId">
                <Select v-model="$_addAssembForm_$.zoneId"
                @on-change="chosezone" placeholder="园区"
                class="input" style="width:240px">
                <Option v-for="(item,index) in zones" 
                :label="item.label" 
                :value="item.value" 
                :key="index"></Option>
               </Select>
       </FormItem>
        <!--<el-form ref="$_addAssembForm_$" :model="$_addAssembForm_$.file" label-width="90px">-->
          <!--<el-form-item label="预览图" prop="file">-->
            <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--:action=this.$_global_$.imgUploadPath-->
              <!--list-type="picture-card"-->
              <!--:on-preview="handlePictureCardPreview"-->
              <!--ref="uploadxls"-->
              <!--:show-file-list="true"-->
              <!--:before-upload="beforeupload"-->
              <!--:on-remove="handleRemove"-->
              <!--:on-success="uploadSuccess"-->
              <!--accept="image/png, image/gif, image/jpg, image/jpeg"-->
            <!--&gt;-->
              <!--<el-dialog :visible.sync="dialogVisible" append-to-body>-->
                <!--<img width="100%" :src="dialogImageUrl" alt>-->
              <!--</el-dialog>-->
              <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
          <FormItem label="预览图:" prop="file">
              <el-upload
                      class="avatar-uploader"
                      :action=this.$_global_$.imgUploadPath
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      ref="uploadxls"
                      :show-file-list="true"
                      :before-upload="beforeupload"
                      :on-remove="handleRemove"
                      :on-success="uploadSuccess"
                      accept="image/png, image/gif, image/jpg, image/jpeg"
              >
                  <el-dialog :visible.sync="dialogVisible" append-to-body>
                      <img width="100%" :src="dialogImageUrl" alt>
                  </el-dialog>
                  <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </FormItem>
         <FormItem label="会议室名称:" prop="name">
          <Input v-model="$_addAssembForm_$.name"></Input>
        </FormItem>
        <FormItem  label="地址关联"  prop="add">
                        <Select :label-in-value="true" 
                        v-model="$_addAssembForm_$.building" 
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
                    @on-change="choseroom" 
                    v-model="$_addAssembForm_$.roomIds" placeholder="房间" class="input" style="width:100px;">
                        <Option v-for="(item,index) in rooms" :key="index" :label="item.label" :value="item.value">
                        </Option>
                    </Select>
          </FormItem>
           <FormItem label="会议室地址:" prop="address">
          <Input v-model="$_addAssembForm_$.address"></Input>
        </FormItem>
        <FormItem label="面积:" prop="area">
          <Input v-model="$_addAssembForm_$.area"></Input>
        </FormItem>
        <FormItem label="容纳人数:" prop="peopleNumber">
          <Input v-model="$_addAssembForm_$.peopleNumber"></Input>
        </FormItem>
        <FormItem label="会议室描述:" prop="description"  style="width:600px">
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
          <!-- <Button type="ghost" style="margin-right: 8px" @click="$_zSave_$()">暂存</Button> -->
          <Button v-if="repeat" type="primary" @click="$_next_$()">下一步</Button>
          <Button  v-if="!repeat" type="primary" @click="$_secondNext_$()">下一步</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 会议室配置 -->
    <div class="basic" v-show="$_setting_$">
      <p class="title">会议室配置</p>
      <Form
        ref="assembSeting"
        :rules="assembSetingValidate"
        :model="$_assembSeting_$"
        :label-width="130"
      >
        <Row>
          <Col span="20">
            <FormItem label="需提前多久预约:" prop="advanceTime">
              <Input v-model="$_assembSeting_$.advanceTime"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
        </Row>

        <FormItem label="开放时间:" prop="opentime">
          <TimePicker
            v-model="Time"
            format="HH:mm"
            type="timerange"
            placement="bottom-end"
            :steps="[1,5]"
            style="width: 168px"
          ></TimePicker>
        </FormItem>
        <Row>
          <Col span="20">
            <FormItem label="起订时间:" prop="baseTime">
              <Input v-model="$_assembSeting_$.baseTime"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="最小增加时间单位:" prop="intervalTime">
              <Input v-model="$_assembSeting_$.intervalTime"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="最小退订时间:" prop="cancelTime">
              <Input v-model="$_assembSeting_$.cancelTime"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="会议室打扫时间:" prop="clearTime">
              <Input v-model="$_assembSeting_$.clearTime"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">分钟</Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="消费:" prop="price">
              <Input v-model="$_assembSeting_$.price"></Input>
            </FormItem>
          </Col>
          <Col span="4" align="center" style="line-height: 32px;">元/分钟</Col>
        </Row>
        <FormItem label="退订返还比例:" prop="refundScale">
          <Input v-model="$_assembSeting_$.refundScale"></Input>
          <p>例如：预约会议室使用100积分，退订返还70积分</p>
        </FormItem>
        <FormItem align="center">
          <!-- <Button type="primary" @click="$_zancun_$()">暂存</Button> -->
          <Button type="primary" @click="$_sStep_$()">上一步</Button>
          <Button type="primary" @click="$_nextStep_$()">下一步</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 完成 -->
    <div class="complete" v-show="$_complete_$">
      <!-- <img src="" alt=""> -->
      <div class="img"></div>
      <p class="completeTitle">添加成功</p>
      <Row>
        <Col span="24" align="center">
          <Button type="primary" @click="$_goList_$()">返回列表</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import controler from "./controler.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {quillEditor} from 'vue-quill-editor'
import {
  Button,
  Select,
  Option,
  Table,
  TableColumn,
  Upload,
  Dialog,
  Form,
  FormItem
} from "element-ui";

export default {
  mixins: [controler],
  components: {
    quillEditor,
    [Select.name]: Select,
    [Button.name]: Button,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Upload.name]: Upload,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },

  data() {
      const validateimg = (rule, value, callback) => {
          if (this.file != "") {
              callback();
          } else {
              callback('请上传图片,支持.png,.jpg格式');
          }
      };
      const validateaddr = (rule, value, callback) => {
                if (this.$_addAssembForm_$.building != "" && this.$_addAssembForm_$.floorId != "") {
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
     const num = (rule, value, callback) => {
      if(/^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/.test(Number(value))){
        callback()
      }else{
        callback(new Error('面积应为数字类型!'))
      }
    };
    const price = (rule, value, callback) => {
      if(/^[0-9]*[1-9][0-9]*$/.test(Number(value))){
        callback()
      }else{
        callback(new Error('价格应为正整数!'))
      }
    };
    const advanceTime = (rule, value, callback) => {
      if(/^[0-9]*[1-9][0-9]*$/.test(Number(value))){
        callback()
      }else{
        callback(new Error('提前预约时间应为正整数!'))
      }
    };
    const baseTime = (rule, value, callback) => {
      if(Number(value)%30 === 0){
        callback()
      }else{
        callback(new Error('最小时间应为30的倍数!'))
      }
    };
    const baseTime1 = (rule, value, callback) => {
      if(Number(value)%30 === 0){
        callback()
      }else{
        callback(new Error('最小时间应为30的倍数!'))
      }
    };
    const refundScale = (rule, value, callback) => {
      if(/^\d+$/.test(Number(value)) && Number(value)>=1 && Number(value)<=100){
        callback()
      }else{
        callback(new Error('退订比例应为1-100之间的整数!'))
      }
    };
    return {
      editorOption: {modules: {toolbar: '#toolbar'}},
      current: 0, // 步骤条
      id: "", //传参
      zoneId:0,
      buildId:0,
      floorId:0,
      zones:[],
      $_basic_$: true,
      $_setting_$: false,
      $_complete_$: false,
      imgName: "",
      dialogVisible: false,
      dialogImageUrl: "",
      file: [],
      buildings:[],
      floors:[],
      rooms:[],
      $_addAssembForm_$: {
        // 会议室基本信息
        zoneId:'',
        name:'',
        building:'',
        floorId:'',
        images:[],
        file: [],
        roomIds:'',
        area: '',
        peopleNumber: '',
        configDescription: "",
        description: "",
        address: ""
      },
      //配置信息
      $_assembSeting_$: {
        // 会议室配置
        price: "",
          opentime:'开放时间',
        startTime: "",
        endTime: "",
        advanceTime: "",
        baseTime: "",
        intervalTime: "",
        clearTime: "",
        cancelTime: "",
        refundScale: ""
      },
      addAssembFormValidate: {
        //基本信息表单验证
        zoneId: [{required: true, message: "请选择园区", trigger: "change"}],
        name: [
          {required: true, message: "请输入会议室名称", trigger: "blur"},
          {type: 'string', max: 20, message: '名称不能超过20字', trigger: 'change'},
          //特殊字符验证
         {validator: this.$_validatestr_$, trigger: 'change'}
          ],
        address: [
          {required: true, type: 'string', message: '请填写园区详细地址', trigger: 'change'},
          {type: 'string', max: 100, message: '地址不能超过100字', trigger: 'change'},
          ],
        peopleNumber:[
          {required: true,validator:this.$_validatepostiveint_$,trigger:'change'},
            {max: 7, message: '不能超过7位数', trigger: 'change'},
          ],
        add: [ {required: true, validator: validateaddr, trigger: 'change'}],
          file: [
              {required: true, validator: validateimg, trigger: 'change'}
          ],
        area: [
          { validator:this.$_validatepostiveint_$, trigger: 'change'},
            {max: 7, message: '不能超过7位数', trigger: 'change'},
          ]
      },
      assembSetingValidate: {
        //会议室配置表单验证
        price: [
          { required: true,validator: price, trigger: "change" }
        ],
          opentime:[
              {required: true, message: "请填写开放时间", trigger: "blur"},
          ],
        advanceTime: [
          {required: true, message: "请填写预约时间", trigger: "change"},
          { validator: advanceTime, trigger: "change" }
        ],
        baseTime: [
          {required: true, message: "请填写起订时间", trigger: "change"},
          { validator: baseTime, trigger: "change" }
        ],
        intervalTime: [
          {required: true, message: "请填写最小增加时间", trigger: "change"},
          { validator: baseTime1, trigger: "change" }
        ],
        clearTime: [
          {required: true, message: "请填写打扫时间", trigger: "change"},
          { validator: baseTime, trigger: "change" }
        ],
        cancelTime: [
          {required: true, message: "请填写最小退订时间", trigger: "change"},
          { validator: baseTime, trigger: "change" }
        ],
        refundScale: [
          {required: true, message: "请输入比例", trigger: "change"},
          { validator: refundScale, trigger: "change" }
        ]
      },
      Time:[],
      $_querycfg_$: {
        mod: "",
        params: {}
      },
      userInfo:'',
      repeat: true, // 上一步
      disable: false,
    };
    
  },
  created(){
    this.$_global_$.serverPath
    this.zList()
    let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
    this.userInfo = JSON.parse(cookie);
  },
  mounted() {
    // this.$_addAssembForm_$ = {};
  },
  methods: {
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // upload的自己上传
    beforeupload(file) {
      this.$set(this.$_addAssembForm_$, "images", this.file); // 向表单数据中添加图片数组
      //console.log(this.$_addAssembForm_$);
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
      let a = {};
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          let temp_str = "";

          if (fileList[i].response) {
            if (fileList[i].response.code === 0) {
              temp_str += fileList[i].response.data;
              a = { imageUrl: this.$_global_$.imgPath + temp_str };
            }
          }
        }
      }
      this.file.push(a);
      ////console.log(this.file);
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
              a = { imageUrl: this.$_global_$.imgPath + temp_str };
              //console.log(a);
            }
          }
        }
      }
      this.file.pop(a);
     // //console.log(this.file);
      this.$set(this.$_addAssembForm_$, "images", this.file);
    },

    $_addAssemb_$() {
      this.$root.inparams.id;
    },
    //获取园区信息
     zList(){
            this.$_sendQuery_$({
                method:"POST",
                url:`${this.$_global_$.serverPath}/zone/zone/search`,
                data:{
                    pageSize:9999999
                },
                headers:{"Content-type":"application/json"}
            }).then((rsp)=>{
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
      bList(){
        this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
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
                }
            }
        })
      },
   fList(){
      this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
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
                }
            }
        })  
  },
     rList(){
        this.$_sendQuery_$({
           method:"GET",
           url:this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/building/${this.buildId}/floor/${this.floorId}/room`,
           data:{},
           headers:{"Content-type":"application/json"}
        }).then((rsp)=>{
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
     //更改园区
    chosezone(value){
      this.$_addAssembForm_$.building=''
      this.$_addAssembForm_$.floorId=''
      this.$_addAssembForm_$.roomIds=''
      this.zoneId = value
      this.buildings=[]
      this.floors=[]
      this.rooms=[]
      this.bList()

    },
    building(value){
        if(value){
            this.$_addAssembForm_$.floorId=''
            this.$_addAssembForm_$.roomIds=''
            this.buildId = value.value
            this.floors = []
            this.rooms = []
            this.fList()
        }
    },
     chosefloor(value){
         if(value){
             this.$_addAssembForm_$.roomIds=''
             this.floorId = value.value
             this.rooms = []
             this.rList()
         }
     },
     choseroom(value){
     },  
    //基础暂存
    $_zSave_$() {},
    // 基础下一步
    $_next_$() {
      this.$_addAssembForm_$.images = this.file
      this.$refs.addAssembForm.validate(valid => {
        if (valid) {
          this.$_sendQuery_$({
            method: "POST",
            url:`${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
            data: {
              name: this.$_addAssembForm_$.name,
              buildingId: Number(this.$_addAssembForm_$.building),
              floorId: Number(this.$_addAssembForm_$.floorId),
              roomIds: Number(this.$_addAssembForm_$.roomIds),
              area: Number(this.$_addAssembForm_$.area),
              images: this.$_addAssembForm_$.images,
              peopleNumber: this.$_addAssembForm_$.peopleNumber,
              configDescription: this.$_addAssembForm_$.configDescription,
              description: this.$_addAssembForm_$.description,
              address: this.$_addAssembForm_$.address
            },
            headers: {
              "Content-Type": "application/json"
            }
          }).then((rsp)=> {
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                  this.id = rsp.data.data.id
                  this.zoneId = rsp.data.data.zoneId
                this.current ++;
                this.$_basic_$ = false;
                this.$_setting_$ = true;
              }
            }
          });
          
        } else {
          this.$Message.error("请填写正确的会议室信息");
        }
      });
    },
    // 返回上一步再下一步
    $_secondNext_$(){
      this.$_addAssembForm_$.images = this.file
      ////console.log(this.$_addAssembForm_$)
        this.$refs.addAssembForm.validate(valid => {
            if (valid) {
                this.$_sendQuery_$({
                    method:"PUT",
                    url:`${this.$_global_$.serverPath}/zone/zone/${this.$_addAssembForm_$.zoneId}/meeting`,
                    data:{
                        name: this.$_addAssembForm_$.name,
                        buildingId: Number(this.$_addAssembForm_$.building),
                        floorId: Number(this.$_addAssembForm_$.floorId),
                        roomIds: this.$_addAssembForm_$.roomIds,
                        area: Number(this.$_addAssembForm_$.area),
                        images: this.$_addAssembForm_$.images,
                        peopleNumber: this.$_addAssembForm_$.peopleNumber,
                        configDescription: this.$_addAssembForm_$.configDescription,
                        description: this.$_addAssembForm_$.description,
                        address: this.$_addAssembForm_$.address,
                        id: this.id
                    },
                    headers:{"Content-type":"application/json"}
                }).then((rsp)=>{
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.current ++;
                            this.$_basic_$ = false;
                            this.$_setting_$ = true;
                        }else{
                            this.$_Message.error('请填写正确的信息')
                        }
                    }
                })
            }
        })
    },
    // 配置暂存
    $_zancun_$() {},
    // 配置上一步
    $_sStep_$() {
      this.current --;
      this.$_basic_$ = true;
      this.$_setting_$ = false;
      this.repeat = false
      this.disable = true
    },
    // 配置下一步
    $_nextStep_$() {
      if(this.Time[0] != '' && this.Time[1] != ''){
        this.$_assembSeting_$.startTime = this.Time[0]
        this.$_assembSeting_$.endTime = this.Time[1]
          this.$refs.assembSeting.validate(valid => {
              if (valid) {
                  this.$_sendQuery_$({
                      method:"POST",
                      url:`${this.$_global_$.serverPath}/zone/zone/${this.zoneId}/meeting/${this.id}/config`,
                      data:{
                          price: Number(this.$_assembSeting_$.price),
                          startTime: this.$_assembSeting_$.startTime,
                          endTime: this.$_assembSeting_$.endTime,
                          advanceTime: Number(this.$_assembSeting_$.advanceTime),
                          baseTime: Number(this.$_assembSeting_$.baseTime),
                          intervalTime: Number(this.$_assembSeting_$.intervalTime),
                          clearTime: Number(this.$_assembSeting_$.clearTime),
                          cancelTime: Number(this.$_assembSeting_$.cancelTime),
                          refundScale: Number(this.$_assembSeting_$.refundScale)
                      },
                      headers:{"Content-type":"application/json"}
                  }).then((rsp)=>{
                      if(rsp.status === 200){
                          if(rsp.data.code === 0){
                              this.current ++;
                              this.$_setting_$ = false;
                              this.$_complete_$ = true;
                          }else{
                              this.$Message.error(rsp.data.message)
                          }
                      }
                  })
              }
          })
      }else{
        this.$Message.error('请填写开放时间!')
      }
    },
    // 返回列表
    $_goList_$() {
      this.$root.$_Route_$("superadmin", "sssManage", "assembManage", {id: 1});
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

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', rsp.data.url)
                        }
                    }
                })
            },
  },
  computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
};
</script>