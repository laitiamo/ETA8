/* eslint-disable*/
import axios from "axios";
import { get, post, getImg, getFile, postFile } from "./http";

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
export const login = (params) => post(`login`, params);

/**
 * 获取验证码（GET）
 * 需要传入一个随机数
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则验证码会失效
 * @param {number} v
 * @returns
 */
export const getCaptcha = (v) => getImg(`captcha?v = ${v}`);

// =====================================================================> 全局 API
/**
 * 检查登陆状态（GET）
 * @returns
 */
export const checkState = () => get(`eta8/mine`);

/**
 * 退出登录（POST）
 * @returns
 */
export const logout = () => get(`eta8/logout`);

/**
 * 获取图片（GET）
 * 需要传入url
 * 返回blob数据，需手动渲染
 * 注意检查cookie是否可以跨域，否则图片会失效
 * @param {string} path
 * @returns
 */
export const getImage = (path) => getImg(`${path}`);

// =====================================================================> 首页 API
/**
 * 用于首页初始化（GET)
 * 返回值说明:
 * image: 首页轮播图
 * inform: 广播消息
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
export const initHome = () => get(`eta8/home`);

// =====================================================================> 个人信息 API
/**
 * 用于首页初始化（GET)
 * 返回值说明:
 * image: 首页轮播图
 * inform: 广播消息
 * l_number:  个人奖状数
 * l_document: 总奖项数
 * l_student: 学生奖项数
 * l_teacher: 教师奖项数
 * l_international,//学生国际奖人数
 * l_nation,//学生国奖数
 * l_province,//学生省奖数
 * l_school,//学生校奖数
 * @returns
 */
export const initDetail = () => get(`eta8/home/detail`);

// =====================================================================> 获奖记录页 API
/**
 * 获取个人奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMyAwardList = (params) => get(`eta8/mine/list`, params);

/**
 * 获取学生个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getStuDetail = (params) => get(`eta8/detail-stu`, params);

/**
 * 获取教师个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeaDetail = (params) => get(`eta8/detail-tea`, params);

// =====================================================================> 成果记录页 API
/**
 * 获取个人成果列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMyPaperList = (params) => get(`eta8/mine/listPaper`, params);

/**
 * 获取教师成果详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getPaperDetail = (params) => get(`eta8/detail-paper`, params);

/**
 * 导出教师项目文件（GET）
 * 需传入的参数
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaPaperPDF = (params) =>
  getFile(`eta8/detail-paper/exportPDF`, params);

// =====================================================================> 项目记录页 API
/**
 * 获取个人项目列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMySubjectList = (params) =>
  get(`eta8/mine/listsubject`, params);

/**
 * 获取项目已绑定的成果列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getSubjectPaperList = (params) =>
  get(`eta8/detail-subject/paperlist`, params);

/**
 * 更新项目成果列表（删除）
 * @returns
 */
export const deleteSubjectPaper = (params) =>
  get(`eta8/detail-subject/deletePaper`, params);

/**
 * 获取教师项目详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getSubjectDetail = (params) => get(`eta8/detail-subject`, params);

/**
 * 更新项目成果列表（增加）
 * @returns
 */
export const updateSubjectPaper = (params) =>
  get(`eta8/detail-subject/updatePaper`, params);

/**
 * 申请结题
 * @returns
 */
export const ApplyFinishSubject = (params) =>
  get(`eta8/detail-subject/applyFinish`, params);

/**
 * 导出教师项目文件（GET）
 * 需传入的参数
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaSubjectPDF = (params) =>
  getFile(`eta8/detail-subject/exportPDF`, params);

// =====================================================================> 奖项上传页 API
/**
 * 获取奖项等级列表
 * @returns
 */
export const getRankList = () => get(`eta8/upload`);

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
export const uploadAward = (data) => postFile(`eta8/upload/upload`, data);

/**
 * 获取项目分类列表（GET）
 * 需传入的参数
 * BelongId: 所属学科ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getCategoryList = (params) =>
  get(`eta8/subject/listCategory`, params);

/**
 * 获取教师角色信息（GET）
 * 需传入的参数
 * userId: 所属学科ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeacherDetail = (params) => get(`eta8/subject/getRole`, params);

// =====================================================================> 项目上传页 API
/**
 * 获取科研项目基础信息列表
 * @returns
 */
