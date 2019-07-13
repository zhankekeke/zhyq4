<style scoped>
    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
</style>

<template>
   <div>
        <Row>
            <Col span="4"><span style="font-size:16px; font-weight: bold">分类管理</span></Col>
            <Col span="12" offset="8" align="right">
                    <Button type="primary" @click="$_addSort_$()">添加分类</Button>
                    <!-- <Button type="primary" @click="$_addChildSort_$()">添加子分类</Button> -->
            </Col>
        </Row>
        <br>
        <Row>
            <Table  @on-expand="expand"  :columns="$_columns7_$" :data="$_data6_$" ></Table>
        </Row> 
        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="$_addmodal_$">
          <el-form ref="addForm" :model="$_addForm_$" :rules="$_addRuleValidate_$" label-width="90px">
              <el-form-item label="分类名称" prop="name" placeholder="请输入分类名称">
                <el-input v-model="$_addForm_$.name"></el-input>
            </el-form-item>
              <el-form-item label="排序号" prop="sortNum" placeholder="请输入排序号">
                <el-input v-model="$_addForm_$.sortNum"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <el-select v-model="$_addForm_$.parentId" prop="parentId" placeholder="请选择">
                    <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="$_addmodal_$ = false">取 消</el-button>
            <el-button type="primary" @click="$_addOK_$()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑分类 -->
        <el-dialog title="编辑分类" :visible.sync="$_editmodal_$">
          <el-form ref="addForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="$_editForm_$.name"></el-input>
            </el-form-item>
              <el-form-item label="排序号" prop="sortNum">
                <el-input v-model="$_editForm_$.sortNum"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="$_editmodal_$ = false">取 消</el-button>
            <el-button type="primary" @click="$_addEdit_$()">确 定</el-button>
          </div>
        </el-dialog>
         <!-- 新增分类 -->
        <el-dialog title="新增子分类" :visible.sync="$_addChildmodal_$">
          <el-form ref="addCForm" :model="$_addcForm_$" :rules="$_addChildRuleValidate_$" label-width="90px">
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="$_addcForm_$.name"></el-input>
            </el-form-item>
              <el-form-item label="排序号" prop="sortNum">
                <el-input v-model="$_addcForm_$.sortNum"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <el-select v-model="$_addcForm_$.parentId" prop="parentId" placeholder="请选择">
                    <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="$_addChildmodal_$ = false">取 消</el-button>
            <el-button type="primary" @click="$_addChild_$()">确 定</el-button>
          </div>
        </el-dialog>  
   </div>
</template>

