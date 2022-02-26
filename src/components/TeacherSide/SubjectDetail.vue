<template>
  <div>
    <el-page-header @back="goback()" content="项目详情页"> </el-page-header>
    <el-divider></el-divider>
    <el-card class="box-card">
      <el-divider content-position="left"
        ><span class="div-font">负责人教师信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >教职工号：{{ detailData.username }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >姓名：{{ detailData.name }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >性别：{{ detailData.gender }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >单位：{{ detailData.place }}</el-col
        >
      </el-row>
      <el-divider content-position="left"
        ><span class="div-font">项目基础信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >项目名称：{{ detailData.subject }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目参与者：{{ detailData.writer }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目类型：{{ detailData.rank }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目经费：{{ detailData.fund }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目级别：{{ detailData.level }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >发表时间：{{ detailData.time }}</el-col
        >
      </el-row>

      <template v-if="detailData.levelId == 3">
        <el-divider content-position="left"
          ><span class="div-font">校级项目</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >项目来源：{{ detailData.Source }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合作单位：{{ detailData.Cooperate }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >统计归属：{{ detailData.Belong }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >一级学科：{{ detailData.Type }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >备注：{{ detailData.Remarks }}</el-col
          >
        </el-row>
      </template>
      <template v-if="detailData.levelId == 2">
        <el-row :gutter="20">
          <el-divider content-position="left"
            ><span class="div-font">项目描述</span>
          </el-divider>
          <el-col class="detail-info" :span="12" :xs="24"
            >项目简介：{{ detailData.Introduction }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >依托中心项目：{{ detailData.RelyCenterSubject }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >委托单位性质：{{ detailData.EntrustName }}</el-col
          >
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">合作单位</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >合同名称：{{ detailData.ContractName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >负责人：{{ detailData.CooperatePrincipal }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同编号：{{ detailData.ContractNum }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >经费号：{{ detailData.FundNum }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合作单位：{{ detailData.CooperateName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同类别：{{ detailData.ContractType }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行名称：{{ detailData.BankName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行账号：{{ detailData.BankAccount }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >双方违约责任：{{ detailData.ContractDuty }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >是否希望科技处推广：{{ detailData.IsPromote }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >此合同是否可以进行技术认证并免税：{{
              detailData.IsDutyFree
            }}</el-col
          >
          <el-col
            class="detail-info"
            :span="12"
            :xs="24"
            v-if="detailData.IsDutyFree == '是'"
            >减免税号：{{ detailData.DutyFreeId }}</el-col
          >
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">技术市场信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >支付方式：{{ detailData.Pay }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >国民经济行业：{{ detailData.EconomicName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >社会经济服务目标：{{ detailData.SocietyName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >计划来源一级：{{ detailData.SourceName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >技术邻域分类一级：{{ detailData.TechnicalName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >知识产权类别一级：{{ detailData.PropertyName }}</el-col
          >
        </el-row>
      </template>
      <template v-if="detailData.levelId == 1">
        <!-- <el-divider> -->
        <el-row :gutter="20">
          <el-divider content-position="left"
            ><span class="div-font">项目描述</span></el-divider
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >研究类别：{{ detailData.ResearchName }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >是否保密：{{ detailData.IsSecrecy }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >是否开发票或收据：{{ detailData.IsVoucher }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >是否交科技处存档：{{ detailData.IsSubmitFill }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >是否希望科技处推广：{{ detailData.IsPromote }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >此合同是否可以进行技术认证并免税：{{
              detailData.IsDutyFree
            }}</el-col
          >
          <el-col
            class="detail-info"
            :span="12"
            :xs="24"
            v-if="detailData.IsDutyFree == '是'"
            >减免税号：{{ detailData.DutyFreeId }}</el-col
          >
        </el-row>

        <el-divider content-position="left"
          ><span class="div-font">教育部统计信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >统计归属：{{ detailData.BelongName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >一级学科：{{ detailData.TypeName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >委托单位性质：{{ detailData.EntrustName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >课题类型：{{ detailData.TopicName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >主项目名称：{{ detailData.MainProjectName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >申请代码：{{ detailData.ApplicationCode }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >项目简介：{{ detailData.Introduction }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >备注：{{ detailData.Remarks }}</el-col
          >
        </el-row>

        <el-divider content-position="left"
          ><span class="div-font">合作单位</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >合作单位：{{ detailData.CooperateName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同编号：{{ detailData.ContractNum }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >经费编号：{{ detailData.FundNum }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同名称：{{ detailData.ContractName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同类型：{{ detailData.ContractType }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同经费：{{ detailData.ContractFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同负责人：{{ detailData.CooperatePrincipal }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行名称：{{ detailData.BankName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行账号：{{ detailData.BankAccount }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >双方违约责任：{{ detailData.ContractDuty }}</el-col
          >
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">技术市场信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >支付方式：{{ detailData.Pay }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >国民经济行业：{{ detailData.EconomicName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >社会经济服务目标：{{ detailData.SocietyName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >计划来源：{{ detailData.SourceName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >技术邻域分类一级：{{ detailData.TechnicalName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >知识产权类别：{{ detailData.PropertyName }}</el-col
          >
        </el-row>
      </template>
      <el-divider content-position="left"
        ><span class="div-font">审核信息</span></el-divider
      >

      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24"
          >上传时间：{{ detailData.createAt }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >计划结项时间：{{ detailData.finishAt }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核状态：{{ detailData.review }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >审核时间：{{ detailData.reviewAt }}</el-col
        >
      </el-row>
      <template v-if="detailData.reviewId !== 1">
        <el-divider content-position="left"
          ><span class="div-font">成果信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >成果形式：{{ detailData.PaperType }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >成果名称：{{ detailData.Paper }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >成果审核状态：{{ detailData.PaperReview }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >成果审核时间：{{ detailData.PaperReviewAt }}</el-col
          >
        </el-row>
      </template>
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24">
          <el-button type="primary" @click="onExportFile" :loading="loading"
            >导出附件</el-button
          ></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { exportTeaSubjectPDF } from "../../api";
export default {
  name: "SubjectDetail",
  data(){
    return{
      loading:false,
    }
  },
  props: {
    detailData: {},
    goback: { type: Function },
  },
  methods: {
    //处理导出附件
    onExportFile() {
      //closeDebug console.log("export XLS:", this.form2Query);
      //参数绑定「筛选参数」
      this.loading = true;
      let params = new URLSearchParams();
      params.append("id", this.detailData.id); //年级
      exportTeaSubjectPDF(params)
        .then((res) => {
          //closeDebug console.log("-----------导出学生奖项表格文件---------------");
          //closeDebug console.log(res);
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          //new一个时间对象
          var nowDate = new Date().toLocaleDateString();
          downloadElement.download = decodeURIComponent(
            nowDate + "_" + this.detailData.subject + ".zip"
          );
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
          this.loading = false;
        })
        .catch((failResponse) => {});
    },
  },
};
</script>
<style>
.div-font {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}
.detail-info {
  margin: 5px 0 10px 0;
  font-weight: normal;
  font-size: 0.9em;
}
.image-row {
  width: auto;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.row-container {
  min-height: 30px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(156, 156, 156, 0.849);
  margin-left: 10%;
  margin-right: 10%;
}
.row-title {
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}
.row-content {
  text-align: center;
  font-size: 0.9rem;
}
</style>
