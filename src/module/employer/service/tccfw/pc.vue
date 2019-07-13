<style scoped>
.el-dialog{
    width:37%!important;
}
    .item {
        padding: 15px 30px 25px 15px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid #f7f7f7;
    }

    .img {
        height: 222px;
        /*background: #f7f7f7;*/
    }

    .cont {
        padding-top: 20px;
        box-sizing: border-box;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        line-height: 40px;
    }

    p {
        font-size: 14px;
        line-height: 30px;
    }

    span {
        font-size: 16px;
    }

    .btn {
        padding-top: 70px;
        box-sizing: border-box;
    }

    .item .ivu-btn {
        width: 70%;
        height: 50px;
    }

    .info {
        width: 96%;
        margin: 0 auto;
        padding: 15px 30px 50px 40px;
        box-shadow: 6px 6px 27px 5px #f4f4f4;
        box-sizing: border-box;
        border-radius: 6px;
        background: #fff;
    }

    .tx .pic {
        width: 100px;
        height: 100px;
        border-radius:50%;
    }

    .rq {
        text-align: right;
    }
  .name p{
      line-height:30px;
      margin-left:10px;
      margin-top:4px;
      width:100px;
      font-weight:600;
  }
  .el-table th>.cell {
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
}
  .lists:first-child{
      margin-left:20px;
  }
  .name{
      overflow:hidden;
      margin-left:70px;
      position:relative;

  }
  .name button{
      width:100px;
      border:1px solid #3399ff;
      color:#3399ff;
      margin-top:20px;
  }
    .bottom {
        text-align: right;
        line-height: 2;
        font-size: 12px;
    }
