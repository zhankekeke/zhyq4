<style scoped>
    .lm {
        color: red;
        font-size: 20px;
    }

    .zdtb {
        font-size: 12px;
        /* padding:0px 5% 0px 5%; */
        color: #666;
        line-height: 18px;
        font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    }

    .bg {
        padding: 10px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mr5 {
        margin-right: 5px;
    }

    .mt300 {
        margin-top: 300px;
    }

    .btclass {
        background: #3399ff;

    }


</style>
<template>
    <div class="zdtb">
        <div class="company-manabge bg">
            <span style=" color: black">公司名称：</span>
            <Select @on-change='changeCompany' v-model.trim="$_companyName_$" style="width:210px" filterable>
                <Option v-for="item in rzCompany" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <span style="margin-left: 2%;color: black">用户名称：</span>
            <Input v-model.trim="$_userName_$" placeholder="请输入用户名称" style="width:210px"></Input>
            <span style="margin-left: 2%; color: black">手机号：</span>
            <Input v-model.trim="$_phone_$" placeholder="请输入手机号" style="width:210px"></Input>
            <Button style="margin-left: 2%" type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <br>
        <br>
        <!-- 首行框 -->

        <Row class="mt10">
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <Modal v-model="$_modal2_$" style="width:555px;"
                   title="角色授予" :mask-closable="false">
               <el-transfer
                v-model="rightData"
                :props="{
                    key: 'id',
                    label: 'name'
                 }"
                 :disabled="false"
                @change="handleChange"
                :data="leftData">
            </el-transfer>
                <div slot="footer">
                    <Button type="ghost" @click="$_modal2_$ = false">取消</Button>
                    <Button type="primary" @click="userRoler()">确定</Button>
                </div>
            </Modal>
        </Row>
        <br>
        <br>
        <Row>
            <span style=" float: left;font-size: 14px; color: black;margin-left: 10px;">共{{total}}条数据</span>
            <Page align="right" :total="total"
                  style="float: right"
                  show-elevator show-sizer
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
    </div>

</template>

