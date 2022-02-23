<template>
  <div class="SchoolForm">
    <el-steps :active="active" finish-status="success">
      <el-step title="项目申报"></el-step>
      <el-step title="参与者选择"></el-step>
      <el-step title="项目信息"></el-step>
      <el-step title="合作信息"></el-step>
    </el-steps>
    <el-divider></el-divider>
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
          <el-form-item label="项目名称" prop="SubjectName">
            <el-input
              v-model="FormData.SubjectName"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目编号" prop="SubjectNum">
            <el-input
              v-model="FormData.SubjectNum"
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
          <el-form-item label="项目等级" prop="RankId">
            <el-select
              v-model="FormData.RankId"
              placeholder="请选择项目等级"
              style="display: block"
            >
              <template v-for="rankEach1 in RankList">
                <el-option
                  :label="rankEach1.rankName"
                  :value="rankEach1.id"
                  :key="rankEach1.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目分类" prop="SubjectCategory">
            <el-select
              v-model="FormData.SubjectCategory"
              placeholder="请选择项目分类"
              style="display: block"
            >
              <template v-for="rankEach in CategoryList">
                <el-option
                  :label="rankEach.typeName"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20">
      <el-button style="margin-top: 12px;" @click="next('FormData')"
        >下一步</el-button
      >
    </el-row>

    <template v-if="active > 0">
      <el-divider></el-divider>
      <el-form
        :model="FormData"
        :rules="rules"
        label-position="top"
        ref="FormData"
        size="medium"
        class="demo-FormData"
      >
        <h3>参与者选择</h3>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="项目负责人">
              <el-input
                v-model="name"
                style="width:140px"
                placeholder="请输入项目第一参与者"
                readonly
              ></el-input>
              <el-input
                v-model="username"
                style="width:140px"
                placeholder="请输入项目第一参与者"
                readonly
              ></el-input>
              <el-input
                v-model="role"
                style="width:140px"
                placeholder="请输入项目第一参与者"
                readonly
              ></el-input>
              <el-input
                v-model="college"
                style="width:200px"
                placeholder="请输入项目第一参与者"
                readonly
              ></el-input>
              <el-input
                v-model="t_sector"
                style="width:140px"
                placeholder="请输入项目第一参与者"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
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
                @change="QueryRole(index)"
                style="width:140px"
              >
                <el-option label="全部教师" value=""></el-option>
                <el-option
                  v-for="opt in TeacherList"
                  :key="opt.userId"
                  :label="opt.name"
                  :value="opt.userId"
                ></el-option>
              </el-select>
              <el-input
                v-model="domain.teaNo"
                style="width:140px"
                placeholder="工号"
                filterable
                readonly
              ></el-input>
              <el-input
                v-model="domain.roleName"
                style="width:140px"
                placeholder="教师角色"
                filterable
                readonly
              ></el-input>
              <el-input
                v-model="domain.collegeName"
                style="width:200px"
                placeholder="所属学院"
                filterable
                readonly
              ></el-input>
              <el-input
                v-model="domain.sectorName"
                style="width:140px"
                placeholder="所属部门"
                filterable
                readonly
              ></el-input>
              <el-button @click="addDomain">新增</el-button>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-button style="margin-top: 12px;" @click="next('FormData')"
            >下一步</el-button
          >
        </el-row>
      </el-form>
    </template>

    <template v-if="active > 1">
      <el-divider></el-divider>
      <el-form
        :model="FormData"
        :rules="rules"
        label-position="top"
        ref="FormData"
        size="medium"
        class="demo-FormData"
      >
        <h3>项目经费</h3>
        <el-form-item label="项目申请经费" prop="SubjectFund">
          <el-input
            type="text"
            v-model="FormData.SubjectFund"
            placeholder="请输入项目申请经费"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目硬件经费" prop="HardwareFund"
          ><el-input
            type="text"
            v-model="FormData.HardwareFund"
            placeholder="请输入项目硬件经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="项目软件经费" prop="SoftwareFund">
          <el-input
            type="text"
            v-model="FormData.SoftwareFund"
            placeholder="请输入项目软件经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="留校经费" prop="StaySchoolFund">
          <el-input
            type="text"
            v-model="FormData.StaySchoolFund"
            placeholder="请输入留校经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="外拨经费" prop="OutboundFund">
          <el-input
            type="text"
            v-model="FormData.OutboundFund"
            placeholder="请输入外拨经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="总经费（自动计算）" prop="allScore">
          <el-input :disabled="true" v-model="allScore"></el-input
        ></el-form-item>

        <el-divider></el-divider>
        <h3>项目描述</h3>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="所属单位" prop="t_sector">
              <el-input
                v-model="t_sector"
                placeholder="请输入项目所属单位"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="成果形式" prop="SubjectPaper">
              <el-select
                v-model="FormData.SubjectPaper"
                placeholder="请选择项目成果形式"
                style="display: block"
              >
                <template v-for="rankEach in PaperList">
                  <el-option
                    :label="rankEach.typeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="立项时间" prop="SubjectTime">
              <el-date-picker
                v-model="FormData.SubjectTime"
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
            <el-form-item label="开始时间" prop="StartTime">
              <el-date-picker
                v-model="FormData.StartTime"
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
            <el-form-item label="计划结项时间" prop="FinishTime">
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
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="备注" prop="Remarks">
              <el-input
                type="textarea"
                v-model="FormData.Remarks"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-button style="margin-top: 12px;" @click="next('FormData')"
            >下一步</el-button
          >
        </el-row>
      </el-form>
    </template>

    <template v-if="active > 2">
      <el-divider></el-divider>
      <el-form
        :model="FormData"
        :rules="rules"
        label-position="top"
        ref="FormData"
        size="medium"
        class="demo-FormData"
      >
        <h3>教育部统计信息</h3>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="统计归属" prop="BelongId">
              <el-select
                v-model="FormData.BelongId"
                placeholder="请选择统计归属"
                @change="QuerySubject"
                style="display: block"
              >
                <template v-for="rankEach in BelongList">
                  <el-option
                    :label="rankEach.BelongName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item
              label="一级学科"
              prop="TypeId"
              v-if="FormData.BelongId !== ''"
            >
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
            </el-form-item> </el-col
        ></el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="研究类别" prop="ResearchId">
              <el-select
                v-model="FormData.ResearchId"
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
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="国民经济行业" prop="EcoFirstId">
              <el-select
                v-model="FormData.EcoFirstId"
                placeholder="请选择国民经济行业一级目录"
                @change="QuerySecondEco"
                style="display: block"
              >
                <template v-for="rankEach in EcoFirstList">
                  <el-option
                    :label="rankEach.TypeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item prop="EcoSecondId" v-if="FormData.EcoFirstId !== ''">
              <el-select
                v-model="FormData.EcoSecondId"
                placeholder="请选择国民经济行业二级目录"
                @change="QueryEconomic"
                style="display: block"
              >
                <template v-for="rankEach in EcoSecondList">
                  <el-option
                    :label="rankEach.TypeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item prop="EconomicId" v-if="FormData.EcoSecondId !== ''">
              <el-select
                v-model="FormData.EconomicId"
                placeholder="请选择国民经济行业三级目录"
                style="display: block"
              >
                <template v-for="rankEach in EconomicList">
                  <el-option
                    :label="rankEach.TypeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="社会经济服务目标" prop="SocFirstId">
              <el-select
                v-model="FormData.SocFirstId"
                placeholder="请选择社会经济服务目标一级目录"
                @change="QuerySociety"
                style="display: block"
              >
                <template v-for="rankEach in SocFirstList">
                  <el-option
                    :label="rankEach.TypeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item prop="SocietyId" v-if="FormData.SocFirstId !== ''">
              <el-select
                v-model="FormData.SocietyId"
                placeholder="请选择社会经济服务目标二级目录"
                style="display: block"
              >
                <template v-for="rankEach in SocietyList">
                  <el-option
                    :label="rankEach.TypeName"
                    :value="rankEach.id"
                    :key="rankEach.id"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="项目来源" prop="SourceId">
              <el-select
                v-model="FormData.SourceId"
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
            <el-form-item label="合作单位" prop="CooperateId">
              <el-select
                v-model="FormData.CooperateId"
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
        </el-row>
        <el-dialog :visible.sync="dialogVisible" width="90%">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-form-item label="项目附件" required prop="SubjectFileList">
          <el-upload
            class="img-upload"
            ref="upload"
            action="#"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="FileList"
            :multiple="true"
            list-type="text"
            :limit="5"
            accept=".pdf"
          >
            <el-button size="small">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传 PDF 格式文件，且总大小不超过100MB，最多上传5份
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 40px" size="medium">
          <el-button
            type="primary"
            @click="submitForm('FormData')"
            :loading="submitButton"
            >立即提交</el-button
          >
          <el-button @click="cancelUpload('FormData')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getRankList,
  initSubject,
  initSchool,
  uploadSchool,
  getSourceList,
  getFirstSubjectList,
  QuerySecondList,
  QueryEconomicList,
  getTeacherDetail,
} from "../../../api";
export default {
  name: "SchoolForm",
  data() {
    return {
      active: 4,
      submitButton: false,
      LevelId: 3,
      RankName: "校级项目",
      FileList: [], //已上传的文件列表
      RankList: [], //项目等级的列表「从后端取得」
      CategoryList: [], //项目分类的列表「从后端取得」
      PaperList: [], //成果形式的列表「从后端取得」
      TeacherList: [], //教师列表「从后端取得」
      SourceList: [], //项目来源列表「从后端取得」
      CooperateList: [], //合作单位列表「从后端取得」
      BelongList: [], //统计归属列表「从后端取得」
      ResearchList: [], //研究方向列表「从后端取得」
      TypeList: [], //一级学科列表「从后端取得」

      EcoFirstList: [], //国民经济一级目录
      EcoSecondList: [], //国民经济二级目录
      EconomicList: [], //国民经济行业列表「从后端取得」

      SocFirstList: [], //社会经济一级目录
      SocietyList: [], //社会经济服务目标列表「从后端取得」

      //基础信息表单数据
      FormData: {
        //基础信息
        domains: [
          {
            teaNo: "",
            value: "",
            roleName: "",
            collegeName: "",
            sectorName: "",
          },
        ],
        SubjectNum: "",
        SubjectName: "",
        RankId: "",
        SubjectCategory: "",

        //项目经费
        SubjectFund: "",
        HardwareFund: "",
        SoftwareFund: "",
        StaySchoolFund: "",
        OutboundFund: "",

        //项目描述
        SubjectPaper: "",
        SubjectTime: "",
        StartTime: "",
        FinishTime: "",
        Remarks: "", //备注

        //教育部统计信息
        BelongId: "",
        TypeId: "",
        ResearchId: "",

        SocFirstId: "",
        SocietyId: "",
        EcoFirstId: "",
        EcoSecondId: "",
        EconomicId: "",

        SourceId: "",
        CooperateId: "",
        SubjectFileList: [],
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        //基础信息
        SubjectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        SubjectNum: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          { min: 2, message: "长度在 2 到 20 个字符", trigger: "blur" },
        ],
        SubjectPaper: [
          {
            required: true,
            message: "请选择成果形式",
            trigger: "blur",
          },
        ],
        SubjectCategory: [
          {
            required: true,
            message: "请选择项目分类",
            trigger: "blur",
          },
        ],

        //项目经费
        SubjectFund: [
          { required: true, message: "请输入项目申请经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],
        HardwareFund: [
          { required: false, message: "请输入项目硬件经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],
        SoftwareFund: [
          { required: false, message: "请输入项目软件经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],
        StaySchoolFund: [
          { required: false, message: "请输入留校经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],
        OutboundFund: [
          { required: false, message: "请输入外拨经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],

        RankId: [
          { required: true, message: "请选择项目等级", trigger: "change" },
        ],
        SubjectTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        StartTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        FinishTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        ResearchId: [
          { required: true, message: "请选择研究方向", trigger: "change" },
        ],

        EcoFirstId: [
          {
            required: true,
            message: "请选择国民经济行业一级目录",
            trigger: "blur",
          },
        ],
        EcoSecondId: [
          {
            required: true,
            message: "请选择国民经济行业二级目录",
            trigger: "blur",
          },
        ],
        EconomicId: [
          { required: true, message: "请选择国民经济行业", trigger: "change" },
        ],
        SocFirstId: [
          {
            required: true,
            message: "请选择社会经济行业一级目录",
            trigger: "blur",
          },
        ],
        SocietyId: [
          {
            required: true,
            message: "请选择社会经济服务目标",
            trigger: "change",
          },
        ],
        SourceId: [
          { required: true, message: "请选择项目等级", trigger: "blur" },
        ],
        BelongId: [
          { required: true, message: "请选择统计归属", trigger: "blur" },
        ],
        TypeId: [
          { required: true, message: "请选择一级学科", trigger: "blur" },
        ],
        CooperateId: [
          { required: true, message: "请选择合作单位", trigger: "blur" },
        ],
        SubjectFileList: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //图片预览的url
      dialogVisible: false, //是否显示预览
    };
  },
  computed: {
    allScore: function() {
      let sum = 0;
      let sum1 = parseFloat(this.FormData.SubjectFund) || 0;
      let sum2 = parseFloat(this.FormData.HardwareFund) || 0;
      let sum3 = parseFloat(this.FormData.SoftwareFund) || 0;
      let sum4 = parseFloat(this.FormData.StaySchoolFund) || 0;
      let sum5 = parseFloat(this.FormData.OutboundFund) || 0;
      sum = sum1 + sum2 + sum3 + sum4 + sum5;
      return sum || 0;
    },
    ...mapGetters(["name", "username", "role", "college", "t_sector"]),
  },
  mounted() {
    this.initSchool();
    this.initSchool2();
  },
  methods: {
    //初始化奖项等级列表
    initSchool() {
      let _this = this;
      //初始化项目类别列表
      getRankList()
        .then((res) => {
          let obj1 = JSON.parse(res.msg);
          //closeDebug console.log("RankList初始化", obj);
          this.RankList = obj1.rank;
        })
        .catch((failResponse) => {});
      initSubject()
        .then((res) => {
          let obj2 = JSON.parse(res.msg);
          //closeDebug console.log("teacherList初始化", obj);
          this.TeacherList = obj2.teacher;
          this.EcoFirstList = obj2.ecofirst;
          this.SocFirstList = obj2.socfirst;
          this.BelongList = obj2.belong;
          this.PaperList = obj2.paper;
        })
        .catch((failResponse) => {});
      initSchool()
        .then((res) => {
          let obj3 = JSON.parse(res.msg);
          //closeDebug console.log("CooperateList初始化", obj);
          this.CooperateList = obj3.cooperate;
          this.ResearchList = obj3.research;
          this.CategoryList = obj3.category;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的一级学科列表
    QuerySubject() {
      let _this = this;
      _this.FormData.TypeId = "";
      let params = new URLSearchParams();
      params.append("BelongId", this.FormData.BelongId);
      getFirstSubjectList(params)
        .then((res) => {
          _this.TypeList = res;
        })
        .catch((failResponse) => {});
    },
    //更新该教师角色
    QueryRole(index) {
      let params = new URLSearchParams();
      params.append("TeacherId", this.FormData.domains[index].value);
      getTeacherDetail(params)
        .then((res) => {
          let obj = JSON.parse(res.msg);
          this.FormData.domains[index].teaNo = obj.username;
          this.FormData.domains[index].roleName = obj.roleName;
          this.FormData.domains[index].collegeName = obj.collegeName;
          this.FormData.domains[index].sectorName = obj.sectorName;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的国民经济二级目录列表
    QuerySecondEco() {
      let _this = this;
      _this.FormData.EcoSecondId = "";
      let params = new URLSearchParams();
      params.append("FirstId", this.FormData.EcoFirstId);
      QuerySecondList(params)
        .then((res) => {
          _this.EcoSecondList = res;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的社会经济二级目录列表
    QuerySociety() {
      let _this = this;
      _this.FormData.SocSecondId = "";
      let params = new URLSearchParams();
      params.append("FirstId", this.FormData.SocFirstId);
      QuerySecondList(params)
        .then((res) => {
          _this.SocietyList = res;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的国民经济三级列表
    QueryEconomic() {
      let _this = this;
      _this.FormData.EconomicId = "";
      let params = new URLSearchParams();
      params.append("SecondId", this.FormData.EcoSecondId);
      QueryEconomicList(params)
        .then((res) => {
          _this.EconomicList = res;
        })
        .catch((failResponse) => {});
    },
    initSchool2() {
      //初始化校级项目来源
      let params = new URLSearchParams();
      params.append("LevelId", this.LevelId);
      getSourceList(params)
        .then((res) => {
          //closeDebug console.log("LevelList初始化", obj);
          this.SourceList = res;
        })
        .catch((failResponse) => {});
    },
    //下一步
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++;
        } else {
          this.$message({
            message: "信息有遗漏，请检查该板块",
            type: "error",
          });
          return false;
        }
      });
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
          let filesList = this.FormData.SubjectFileList;
          data2upload.append("SubjectNum", this.FormData.SubjectNum);
          data2upload.append("SubjectName", this.FormData.SubjectName);
          data2upload.append("SubjectType", this.RankName);
          data2upload.append("SubjectTime", this.FormData.SubjectTime);
          data2upload.append("StartTime", this.FormData.StartTime);
          data2upload.append("FinishTime", this.FormData.FinishTime);
          data2upload.append("SubjectPaper", this.FormData.SubjectPaper);
          data2upload.append("Remarks", this.FormData.Remarks);
          data2upload.append("SubjectPlace", this.t_sector);

          data2upload.append("RankId", this.FormData.RankId);
          data2upload.append("LevelId", this.LevelId);
          for (let i = 0; i < this.FormData.domains.length; i++) {
            data2upload.append("userids[]", this.FormData.domains[i].value);
          }

          //项目经费
          data2upload.append("SubjectFund", this.FormData.SubjectFund);
          data2upload.append("HardwareFund", this.FormData.HardwareFund);
          data2upload.append("SoftwareFund", this.FormData.SoftwareFund);
          data2upload.append("StaySchoolFund", this.FormData.StaySchoolFund);
          data2upload.append("OutboundFund", this.FormData.OutboundFund);

          //校级项目表单
          data2upload.append("EconomicId", this.FormData.EconomicId);
          data2upload.append("SocietyId", this.FormData.SocietyId);
          data2upload.append("SourceId", this.FormData.SourceId);
          data2upload.append("BelongId", this.FormData.BelongId);
          data2upload.append("TypeId", this.FormData.TypeId);
          data2upload.append("CooperateId", this.FormData.CooperateId);
          data2upload.append("ResearchId", this.FormData.ResearchId);

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
                // _this.goback();
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
          teaNo: "",
          roleName: "",
          collegeName: "",
          sectorName: "",
          key: Date.now(),
        });
      }
    },
    //处理已上传图片与表单内容的同步
    handleChange(file, FileList) {
      //closeDebug console.log("添加图片后", file, FileList);
      this.FormData.SubjectFileList = FileList;
    },
    //处理已上传的图片的删除
    handleRemove(file, FileList) {
      //closeDebug console.log("删除图片后", file, FileList);
    },
    //处理已上传的图片的点击预览
    handlePreview(file) {
      //closeDebug console.log("点击预览了", file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //处理上传图片超过限制
    handleExceed(files, FileList) {
      //closeDebug console.log("数量超出限制时", files, FileList);
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
