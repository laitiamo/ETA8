"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _LoginScreen = _interopRequireDefault(require("../screens/LoginScreen.vue"));

var _MainScreen = _interopRequireDefault(require("../screens/MainScreen.vue"));

var _index = require("../api/index");

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]); // TODO 正式部署时全部改为懒加载模式可以加快加载速度


var routes = [{
  path: "/",
  name: "LoginScreen",
  component: _LoginScreen["default"]
}, {
  path: "/eta",
  name: "MainScreen",
  component: _MainScreen["default"],
  children: [{
    // 当 /eta/home 匹配成功，
    // Home 会被渲染在 MainScreen 的 <router-view> 中
    path: "home",
    name: "系统主页",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Home"));
      });
    }
  }, {
    path: "upload",
    name: "上传奖项",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Upload"));
      });
    }
  }, {
    path: "record",
    name: "上传成果",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Record"));
      });
    }
  }, {
    path: "subject",
    name: "项目申报",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Subject"));
      });
    }
  }, {
    path: "sponsored",
    name: "纵向项目",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/TeacherSide/SponsoredForm"));
      });
    }
  }, {
    path: "horizon",
    name: "横向项目",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/TeacherSide/HorizontallForm"));
      });
    }
  }, {
    path: "school",
    name: "校级项目",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/TeacherSide/SchoolForm"));
      });
    }
  }, {
    path: "mine",
    name: "获奖记录",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Mine"));
      });
    }
  }, {
    path: "mine-paper",
    name: "成果记录",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Mine-Paper"));
      });
    }
  }, {
    path: "mine-subject",
    name: "著作记录",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Mine-Subject"));
      });
    }
  }, {
    path: "password",
    name: "系统设置",
    // which is lazy-loaded when the route is visited.
    // 使用时导入，类似懒加载
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Password"));
      });
    }
  }, {
    path: "query-stu",
    name: "管理学生获奖",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/QueryStu"));
      });
    }
  }, {
    path: "query-tea",
    name: "管理教师获奖",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/QueryTea"));
      });
    }
  }, {
    path: "query-paper",
    name: "管理成果记录",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/QueryPaper"));
      });
    }
  }, {
    path: "query-subject",
    name: "管理科研项目",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/QuerySubject"));
      });
    }
  }, {
    path: "award-review",
    name: "奖项审核",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Review"));
      });
    }
  }, {
    path: "record-review",
    name: "成果审核",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Review-Record"));
      });
    }
  }, {
    path: "subject-review",
    name: "项目审核",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/TeacherSide/Review-Subject"));
      });
    }
  }, {
    path: "log",
    name: "查看日志",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Log"));
      });
    }
  }, {
    path: "award",
    name: "奖项管理",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Award"));
      });
    }
  }, {
    path: "manage-stu",
    name: "学生管理",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ManageStu"));
      });
    }
  }, {
    path: "manage-tea",
    name: "教师管理",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ManageTea"));
      });
    }
  }, {
    path: "manage-class",
    name: "班级管理",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ManageClass"));
      });
    }
  }, {
    path: "import-award",
    name: "奖项导入",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ImportAward"));
      });
    }
  }, {
    path: "import-stu",
    name: "学生导入",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ImportStu"));
      });
    }
  }, {
    path: "import-tea",
    name: "教师导入",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/ImportTea"));
      });
    }
  }, {
    path: "/403",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/403.vue"));
      });
    }
  }]
}, {
  path: "/404",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/404.vue"));
    });
  }
}, {
  path: "*",
  redirect: "/404"
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
}); // 全局前置守卫

router.beforeEach(function (to, from, next) {
  if (to.path !== "/") {
    // //closeDebug console.log("登陆状态",store.state.ifLogin)
    // next();
    var ifLogin = false;
    (0, _index.checkState)().then(function (res) {
      //closeDebug console.log("登陆状态检测请求成功", res);
      ifLogin = true;
    })["catch"](function (err) {//closeDebug console.log("登陆状态检测请求失败", err);
    })["finally"](function () {
      if (!ifLogin) {
        router.push({
          name: "LoginScreen"
        });

        _elementUi.Message.error({
          message: "未登陆或登陆信息已过期，请重新登陆"
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});
var _default = router;
exports["default"] = _default;