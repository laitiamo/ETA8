<template>
  <div class="review">
    <h3 v-show="!ifShowDetail">教师奖项审核</h3>
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
            v-model="form2Query.keyUsername"
            placeholder="搜索教职工号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyName"
            placeholder="搜索姓名"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.rankId"
            placeholder="全部等级"
            style="width:140px"
          >
            <el-option label="全部等级" value=""></el-option>
            <el-option
              v-for="opt in rankList"
              :key="opt.id"
              :label="opt.rankName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyAwardName"
            placeholder="搜索奖项名称"
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
    <TeaDetail :detailData="detailData" :goback="goBack" v-show="ifShowDetail">
    </TeaDetail>
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
  getReviewTeacherAwardList,
  getTeaDetail,
  initQueryTea,
  passAward,
  notPassAward,
} from "../../api";
import TeaDetail from "../../components/TeaDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "Review",
  components: { TeaDetail },
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
        { name: "教职工号", value: "username", width: "120", ifShow: false },
        { name: "姓名", value: "name", width: "80", ifShow: true },
        { name: "学院名称", value: "collegeName", width: "180", ifShow: true },
        { name: "部门名称", value: "sectorName", width: "120", ifShow: true },
        { name: "奖项等级", value: "rankName", width: "120", ifShow: true },
        { name: "获奖名次", value: "awardPlace", width: "120", ifShow: true },
        { name: "奖项名称", value: "awardName", width: "auto", ifShow: true },
        { name: "上传时间", value: "createAt", width: "200", ifShow: false },
        { name: "获奖时间", value: "awardTime", width: "200", ifShow: true },
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
        rankId: "", //获奖等级
        keyAwardName: "", //奖项名
      },
      //下拉栏内容列表
      collegeList: [],
      sectorList: [],
      rankList: [],
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
        { name: "教职工号", value: "username", width: "120", ifShow: false },
        { name: "姓名", value: "name", width: "80", ifShow: true },
        { name: "学院名称", value: "collegeName", width: "240", ifShow: false },
        { name: "部门名称", value: "sectorName", width: "120", ifShow: false },
        { name: "奖项等级", value: "rankName", width: "120", ifShow: false },
        { name: "获奖名次", value: "awardPlace", width: "120", ifShow: false },
        { name: "奖项名称", value: "awardName", width: "", ifShow: true },
        { name: "获奖时间", value: "awardTime", width: "200", ifShow: false },
      ];
    }
  },
  methods: {
    //初始化查询参数
    initQueryList() {
      initQueryTea()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.collegeList = obj.college;
          this.sectorList = obj.sector;
          this.rankList = obj.rank;
        })
        .catch((failResponse) => {});
      this.ifButtonTrue = false;
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
      getTeaDetail(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人奖项详情---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log("个人奖项详情", obj);
          this.detailData = obj;
        })
        .catch((failResponse) => {});
      this.ifShowDetail = true;
      this.ifButtonTrue = true;
    },
    //处理通过奖项
    handlePass() {
      //closeDebug console.log("点击通过");
      let params = new URLSearchParams();
      params.append("id", this.reviewId);
      let _this = this;
      passAward(params)
        .then((res) => {
          //closeDebug console.log("-----------通过奖项---------------");
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
    //处理驳回奖项
    handleNotPass() {
      //closeDebug console.log("点击驳回");
      let params = new URLSearchParams();
      params.append("id", this.reviewId);
      let _this = this;
      notPassAward(params)
        .then((res) => {
          //closeDebug console.log("-----------驳回奖项---------------");
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
    //返回重选奖项
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
      params.append("rankId", this.form2Query.rankId); //获奖等级
      params.append("keyAwardName", this.form2Query.keyAwardName); //奖项名
      params.append("order", this.orderMode); //奖项名
      params.append("field", this.orderField); //奖项名
      getReviewTeacherAwardList(params)
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
