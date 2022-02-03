<template>
  <div class="SponsoredForm">
    <h3>项目申报</h3>
    <el-form
      :model="FormData"
      :rules="rules"
      label-position="top"
      ref="FormData"
      size="medium"
      class="demo-FormData"
    >
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目名称" prop="subjectName">
            <el-input
              v-model="FormData.subjectName"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目编号" prop="subjectNum">
            <el-input
              v-model="FormData.subjectNum"
              placeholder="请输入项目编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目类别" prop="RankName">
            <el-input v-model="RankName" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目等级" prop="levelId">
            <el-select
              v-model="FormData.levelId"
              placeholder="请选择项目等级"
              style="display: block"
            >
              <template v-for="rankEach1 in rankList">
                <el-option
                  :label="rankEach1.rankName"
                  :value="rankEach1.id"
                  :key="rankEach1.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <h3>负责人信息</h3>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="24" :xs="24">
          <el-form-item label="项目参与者（可输入名字搜索）" prop="FirstWriter">
            <el-input
              v-model="FirstWriterName"
              style="width: 140px"
              placeholder="请输入项目第一参与者"
              readonly
            ></el-input>
            <el-button @click="option">新增参与者</el-button>
          </el-form-item>
          <el-form-item
            v-for="(domain, index) in FormData.domains"
            :label="'项目第' + (index + 2) + '位参与者（按参与者排序）'"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '参与者不能为空',
              trigger: 'blur',
            }"
          >
            <el-select
              v-model="domain.value"
              placeholder="请选择教师"
              filterable
              style="width: 140px"
            >
              <el-option label="全部教师" value=""></el-option>
              <el-option
                v-for="opt in teacherList"
                :key="opt.id"
                :label="opt.teaName"
                :value="opt.userId"
              ></el-option>
            </el-select>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <h3>项目经费</h3>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="批准经费（元）" prop="subjectFund">
            <el-input
              v-model="FormData.subjectFund"
              placeholder="请输入项目批准经费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="硬件经费（元）" prop="hardwareFund">
            <el-input
              v-model="FormData.hardwareFund"
              placeholder="请输入项目硬件经费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="软件经费（元）" prop="softwareFund">
            <el-input
              v-model="FormData.softwareFund"
              placeholder="请输入项目硬件经费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="留校经费（元）" prop="staySchoolFund">
            <el-input
              v-model="FormData.staySchoolFund"
              placeholder="请输入项目留校经费"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="外拨经费（元）" prop="outboundFund">
            <el-input
              v-model="FormData.outboundFund"
              placeholder="请输入项目外拨经费"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <h3>项目描述</h3>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="所属单位" prop="subjectPlace">
            <el-input
              v-model="FormData.subjectPlace"
              placeholder="请输入项目所属单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目来源" prop="sourceId">
            <el-select
              v-model="FormData.sourceId"
              placeholder="请选择项目来源"
              style="display: block"
            >
              <template v-for="rankEach in SourceList">
                <el-option
                  :label="rankEach.SourceName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="研究领域" prop="researchField">
            <el-select
              v-model="FormData.researchField"
              placeholder="请选择研究领域"
              style="display: block"
            >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="是否保密" prop="isSecrecy">
            <el-radio-group v-model="FormData.isSecrecy">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="是否开发票或收据" prop="isVoucher">
            <el-radio-group v-model="FormData.isVoucher">
              <el-radio label="1">开行政事业收据</el-radio>
              <el-radio label="2">开发票</el-radio>
              <el-radio label="3">不开发票</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="是否交科技处存档" prop="isSubmitFill">
            <el-radio-group v-model="FormData.isSubmitFill">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item
            label="此合同是否可以进行技术认证并免税"
            prop="isDutyFree"
          >
            <el-radio-group v-model="FormData.isDutyFree">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="委托单位" prop="entrustPlace">
            <el-input
              v-model="FormData.entrustPlace"
              placeholder="请输入项目委托单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="申请代码" prop="applicationCode">
            <el-input
              v-model="FormData.applicationCode"
              placeholder="请输入项目申请代码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目简介" prop="introduction">
            <el-input
              v-model="FormData.introduction"
              placeholder="请输入项目简介"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="FormData.startTime"
              type="date"
              placeholder="选择日期"
              range-separator="至"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="预计完成时间" prop="finishTime">
            <el-date-picker
              v-model="FormData.FinishTime"
              type="date"
              placeholder="选择日期"
              range-separator="至"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <h4>教育部统计信息</h4>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="一级学科" prop="TypeId">
            <el-select
              v-model="FormData.TypeId"
              placeholder="请选择一级学科"
              style="display: block"
            >
              <template v-for="rankEach in TypeList">
                <el-option
                  :label="rankEach.TypeName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="国民经济行业" prop="EconomicId">
            <el-select
              v-model="FormData.EconomicId"
              placeholder="请选择国民经济行业"
              style="display: block"
            >
              <template v-for="rankEach in EconomicList">
                <el-option
                  :label="rankEach.EconomicName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="社会经济服务目标" prop="SocietyId">
            <el-select
              v-model="FormData.SocietyId"
              placeholder="请选择社会经济服务目标"
              style="display: block"
            >
              <template v-for="rankEach in SocietyList">
                <el-option
                  :label="rankEach.SocietyName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="研究类别" prop="ResearchId">
            <el-select
              v-model="FormData.researchType"
              placeholder="请选择项目来源"
              style="display: block"
            >
              <template v-for="rankEach in ResearchList">
                <el-option
                  :label="rankEach.TypeName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="课题类型" prop="topicType">
            <el-select
              v-model="FormData.topicType"
              placeholder="请选择课题类型"
              style="display: block"
            >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="主项目名称" prop="mainProjectName">
            <el-input
              v-model="FormData.mainProjectName"
              placeholder="请输入主项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="FormData.remarks"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>合作单位</h4>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="合作单位" prop="cooperateId">
            <el-select
              v-model="FormData.cooperateId"
              placeholder="请选择合作单位"
              style="display: block"
            >
              <template v-for="rankEach in CooperateList">
                <el-option
                  :label="rankEach.CooperateName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="合同金额（万元）" prop="contractFund">
            <el-input
              v-model="FormData.contractFund"
              placeholder="请输入合同金额（万元）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="负责人" prop="cooperatePrincipal">
            <el-input
              v-model="FormData.cooperatePrincipal"
              placeholder="请输入负责人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="银行名称" prop="bankName">
            <el-input
              v-model="FormData.bankName"
              placeholder="请输入银行名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="银行账号" prop="bankAccount">
            <el-input
              v-model="FormData.bankAccount"
              placeholder="请输入银行账号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-dialog :visible.sync="dialogVisible" width="90%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-form-item label="项目图片" required prop="subjectPicList">
        <el-upload
          class="img-upload"
          ref="upload"
          action="#"
          :auto-upload="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :file-list="fileList"
          :multiple="true"
          list-type="picture"
          :limit="5"
          accept="image/jpeg,image/png"
        >
          <el-button size="small">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传 jpg/png 格式文件，且总大小不超过10MB，最多上传5张
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top: 40px" size="medium">
        <el-button
          type="primary"
          @click="submitForm('FormData')"
          :loading="submitButton"
          :disabled="true"
          >立即提交</el-button
        >
        <el-button
          @click="
            cancelUpload('FormData');
            goback();
          "
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getRankList,
  getSponsorList,
  uploadSchool,
  getSourceList,
  getFirstSubjectList,
} from "../../api";
export default {
  name: "SponsoredForm",
  props: {
    FirstWriterName: String,
    RankId: Number,
    RankName: String,
    goback: { type: Function },
  },
  data() {
    return {
      submitButton: false,
      fileList: [], //已上传的文件列表
      rankList: [], //项目类别的列表「从后端取得」
      teacherList: [], //教师列表「从后端取得」
      SourceList: [], //项目来源列表「从后端取得」
      SocietyList: [], //社会组织列表「从后端取得」
      ResearchList: [], //科研项目列表「从后端取得」
      CooperateList: [], //合作单位列表「从后端取得」
      EconomicList: [], //经济类型列表「从后端取得」
      TypeList: [], //一级学科列表「从后端取得」
      //基础信息表单数据
      FormData: {
        domains: [
          {
            value: "",
          },
        ],
        subjectName: "",
        subjectNum: "",
        levelId: "",
        sourceId: "",

        //项目经费
        subjectFund: "",
        hardwareFund: "",
        softwareFund:"",
        staySchoolFund: "",
        outboundFund: "",

        subjectPlace: "",
        researchField: "",
        isSecrecy: "",
        isVoucher: "",
        isSubmitFill: "",
        isDutyFree: "",

        entrustPlace: "",
        applicationCode: "",
        introduction: "",
        subjectTime: "",
        startTime: "",
        FinishTime: "",
        TypeId: "",
        EconomicId: "",
        SocietyId: "",
        researchType: "",
        topicType: "",
        mainProjectName: "",
        remarks: "",
        cooperateId: "",
        contractFund: "",
        cooperatePrincipal: "",
        bankName: "",
        bankAccount: "",
        subjectPicList: [],
        subjectType: 1,
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        subjectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        subjectNum: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        subjectPlace: [
          { required: true, message: "请输入项目所属单位", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        //项目经费
        subjectFund: [
          { required: true, message: "请输入项目申请经费", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 位数", trigger: "blur" },
        ],
        softwareFund: [
          { required: false, message: "请输入项目软件经费", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 位数", trigger: "blur" },
        ],
        hardwareFund: [
          { required: false, message: "请输入项目硬件经费", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 位数", trigger: "blur" },
        ],
        staySchoolFund: [
          { required: false, message: "请输入留校经费", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 位数", trigger: "blur" },
        ],
        outboundFund: [
          { required: false, message: "请输入外拨经费", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 位数", trigger: "blur" },
        ],

        entrustPlace: [
          { required: true, message: "请输入委托单位", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],
        applicationCode: [
          { required: false, message: "请输入申请代码", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入项目简介", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],
        mainProjectName: [
          { required: false, message: "请输入主项目名称", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],
        remarks: [
          { required: false, message: "请输入备注", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],
        cooperatePrincipal: [
          { required: true, message: "请输入负责人", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],
        bankAccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" },
          { min: 3, message: "长度大于等于3", trigger: "blur" },
        ],

        levelId: [
          { required: true, message: "请选择项目等级", trigger: "change" },
        ],
        subjectTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        FinishTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],

        subjectPicList: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
        EconomicId: [
          { required: true, message: "要求：国家标准", trigger: "blur" },
        ],
        SocietyId: [
          { required: true, message: "要求：国家标准", trigger: "blur" },
        ],
        sourceId: [
          { required: true, message: "请选择项目等级", trigger: "blur" },
        ],
        TypeId: [
          { required: true, message: "请选择一级学科", trigger: "blur" },
        ],
        cooperateId: [
          { required: true, message: "请选择合作单位", trigger: "blur" },
        ],
        researchField: [
          { required: true, message: "请选择项目等级", trigger: "blur" },
        ],
        researchType: [
          { required: true, message: "请选择研究领域", trigger: "blur" },
        ],
        topicType: [
          { required: true, message: "请选择课题类型", trigger: "blur" },
        ],
        cooperateType: [
          { required: true, message: "请选择单位类型", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //图片预览的url
      dialogVisible: false, //是否显示预览
    };
  },
  mounted() {
    this.initRankList1();
    this.initRankList2();
  },
  methods: {
    //初始化奖项等级列表
    initRankList1() {
      let _this = this;
      //初始化项目类别列表
      getRankList()
        .then((res) => {
          let obj1 = JSON.parse(res.msg);
          //closeDebug console.log("LevelList初始化", obj);
          this.rankList = obj1.rank;
        })
        .catch((failResponse) => {});
      getSubjectRankList()
        .then((res) => {
          let obj2 = JSON.parse(res.msg);
          //closeDebug console.log("teacherList初始化", obj);
          this.CooperateList = obj2.cooperate;
          this.teacherList = obj2.teacher;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的一级学科列表
    QuerySubject() {
      let _this = this;
      _this.FormData.TypeId = "";
      getFirstSubjectList()
        .then((res) => {
          _this.TypeList = res;
        })
        .catch((failResponse) => {});
    },
    initRankList2() {
      //初始化校级项目来源
      let params = new URLSearchParams();
      params.append("rankId", 3);
      getSourceList(params)
        .then((res) => {
          //closeDebug console.log("LevelList初始化", obj);
          this.SourceList = res;
        })
        .catch((failResponse) => {});
    },
    //处理表单提交事件
    submitForm(formName) {
      let _this = this;
      _this.submitButton = true;
      _this.$message({
        dangerouslyUseHTMLString: true,
        duration: 0,
        type: "success",
        message:
          '<strong>上传中,请勿关闭页面</strong><i class="el-icon-loading"></i>',
      });

      //closeDebug console.log();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data2upload = new FormData();
          //获取实际input组件的文件
          let filesList = this.FormData.subjectPicList;
          data2upload.append("subjectId", 13);
          data2upload.append("subjectNum", this.FormData.subjectNum);
          data2upload.append("subjectType", this.RankName);
          data2upload.append("subjectName", this.FormData.subjectName);
          data2upload.append("subjectTime", this.FormData.subjectTime);
          data2upload.append("FinishTime", this.FormData.FinishTime);
          data2upload.append("subjectPlace", this.FormData.subjectPlace);
          data2upload.append("rankId", this.RankId);
          data2upload.append("levelId", this.FormData.levelId);
          data2upload.append("subjectFund", this.FormData.subjectFund);
          for (let i = 0; i < this.FormData.domains.length; i++) {
            data2upload.append("userids[]", this.FormData.domains[i].value);
          }

          //校级项目表单
          data2upload.append(
            "subject3Economic",
            this.FormData.subject3Economic
          );
          data2upload.append("subject3Society", this.FormData.subject3Society);
          data2upload.append("sourceId", this.FormData.sourceId);
          data2upload.append("typeId", this.FormData.TypeId);
          data2upload.append("cooperateId", this.FormData.cooperateId);

          //循环加入多文件
          for (let i = 0; i < filesList.length; i++) {
            data2upload.append("file", filesList[i].raw, filesList[i].raw.name);
          }

          uploadSchool(data2upload)
            .then((res) => {
              //closeDebug console.log("-----------表单提交---------------");
              //closeDebug console.log("服务器返回值：", res);
              if (res.code === 0) {
                _this.$message.closeAll();
                _this.submitButton = false;
                _this.$message({
                  message: res.msg,
                  type: "success",
                });
                _this.cancelUpload("FormData");
                _this.goback();
              } else {
                _this.$message.closeAll();
                _this.submitButton = false;
                _this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            })
            .catch((failResponse) => {
              _this.$message.closeAll();
              _this.submitButton = false;
              console.log(failResponse);
              if (failResponse.status == 500) {
                _this.$message({
                  message: "上传失败，大小超出限制",
                  type: "error",
                });
              } else {
                _this.$message({
                  message: "上传失败，请检查网络，或压缩图片",
                  type: "error",
                });
              }
            });
        } else {
          _this.$message.closeAll();
          _this.submitButton = false;
          this.$message({
            message: "填写的信息有误",
            type: "error",
          });
          return false;
        }
      });
    },
    //取消上传，清空文件列表及表单
    cancelUpload(formName) {
      this.$refs[formName].resetFields();
      this.$refs.upload.clearFiles();
    },
    //删除一行参与者
    removeDomain(item) {
      var index = this.FormData.domains.indexOf(item);
      if (index !== -1) {
        this.FormData.domains.splice(index, 1);
      }
    },
    //增加一行参与着
    addDomain() {
      if (this.FormData.domains.length >= 4) {
        this.$message({
          message: "最多只能添加5个参与者",
          type: "error",
        });
      } else {
        this.FormData.domains.push({
          value: "",
          value2: "",
          key: Date.now(),
        });
      }
    },
    //处理已上传图片与表单内容的同步
    handleChange(file, fileList) {
      //closeDebug console.log("添加图片后", file, fileList);
      this.FormData.subjectPicList = fileList;
    },
    //处理已上传的图片的删除
    handleRemove(file, fileList) {
      //closeDebug console.log("删除图片后", file, fileList);
    },
    //处理已上传的图片的点击预览
    handlePreview(file) {
      //closeDebug console.log("点击预览了", file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //处理上传图片超过限制
    handleExceed(files, fileList) {
      //closeDebug console.log("数量超出限制时", files, fileList);
      this.$message({
        message: "已达到图片数量上限",
        type: "error",
      });
    },
  },
};
</script>

<!-- 添加 "scoped" 标签 可以使以下CSS样式仅在本组件生效 例：<style scoped> -->
<style>
.div-font {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}
.subject-info {
  margin: 5px 0 10px 0;
  font-weight: normal;
  font-size: 0.9em;
}
</style>
