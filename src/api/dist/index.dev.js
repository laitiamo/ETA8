"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAssistant = exports.delClass = exports.getInsClassList = exports.setRole = exports.updateTea = exports.delTea = exports.resetTeaPass = exports.getTeaList = exports.initManageClass = exports.initManageTea = exports.updateStu = exports.delStu = exports.resetStuPass = exports.getStuList = exports.initManageStu = exports.addAward = exports.delAward = exports.updateAwardName = exports.getAllAwardList = exports.getInformList = exports.delInform = exports.addInform = exports.getAwardShowList = exports.delAwardShow = exports.addAwardShow = exports.notPassSubject = exports.passSubject = exports.notPassRecord = exports.passRecord = exports.notPassAward = exports.passAward = exports.getReviewSubjectList = exports.getReviewRecordList = exports.getReviewAwardList = exports.initRecordReview = exports.initReview = exports.delTeaSubject = exports.delTeaPaper = exports.delTeaAward = exports.exportTeaSubjectZIP = exports.exportTeaPaperZIP = exports.exportTeaAwardZIP = exports.exportTeaSubjectXLS = exports.exportTeaPaperXLS = exports.exportTeaAwardXLS = exports.getTeaSubjectList = exports.getTeaPaperList = exports.getTeaAwardList = exports.getPerSubjectList = exports.getSubjectList = exports.initQuerySubject = exports.initQueryPaper = exports.initQueryTea = exports.getNewClassList = exports.delLog = exports.getLogList = exports.initQueryLog = exports.updateAwardImg = exports.delStuAward = exports.delMineAward = exports.getClassList = exports.exportStuAwardZIP = exports.exportStuAwardXLS = exports.getStuAwardList = exports.initQueryStu = exports.updatePass = exports.uploadAward = exports.uploadSponsored = exports.uploadHorizon = exports.uploadSchool = exports.SubjectSelect = exports.getTeacherPaperList = exports.getAwardList = exports.uploadPaper = exports.getTeacherList = exports.getPaperList = exports.initSponsored = exports.initHorizon = exports.initSchool = exports.initSubject = exports.getSourceList = exports.getFirstSubjectList = exports.getTypeList = exports.QueryEconomicList = exports.QuerySecondList = exports.getRankList = exports.getSubjectDetail = exports.getPaperDetail = exports.getTeaDetail = exports.getStuDetail = exports.getMySubjectList = exports.getMyPaperList = exports.getMyAwardList = exports.initDetail = exports.initHome = exports.getImage = exports.logout = exports.checkState = exports.getCaptcha = exports.login = void 0;
exports.uploadStuTemplate = exports.getStuTemplate = exports.uploadTeaTemplate = exports.getTeaTemplate = exports.uploadAwardTemplate = exports.getAwardTemplate = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _http = require("./http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable*/
// =====================================================================> 登陆页 API

/**
 * 登录（POST）
 * 需要传入三个参数
 * username：用户名
 * password：密码
 * captcha：验证码
 * @param {URLSearchParams} params
 * @returns
 */
var login = function login(params) {
  return (0, _http.post)("login", params);
};
/**
 * 获取验证码（GET）
 * 需要传入一个随机数
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则验证码会失效
 * @param {number} v
 * @returns
 */


exports.login = login;

var getCaptcha = function getCaptcha(v) {
  return (0, _http.getImg)("captcha?v = ".concat(v));
}; // =====================================================================> 全局 API

/**
 * 检查登陆状态（GET）
 * @returns
 */


exports.getCaptcha = getCaptcha;

var checkState = function checkState() {
  return (0, _http.get)("eta8/mine");
};
/**
 * 退出登录（POST）
 * @returns
 */


exports.checkState = checkState;

var logout = function logout() {
  return (0, _http.get)("eta8/logout");
};
/**
 * 获取图片（GET）
 * 需要传入url
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则图片会失效
 * @param {string} path
 * @returns
 */


exports.logout = logout;

var getImage = function getImage(path) {
  return (0, _http.getImg)("".concat(path));
}; // =====================================================================> 首页 API

/**
 * 用于首页初始化（GET)
 * 返回值说明:
 * image: 首页轮播图
 * inform: 广播消息
 * l_notice:  公告
 * l_number:  个人奖状数
 * l_document: 总奖项数
 * l_student: 学生奖项数
 * l_teacher: 教师奖项数
 * l_international,//学生国际奖人数
 * l_nation,//学生国奖数
 * l_province,//学生省奖数
 * l_school,//学生校奖数
 * l_name: 用户姓名
 * l_username: 用户编号
 * l_role: 用户角色
 * l_roleId: 角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生]
 * 如果是学生的话还有以下参数
 * l_grade: 年级
 * l_major: 专业
 * l_class: 班级
 * @returns
 */


exports.getImage = getImage;

var initHome = function initHome() {
  return (0, _http.get)("eta8/home");
}; // =====================================================================> 个人信息 API

/**
 * 用于首页初始化（GET)
 * 返回值说明:
 * image: 首页轮播图
 * inform: 广播消息
 * l_notice:  公告
 * l_number:  个人奖状数
 * l_document: 总奖项数
 * l_student: 学生奖项数
 * l_teacher: 教师奖项数
 * l_international,//学生国际奖人数
 * l_nation,//学生国奖数
 * l_province,//学生省奖数
 * l_school,//学生校奖数
 * l_name: 用户姓名
 * l_username: 用户编号
 * l_role: 用户角色
 * l_roleId: 角色ID  [1:系统管理员 2:院系领导 3:辅导员 4:任课教师 5:学生]
 * 如果是学生的话还有以下参数
 * l_grade: 年级
 * l_major: 专业
 * l_class: 班级
 * @returns
 */


exports.initHome = initHome;

var initDetail = function initDetail() {
  return (0, _http.get)("eta8/home/detail");
}; // =====================================================================> 获奖记录页 API

/**
 * 获取个人奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.initDetail = initDetail;

var getMyAwardList = function getMyAwardList(params) {
  return (0, _http.get)("eta8/mine/list", params);
};
/**
 * 获取个人奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.getMyAwardList = getMyAwardList;

var getMyPaperList = function getMyPaperList(params) {
  return (0, _http.get)("eta8/mine/listpaper", params);
};
/**
 * 获取个人项目列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.getMyPaperList = getMyPaperList;

var getMySubjectList = function getMySubjectList(params) {
  return (0, _http.get)("eta8/mine/listsubject", params);
};
/**
 * 获取学生个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getMySubjectList = getMySubjectList;

var getStuDetail = function getStuDetail(params) {
  return (0, _http.get)("eta8/detail-stu", params);
};
/**
 * 获取教师个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getStuDetail = getStuDetail;

var getTeaDetail = function getTeaDetail(params) {
  return (0, _http.get)("eta8/detail-tea", params);
};
/**
 * 获取教师论文详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTeaDetail = getTeaDetail;

var getPaperDetail = function getPaperDetail(params) {
  return (0, _http.get)("eta8/detail-paper", params);
};
/**
 * 获取教师论文详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getPaperDetail = getPaperDetail;

var getSubjectDetail = function getSubjectDetail(params) {
  return (0, _http.get)("eta8/detail-subject", params);
}; // =====================================================================> 奖项上传页 API

/**
 * 获取奖项等级列表
 * @returns
 */


exports.getSubjectDetail = getSubjectDetail;

var getRankList = function getRankList() {
  return (0, _http.get)("eta8/upload");
};
/**
 * 获取国民经济和社会服务行业二级目录列表
 * @returns
 */


exports.getRankList = getRankList;

var QuerySecondList = function QuerySecondList(params) {
  return (0, _http.get)("eta8/subject/listSecond", params);
};
/**
 * 获取国民经济列表三级列表
 * @returns
 */


exports.QuerySecondList = QuerySecondList;

var QueryEconomicList = function QueryEconomicList(params) {
  return (0, _http.get)("eta8/subject/listEconomic", params);
};
/**
 * 获取成果等级列表
 * @returns
 */


exports.QueryEconomicList = QueryEconomicList;

var getTypeList = function getTypeList(params) {
  return (0, _http.get)("eta8/query-paper/listType", params);
};
/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTypeList = getTypeList;

var getFirstSubjectList = function getFirstSubjectList(params) {
  return (0, _http.get)("eta8/subject/listFirstSubject", params);
};
/**
 * 获取项目资源列表
 * @returns
 */


exports.getFirstSubjectList = getFirstSubjectList;

var getSourceList = function getSourceList(params) {
  return (0, _http.get)("eta8/subject/listSource", params);
};
/**
 * 获取科研项目基础信息列表
 * @returns
 */


exports.getSourceList = getSourceList;

var initSubject = function initSubject() {
  return (0, _http.get)("eta8/subject");
};
/**
 * 获取校级项目列表
 * @returns
 */


exports.initSubject = initSubject;

var initSchool = function initSchool() {
  return (0, _http.get)("eta8/subject/initSchool");
};
/**
 * 获取横向项目列表
 * @returns
 */


exports.initSchool = initSchool;

var initHorizon = function initHorizon() {
  return (0, _http.get)("eta8/subject/initHorizon");
};
/**
 * 获取纵向项目列表
 * @returns
 */


exports.initHorizon = initHorizon;

var initSponsored = function initSponsored() {
  return (0, _http.get)("eta8/subject/initSponsored");
};
/**
 * 获取成果等级列表
 * @returns
 */


exports.initSponsored = initSponsored;

var getPaperList = function getPaperList(params) {
  return (0, _http.get)("eta8/record/listType", params);
};
/**
 * 获取教师列表
 * @returns
 */


exports.getPaperList = getPaperList;

var getTeacherList = function getTeacherList() {
  return (0, _http.get)("eta8/record/listTeacher");
};
/**
 * 上传成果（POST）
 * @param {FormData} data
 * @returns
 */


exports.getTeacherList = getTeacherList;

var uploadPaper = function uploadPaper(data) {
  return (0, _http.postFile)("eta8/record/uploadpaper", data);
};
/**
 * 获取可上传奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.uploadPaper = uploadPaper;

var getAwardList = function getAwardList(params) {
  return (0, _http.get)("eta8/upload/listAward", params);
};
/**
 * 获取可上传成果列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.getAwardList = getAwardList;

var getTeacherPaperList = function getTeacherPaperList(params) {
  return (0, _http.get)("eta8/record/listPaper", params);
};
/**
 * 获取可上传项目列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTeacherPaperList = getTeacherPaperList;

var SubjectSelect = function SubjectSelect(params) {
  return (0, _http.get)("eta8/subject/listSubject", params);
};
/**
 * 上传校级项目（POST）
 * @param {FormData} data
 * @returns
 */


exports.SubjectSelect = SubjectSelect;

var uploadSchool = function uploadSchool(data) {
  return (0, _http.postFile)("eta8/subject/uploadSchool", data);
};
/**
 * 上传横向项目（POST）
 * @param {FormData} data
 * @returns
 */


exports.uploadSchool = uploadSchool;

var uploadHorizon = function uploadHorizon(data) {
  return (0, _http.postFile)("eta8/subject/uploadHorizon", data);
};
/**
* 上传横向项目（POST）
* @param {FormData} data
* @returns
*/


exports.uploadHorizon = uploadHorizon;

var uploadSponsored = function uploadSponsored(data) {
  return (0, _http.postFile)("eta8/subject/uploadSponsored", data);
};
/**
 * 上传奖项（POST）
 * 需传入的参数
 * awardId: 奖项ID
 * awardName: 奖项名
 * rankId: 奖项等级ID
 * awardTime: 2021-02-04 时间
 * awardPlace: 获奖级别
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */


exports.uploadSponsored = uploadSponsored;

var uploadAward = function uploadAward(data) {
  return (0, _http.postFile)("eta8/upload/upload", data);
}; // =====================================================================> 系统设置页 API

/**
 * 修改密码（POST）
 * 需要传入三个参数
 * old-pass：旧密码
 * new-pass：新密码
 * new-pass-v：确认密码
 * captcha: 验证码
 * @param {URLSearchParams} params
 * @returns
 */


exports.uploadAward = uploadAward;

var updatePass = function updatePass(params) {
  return (0, _http.post)("eta8/password/update", params);
}; // =====================================================================> 管理学生获奖 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */


exports.updatePass = updatePass;

var initQueryStu = function initQueryStu() {
  return (0, _http.get)("eta8/query-stu");
};
/**
 * 获取学生奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * rankId: 获奖等级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.initQueryStu = initQueryStu;

var getStuAwardList = function getStuAwardList(params) {
  return (0, _http.get)("eta8/query-stu/list", params);
};
/**
 * 导出学生奖项表格文件（GET）
 * 需传入的参数
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * rankId: 获奖等级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getStuAwardList = getStuAwardList;

var exportStuAwardXLS = function exportStuAwardXLS(params) {
  return (0, _http.getFile)("eta8/query-stu/exportXLS", params);
};
/**
 * 导出学生奖项图片压缩包（GET）
 * 需传入的参数
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * rankId: 获奖等级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportStuAwardXLS = exportStuAwardXLS;

var exportStuAwardZIP = function exportStuAwardZIP(params) {
  return (0, _http.getFile)("eta8/query-stu/exportZIP", params);
};
/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportStuAwardZIP = exportStuAwardZIP;

var getClassList = function getClassList(params) {
  return (0, _http.get)("eta8/query-stu/listClass", params);
};
/**
 * 删除自己奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.getClassList = getClassList;

var delMineAward = function delMineAward(params) {
  return (0, _http.get)("eta8/mine/del", params);
};
/**
 * 删除学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.delMineAward = delMineAward;

var delStuAward = function delStuAward(params) {
  return (0, _http.get)("eta8/query-stu/del", params);
};
/**
 * 更新奖项图片（POST）
 * 需传入的参数
 * id: 项目ID
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */


exports.delStuAward = delStuAward;

var updateAwardImg = function updateAwardImg(data) {
  return (0, _http.postFile)("eta8/query-stu/updateImg", data);
}; // =====================================================================> 管理操作日志

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */


exports.updateAwardImg = updateAwardImg;

var initQueryLog = function initQueryLog() {
  return (0, _http.get)("eta8/log");
};
/**
 * 获取教师奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.initQueryLog = initQueryLog;

var getLogList = function getLogList(params) {
  return (0, _http.get)("eta8/log/list", params);
};
/**
 * 删除日志（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.getLogList = getLogList;

var delLog = function delLog(params) {
  return (0, _http.get)("eta8/log/delete", params);
}; // =====================================================================> 管理班级 API

/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.delLog = delLog;

var getNewClassList = function getNewClassList(params) {
  return (0, _http.get)("eta8/class-management/listClass", params);
}; // =====================================================================> 管理教师获奖 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */


exports.getNewClassList = getNewClassList;

var initQueryTea = function initQueryTea() {
  return (0, _http.get)("eta8/query-tea");
}; // =====================================================================> 管理教师论文 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */


exports.initQueryTea = initQueryTea;

var initQueryPaper = function initQueryPaper() {
  return (0, _http.get)("eta8/query-paper");
}; // =====================================================================> 管理教师项目 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */


exports.initQueryPaper = initQueryPaper;

var initQuerySubject = function initQuerySubject() {
  return (0, _http.get)("eta8/query-subject");
};
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */


exports.initQuerySubject = initQuerySubject;

var getSubjectList = function getSubjectList() {
  return (0, _http.get)("eta8/mine/getSubjectList");
};
/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */


exports.getSubjectList = getSubjectList;

var getPerSubjectList = function getPerSubjectList(params) {
  return (0, _http.get)("eta8/mine/listPerSubject", params);
};
/**
 * 获取教师奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getPerSubjectList = getPerSubjectList;

var getTeaAwardList = function getTeaAwardList(params) {
  return (0, _http.get)("eta8/query-tea/list", params);
};
/**
 * 获取教师奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTeaAwardList = getTeaAwardList;

var getTeaPaperList = function getTeaPaperList(params) {
  return (0, _http.get)("eta8/query-paper/list", params);
};
/**
 * 获取教师项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTeaPaperList = getTeaPaperList;

var getTeaSubjectList = function getTeaSubjectList(params) {
  return (0, _http.get)("eta8/query-subject/list", params);
};
/**
 * 导出教师奖项表格文件（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getTeaSubjectList = getTeaSubjectList;

var exportTeaAwardXLS = function exportTeaAwardXLS(params) {
  return (0, _http.getFile)("eta8/query-tea/exportXLS", params);
};
/**
 * 导出教师论文表格文件（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaAwardXLS = exportTeaAwardXLS;

var exportTeaPaperXLS = function exportTeaPaperXLS(params) {
  return (0, _http.getFile)("eta8/query-paper/exportXLS", params);
};
/**
 * 导出教师项目表格文件（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaPaperXLS = exportTeaPaperXLS;

var exportTeaSubjectXLS = function exportTeaSubjectXLS(params) {
  return (0, _http.getFile)("eta8/query-subject/exportXLS", params);
};
/**
 * 导出教师奖项图片压缩包（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaSubjectXLS = exportTeaSubjectXLS;

var exportTeaAwardZIP = function exportTeaAwardZIP(params) {
  return (0, _http.getFile)("eta8/query-tea/exportZIP", params);
};
/**
 * 导出教师论文图片压缩包（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaAwardZIP = exportTeaAwardZIP;

var exportTeaPaperZIP = function exportTeaPaperZIP(params) {
  return (0, _http.getFile)("eta8/query-paper/exportZIP", params);
};
/**
 * 导出教师项目图片压缩包（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaPaperZIP = exportTeaPaperZIP;

var exportTeaSubjectZIP = function exportTeaSubjectZIP(params) {
  return (0, _http.getFile)("eta8/query-subject/exportZIP", params);
};
/**
 * 删除教师奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.exportTeaSubjectZIP = exportTeaSubjectZIP;

var delTeaAward = function delTeaAward(params) {
  return (0, _http.get)("eta8/query-tea/del", params);
};
/**
 * 删除教师论文（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.delTeaAward = delTeaAward;

var delTeaPaper = function delTeaPaper(params) {
  return (0, _http.get)("eta8/query-paper/del", params);
};
/**
 * 删除教师项目（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.delTeaPaper = delTeaPaper;

var delTeaSubject = function delTeaSubject(params) {
  return (0, _http.get)("eta8/query-subject/del", params);
}; // =====================================================================> 奖项审核页 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */


exports.delTeaSubject = delTeaSubject;

var initReview = function initReview() {
  return (0, _http.get)("eta8/review");
};
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * @returns
 */


exports.initReview = initReview;

var initRecordReview = function initRecordReview() {
  return (0, _http.get)("eta8/record-review");
};
/**
 * 获取未审核的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * rankId: 获奖等级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.initRecordReview = initRecordReview;

var getReviewAwardList = function getReviewAwardList(params) {
  return (0, _http.get)("eta8/review/list", params);
};
/**
 * 获取未审核的成果列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.getReviewAwardList = getReviewAwardList;

var getReviewRecordList = function getReviewRecordList(params) {
  return (0, _http.get)("eta8/record-review/listPaper", params);
};
/**
* 获取未审核的项目列表（GET）
* 需传入的参数
* limit: 每页的记录条数
* page: 当前页码
* rankId: 获奖等级id（可选）
* keyUsername: 学号（可选）
* keyName: 姓名（可选）
* keyAwardName: 奖项名（可选）
* @param {URLSearchParams} params
* @returns
*/


exports.getReviewRecordList = getReviewRecordList;

var getReviewSubjectList = function getReviewSubjectList(params) {
  return (0, _http.get)("eta8/record-review/listSubject", params);
};
/**
 * 审核通过学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.getReviewSubjectList = getReviewSubjectList;

var passAward = function passAward(params) {
  return (0, _http.get)("eta8/review/pass", params);
};
/**
 * 审核驳回学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.passAward = passAward;

var notPassAward = function notPassAward(params) {
  return (0, _http.get)("eta8/review/notPass", params);
};
/**
 * 审核通过教师成果（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.notPassAward = notPassAward;

var passRecord = function passRecord(params) {
  return (0, _http.get)("eta8/record-review/passRecord", params);
};
/**
 * 审核驳回学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.passRecord = passRecord;

var notPassRecord = function notPassRecord(params) {
  return (0, _http.get)("eta8/record-review/notPassRecord", params);
};
/**
* 审核通过教师项目（GET）
* 需传入的参数
* id：奖项id
* @param {URLSearchParams} params
* @returns
*/


exports.notPassRecord = notPassRecord;

var passSubject = function passSubject(params) {
  return (0, _http.get)("eta8/record-review/passSubject", params);
};
/**
 * 审核驳回学生项目（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.passSubject = passSubject;

var notPassSubject = function notPassSubject(params) {
  return (0, _http.get)("eta8/record-review/notPassSubject", params);
}; // =====================================================================> 奖项展示组件 API

/**
 * 添加展示的奖项（POST）
 * 需要传入的参数
 * imageurl: 图片url 「例：/upload/student/16软件工程1班/16软件工程1班_31216236王曹冲_北大核心_2021_02_23_12_18_34_0.jpeg
 * imagecontent: 图片简述
 * @param {URLSearchParams} params
 * @returns
 */


exports.notPassSubject = notPassSubject;

var addAwardShow = function addAwardShow(params) {
  return (0, _http.post)("eta8/home/imageadd", params);
};
/**
 * 删除展示的奖项（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.addAwardShow = addAwardShow;

var delAwardShow = function delAwardShow(params) {
  return (0, _http.post)("eta8/home/imagedel", params);
};
/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.delAwardShow = delAwardShow;

var getAwardShowList = function getAwardShowList(params) {
  return (0, _http.get)("eta8/home/imagelist", params);
}; // =====================================================================> 公告组件 API

/**
 * 添加公告（POST）
 * 需要传入的参数
 * title: 标题
 * content: 内容
 * @param {URLSearchParams} params
 * @returns
 */


exports.getAwardShowList = getAwardShowList;

var addInform = function addInform(params) {
  return (0, _http.post)("eta8/home/informadd", params);
};
/**
 * 删除公告（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */


exports.addInform = addInform;

var delInform = function delInform(params) {
  return (0, _http.post)("eta8/home/informdel", params);
};
/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */


exports.delInform = delInform;

var getInformList = function getInformList(params) {
  return (0, _http.get)("eta8/home/informlist", params);
}; // =====================================================================> 奖项管理 API

/**
 * 获取全部奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * type: 0：全部 1:学生 2:教师 奖项类型
 * key: 关键词
 * order: desc
 * @param {URLSearchParams} params
 * @returns
 */


exports.getInformList = getInformList;

var getAllAwardList = function getAllAwardList(params) {
  return (0, _http.get)("eta8/award/list", params);
};
/**
 * 更新奖项名称（GET）
 * 需传入的参数
 * id: 奖项的ID
 * newName: 新名称
 * @param {URLSearchParams} params
 * @returns
 */


exports.getAllAwardList = getAllAwardList;

var updateAwardName = function updateAwardName(params) {
  return (0, _http.post)("eta8/award/update", params);
};
/**
 * 删除奖项（POST）
 * 需传入的参数
 * ids: 奖项的ID 「List」
 * @param {URLSearchParams} params
 * @returns
 */


exports.updateAwardName = updateAwardName;

var delAward = function delAward(params) {
  return (0, _http.post)("eta8/award/delete", params);
};
/**
 * 添加奖项（POST）
 * 需传入的参数
 * name: 奖项名
 * type: 奖项类型「1:学生奖项 2:教师奖项」
 * @param {URLSearchParams} params
 * @returns
 */


exports.delAward = delAward;

var addAward = function addAward(params) {
  return (0, _http.post)("eta8/award-add/add", params);
}; // =====================================================================> 学生信息管理 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * @returns
 */


exports.addAward = addAward;

var initManageStu = function initManageStu() {
  return (0, _http.get)("eta8/student-management");
};
/**
 * 获取学生列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * keyUsername: 学号（可选）
 * keyName: 姓名（可选）
 * order: 排序方式（可选）
 * field: 排序字段（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.initManageStu = initManageStu;

var getStuList = function getStuList(params) {
  return (0, _http.get)("eta8/student-management/list", params);
};
/**
 * 重置密码
 * 请求方法: POST
 * ids[]: 2636
 */


exports.getStuList = getStuList;

var resetStuPass = function resetStuPass(params) {
  return (0, _http.post)("eta8/student-management/reset", params);
};
/**
 * 删除学生
 * 请求方法: POST
 * studentNos[]: 69119132
 */


exports.resetStuPass = resetStuPass;

var delStu = function delStu(params) {
  return (0, _http.post)("eta8/student-management/delete", params);
};
/**
 * 更新学生信息
 * 请求方法: POST
 * modifiedField: majorName
 * stuNo: 69119132
 * newName: 刘童
 * newGradeId: 2019
 * newMajorName: 电子科学与技术4
 * newClassNo: 1
 */


exports.delStu = delStu;

var updateStu = function updateStu(params) {
  return (0, _http.post)("eta8/student-management/update", params);
}; // =====================================================================> 教师信息管理 API

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */


exports.updateStu = updateStu;

var initManageTea = function initManageTea() {
  return (0, _http.get)("eta8/teacher-management");
};
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */


exports.initManageTea = initManageTea;

var initManageClass = function initManageClass() {
  return (0, _http.get)("eta8/class-management");
};
/**
 * 获取教职工列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * order: 排序方式（可选）
 * field: 排序字段（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.initManageClass = initManageClass;

var getTeaList = function getTeaList(params) {
  return (0, _http.get)("eta8/teacher-management/list", params);
};
/**重置密码
 *
 * 请求 URL: http://localhost/eta8/teacher-management/reset
 * 请求方法: POST
 * ids[]: 2636
 */


exports.getTeaList = getTeaList;

var resetTeaPass = function resetTeaPass(params) {
  return (0, _http.post)("eta8/teacher-management/reset", params);
};
/**
 * 删除教师
 * 请求方法: POST
 * teacherNos[]: 69119132
 */


exports.resetTeaPass = resetTeaPass;

var delTea = function delTea(params) {
  return (0, _http.post)("eta8/teacher-management/delete", params);
};
/**更新教师信息
 * 请求方法: POST
 * username: 999100236
 * newName: 凌明1
 */


exports.delTea = delTea;

var updateTea = function updateTea(params) {
  return (0, _http.post)("eta8/teacher-management/update", params);
};
/**
 * 设置辅导员
 * 请求方法: POST
 * ids[]: 63
 * classIds[]: 140
 * classIds[]: 141
 * classIds[]: 142
 * classIds[]: 143
 * classIds[]: 144
 * usernames[]: 999100235
 * roleId: 3
 * oldroleIds[]: 3
 * 设置其他角色
 * ids[]: 91
 * usernames[]: 999100236
 * roleId: 2
 * oldroleIds[]: 3
 */


exports.updateTea = updateTea;

var setRole = function setRole(params) {
  return (0, _http.post)("eta8/teacher-management/setRole", params);
}; // =====================================================================> （新）班级信息管理 API

/**
 * 获取辅导员班级列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * gradeId: 年级id（可选）
 * majorId: 专业id（可选）
 * classId: 班级id（可选）
 * classNo: 班级号码（可选）
 * instructorId: 辅导员id（可选）
 * teaName：辅导员名字（可选）
 * className：班级全名（可选）
 * order: 排序方式（可选）
 * field: 排序字段（可选）
 * @param {URLSearchParams} params
 * @returns
 */


exports.setRole = setRole;

var getInsClassList = function getInsClassList(params) {
  return (0, _http.get)("eta8/class-management/list", params);
};
/**
 * 解除辅导员与班级的联系
 * 请求方法: POST
 * classIds[]: 69119132
 */


exports.getInsClassList = getInsClassList;

var delClass = function delClass(params) {
  return (0, _http.post)("eta8/class-management/delete", params);
};
/**
 * （新）设置学生助理
 * 请求方法: POST
 * ids[]: 63
 * roleId: 6
 * oldroleIds[]: 5
 * 设置学生
 * ids[]: 3741
 * usernames[]: 10419832
 * roleId: 6
 * oldroleIds[]: 5
 * classIds[]:232
 */


exports.delClass = delClass;

var setAssistant = function setAssistant(params) {
  return (0, _http.post)("eta8/student-management/setRole", params);
}; // =====================================================================> 奖项导入页 API

/**
 * 下载奖项模板
 * @returns
 */


exports.setAssistant = setAssistant;

var getAwardTemplate = function getAwardTemplate() {
  return (0, _http.getFile)("eta8/import-award/download");
};
/**
 * 上传奖项（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */


exports.getAwardTemplate = getAwardTemplate;

var uploadAwardTemplate = function uploadAwardTemplate(data) {
  return (0, _http.postFile)("eta8/import-award/upload", data);
}; // =====================================================================> 教师导入页 API

/**
 * 下载教师模板
 * @returns
 */


exports.uploadAwardTemplate = uploadAwardTemplate;

var getTeaTemplate = function getTeaTemplate() {
  return (0, _http.getFile)("eta8/import-tea/download");
};
/**
 * 上传教师（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */


exports.getTeaTemplate = getTeaTemplate;

var uploadTeaTemplate = function uploadTeaTemplate(data) {
  return (0, _http.postFile)("eta8/import-tea/upload", data);
}; // =====================================================================> 学生导入页 API

/**
 * 下载学生模板
 * @returns
 */


exports.uploadTeaTemplate = uploadTeaTemplate;

var getStuTemplate = function getStuTemplate() {
  return (0, _http.getFile)("eta8/import-stu/download");
};
/**
 * 上传学生（POST）
 * 需传入的参数
 * class: 班级号「classId」
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */


exports.getStuTemplate = getStuTemplate;

var uploadStuTemplate = function uploadStuTemplate(data) {
  return (0, _http.postFile)("eta8/import-stu/upload", data);
};

exports.uploadStuTemplate = uploadStuTemplate;