export const initSubject = () => get(`eta8/subject`);

/**
 * 获取项目资源列表
 * @returns
 */
export const getSourceList = (params) => get(`eta8/subject/listSource`, params);

/**
 * 获取教师详细信息列表
 * @returns
 */
export const getTeacherList = () => get(`eta8/paper/listTeacher`);

/**
 * 获取成果等级列表
 * @returns
 */
export const getPaperList = (params) => get(`eta8/paper/listType`, params);

// =====================================================================> 横向目录页 API
/**
 * 初始化横向项目
 * @returns
 */
export const initHorizon = () => get(`eta8/subject/initHorizon`);

/**
 * 上传横向项目（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadHorizon = (data) =>
  postFile(`eta8/subject/uploadHorizon`, data);

/**
 * 获取横向项目分类二级目录列表
 * @returns
 */
export const QuerySecCategoryList = (params) =>
  get(`eta8/subject/listSecCategory`, params);

/**
 * 获取国民经济和社会服务行业二级目录列表
 * @returns
 */
export const QuerySecondList = (params) =>
  get(`eta8/subject/listSecond`, params);

/**
 * 获取国民经济列表三级列表
 * @returns
 */
export const QueryEconomicList = (params) =>
  get(`eta8/subject/listEconomic`, params);

/**
 * 获取合同类型二级目录列表
 * @returns
 */
export const QueryContractList = (params) =>
  get(`eta8/subject/listContract`, params);

/**
 * 获取买方地市
 * @returns
 */
export const QueryCityList = (params) => get(`eta8/subject/listCity`, params);

/**
 * 获取买方县区
 * @returns
 */
export const QueryCountyList = (params) =>
  get(`eta8/subject/listCounty`, params);

// =====================================================================> 纵向目录页 API
/**
 * 初始化纵向项目
 * @returns
 */
export const initSponsored = () => get(`eta8/subject/initSponsored`);

/**
 * 获取纵向项目一级学科二级目录列表（GET）
 * 需传入的参数
 * TypeId: 一级学科ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getSecTypeList = (params) =>
  get(`eta8/subject/listSecType`, params);

/**
 * 获取纵向项目一级学科三级目录列表（GET）
 * 需传入的参数
 * SecTypeId: 一级学科二级目录ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getThirdTypeList = (params) =>
  get(`eta8/subject/listThirdType`, params);

/**
 * 上传纵向项目（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadSponsored = (data) =>
  postFile(`eta8/subject/uploadSponsored`, data);

/**
 * 获取一级学科列表（GET）
 * 需传入的参数
 * BelongId: 所属学科ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getFirstSubjectList = (params) =>
  get(`eta8/subject/listFirstSubject`, params);

// =====================================================================> 校级目录页 API
/**
 * 初始化校级项目
 * @returns
 */
export const initSchool = () => get(`eta8/subject/initSchool`);

/**
 * 上传校级项目（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadSchool = (data) =>
  postFile(`eta8/subject/uploadSchool`, data);

/**
 * 获取可上传奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getAwardList = (params) => get(`eta8/upload/listAward`, params);

/**
 * 获取可上传成果列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeacherPaperList = (params) =>
  get(`eta8/paper/listPaper`, params);

/**
 * 获取个人项目列表（GET）
 * @returns
 */
export const listPerSubject = () => get(`eta8/paper/listPerSubject`);

/**
 * 获取可上传项目列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const SubjectSelect = (params) =>
  get(`eta8/subject/listSubject`, params);

// =====================================================================> 成果上传页 API
/**
 * 上传成果（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadPaper = (data) => postFile(`eta8/paper/uploadpaper`, data);

/**
 * 获取个人成果列表（GET）
 * @returns
 */
export const getPaperSelectList = () => get(`eta8/detail-subject/listPerPaper`);

/**
 * 上传中期检查报告（POST）
 * 需传入的参数
 * id: 项目ID
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadMidSubject = (data) =>
  postFile(`eta8/detail-subject/uploadMidSubject`, data);

/**
 * 申请项目变更
 * @param {FormData} data
 * @returns
 */
