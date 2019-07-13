<style scoped>
    .lm {
        color: blue;
        font-size: 30px;
    }

    .information {
        color: #666;
        box-sizing: border-box;
        padding: 15px 40px;
        overflow: hidden;
        font-size: 16px;
        font-weight: 500;
    }

    .information div {
        overflow: hidden;
    }

    .lt {
        float: left;
        width: 33.33%;
        line-height: 42px;
    }

    .font1 {
        font-size: 28px;
    }

    .page {
        text-align: right;
        margin-top: 20px;
    }

    .fontgreen {
        font-size: 18px;
        color: #009933;
    }

    .fontred {
        font-size: 18px;
        color: #ff6600;
    }

    .fontblue {
        font-size: 18px;
        color: #169bd5;
        text-decoration: underline;
    }

    .wrap {
        box-sizing: border-box;
        padding: 30px;
    }

    .account {
        box-sizing: border-box;
        padding: 20px 10px;
        font-size: 12px;
    }

    .account span {
        margin-right: 30px;
    }

    .list {
        overflow: hidden;
        font-size: 14px;
        color: #666;
        font-weight: 400;
        line-height: 32px;
        padding-bottom: 20px;
    }

    .list .title {
        font-size: 16px;
        color: #333;
        margin: 30px 0 0px 0;
    }

    .list button {
        float: right;
        margin-right: 60px;
    }
</style>
<template>
    <div class="container">
        <!-- 基本信息 -->
        <div class="information">
            <Row><strong>账户信息：</strong></Row>
            <Row>
                <Col span="12">
                    <span>账户名称：</span>
                    <span>{{$_accountName_$}}</span>
                </Col>
                <Col span="12">
                    <span>发放总量：</span>
                    <span>{{$_accountNum_$}}</span>
                </Col>
            </Row>
            <Row>
                <span>账户类型：</span>
                <span v-if="$_accountZone_$ === 0">企业</span>
                <span v-else-if="$_accountZone_$ === 1">个人</span>
                <span v-else>园区</span>
            </Row>
        </div>
        <div class="wrap" style="padding-top: 0">
            <!-- 账户类型 -->
            <div class="account">
        <span>发放流水号：
          <Input placeholder="请填写流水号" v-model="$_zhname_$" style="width: 200px"></Input>
        </span>
                <span>日期：
          <DatePicker @on-change="$_dateRange_$" type="daterange" placeholder="请选择日期" style="width: 200px"></DatePicker>
        </span>
                <Button @click="$_search_$" type="primary">搜索</Button>
            </div>
            <!-- 数据 -->
            <div class="list">
                <p class="title">积分发放记录</p>
                <Row>
                    <Col span="24">
                        <Button type="primary" @click=" $_jfff_$">积分发放</Button>
                    </Col>
                </Row>
            </div>
            <div>
                <Table  :columns="$_columns1_$" :data="$_Listdata_$"></Table>
            </div>
        </div>
        <div class="page">
            <span style="float: left; font-size: 14px; color: black;margin-left: 40px;">共{{$_total_$}}条数据</span>
            <Page
                    :total="$_total_$"
                    show-elevator
                    :page-size="$_pageSize_$"
                    @on-page-size-change="$_pageNum_$"
                    @on-change="$_changePage_$"
            />
        </div>
    </div>
