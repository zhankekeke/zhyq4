<style scoped>
    .lm {
        color: red;
        font-size: 30px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="4">
                <!--<Tree :data="$_zkkTreeData_$" show-checkbox></Tree>-->
                <Tree :data="$_departmentList_$" @on-select-change="$_checkItem_$"></Tree>

            </Col>
            <Col span="20">
                <Row class='Row'>
                    <Input v-model='$_employeeInfo_$.name' placeholder="请输入员工姓名或手机号" style="width: 300px"></Input>
                    <Button type="primary" @click="$_search_$">搜索</Button>
                </Row>
                <br>

                <br>
                <Row class='Row' style='border-top:1px solid #e9eaec;'>
                    <Table ref="selection" :columns="$_employeeColumns_$" :data="$_employeeList_$"></Table>
                    <br>
                </Row>
                <br>
                <Row>
                    <Page align="right" :total="total"
                          show-elevator show-sizer
                          @on-page-size-change="$_pageNum_$"
                          @on-change="$_changePage_$"></Page>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            isall: true,
            itemid: 0,
            $_pageSize_$: 10,
            pageNum: 1,
            //传api
            $_userInfo_$: '',
            $_employeeInfo_$: {name: '', phoneNum: ''},
            total: 0,

            $_querycfg_$: {
                mod: 'module',
                params: {
                    //hcuancan
                }
            },
            $_departmentList_$: [
                {
                    title: '部门',
                    expand: true,
                    children: []
                }
            ],
            $_employeeColumns_$: [
                {
                    title: '序号',
                    type: "index",
                    width: 100,
                    align: 'center',
                }, {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                }, {
                    title: '性别',
                    key: 'sexname',
                    align: 'center',
                }, {
                    title: '联系方式',
                    key: 'phoneNumber',
                    align: 'center',
                },
                {
                    title: '邮箱',
                    key: 'emailUrl',
                    align: 'center',
                },
                {
                    title: '生日',
                    key: 'brithday',
                    align: 'center',
                },
                {
                    title: '职务',
                    key: 'position',
                    align: 'center',
                }, {
                    title: '入职时间',
                    key: 'regDate',
                    align: 'center',
                    sortable: true
                },

            ],
            $_employeeList_$: []
        }
    },
    created() {
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.$_userInfo_$ = JSON.parse(cookie);
        this.$_queryDepartmentList_$()
        this.$_search_$();
    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        //页面显示的数据条数
        $_pageNum_$(e) {
            this.$_pageSize_$ = e;
            if (this.isall) {
                this.$_search_$();
            } else {
                this.$_queryEmployeementList_$(this.itemid)
            }

        },
        $_changePage_$(e) {
            this.pageNum = e;
            if (this.isall) {
                this.$_search_$();
            } else {
                this.$_queryEmployeementList_$(this.itemid)
            }
        },
        $_search_$() {
            this.isall = true;
            var phoneNum = this.$_employeeInfo_$.name;
            if ((/^1[3-9][0-9]\d{4,8}$/.test(phoneNum))) {
                this.$_employeeInfo_$ = {name: '', phoneNum: phoneNum};
            }
            this.$_employeeInfo_$.pageNum = this.pageNum;
            this.$_employeeInfo_$.pageSize = this.$_pageSize_$;
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/employee/search`,
                data: this.$_employeeInfo_$,
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var arr = rsp.data.data;
                        this.$_employeeList_$ = arr.records;
                        for(let i=0;i<this.$_employeeList_$.length;i++){
                            if(this.$_employeeList_$[i].sex==0){
                                this.$_employeeList_$[i].sexname = '男'
                            }else{
                                this.$_employeeList_$[i].sexname = '女'
                            }
                        }
                        this.total = arr.total
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
        },
        $_queryDepartmentList_$() {
            this.$_sendQuery_$({
                method: "GET",
                url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department`,
                data: {},
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var arr = rsp.data.data;
                        this.$_departmentList_$[0].children = this.$_digui_$(arr);
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
        },
        $_queryEmployeementList_$(departmentId, isAdd) {
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/company/company/${this.$_userInfo_$.enterpriseId}/department/${departmentId}/employee`,
                data: {
                    pageSize: this.$_pageSize_$,
                    pageNum: this.pageNum
                },
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var arr = rsp.data.data;
                        if (isAdd) {
                            this.$_employeeList_$ = this.$_employeeList_$.concat(arr.records);
                        } else {
                            this.$_employeeList_$ = arr.records;
                        }
                        this.total = arr.total * 1
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
        },
        $_checkItem_$(e) {
            this.isall = false;
            this.itemid = e[0].id;
            this.$_queryEmployeementList_$(e[0].id);
            for (let i = 0; i < e[0].children.length; i++) {
                this.$_queryEmployeementList_$(e[0].children[i].id, true)
            }
        },

        $_digui_$(arr) {
            var children = [];
            for (var i = 0; i < arr.length; i++) {
                var temp = {
                    title: arr[i].name,
                    enterpriseId: arr[i].enterpriseId,
                    id: arr[i].id,
                    parentId: arr[i].parentId,
                };
                if (arr[i].child != null) {
                    temp.children = this.$_digui_$(arr[i].child)
                }
                children.push(temp)
            }
            return children;
        },
    }
}
</script>