export const ApplyEdit = (data) =>
  postFile(`eta8/detail-subject/applyEdit`, data);

// =====================================================================> 系统设置页 API
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
export const updatePass = (params) => post(`eta8/password/update`, params);

// =====================================================================> 管理学生获奖 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */
export const initQueryStu = () => get(`eta8/query-stu`);

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
export const getStuAwardList = (params) => get(`eta8/query-stu/list`, params);

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
export const exportStuAwardXLS = (params) =>
  getFile(`eta8/query-stu/exportXLS`, params);

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
export const exportStuAwardZIP = (params) =>
  getFile(`eta8/query-stu/exportZIP`, params);

/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getClassList = (params) => get(`eta8/query-stu/listClass`, params);

/**
 * 删除自己奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delMineAward = (params) => get(`eta8/mine/delAward`, params);

/**
 * 删除学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delStuAward = (params) => get(`eta8/query-stu/del`, params);

/**
 * 更新奖项图片（POST）
 * 需传入的参数
 * id: 项目ID
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const updateAwardImg = (data) =>
  postFile(`eta8/query-stu/updateImg`, data);

// =====================================================================> 管理操作日志
/**
 * 初始化查询参数（GET）
 * @returns
 */
export const initQueryLog = () => get(`eta8/log`);

/**
 * 获取日志列表（GET）
 * @param {URLSearchParams} params
 * @returns
 */
export const getLogList = (params) => get(`eta8/log/list`, params);

/**
 * 删除日志（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delLog = (params) => get(`eta8/log/delete`, params);

// =====================================================================> 管理教师获奖 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const initQueryTea = () => get(`eta8/query-tea`);

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
export const getTeaAwardList = (params) => get(`eta8/query-tea/list`, params);

// =====================================================================> 管理教师成果 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const initQueryPaper = () => get(`eta8/query-paper`);

/**
 * 获取教师成果列表（GET）
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
export const getTeaPaperList = (params) => get(`eta8/query-paper/list`, params);

// =====================================================================> 管理教师项目 API
/**
 * 初始化查询参数（GET）
 * @returns
 */
export const initQuerySubject = () => get(`eta8/query-subject`);

/**
 * 获取教师项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName: 项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeaSubjectList = (params) =>
  get(`eta8/query-subject/list`, params);

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
export const exportTeaAwardXLS = (params) =>
  getFile(`eta8/query-tea/exportXLS`, params);

/**
 * 导出教师论文表格文件（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyPaperName: 奖论文名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaPaperXLS = (params) =>
  getFile(`eta8/query-paper/exportXLS`, params);

/**
 * 导出教师项目表格文件（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName: 项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaSubjectXLS = (params) =>
  getFile(`eta8/query-subject/exportXLS`, params);

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
export const exportTeaAwardZIP = (params) =>
  getFile(`eta8/query-tea/exportZIP`, params);

/**
 * 导出教师论文图片压缩包（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyPaperName: 成果名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaPaperZIP = (params) =>
  getFile(`eta8/query-paper/exportZIP`, params);

/**
 * 导出教师项目图片压缩包（GET）
 * 需传入的参数
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName: 项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const exportTeaSubjectZIP = (params) =>
  getFile(`eta8/query-subject/exportZIP`, params);

/**
 * 删除教师奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaAward = (params) => get(`eta8/query-tea/del`, params);

/**
 * 删除教师论文（GET）
 * 需传入的参数
 * id：成果id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaPaper = (params) => get(`eta8/query-paper/del`, params);

/**
 * 删除教师项目（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaSubject = (params) => get(`eta8/query-subject/del`, params);

// =====================================================================> 奖项审核页 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */
export const initReview = () => get(`eta8/award-review`);

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * @returns
 */
export const initPaperReview = () => get(`eta8/paper-review`);

