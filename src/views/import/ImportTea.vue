<template>
  <div class="import-tea">
    <h3>教师导入</h3>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>操作提示</span>
        <el-button style="float: right;" @click="handleDownload" type="primary"
          >下载模板</el-button
        >
      </div>
      <h3>
        先下载教师模板，并按照要求录入数据「请勿随意更改模板内容」，完成后拖至下方进行上传
      </h3>
    </el-card>
    <el-divider></el-divider>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <span class="head-title">选择要导入的教师信息</span>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form2Query.collegeId"
          placeholder="全部二级学院"
          style="width:140px"
        >
          <el-option label="全部二级学院" value=""></el-option>
          <el-option
            v-for="opt in collegeList"
            :key="opt.id"
            :label="opt.collegeName"
            :value="opt.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form2Query.sectorId"
          placeholder="全部部门"
          style="width:160px"
        >
          <el-option label="全部部门" value=""></el-option>
          <el-option
            v-for="opt in sectorList"
            :key="opt.id"
            :label="opt.sectorName"
            :value="opt.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-upload
      ref="upload"
      class="upload-card"
      :limit="1"
      action="#"
      drag
      :http-request="uploadFile"
      list-type="text"
      accept=".xls"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将表格拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传模板表格
      </div>
    </el-upload>
  </div>
</template>

<script>
import { initManageTea, getTeaTemplate, uploadTeaTemplate } from "../../api";
export default {
  name: "ImportTea",
  components: {},
  computed: {},
  data() {
    return {
      //用于筛选的表单
      form2Query: {
        collegeId: "",
        sectorId: "",
      },
      //下拉栏内容列表
      collegeList: [],
      sectorList: [],
    };
  },
  mounted() {
    this.initQueryList();
  },
  methods: {
    initQueryList() {
      initManageTea()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.collegeList = obj.college;
          this.sectorList = obj.sector;
        })
        .catch((failResponse) => {});
    },
    //处理下载模板表格
    handleDownload() {
      getTeaTemplate()
        .then((res) => {
          //closeDebug console.log("-----------下载教师模板---------------");
          //closeDebug console.log(res);
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = decodeURIComponent("教师导入模板.xls");
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        })
        .catch((failResponse) => {});
    },
    // 文件上传
    uploadFile(params) {
      let _this = this;
      //closeDebug console.log("uploadFile", params);
      const _file = params.file;
      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("file", _file);
      formData.append("collegeId", this.form2Query.collegeId);
      formData.append("sectorId", this.form2Query.sectorId);
      uploadTeaTemplate(formData)
        .then((res) => {
          //closeDebug console.log("-----------模板上传---------------");
          //closeDebug console.log("服务器返回值：", res);
          if (res.code === 0) {
            _this.$notify({
              title: "教师数据导入成功",
              message: res.msg,
              type: "success",
              duration: 0,
            });
            _this.form2Query.collegeId = "";
            _this.form2Query.sectorId = "";
          } else {
            _this.$notify.error({
              title: "教师数据导入失败",
              message: res.msg,
              type: "error",
              duration: 0,
            });
          }
          _this.$refs.upload.clearFiles();
        })
        .catch((failResponse) => {});
    },
  },
};
</script>

<style>
.upload-card .el-upload-dragger {
  width: 100% !important;
}
.upload-card .el-upload {
  width: 100%;
}
</style>
