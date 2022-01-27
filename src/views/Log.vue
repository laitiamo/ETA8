<template>
  <div class="log">
    <h3 v-show="!ifShowDetail">操作日志</h3>
    <div v-show="!ifShowDetail">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.typeId"
            placeholder="全部审核状态"
            @change="QueryType"
            style="width:140px"
          >
            <el-option label="全部审核状态" value=""></el-option>
            <el-option
              v-for="opt in typeList"
              :key="opt.id"
              :label="opt.reviewType"
              :value="opt.id"
            ></el-option>
          </el-select>
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
            show-overflow-tooltip
          >
          </el-table-column>
        </template>
        <el-table-column
          label="管理"
          :width="stuWidth"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-popconfirm
              confirm-button-text="确认删除"
              cancel-button-text="不用了"
              confirm-button-type="danger"
              cancel-button-type=""
              icon="el-icon-info"
              icon-color="red"
              title="警告：确认删除？此操作不可逆！"
              @confirm="handleDel(scope.$index, scope.row)"
              v-if="windowWidth >= 720"
            >
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
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
  </div>
</template>

<script>
import { initQueryLog, delLog, getLogList } from "../api";
import { mapGetters } from "vuex";
export default {
  name: "Log",
  components: {},
  computed: {},
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      selectId: 0,
      ifSmall: false,
      paginationLayout: "prev, pager,next, jumper, ->, total, sizes",
      ifShowUpdateDialog: false,
      ifShowDetail: false,
      stuWidth: 100,
      // 数据列
      Columns: [
        { name: "日志编号", value: "id", width: "110", ifShow: true },
        { name: "获奖者姓名", value: "name", width: "130", ifShow: true },
        { name: "获奖者班级", value: "className", width: "180", ifShow: false },
        { name: "奖项名称", value: "awardName", width: "auto", ifShow: true },
        { name: "奖项级别", value: "rankName", width: "120", ifShow: false },
        { name: "审核状态", value: "reviewType", width: "180", ifShow: true },
        { name: "审核人", value: "reviewerName", width: "200", ifShow: true },
        { name: "上传时间", value: "createAt", width: "200", ifShow: false },
        { name: "操作时间", value: "reviewAt", width: "200", ifShow: true },
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
        typeId: "",
      },
      //下拉栏内容列表
      typeList: [],
    };
  },
  watch: {
    windowWidth(val) {},
  },
  computed: {
    ...mapGetters(["roleId"]),
  },
  mounted() {
    this.initQueryList();
    this.onQuery();
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.ifSmall = true;
      this.paginationLayout = "prev, pager,next, ->, total";
      this.stuWidth = 80;
      this.Columns = [
        { name: "日志编号", value: "id", width: "90", ifShow: false },
        { name: "获奖者姓名", value: "name", width: "80", ifShow: true },
        { name: "获奖者班级", value: "className", width: "180", ifShow: false },
        { name: "奖项名称", value: "awardName", width: "auto", ifShow: true },
        { name: "奖项级别", value: "rankName", width: "120", ifShow: false },
        { name: "审核状态", value: "reviewType", width: "180", ifShow: true },
        { name: "操作人", value: "reviewerName", width: "200", ifShow: true },
        { name: "上传时间", value: "createAt", width: "200", ifShow: false },
        { name: "操作时间", value: "reviewAt", width: "200", ifShow: false },
      ];
    }
  },
  methods: {
    //初始化查询参数
    initQueryList() {
      initQueryLog()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.typeList = obj.type;
        })
        .catch((failResponse) => {});
    },
    //数据格式化(还没用到)
    formatter(row, column) {
      return row.address;
    },
    onQuery() {
      //closeDebug console.log("submit:", this.form2Query);
      //参数绑定「分页大小、页码以及筛选参数」
      let params = new URLSearchParams();
      params.append("limit", this.pageSize);
      params.append("page", this.currentPage);
      params.append("order", this.orderMode);
      params.append("field", this.orderField);
      params.append("typeId", this.form2Query.typeId);
      getLogList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取筛选后的表格数据---------------");
          //closeDebug console.log(res.data);
          this.tableData = res.data;
          this.dataCount = res.count;
        })
        .catch((failResponse) => {});
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

    handleDel(index, row) {
      //closeDebug console.log("点击删除", index, row);
      let params = new URLSearchParams();
      params.append("id", row.id);
      let _this = this;
      delLog(params)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
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
