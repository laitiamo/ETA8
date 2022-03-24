<template>
  <div class="paper-review">
    <h3 v-show="!ifShowDetail">成果审核</h3>
    <div v-show="!ifShowDetail">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.collegeId"
            placeholder="全部学院"
            style="width:140px"
          >
            <el-option label="全部学院" value=""></el-option>
            <el-option
              v-for="opt in collegeList"
              :key="opt.id"
              :label="opt.collegeName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form2Query.sectorId"
            placeholder="全部部门"
            style="width:160px"
          >
            <el-option label="全部部门" value=""></el-option>
            <el-option
              v-for="opt in sectorList"
              :key="opt.id"
              :label="opt.sectorName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyName"
            placeholder="搜索负责人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyUsername"
            placeholder="搜索教职工号"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.typeId"
            placeholder="全部类型"
            style="width: 140px"
          >
            <el-option label="全部类型" value=""></el-option>
            <el-option
              v-for="opt in typeList"
              :key="opt.id"
              :label="opt.typeName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyPaperNum"
            placeholder="搜索成果号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyPaperName"
            placeholder="搜索成果名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyPaperPlace"
            placeholder="搜索所属单位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">筛选</el-button>
        </el-form-item>
      </el-form>
      <div class="check-group">
        <span>显示列：</span>
        <el-checkbox
          v-for="col in Columns"
          v-model="col.ifShow"
          :key="col.value"
          size="small"
          style="margin-right:10px"
          >{{ col.name }}</el-checkbox
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <template v-for="col in Columns">
          <el-table-column
            v-if="col.ifShow"
            :prop="col.value"
            :width="col.width"
            :label="col.name"
            sortable="custom"
            :key="col.value"
          >
          </el-table-column>
        </template>
        <el-table-column label="操作" width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleShow(scope.$index, scope.row)"
              :disabled="ifButtonTrue"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        :layout="paginationLayout"
        :small="ifSmall"
        :total="dataCount"
      >
      </el-pagination>
    </div>
    <PaperDetail
      :detailData="detailData"
      :goback="goBack"
      v-show="ifShowDetail"
    >
    </PaperDetail>
    <el-row type="flex" justify="center">
      <el-button
        v-show="ifShowDetail"
        type="danger"
        style="margin:10px"
        @click="handleNotPass()"
        >驳回</el-button
      >
      <el-button
        v-show="ifShowDetail"
        type="success"
        style="margin:10px"
        @click="handlePass()"
        >通过</el-button
      >
    </el-row>
  </div>
</template>

