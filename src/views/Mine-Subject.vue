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
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '等待审核'"
              ></i>
              <i
                class="el-icon-warning"
                style="color: #f56c6c; margin-right: 4px"
                v-if="scope.row[col.value] == '终止'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #67c23a; margin-right: 4px"
                v-if="scope.row[col.value] == '在研'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '申请变更'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '申请中期检查'"
              ></i>
              <i
                class="el-icon-question"
                style="color: #e6a23c; margin-right: 4px"
                v-if="scope.row[col.value] == '申请结题'"
              ></i>
              <i
                class="el-icon-success"
                style="color: #67c23a; margin-right: 4px"
                v-if="scope.row[col.value] == '已结题'"
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
    <template v-if="detailData.reviewId === 3">
      <el-row class="row-bg" justify="center" style="margin-top:15px;">
        <SubjectExtraButton
          :id="selectId"
          v-show="ifShowDetail"
          :detailData="detailData"
          :goback="goBack"
        ></SubjectExtraButton>
      </el-row>
    </template>
  </div>
</template>

<script>
import { getMySubjectList, getSubjectDetail } from "../api";
import SubjectDetail from "../components/SubjectDetail.vue";
import { mapGetters } from "vuex";
import SubjectExtraButton from "../components/SubjectExtraButton.vue";
export default {
  name: "Mine-Subject",
  components: { SubjectDetail, SubjectExtraButton },
  computed: {
    ...mapGetters(["roleId"]),
  },
  data() {
    return {
      ifSmall: false,
      paginationLayout: "prev, pager,next, jumper, ->, total, sizes",
      ifShowDetail: false,
      detailData: {},
      selectId: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [{}],

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
    //数据格式化
    formatter(row, column) {
      return row.address;
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
      this.selectId = row.id;
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
    //返回重选奖项
    goBack() {
      this.ifShowDetail = false;
      this.selectId = 0;
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
