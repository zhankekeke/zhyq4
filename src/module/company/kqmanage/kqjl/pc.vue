<style scoped>
    .container {
        font-size: 14px;
        color: #333;
    }

    .bg {
        background: #f7f7f7;
        min-height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        padding: 0px 20px;
    }

    .margin {
        margin: 15px 0;
    }

    .right {
        text-align: right;
    }

    .jilu button {
        margin-right: 20px;
    }

    .xuan {
        background: #e6f3fc;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
    }

    .box {
        width: 60%;
        overflow: scroll;
        border: 2px solid #666;
        z-index: 99;
        background: #fff;
    }

    .box ul {
        display: block;
        width: 1000px;
        overflow: hidden;
    }

    .box ul li {
        float: left;
        width: 80px;
        text-align: center;
    }

    .dataList li {
        border-right: 1px solid #ebebeb;
    }

    .dataList {
        border-bottom: 1px solid #ebebeb;
        padding: 10px 0;
    }

    .relative1 {
        position: relative;
    }

    .ivu-table td, .ivu-table th {
        height: 63px !important;
    }

</style>
<template>
    <div class='container'>
        <Row class='bg'>
            <Col span='6'>时间：
                <Select v-model="model1" style="width:200px" placeholder="请选择时间">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                </Select>
            </Col>
            <Col span='6'><span style=" float: left">部门：</span>
                <Cascader @on-change="$_changbumen_$" change-on-select placeholder="请选择部门" :data="$_companyBm_$"
                          style="width: 200px; float: left; margin-top: 25px;"></Cascader>
            </Col>
            <Col span='6'>姓名： <Input v-model="$_name_$" style="width: 200px" placeholder="请输入员工姓名"></Input></Col>
            <Col span='6'>
                <Button type="primary" @click="$_search_$">搜索</Button>
            </Col>
        </Row>
        <Row class='margin jilu'>
            <Col span='12' v-model='$_num_$'>共有{{$_num_$}}条数据</Col>
            <Col span='12' class='right'>
                <Button type="primary" @click="$_exportData_$">导出当前页记录</Button>
                <!-- <Button type="primary" @click='$_kaoqintongzhi_$'>考勤统计</Button> -->
            </Col>
        </Row>
        <!--<Row class='margin'>-->
        <!--<Col span='24' class='xuan' v-model='$_number_$'>-->
        <!--<Icon type="information-circled" style='color:#2d8cf0;'></Icon>-->
        <!--已选择 {{$_number_$}} 项-->
        <!--</Col>-->
        <!--</Row>-->
        <Row class='margin relative1'>
            <Table class='table01' ref="selection" :columns="$_columns_$" :data="$_data_$"></Table>
        </Row>
        <Row class='margin right'>
            <Page :total="$_num_$" size="small"
                  @on-change="$_changePage_$"
                  @on-page-size-change="$_changePageSize_$"
                  show-elevator
                  show-sizer>
            </Page>
        </Row>
    </div>

