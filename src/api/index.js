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
export const checkState = () => get(`eta6/mine`);

/**
 * 退出登录（POST）
 * @returns
 */
export const logout = () => get(`eta6/logout`);

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
export const initHome = () => get(`eta6/home`);

// =====================================================================> 个人信息 API
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
export const initDetail = () => get(`eta6/home/detail`);

// =====================================================================> 获奖记录页 API
/**
 * 获取个人奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMyAwardList = (params) => get(`eta6/mine/list`, params);

/**
 * 获取个人奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMyPaperList = (params) => get(`eta6/mine/listpaper`, params);

/**
 * 获取个人项目列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getMySubjectList = (params) =>
  get(`eta6/mine/listsubject`, params);

/**
 * 获取学生个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getStuDetail = (params) => get(`eta6/detail-stu`, params);

/**
 * 获取教师个人奖项详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeaDetail = (params) => get(`eta6/detail-tea`, params);

/**
 * 获取教师论文详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getPaperDetail = (params) => get(`eta6/detail-paper`, params);

/**
 * 获取教师论文详情（GET）
 * 需传入的参数
 * id: 奖项ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getSubjectDetail = (params) => get(`eta6/detail-subject`, params);

// =====================================================================> 奖项上传页 API
/**
 * 获取奖项等级列表
 * @returns
 */
export const getRankList = () => get(`eta6/upload`);

/**
 * 获取成果等级列表
 * @returns
 */
export const getTypeList = (params) => get(`eta6/query-paper/listType`, params);

/**
 * 获取项目类别列表
 * @returns
 */
export const getSchoolList = () => get(`eta6/subject`);

/**
 * 获取项目类别列表
 * @returns
 */
export const getHorizonList = () => get(`eta6/subject/listHorizon`);

/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */
 export const getFirstSubjectList = (params) => get(`eta6/subject/listFirstSubject`, params);

/**
 * 获取项目资源列表
 * @returns
 */
export const getSourceList = (params) => get(`eta6/subject/listSource`, params);


/**
 * 获取成果等级列表
 * @returns
 */
export const getPaperList = (params) => get(`eta6/record/listType`, params);

/**
 * 获取教师列表
 * @returns
 */
export const getTeacherList = () => get(`eta6/record/listTeacher`);

/**
 * 上传成果（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadPaper = (data) => postFile(`eta6/record/uploadpaper`, data);

/**
 * 获取可上传奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getAwardList = (params) => get(`eta6/upload/listAward`, params);

/**
 * 获取可上传奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeacherPaperList = (params) =>
  get(`eta6/record/listPaper`, params);

  /**
 * 获取可上传奖项列表（GET）
 * 需传入的参数
 * limit：每页的记录条数
 * page：当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getTeacherSubjectList = (params) =>
get(`eta6/subject/listSubject`, params);

/**
 * 上传校级项目（POST）
 * @param {FormData} data
 * @returns
 */
export const uploadSchool = (data) =>
  postFile(`eta6/subject/uploadSchool`, data);

  /**
 * 上传项目与（POST）
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
export const uploadHorizon = (data) =>
postFile(`eta6/subject/uploadHorizon`, data);

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
export const uploadAward = (data) => postFile(`eta6/upload/upload`, data);

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
export const updatePass = (params) => post(`eta6/password/update`, params);

// =====================================================================> 管理学生获奖 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */
export const initQueryStu = () => get(`eta6/query-stu`);

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
export const getStuAwardList = (params) => get(`eta6/query-stu/list`, params);

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
  getFile(`eta6/query-stu/exportXLS`, params);

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
  getFile(`eta6/query-stu/exportZIP`, params);

/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getClassList = (params) => get(`eta6/query-stu/listClass`, params);

/**
 * 删除自己奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delMineAward = (params) => get(`eta6/mine/del`, params);

/**
 * 删除学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delStuAward = (params) => get(`eta6/query-stu/del`, params);

/**
 * 更新奖项图片（POST）
 * 需传入的参数
 * id: 项目ID
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const updateAwardImg = (data) =>
  postFile(`eta6/query-stu/updateImg`, data);

// =====================================================================> 管理操作日志
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */
export const initQueryLog = () => get(`eta6/log`);

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
export const getLogList = (params) => get(`eta6/log/list`, params);

