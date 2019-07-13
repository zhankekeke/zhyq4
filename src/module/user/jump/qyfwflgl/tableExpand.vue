<style scoped>
    .operation a{
        margin-right:5px;
    }
</style>
<template>
        <div class="mmdd">
                    

                <div class="mytd">
                    <Table  :columns="$_columns7_$" :data="$_data7_$" :show-header=false ></Table>
                </div>    
                <!-- 编辑分类 -->
            <el-dialog title="编辑分类" :visible.sync="$_editmodal_$">
            <el-form ref="addForm" :model="$_editForm_$" :rules="$_addRuleValidate_$" label-width="90px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="$_editForm_$.name"></el-input>
                </el-form-item>
                <el-form-item label="排序号" prop="sortNum">
                    <el-input v-model="$_editForm_$.sortNum"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-select v-model="$_editForm_$.parentId" prop="parentId" placeholder="请选择">
                        <el-option v-for="item in parentSelect" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_editmodal_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_addEdit_$()">确 定</el-button>
            </div>
            </el-dialog>  
        </div>
</template>
<script>
import axios from 'axios'
import { Button,Form,Dialog,Input,FormItem,Upload,Select,Option } from 'element-ui';
   export default {
        props: {
            $_row_$: '',
        },
        components: { 
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
            $_editmodal_$:false,
            id:0,
            $_data7_$:[],
            $_userInfo_$:{}, 
            $_editForm_$:{}, // 编辑表单
            $_addRuleValidate_$:{
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
        // this.$_list_$()
    },
    methods:{
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
        // 删除
       $_remove_$(row){
        this.$_sendQuery_$({
            method:"DELETE",
            url:this.$_global_$.serverPath+`/zone/zone/${row.zoneId}/service/category/${row.id}`,
            data:{
            },
            headers:{
              "Content-type":"application/json"
            }
          }).then((rsp)=>{
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.$_editModal_$ = false
                this.$Message.success('删除数据成功!');
              }else{
                this.$Message.error('删除数据失败!');
              }
            }
          })
       }, 
    //    上架
       $_upShelf_$(row){
            this.id = row.id
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
                                this.$_editModal_$ = false
                                this.$Message.success('上架成功!');
                                this.list()
                            }else{
                                this.$Message.error('上架失败')
                            }
                        }
                    })
                },
                onCancel: () => {
                
                }
            });
        },
    //    下架
       $_downShelf_$(row){
            this.id = row.id
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
                                this.$_editModal_$ = false
                                this.$Message.success('下架成功!');
                                this.$_list_$()
                            }else{
                                this.$Message.error('下架失败')
                            }
                        }
                    })
                },
                onCancel: () => {
                
                }
            });
       },
       list(){
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + '/zone/zone/'+this.$_userInfo_$.zoneId+'/service/category/'+this.id+'/pageList',
                data:{},
                headers:{
                    "Content-type": "application/json"
                }
            }).then((rsp)=>{
                ////console.log(rsp)
                if(rsp.status === 200){
                    if(rsp.data.code === 0){
                        this.$_data7_$ = rsp.data.data.records
                    }
                }
            })
        },
    //    编辑
       $_edit_$(row){
           this.$_editmodal_$ = true
           this.$_editForm_$ = row
       },
       // 编辑确定
            $_addEdit_$(){
                this.$refs.addForm.validate((valid) => {
                    if(valid){
                        this.$_sendQuery_$({
                            method:"PUT",
                            url: this.$_global_$.serverPath+`/zone/zone/${this.$_editForm_$.zoneId}/service/category/${this.$_editForm_$.id}`,
                            data:{
                                parentId: this.$_editForm_$.parentId,
                                name:this.$_editForm_$.name,
                                sortNum: Number(this.$_editForm_$.sortNum)
                            },
                            headers:{"Content-type":"application/json"}
                        }).then((rsp)=>{
                            if(rsp.status === 200){
                                if(rsp.data.code === 0){
                                    this.$Message.success(rsp.data.message)
                                }else{
                                    this.$Message.error(rsp.data.message)
                                }
                                this.$_editmodal_$ = false
                            }
                        })
                    }else{
                        this.$Message.error('Fail!');
                    }    
                })
                
            },
    }
   }
</script>