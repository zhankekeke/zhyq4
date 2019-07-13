<style scoped>

    .mt10 {
        margin-top: 10px;
    }

</style>
<template>
    <div>
        <Button type="primary" @click="$_addRole_$" style="float: right">+ 新增角色</Button>
        <p style="clear: both"></p>

        <Row class="mt10">
            <!-- tablebox -->
            <Table :columns="$_columns7_$" :data="$_data6_$"></Table>
            <!-- 模态框 -->
            <!-- 创建角色 -->


            <!-- 树形控件 -->
            <Modal v-model="$_treeSetting_$" title="权限设置" :mask-closable="false">
                <div style="height: 400px;overflow-y: auto;">
                    <Tree
                            :data="treeData"
                            ref="rightsTree"
                            :load-data="loadData"
                            show-checkbox>
                    </Tree>
                </div>
                <div slot="footer">
                    <Button size="large" @click="editRightDialog()">取消</Button>
                    <Button type="primary" size="large" @click="handleEditRights()">确定</Button>
                </div>
            </Modal>
        </Row>
        <div class="mt10">共{{$_total_$}}条数据</div>
        <br>
        <!-- page分页 -->
        <!--         <Row style="float: right">


                <Page align="right" :total="$_total_$"
             show-elevator show-sizer
             :page-size="$_pageSize_$"
             @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>

        </Row> -->
    </div>