<script>
    import controler from './controler.js';
    import {Transfer} from 'element-ui'
    export default {
        mixins: [controler],
        components:{
            [Transfer.name]:Transfer
        },
        data() {
            return {
                $_page_$: 1,
                $_pageSize_$: 10,
                $_role_$: '',
                $_userName_$: '',
                //element 穿梭
                leftData: [],
                leftRole:[],
                rightData:[],
                rightRole:[],
                selected:[],
                del:[],

                $_phone_$: '',
                $_companyName_$: "", // 
                $_selected_$: "全部", // 默认选中
                $_statusList_$: [
                    // 状态值
                    {
                        value: "手动输入",
                        label: "手动输入"
                    },
                    {
                        value: "地址关联",
                        label: "地址关联"
                    }
                ],
                $_modal2_$: false,
                $_data1_$: [],
                $_targetKeys1_$: [],
                yjfpRole: [],
                selected: [],
                del: [],
                rzCompany: [],
                //传api
                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                $_formValidate_$: {
                    $_parkName_$: "",
                    $_address_$: "",
                    $_fullAddress_$: "",
                },
                $_ruleValidate_$: {},
                $_columns7_$: [
                    {
                        title: '编号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.$_page_$ - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: '用户名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        align: 'center',
                        render: (h, params) => {
                            var a;
                            if (params.row.sex == 0) {
                                a = "男";
                            }
                            if (params.row.sex == 1) {
                                a = "女";
                            }
                            return h("span", {}, a);
                        }
                    },
                    {
                        title: '手机号',
                        key: 'phoneNumber',
                        align: 'center',
                    },
                    // {
                    //     title: '所属公司',
                    //     key: 'enterpriseName',
                    //     align: 'center',
                    // },
                    {
                        title: '已授权角色',
                        key: 'roleNames',
                        align: 'center',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, params.row.roleNames)
                        }
                    },
                    {
                        title: '注册时间',
                        key: 'createDate',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "5px",
                                        color: "#059BFA"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row.id)
                                        }
                                    }
                                }, '角色授予'),
                            ]);
                        }
                    }
                ],
                $_data6_$: [],//表格数据
                total: 0,
                userId: 0,
                companyId: 0,
            }
        },
        created() {
            this.$_list_$();
            //this.left()
           // this.right()
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        watch: {
            model() {
            }
        },
        methods: {
            //入住企业列表
            $_list_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_querycfg_$.mod = `zone/zone/${userInfo.zoneId}/enterprise/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    value: arr[i].id,
                                    label: arr[i].name
                                }
                                this.rzCompany.push(temp)
                            }
                            this.$_companyName_$ = arr[0].id
                            this.companyId = this.$_companyName_$
                            this.$_List_$()
                        }
                    }
                })
            },
            changeCompany(value) {
                //根据入住企业获取员工
                this.$_companyName_$ = value
                this.companyId = value
                this.$_List_$()
            },
            // 列表
            $_List_$() {
                this.$_querycfg_$.mod = `company/company/${this.companyId}/employee/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        // delete this.$_querycfg_$.params.enterpriseName;
                        delete this.$_querycfg_$.params.name;
                        delete this.$_querycfg_$.params.phoneNum;
                        delete this.$_querycfg_$.params.enterpriseName
                        if (rsp.data.code === 0) {
                            if (rsp.data.data) {
                                this.$_page_$ = rsp.data.data.current;
                                this.$_data6_$ = rsp.data.data.records
                                this.total = rsp.data.data.total
                            } else {
                                this.$_data6_$ = []
                                this.total = 0
                            }
                        }
                    }
                })
            },
            //数据下一页
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
//页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            // 搜索
            $_search_$() {
                //  if(this.$_companyName_$){
                //     this.$_querycfg_$.params.enterpriseName = this.$_companyName_$;
                // }
                if (this.$_userName_$) {
                    this.$_querycfg_$.params.name = this.$_userName_$;
                }
                if (this.$_phone_$) {
                    this.$_querycfg_$.params.phoneNum = this.$_phone_$;
                }
                // if(this.$_role_$){
                //     this.$_querycfg_$.params.roleNames = this.$_role_$;
                // }
                this.$_List_$();
            },
             $_allot_$(id) {
                this.$_modal2_$ = true;
                this.userId = id
                this.rightData = [] 
                this.del = []
                this.$_left_$()
                this.right()
            },
            // 左边，获取已经存在得角色
            $_left_$() {
                var leftRole=[]
                //this.leftData = [
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/user/role/zone/${userInfo.zoneId}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    //console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data
                           for(var i=0;i<arr.length;i++){
                              var temp ={}
                              temp={
                                  id:arr[i].id,
                                  name:arr[i].name
                              }
                             
                              leftRole.push(temp)
                            
                           }
                        } 
                      // console.log(this.leftRole)
                        this.leftData = leftRole

                    }
                })
            },
            right() {
                 this.rightRole=[]
                this.rightData = []
                this.$_sendQuery_$({
                    method: "GET",
                    url: `${this.$_global_$.serverPath}/user/role/user/${this.userId}`,
                    data: {},
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            //本身拥有的admin
                            var role = rsp.data.data
                            if (role.length == 0) {
                                this.$Message.success('没有已经分配的')
                            } else {
                                for (var i = 0; i < role.length; i++) {
                                    this.rightRole.push(role[i].id)

                                }

                            }
                            this.rightData = this.rightRole
                        }
                    }
                })
            },
            $_render1_$(item) {
                return item.label;
            },
             handleChange(value,direction,moveKeys){
                 //新值
                 console.log(value)
                 console.log(direction)
                 //到右边的，movekeys这些值添加到右边
                 console.log(moveKeys)
                    if(direction == 'right'){
                        var left=[]
                       this.rightData = value
                      // this.del = moveKeys
                      // console.log(this.rightData)
                    
                     if(this.rightData.length !=0 && moveKeys.length !=0){
                         for (let i=0;i<moveKeys.length;i++){
                             let flag = true
                           
                             for(let j=0;j<this.rightData.length;j++){
                                 if(moveKeys[i] == this.rightData[j]){
                                     flag = false
                                    
                                    
                                 }
                             }
                            left.push({id:moveKeys[i]})
                            console.log(left)
                            this.del = left

                           
                          
                         }
                     }

                    }
                  if(direction == 'left'){
                      var right = []
                       if(this.leftData.length !=0 && moveKeys.length !=0){
                         for (let i=0;i<moveKeys.length;i++){
                             let flag = false
                             for(let j=0;j<this.leftData.length;j++){
                                 if(moveKeys[i] == this.leftData[j]){
                                     flag = true
                                    
                                    
                                 }
                             }
							 //删除右边丢掉的数据
                            right.push({id:moveKeys[i]})
                           
                            this.del = right
                           
                          
                         }
                     }

                  }
            },
           
            userRoler() {
                console.log(this.del)
                //要把右边的传到后台
                this.selected = []
               if(this.rightRole.length !=0){
                   for(let i=0;i<this.rightData.length;i++){
                       let flag = true
                       for(let j=0;j<this.rightRole.length;j++){
                           if(this.rightData[i].id == this.rightRole[j].id){
                               flag = false
                           }
                        }
                           this.selected.push({id:this.rightData[i]})
                           console.log(this.selected)
                       
                     }
                   } else{
                       for(var i=0;i<this.rightData.length;i++){
                           this.selected.push({id:this.rightData[i]})
                    }
                 }
                //var userid = this.selected.join(',')
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/user/user/${this.userId}/roles`,
                    data: {
                        add: this.selected,
                        del: this.del
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success("授予成功!")
                            this. $_left_$()                       
                            this.$_modal2_$ = false
                            this.$_List_$()
                        } else {
                            this.$Message.error("授予失败!")
                        }
                    }
                })
            }

        },


    }
</script>







