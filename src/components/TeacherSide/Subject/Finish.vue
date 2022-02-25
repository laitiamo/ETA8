<template>
  <el-card class="success-box">
    <div class="success-page">
      <img :class="size" src="../../../assets/img/success.jpg" />
      <div class="success-desc">上传成功！等待管理员审核中...</div>
      <div class="success-handle">
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <router-link to="/eta/home">
              <el-button type="primary" size="large" v-if="windowWidth >= 720"
                >返回首页</el-button
              >
            </router-link>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <router-link to="/eta/subject">
              <el-button type="primary" size="large">返回列表</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      size: "big-img",
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    };
  },
  watch: {
    windowWidth(val) {
      //closeDebug console.log("实时屏幕宽度：", val, that.windowHeight);
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        this.windowWidth = window.fullWidth; // 宽
      })();
    };
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.size = "small-img";
    }
  },
};
</script>

<style scoped>
.success-box {
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  padding: 20px 5% 10px 5%;
  border-radius: 6px;
  background: rgb(249, 249, 249);
}
.big-img {
  display: inline-block;
  height: auto;
  max-width: 10%;
}

.small-img {
  display: inline-block;
  height: auto;
  max-width: 50%;
}
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 10px;
  width: auto;
  max-height: 100%;
  box-sizing: border-box;
}
.success-code span {
  color: #2d8cf0;
}
.success-desc {
  margin: 20px 0 10px 0;
  font-size: 30px;
  color: #777;
}
.success-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.success-btn {
  margin-left: 100px;
}
</style>
