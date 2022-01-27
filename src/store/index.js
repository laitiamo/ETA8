import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    ifLogin: false, //是否已登陆
    name: "", //用户姓名
    username: "", //用户编号
    role: "", //用户角色
    roleId: "", //角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生 6:学生助理]
    reviewer:"",//审核人
    //如果是学生的话还有以下参数
    grade: "", //年级
    major: "", //专业
    l_genderId:"",//性别
    l_class: "", //班级
  },
  mutations: {
    //用户信息初始化设置
    initUserInfo: (state, info) => {
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
    setLoginState: (state, LoginState) => {
      //closeDebug console.log('当前登陆状态设为：',LoginState)
      state.ifLogin = LoginState;
    },
  },
  getters: {
    ifLogin: (state) => state.ifLogin, //是否已登陆
    name: (state) => state.name,
    username: (state) => state.username, //用户编号
    role: (state) => state.role, //用户角色
    roleId: (state) => state.roleId, //角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生 6:学生助理]
    reviewer: (state) => state.name,//审核人
    //如果是学生的话还有以下参数
    grade: (state) => state.grade, //年级
    major: (state) => state.major, //专业
    l_genderId:(state) => state.l_genderId,//性别
    l_class: (state) => state.l_class, //班级
  },
  actions: {},
  modules: {},
});

export default store;
