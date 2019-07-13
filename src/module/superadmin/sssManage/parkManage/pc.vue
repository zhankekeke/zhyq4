<style scoped>

    .search {
        font-size: 14px;
    }

    >>> .el-input__inner {
        height: 30px;
        font-size: 12px;
    }

    >>> .ivu-table-cell {
        padding: 0;
    }
</style>
<template>
    <div>
        <!-- 搜索 -->
        <div class="search">
            园区切换:&nbsp;&nbsp;
            <Select @on-change='changeZone' v-model="$_yqSelected_$" style="width:150px">
                <Option v-for="item in zoneList" :value="item.value" :key="item.value" slot>{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;停车场名称:&nbsp;&nbsp;
            <Input v-model="$_parkName_$" style="width: 210px" placeholder="请输入停车场名称"></Input>
            &nbsp;&nbsp;状态:&nbsp;&nbsp;
            <Select v-model="$_selected_$" style="width:210px">
                <Option v-for="item in $_statusList_$" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <Row style="margin-top: 10px">
            <Col align="right">
                <Button type="primary" icon="plus" @click="$_addPark_$('upload')">新增停车场</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" @click="$_addsfbz_$()">收费标准</Button>
            </Col>
        </Row>
        <br>
        <Table :columns="parkColumns" :data="$_parkInfo_$"></Table>
        <div style="margin-top: 10px">共{{$_totalSize_$}}条数据</div>
        <br>
        <!-- page分页 -->
        <Row style="float: right">
            <Page align="right" :total="$_totalSize_$"
                  show-elevator
                  :page-size="$_pageSize_$"
                  @on-page-size-change="$_pageNum_$"
                  @on-change="$_changePage_$"/>
        </Row>
        <!-- 新增收费标准 -->
        <el-dialog :title="$_sftitle_$" :visible.sync="$_addsfmodal_$" :close-on-click-modal="closemodal">
            <el-form ref="addForm" :model="$_addsfForm_$" :rules="$_addsfRuleValidate_$" label-width="90px">
                <el-form-item label="临时车辆" prop="externalDesc">
                    <el-input v-model="$_addsfForm_$.externalDesc" placeholder="请输入金钱" style="width: 200px"></el-input>
                    元/小时
                </el-form-item>
                <el-form-item label="外来车辆" prop="tempDesc">
                    <el-input v-model="$_addsfForm_$.tempDesc" placeholder="请输入金钱" style="width: 200px"></el-input>
                    元/小时
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$_addsfmodal_$ = false">取 消</el-button>
                <el-button type="primary" @click="$_addsfOK_$()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import {Table, Button, TableColumn, Form, Dialog, Input, FormItem, Select, Upload, Option} from 'element-ui';
    import controler from './controler.js';
    import 'element-ui/lib/theme-chalk/index.css';

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
            [Upload.name]: Upload,
            [Option.name]: Option,
        },
        filters: {
            formatStatus(val) {
                if (val === 0) {
                    return '下架'
                }
                if (val === 1) {
                    return '上架'
                }
            }
        },
        data() {
            return {
                closemodal: false,  //是否可以通过点击遮罩层关闭 Dialog
                $_parkName_$: "", // 停车场名称
                $_selected_$: 1, // 默认选中
                $_yqSelected_$: "",
                $_statusList_$: [ // 状态值
                    {
                        value: 1,
                        label: "全部"
                    },
                    {
                        value: 2,
                        label: "上架"
                    },
                    {
                        value: 3,
                        label: "下架"
                    }
                ],
                $_totalSize_$: 0, //数据总数
                $_pageSize_$: 12, // 默认每页条数
                $_parkInfo_$: [],//虚拟表格数据
                $_addsfmodal_$: false,  //
                $_sftitle_$: "收费标准",// 收费标准弹窗标题
                $_file_$: [],
                dialogImageUrl: '',

                $_addsfForm_$: {
                    externalDesc: '',
                    tempDesc: ''
                },
                $_addsfRuleValidate_$: {
                    externalDesc: [
                        {required: true, message: '临时车辆收费不能为空！', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 6, message: '临时车辆收费不能超过6位数', trigger: 'change'}
                    ],
                    tempDesc: [
                        {required: true, message: '外来车辆收费不能为空!', trigger: 'change'},
                        {validator: this.$_validatepostiveint_$, trigger: 'change'},
                        {max: 6, message: '外来车辆收费不能超过6位数', trigger: 'change'}
                    ]

                },

                $_querycfg_$: {
                    mod: '',
                    params: {}
                },
                zoneId: 0,
                parkColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                    }, {
                        title: "缩略图",
                        key: "img",
                        align: "center",
                        width: 115,
                        render: (h, params) => {
                            return h("div", {},
                                [h("img", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    attrs: {
                                        src: params.row.images[0].imageUrl,
                                        style: "width: 110px;height: 50px;border-radius: 5px;margin: 20px 0px;"
                                    },
                                })]
                            );
                        }
                    },
                    {
                        title: '名称',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: '地址',
                        key: 'address',
                        align: 'center',
                    }, {
                        title: '总车位数',
                        key: 'placeNumber',
                        align: 'center',
                    }, {
                        title: '实时余位',
                        key: ' ',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {}, '未知')
                        }
                    }, {
                        title: '创建时间',
                        key: 'createDate',
                        align: 'center',
                        width: 115,
                    }, {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => {
                            let text = params.row.status == 0 ? '下架' : '上架';
                            return h('div', {}, text)
                        }
                    }, {
                        title: '操作',
                        align: 'center',
                        width: 150,
                        render: (h, params) => {
                            let text = params.row.status == 1 ? '下架' : '上架';

                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_edit_$(params.row)
                                        }
                                    }
                                }, '编辑 | '),
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#f56c6c',
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
                                    on: {
                                        click: () => {
                                            if (params.row.status == 0) {
                                                this.$_start_$(params.row);
                                            } else {
                                                this.$_abandon_$(params.row)
                                            }
                                        }
                                    }
                                }, ' | ' + text),
                            ])
                        }
                    }],
            }
        },
        created() {
            this.zList()
        }
        ,
        methods: {
            // 获取园区列表
            zList() {
                this.zoneList = []
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/zone/zone/search`,
                    data: {
                        pageSize: 9999999
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    ////console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            var arr = rsp.data.data.records
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {}
                                temp = {
                                    label: arr[i].name,
                                    value: arr[i].id
                                }
                                this.zoneList.push(temp)
                            }
                            this.$_yqSelected_$ = arr[0].id
                            this.zoneId = this.$_yqSelected_$
                            this.$_list_$();
                        }
                    }

                })
            },

            // 更改园区
            changeZone(value) {
                this.zoneId = value;
                this.$_list_$()
            },
            // 获取停车场列表
            $_list_$(status = 1) {
                this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/search`;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_totalSize_$ = rsp.data.data.total
                            if (status != 1) {
                                status == 2 ? status = 1 : status = 0;
                                this.$_parkInfo_$ = [];
                                for (let i = 0; i < rsp.data.data.records.length; i++) {
                                    if (rsp.data.data.records[i].status == status) {
                                        this.$_parkInfo_$.push(rsp.data.data.records[i]);
                                    }
                                }
                            } else {
                                this.$_parkInfo_$ = rsp.data.data.records

                            }
                            delete  this.$_querycfg_$.params.name;
                        }
                        else {
                            this.$Message.error('数据获取失败!');
                        }
                    }
                })
            },
            //   搜索
            $_search_$() {
                if (this.$_parkName_$) {
                    this.$_querycfg_$.params.name = this.$_parkName_$;
                }
                if (this.$_selected_$ != 1) {
                    this.$_list_$(this.$_selected_$);
                    return;
                }
                this.$_list_$();
            },
            // 新增停车场
            $_addPark_$(formName) {
                this.$root.$_Route_$("superadmin", "jump", "tccxz", {zoneList: this.zoneList});
            },
            // 停车场编辑
            $_edit_$(row) {
                this.$root.$_Route_$("superadmin", "jump", "tccbj", {row: row, zoneList: this.zoneList});
            },
            $_addsfbz_$() {
                this.$_addsfmodal_$ = true
            },

            // 停车场删除
            $_remove_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认删除?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_sendQuery_$({
                            method: "DELETE",
                            url: `${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/parkinglot/${row.id}`,
                            data: {},
                            headers: {"Content-type": "application/json"}
                        }).then((rsp) => {
                            ////console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success("删除成功!")
                                    this.$_list_$()
                                } else {
                                    this.$Message.error(rsp.data.message)
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            }
            ,
            //收费标准弹窗确定
            $_addsfOK_$() {
                this.$_addsfmodal_$ = false
                this.$_sendQuery_$({
                    method: "POST",
                    url: this.$_global_$.serverPath + `/zone/zone/${this.zoneId}/parkinglot/config`,
                    data: {
                        externalDesc: this.$_addsfForm_$.externalDesc + '元/小时',
                        tempDesc: this.$_addsfForm_$.tempDesc + '元/小时',
                    },
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((rsp) => {
                    ////console.log(rsp)
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success('收费标准添加成功!');
                            this.$_addsfmodal_$ = false
                        } else {
                            this.$Message.error('收费标准添加失败!');
                            this.$_addsfmodal_$ = false
                        }
                    }
                })
            }
            ,
            // 下架
            $_abandon_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认下架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/${row.id}/offline`;
                        this.$_querycfg_$.params = {}
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            ////console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('下线成功!');
                                    this.$_list_$()
                                }
                                else {
                                    this.$Message.error('下线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            }
            ,
            // 上架
            $_start_$(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "<p>是否确认上架?</p>",
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        this.$_querycfg_$.mod = `zone/zone/${this.zoneId}/parkinglot/${row.id}/online`;
                        this.$_querycfg_$.params = {}
                        var _this = this;
                        this.$_fquery_$((rsp) => {
                            ////console.log(rsp)
                            if (rsp.status === 200) {
                                if (rsp.data.code === 0) {
                                    this.$Message.success('上线成功!');
                                    this.$_list_$()
                                }
                                else {
                                    this.$Message.error('上线失败!');
                                }
                            }
                        })
                    },
                    onCancel: () => {
                    }
                });
            }
            ,

            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_list_$();
            },
            //页面显示的数据条数
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_list_$();
            },
        },

    };
</script>