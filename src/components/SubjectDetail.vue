<template>
  <div>
    <el-page-header @back="goback()" content="项目详情页"> </el-page-header>
    <el-divider></el-divider>
    <el-card class="box-card">
      <el-divider content-position="left"
        ><span class="div-font">项目负责人信息</span></el-divider
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
        <el-col class="detail-info" :span="12" :xs="24"
          >学院：{{ detailData.college }}</el-col
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
        <el-col
          class="detail-info"
          :span="12"
          :xs="24"
          v-if="detailData.levelId !== 2"
          >项目类型：{{ detailData.rank }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >项目级别：{{ detailData.level }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >发表时间：{{ detailData.time }}</el-col
        >
        <el-col class="detail-info" :span="12" :xs="24"
          >成果形式：{{ detailData.SubjectPaper }}</el-col
        >
      </el-row>

      <template v-if="detailData.levelId == 3">
        <el-divider content-position="left"
          ><span class="div-font">预计经费</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >项目批准经费（万）：{{ detailData.fund }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >办公、图文制作、邮费（万）：{{ detailData.DocumentFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >学生劳务费（万）：{{ detailData.LaborFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >材料、测试加工、维修费（万）：{{ detailData.MaterialFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >设备购置（万）：{{ detailData.HardwareFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >差旅、会议、国际合作交流（万）：{{
              detailData.OutboundFund
            }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >资料费、版面费、知识产权等（万）：{{
              detailData.PatentFund
            }}</el-col
          >
        </el-row>
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
        <el-divider content-position="left"
          ><span class="div-font">预计经费</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >软件经费（万）：{{ detailData.SoftwareFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >设备经费（万）：{{ detailData.HardwareFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >外协经费（万）：{{ detailData.OutboundFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24">
            技术开发费（万）：{{ detailData.DevelopFund }}
          </el-col>
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">合同预算</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24">
            合同金额（万）：{{ detailData.ContractFund }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            课题组/校内人员费（万）：{{ detailData.ResearchFund }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            劳务费（万）：{{ detailData.ServiceFund }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            其他支出（万）：{{ detailData.OtherFund }}
          </el-col>
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">项目描述</span>
        </el-divider>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >横向项目性质：{{ detailData.BelongName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >委托单位性质：{{ detailData.EntrustName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同类别：{{ detailData.SecContractType }}</el-col
          >
          <el-col
            class="detail-info"
            :span="12"
            :xs="24"
            v-if="detailData.SecContractType == '专利技术转让'"
          >
            拓展合同类别：{{ detailData.ThirdContractType }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >签订时间：{{ detailData.SignTime }}</el-col
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
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >项目简介：{{ detailData.Introduction }}</el-col
          >
        </el-row>
        <el-divider content-position="left"
          ><span class="div-font">买方信息</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24">
            买方名称：{{ detailData.BuyerName }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            买方性质：{{ detailData.BuyerType }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            买方邮编：{{ detailData.BuyerPostCode }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            买方联系人：{{ detailData.BuyerContact }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            买方联系方式：{{ detailData.BuyerTel }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            法定代表人：{{ detailData.BuyerLegalPerson }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            法人代码：{{ detailData.BuyerLegalEntityCode }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            电子邮件：{{ detailData.BuyerEmail }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            注册地址：{{ detailData.BuyerRegisteredAddress }}
          </el-col>
          <el-col class="detail-info" :span="12" :xs="24">
            通信地址：{{ detailData.BuyerMailingAddress }}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24">
            买方国家：{{ detailData.BuyerCountry }}
          </el-col>
          <template v-if="detailData.BuyerCountry == 13">
            <el-col class="detail-info" :span="12" :xs="24">
              买方省份：{{ detailData.BuyerProvince }}
            </el-col>
            <el-col class="detail-info" :span="12" :xs="24">
              买方地市：{{ detailData.BuyerCity }}
            </el-col>
            <el-col class="detail-info" :span="12" :xs="24">
              买方县区：{{ detailData.BuyerCounty }}
            </el-col>
          </template>
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
        <el-divider content-position="left"
          ><span class="div-font">项目经费详情</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >硬件费用（万）：{{ detailData.HardwareFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >留校经费（万）：{{ detailData.StaySchoolFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >外拨费用（万）：{{ detailData.OutboundFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >批准经费（万）：{{ detailData.fund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >资料费（万）：{{ detailData.DocumentFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >数据采集费（万）：{{ detailData.DataFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >差旅费（万）：{{ detailData.OutboundFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >会议费（万）：{{ detailData.MeetingFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >国际合作与交流费（万）：{{ detailData.InternationalFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >设备购置费（万）：{{ detailData.DeviceFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >专家咨询费（万）：{{ detailData.ConsultFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >劳务费（万）：{{ detailData.LaborFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >印刷费（万）：{{ detailData.MaterialFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >管理费（万）：{{ detailData.PatentFund }}</el-col
          >
        </el-row>

        <el-divider content-position="left"
          ><span class="div-font">项目描述</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >课题类型：{{ detailData.TopicName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >项目分类：{{ detailData.CategoryName }} --
            {{ detailData.SecCategoryName }}</el-col
          ></el-row
        ><el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >主项目名称：{{ detailData.MainProjectName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >主课题名称：{{ detailData.MainSubjectName }}</el-col
          > </el-row
        ><el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >委托单位：{{ detailData.EntrustName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >申请代码：{{ detailData.ApplicationCode }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >研究领域：{{ detailData.ResearchAreaName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >项目简介：{{ detailData.Introduction }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >备注：{{ detailData.Remarks }}</el-col
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
            >是否办理减免税：{{ detailData.IsDutyFree }}</el-col
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
            >纵向项目性质：{{ detailData.BelongName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >项目来源：{{ detailData.SourceName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >一级学科：{{ detailData.FirstType }} --
            {{ detailData.SecondType }} -- {{ detailData.ThirdType }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >研究类别：{{ detailData.ResearchName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >国民经济行业：{{ detailData.EconomicName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >社会经济服务目标：{{ detailData.SocietyName }}</el-col
          >
        </el-row>

        <el-divider content-position="left"
          ><span class="div-font">合作单位</span></el-divider
        >
        <el-row :gutter="20">
          <el-col class="detail-info" :span="12" :xs="24"
            >合作单位名称：{{ detailData.CooperateName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合作单位类型：{{ detailData.CooperateTypeName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >合同经费（万）：{{ detailData.ContractFund }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行名称：{{ detailData.BankName }}</el-col
          >
          <el-col class="detail-info" :span="12" :xs="24"
            >银行账号：{{ detailData.BankAccount }}</el-col
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
      <el-dialog title="已上传成果" :visible.sync="ifShowDialog" width="90%">
        <el-table :data="PaperList" style="margin-top:10px">
          <template v-for="col in PaperColumns">
            <el-table-column
              v-if="col.ifShow"
              :prop="col.value"
              :width="col.width"
              :label="col.name"
              sortable="custom"
              :key="col.value"
              show-overflow-tooltip
            >
            </el-table-column>
          </template>
          <el-table-column
            label="操作"
            width="80"
            fixed="right"
            align="center"
            v-if="detailData.reviewId !== 5 && detailData.reviewId !== 6"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                style="margin-right: 10px"
                >解绑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-divider content-position="left"
        ><span class="div-font">拓展信息</span></el-divider
      >
      <el-row :gutter="20">
        <el-col class="detail-info" :span="12" :xs="24">
          <el-button type="primary" @click="onExportFile" :loading="loading"
            >导出附件</el-button
          ></el-col
        >
        <el-col class="detail-info" :span="12" :xs="24">
          <el-button
            type="primary"
            @click="onSelectPaper"
            v-if="detailData.reviewId !== 1 && detailData.reviewId !== 3"
            >查看成果</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  getSubjectPaperList,
  deleteSubjectPaper,
  exportTeaSubjectPDF,
} from "../api";
export default {
  name: "SubjectDetail",
  data() {
    return {
      loading: false,
      PaperList: [{}],
      ifShowDialog: false,
      PaperColumns: [
        {
          name: "成果类型",
          value: "typeName",
          width: "130",
          ifShow: true,
        },
        { name: "成果名称", value: "paperName", width: "auto", ifShow: true },
        { name: "成果单位", value: "paperPlace", width: "auto", ifShow: true },
        {
          name: "成果审核状态",
          value: "PaperReviewName",
          width: "auto",
          ifShow: true,
        },
        {
          name: "记录上传时间",
          value: "PaperCreateAt",
          width: "200",
          ifShow: true,
        },
        {
          name: "记录审核时间",
          value: "PaperReviewAt",
          width: "200",
          ifShow: true,
        },
      ],
    };
  },
  props: {
    detailData: {},
    goback: { type: Function },
  },
  methods: {
    //展示成果页
    onSelectPaper() {
      this.ifShowDialog = true;
      this.getPaperList();
    },
    handleDelete(index, row) {
      let _this = this;
      let params = new URLSearchParams();
      params.append("SubjectId", this.detailData.id);
      params.append("PaperId", row.PaperId);
      deleteSubjectPaper(params)
        .then((res) => {
          if (res.code === 0) {
            _this.$message({
              message: res.msg,
              type: "success",
            });
            _this.getPaperList();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    getPaperList() {
      let _this = this;
      //参数绑定「分页大小、页码」
      let params = new URLSearchParams();
      params.append("id", this.detailData.id);
      getSubjectPaperList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果列表---------------");
          //closeDebug console.log(res.data);
          (_this.PaperList = res), (_this.dataCount = res.count);
        })
        .catch((failResponse) => {});
    },
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