/**
 * 获取未审核的学生奖项列表（GET）
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
export const getReviewStudentAwardList = (params) =>
  get(`eta8/award-review/listStu`, params);

/**
 * 获取未审核的教师奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * collegeId: 年级id（可选）
 * sectorId: 部门id（可选）
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyAwardName: 奖项名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getReviewTeacherAwardList = (params) =>
  get(`eta8/award-review/listTea`, params);

/**
 * 审核通过学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const passAward = (params) => get(`eta8/award-review/pass`, params);

/**
 * 审核驳回学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const notPassAward = (params) =>
  get(`eta8/award-review/notPass`, params);

/**
 * 获取未审核的成果列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 成果等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keyPaperName: 成果名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getReviewPaperList = (params) =>
  get(`eta8/paper-review/listPaper`, params);

/**
 * 获取未审核的项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 项目等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName: 项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getReviewSubjectList = (params) =>
  get(`eta8/subject-review/listSubject`, params);

/**
 * 获取未审核的中期检查项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 项目等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName: 项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getReviewMidSubjectList = (params) =>
  get(`eta8/subject-mid/listSubject`, params);

/**
 * 获取未结题的项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName:项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getFinishSubjectList = (params) =>
  get(`eta8/subject-finish/listSubject`, params);

/**
 * 获取申请变更的项目列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * rankId: 获奖等级id（可选）
 * keyUsername: 教职工号（可选）
 * keyName: 姓名（可选）
 * keySubjectName:项目名（可选）
 * @param {URLSearchParams} params
 * @returns
 */
export const getEditSubjectList = (params) =>
  get(`eta8/subject-edit/listSubject`, params);

// =====================================================================> 成果审核页 API
/**
 * 审核通过教师成果（GET）
 * 需传入的参数
 * id：成果id
 * @param {URLSearchParams} params
 * @returns
 */
export const passPaper = (params) => get(`eta8/paper-review/passPaper`, params);

/**
 * 审核驳回教师成果（GET）
 * 需传入的参数
 * id：成果id
 * @param {URLSearchParams} params
 * @returns
 */
export const notPassPaper = (params) =>
  get(`eta8/paper-review/notPassPaper`, params);

// =====================================================================> 项目立项页 API
/**
 * 审核通过立项（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const passSubject = (params) =>
  get(`eta8/subject-review/passSubject`, params);

/**
 * 审核驳回立项（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const notPassSubject = (params) =>
  get(`eta8/subject-review/notPassSubject`, params);

// =====================================================================> 中期检查页 API
/**
 * 审核通过项目（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const passMidSubject = (params) =>
  get(`eta8/subject-mid/passSubject`, params);

/**
 * 审核驳回项目（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const notPassMidSubject = (params) =>
  get(`eta8/subject-mid/notPassSubject`, params);

  /**
 * 审核通过教师项目结题（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const passEditSubject = (params) =>
get(`eta8/subject-edit/passSubject`, params);

/**
* 审核驳回项目结题（GET）
* 需传入的参数
* id：项目id
* @param {URLSearchParams} params
* @returns
*/
export const notPassEditSubject = (params) =>
get(`eta8/subject-edit/notPassSubject`, params);

// =====================================================================> 审核结题页 API
/**
 * 审核通过教师项目结题（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const FinishSubject = (params) =>
  get(`eta8/subject-finish/passSubject`, params);

/**
 * 审核驳回项目结题（GET）
 * 需传入的参数
 * id：项目id
 * @param {URLSearchParams} params
 * @returns
 */
export const notFinishSubject = (params) =>
  get(`eta8/subject-finish/notPassSubject`, params);

// =====================================================================> 奖项展示组件 API
/**
 * 添加展示的奖项（POST）
 * 需要传入的参数
 * imageurl: 图片url 「例：/upload/student/16软件工程1班/16软件工程1班_31216236王曹冲_北大核心_2021_02_23_12_18_34_0.jpeg
 * imagecontent: 图片简述
 * @param {URLSearchParams} params
 * @returns
 */
export const addAwardShow = (params) => post(`eta8/home/imageadd`, params);

/**
 * 删除展示的奖项（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delAwardShow = (params) => post(`eta8/home/imagedel`, params);

/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getAwardShowList = (params) => get(`eta8/home/imagelist`, params);

// =====================================================================> 公告组件 API
/**
 * 添加公告（POST）
 * 需要传入的参数
 * title: 标题
 * content: 内容
 * @param {URLSearchParams} params
 * @returns
 */
export const addInform = (params) => post(`eta8/home/informadd`, params);