</template>
<script>
    import controler from "./controler.js";

    export default {
        mixins: [controler],
        data() {
            return {
                $_querycfg_$: {
                    mod: "",
                    params: {}
                },
                $_accountList_$: [
                    {
                        label: "个人",
                        value: "personal"
                    },
                    {
                        label: "企业",
                        value: "company"
                    }
                ],
                $_val_$: "个人",
                $_num_$: "9999",
                mrParams: "",
                $_columns1_$: [
                    {
                        title: '序号',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + (this.pageNum - 1) * this.$_pageSize_$ + 1);
                        }
                    },
                    {
                        title: "流水号",
                        key: "seqNo",
                        align: "center"
                    },
                    {
                        title: '发放对象',
                        key: 'recvNames',
                        align: 'center',
                        ellipsis: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    diaplay: 'inline-block',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }
                            }, params.row.recvNames)
                        }
                    },
                    {
                        title: "发放事由",
                        key: "grantReason",
                        align: "center"
                    },
                    {
                        title: "发放数量",
                        key: "grantTotal",
                        align: "center",
                        render:(h,params) =>{
                        var a ;                        
                          a="-"+params.row.grantTotal
                         return h("span", {}, a);
                      }
                    },
                    {
                        title: "操作人",
                        key: "granterName",
                        align: "center"
                    },
                    {
                        title: "发放时间",
                        key: "grantTime",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "caozuo",
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "a",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.myParams = params.row;

                                                this.$_xiangqing_$(params.index);
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],
                $_Listdata_$: [],
                $_totalSize_$: "", //数据总数
                $_stratRow_$: 0, //起始条数
                $_total_$: 0, //总条数
                $_pageSize_$: 10, //每页显示
                $_accountId_$: '',
                $_accountType_$: '',
                $_accountNum_$: '',
                $_accountName_$: '',
                $_accountZone_$: '',
                $_zhname_$: '',
                $_time_$: '',
                pageNum: 1,
            };
        },
        created() {
            this.$_List_$();
            this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
        },
        methods: {
            //列表
            $_List_$() {
                let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
                let userInfo = JSON.parse(cookie);
                // this.$_querycfg_$.params.zoneId = userInfo.zoneId;
                this.$_querycfg_$.mod = "operate/creditsGrant/page";
                this.$_fquery_$(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_Listdata_$ = rsp.data.data.records;
                            this.$_total_$ = rsp.data.data.total * 1;
                            this.pageNum = rsp.data.data.current
                        }
                    }
                });

                //积分账户
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/account/accountInfo`,
                    data: {
                        enterpriseId: userInfo.zoneId,
                        accountType: 2
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rsp => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_accountId_$ = rsp.data.data.id;
                            this.$_accountType_$ = rsp.data.data.accountType;
                            //发放总量
                            this.$_sendQuery_$({
                                method: "GET",
                                url: `${this.$_global_$.serverPath}/operate/creditsGrant/grantCount?accountId=` + this.$_accountId_$,
                            }).then(rsp => {
                                //console.log(rsp);
                                if (rsp.status === 200) {
                                    if (rsp.data.code === 0) {
                                        this.$_accountNum_$ = rsp.data.data.grantSum;
                                        this.$_accountName_$ = rsp.data.data.account.accountName;
                                        this.$_accountZone_$ = rsp.data.data.account.accountType;
                                    }
                                }
                            });
                        }
                    }
                });
            },
            $_changePage_$(e) {
                this.$_querycfg_$.params.pageNum = e;
                this.$_querycfg_$.params.pageSize = this.$_pageSize_$;
                this.$_List_$();
            },
            $_pageNum_$(e) {
                this.$_querycfg_$.params.pageSize = e;
                this.$_List_$();
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            },
            $_xiangqing_$() {

                let info = this.myParams;
                this.$root.$_Route_$("user", "jump", "jfxq", {id: info});

            },

            $_jfff_$() {
                let info = this.myParams;

                this.$root.$_Route_$("user", "jump", "ffjf", {id: 1});
            },

            $_dateRange_$(e) {
                this.$_time_$ = e;
            },

            $_search_$() {
                if (this.$_querycfg_$.params.beginDate || this.$_querycfg_$.params.endDate || this.$_querycfg_$.params.seqno) {
                    delete this.$_querycfg_$.params.beginDate;
                    delete this.$_querycfg_$.params.endDate;
                    delete this.$_querycfg_$.params.seqno;
                }
                if (this.$_time_$) {
                    this.$_querycfg_$.params.beginDate = this.$_time_$[0];
                    this.$_querycfg_$.params.endDate = this.$_time_$[1];
                }
                if (this.$_zhname_$) {
                    this.$_querycfg_$.params.seqno = this.$_zhname_$;
                }
                this.$_List_$();
            }
        }
    };
</script>