</template>
<script>
    import {Tree} from "element-ui";
    import controler from './controler.js';
    import "element-ui/lib/theme-chalk/index.css";

    export default {
        mixins: [controler],
        components: {
            [Tree.name]: Tree
        },
        data() {
            return {
                roleId: '',
                $_total_$: 0,//总数
                $_pageSize_$: 12,//一页1条数据
                $_treeSetting_$: false,    //tree
                $_querycfg_$: {
                    mod: '',
                    params: {
                        //hcuancan
                    }
                },

                $_columns7_$: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '角色层次',
                        key: 'type',
                        align: 'center',
                    },
                    {
                        title: '角色描述',
                        key: 'description',
                        align: 'center',
                    },
                    {
                        title: '资源',
                        key: 'resources',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            var a; var b;
                                if(params.row.flag == 0){
                                  a=""
                                }
                                if(params.row.flag == 1){
                                  a="编辑  "
                                }
                                if(params.row.flag == 0){
                                  b=""
                                }
                                if(params.row.flag == 1){
                                  b="删除  "
                                }
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            let a = JSON.parse(JSON.stringify(params.row));
                                            this.$_bianji_$(a)
                                        }
                                    }
                                }, a),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        color: "#f56c6c"
                                    },
                                    on: {
                                        click: () => {
                                            this.$_remove_$(params.row.id)
                                        },
                                    }
                                }, b),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_allot_$(params.row)
                                        }
                                    }
                                }, '权限设置'),
                            ]);
                        }
                    }
                ],
                //列表数据
                $_data6_$: [],
                // 树形控件
                treeData: [],

                id: '',
                $_nowData_$: [],
                tergetId: '',
            }
        },
        created() {
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {

            // 获取列表数据
            $_List_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/user/role/admin`,
                    data: {
                        pageSize: 9999
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        delete this.$_querycfg_$.params.name;
                        if (rsp.data.code === 0) {
                            this.$_editModal_$ = false;
                            this.$_data6_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.records.length;
                            for (var i = 0; i < rsp.data.data.records.length; i++) {
                                this.id = rsp.data.data.records[i].id;
                                if (rsp.data.data.records[i].type == 2) {
                                    this.$_data6_$[i].type = '园区级'
                                } else if (rsp.data.data.records[i].type == 1) {
                                    this.$_data6_$[i].type = '平台级'
                                } else if (rsp.data.data.records[i].type == 4) {
                                    this.$_data6_$[i].type = '员工'
                                } else if (rsp.data.data.records[i].type == 3) {
                                    this.$_data6_$[i].type = '企业级'
                                }
                            }
                            // this.$Message.success('数据更新成功!');
                        } else {
                            this.$Message.error('数据更新失败!');
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

            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        // this.list = rsp.data.obj;
                    }
                }
            },

            $_addRole_$() {
                this.$root.$_Route_$("superadmin", "jump", "jsxz");
            },
            //编辑
            $_bianji_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "jsbj", {row: row});
            },

            // 删除
            $_remove_$(index) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `
                            <p>确认删除该角色吗</p><br>        
                    `,
                    cancelText: "取消",
                    okText: "确定",
                    type: 'warning',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: this.$_global_$.serverPath + `/user/role/${index}`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$_editModal_$ = false;
                                    this.$Message.success('删除角色成功!');
                                    this.$_List_$();
                                } else {
                                    this.$Message.error('删除角色失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Modal.remove();
                        this.$Message.error('删除取消!');
                    }
                })
            },

            //点击权限
            $_allot_$(role) {
                if (role.type == '平台级') {
                    this.tergetId = 0;
                }
                if (role.type == '园区级') {
                    this.tergetId = 1;
                }
                this.roleId = role.id;
                this.$_treeSetting_$ = true;
                this.treeData = [];
                this.$_nowData_$ = [];
                //获取该角色拥有的权限
                this.$_sendQuery_$({
                    method: "GET",
                    url: this.$_global_$.serverPath + `/user/role/${role.id}/resource`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            //点击授权弹框，保存当前被授权的角色
                            //如果有孩子就还原原来数据
                            for (let i = 0; i < rsp.data.data.length; i++) {
                                this.$_nowData_$.push(rsp.data.data[i]);
                                if (rsp.data.data[i].child) {
                                    this.$_hy_$(rsp.data.data[i]);
                                    //console.log( this.$_hy_$(rsp.data.data[i]))
                                }
                            }
                            this.$_sendQuery_$({
                                method: "GET",
                                url: this.$_global_$.serverPath + `/user/resource/menu/` + this.tergetId,
                                data: {},
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((rsp) => {
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        let arr = rsp.data.data;
                                        if (arr.length == 0) {
                                            this.$Message.success('该分类下暂无分类')
                                        } else {
                                            for (let i = 0; i < arr.length; i++) {
                                                let temp = {};
                                                temp = {
                                                    id: arr[i].id,
                                                    title: arr[i].name,
                                                    type: 'top',
                                                    loading: false,
                                                    indeterminate: false,
                                                    children: []
                                                };
                                                for (let j = 0; j < this.$_nowData_$.length; j++) {
                                                    if (this.$_nowData_$[j].id === temp.id) {
                                                        temp.indeterminate = true;
                                                    }
                                                }
                                                if(role.flag==0){
                                                    temp.disableCheckbox = true;
                                                }
                                                this.treeData.push(temp)
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            },
            //数据还原
            $_hy_$(node, num = 0) {
                //现在选中一级分类和一级分类下得子数据
                console.log(node)
                console.log(num)
                if (!node) {
                    return;
                }
                if (num !== 0) { //一级是0 子级选中是1，没选中不显示
                    //现有得数据
                    this.$_nowData_$.push(node);
                    console.log(this.$_nowData_$)//num 每选中一次，循环加入到数组中
                }
                num++;
                if (node.child && node.child.length > 0) {
                    let i = 0;
                    for (i = 0; i < node.child.length; i++) {

                        this.$_hy_$(node.child[i], num);
                    }
                }
            },
            //一级分类下子分类得子分类
            loadData(item, callback) {
                // console.log(item);return;
                this.$_sendQuery_$({
                    method: 'GET',
                    url: this.$_global_$.serverPath + `/user/resource/menu/${item.id}/child`,
                    data: {},
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            let data = [];
                            let arr = rsp.data.data;
                            if (arr.length == 0) {
                                this.$Message.success('该分类下无子分类')
                            } else {
                                for (let i = 0; i < arr.length; i++) {
                                    let temp = {
                                        id: arr[i].id,
                                        title: arr[i].name,
                                        loading: false,
                                        checked: false,
                                        children: []
                                    };
                                    for (let j = 0; j < this.$_nowData_$.length; j++) {
                                        if (this.$_nowData_$[j].id === temp.id) {
                                            temp.checked = true;
                                        }
                                    }
                                    if(item.disableCheckbox){
                                        temp.disableCheckbox = true;
                                    }
                                    data.push(temp)
                                }
                            }
                            callback(data)
                        }
                    }
                })
            },

            //权限确定
            handleEditRights() {
                this.$_treeSetting_$ = false;
                let checkedNodes = this.$refs.rightsTree.getCheckedNodes();
                let data = [];
                for (let i = 0; i < checkedNodes.length; i++) {
                    if (!checkedNodes[i].type) {
                        data.push({
                            resourceId: checkedNodes[i].id,
                        })
                    } else {
                        this.$_sendQuery_$({
                            method: 'GET',
                            url: this.$_global_$.serverPath + `/user/resource/menu/${checkedNodes[i].id}/child`,
                            data: {},
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((rsp) => {
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    let arr = rsp.data.data;
                                    if (arr.length == 0) {
                                        this.$Message.success('该分类下无子分类')
                                    } else {
                                        for (let i = 0; i < arr.length; i++) {
                                            data.push({
                                                resourceId: arr[i].id
                                            });
                                            this.$_sendQuery_$({
                                                method: 'PUT',
                                                url: this.$_global_$.serverPath + `/user/role/${this.roleId}/resource`,
                                                data: data
                                            }).then((res) => {
                                                if (res.status === 200) {
                                                    if (res.data.code === 0) {
                                                        this.$Message.success('授权成功');
                                                        this.$_treeSetting_$ = false;
                                                        this.$root.$_Route_$('superadmin', 'system', 'rolemanage');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }

                        })
                    }
                }
                this.$_sendQuery_$({
                    method: 'PUT',
                    url: this.$_global_$.serverPath + `/user/role/${this.roleId}/resource`,
                    data: data
                }).then((res) => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            this.$Message.success('授权成功');
                            this.$_treeSetting_$ = false;
                            this.$root.$_Route_$('superadmin', 'system', 'rolemanage');
                        }
                    }
                })
            },
            //权限取消
            editRightDialog() {
                this.$_treeSetting_$ = false
            }
        }
    }
</script>