/**
 * 删除公告（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delInform = (params) => post(`eta8/home/informdel`, params);

/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getInformList = (params) => get(`eta8/home/informlist`, params);

// =====================================================================> 奖项管理 API
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
export const getAllAwardList = (params) => get(`eta8/award/list`, params);

/**
 * 更新奖项名称（GET）
 * 需传入的参数
 * id: 奖项的ID
 * newName: 新名称
 * @param {URLSearchParams} params
 * @returns
 */
export const updateAwardName = (params) => post(`eta8/award/update`, params);

/**
 * 删除奖项（POST）
 * 需传入的参数
 * ids: 奖项的ID 「List」
 * @param {URLSearchParams} params
 * @returns
 */
export const delAward = (params) => post(`eta8/award/delete`, params);

/**
 * 添加奖项（POST）
 * 需传入的参数
 * name: 奖项名
 * type: 奖项类型「1:学生奖项 2:教师奖项」
 * @param {URLSearchParams} params
 * @returns
 */
export const addAward = (params) => post(`eta8/award/add`, params);

// =====================================================================> 学生信息管理 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * @returns
 */
export const initManageStu = () => get(`eta8/student-management`);

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
export const getStuList = (params) =>
  get(`eta8/student-management/list`, params);

/**
 * 重置密码
 * 请求方法: POST
 * ids[]: 2636
 */
export const resetStuPass = (params) =>
  post(`eta8/student-management/reset`, params);

/**
 * 删除学生
 * 请求方法: POST
 * studentNos[]: 69119132
 */
export const delStu = (params) =>
  post(`eta8/student-management/delete`, params);

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
export const updateStu = (params) =>
  post(`eta8/student-management/update`, params);

// =====================================================================> 教师信息管理 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */
export const initManageTea = () => get(`eta8/teacher-management`);
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */
export const initManageClass = () => get(`eta8/class-management`);
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
export const getTeaList = (params) =>
  get(`eta8/teacher-management/list`, params);

/**重置密码
 *
 * 请求 URL: http://localhost/eta8/teacher-management/reset
 * 请求方法: POST
 * ids[]: 2636
 */
export const resetTeaPass = (params) =>
  post(`eta8/teacher-management/reset`, params);

/**
 * 删除教师
 * 请求方法: POST
 * teacherNos[]: 69119132
 */
export const delTea = (params) =>
  post(`eta8/teacher-management/delete`, params);

/**更新教师信息
 * 请求方法: POST
 * username: 999100236
 * newName: 凌明1
 */
export const updateTea = (params) =>
  post(`eta8/teacher-management/update`, params);

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
export const setRole = (params) =>
  post(`eta8/teacher-management/setRole`, params);

// =====================================================================> 管理班级 API
/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getNewClassList = (params) =>
  get(`eta8/class-management/listClass`, params);

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
export const getInsClassList = (params) =>
  get(`eta8/class-management/list`, params);

/**
 * 解除辅导员与班级的联系
 * 请求方法: POST
 * classIds[]: 69119132
 */
export const delClass = (params) =>
  post(`eta8/class-management/delete`, params);

/**
 * 设置学生助理
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
export const setAssistant = (params) =>
  post(`eta8/student-management/setRole`, params);

// =====================================================================> 奖项导入页 API
/**
 * 下载奖项模板
 * @returns
 */
export const getAwardTemplate = () => getFile(`eta8/import-award/download`);

/**
 * 上传奖项（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadAwardTemplate = (data) =>
  postFile(`eta8/import-award/upload`, data);

// =====================================================================> 教师导入页 API
/**
 * 下载教师模板
 * @returns
 */
export const getTeaTemplate = () => getFile(`eta8/import-tea/download`);

/**
 * 上传教师（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadTeaTemplate = (data) =>
  postFile(`eta8/import-tea/upload`, data);

// =====================================================================> 学生导入页 API
/**
 * 下载学生模板
 * @returns
 */
export const getStuTemplate = () => getFile(`eta8/import-stu/download`);

/**
 * 上传学生（POST）
 * 需传入的参数
 * class: 班级号「classId」
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadStuTemplate = (data) =>
  postFile(`eta8/import-stu/upload`, data);
