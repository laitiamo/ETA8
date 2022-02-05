<template>
  <div class="review">
    <h3 v-show="!ifShowDetail">项目审核</h3>
    <div v-show="!ifShowDetail">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.rankId"
            placeholder="全部等级"
            style="width: 140px"
          >
            <el-option label="全部等级" value=""></el-option>
            <el-option
              v-for="opt in rankList1"
              :key="opt.id"
              :label="opt.rankName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form2Query.levelId"
            placeholder="全部等级"
            style="width: 140px"
          >
            <el-option label="全部等级" value=""></el-option>
            <el-option
              v-for="opt in rankList2"
              :key="opt.id"
              :label="opt.rankName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keySubjectNum"
            placeholder="搜索项目编号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keySubjectName"
            placeholder="搜索项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keySubjectPlace"
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
    <SubjectDetail
      :detailData="detailData"
      :goback="goBack"
      v-show="ifShowDetail"
    >
    </SubjectDetail>
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
  getSubjectDetail,
  getReviewSubjectList,
  initQuerySubject,
  passSubject,
  notPassSubject,
} from "../../api";
import SubjectDetail from "../../components/TeacherSide/SubjectDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "Review-Subject",
  components: { SubjectDetail },
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
        {
          name: "项目编号",
          value: "subjectNum",
          width: "180",
          ifShow: true,
        },
        { name: "项目名称", value: "subjectName", width: "auto", ifShow: true },
        {
          name: "所属单位",
          value: "subjectPlace",
          width: "240",
          ifShow: true,
        },
        { name: "项目类别", value: "rankName", width: "160", ifShow: true },
        { name: "项目级别", value: "levelName", width: "160", ifShow: true },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "240",
          ifShow: true,
        },
        {
          name: "项目发表时间",
          value: "subjectTime",
          width: "240",
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
        rankId: "", //项目记录等级
        levelId: "", //项目记录级别
        keySubjectNum: "", //项目编号
        keySubjectName: "", //项目名称
        keySubjectPlace: "", //项目所属单位
      },
      //下拉栏内容列表
      rankList1: [],
      rankList2: [],
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
        { name: "项目编号", value: "subjectNum", width: "120", ifShow: false },
        { name: "项目名称", value: "subjectName", width: "180", ifShow: true },
        {
          name: "所属单位",
          value: "subjectPlace",
          width: "120",
          ifShow: false,
        },
        { name: "项目类别", value: "rankName", width: "120", ifShow: false },
        { name: "项目级别", value: "levelName", width: "120", ifShow: false },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "200",
          ifShow: false,
        },
        {
          name: "项目发表时间",
          value: "subjectTime",
          width: "200",
          ifShow: false,
        },
      ];
    }
  },
  methods: {
    //初始化查询参数
    initQueryList() {
      initQuerySubject()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.rankList1 = obj.s_rank;
          this.rankList2 = obj.rank;
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
      //console.log(this.reviewId, this.reviewer);
      getSubjectDetail(params)
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
      params.append("reviewer", this.reviewer);
      params.append("reviewType", "1");
      let _this = this;
      passSubject(params)
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
      params.append("reviewer", this.reviewer);
      params.append("reviewType", "2");
      let _this = this;
      notPassSubject(params)
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
      params.append("rankId", this.form2Query.rankId); //项目记录等级
      params.append("levelId", this.form2Query.levelId); //项目记录等级
      params.append("keySubjectNum", this.form2Query.keySubjectNum); //项目编号
      params.append("keySubjectName", this.form2Query.keySubjectName); //项目名称
      params.append("keySubjectPlace", this.form2Query.keySubjectPlace); //所属单位
      params.append("order", this.orderMode);
      params.append("field", this.orderField);
      getReviewSubjectList(params)
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
    ...mapGetters(["reviewer", "roleId"]),
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
