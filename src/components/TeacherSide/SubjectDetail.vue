<template>
  <div>
    <el-page-header @back="goback()" content="著作详情页"> </el-page-header>
    <el-carousel :interval="4000" height="300px" type="card">
      <el-carousel-item v-for="item in detailData.imagePaths" :key="item">
        <el-image
          class="image-row"
          :src="item"
          fit="scale-down"
          :preview-src-list="detailData.imagePaths"
          ><div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i></div
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card">
      <el-divider content-position="left"
        ><span class="div-font">负责人教师信息</span></el-divider
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
        <el-col class="detail-info" :span="12" :xs="24"
          >单位：{{ detailData.place }}</el-col
        >
      </el-row>
      <el-divider content-position="left"
        ><span class="div-font">项目基础信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >项目名称：{{ detailData.subject }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目参与者：{{ detailData.writer }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目类型：{{ detailData.rank }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目经费：{{ detailData.fund }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目级别：{{ detailData.level }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >发表时间：{{ detailData.time }}</el-col
        >
      </el-row>
      <el-divider content-position="left"
        ><span class="div-font">校级项目</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >项目来源：{{ detailData.Source }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >合作单位：{{ detailData.Cooperate }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >统计归属：{{ detailData.Belong }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >一级学科：{{ detailData.Type }}</el-col
        >
      </el-row>
      <el-divider content-position="left"
        ><span class="div-font">审核信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >上传时间：{{ detailData.createAt }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >计划结项时间：{{ detailData.finishAt }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核状态：{{ detailData.review }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核时间：{{ detailData.reviewAt }}</el-col
        >
        <el-col
          class="detail-info"
          :span="16"
          :xs="24"
          v-if="detailData.review == '未结项'"
          >项目成果：</el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SubjectDetail",
  props: {
    detailData: {},
    goback: { type: Function },
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