<script>
import {
  getReviewPaperList,
  getPaperList,
  getPaperDetail,
  initQueryPaper,
  passPaper,
  notPassPaper,
} from "../../api";
import PaperDetail from "../../components/PaperDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "paper-review",
  components: { PaperDetail },
  computed: {},
  data() {
    return {
      reviewId: 0,
      ifSmall: false,
      ifButtonTrue: true,
      paginationLayout: "prev, pager,next, jumper, ->, total, sizes",
      ifShowDetail: false,
      // 数据列
      Columns: [
        { name: "成果号", value: "paperNum", width: "180", ifShow: true },
        { name: "成果名称", value: "paperName", width: "200", ifShow: true },
        { name: "所属单位", value: "paperPlace", width: "auto", ifShow: true },
        { name: "成果等级", value: "rankName", width: "120", ifShow: true },
        { name: "负责人姓名", value: "name", width: "120", ifShow: true },
        { name: "教职工号", value: "username", width: "120", ifShow: false },
        { name: "所属学院", value: "collegeName", width: "240", ifShow: false },
        { name: "审核状态", value: "reviewName", width: "120", ifShow: true },
        {
          name: "成果上传时间",
          value: "createAt",
          width: "200",
          ifShow: false,
        },
        {
          name: "成果记录时间",
          value: "paperTime",
          width: "200",
          ifShow: true,
        },
      ],
      detailData: {},
      currentPage: 1,
      pageSize: 10,
      tableData: [{}], //展示的数据
      dataCount: 0, //总数据条数
      orderMode: "", //排序方式
      orderField: "", //排序字段
      //用于筛选的表单
      form2Query: {
        collegeId: "",
        sectorId: "",
        keyUsername: "", //用户id
        keyName: "", //姓名
        typeId: "", //成果类型
        keyPaperNum: "", //成果号
        keyPaperName: "", //成果名
        keyPaperPlace: "", //成果单位
      },
      //下拉栏内容列表
      typeList: [],
      collegeList: [],
      sectorList: [],
    };
  },
  mounted() {
    this.initQueryList();
    this.onQuery();
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.paginationLayout = "prev, pager,next, ->, total";
      this.ifSmall = true;
      this.Columns = [
        { name: "成果号", value: "paperNum", width: "180", ifShow: false },
        { name: "成果名称", value: "paperName", width: "auto", ifShow: true },
        { name: "所属单位", value: "paperPlace", width: "200", ifShow: false },
        { name: "成果等级", value: "rankName", width: "120", ifShow: false },
        { name: "教职工号", value: "username", width: "120", ifShow: true },
        { name: "姓名", value: "name", width: "80", ifShow: false },
        { name: "学院名称", value: "collegeName", width: "240", ifShow: false },
        { name: "部门名称", value: "sectorName", width: "120", ifShow: false },
        { name: "上传时间", value: "createAt", width: "200", ifShow: false },
        { name: "审核状态", value: "reviewName", width: "120", ifShow: false },
        {
          name: "成果记录时间",
          value: "paperTime",
          width: "200",
          ifShow: false,
        },
      ];
    }
  },
  methods: {
    //初始化查询参数
    initQueryList() {
      initQueryPaper()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.typeList = obj.type;
          this.collegeList = obj.college;
          this.sectorList = obj.sector;
        })
        .catch((failResponse) => {});
    },
    //数据格式化(还没用到)
    formatter(row, column) {
      return row.address;
    },
    //处理每页显示数据量变化
    handleSizeChange(val) {
      this.pageSize = val;
      //closeDebug console.log(`每页 ${val} 条`);
      this.onQuery();
    },
    //处理跳页
    handleCurrentChange(val) {
      this.currentPage = val;
      //closeDebug console.log(`当前页: ${val}`);
      this.onQuery();
    },
    //处理查看详情
    handleShow(index, row) {
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("id", row.id);
      this.reviewId = row.id;
      getPaperDetail(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果详情---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log("个人成果详情", obj);
          this.detailData = obj;
        })
        .catch((failResponse) => {});
      this.ifShowDetail = true;
      this.ifButtonTrue = true;
    },
    //处理通过成果
    handlePass() {
      //closeDebug console.log("点击通过");
      let params = new URLSearchParams();
      params.append("id", this.reviewId);
      let _this = this;
      passPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------通过成果---------------");
          if (res.code === 0) {
            _this.$message({
              message: res.msg,
              type: "success",
            });
            _this.onQuery();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
      this.goBack();
    },
    //处理驳回成果
    handleNotPass() {
      //closeDebug console.log("点击驳回");
      let params = new URLSearchParams();
      params.append("id", this.reviewId);
      let _this = this;
      notPassPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------驳回成果---------------");
          if (res.code === 0) {
            _this.$message({
              message: res.msg,
              type: "success",
            });
            _this.onQuery();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
      this.goBack();
    },
    //返回重选成果
    goBack() {
      this.ifShowDetail = false;
      this.reviewId = 0;
      this.ifButtonTrue = false;
    },
    //处理数据筛选
    onQuery() {
      //closeDebug console.log("submit:", this.form2Query);
      //参数绑定「分页大小、页码以及筛选参数」
      let params = new URLSearchParams();
      params.append("limit", this.pageSize);
      params.append("page", this.currentPage);
      params.append("collegeId", this.form2Query.collegeId);
      params.append("sectorId", this.form2Query.sectorId);
      params.append("keyUsername", this.form2Query.keyUsername); //用户id
      params.append("keyName", this.form2Query.keyName); //姓名
      params.append("typeId", this.form2Query.typeId); //成果类型
      params.append("keyAwardName", this.form2Query.keyAwardName); //成果名
      params.append("keyAwardPlace", this.form2Query.keyAwardPlace); //期刊名
      params.append("order", this.orderMode);
      params.append("field", this.orderField);
      getReviewPaperList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取筛选后的表格数据---------------");
          //closeDebug console.log(res.data);
          this.tableData = res.data;
          this.dataCount = res.count;
        })
        .catch((failResponse) => {});
      this.ifButtonTrue = false;
    },
    //处理排序后重新获取数据
    onSortChange(res) {
      //closeDebug console.log("触发排序:", res);
      if (res.order) {
        this.orderMode = res.order === "descending" ? "desc" : "asc";
        this.orderField = res.prop;
      } else {
        this.orderMode = "";
        this.orderField = "";
      }
      //closeDebug console.log(this.orderMode, this.orderField);
      this.onQuery();
    },
  },
  computed: {
    ...mapGetters(["roleId"]),
  },
};
</script>

<style>
.pagination {
  margin-top: 20px;
}
.check-group {
  margin-bottom: 10px;
}
.check-group > span {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}
</style>
