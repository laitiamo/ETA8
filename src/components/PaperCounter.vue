<template>
  <el-card class="info-card">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="7" :xs="8"
        ><div class="item-container">
          <div class="item-title">院计论文</div>
          <div class="item-content">{{ paperNum }}</div>
        </div></el-col
      >
      <el-divider direction="vertical"></el-divider>
      <el-col :span="7" :xs="8"
        ><div class="item-container">
          <div class="item-title">院计著作</div>
          <div class="item-content">{{ bookNum }}</div>
        </div></el-col
      >
      <el-divider direction="vertical"></el-divider>
      <el-col :span="7" :xs="8"
        ><div class="item-container">
          <div class="item-title">院计专利</div>
          <div class="item-content">{{ patentNum }}</div>
        </div></el-col
      >
      <el-divider direction="vertical"></el-divider>
      <el-col :span="7" :xs="8"
        ><div class="item-container">
          <div class="item-title">院计项目</div>
          <div class="item-content">{{ subjectNum }}</div>
        </div></el-col
      >
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "PaperCounter",
  props: {
    paperNum: Number,
    bookNum: Number,
    cultivateNum: Number,
    patentNum: Number,
    subjectNum: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-divider--vertical {
  margin: 8px 8px;
  height: 3em;
}
.item-container {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
}
.item-title {
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.8em;
}
.item-content {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
</style>