<script>
import controler from './controler.js'
import expandRow from './tableExpand.vue'
import axios from 'axios'
import { Button,Form,Dialog,Input,FormItem,Upload,Select,Option } from 'element-ui';
export default {
    mixins: [controler],
    components: { 
        expandRow,
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
            $_columns7_$: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                                props: {
                                    $_row_$: this.propList
                                },
                        })
                    }
                },
                {
                    title: '服务分类名称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '排序号',
                    key: 'sortNum',
                    align: 'center'
                },
                // {
                //     title: '缩略图',
                //     key: 'imgUrl',
                //     align: 'center',
                //    render:(h,params)=>{
                //        return h("img",{
                //            attrs:{
                //                src:params.row.imgUrl,
                //                width:"60px",
                //                height:"40px"
                //            }
                //        })
                //    }
                // },
                {
                    title: '创建时间',
                    key: 'createDate',
                    align: 'center'
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
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:200,
                    render: (h, params) => {
                        var a
                        if(params.row.status == 0){
                            a = '上架'
                        }if(params.row.status == 1){
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
                                        this.$_remove_$(params.row)
                                    }
                                }
                            }, '删除'),
                             h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: "#059BFA"
                                },
                                on: {
                                    click: () => {
                                        this.$_edit_$(params.row)
                                    }
                                }
                            }, '编辑'),
                             h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px',
                                    color: "#059BFA"
                                },
                                on: {
                                    click: () => {
                                        if(params.row.status == 0){
                                        this.$_upShelf_$(params.row)
                                        }if(params.row.status == 1){
                                        this.$_downShelf_$(params.row)
                                        }
                                    }
                                }
                            }, a),
                            
                        ]);
                    }
                }

            ],
            $_data6_$: [ ], // 表格数据
            id:0, // 展开时获取
            zoneId: 0,  // 展开时获取
            propList:[],
            $_addmodal_$:false, // 添加分类
            $_addForm_$:{  // 新增表单
                name: '',
                sortNum:''
            },
            $_addRuleValidate_$:{
                name: [
                {required: true,message: '分类名称不能为空', trigger: 'change'},
                {type: 'string',validator:this.$_validatestr_$, trigger: 'change'},
                {
                  type:'string', max: 20,message: '分类名称不能超过20字',trigger: 'change'
                }
                ],
                sortNum: [
                { required: true,message: '分类排序不能为空', trigger: 'change' },
                { validator:this.$_validatenum_$,message: '分类排序必须是数字', trigger: 'change' },
                    {max:6,message: '分类排序不能超过6位数', trigger: 'change' }
                ],
            },
            $_editmodal_$:false, // 编辑分类
            $_editForm_$:{}, // 编辑表单
            $_userInfo_$:{}, 
            $_addChildmodal_$: false, // 新增子分类
            $_addcForm_$:{
                parentId:'',
                name:'',
                sortNum:''
            },
            $_addChildRuleValidate_$:{
                name: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],parentId: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
            },
            parentSelect:[]
        } 
    },
    created(){
        this.$_global_$.serverPath
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.$_userInfo_$ = JSON.parse(cookie);
        this.list()
        this.$_list_$()
    },
    methods: {
        // 列表数据
        list(){
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + '/zone/zone/'+this.$_userInfo_$.zoneId+'/service/category/0/pageList',
                data:{},
                headers:{
                    "Content-type": "application/json"
                }
            }).then((rsp)=>{
                ////console.log(rsp)
                if(rsp.status === 200){
                    if(rsp.data.code === 0){
                        this.$_data6_$ = rsp.data.data.records
                    }
                }
            })
        },
        // 添加分类
            $_addSort_$(){
                for (let key in this.$_addForm_$) {
                    this.$_addForm_$[key] = ''
                }
                this.$_addmodal_$ = true
            },
            // 添加分类确定
            $_addOK_$(){
                this.$refs.addForm.validate((valid) => {
                if(valid){
                    if(this.$_addForm_$.parentId){
                        this.$_sendQuery_$({
                            method:"POST",
                            url:`${this.$_global_$.serverPath}/zone/zone/`+this.$_userInfo_$.zoneId+`/service/category`,
                            data:{
                                parentId: this.$_addForm_$.parentId,
                                    name:this.$_addForm_$.name,
                                    sortNum: Number(this.$_addForm_$.sortNum)
                            },
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            //console.log(rsp)
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                }else{
                                    this.$Message.error(rsp.data.message)
                                }
                                this.$_addmodal_$ = false
                            }
                        })
                    }else{
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath+'/zone/zone/'+this.$_userInfo_$.zoneId+'/service/category',
                            data:{
                               parentId:0,
                                sortNum: Number(this.$_addForm_$.sortNum),
                                name: this.$_addForm_$.name
                            },
                            headers:{
                                "Content-type":"application/json"
                            }
                        }).then((rsp)=>{
                            //console.log(rsp)
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                }else{
                                    this.$Message.error(rsp.data.message)
                                }
                                this.$_addmodal_$ = false
                            }
                        })
                    }
                }else{
                    this.$Message.error('Fail!');
                }    
            })
            },
            // 删除分类
            $_remove_$ (row) {
                this.$Modal.confirm({
                title: '提示',
                content: `<p>确认删除该分类吗</p><br>`,
                cancelText:"取消",
                okText:"确定",
                type: 'warning',
                onOk:() => {
                    this.$_sendQuery_$({
                        method:"DELETE",
                        url:this.$_global_$.serverPath+`/zone/zone/${row.zoneId}/service/category/${row.id}`,
                        data:{},
                        headers:{
                            "Content-type":"application/json"
                        }
                    }).then((rsp)=>{
                        //console.log(rsp)
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                this.$Message.success(rsp.data.message)
                                this.list()
                            }else{
                                this.$Message.error(rsp.data.message)
                            }
                        }
                    })
                },
                onCancel:() =>{
                    
                } 
            })
            },
            // 编辑
            $_edit_$ (row) {
                  this.$_editForm_$ = row
                  this.$_editmodal_$ = true
            }, 
            // 编辑确定
            $_addEdit_$(){
                this.$_sendQuery_$({
                    method:"PUT",
                    url: this.$_global_$.serverPath+`/zone/zone/${this.$_editForm_$.zoneId}/service/category/${this.$_editForm_$.id}`,
                    data:{
                        parentId: this.$_editForm_$.parentId,
                        name:this.$_editForm_$.name,
                        sortNum: Number(this.$_editForm_$.sortNum)
                    },
                    headers:{"COntent-type":"application/json"}
                }).then((rsp)=>{
                    //console.log(rsp)
                    if(rsp.status === 200){
                        if(rsp.data.code === 0){
                            this.$Message.success(rsp.data.message)
                            this.list()
                        }else{
                            this.$Message.error(rsp.data.message)
                        }
                        this.$_editmodal_$ = false
                    }
                })
            },
            // 分类上线  
            $_upShelf_$(row){
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath+`/zone/zone/${row.zoneId}/service/category/${row.id}/online`,
                            data:{},
                            headers:{
                                "Content-type": "application/json"
                            }
                        }).then((rsp)=>{
                            //console.log(rsp)
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                }else{
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    
                    }
                });
            },
            // 分类下线
            $_downShelf_$(row){
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "POST",
                            url: this.$_global_$.serverPath+`/zone/zone/${row.zoneId}/service/category/${row.id}/offline`,
                            data:{},
                            headers:{
                                "Content-type": "application/json"
                            }
                        }).then((rsp)=>{
                            //console.log(rsp)
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success(rsp.data.message)
                                    this.list()
                                }else{
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    
                    }
                });
            },
            // 获取展开表格的信息
        $_eList_$(){
            this.$_sendQuery_$({
            method:"POST",
            url:this.$_global_$.serverPath+`/zone/zone/${this.zoneId}/service/category/${this.id}/pageList`,
            data:{},
            headers:{
              "Content-type":"application/json"
            }
          }).then((rsp)=>{
            //console.log(rsp)
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.propList = []
                this.propList = rsp.data.data.records
                //console.log(this.propList)
              }else{}
            }
          })
        },
        // 展开方法
        expand(row,status){
            //console.log(status)
            this.id = row.id
            this.zoneId = row.zoneId
            if(status){
                this.$_eList_$()
            }
        },
        // 获取父级分类列表
        $_list_$(){
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath+ '/zone/zone/'+this.$_userInfo_$.zoneId+'/service/category/0/pageList',
                data:{},
                headers:{
                    "Content-type": "application/json"
                }
            }).then((rsp)=>{
                //console.log(rsp)
                if(rsp.status === 200){
                    if(rsp.data.code === 0){
                        var arr = rsp.data.data.records;
                        for(var i= 0;i< arr.length; i++){
                            var select={}
                            select = {
                                value: arr[i].id,
                                label: arr[i].name
                            }
                            this.parentSelect.push(select)
                        }
                    }
                }
            })
        },
        // 添加子分类
        $_addChildSort_$(){
            for (let key in this.$_addcForm_$) {
                    this.$_addcForm_$[key] = ''
                }
            this.$_addChildmodal_$ = true
        },
        // 添加子分类确定
        $_addChild_$(){
            this.$refs.addCForm.validate((valid) => {
                if(valid){
                    this.$_sendQuery_$({
                        method:"POST",
                        url:`${this.$_global_$.serverPath}/zone/zone/`+this.$_userInfo_$.zoneId+`/service/category`,
                        data:{
                            parentId: this.$_addcForm_$.parentId,
                                name:this.$_addcForm_$.name,
                                sortNum: Number(this.$_addcForm_$.sortNum)
                        },
                        headers:{"Content-type":"application/json"}
                    }).then((rsp)=>{
                        //console.log(rsp)
                        if(rsp.status === 200){
                            if(rsp.data.code === 0){
                                this.$Message.success(rsp.data.message)
                                this.$_addChildmodal_$ = false
                            }else{
                                this.$Message.error(rsp.data.message)
                            }
                        }
                    })
                }else{
                    this.$Message.error('Fail!');
                }    
            })
        }
    }
}
</script>