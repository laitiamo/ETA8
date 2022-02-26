import Vue from "vue";
import VueRouter from "vue-router";
import LoginScreen from "../screens/LoginScreen.vue";
import MainScreen from "../screens/MainScreen.vue";
import { checkState } from "../api/index";
import { Message } from "element-ui";

Vue.use(VueRouter);

// TODO 正式部署时全部改为懒加载模式可以加快加载速度

const routes = [
  {
    path: "/",
    name: "LoginScreen",
    component: LoginScreen,
  },
  {
    path: "/eta",
    name: "MainScreen",
    component: MainScreen,
    children: [
      {
        // 当 /eta/home 匹配成功，
        // Home 会被渲染在 MainScreen 的 <router-view> 中
        path: "home",
        name: "系统主页",
        component: () => import("../views/Home"),
      },
      {
        path: "upload",
        name: "上传奖项",
        component: () => import("../views/Upload"),
      },
      {
        path: "record",
        name: "上传成果",
        component: () => import("../views/Record"),
      },
      {
        path: "subject",
        name: "项目申报",
        component: () => import("../views/Subject"),
      },
      {
        path: "sponsored",
        name: "纵向项目",
        component: () =>
          import("../components/TeacherSide/Subject/SponsoredForm"),
      },
      {
        path: "horizon",
        name: "横向项目",
        component: () =>
          import("../components/TeacherSide/Subject/HorizontallForm"),
      },
      {
        path: "school",
        name: "校级项目",
        component: () => import("../components/TeacherSide/Subject/SchoolForm"),
      },
      {
        path: "book",
        name: "著作教材",
        component: () => import("../components/TeacherSide/Record/BookForm"),
      },
      {
        path: "paper",
        name: "发表论文",
        component: () => import("../components/TeacherSide/Record/PaperForm"),
      },
      {
        path: "patent",
        name: "设计专利",
        component: () => import("../components/TeacherSide/Record/PatentForm"),
      },
      {
        path: "mine",
        name: "获奖记录",
        component: () => import("../views/Mine"),
      },
      {
        path: "mine-paper",
        name: "成果记录",
        component: () => import("../views/TeacherSide/Mine-Paper"),
      },
      {
        path: "mine-subject",
        name: "著作记录",
        component: () => import("../views/TeacherSide/Mine-Subject"),
      },
      {
        path: "password",
        name: "系统设置",
        // which is lazy-loaded when the route is visited.
        // 使用时导入，类似懒加载
        component: () => import("../views/Password"),
      },
      {
        path: "query-stu",
        name: "管理学生获奖",
        component: () => import("../views/QueryStu"),
      },
      {
        path: "query-tea",
        name: "管理教师获奖",
        component: () => import("../views/QueryTea"),
      },
      {
        path: "query-paper",
        name: "管理成果记录",
        component: () => import("../views/TeacherSide/QueryPaper"),
      },
      {
        path: "query-subject",
        name: "管理科研项目",
        component: () => import("../views/TeacherSide/QuerySubject"),
      },
      {
        path: "award-review",
        name: "奖项审核",
        component: () => import("../views/Review"),
      },
      {
        path: "record-review",
        name: "成果审核",
        component: () => import("../views/TeacherSide/Review-Record"),
      },
      {
        path: "subject-review",
        name: "项目审核",
        component: () => import("../views/TeacherSide/Review-Subject"),
      },
      {
        path: "subject-finish",
        name: "项目结题",
        component: () => import("../views/TeacherSide/Finish-Subject"),
      },
      {
        path: "log",
        name: "查看日志",
        component: () => import("../views/Log"),
      },
      {
        path: "award",
        name: "奖项管理",
        component: () => import("../views/Award"),
      },
      {
        path: "manage-stu",
        name: "学生管理",
        component: () => import("../views/ManageStu"),
      },
      {
        path: "manage-tea",
        name: "教师管理",
        component: () => import("../views/ManageTea"),
      },
      {
        path: "manage-class",
        name: "班级管理",
        component: () => import("../views/ManageClass"),
      },
      {
        path: "import-stu",
        name: "学生导入",
        component: () => import("../views/import/ImportStu"),
      },
      {
        path: "import-tea",
        name: "教师导入",
        component: () => import("../views/import/ImportTea"),
      },
      {
        path: "import-award",
        name: "奖项导入",
        component: () => import("../views/import/ImportAward"),
      },
      {
        path: "ok",
        component: () => import("../components/TeacherSide/Subject/Finish"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path !== "/") {
    // //closeDebug console.log("登陆状态",store.state.ifLogin)
    // next();
    let ifLogin = false;
    checkState()
      .then((res) => {
        //closeDebug console.log("登陆状态检测请求成功", res);
        ifLogin = true;
      })
      .catch((err) => {
        //closeDebug console.log("登陆状态检测请求失败", err);
      })
      .finally(() => {
        if (!ifLogin) {
          router.push({ name: "LoginScreen" });
          Message.error({
            message: "未登陆或登陆信息已过期，请重新登陆",
          });
        } else {
          next();
        }
      });
  } else {
    next();
  }
});

export default router;
