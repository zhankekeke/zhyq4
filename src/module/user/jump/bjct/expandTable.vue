<style scoped>
.ivu-table-wrapper {
    border:none
  }
 .ivu-table-row td {
    border:none
  } 
</style>
<template>
    <div>
        <Table no-data-text :columns="$_expend_$" :data="boxList" :show-header=false></Table>
        <!-- 编辑包间 -->
    <el-dialog title="包间基本信息" :visible.sync="$_editdBjModal_$" width="60%">
        <el-form ref="editBjForm" :model="$_editBjForm_$" :rules="editBjFormValidate" label-width="90px">
          <el-form-item label="所属餐厅" prop="restaurantId">
            <el-select v-model="$_editBjForm_$.restaurantId" placeholder="请选择">
              <el-option
                v-for="item in restaurantSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item ref="file" label="预览图" prop="file">
            <el-upload
                            class="avatar-uploader"
                            action="http://api.yhcode.com:88/oss/file/upload/form"
                            list-type="picture-card"
                            :show-file-list="true"
                            ref="editupload"
                            :before-upload="beforeuploadEdit"
                            :on-remove="handleRemoveEdit"
                            :on-success="uploadSuccessEdit"
                            :file-list="imageList"
                             accept="image/png,image/gif,image/jpg,image/jpeg">

                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
          </el-form-item>
          <el-form-item label="包间名称" prop="name">
            <el-input v-model="$_editBjForm_$.name"></el-input>
          </el-form-item>
          <el-form-item label="包间地址" prop="address">
            <el-input v-model="$_editBjForm_$.address"></el-input>
          </el-form-item>
          <el-form-item label="容纳人数" prop="peopleNumber">
              <el-input v-model="$_editBjForm_$.peopleNumber"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
                    <!-- <el-input v-model="$_addBjForm_$.description"></el-input> -->
                    <quill-editor ref="myTextEditor"
                          v-model="$_editBjForm_$.description"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)">
                            <div id="toolbar" slot="toolbar">
                                <span class="ql-formats">
                        <button class="ql-bold">Bold</button><!--控制粗细-->
                        <button class="ql-italic">Italic</button>    <!--控制切斜-->
                        <button class="ql-underline">下划线</button>    <!--下划线-->
                        <button class="ql-link">link</button>    <!--链接-->
                        </span>
                                <span class="ql-formats">
                                    <select class="ql-align">
                                        <option selected="selected"></option>
                                        <option value="center"></option>
                                        <option value="right"></option>
                                        <option value="justify"></option>
                                    </select>
                                </span>
                                <span class="ql-formats">
                        <button class="ql-list" value="ordered"></button><!--序号-->
                        <button class="ql-list" value="bullet"></button>    <!--点-->
                        <button class="ql-list" value="ql-blockquote"></button>    <!--引用-->
                        <button class="ql-code-block"></button>    <!--代码-->
                    </span>
                                <span class="ql-formats">
                        <select class="ql-color">
                        <option selected></option>
                        <option value="red"></option>
                        <option value="orange"></option>
                        <option value="yellow"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="purple"></option>
                        </select>
                        <select class="ql-background">
                        <option selected></option>
                        <option value="red"></option>
                        <option value="orange"></option>
                        <option value="yellow"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="purple"></option>
                        </select>
                    </span>
                                <span class="ql-formats"><!--控制大小-->
                        <select class="ql-size">
                        <option value="small">小字体</option>
                        <option selected value="false">中字体</option>
                        <option value="large">大字体</option>
                        <option value="huge">超大字</option>
                        </select>
                    </span>
                                <span class="ql-formats">
                                    <button type="button" @click="imgClick" style="outline:none">
                                    <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                                    <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                                    <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                                </svg> </button>
                            </span>
                            </div>
                        </quill-editor>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="$_editBjModal_$ = false">取 消</el-button>
          <el-button type="primary" @click="$_editBj_$()">保存</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {
  Button,
  Form,
  Dialog,
  Input,
  FormItem,
  Select,
  Upload,
  Option
} from "element-ui";
import {quillEditor} from 'vue-quill-editor'
export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Upload.name]: Upload,
    [Option.name]: Option,
    quillEditor
  },
  props: {
    boxList: Array,
    restaurantSelect: Array,
    dList: Function,
    value: {type: String}, /*上传图片的地址*/
  },
  data() {
    return {
      editorOption: {modules: {toolbar: '#toolbar'}},
      $_expend_$: [
        //数据表头
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "缩略图",
          key: "img",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width:40px;height:40px;"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  attrs: {
                    src: params.row.images[0].imageUrl,
                    style: "width:40px;height:40px;"
                  },
                  style: {}
                })
              ]
            );
          }
        },
        {
          title: "餐厅名称",
          key: "name",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "容纳人数",
          key: "peopleNumber",
          align: "center"
        },
        {
          title: "实时人数",
          key: "freeCount",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            var a;
            if (params.row.status == 0) {
              a = "下架";
            }
            if (params.row.status == 1) {
              a = "上架";
            }
            return h("span", {}, a);
          }
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var a
            if(params.row.status == 0){
              a='上架'
            }if(params.row.status == 1){
              a='下架'
            }
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#67c23a"
                  },
                  on: {
                    click: () => {
                      this.$_edit_$(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#f56c6c"
                  },
                  on: {
                    click: () => {
                      this.$_remove_$(params.row);
                    }
                  }
                },
                "删除"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$_detail_$(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      if(params.row.status == 0){
                        this.$_upShelf_$(params.row);
                      }
                      if(params.row.status == 1){
                        this.$_abandon_$(params.row);
                      } 
                    }
                  }
                },
                a
              )
              
            ]);
          }
        }
      ],
      $_querycfg_$: {
        mod: "",
        params: {}
      },
      $_editdBjModal_$: false,
      $_editBjForm_$: {
        // 包间表单
        name: "",
        address: "",
        peopleNumber: "",
        description: ""
      },
      editBjFormValidate: {
        // 包间新增验证
        name: [{ required: true, message: "必填", trigger: "blur" }],
        address: [{ required: true, message: "必填", trigger: "blur" }],
        description: [{ required: true, message: "必填", trigger: "blur" }],
        peopleNumber: [{ required: true, message: "必填", trigger: "blur" }],
        restaurantId: [{ required: true, message: "必填", trigger: "blur" }],
        file: [{ required: true, message: "必填", trigger: "blur" }],
      },
      $_file_$:[],
      imageList:[],
      baseUrl: 'http://img.yhcode.com:88/',
      // restaurantSelect:[],  // 餐厅下拉选择
    };
  },
  created() {
    this.$_global_$.serverPath
  },
  methods: {
    // 编辑
    $_edit_$(row) {
      this.$_editBjForm_$ = {};
     
      this.$_editBjForm_$ = row;
      //console.log(this.$_editBjForm_$)
      this.imageList=[];
      this.$_file_$ = []
      this.$_file_$=row.images
      if (row.images.length > 0) {
        for (let i = 0; i < row.images.length; i++) {
          this.imageList.push({
            url: row.images[i].imageUrl
          })
        }
      }
       this.$_editdBjModal_$ = true;
    },
    // 编辑包间确定
    $_editBj_$(){
      this.$set(this.$_editBjForm_$, 'images', this.$_file_$)
      //console.log(this.$_editBjForm_$)
      this.$_sendQuery_$({
        method:"PUT",
        url:`${this.$_global_$.serverPath}/zone/zone/${this.$_editBjForm_$.zoneId}/restaurant/${this.$_editBjForm_$.restaurantId}/box/${this.$_editBjForm_$.id}`,
        data:{
          name: this.$_editBjForm_$.name,
          peopleNumber: this.$_editBjForm_$.peopleNumber,
          address: this.$_editBjForm_$.address,
          description:this.$_editBjForm_$.description,
          images: this.$_editBjForm_$.images
        },
        headers:{"Content-type":"application/json"}
      }).then((rsp)=>{
        if(rsp.status === 200){
          if(rsp.data.code === 0){
            this.$Message.success(rsp.data.message)
            this.$_editdBjModal_$ = false
          }else{
            this.$Message.error(rsp.data.message)
          }
        }
      })
    },
    // 删除
    $_remove_$(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确认删除?</p>",
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$_sendQuery_$({
            method:"DELETE",
            url:`${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}`,
            data:{},
            headers:{"Content-type":"application/json"}
          }).then((rsp)=>{
            //console.log(rsp)
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.$Message.success(rsp.data.message)
                this.dList()
              }else{
                this.$Message.error(rsp.data.message)
              }
            }
          })
        },
        onCancel: () => {
        }
      });
    },
    // 详情
    $_detail_$(row) {
      this.$root.$_Route_$('superadmin','jump','bjxq',{row: row})
    },
    // 下架
    $_abandon_$(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确认下架?</p>",
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$_sendQuery_$({
            method:"POST",
            url:`${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}/offline`,
            data:{},
            headers:{"Content-type":"application/json"}
          }).then((rsp)=>{
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.$Message.success("下架成功!")
                this.dList()
              }else{
                this.$Message.error("下架失败!")
              }
            }
          })
        },
        onCancel: () => {
        }
      });
    },
    // 上架
    $_upShelf_$(row){
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否确认下架?</p>",
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$_sendQuery_$({
            method:"POST",
            url:`${this.$_global_$.serverPath}/zone/zone/${row.zoneId}/restaurant/${row.restaurantId}/box/${row.id}/online`,
            data:{},
            headers:{"Content-type":"application/json"}
          }).then((rsp)=>{
            if(rsp.status === 200){
              if(rsp.data.code === 0){
                this.$Message.success("上架成功!")
                this.dList()
              }else{
                this.$Message.error("上架失败!")
              }
            }
          })
        },
        onCancel: () => {
        }
      });
    },
    beforeuploadEdit(file) {},
			// 移除
            handleRemoveEdit(file, fileList) {
                this.fileRmoveEdit(fileList);
            },
			 // 上传图片成功
            uploadSuccessEdit(res, file, fileList) {
                this.$_editForm_$.file = res.data;
                this.fileChangeEdit(fileList);
                this.$refs.file.clearValidate();
            },
			// 设置photo值
            fileChangeEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';

                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: this.baseUrl + temp_str}
                                //console.log(a)

                            }
                        }
                    }
                }
                this.$_file_$.push(a)
                //console.log(this.$_file_$)
            },
			// 移除设置photo值
            fileRmoveEdit(fileList) {
                let a = {}
                if (fileList.length > 0) {
                    for (let i = 0; i < fileList.length; i++) {
                        let temp_str = '';
                        if (fileList[i].response) {
                            if (fileList[i].response.code === 0) {
                                temp_str += fileList[i].response.data;
                                a = {imageUrl: temp_str}
                                //console.log(a)
                            }
                        }
                    }
                }
                this.$_file_$.pop(a)
                //console.log(this.$_file_$)
            },
            onEditorBlur() {//失去焦点事件
            },
            onEditorFocus() {//获得焦点事件
            },
            onEditorChange() {//内容改变事件
                // //console.log(this.$_content_$);
            },
            /*点击上传图片按钮*/
            imgClick() {
                /*内存创建input file*/
                var input = document.createElement('input')
                input.type = 'file'
                input.name = this.fileName
                input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                input.onchange = this.onFileChange
                input.click()
            },
            /*选择上传图片切换*/
            onFileChange(e) {
                var self = this
                var fileInput = e.target
                if (fileInput.files.length == 0) {
                    return
                }
                this.editor.focus()
                if (fileInput.files[0].size > 1024 * 1024 * 100) {
                    this.$alert('图片不能大于600KB', '图片尺寸过大', {confirmButtonText: '确定', type: 'warning',})
                }
                var data = new FormData
                data.append('file', fileInput.files[0]);
                this.$_sendQuery_$({
                    method: "POST",
                    url: 'http://api.yhcode.com:88/oss/file/upload/form',
                    data: data
                }).then(rsp => {
                    //console.log(rsp);

                    if (rsp.status === 200) {
                        if (rsp.data.code === 0) {
                            self.editor.insertEmbed(self.editor.getSelection().index, 'image', res.data.url)
                        }
                    }
                });
            },
  },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            }
        },
};
</script>