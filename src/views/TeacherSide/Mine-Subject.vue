<template>
  <div class="mine">
    <h3 v-show="!ifShowDetail">项目记录</h3>
    <div v-show="!ifShowDetail">
      <div class="check-group">
        <span>显示列：</span>
        <el-checkbox
          v-for="col in Columns"
          v-model="col.ifShow"
          :key="col.value"
          size="small"
          style="margin-right: 10px"
          >{{ col.name }}</el-checkbox
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <template v-for="col in Columns">
          <el-table-column
            align="center"
            v-if="col.ifShow"
            :prop="col.value"
            :width="col.width"
            :label="col.name"
            sortable="custom"
            :key="col.value"
          >
            <template slot-scope="scope">
              <i
                class="el-icon-success"
                style="color: #67c23a; margin-right: 4px"
                v-if="scope.row[col.value] == '已审核'"
              ></i>
              <i
                class="el-icon-success"
                style="color: #67c23a; margin-right: 4px"
                v-if="scope.row[col.value] == '已结项'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '未审核'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '未结项'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '等待结项'"
              ></i>
              <i
                class="el-icon-warning"
                style="color: #f56c6c; margin-right: 4px"
                v-if="scope.row[col.value] == '未通过'"
              ></i>
              <span>{{ scope.row[col.value] }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleShow(scope.$index, scope.row)"
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
    <el-dialog title="成果选择" :visible.sync="ifShowDialog" width="90%">
      <el-table :data="PaperData" style="margin-top:10px">
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
        <el-table-column label="操作" width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSelect(scope.$index, scope.row)"
              style="margin-right: 10px"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-row :gutter="16" type="flex" class="row-bg" justify="center">
      <el-col :span="2" :xs="6">
        <el-button
          v-show="ifShowDetail"
          v-if="detailData.reviewId === 4"
          @click="onSelectPaper"
          style="margin:10px 20px 0 0"
          >上传成果</el-button
        >
      </el-col>
      <el-col :span="2" :xs="6">
        <el-button
          v-show="ifShowDetail"
          v-if="detailData.reviewId === 4"
          @click="handleFinish"
          style="margin:10px 0 0 20px"
          >申请结题</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getMySubjectList,
  getSubjectDetail,
  getPaperSelectList,
  updateSubjectPaper,
  ApplyFinishSubject,
} from "../../api";
import SubjectDetail from "../../components/TeacherSide/SubjectDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "Mine-Subject",
  components: { SubjectDetail },
  computed: {
    ...mapGetters(["roleId"]),
  },
  data() {
    return {
      ifSmall: false,
      paginationLayout: "prev, pager,next, jumper, ->, total, sizes",
      ifShowDetail: false,
      ifShowDialog: false,
      detailData: {},
      currentPage: 1,
      pageSize: 10,
      tableData: [{}],
      PaperData: [{}],
      // 数据列
      Columns: [
        { name: "审核状态", value: "reviewName", width: "130", ifShow: true },
        { name: "项目名称", value: "subjectName", width: "auto", ifShow: true },
        { name: "项目类别", value: "rankName", width: "120", ifShow: true },
        { name: "项目级别", value: "levelName", width: "120", ifShow: true },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "200",
          ifShow: true,
        },
        {
          name: "项目发表时间",
          value: "subjectTime",
          width: "200",
          ifShow: true,
        },
      ],
      PaperColumns: [
        { name: "成果类型", value: "typeName", width: "130", ifShow: true },
        { name: "成果名称", value: "paperName", width: "auto", ifShow: true },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "200",
          ifShow: true,
        },
      ],
      dataCount: 0, //总数据条数
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    };
  },
  watch: {
    windowWidth(val) {
      let that = this;
      //closeDebug console.log("实时屏幕宽度：", val, that.windowHeight);
    },
  },
  mounted() {
    this.getTableData(10, 1);
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.paginationLayout = "prev, pager, next,  ->, total";
      this.ifSmall = true;
      this.Columns = [
        { name: "状态", value: "reviewName", width: "85", ifShow: true },
        { name: "名称", value: "subjectName", width: "auto", ifShow: true },
        { name: "类别", value: "rankName", width: "120", ifShow: false },
        { name: "级别", value: "levelName", width: "120", ifShow: false },
        {
          name: "上传时间",
          value: "createAt",
          width: "200",
          ifShow: false,
        },
      ];
    }
  },
  methods: {
    //调用接口取数据
    getTableData(limit, page) {
      //参数绑定「分页大小、页码」
      let params = new URLSearchParams();
      params.append("limit", limit);
      params.append("page", page);
      getMySubjectList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取表格数据---------------");
          //closeDebug console.log(res.data);
          (this.tableData = res.data), (this.dataCount = res.count);
        })
        .catch((failResponse) => {});
    },
    getPaperData() {
      let _this = this;
      //参数绑定「分页大小、页码」
      let params = new URLSearchParams();
      getPaperSelectList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果列表---------------");
          //closeDebug console.log(res.data);
          (_this.PaperData = res), (_this.dataCount = res.count);
        })
        .catch((failResponse) => {});
    },
    //数据格式化
    formatter(row, column) {
      return row.address;
    },
    //展示上传成果页
    onSelectPaper() {
      this.ifShowDialog = true;
      this.getPaperData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      //closeDebug console.log(`每页 ${val} 条`);
      this.getTableData(val, 1);
    },
    handleCurrentChange(val) {
      //closeDebug console.log(`当前页: ${val}`);
      this.getTableData(this.pageSize, val);
    },
    handleShow(index, row) {
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("id", row.id);
      getSubjectDetail(params)
        .then((res) => {
          //closeDebug console.log("-----------获取教师奖项详情---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log("个人奖项详情", obj);
          this.detailData = obj;
        })
        .catch((failResponse) => {});

      this.ifShowDetail = true;
    },
    handleSelect(index, row) {
      let _this = this;
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("SubjectId", this.detailData.id);
      params.append("PaperId", row.id);
      updateSubjectPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
          if (res.code === 0) {
            _this.ifShowDialog = false;
            _this.$message({
              message: res.msg,
              type: "success",
            });
            _this.getTableData();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    handleFinish(index) {
      let _this = this;
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("SubjectId", this.detailData.id);
      ApplyFinishSubject(params)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
          if (res.code === 0) {
            _this.$message({
              message: res.msg,
              type: "success",
            });
            _this.goBack();
            _this.getTableData();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    //返回重选奖项
    goBack() {
      this.ifShowDetail = false;
    },
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
</style>
