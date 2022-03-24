<template>
  <div>
    <el-page-header @back="goback()" content="成果详情页"> </el-page-header>
    <el-divider></el-divider>
    <el-card class="box-card">
      <el-divider content-position="left"
        ><span class="div-font">第一教师信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >教职工号：{{ detailData.username }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >姓名：{{ detailData.name }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >性别：{{ detailData.gender }}</el-col
        >
      </el-row>
      <template v-if="detailData.typeId === 1">
        <el-divider content-position="left"
          ><span class="div-font">成果信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >成果类型：{{ detailData.type }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >期卷号：{{ detailData.num }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >论文名称：{{ detailData.paper }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >论文其他作者：{{ detailData.writer }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >论文级别：{{ detailData.rank }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >刊物单位：{{ detailData.place }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >论文日期：{{ detailData.time }}</el-col
          >
        </el-row>
      </template>
      <template v-if="detailData.typeId === 2">
        <el-divider content-position="left"
          ><span class="div-font">论文信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >成果类型：{{ detailData.type }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >著作号：{{ detailData.num }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >著作名称：{{ detailData.paper }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >著作类型：{{ detailData.rank }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >著作其他作者：{{ detailData.writer }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >出版社名称：{{ detailData.place }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >著作日期：{{ detailData.time }}</el-col
          >
        </el-row>
      </template>
      <template v-if="detailData.typeId === 3">
        <el-divider content-position="left"
          ><span class="div-font">专利信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >成果类型：{{ detailData.type }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >专利号：{{ detailData.num }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >专利名称：{{ detailData.paper }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >专利类型：{{ detailData.rank }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >专利其他作者：{{ detailData.writer }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >证书号：{{ detailData.place }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >发表日期：{{ detailData.time }}</el-col
          >
        </el-row>
      </template>
      <el-divider content-position="left"
        ><span class="div-font">审核信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >上传时间：{{ detailData.createAt }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核状态：{{ detailData.review }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核时间：{{ detailData.reviewAt }}</el-col
        >
      </el-row>
      <el-divider content-position="left"
        ><span class="div-font">拓展信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24">
          <el-button type="primary" @click="onExportFile" :loading="loading"
            >导出附件</el-button
          ></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { exportTeaPaperPDF } from "../api";
export default {
  name: "PaperDetail",
  props: {
    detailData: {},
    goback: { type: Function },
  },
  methods: {
    //处理导出附件
    onExportFile() {
      //closeDebug console.log("export XLS:", this.form2Query);
      //参数绑定「筛选参数」
      this.loading = true;
      let params = new URLSearchParams();
      params.append("id", this.detailData.id); //成果id
      exportTeaPaperPDF(params)
        .then((res) => {
          //closeDebug console.log("-----------导出教师成果文件---------------");
          //closeDebug console.log(res);
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          //new一个时间对象
          var nowDate = new Date().toLocaleDateString();
          downloadElement.download = decodeURIComponent(
            nowDate + "_" + this.detailData.type + "_" +  this.detailData.rank + "_" + this.detailData.paper +  ".zip"
          );
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.loading = false;
        })
        .catch((failResponse) => {});
    },
  },
};
</script>
<style>
.div-font {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}
.detail-info {
  margin: 5px 0 10px 0;
  font-weight: normal;
  font-size: 0.9em;
}
.image-row {
  width: auto;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.row-container {
  min-height: 30px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(156, 156, 156, 0.849);
  margin-left: 10%;
  margin-right: 10%;
}
.row-title {
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}
.row-content {
  text-align: center;
  font-size: 0.9rem;
}
</style>
