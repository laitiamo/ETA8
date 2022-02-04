"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  state: {
    ifLogin: false,
    //是否已登陆
    name: "",
    //用户姓名
    username: "",
    //用户编号
    role: "",
    //用户角色
    roleId: "",
    //角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生 6:学生助理]
    reviewer: "",
    //审核人
    //如果是学生的话还有以下参数
    grade: "",
    //年级
    major: "",
    //专业
    l_genderId: "",
    //性别
    l_class: "" //班级

  },
  mutations: {
    //用户信息初始化设置
    initUserInfo: function initUserInfo(state, info) {
      //closeDebug console.log('当前角色设为：'+info.roleId)
      state.name = info.name;
      state.username = info.username;
      state.role = info.role;
      state.roleId = info.roleId;
      state.l_genderId = info.l_genderId;

      if (info.roleId === 5 || info.roleId === 6) {
        state.grade = info.grade;
        state.major = info.major;
        state.l_class = info.l_class;
      } else {
        state.grade = null;
        state.major = null;
        state.l_class = null;
      }
    },
    //设置登陆状态「未启用」
    setLoginState: function setLoginState(state, LoginState) {
      //closeDebug console.log('当前登陆状态设为：',LoginState)
      state.ifLogin = LoginState;
    }
  },
  getters: {
    ifLogin: function ifLogin(state) {
      return state.ifLogin;
    },
    //是否已登陆
    name: function name(state) {
      return state.name;
    },
    username: function username(state) {
      return state.username;
    },
    //用户编号
    role: function role(state) {
      return state.role;
    },
    //用户角色
    roleId: function roleId(state) {
      return state.roleId;
    },
    //角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生 6:学生助理]
    reviewer: function reviewer(state) {
      return state.name;
    },
    //审核人
    //如果是学生的话还有以下参数
    grade: function grade(state) {
      return state.grade;
    },
    //年级
    major: function major(state) {
      return state.major;
    },
    //专业
    l_genderId: function l_genderId(state) {
      return state.l_genderId;
    },
    //性别
    l_class: function l_class(state) {
      return state.l_class;
    } //班级

  },
  actions: {},
  modules: {}
});
var _default = store;
exports["default"] = _default;