/**
 * 删除日志（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delLog = (params) => get(`eta6/log/delete`, params);

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
  get(`eta6/class-management/listClass`, params);

// =====================================================================> 管理教师获奖 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const initQueryTea = () => get(`eta6/query-tea`);

// =====================================================================> 管理教师论文 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const initQueryPaper = () => get(`eta6/query-paper`);

// =====================================================================> 管理教师项目 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const initQuerySubject = () => get(`eta6/query-subject`);

/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * rank：奖项列表
 * @returns
 */
export const getSubjectList = () => get(`eta6/mine/getSubjectList`);

/**
 * 获取班级列表（GET）
 * 需传入的参数
 * gradeId：年级ID
 * majorId：专业ID
 * @param {URLSearchParams} params
 * @returns
 */
export const getPerSubjectList = (params) =>
  get(`eta6/mine/listPerSubject`, params);

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
export const getTeaAwardList = (params) => get(`eta6/query-tea/list`, params);

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
export const getTeaPaperList = (params) => get(`eta6/query-paper/list`, params);

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
export const getTeaSubjectList = (params) =>
  get(`eta6/query-subject/list`, params);

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
  getFile(`eta6/query-tea/exportXLS`, params);

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
export const exportTeaPaperXLS = (params) =>
  getFile(`eta6/query-paper/exportXLS`, params);

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
export const exportTeaSubjectXLS = (params) =>
  getFile(`eta6/query-subject/exportXLS`, params);

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
  getFile(`eta6/query-tea/exportZIP`, params);

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
export const exportTeaPaperZIP = (params) =>
  getFile(`eta6/query-paper/exportZIP`, params);

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
export const exportTeaSubjectZIP = (params) =>
  getFile(`eta6/query-subject/exportZIP`, params);

/**
 * 删除教师奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaAward = (params) => get(`eta6/query-tea/del`, params);

/**
 * 删除教师论文（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaPaper = (params) => get(`eta6/query-paper/del`, params);

/**
 * 删除教师项目（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delTeaSubject = (params) => get(`eta6/query-subject/del`, params);

// =====================================================================> 奖项审核页 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * rank：奖项列表
 * @returns
 */
export const initReview = () => get(`eta6/review`);

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
export const getReviewAwardList = (params) => get(`eta6/review/list`, params);

/**
 * 审核通过学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const passAward = (params) => get(`eta6/review/pass`, params);

/**
 * 审核驳回学生奖项（GET）
 * 需传入的参数
 * id：奖项id
 * @param {URLSearchParams} params
 * @returns
 */
export const notPassAward = (params) => get(`eta6/review/notPass`, params);

// =====================================================================> 奖项展示组件 API
/**
 * 添加展示的奖项（POST）
 * 需要传入的参数
 * imageurl: 图片url 「例：/upload/student/16软件工程1班/16软件工程1班_31216236王曹冲_北大核心_2021_02_23_12_18_34_0.jpeg
 * imagecontent: 图片简述
 * @param {URLSearchParams} params
 * @returns
 */
export const addAwardShow = (params) => post(`eta6/home/imageadd`, params);

/**
 * 删除展示的奖项（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delAwardShow = (params) => post(`eta6/home/imagedel`, params);

/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getAwardShowList = (params) => get(`eta6/home/imagelist`, params);

// =====================================================================> 公告组件 API
/**
 * 添加公告（POST）
 * 需要传入的参数
 * title: 标题
 * content: 内容
 * @param {URLSearchParams} params
 * @returns
 */
export const addInform = (params) => post(`eta6/home/informadd`, params);

/**
 * 删除公告（POST）
 * 需要传入的参数
 * id：该项id
 * @param {URLSearchParams} params
 * @returns
 */
export const delInform = (params) => post(`eta6/home/informdel`, params);

/**
 * 获取展示的奖项列表（GET）
 * 需传入的参数
 * limit: 每页的记录条数
 * page: 当前页码
 * @param {URLSearchParams} params
 * @returns
 */
