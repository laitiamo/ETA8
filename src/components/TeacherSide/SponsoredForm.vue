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
      <h3>参与者选择</h3>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="项目负责人">
            <el-input
              v-model="username"
              style="width:140px"
              placeholder="请输入项目第一参与者"
              readonly
            ></el-input>
            <el-input
              v-model="name"
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
              style="width:140px"
            >
              <el-option label="全部教师" value=""></el-option>
              <el-option
                v-for="opt in TeacherList"
                :key="opt.id"
                :label="opt.teaName"
                :value="opt.userId"
              ></el-option>
            </el-select>
            <el-button @click="addDomain">新增</el-button>
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
          <el-form-item label="立项时间" prop="subjectTime">
            <el-date-picker
              v-model="FormData.subjectTime"
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
          <el-form-item label="委托单位性质" prop="entrustPlaceId">
            <el-select
              v-model="FormData.entrustPlaceId"
              placeholder="请选择委托单位性质"
              style="display: block"
            >
              <template v-for="rankEach in entrustList">
                <el-option
                  :key="rankEach.id"
                  :label="rankEach.entrustName"
                  :value="rankEach.id"
                ></el-option>
              </template>
            </el-select>
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
      </el-row>
      <el-row :gutter="20">
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
          <el-form-item label="课题类型" prop="topicId">
            <el-select
              v-model="FormData.topicId"
              placeholder="请选择课题类型"
              style="display: block"
            >
              <template v-for="rankEach in TopicList">
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

      <el-divider></el-divider>
      <h3>合作单位</h3>
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
          <el-form-item label="合同编号" prop="contractId">
            <el-input
              v-model="FormData.contractId"
              placeholder="请输入合同编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="经费号" prop="fundId">
            <el-input
              v-model="FormData.fundId"
              placeholder="请输入经费号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="合同名称" prop="contractName">
            <el-input
              v-model="FormData.contractName"
              placeholder="请输入合同名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="合同类别" prop="contractType">
            <el-select
              v-model="FormData.contractType"
              placeholder="请选择合同类别"
              style="display: block"
            >
              <template v-for="rankEach in contractList">
                <el-option
                  :label="rankEach.typename"
                  :value="rankEach.id"
                  :key="rankEach.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
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
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="是否办理减免税" prop="isDutyFree">
            <el-radio-group v-model="FormData.isDutyFree">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item
            label="减免税号"
            prop="DutyFreeId"
            v-if="FormData.isDutyFree == 1"
          >
            <el-input
              v-model="FormData.DutyFreeId"
              placeholder="请输入减免税号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="是否希望科技处推广" prop="isPromote">
            <el-radio-group v-model="FormData.isPromote">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="双方违约责任" prop="dutyBreachContract">
            <el-input
              v-model="FormData.dutyBreachContract"
              placeholder="请输入双方违约责任"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <h4>技术市场信息</h4>
      <el-row :gutter="20">
        <el-col class="subject-info" :span="12" :xs="24">
          <el-form-item label="请选择支付方式" prop="payId">
            <el-radio-group v-model="FormData.payId">
              <el-radio label="1">一次支付</el-radio>
              <el-radio label="2">提成支付</el-radio>
              <el-radio label="3">分期支付</el-radio>
            </el-radio-group>
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
          <el-form-item label="计划来源一级" prop="SourceId">
            <el-select
              v-model="FormData.SourceId"
              placeholder="请选择计划来源一级"
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
          <el-form-item label="技术邻域分类一级" prop="technicalTypeId">
            <el-select
              v-model="FormData.technicalTypeId"
              placeholder="请选择技术邻域分类一级"
              style="display: block"
            >
              <template v-for="rankEach in TechnicalList">
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
          <el-form-item label="知识产权类别一级" prop="PropertyId">
            <el-select
              v-model="FormData.PropertyId"
              placeholder="请选择技术邻域分类一级"
              style="display: block"
            >
              <template v-for="rankEach in PropertyList">
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

      <el-dialog :visible.sync="dialogVisible" width="90%">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <el-form-item label="项目附件" required prop="subjectFileList">
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
          list-type="text"
          accept=".PDF"
          :limit="5"
        >
          <el-button size="small">上传附件</el-button>
          <div slot="tip" class="el-upload__tip">
            只支持上传PDF文件，总大小不超过10MB，最多上传5份附件
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
import { mapGetters } from "vuex";
import {
  getRankList,
  getSponsorList,
  uploadSchool,
  getSourceList,
  initSubject,
  initSponsored,
  getFirstSubjectList,
  QuerySecondList,
  QueryEconomicList,
} from "../../api";
export default {
  name: "SponsoredForm",
  data() {
    return {
      submitButton: false,
      RankId: 1,
      RankName: "纵向项目",
      fileList: [], //已上传的文件列表
      rankList: [], //项目类别的列表「从后端取得」
      TeacherList: [], //教师列表「从后端取得」
      SourceList: [], //项目来源列表「从后端取得」
      CooperateList: [], //合作单位列表「从后端取得」
      BelongList: [], //统计归属列表「从后端取得」
      ResearchList: [], //研究方向列表「从后端取得」
      TypeList: [], //一级学科列表「从后端取得」
      entrustList: [], //委托单位列表「从后端取得」

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
            value: "",
          },
        ],
        subjectName: "",
        subjectNum: "",
        levelId: "",

        //项目经费
        subjectFund: "",
        hardwareFund: "",
        softwareFund: "",
        staySchoolFund: "",
        outboundFund: "",

        //项目描述
        subjectPlace: "",
        ResearchId: "",
        subjectTime: "",
        startTime: "",
        FinishTime: "",

        isSecrecy: "",
        isVoucher: "",
        isSubmitFill: "",
        isDutyFree: "",

        SocFirstId: "",
        SocietyId: "",
        EcoFirstId: "",
        EcoSecondId: "",
        EconomicId: "",

        entrustPlaceId: "",
        applicationCode: "",
        introduction: "",

        TypeId: "",
        researchType: "",
        topicId: "",
        mainProjectName: "",
        remarks: "",
        cooperateId: "",
        contractFund: "",
        cooperatePrincipal: "",
        sourceId: "",
        bankName: "",
        bankAccount: "",
        subjectFileList: [],
        subjectType: 1,
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        //基础信息
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

        entrustPlaceId: [
          { required: true, message: "请选择委托单位", trigger: "blur" },
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
        startTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        FinishTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],

        subjectFileList: [
          { required: true, message: "请选择图片", trigger: "blur" },
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
        sourceId: [
          { required: true, message: "请选择项目来源", trigger: "blur" },
        ],
        TypeId: [
          { required: true, message: "请选择一级学科", trigger: "blur" },
        ],
        cooperateId: [
          { required: true, message: "请选择合作单位", trigger: "blur" },
        ],
        ResearchId: [
          { required: true, message: "请选择研究方向", trigger: "blur" },
        ],
        BelongId: [
          { required: true, message: "请选择统计归属", trigger: "blur" },
        ],
        topicId: [
          { required: true, message: "请选择课题类型", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //图片预览的url
      dialogVisible: false, //是否显示预览
    };
  },
  computed: {
    ...mapGetters(["name", "username"]),
  },
  mounted() {
    this.initSponsored();
    this.initSponsored2();
  },
  methods: {
    //初始化奖项等级列表
    initSponsored() {
      let _this = this;
      //初始化项目类别列表
      getRankList()
        .then((res) => {
          let obj1 = JSON.parse(res.msg);
          //closeDebug console.log("LevelList初始化", obj);
          this.rankList = obj1.rank;
        })
        .catch((failResponse) => {});
      initSubject()
        .then((res) => {
          let obj2 = JSON.parse(res.msg);
          //closeDebug console.log("teacherList初始化", obj);
          this.TopicList = obj2.topic;
          this.TeacherList = obj2.teacher;
          this.EcoFirstList = obj2.ecofirst;
          this.SocFirstList = obj2.socfirst;
        })
        .catch((failResponse) => {});
      initSponsored()
        .then((res) => {
          let obj3 = JSON.parse(res.msg);
          //closeDebug console.log("teacherList初始化", obj);
          this.BelongList = obj3.belong;
          this.CooperateList = obj3.cooperate;
          this.ResearchList = obj3.research;
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
    initSponsored2() {
      let _this = this;
      //初始化校级项目来源
      let params = new URLSearchParams();
      params.append("rankId", this.RankId);
      getSourceList(params)
        .then((res) => {
          //closeDebug console.log("LevelList初始化", obj);
          _this.SourceList = res;
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
          let filesList = this.FormData.subjectFileList;
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
      this.FormData.subjectFileList = fileList;
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
