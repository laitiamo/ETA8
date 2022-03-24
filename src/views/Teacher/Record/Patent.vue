<template>
  <div class="PatentForm">
    <h3>{{ paperType }}</h3>
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
      <el-form-item label="申请号" prop="paperNum">
        <el-input
          v-model="FormData.paperNum"
          placeholder="请输入申请号"
        ></el-input>
      </el-form-item>
      <el-form-item label="专利名称" prop="paperName">
        <el-input
          v-model="FormData.paperName"
          placeholder="请输入专利名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="专利第一作者">
        <el-input
          v-model="name"
          style="width:140px"
          placeholder="请输入专利第一参与者"
          readonly
        ></el-input>
        <el-input
          v-model="username"
          style="width:140px"
          placeholder="请输入专利第一参与者"
          readonly
        ></el-input>
        <el-input
          v-model="role"
          style="width:140px"
          placeholder="请输入专利第一参与者"
          readonly
        ></el-input>
        <el-input
          v-model="college"
          style="width:200px"
          placeholder="请输入专利第一参与者"
          readonly
        ></el-input>
        <el-input
          v-model="t_sector"
          style="width:140px"
          placeholder="请输入专利第一参与者"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in FormData.domains"
        :label="'专利第' + (index + 2) + '位参与者（按参与者排序）'"
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
          @change="QueryRole(index)"
          style="width:140px"
        >
          <el-option label="全部教师" value=""></el-option>
          <el-option
            v-for="opt in TeacherList"
            :key="opt.userId"
            :label="opt.name"
            :value="opt.userId"
          ></el-option>
        </el-select>
        <el-input
          v-model="domain.teaNo"
          style="width:140px"
          placeholder="工号"
          filterable
          readonly
        ></el-input>
        <el-input
          v-model="domain.roleName"
          style="width:140px"
          placeholder="教师角色"
          filterable
          readonly
        ></el-input>
        <el-input
          v-model="domain.collegeName"
          style="width:200px"
          placeholder="所属学院"
          filterable
          readonly
        ></el-input>
        <el-input
          v-model="domain.sectorName"
          style="width:140px"
          placeholder="所属部门"
          filterable
          readonly
        ></el-input>
        <el-button @click="addDomain">新增</el-button>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item label="申请时间" prop="paperTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="FormData.paperTime"
          style="width: 100%"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="证书号" prop="paperPlace">
        <el-input
          v-model="FormData.paperPlace"
          placeholder="请输入证书号"
        ></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="rankId">
        <el-select
          v-model="FormData.rankId"
          placeholder="请选择专利类型"
          style="display: block"
        >
          <template v-for="rankEach in PatentList">
            <el-option
              :label="rankEach.rankName"
              :value="rankEach.id"
              :key="rankEach.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="归属项目（非必填）" prop="SubjectId">
        <el-select
          v-model="FormData.SubjectId"
          placeholder="请选择归属项目"
          style="display: block"
        >
          <template v-for="rankEach in SubjectList">
            <el-option
              :label="rankEach.subjectName"
              :value="rankEach.id"
              :key="rankEach.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" width="90%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-form-item label="证书附件" required prop="PaperFileList">
        <el-upload
          class="img-upload"
          ref="upload"
          action="#"
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :file-list="FileList"
          :multiple="true"
          list-type="text"
          :limit="5"
          accept=".pdf"
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
import { mapGetters } from "vuex";
import {
  getTeacherList,
  getPaperList,
  uploadPaper,
  getTeacherDetail,
} from "../../../api";
export default {
  name: "PatentForm",
  data() {
    return {
      typeId: 3,
      paperId: 128,
      paperType: "设计专利",
      submitButton: false,
      fileList: [], //已上传的文件列表
      PatentList: [], //专利等级的列表「从后端取得」
      TeacherList: [], //教师列表「从后端取得」
      SubjectList: [], //个人项目列表「从后端取得」
      //表单数据
      FormData: {
        domains: [
          {
            teaNo: "",
            value: "",
            roleName: "",
            collegeName: "",
            sectorName: "",
          },
        ],
        paperNum: "",
        paperName: "",
        rankId: "",
        SubjectId: "",
        paperTime: "",
        paperPlace: "",
        PaperFileList: [],
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        paperNum: [
          { required: true, message: "请输入论文编号", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        paperName: [
          { required: true, message: "请输入专利名称", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        rankId: [
          { required: true, message: "请选择专利类型", trigger: "change" },
        ],
        paperTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        paperPlace: [
          { required: false, message: "请输入申请号", trigger: "blur" },
          { min: 2, message: "长度需大于两个字符", trigger: "blur" },
        ],
        SubjectId: [
          { required: false, message: "请选择归属项目", trigger: "change" },
        ],
        PaperFileList: [
          { required: true, message: "请选择专利图片", trigger: "blur" },
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
    //初始化专利等级列表
    initRankList() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("typeId", this.typeId);
      getPaperList(params)
        .then((res) => {
          //closeDebug console.log("Ranklist初始化", obj);
          this.PatentList = res;
          this.submitButton = false;
        })
        .catch((failResponse) => {});
      getTeacherList()
        .then((res) => {
          let obj2 = JSON.parse(res.msg);
          //closeDebug console.log("TeacherList初始化", obj);
          this.TeacherList = obj2.teacher;
        })
        .catch((failResponse) => {});
      listPerSubject()
        .then((res) => {
          //closeDebug console.log("SubjectList初始化", obj);
          this.SubjectList = res;
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
          let filesList = this.FormData.PaperFileList;
          data2upload.append("typeId", this.typeId);
          data2upload.append("paperType", this.paperType);
          data2upload.append("paperNum", this.FormData.paperNum);
          data2upload.append("paperName", this.FormData.paperName);
          data2upload.append("paperTime", this.FormData.paperTime);
          data2upload.append("paperPlace", this.FormData.paperPlace);
          data2upload.append("SubjectId", this.FormData.SubjectId);
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
                _this.$router.push({
                  path: "/eta/ok",
                });
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
    //更新该教师角色
    QueryRole(index) {
      let params = new URLSearchParams();
      params.append("TeacherId", this.FormData.domains[index].value);
      getTeacherDetail(params)
        .then((res) => {
          let obj = JSON.parse(res.msg);
          this.FormData.domains[index].teaNo = obj.username;
          this.FormData.domains[index].roleName = obj.roleName;
          this.FormData.domains[index].collegeName = obj.collegeName;
          this.FormData.domains[index].sectorName = obj.sectorName;
        })
        .catch((failResponse) => {});
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
        teaNo: "",
        roleName: "",
        collegeName: "",
        sectorName: "",
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
      this.FormData.PaperFileList = fileList;
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
    //返回成果上传页面
    goback() {
      this.$router.push({
        path: "/eta/record",
      });
    },
  },
  computed: {
    ...mapGetters(["name", "username", "role", "college", "t_sector"]),
  },
};
</script>

<!-- 添加 "scoped" 标签 可以使以下CSS样式仅在本组件生效 例：<style scoped> -->
<style>
.demo-FormData {
  width: auto;
}
</style>