export const getInformList = (params) => get(`eta6/home/informlist`, params);

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
export const getAllAwardList = (params) => get(`eta6/award/list`, params);

/**
 * 更新奖项名称（GET）
 * 需传入的参数
 * id: 奖项的ID
 * newName: 新名称
 * @param {URLSearchParams} params
 * @returns
 */
export const updateAwardName = (params) => post(`eta6/award/update`, params);

/**
 * 删除奖项（POST）
 * 需传入的参数
 * ids: 奖项的ID 「List」
 * @param {URLSearchParams} params
 * @returns
 */
export const delAward = (params) => post(`eta6/award/delete`, params);

/**
 * 添加奖项（POST）
 * 需传入的参数
 * name: 奖项名
 * type: 奖项类型「1:学生奖项 2:教师奖项」
 * @param {URLSearchParams} params
 * @returns
 */
export const addAward = (params) => post(`eta6/award-add/add`, params);

// =====================================================================> 学生信息管理 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * @returns
 */
export const initManageStu = () => get(`eta6/student-management`);

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
  get(`eta6/student-management/list`, params);

/**
 * 重置密码
 * 请求方法: POST
 * ids[]: 2636
 */
export const resetStuPass = (params) =>
  post(`eta6/student-management/reset`, params);

/**
 * 删除学生
 * 请求方法: POST
 * studentNos[]: 69119132
 */
export const delStu = (params) =>
  post(`eta6/student-management/delete`, params);

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
  post(`eta6/student-management/update`, params);

// =====================================================================> 教师信息管理 API
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */
export const initManageTea = () => get(`eta6/teacher-management`);
/**
 * 初始化查询参数（GET）
 * 返回的参数有
 * grade：年级列表
 * major：专业列表
 * role：角色列表
 * @returns
 */
export const initManageClass = () => get(`eta6/class-management`);
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
  get(`eta6/teacher-management/list`, params);

/**重置密码
 *
 * 请求 URL: http://localhost/eta6/teacher-management/reset
 * 请求方法: POST
 * ids[]: 2636
 */
export const resetTeaPass = (params) =>
  post(`eta6/teacher-management/reset`, params);

/**
 * 删除教师
 * 请求方法: POST
 * teacherNos[]: 69119132
 */
export const delTea = (params) =>
  post(`eta6/teacher-management/delete`, params);

/**更新教师信息
 * 请求方法: POST
 * username: 999100236
 * newName: 凌明1
 */
export const updateTea = (params) =>
  post(`eta6/teacher-management/update`, params);

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
  post(`eta6/teacher-management/setRole`, params);

// =====================================================================> （新）班级信息管理 API
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
  get(`eta6/class-management/list`, params);

/**
 * 解除辅导员与班级的联系
 * 请求方法: POST
 * classIds[]: 69119132
 */
export const delClass = (params) =>
  post(`eta6/class-management/delete`, params);

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
export const setAssistant = (params) =>
  post(`eta6/student-management/setRole`, params);

// =====================================================================> 奖项导入页 API
/**
 * 下载奖项模板
 * @returns
 */
export const getAwardTemplate = () => getFile(`eta6/import-award/download`);

/**
 * 上传奖项（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadAwardTemplate = (data) =>
  postFile(`eta6/import-award/upload`, data);

// =====================================================================> 教师导入页 API
/**
 * 下载教师模板
 * @returns
 */
export const getTeaTemplate = () => getFile(`eta6/import-tea/download`);

/**
 * 上传教师（POST）
 * 需传入的参数
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadTeaTemplate = (data) =>
  postFile(`eta6/import-tea/upload`, data);

// =====================================================================> 学生导入页 API
/**
 * 下载学生模板
 * @returns
 */
export const getStuTemplate = () => getFile(`eta6/import-stu/download`);

/**
 * 上传学生（POST）
 * 需传入的参数
 * class: 班级号「classId」
 * file: (二进制)
 * @param {FormData} data
 * @returns
 */
export const uploadStuTemplate = (data) =>
  postFile(`eta6/import-stu/upload`, data);
