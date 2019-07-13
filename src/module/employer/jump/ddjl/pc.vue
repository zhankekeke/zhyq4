<style scoped>
    .screen {
        padding: 20px;
        background: #f7f7f7;
        margin: 0 0 20px 0;
    }
</style>
<template>
    <div class="sz">
        <div class="screen">
            <Row>
                <Col span="5">商品名称:&nbsp;&nbsp;<Input v-model="$_commodity_$" placeholder="请输入商品名称"
                                                      style="width: 150px"/></Col>
                <Col span="6">
                    <p>请选择日期:
                        <DatePicker type="daterange" @on-change="$_changedate_$" split-panels placeholder="请选择订单的日期范围"
                                    style="width: 200px"></DatePicker>
                    </p>
                </Col>

                <Button type="primary" @click="$_search_$">搜索</Button>
            </Row>
        </div>
        <p>共有&nbsp;{{$_totalSize_$}}&nbsp;条数据</p>
        <Table border :columns="$_columns_$" :data="$_data_$"></Table>
        <br>
        <Row>
            <Page
                    align="right"
                    :total="$_totalSize_$"
                    :page-size="$_pageSize_$"
                    show-elevator
                    show-sizer
                    @on-page-size-change="$_pageNum_$"
                    @on-change="$_changePage_$"
            />
        </Row>
        <Modal
                v-model="$_modal_$"
                title="提示"
                @on-ok="$_ok_$"
                @on-cancel="$_cancel_$"
                width="300">
            <p>确定要删除么?</p>
        </Modal>
    </div>
</template>
<script>
    import controler from './controler.js';

    export default {
        mixins: [controler],
        data() {
            return {
                id: '',
                dater: [],
                $_thisUserInfo_$: '',  //用户信息
                $_pageSize_$: 10,
                $_commodity_$: '',
                $_totalSize_$: 0,
                $_modal_$: false,
                $_columns_$: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'orderGoods',
                        align: 'center',
                        render: (h, params) => {
                            let a = params.row.orderGoods[0].goodsName;
                            return h("span", {}, a);
                        }
                    },
                    {
                        align: 'center',
                        title: '单价',
                        key: 'orderGoods',
                        render: (h, params) => {
                            let b = params.row.orderGoods[0];
                            let c = '';
                            if (b.goodsType == 0) {
                                //普通商品
                                c = b.goodsPrices + '元';
                            } else {
                                //积分商品或代金券
                                c = b.goodsCredits + '积分';
                            }
                            return h('span', {}, c)
                        }
                    },
                    {
                        width: 80,
                        align: 'center',
                        title: '数量',
                        key: 'orderGoods',
                        render: (h, params) => {
                            let c = params.row.orderGoods[0].goodsCount
                            return h('span', {}, c)
                        }
                    },
                    {
                        align: 'center',
                        title: '实付金额',
                        key: 'orderGoods',
                        render: (h, params) => {
                            let b = params.row.orderGoods[0];
                            let c = '';
                            if (b.goodsType == 0) {
                                //普通商品
                                c = params.row.orderPrices + '元';
                            } else {
                                //积分商品或代金券
                                c = params.row.orderCredits + '积分';
                            }
                            return h('span', {}, c)
                        }
                    },
                    {
                        align: 'center',
                        title: '用户名称',
                        key: 'commiterName'
                    },
                    {
                        align: 'center',
                        title: '用户手机号',
                        key: 'commiterPhone'
                    },
                    {
                        align: 'center',
                        title: '状态',
                        key: 'orderState',
                        render: (h, params) => {
                            let d;
                            switch (params.row.orderState) {
                                case 1:
                                    d = "已支付";
                                    break;
                                case 2:
                                    d = "已发货";
                                    break;
                                case 3:
                                    d = "已完成";
                                    break;
                            }
                            return h('span', {}, d)
                        }
                    },
                    {
                        align: 'center',
                        title: '创建时间',
                        key: 'commiteTime',
                        render: (h, params) => {
                            let d = this.fmtDate(params.row.commiteTime);
                            return h('span', {}, d)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_xq_$(params.row)
                                        }
                                    }
                                }, '订单详情'),
                                h('a', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$_sc_$(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                $_data_$: [],
                $_querycfg_$: {
                    mod: "",
                    params: {size:this.$_pageSize_$}
                }
            }
        },
        created() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            this.$_thisUserInfo_$ = JSON.parse(cookie);
            this.$_ddxq_$()
        },
        methods: {
            $_ddxq_$() {
                this.$_querycfg_$.mod = 'operate/order/queryOrderLimit';
                this.$_querycfg_$.params.zoneId = this.$_thisUserInfo_$.zoneId;
                this.$_querycfg_$.params.commiter = this.$_thisUserInfo_$.id;
                this.$_fquery_$((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$_data_$ = rsp.data.data.records;
                            this.$_totalSize_$ = Number(rsp.data.data.total)
                        }
                    }
                })
            },
            //搜索
            $_search_$() {
                this.$_querycfg_$.params.beginTime = this.dater[0];
                this.$_querycfg_$.params.endTime = this.dater[1];
                this.$_querycfg_$.params.goodName = this.$_commodity_$;
                this.$_ddxq_$();
            },
            //日期范围
            $_changedate_$(e) {
                this.dater = e;
            },
            //分页
            $_changePage_$(e) {
                this.$_querycfg_$.params.current = e;
                this.$_querycfg_$.params.size = this.$_pageSize_$;
                this.$_ddxq_$();
            },
            $_pageNum_$(e) {
                this.$_querycfg_$.params.size = e;
                this.$_ddxq_$();
            },
            //订单详情
            $_xq_$(row) {
                this.$root.$_Route_$('employer', 'jump', 'ddxx', {id: row})
            },
            //删除
            $_sc_$(row) {
                this.id = row.id;
                this.$_modal_$ = true
            },
            //确认
            $_ok_$() {
                this.$_sendQuery_$({
                    method: "POST",
                    url: `${this.$_global_$.serverPath}/operate/order/delOrder`,
                    data: {
                        id: this.id
                    },
                    headers: {"Content-type": "application/json"}
                }).then((rsp) => {
                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            this.$Message.success(rsp.data.data);
                            this.$_ddxq_$()
                        }
                    }
                });
            },
            //取消
            $_cancel_$() {
                this.$Message.info('Clicked cancel');
            },
            fmtDate(obj) {
                var date = new Date(obj);
                var y = 1900 + date.getYear();
                var m = "0" + (date.getMonth() + 1);
                var d = "0" + date.getDate();
                return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
            }

        }
    }
</script>