.name .add{
        width: 42px;
    height: 26px;
    /* width: 50%; */
    border-radius: 21%;
    line-height: 4px;
    position: absolute;
    /* right: 42px; */
    top: -16px;
    left: 50px;
    text-align: center;
}

    .bottom p {
        font-size: 12px;
    }

    .infoItem {
        padding: 10px 50px 10px 10px;
        box-sizing: border-box;
        border: 1px solid #0ff;
    }
    .el-upload--picture-card{
        display:none!important;
    }
    .infoItem .carimg {
        float: left;
        width: 80px;
        height: 50px;
        margin-right: 10px;
        background: #f00;
    }

    .infoItem .xx {
        float: left;
        font-size: 12px;
    }

    .infoItem .xx span {
        font-size: 12px;
    }

    .infoItem .xx .carnumber {
        padding: 2px 6px;
        border-radius: 5px;
        border: 1px solid #333333;
        display: block;
        font-size: 12px;
        margin-bottom: 10px;
    }
    .lists:first-child{
        margin-left:20px!important;
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
        width: 148px;
        height: 148px;
        display: block;
    }

    .portrait .ivu-form-item-label:before{
        content: "*";
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }
</style>
<template>
    <div style="background-color:#fff;">
        <!-- 用户信息 -->
        <div class="info">
            <Row>
                <Col class="tx" span="1">
                    <div class="pic"><img :src="$_userInfo_$.faceUrl" style="width: 100%;height: 100%;" alt=""></div>
                </Col>
                <Col span="23">
                    <Row>
                        <Col span="7" align="left" class="name">
                            <p>{{this.$_userInfo_$.name}}</p>
                             <Button class="add" type="ghost" icon="ios-plus-empty" @click="$_add_$()"></Button>
                            <Button type="text" @click="$_jfjl_$()" style="margin-left:8px;">车辆缴费记录</Button>
                            <Button style="margin-left:8px;" type="text" @click="$_ywjl_$()">车辆预约记录</Button>
                        </Col>

                    </Row>
                    <br>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="24">
                    <!-- 表格 -->
                    <el-table
                            :data="$_data6_$"
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                type="index"
                                width="60"
                                label="序号">
                        </el-table-column>
                        <el-table-column align="center" width="100" label="预览图">
                            <template slot-scope="scope">                        
                                <div>
                                    <img style="width:40px;height:40px" :src="scope.row.imageUrl" alt="">
                                </div>
                                                  
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="车牌号">
                            <template slot-scope="scope">
                                      <span>{{scope.row.province}}{{scope.row.plateNumber}}</span>
                                                  
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="品牌"
                                prop="brand">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="车辆类型">
                            <template slot-scope="scope">
                                      <span>{{scope.row.carType | formatType}}</span>
                                                    
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="收费标准">
                            <template slot-scope="scope">
                                      <span
                                    v-if="scope.row.carType==0">{{tccConfig.externalDesc}}</span>
                                      <span v-if="scope.row.carType==1">{{tccConfig.tempDesc}}</span>                    
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="车位起始时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.startTime}} - {{scope.row.endTime}}</span>
                                                    
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="创建时间"
                                prop="createDate">
                        </el-table-column>
                        <el-table-column label="操作"
                                         align="center" width="200">
                            <template slot-scope="scope">
                                <el-button @click="$_edit_$(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="$_remove_$(scope.row.id)" type="text" size="small">解绑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </Col>
            </Row>
        </div>
        <br>
        <!-- 列表 -->
        <div v-if="item.status" v-for="item in $_data7_$" class="lists" style="overflow:hidden; box-shadow:10px 0px 24px -2px #b5b5b5; margin-left:20px; margin-right:15px; float:left;width:30.3333%;">
             <div style="height:398px;" class="list">

                    <div class="img"><img v-if="item.images.length>0" :src="item.images[0].imageUrl"
                                          style="width: 100%;height: 100%" alt=""></div>
                  <div style="margin-left:15px;margin-top:15px;" class="record">
                    <p class="title" style="color:#333333;font-size:14px;display:inline;">{{item.name}}</p>
                    <p style="word-wrap:break-word;word-break:break-all; display:inline; float:right;margin-right:15px;font-size:16px;color:#3399ff;">
                        实时车位数:&nbsp;&nbsp;<span style="font-size:20px;color:#3399ff;">0</span></p>
                    <p style="word-wrap:break-word;word-break:break-all;font-size:14px;color:#666666;">地址:&nbsp;&nbsp;{{item.address}}</p>
                    <p style="font-size:14px;color:#666666;">容纳车位数:&nbsp;&nbsp;{{item.placeNumber}}</p>
                    <Button type="primary" style="height:40px;width:90px;border-radius:5px;margin-top:10px;" @click="$_yuyue_$(item.id)">立即预约</Button>
                    </div>
               </div>
        </div>
        <!-- 预约case1弹窗 -->
        <Modal v-model="modal1" title="提示">
            <Form :model="case1Form" ref="case1Form">
                <FormItem label="选择已有车辆" prop="cl">
                    <Select v-model="case1Form.cl" style="width:200px">
                        <Option v-for="item in carList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <p>确定要预约吗?</p>
            <div slot="footer" align="center">
                <Button type="ghost" @click="modal1 = false" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="$_submit_$">提交</Button>
            </div>
        </Modal>
        <!--  预约case2弹窗 -->
        <Modal v-model="modal2" title="提示">
            <p>您还没有添加车辆,去绑定?</p>
            <div slot="footer" align="center">
                <Button type="ghost" @click="modal2 = false" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="$_ok_$">确定</Button>
            </div>
        </Modal>
        <!-- 编辑车辆 -->
        <el-dialog title="更新车辆" :visible.sync="$_editmodal_$" >
            <el-form ref="editForm" :model="$_editForm_$" >
                <el-form-item ref="file" label="预览图">
                    <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            ref="editupload"
                            :show-file-list="false"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                             accept="image/png,image/gif,image/jpg,image/jpeg">
                     <img v-if="$_file_$" :src="$_file_$" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品牌" prop="name">
                    <el-input v-model="$_editForm_$.brand" style="width:55%!important;"></el-input>
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
    import axios from 'axios'

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
        filters: {
            formatType(val) {
                if (val == 0) {
                    return '外来车辆'
                }
                if (val == 1) {
                    return '临时车辆'
                }
                if (val == 2) {
                    return '固定车位'
                }
            }
        },
        data() {
            return {
                modal1: false,
                modal2: false,
                test: [
                    {
                        name: '11'
                    }
                ],
                case1Form: {  // 预约模态框
                    cl: 0
                },
                $_data6_$: [], // 员工绑定的车辆列表
                $_data7_$: [{}
                ], //
                zoneId: 0, // 园区id
                carList: [], // 车辆列表
                yuyueid: 0,
                $_editmodal_$: false, // 更新车辆
                carId: 0, // 车辆id
                id: 0, // 车辆id 解绑用
                baseUrl: 'http://img.yhcode.com:88/', // 图片基础路径
                $_editForm_$: {}, // 更新表单
                $_userInfo_$: {},
                imageList: [], // 回显图片列表
                $_file_$: [],
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },

                tccConfig: {
                    externalDesc: '',
                    tempDesc: ''
                }
            };
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_userInfo_$ = JSON.parse(cookie);
            this.$_global_$.imgPath
            // console.log(this.$_global_$.imgPath)
            // console.log(1111)
            this.$_sfbz_$();
            this.$_tcc_$();
            this.$_list_$();
        },
        methods: {
            //   获取员工车辆列表
            $_list_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + '/zone/car/employee/list',
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                 //   console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data6_$ = rsp.data.data.records
                            this.zoneId = rsp.data.data.records[0].zoneId
                            var arr = rsp.data.data.records
                            for (let i = 0; i < arr.length; i++) {
                                var temp = {}
                                var carNum = arr[i].province + arr[i].plateNumber
                                temp = {value: arr[i].id, label: carNum}
                                this.carList.push(temp)
                            }
                        } else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            //   预约
            $_yuyue_$(id) {
                this.yuyueid = id
                if (this.$_data6_$) {
                    this.modal1 = true
                } else {
                    this.modal2 = true
                }
            },
            // case1提交
            $_submit_$() {
                if (this.case1Form.cl !== 0) {
                   // console.log(this.case1Form)
                    this.$_sendQuery_$({
                        method: "POST",
                        url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/` + this.yuyueid + `/reserve`,
                        data: {
                            carId: this.case1Form.cl
                        },
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then((rsp) => {
                        console.log(rsp)
                        if (rsp.status === 200) {
                            if (rsp.data.code === 0) {
                                this.$Message.success('预约成功!');
                                this.modal1 = false;
                                this.$root.$_Route_$('employer', 'jump', 'yyjl', {})
                            } else {
                                this.$Message.error(rsp.data.message);
                            }
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            },
            // case2确定
            $_ok_$() {
                this.$root.$_Route_$('employer', 'jump', 'xzcl', {})
            },
            // 缴费记录
            $_jfjl_$() {
                this.$root.$_Route_$('employer', 'jump', 'jfjl', {})
            },
            // 预约记录
            $_ywjl_$() {
                this.$root.$_Route_$('employer', 'jump', 'yyjl', {})
            },
            // 添加
            $_add_$() {
                this.$root.$_Route_$('employer', 'jump', 'xzcl', {})
            },
            $_tcc_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/search`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data7_$ = rsp.data.data.records
                        }
                    }
                })
            },
            $_sfbz_$() {
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.$_userInfo_$.zoneId}/parkinglot/config`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                   // console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.tccConfig = rsp.data.data;
                            }
                        }
                    }
                })
            },
            // 编辑
            $_edit_$(row) {
              
                //console.log(row)
                this.imageList = [];
                this.$_file_$ = [];
            
                 //$('.el-upload--picture-card').css('display','none');
                this.carId = row.id;
               // this.imageList.push({url: row.imageUrl});
                this.$_file_$ = row.imageUrl
                this.$_editForm_$ = row;
                this.$_editmodal_$ = true
            },
            // 编辑提交
            $_editOk_$() {
                 if(this.$_file_$.constructor==Array){
                    this.$_editForm_$.imageUrl  = this.$_file_$[0];
                }else{
                    this.$_editForm_$.imageUrl  = this.$_file_$;
                }
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/car/update/${this.carId}`,
                    data: {
                        brand: this.$_editForm_$.brand,
                        imageUrl: this.$_editForm_$.imageUrl
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                   // console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('数据更新成功!');
                            this.$_list_$()
                        } else {
                            this.$Message.error('数据更新失败!');
                        }
                        this.$_editmodal_$ = false
                    }
                })
            },
            // 解绑
            $_remove_$(id) {
                this.id = id
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认解绑?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath + `/zone/car/remove/${this.id}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                           // console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('解绑成功!');
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message);
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info("取消成功");
                    }
                });

            },
            beforeuploadEdit(file) {
               // console.log(this.$_editForm_$)
            },
            // 移除
            handleRemoveEdit(file, fileList) {
                this.imageList.pop()

               // console.log(file, fileList);
                this.fileRmoveEdit(fileList);
            },
            // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                //  this.imageList.push(1);
                //$('.el-upload--picture-card').css('display','none');
                this.$_editForm_$.imageUrl = res.data;
                this.fileChangeEdit(fileList);
            },
            // 设置photo值
            fileChangeEdit(fileList) {
                // this.$_editForm_$.imageUrl = this.baseUrl+fileList[i].response.data;
                let a = ''
                 this.$_file_$=[]
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = this.$_global_$.imgPath + temp_str
                               console.log(a)

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                console.log(this.$_file_$)
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
                                //console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
               // console.log(this.$_file_$)
                // this.$set(this.$_editForm_$, 'images', this.$_file_$)
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                    }
                }
            }
        }
    };
</script>