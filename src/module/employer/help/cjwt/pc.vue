<style scoped>
   .container{font-size:14px;font-weight: 400;}
   .bg{min-height: 80x;line-height: 80px;box-sizing: border-box;padding:0 20px;background:#f7f7f7;}
   .title{font-size:18px;font-weight: bold;margin: 10px 0;}
</style>
<template>
   <div class='container'>
    <Row class='bg'>
            问题名称：<Input v-model="$_companyName_$" placeholder="请输入问题名称" style="width: 200px"></Input>
            <Button type="primary" style='margin-left: 50px;' @click="$_cNameSearch_$">搜索</Button>
        </Row>
        <br>
        <Row style='margin-top: 20px;font-size:16px;'>
            <Col span="6" style="min-height:500px;border-right:1px solid #ebebeb;">
                <p class="title">帮助中心</p>
                <!-- <Tree :data="$_Treedata_$"  show-checkbox></Tree> -->
                <Tree :data="$_data2_$" :load-data="loadData" @on-select-change="$_checkItem_$"></Tree>
            </Col>
            <Col span="18">
                <Table size='large' :columns="$_columns7_$" :data="$_questionList_$" style='margin-left: 10px;'></Table>
            </Col>
        </Row>
        <Row>
        <Col span="14" offset="10">
            <Page align="right" :total="total"
                  show-elevator
                  @on-change="$_changePage_$"/>
        </Col>
    </Row>
   </div>
</template>
<script>import controler from './controler.js';

export default {
    mixins: [controler],
    data() {
        return {
            $_companyName_$: "",
            $_modelQuestion_$: false,
            $_modelQuestionUP_$: false,
            $_userInfo_$: '',
            total: 0,
            parentSelect: [], // 一级分类列表
            parent: [],
            $_questionList_$: [],
            classifyId:null,
            $_querycfg_$:{
				mod:'module',
                params:{
                    pageNum:1
                }
            },
            $_data2_$:[
                {
                    title:'问题分类',
                    expand: true,
                    children:[]
                }],
            $_search_$:'',
            $_columns7_$: [
                {
                    title: '问题名称',
                    key: 'name',
                    render: (h, params) => {
                        console.log(params.row)
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'document-text'
                                },
                                style: {
                                    marginRight: '10px',
                                    fontSize:'20px',
                                    color:'#333',
                                    verticalAlign:'middle',
                                    cursor:'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.$_jump_$(params.row)
                                    }
                                }
                            }),
                            
                            h('strong',{
                                style: {
                                    cursor:'pointer',
                                },
                                on: {
                                    click: () => {
                                        this.$_jump_$(params.row)
                                    }
                                }},params.row.name)
                        ]);
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width:200,
                    align:'center'
                }
            ]
        }
    },
    created(){
        let cookie = this.$_getCookie_$('m-sjwdnnaiowm');
        this.$_userInfo_$ = JSON.parse(cookie);
        this.$_queryClassifyList_$();
        this.$_queryCommonProblemsPageList_$();
        this.$_cNameSearch_$();
    },
    methods: {
        $_changePage_$(e) {
            this.$_querycfg_$.params.pageNum = e;
            this.$_queryCommonProblemsPageList_$();
        },
        $_queryClassifyList_$() {
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                data: {zoneId: this.$_userInfo_$.zoneId, level: 1},
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        console.log(rsp.data);
                        var arr = rsp.data.data;
                        for (var i = 0; i < arr.length; i++) {
                            var temp = {}
                            var select = {}
                            var a = {}
                            temp = {
                                title: arr[i].name,
                                id: arr[i].id,
                                zoneId: arr[i].zoneId,
                                loading: false,
                                children: []
                            };
                            select = {
                                value: arr[i].id,
                                label: arr[i].name
                            };
                            a = {
                                id: arr[i].id,
                                zoneId: arr[i].zoneId
                            };
                            this.$_data2_$[0].children.push(temp)
                            this.parentSelect.push(select)
                            this.parent.push(a)
                        }
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
        },
        // 获取一级子分类
        loadData(item, callback) {
            console.log("item");
            console.log(item);
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/steward/classify/queryClassifyList`,
                data: {zoneId: this.$_userInfo_$.zoneId, level: 2, parentId: item.id},
                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                console.log(rsp)
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        var arr = rsp.data.data;
                        var data = [];
                        if (arr.length == 0) {
                            this.$Message.success("该分类下暂无子分类!")
                        } else {
                            for (var i = 0; i < arr.length; i++) {
                                var temp = {};
                                temp = {
                                    id: arr[i].id,
                                    title: arr[i].name,
                                    parentId: arr[i].parentId,
                                    zoneId: arr[i].zoneId
                                }
                                data.push(temp)
                            }
                        }
                        callback(data)
                    }
                }
            })
        },
        $_queryCommonProblemsPageList_$() {
            let params = {
                zoneId: this.$_userInfo_$.zoneId,
                classifyId: this.classifyId,
                current: this.$_querycfg_$.params.pageNum,
                putaway: 0
            }
            if(this.$_companyName_$){
                params.name = this.$_companyName_$
            }
            this.$_sendQuery_$({
                method: "POST",
                url: this.$_global_$.serverPath + `/steward/commonProblems/queryCommonProblemsPageList`,
                data: params,

                headers: {"Content-type": "application/json"}
            }).then((rsp) => {
                if (rsp.status === 200) {
                    if (rsp.data.code === 0) {
                        
                        let rtmp = rsp.data.data.records;
                        for (let i = 0; i < rtmp.length; i++) {
                            rtmp[i].number = i + 1;
                        }
                        this.$_questionList_$ = rtmp;
                        this.total = rsp.data.data.total;
                    } else {
                        this.$Message.error(rsp.data.message);
                    }
                }
            })
        },
        $_checkItem_$(e) {
            console.log(e);
            this.classifyId = e[0].id;
            this.$_queryCommonProblemsPageList_$()
        },



       $_receive_$(rsp){
			if(rsp.status === 200){
				if(rsp.data.status === 0){
					this.list = rsp.data.obj;
                }
            }
        },
        $_jump_$(data){
            this.$root.$_Route_$('employer','jump','cjwtxq',{data:data})
        },
        $_cNameSearch_$() {
            //  公司名称搜索
            // this.$_data6_$ = [];
            this.$_queryCommonProblemsPageList_$()
        },
    }
}
</script>