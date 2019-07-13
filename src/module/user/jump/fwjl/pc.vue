<style scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    .clear {
        zoom: 1;
    }

    .info {
        width: 95%;
        margin: 0 auto;
        padding: 10px 0 20px 30px;
        border: 1px solid #f7f7f7;
        border-radius: 6px;
    }

    .info .title1 {
        font-size: 16px;
        line-height: 40px;
    }

    .info .img {
        width: 50px;
        height: 50px;
        background: #f7f7f7;
        float: left;
        margin-right: 10px;
    }

    .info .list {
        width: 23%;
        float: left;
    }

    .info .list p {
        line-height: 30px;
        font-size: 14px;
    }

    .search {
        padding: 15px 0 15px 15px;
        margin: 15px 0;
        font-size: 12px;
        color: #404040;
    }

</style>
<template>
    <div>
        <!-- 管家信息 -->
        <div class="info">
            <p class="title1">管家信息</p>
            <div class="content clear">
                <div class="img"><img style="width: 50px; height: 50px;" :src="$_gjInfo_$.image"></div>
                <div class="list">
                    <p>姓名:&nbsp;{{$_gjInfo_$.name}}</p>
                    <p>联系方式:&nbsp;{{$_gjInfo_$.phone_number}}</p>
                </div>
                <div class="list">
                    <p>服务企业:</p>
                    <p v-for="item in $_gjInfo_$.enterprise">{{item.enterprise_name}}</p>
                </div>
                <div class="list">
                    <p>服务总次数:&nbsp;{{$_gjInfo_$.service_count}}次</p>
                    <p>平均响应式:&nbsp;{{$_gjInfo_$.avg_reply_time}}分钟</p>
                    <p>平均处理时间:&nbsp;{{$_gjInfo_$.avg_handle_time}}小时</p>
                </div>
                <div class="list">
                    <p>综合得分:&nbsp;{{$_gjInfo_$.synthesize}}</p>
                    <Rate allow-half v-model="$_gjInfo_$.star"></Rate>
                </div>
            </div>
        </div>
        <!-- 搜索 -->
        <div class="search">
            事项名称：&nbsp;&nbsp;
            <Input placeholder="请输入事项名称" v-model="$_orderNum_$" style="width: 210px;margin-right: 2%"></Input>
            &nbsp;&nbsp;状态：&nbsp;&nbsp;
            <Select v-model="$_selected_$" style="width:210px;margin-right: 2%">
                <Option v-for="item in $_classifyList2_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;业务类型：&nbsp;&nbsp;
            <Select v-model="$_selected2_$" style="width:210px;margin-right: 2%">
                <Option v-for="item in $_classifyList_$" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
            </Select>
            &nbsp;&nbsp;
            <Button type="primary" @click="$_search_$()">搜索</Button>
        </div>
        <!-- 列表 -->
        <div class="content">
            <!--<Row>共{{$_gjInfo_$.total}}条数据</Row>-->
            <br>
            <Table :columns="$_recordTable_$" :data="$_recordInfo_$"></Table>
        </div>
    </div>
</template>

<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_orderNum_$: '', // 订单编号
                $_userName_$: '', // 用户名称
                $_rq_$: '', // 日期
                $_totalSize_$: 922, // 数据总量
                $_gjInfo_$:'',
                $_selected_$: "全部", // 业务类型
                $_selected2_$:"全部",//状态
                $_classifyList_$: [
                    // 分类值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "物业保修"
                    },
                    {
                        value: 2,
                        label: "投诉建议"
                    },
                    {
                        value: 3,
                        label: "企业服务咨询"
                    },
                    {
                        value: 4,
                        label: "留言"
                    }
                ],
                $_classifyList2_$: [
                    // 分类值
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "未受理"
                    },
                    {
                        value: 1,
                        label: "处理中"
                    },
                    {
                        value: 2,
                        label: "已解决"
                    },
                    {
                        value: 3,
                        label: "已完成"
                    }
                ],
                $_recordTable_$: [  //表头
                    {
                        title: "序号",
                        key: "commiterId",
                        align: "center"
                    },
                    {
                        title: "事项分类",
                        key: "recordTypeName",
                        align: "center"
                    },
                    {
                        title: "事项名称",
                        key: "recordTitle",
                        align: "center"
                    },
                    {
                        title: "联系人",
                        key: "commiterName",
                        align: "center"
                    },
                    {
                        title: "公司",
                        key: "commiterEnterpriseName",
                        align: "center"
                    },
                    {
                        title: "管家名称",
                        key: "stewardName",
                        align: "center"
                    },
                    {
                        title: "提交时间",
                        key: "commiterPubtime",
                        align: "center",
                    },
                    {
                        title: "受理时间",
                        key: "handlerRecvtime",
                        align: "center",
                    },
                    {
                        title: "处理时间",
                        key: "handlerCompletime",
                        align: "center",
                    },
                    {
                        title: "状态",
                        key: "recordStatus",
                        align: "center",
                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            if (params.row.recordStatus == 0) {
                                texts = "未受理"
                            } else if (params.row.recordStatus == 1) {
                                texts = "处理中"
                            } else if (params.row.recordStatus == 2) {
                                texts = "已解决"
                            } else if (params.row.recordStatus == 3) {
                                texts = "已完成"
                            }
                            return h('div', {
                                props: {},
                            }, texts)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                        style: {
                                            color: "#059BFA"
                                        },
                                        on: {
                                            click: () => {
                                                this.$_detail_$(params.row.id)
                                            }
                                        }
                                    },
                                    '详情')
                            ])
                        }
                    }
                ],
                $_recordInfo_$:[],
                $_querycfg_$: {
                    mod: "steward/steward/queryStewardDetails",
                    params: {}
                }
            };
        },
        methods: {
            $_record_$() {
                this.$root.inparams.id
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_gjInfo_$ = rsp.data.data;
                        this.$_recordInfo_$ = rsp.data.data.record.records
                    }
                }
            },
            // 搜索
            $_search_$() {
                if (this.$_orderNum_$) {
                    this.$_querycfg_$.params.recordTitle = this.$_orderNum_$;
                }
                if (this.$_selected_$ != "全部") {
                    this.$_querycfg_$.params.recordStatus = this.$_selected_$;
                }
                if (this.$_selected2_$ != "全部") {
                    this.$_querycfg_$.params.recordTypeCode = this.$_selected2_$;
                }
                this.$_querycfg_$.mod = 'steward/steward/queryRecordPageList';//新地址
                var _this = this;//记录this
                this.$_fquery_$(function (rsp) {
                    if (rsp.status === 200) {
                        //搜索清零
                        delete _this.$_querycfg_$.params.recordTitle;
                        delete _this.$_querycfg_$.params.recordStatus;
                        delete _this.$_querycfg_$.params.recordTypeCode;
                        if (rsp.data.code === 0) {
                            _this.$_recordInfo_$ = rsp.data.data.records;
                        }
                    }
                });
            },
            // 详情
            $_detail_$(index) {
                let info = '';
                for (let i = 0; i < this.$_recordInfo_$.length; i++) {
                    if (this.$_recordInfo_$[i].id == index) {
                        info = this.$_recordInfo_$[i];
                    }
                }
                // this.$root.$_Route_$('user', 'jump', 'fwjlxq', info)
                this.$root.$_Route_$('user', 'jump', 'gjxq', {row: info})
            }
        },
        created() {
            //获取记录ID
            this.$_querycfg_$.params.stewardId = this.$root.inparams.id;
            this.$_querycfg_$.params.zoneId = this.$root.inparams.zoneId;
        },
        mounted() {
            this.$_fquery_$();
        }
    };
</script>