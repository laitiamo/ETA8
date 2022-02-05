<template>
  <div class="BookForm">
    <el-form
      :model="FormData"
      :rules="rules"
      label-position="top"
      ref="FormData"
      size="small"
      class="demo-FormData"
    >
      <el-form-item label="记录类型" class="no-padding">
        <el-input v-model="paperType" readonly></el-input>
      </el-form-item>
      <el-form-item label="著作名称" prop="paperName">
        <el-input
          v-model="FormData.paperName"
          placeholder="请输入著作名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="著作作者（按作者排序）" prop="FirstWriter">
        <el-input
          v-model="FirstWriter"
          style="width:140px"
          placeholder="请输入项目第一参与者"
          readonly
        ></el-input>
        <el-button @click="addDomain">新增参与者</el-button>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in FormData.domains"
        :label="'项目第' + (index + 2) + '位参与者（按参与者排序）'"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '参与者不能为空',
          trigger: 'blur',
        }"
      >
        <el-select
          v-model="domain.value"
          placeholder="请选择教师"
          filterable
          style="width:140px"
        >
          <el-option label="全部教师" value=""></el-option>
          <el-option
            v-for="opt in teacherList"
            :key="opt.id"
            :label="opt.teaName"
            :value="opt.userId"
          ></el-option>
        </el-select>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item label="发表时间" prop="paperTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="FormData.paperTime"
          style="width: 100%"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="出版社名称" prop="paperPlace">
        <el-input
          v-model="FormData.paperPlace"
          placeholder="请输入出版社名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="书本类型" prop="rankId">
        <el-select
          v-model="FormData.rankId"
          placeholder="请选择书类"
          style="display: block"
        >
          <template v-for="rankEach in BookList">
            <el-option
              :label="rankEach.rankName"
              :value="rankEach.id"
              :key="rankEach.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" width="90%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-form-item label="出版社图片" required prop="paperPicList">
        <el-upload
          class="img-upload"
          ref="upload"
          action="#"
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :file-list="fileList"
          :multiple="true"
          list-type="picture"
          :limit="5"
          accept="image/jpeg,image/png"
        >
          <el-button size="small">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传 jpg/png 格式文件，且总大小不超过10MB，最多上传5张
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top: 40px" size="medium">
        <el-button
          type="primary"
          @click="submitForm('FormData')"
          :loading="submitButton"
          >立即提交</el-button
        >
        <el-button
          @click="
            cancelUpload('FormData');
            goback();
          "
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTeacherList, getPaperList, uploadPaper } from "../../api";

export default {
  name: "BookForm",
  props: {
    FirstWriter: String,
    paperType: String,
    paperId: Number,
    typeId: Number,
    goback: { type: Function },
  },
  data() {
    return {
      submitButton: false,
      fileList: [], //已上传的文件列表
      BookList: [], //奖项等级的列表「从后端取得」
      teacherList: [], //教师列表「从后端取得」
      //表单数据
      FormData: {
        domains: [
          {
            value: "",
          },
        ],
        paperName: "",
        rankId: "",
        paperTime: "",
        paperPlace: "",
        paperPicList: [],
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        paperName: [
          { required: true, message: "请输入著作名称", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        rankId: [{ required: true, message: "请选择书类", trigger: "change" }],
        paperTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        paperPlace: [
          { required: true, message: "请输入出版社名称", trigger: "blur" },
          { min: 2, message: "长度需大于两个字符", trigger: "blur" },
        ],
        paperPicList: [
          { required: true, message: "请选择著作图片", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //图片预览的url
      dialogVisible: false, //是否显示预览
    };
  },
  mounted() {
    this.initRankList();
  },
  methods: {
    //初始化奖项等级列表
    initRankList() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("typeId", 2);
      getPaperList(params)
        .then((res) => {
          //closeDebug console.log("Ranklist初始化", obj);
          this.BookList = res;
          this.submitButton = false;
        })
        .catch((failResponse) => {});
      getTeacherList()
        .then((res) => {
          let obj2 = JSON.parse(res.msg);
          //closeDebug console.log("teacherList初始化", obj);
          this.teacherList = obj2.teacher;
        })
        .catch((failResponse) => {});
    },
    //处理表单提交事件
    submitForm(formName) {
      let _this = this;
      _this.submitButton = true;
      _this.$message({
        dangerouslyUseHTMLString: true,
        duration: 0,
        type: "success",
        message:
          '<strong>上传中,请勿关闭页面</strong><i class="el-icon-loading"></i>',
      });

      //closeDebug console.log();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data2upload = new FormData();
          //获取实际input组件的文件
          let filesList = this.FormData.paperPicList;
          data2upload.append("awardId", this.paperId);
          data2upload.append("typeId", this.typeId);
          data2upload.append("paperName", this.FormData.paperName);
          data2upload.append("paperTime", this.FormData.paperTime);
          data2upload.append("paperPlace", this.FormData.paperPlace);
          data2upload.append("rankId", this.FormData.rankId);
          //循环加入多文件
          for (let i = 0; i < filesList.length; i++) {
            data2upload.append("file", filesList[i].raw, filesList[i].raw.name);
          }
          for (let i = 0; i < this.FormData.domains.length; i++) {
            data2upload.append("userids[]", this.FormData.domains[i].value);
          }
          uploadPaper(data2upload)
            .then((res) => {
              //closeDebug console.log("-----------表单提交---------------");
              //closeDebug console.log("服务器返回值：", res);
              if (res.code === 0) {
                _this.$message.closeAll();
                _this.submitButton = false;
                _this.$message({
                  message: res.msg,
                  type: "success",
                });
                _this.cancelUpload("FormData");
                _this.goback();
              } else {
                _this.$message.closeAll();
                _this.submitButton = false;
                _this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            })
            .catch((failResponse) => {
              _this.$message.closeAll();
              _this.submitButton = false;
              console.log(failResponse);
              if (failResponse.status == 500) {
                _this.$message({
                  message: "上传失败，大小超出限制",
                  type: "error",
                });
              } else {
                _this.$message({
                  message: "上传失败，请检查网络，或压缩图片",
                  type: "error",
                });
              }
            });
        } else {
          _this.$message.closeAll();
          _this.submitButton = false;
          this.$message({
            message: "填写的信息有误",
            type: "error",
          });
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.FormData.domains.indexOf(item);
      if (index !== -1) {
        this.FormData.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.FormData.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    //取消上传，清空文件列表及表单
    cancelUpload(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
    },
    //处理已上传图片与表单内容的同步
    handleChange(file, fileList) {
      //closeDebug console.log("添加图片后", file, fileList);
      this.FormData.paperPicList = fileList;
    },
    //处理已上传的图片的删除
    handleRemove(file, fileList) {
      //closeDebug console.log("删除图片后", file, fileList);
    },
    //处理已上传的图片的点击预览
    handlePreview(file) {
      //closeDebug console.log("点击预览了", file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //处理上传图片超过限制
    handleExceed(files, fileList) {
      //closeDebug console.log("数量超出限制时", files, fileList);
      this.$message({
        message: "已达到图片数量上限",
        type: "error",
      });
    },
  },
};
</script>

<!-- 添加 "scoped" 标签 可以使以下CSS样式仅在本组件生效 例：<style scoped> -->
<style>
.demo-FormData {
  width: auto;
}
</style>