</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            value1: [],
            model1: '',
            cityList: [],
            $_datePicker_$: '',
            $_name_$: '',
            $_select_$: '',
            $_List_$: [
                {
                    value: 1,
                    label: '市场一'
                },
                {
                    value: 2,
                    label: '市场二'
                },
                {
                    value: 3,
                    label: '市场三'
                }
            ],
            $_num_$: 0,
            $_number_$: 0,
            $_startdateNum_$: '',
            $_columns_$: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '员工编号',
                    key: 'index',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '部门',
                    key: 'bumen',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '员工姓名',
                    key: 'name',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: ' ',
                    key: 'gongzuo',
                    width: 80,
                    fixed: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'ghost',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.show(params.index)
                                    }
                                }
                            }, '上班'),
                            h('Button', {
                                props: {
                                    type: 'ghost',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        // this.remove(params.index)
                                    }
                                }
                            }, '下班')
                        ]);
                    }
                },
                {
                    title: '考勤详情',
                    align: 'center',
                    children: []
                }
            ],
            $_data_$: [],
            $_querycfg_$: {
                mod: '',
                params: {}
            },
            $_pageNum_$: 1,
            $_pageSize_$: 10,
            //部门数据
            $_bumen_$: [],
            $_bumenList_$: '',
            checkAllGroup: [],
            ygname: [],
            $_ygInfo_$: [],
            $_ygList_$: [],
            $_acType_$: '',
            $_companyBm_$: [],
            $_bumenId_$: '',
        }
    },
    created() {
        //当前日期
        let date2 = new Date();
        this.$_startdateNum_$ = date2.getDate();
        this.$_monthData_$();
    },
    mounted() {
        this.$_qykqInfo_$();
        this.$_getBumen_$();
    },
    methods: {
        $_changbumen_$(e) {
            if(e.length>0){
                this.$_bumenId_$ = e[e.length - 1];
            }else {
                this.$_bumenId_$ = '';
            }
        },
        $_getBumen_$() {
            let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
            let userInfo = JSON.parse(cookie);
            this.$_sendQuery_$({
                method: "GET",
                url: `${this.$_global_$.serverPath}/company/company/${userInfo.enterpriseId}/department`,
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        if (res.data.data) {
                            this.$_bumen_$ = [];
                            for (let i = 0; i < res.data.data.length; i++) {
                                this.$_bumen_$.push(res.data.data[i]);
                                if (res.data.data[i].child) {
                                    this.$_hy_$(res.data.data[i]);
                                }
                            }
                            this.$_companyBm_$ = this.$_dg_$(this.$_bumen_$);
                        }
                    }
                }
            });
        },
        //数据还原
        $_hy_$(node, num = 0) {
            if (!node) {
                return;
            }
            if (num !== 0) {
                this.$_bumen_$.push(node);
            }
            num++;
            if (node.child && node.child.length > 0) {
                let i = 0;
                for (i = 0; i < node.child.length; i++) {
                    this.$_hy_$(node.child[i], num);
                }
            }
        },
        //菜单递归
        $_dg_$(data) {
            let val = [];
            // 删除 所有 children,以防止多次调用
            data.forEach(function (item) {
                delete item.children;
            });

            // 将数据存储为 以 id 为 KEY 的 map 索引数据列
            let map = {};
            data.forEach(function (item) {
                map[item.id] = item;
            });
            data.forEach(function (item) {
                item.label = item.name;
                item.value = item.id;
                item.children = [];
                // 以当前遍历项，parentId,去map对象中找到索引的id
                let parent = map[item.parentId];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶
                    val.push(item);
                }
            });
            return val;
        },
        $_changePageSize_$(e) {
            this.$_pageSize_$ = e;
            this.$_qykqInfo_$();
        },
        $_changePage_$(e) {
            this.$_pageNum_$ = e;
            this.$_qykqInfo_$();
        },
        $_search_$() {
            let date = '';
            let bumen = '';
            let name = '';
            if (this.model1) {
                date = this.model1;
            }
            if (this.$_bumenId_$) {
                bumen = this.$_bumenId_$;
            }
            if (this.$_name_$) {
                name = this.$_name_$
            }
            this.$_qykqInfo_$(date, bumen, name);
        },
        $_monthData_$() {
            //当月第一天日期
            let date1 = new Date();
            date1.setDate(1);
            let year = date1.getFullYear();
            let month = date1.getMonth() + 1;
            for (let i = month; i >= 1; i--) {
                this.cityList.push({
                    value: year + "-" + (i < 10 ? "0" + i : i) + "-01",
                    label: year + "年" + i + "月"
                });
            }
        },
        $_receive_$(rsp) {
            if (rsp.status === 200) {
                if (rsp.data.status === 0) {
                    this.list = rsp.data.obj;
                }
            }
        },
        $_exportData_$() {
            this.$refs.selection.exportCsv({
                filename: '考勤记录'
            });
        },
        $_kaoqintongzhi_$() {
            this.$root.$_Route_$('company', 'jump', 'kqtj', {id: 1})
        },
        $_getLastDay_$(year, month) {
            var new_year = year;    //取当前的年份
            var new_month = month++;//取下一个月的第一天,方便计算(最后一天不固定)
            if (month > 12) {
                new_month -= 12;        //月份减
                new_year++;            //年份增
            }
            var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
        },
        $_qykqInfo_$(date = '', bumen = '', name = '') {
            let date3 = new Date();
            let endDate = '';
            let startDate = '';
            this.$_data_$ = [];
            if (!date) {
                let nowDay = date3.getDate();
                for (let j = 1; j < nowDay; j++) {
                    this.$_columns_$[5].children.push({
                        title: j < 10 ? "0" + j : j,
                        key: 'day' + j,
                        width: 75,
                    })
                }
                //当天日期
                date3.setTime(date3.getTime() - 24 * 60 * 60 * 1000);
                endDate = date3.getFullYear() + "-" + ((date3.getMonth() + 1) < 10 ? "0" + (date3.getMonth() + 1) : (date3.getMonth() + 1)) + "-" + (date3.getDate() < 10 ? "0" + date3.getDate() : date3.getDate());
                //当月第一天日期
                let date1 = new Date();
                date1.setDate(1);
                startDate = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
            } else {
                //当月第一天日期
                let date1 = new Date();
                date1.setDate(1);
                let nowDay = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate());
                this.$_data_$ = [];
                startDate = date;
                let year = date.substr(0, 4);
                let mounth = date.substr(5, 2);
                let day = '';
                if (startDate == nowDay) {
                    date3.setTime(date3.getTime() - 24 * 60 * 60 * 1000);
                    day = date3.getDate();
                } else {
                    day = this.$_getLastDay_$(year, mounth);
                }
                this.$_columns_$[5].children = [];
                for (let j = 1; j <= day; j++) {
                    this.$_columns_$[5].children.push({
                        title: j < 10 ? "0" + j : j,
                        key: 'day' + j,
                        width: 75,
                    })
                }
                endDate = year + '-' + mounth + '-' + day;
            }
            let mydata = {
                startDate: startDate,
                endDate: endDate,
                pageNum: this.$_pageNum_$,
                pageSize: this.$_pageSize_$
            };
            if (bumen !== '') {
                mydata.orgId = bumen;
            }
            if (name !== '') {
                mydata.employeeName = name;
            }
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + "/company/attendance/company/records",
                data: mydata,
                headers: {
                    "Content-type": "application/json"
                }
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        this.$_num_$ = rsp.data.data.total*1;
                        for (let i = 0; i < rsp.data.data.total; i++) {
                            let everyOne = {
                                index: rsp.data.data.records[i].employeeId,
                                bumen: rsp.data.data.records[i].orgName,
                                name: rsp.data.data.records[i].employeeName,
                                gongzuo: '',
                            };
                            let num = 1;
                            for (let key in rsp.data.data.records[i].recordDateMap) {
                                if (rsp.data.data.records[i].recordDateMap[key]) {
                                    everyOne['day' + num] = rsp.data.data.records[i].recordDateMap[key].firstTime + " " + rsp.data.data.records[i].recordDateMap[key].lastTime
                                } else {
                                    everyOne['day' + num] = ' - ';
                                }
                                num++;
                            }
                            this.$_data_$.push(everyOne);
                        }
                    }
                }
            })
        }

    }
}
</script>