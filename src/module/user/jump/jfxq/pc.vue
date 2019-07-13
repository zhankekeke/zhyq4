<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }

    .message {
        font-size: 20px;
        color: #666;
        font-weight: 500;
        box-sizing: border-box;
        padding: 0 30px;
    }

    .style1 {
        font-size: 12px;
        line-height: 42px;
    }

    .style2 {
        font-size: 18px;
        color: #ff9900;
        margin: 0 10px;
    }

    .style3 {
        font-size: 28px;
    }

    .ivu-row {
        line-height: 45px;
    }

    .message a {
        font-size: 12px;
        color: rgb(0, 51, 204);
        margin-right: 50px;
        text-decoration: underline;
    }
</style>
<template>
    <div>
        <div>
            <Row>
                <p><strong>订单信息：</strong></p>
                <p>
                    <span><strong>流水号：</strong></span>
                    <span style="margin-right:10px">{{$_data1_$[0].seqNo}}</span>
                    <span><strong>创建时间：</strong></span>
                    <span style="margin-right:10px">{{$_data1_$[0].createTime}}</span>
                </p>
                <p>
                    <span style="margin-right:30px"><strong>用户信息：</strong></span>
                    <span style="width: 500px;">{{$_data1_$[0].recvNames}}</span>
                </p>
                <p>
                    <span style="margin-right:30px"><strong>发放事由：</strong></span>
                    <span>{{$_data1_$[0].grantReason}}</span>
                </p>
            </Row>
            <Row>
                <Table :columns="$_columns1_$" :data="$_data1_$"></Table>
            </Row>
            <Row>
                <Col span="6" push="18" align="right">
                    <span><strong>合计发放：</strong></span>
                    <span>{{$_data1_$[0].grantCount * $_data1_$[0].recvCount}}</span>
                </Col>
            </Row>

            <Row>
                <Col span="6">
                    <span><strong>操作人：</strong></span>
                    <span>{{$_data1_$[0].granterName}}</span>
                </Col>
                <Col span="6">
                    <span><strong>操作时间：</strong></span>
                    <span>{{$_data1_$[0].grantTime}}</span>
                </Col>
            </Row>
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
                    mod: "module",
                    params: {
                        cmd: 4
                    }
                },

                $_columns1_$: [
                    {
                        title: "积分发放原因",
                        key: "grantReason",
                    },
                    {
                        title: "每人发放",
                        key: "grantCount",
                    },
                    {
                        title: "发放人数",
                        key: "recvCount"
                    },
                    {
                        title: "合计",
                        key: "status",
                        render: (h, params) => {
                            let a = params.row.grantCount * params.row.recvCount;
                            return h("span", {}, a);
                        }
                    }
                ],
                $_data1_$: [],
                info: ""
            };
        },
        created() {
            this.$_xiangqing_$();
        },
        methods: {
            $_xiangqing_$() {
                this.info = this.$root.inparams.id;
                this.$_data1_$.push(this.info);
            },
            $_receive_$(rsp) {
                if (rsp.status === 200) {
                    if (rsp.data.status === 0) {
                        this.list = rsp.data.obj;
                    }
                }
            }
        }
    };
</script>