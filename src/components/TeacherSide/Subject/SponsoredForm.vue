<template>
  <div class="SponsoredForm">
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
            @change="Score"
            placeholder="请输入项目申请经费"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目硬件经费" prop="HardwareFund"
          ><el-input
            type="text"
            v-model="FormData.HardwareFund"
            @change="Score"
            placeholder="请输入项目硬件经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="项目软件经费" prop="SoftwareFund">
          <el-input
            type="text"
            v-model="FormData.SoftwareFund"
            @change="Score"
            placeholder="请输入项目软件经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="留校经费" prop="StaySchoolFund">
          <el-input
            type="text"
            v-model="FormData.StaySchoolFund"
            @change="Score"
            placeholder="请输入留校经费"
          ></el-input
        ></el-form-item>
        <el-form-item label="外拨经费" prop="OutboundFund">
          <el-input
            type="text"
            v-model="FormData.OutboundFund"
            @change="Score"
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
            <el-form-item label="所属单位" prop="SubjectPlace">
              <el-input
                v-model="SubjectPlace"
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
            <el-form-item label="预计完成时间" prop="FinishTime">
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="委托单位性质" prop="EntrustPlaceId">
              <el-select
                v-model="FormData.EntrustPlaceId"
                placeholder="请选择委托单位性质"
                style="display: block"
              >
                <template v-for="rankEach in EntrustList">
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
            <el-form-item label="课题类型" prop="TopicId">
              <el-select
                v-model="FormData.TopicId"
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
            <el-form-item label="主项目名称" prop="MainProjectName">
              <el-input
                v-model="FormData.MainProjectName"
                placeholder="请输入主项目名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="申请代码" prop="ApplicationCode">
              <el-input
                v-model="FormData.ApplicationCode"
                placeholder="请输入项目申请代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="项目简介" prop="Introduction">
              <el-input
                type="textarea"
                v-model="FormData.Introduction"
                placeholder="请输入项目简介"
              ></el-input>
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

        <el-divider></el-divider>
        <h3>合作单位</h3>
        <el-row :gutter="20">
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

          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="经费号" prop="FundNum">
              <el-input
                v-model="FormData.FundNum"
                placeholder="请输入经费号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="合同编号" prop="ContractNum">
              <el-input
                v-model="FormData.ContractNum"
                placeholder="请输入合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="合同名称" prop="ContractName">
              <el-input
                v-model="FormData.ContractName"
                placeholder="请输入合同名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="合同类别" prop="ContractId">
              <el-select
                v-model="FormData.ContractId"
                placeholder="请选择合同类别"
                style="display: block"
              >
                <template v-for="rankEach in ContractList">
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
            <el-form-item label="合同金额（元）" prop="ContractFund">
              <el-input
                v-model="FormData.ContractFund"
                placeholder="请输入合同金额（元）"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="负责人" prop="CooperatePrincipal">
              <el-input
                v-model="FormData.CooperatePrincipal"
                placeholder="请输入负责人"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="银行名称" prop="BankName">
              <el-input
                v-model="FormData.BankName"
                placeholder="请输入银行名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="银行账号" prop="BankAccount">
              <el-input
                v-model="FormData.BankAccount"
                placeholder="请输入银行账号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="双方违约责任" prop="ContractDuty">
              <el-input
                type="textarea"
                v-model="FormData.ContractDuty"
                placeholder="请输入双方违约责任"
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

    <template v-if="active > 3">
      <el-divider></el-divider>
      <el-form
        :model="FormData"
        :rules="rules"
        label-position="top"
        ref="FormData"
        size="medium"
        class="demo-FormData"
      >
        <h4>技术市场信息</h4>
        <el-row :gutter="20">
          <el-col class="subject-info" :span="12" :xs="24">
            <el-form-item label="请选择支付方式" prop="PayId">
              <el-radio-group v-model="FormData.PayId">
                <el-radio label="1">一次支付</el-radio>
                <el-radio label="2">分期支付</el-radio>
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
            <el-form-item label="技术邻域分类一级" prop="TechnicalId">
              <el-select
                v-model="FormData.TechnicalId"
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
          <el-button
            @click="
              cancelUpload('FormData');
              goback();
            "
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getRankList,
  uploadSponsored,
  getSourceList,
  initSubject,
  initSponsored,
  getFirstSubjectList,
  QuerySecondList,
  QueryEconomicList,
  getTeacherDetail,
} from "../../../api";
export default {
  name: "SponsoredForm",
  data() {
    return {
      active: 0,
      submitButton: false,
      LevelId: 1,
      RankName: "纵向项目",
      SubjectPlace: "东南大学成贤学院", //所属单位
      FileList: [], //已上传的文件列表
      RankList: [], //项目类别的列表「从后端取得」

      PaperList: [], //成果形式的列表「从后端取得」
      TeacherList: [], //教师列表「从后端取得」
      ResearchList: [], //研究方向列表「从后端取得」
      BelongList: [], //统计归属列表「从后端取得」
      TypeList: [], //一级学科列表「从后端取得」

      EntrustList: [], //委托单位列表「从后端取得」
      TopicList: [], //课题类型
      CooperateList: [], //合作单位列表「从后端取得」
      ContractList: [], //合同列表「从后端取得」
      EcoFirstList: [], //国民经济一级目录
      EcoSecondList: [], //国民经济二级目录
      EconomicList: [], //国民经济行业列表「从后端取得」
      SocFirstList: [], //社会经济一级目录
      SocietyList: [], //社会经济服务目标列表「从后端取得」
      SourceList: [], //项目来源列表「从后端取得」
      TechnicalList: [], //技术邻域分类一级列表「从后端取得」
      PropertyList: [], //知识产权类别一级「从后端取得」

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
        SubjectName: "", //项目名称
        SubjectNum: "", //项目编号
        RankId: "", //项目等级

        //项目经费
        SubjectFund: "", //批准经费
        HardwareFund: "", //硬件经费
        SoftwareFund: "", //软件经费
        StaySchoolFund: "", //留校经费
        OutboundFund: "", //外拨经费

        //项目描述
        SubjectPaper: "", //成果形式
        ResearchId: "", //研究类别
        isSecrecy: "", //是否保密
        isVoucher: "", //是否开发票或收据
        isSubmitFill: "", //是否交科技处存档
        isPromote: "", //是否希望科技处推广
        isDutyFree: "", //此合同是否可以进行技术认证并免税
        DutyFreeId: "", //减免税号
        SubjectTime: "", //立项时间
        StartTime: "", //开始时间
        FinishTime: "", //预计完成时间

        //教育部统计信息
        BelongId: "", //统计归属
        TypeId: "", //一级学科
        EntrustPlaceId: "", //委托单位性质
        TopicId: "", //课题类型
        MainProjectName: "", //主项目名称
        ApplicationCode: "", //申请代码
        Introduction: "", //项目简介
        Remarks: "", //备注

        //合作单位
        CooperateId: "", //合作单位
        ContractNum: "", //合同编号
        FundNum: "", //经费编号
        ContractName: "", //合同名称
        ContractId: "", //合同类型
        ContractFund: "", //合同经费
        CooperatePrincipal: "", //合同负责人
        BankName: "", //银行名称
        BankAccount: "", //银行账号
        ContractDuty: "", //双方违约责任

        //技术市场信息
        PayId: "", //支付方式
        EcoFirstId: "", //国民经济行业
        EcoSecondId: "", //国民经济行业二级目录
        EconomicId: "", //国民经济行业三级目录
        SocFirstId: "", //社会经济服务目标一级目录
        SocietyId: "", //社会经济服务目标二级目录
        SourceId: "", //计划来源一级
        TechnicalId: "", //技术邻域分类一级
        PropertyId: "", //知识产权类别一级
        SubjectFileList: [], //项目附件
      },
      //<el-form-item>标签的prop值的校验规则
      rules: {
        //项目申报基础信息
        SubjectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur",
          },
        ],
        SubjectNum: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        RankId: [
          { required: true, message: "请选择项目等级", trigger: "change" },
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

        //项目描述
        SubjectPaper: [
          {
            required: true,
            message: "请选择成果形式",
            trigger: "blur",
          },
        ],
        ResearchId: [
          { required: true, message: "请选择研究方向", trigger: "blur" },
        ],
        isSecrecy: [
          { required: true, message: "请选择是否保密", trigger: "blur" },
        ],
        isVoucher: [
          {
            required: true,
            message: "请选择是否开发票或收据",
            trigger: "blur",
          },
        ],
        isSubmitFill: [
          {
            required: true,
            message: "请选择是否交科技处存档",
            trigger: "blur",
          },
        ],
        isPromote: [
          {
            required: true,
            message: "请选择是否希望科技处推广",
            trigger: "blur",
          },
        ],
        isDutyFree: [
          { required: true, message: "请选择是否减免税", trigger: "blur" },
        ],
        DutyFreeId: [
          { required: false, message: "请输入减免税号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
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

        //教育部统计信息
        BelongId: [
          { required: true, message: "请选择统计归属", trigger: "blur" },
        ],
        TypeId: [
          { required: true, message: "请选择一级学科", trigger: "blur" },
        ],
        EntrustPlaceId: [
          { required: true, message: "请选择委托单位", trigger: "blur" },
        ],
        TopicId: [
          { required: true, message: "请选择课题类型", trigger: "blur" },
        ],
        MainProjectName: [
          { required: false, message: "请输入主项目名称", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],
        ApplicationCode: [
          { required: false, message: "请输入申请代码", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],
        Introduction: [
          { required: true, message: "请输入项目简介", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],
        Remarks: [
          { required: false, message: "请输入备注", trigger: "blur" },
          { min: 3, message: "长度在 3 位数以上", trigger: "blur" },
        ],

        //合作单位
        CooperateId: [
          { required: true, message: "请选择合作单位", trigger: "blur" },
        ],
        ContractNum: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        FundNum: [
          { required: true, message: "请输入经费编号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        ContractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        ContractId: [
          { required: true, message: "请选择合同类型", trigger: "blur" },
        ],
        ContractFund: [
          { required: true, message: "请输入合同经费", trigger: "blur" },
          { min: 3, max: 6, message: "金额在 3 到 6 位数", trigger: "blur" },
        ],
        CooperatePrincipal: [
          { required: true, message: "请输入合作单位负责人", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        BankName: [
          { required: true, message: "请输入开户银行", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        BankAccount: [
          { required: true, message: "请输入银行账号", trigger: "blur" },
          {
            min: 15,
            max: 20,
            message: "长度在 15 到 20 个字符",
            trigger: "blur",
          },
        ],
        ContractDuty: [
          { required: true, message: "请输入违约金", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "金额在 2 到 8 位数",
            trigger: "blur",
          },
        ],

        //技术市场信息
        PayId: [{ required: true, message: "请选择付款方式", trigger: "blur" }],
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
          { required: true, message: "请选择项目来源", trigger: "blur" },
        ],
        TechnicalId: [
          {
            required: true,
            message: "请选择技术邻域分类一级",
            trigger: "blur",
          },
        ],
        PropertyId: [
          {
            required: true,
            message: "请选择知识产权分类一级",
            trigger: "blur",
          },
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
          //closeDebug console.log("RankList初始化", obj);
          this.RankList = obj1.rank;
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
          this.BelongList = obj2.belong;
          this.PaperList = obj2.paper;
        })
        .catch((failResponse) => {});
      initSponsored()
        .then((res) => {
          let obj3 = JSON.parse(res.msg);
          //closeDebug console.log("CooperateList初始化", obj);
          this.CooperateList = obj3.cooperate;
          this.ContractList = obj3.contract;
          this.EntrustList = obj3.entrust;
          this.ResearchList = obj3.research;
          this.PropertyList = obj3.property;
          this.TechnicalList = obj3.technical;
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
      params.append("LevelId", this.LevelId);
      getSourceList(params)
        .then((res) => {
          //closeDebug console.log("LevelList初始化", obj);
          _this.SourceList = res;
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
          //上传项目基础信息（项目申报）
          data2upload.append("SubjectNum", this.FormData.SubjectNum);
          data2upload.append("SubjectName", this.FormData.SubjectName);
          data2upload.append("SubjectType", this.RankName);
          data2upload.append("RankId", this.FormData.RankId);
          data2upload.append("LevelId", this.LevelId); //项目的等级id（横向纵向）
          for (let i = 0; i < this.FormData.domains.length; i++) {
            data2upload.append("userids[]", this.FormData.domains[i].value);
          }

          //项目经费
          data2upload.append("SubjectFund", this.FormData.SubjectFund);
          data2upload.append("HardwareFund", this.FormData.HardwareFund);
          data2upload.append("SoftwareFund", this.FormData.SoftwareFund);
          data2upload.append("StaySchoolFund", this.FormData.StaySchoolFund);
          data2upload.append("OutboundFund", this.FormData.OutboundFund);

          //项目描述
          data2upload.append("SubjectPlace", this.SubjectPlace);
          data2upload.append("SubjectPaper", this.FormData.SubjectPaper);
          data2upload.append("ResearchId", this.FormData.ResearchId);
          data2upload.append("isSecrecy", this.FormData.isSecrecy);
          data2upload.append("isVoucher", this.FormData.isVoucher);
          data2upload.append("isSubmitFill", this.FormData.isSubmitFill);
          data2upload.append("isPromote", this.FormData.isPromote);
          data2upload.append("isDutyFree", this.FormData.isDutyFree);
          data2upload.append("DutyFreeId", this.FormData.DutyFreeId);
          data2upload.append("SubjectTime", this.FormData.SubjectTime);
          data2upload.append("StartTime", this.FormData.StartTime);
          data2upload.append("FinishTime", this.FormData.FinishTime);

          //教育部统计信息
          data2upload.append("BelongId", this.FormData.BelongId);
          data2upload.append("TypeId", this.FormData.TypeId);
          data2upload.append("EntrustPlaceId", this.FormData.EntrustPlaceId);
          data2upload.append("TopicId", this.FormData.TopicId);
          data2upload.append("MainProjectName", this.FormData.MainProjectName);
          data2upload.append("ApplicationCode", this.FormData.ApplicationCode);
          data2upload.append("Introduction", this.FormData.Introduction);

          //合作单位表单
          data2upload.append("CooperateId", this.FormData.CooperateId);
          data2upload.append("ContractNum", this.FormData.ContractNum);
          data2upload.append("FundNum", this.FormData.FundNum);
          data2upload.append("ContractName", this.FormData.ContractName);
          data2upload.append("ContractId", this.FormData.ContractId);
          data2upload.append("Remarks", this.FormData.Remarks);
          data2upload.append("ContractFund", this.FormData.ContractFund);
          data2upload.append(
            "CooperatePrincipal",
            this.FormData.CooperatePrincipal
          );
          data2upload.append("BankName", this.FormData.BankName);
          data2upload.append("BankAccount", this.FormData.BankAccount);
          data2upload.append("ContractDuty", this.FormData.ContractDuty);

          //技术市场信息
          data2upload.append("PayId", this.FormData.PayId);
          data2upload.append("EconomicId", this.FormData.EconomicId);
          data2upload.append("SocietyId", this.FormData.SocietyId);
          data2upload.append("SourceId", this.FormData.SourceId);
          data2upload.append("TechnicalId", this.FormData.TechnicalId);
          data2upload.append("PropertyId", this.FormData.PropertyId);

          //循环加入多文件
          for (let i = 0; i < filesList.length; i++) {
            data2upload.append("file", filesList[i].raw, filesList[i].raw.name);
          }

          uploadSponsored(data2upload)
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
