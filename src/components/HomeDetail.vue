<template>
  <el-card shadow="always">
    <div class="title-container">
      <el-row :gutter="16" :xs="24" type="flex" style="flex-wrap: wrap">
        <el-col>
          <img src="../assets/img/img.jpg" class="user-avator" alt :xs="24" />
        </el-col>
        <el-col class="user-info-cont">
          <div class="info">{{ getTimeState() }}{{ name }}{{ getRole() }}</div>
          <div class="info-detail">
            <template v-if="roleId === 5 || roleId === 6">
              <div class="info-username">
                <i class="el-icon-info"></i>
                学号：{{ username }}
              </div>
              <div class="info-username">
                <i class="el-icon-s-home"></i>
                班级：{{ l_class }}
              </div>
            </template>
            <template v-if="roleId !== 5 && roleId !== 6">
              <div class="info-username">
                <i class="el-icon-info"></i>
                教职工号：{{ username }}
              </div>
              <div class="info-username">
                <i class="el-icon-info"></i>
                所属部门：{{ t_sector }}
              </div>
            </template>
            <div class="info-username">
              <i class="el-icon-info"></i>
              所属学院：{{ college }}
            </div>
            <div class="info-username">
              <i class="el-icon-user-solid"></i>
              身份：{{ role }}
            </div>
            <div class="info-role">
              <i class="el-icon-s-marketing"></i>
              您目前拥有获奖记录：{{ l_number }}条
            </div>
            <div class="info-role" v-if="roleId === 3 || roleId === 6">
              <i class="el-icon-s-marketing"></i>
              审核：您目前有 {{ l_unmanage }} 条奖项未审核
            </div>
            <template v-if="roleId === 1 || roleId === 2">
              <div class="info-username">
                <i class="el-icon-s-marketing"></i>
                电计院学生获奖记录：{{ stuItemNum }}条
              </div>
              <div class="info-username">
                <i class="el-icon-s-marketing"></i>
                电计院教师获奖记录：{{ teaItemNum }}条
              </div>
              <div class="info-role">
                <i class="el-icon-s-marketing"></i>
                电计院总获奖记录：{{ totalItemNum }}条
              </div>
            </template>
          </div>
        </el-col>
        <el-col class="info-inform" v-if="windowWidth >= 720">
          <Inform :roleId="roleId ? roleId : 5" />
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import Inform from "./Inform.vue";
export default {
  name: "HomeDetail",
  components: { Inform },
  props: [
    "name",
    "college",
    "role",
    "roleId",
    "genderId",
    "l_class",
    "l_number",
    "username",
    "t_sector",
    "l_unmanage",
    "stuItemNum",
    "teaItemNum",
    "totalItemNum",
    "windowWidth",
  ],
  methods: {
    getRole() {
      // 设置角色ID
      let roleId = this.roleId;
      // 设置称呼
      let rolename = ``;
      // 判断登录用户
      if (roleId === 5 || roleId === 6) {
        rolename = `同学`;
      } else if (
        roleId !== 5 && roleId !== 6
      ) {
        rolename = `老师`;
      } else {
        rolename = `数据加载中`;
      }
      return rolename;
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours >= 5 && hours <= 10) {
        state = `早上好！`;
      } else if (hours > 10 && hours <= 14) {
        state = `中午好！`;
      } else if (hours > 14 && hours <= 18) {
        state = `下午好！`;
      } else if ((hours > 18 && hours <= 24) || (hours >= 0 && hours < 5)) {
        state = `晚上好！`;
      } else {
        state = `请稍后`;
      }
      return state;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  margin: 8px 8px;
  height: 0.5em;
}
.title-container {
  text-align: center;
  margin-bottom: 24px;
  box-sizing: border-box;
  margin: auto;
  padding: 0;
  min-height: 200px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-weight: 0.0625rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.user-avator {
  margin-top: 3%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}
.user-info-cont {
  text-align: left;
  padding-left: 40px;
  font-family: "方正兰亭超细黑";
  flex: 1;
  margin-top: 2%;
  margin-left: 0%;
  margin-right: 0;
  color: rgb(0, 0, 0);
}
.info {
  font-size: 24px;
  margin-top: 3%;
  margin-bottom: 3%;
  text-align: center;
}
.info-detail {
  font-size: 15px;
  margin-top: 5%;
  margin-left: 5%;
  text-align: left;
}
.info-username {
  margin-top: 2%;
  margin-bottom: 1%;
}
.info-role {
  margin-top: 2%;
  margin-bottom: 10%;
}
.info-inform {
  font-size: 15px;
  margin-top: 1%;
  margin-bottom: 10%;
  text-align: left;
}
</style>
