<template>
  <el-container class="main-container">
    <el-aside width="auto" v-if="windowWidth >= 720">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo left-menu"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
      >
        <el-menu-item>
          <template slot="title">
            <span class="logo" v-if="!isCollapse">ETA</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/eta/home">
          <i class="el-icon-house"></i>
          <span slot="title" class="menu-title">系统主页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-operation"></i>
            <span slot="title" class="menu-title">功能菜单</span>
          </template>
          <el-menu-item index="/eta/upload">上传奖项</el-menu-item>
          <el-menu-item index="/eta/record" v-if="roleId !== 5 && roleId !== 6"
            >上传成果</el-menu-item
          >
          <el-menu-item index="/eta/subject" v-if="roleId !== 5 && roleId !== 6"
            >项目申报</el-menu-item
          >
        </el-submenu>
        <template
          v-if="roleId === 1 || roleId === 3 || roleId === 6 || roleId === 7"
        >
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-help"></i>
              <span slot="title" class="menu-title">审核记录</span>
            </template>
            <el-menu-item index="/eta/review-stu" v-if="roleId !== 7"
              >学生奖项审核</el-menu-item
            >
            <el-menu-item
              index="/eta/review-tea"
              v-if="roleId === 1 || roleId === 7"
              >教师奖项审核</el-menu-item
            >
            <template v-if="roleId !== 3 && roleId !== 6">
              <el-menu-item index="/eta/record-review">成果审核</el-menu-item>
              <el-menu-item index="/eta/review-subject">项目审核</el-menu-item>
              <el-menu-item index="/eta/subject-finish">项目结题</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title" class="menu-title">奖项记录</span>
          </template>
          <el-menu-item index="/eta/mine">奖项记录</el-menu-item>
          <template v-if="roleId !== 5 && roleId !== 6">
            <el-menu-item index="/eta/mine-paper">成果记录</el-menu-item>
            <el-menu-item index="/eta/mine-subject">项目记录</el-menu-item>
          </template>
        </el-submenu>
        <template
          v-if="roleId == 1 || roleId == 2 || roleId == 3 || roleId === 7"
        >
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span slot="title" class="menu-title">记录管理</span>
            </template>
            <el-menu-item index="/eta/query-stu" v-if="roleId !== 7"
              >管理学生获奖</el-menu-item
            >
            <template v-if="roleId !== 3">
              <el-menu-item index="/eta/query-tea">管理教师获奖</el-menu-item>
              <el-menu-item index="/eta/query-paper">管理成果记录</el-menu-item>
              <el-menu-item index="/eta/query-subject"
                >管理科研项目</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template
          v-if="roleId == 1 || roleId == 2 || roleId == 3 || roleId === 7"
        >
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-receiving"></i>
              <span slot="title" class="menu-title">数据管理</span>
            </template>
            <el-menu-item
              v-if="roleId !== 2 && roleId !== 7"
              index="/eta/manage-stu"
              >学生管理</el-menu-item
            >
            <el-menu-item
              v-if="roleId == 1 || roleId === 7"
              index="/eta/manage-tea"
              >教师管理</el-menu-item
            >
            <el-menu-item v-if="roleId == 1" index="/eta/manage-class"
              >班级管理</el-menu-item
            >
            <el-menu-item v-if="roleId !== 2" index="/eta/award"
              >奖项管理</el-menu-item
            >
          </el-submenu>
        </template>
        <template v-if="roleId == 1 || roleId == 3 || roleId == 7">
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-upload2"></i>
              <span slot="title" class="menu-title">数据导入</span>
            </template>
            <el-menu-item index="/eta/import-stu" v-if="roleId !== 7"
              >学生导入</el-menu-item
            >
            <el-menu-item v-if="roleId !== 3" index="/eta/import-tea"
              >教师导入</el-menu-item
            >
            <el-menu-item index="/eta/import-award">奖项导入</el-menu-item>
          </el-submenu>
        </template>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title" class="menu-title">系统设置</span>
          </template>
          <el-menu-item index="/eta/log" v-if="roleId == 1 || roleId == 7"
            >操作日志</el-menu-item
          >
          <el-menu-item index="/eta/password">修改密码</el-menu-item>
        </el-submenu>
      </el-menu></el-aside
    >
    <el-container style="height: auto">
      <el-header>
        <el-menu
          :default-active="$route.path"
          v-if="windowWidth >= 720"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-button
            class="menu-button"
            @click="submenuTrigger"
            type="text"
            :icon="CollapseIcon"
            v-if="windowWidth >= 720"
          ></el-button>
          <el-menu-item index="/eta/home">
            <i class="el-icon-s-home" />{{ $route.name }}
          </el-menu-item>
          <el-menu-item
            style="float: right"
            :index="$route.path"
            @click="loginOutHander"
          >
            <i class="el-icon-switch-button" />退出登陆</el-menu-item
          >
        </el-menu>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          v-if="windowWidth < 720"
        >
          <el-button
            title="移动端标题栏"
            class="menu-button"
            @click="submenuTrigger"
            type="text"
            :icon="CollapseIcon"
          ></el-button>
          <el-submenu style="float: right" index="8">
            <template slot="title">你好，{{ role }}</template>
            <el-menu-item
              style="text-align: center"
              index="9-1"
              @click="loginOutHander"
              ><i class="el-icon-switch-button" />退出登陆</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <el-drawer
          title="移动端菜单栏"
          :visible.sync="isCollapse"
          :with-header="false"
          direction="ltr"
          size="50%"
          v-if="windowWidth < 720"
        >
          <el-menu
            :default-active="$route.path"
            class="left-menu"
            @select="mobileMenuSelect"
            @open="handleOpen"
            @close="handleClose"
            :collapse="false"
            :router="true"
            :unique-opened="true"
          >
            <el-menu-item index="/eta/home">
              <i class="el-icon-house"></i>
              <span slot="title" class="menu-title">系统主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span slot="title" class="menu-title">功能菜单</span>
              </template>
              <el-menu-item index="/eta/upload">上传奖项</el-menu-item>
              <el-menu-item
                index="/eta/record"
                v-if="roleId !== 5 && roleId !== 6"
                >上传成果</el-menu-item
              >
              <el-menu-item
                index="/eta/subject"
                v-if="roleId !== 5 && roleId !== 6"
                >项目申报</el-menu-item
              >
            </el-submenu>
            <template
              v-if="
                roleId === 1 || roleId === 3 || roleId === 6 || roleId === 7
              "
            >
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-help"></i>
                  <span slot="title" class="menu-title">审核记录</span>
                </template>
                <el-menu-item index="/eta/review-stu" v-if="roleId !== 7"
                  >学生奖项审核</el-menu-item
                >
                <el-menu-item
                  index="/eta/review-tea"
                  v-if="roleId === 1 || roleId === 7"
                  >教师奖项审核</el-menu-item
                >
                <template v-if="roleId !== 3 && roleId !== 6">
                  <el-menu-item index="/eta/record-review"
                    >成果审核</el-menu-item
                  >
                  <el-menu-item index="/eta/review-subject"
                    >项目审核</el-menu-item
                  >
                  <el-menu-item index="/eta/subject-finish"
                    >项目结题</el-menu-item
                  >
                </template>
              </el-submenu>
            </template>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title" class="menu-title">奖项记录</span>
              </template>
              <el-menu-item index="/eta/mine">奖项记录</el-menu-item>
              <template v-if="roleId !== 5 && roleId !== 6">
                <el-menu-item index="/eta/mine-paper">成果记录</el-menu-item>
                <el-menu-item index="/eta/mine-subject">项目记录</el-menu-item>
              </template>
            </el-submenu>
            <template
              v-if="roleId == 1 || roleId == 2 || roleId == 3 || roleId === 7"
            >
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-help"></i>
                  <span slot="title" class="menu-title">记录管理</span>
                </template>
                <el-menu-item index="/eta/query-stu" v-if="roleId !== 7"
                  >管理学生获奖</el-menu-item
                >
                <template v-if="roleId !== 3">
                  <el-menu-item index="/eta/query-tea"
                    >管理教师获奖</el-menu-item
                  >
                  <el-menu-item index="/eta/query-paper"
                    >管理成果记录</el-menu-item
                  >
                  <el-menu-item index="/eta/query-subject"
                    >管理科研项目</el-menu-item
                  >
                </template>
              </el-submenu>
            </template>
            <template
              v-if="roleId == 1 || roleId == 2 || roleId == 3 || roleId === 7"
            >
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-receiving"></i>
                  <span slot="title" class="menu-title">数据管理</span>
                </template>
                <el-menu-item
                  v-if="roleId !== 2 && roleId !== 7"
                  index="/eta/manage-stu"
                  >学生管理</el-menu-item
                >
                <el-menu-item v-if="roleId == 1" index="/eta/manage-tea"
                  >教师管理</el-menu-item
                >
                <el-menu-item v-if="roleId == 1" index="/eta/manage-class"
                  >班级管理</el-menu-item
                >
                <el-menu-item
                  v-if="roleId !== 2 && roleId !== 7"
                  index="/eta/award"
                  >奖项管理</el-menu-item
                >
              </el-submenu>
            </template>
            <template v-if="roleId == 1 || roleId == 3 || roleId == 7">
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-upload2"></i>
                  <span slot="title" class="menu-title">数据导入</span>
                </template>
                <el-menu-item index="/eta/import-stu" v-if="roleId !== 7"
                  >学生导入</el-menu-item
                >
                <el-menu-item v-if="roleId !== 3" index="/eta/import-tea"
                  >教师导入</el-menu-item
                >
                <el-menu-item index="/eta/import-award">奖项导入</el-menu-item>
              </el-submenu>
            </template>
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title" class="menu-title">系统设置</span>
              </template>
              <el-menu-item index="/eta/log" v-if="roleId == 1 || roleId == 7"
                >操作日志</el-menu-item
              >
              <el-menu-item index="/eta/password">修改密码</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-drawer>
        <router-view
      /></el-main>
      <el-footer
        >东南大学成贤学院
        <a class="bottom-link" href="http://jsjx.cxxy.seu.edu.cn/"
          >电子与计算机工程学院</a
        >
        技术支持</el-footer
      >
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { initHome, logout } from "../api";
import { mapGetters } from "vuex";
export default {
  name: "HomeScreen",
  data() {
    return {
      isCollapse: false,
      CollapseIcon: "el-icon-s-fold",
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    };
  },
  watch: {
    windowWidth(val) {
      let that = this;
      //closeDebug console.log("实时屏幕宽度：", val, that.windowHeight);
    },
  },

  computed: {
    ...mapGetters([
      "name", //用户名
      "username",
      "role",
      "roleId",
      //如果是学生的话还有以下参数
      "grade",
      "major",
      "college",
      "l_class",
    ]),
  },
  mounted() {
    //进入时进行用户信息初始化
    this.init();
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.CollapseIcon = "el-icon-s-unfold";
    }
  },
  methods: {
    //初始化角色
    init() {
      let _this = this;
      initHome()
        .then((res) => {
          //closeDebug console.log("-----------主页初始化---------------");
          if (res.code === 0) {
            // _this.$notify({
            //   title: "登陆成功",
            //   message: "欢迎回来",
            //   type: 'success'
            // });
            let obj = JSON.parse(res.msg);
            //closeDebug console.log("用户信息解析", obj);
            this.$store.commit("initUserInfo", {
              roleId: obj.l_roleId, //角色
              name: obj.l_name, //用户姓名
              username: obj.l_username, //用户编号
              role: obj.l_role, //用户角色
              college: obj.l_college, //学院
              //如果是学生的话还有以下参数
              grade: obj.l_grade, //年级
              major: obj.l_major, //专业
              l_genderId: obj.l_genderId, //性别
              l_class: obj.l_class, //班级
              //如果是教师的话设置所属部门
              t_sector: obj.t_sector, //所属部门
            });
          } else {
            _this.$notify({
              title: "未能读取到个人信息",
              message: "请重新登陆",
              type: "warning",
            });
            _this.$router.push({ path: "/" });
          }
        })
        .catch((failResponse) => {});
    },
    submenuTrigger() {
      this.isCollapse = !this.isCollapse;
      this.CollapseIcon = this.isCollapse
        ? "el-icon-s-unfold"
        : "el-icon-s-fold";
    },
    handleOpen(key, keyPath) {
      //closeDebug console.log("侧边菜单打开了", key, keyPath);
    },
    handleClose(key, keyPath) {
      //closeDebug console.log("侧边菜单关闭了", key, keyPath);
    },
    handleSelect(key, keyPath) {
      //closeDebug console.log("顶部菜单选中了", key, keyPath);
    },
    mobileMenuSelect(key, keyPath) {
      this.isCollapse = false;
    },
    loginOutHander() {
      let _this = this;
      logout()
        .then((res) => {
          //closeDebug console.log("退出登陆", res);
          if (res.code === 0) {
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            //设置登陆状态
            // _this.$store.commit("setLoginState", false);
          } else {
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            _this.changeCode();
          }
        })
        .catch((failResponse) => {});
      setTimeout(function() {
        _this.$router.push({ path: "/" });
      }, 1000);
    },
  },
};
</script>
<style>
.logo {
  float: left;
  font-weight: 800;
  font-size: 36px;
  color: #0084ffbe;
}
.logo-text {
  margin-left: 10px;
  float: left;
  font-size: 20px;
}
.main-container {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 55px;
}
.el-footer {
  background-color: #ffffff;
  color: rgb(70, 69, 69);
  text-align: center;
  font-size: 12px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 300px;
  display: flex;
  flex-direction: column;
}
.bottom-link {
  text-decoration: none;
}
/* 未访问的链接 */
.bottom-link:link {
  color: #0084ff;
}

/* 已访问的链接 */
.bottom-link:visited {
  color: #0084ff;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.menu-title {
  font-weight: 600;
}

.menu-button {
  float: left !important;
  color: rgb(0, 0, 0) !important;
  margin: 15px 10px 0px 0px !important;
  padding: 0px !important;
  font-size: 28px !important;
}
</style>
