<template>
  <div class="record">
    <h3>上传成果</h3>
    <!---奖项列表部分，选中奖项后隐藏--->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'awardName', order: 'descending' }"
    >
      <el-table-column prop="awardName" label="记录类型"> </el-table-column>
      <el-table-column label="操作" width="80" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >上传</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div slot="tip" class="el-upload__tip">
      如果没有找到你想要新增的记录类型，请与系统管理员联系。
    </div>
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

    <!---提交表单部分，选中奖项后链接跳转--->
  </div>
</template>

<script>
import { getTeacherPaperList } from "../../../api";
import { mapGetters } from "vuex";
export default {
  name: "Record",
  data() {
    return {
      ifSmall: false,
      paginationLayout: "prev, pager,next,  ->, total",
      awardSelected: "",
      awardIdSelected: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [{}],
      dataCount: 0, //总数据条数
    };
  },
  mounted() {
    this.getTableData();
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
      this.ifSmall = true;
    }
  },
  methods: {
    //调用接口取数据
    getTableData() {
      //参数绑定「分页大小、页码」
      let params = new URLSearchParams();
      params.append("limit", this.pageSize);
      params.append("page", this.currentPage);
      getTeacherPaperList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取表格数据---------------");
          //closeDebug console.log(res.data);
          this.tableData = res.data;
          this.dataCount = res.count;
        })
        .catch((failResponse) => {});
    },
    //数据格式化
    formatter(row, column) {
      return row.address;
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      //closeDebug console.log(`每页 ${val} 条`);
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //closeDebug console.log(`当前页: ${val}`);
      this.getTableData();
    },
    //处理选中，隐藏奖项列表，显示提交表单
    handleEdit(index, row) {
      //closeDebug console.log("选中了", index, row);\
      switch (row.id) {
        case 10:
          this.$router.push({ path: "/eta/paper" });
          break;
        case 12:
          this.$router.push({ path: "/eta/book" });
          break;
        case 128:
          this.$router.push({ path: "/eta/patent" });
          break;
      }
    },
  },
  computed: {
    ...mapGetters(["name", "username", "roleId"]),
  },
};
</script>

<style>
.record > .el-button {
  margin-top: 1em;
  margin-bottom: 1em;
}
.back-button {
  margin-top: 1em;
  margin-bottom: 1em;
}
.pagination {
  margin-top: 20px;
}
</style>
