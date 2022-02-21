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
        <el-table-column
          property="PaperType"
          label="简述"
          width="200"
        ></el-table-column>
        <el-table-column
          property="imagePath"
          label="图片地址"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-row type="flex" justify="center">
      <el-button
        v-show="ifShowDetail"
        @click="onSelectPaper"
        style="margin:10px"
        >上传成果</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { getMySubjectList, getSubjectDetail, getMyPaperList } from "../../api";
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
      params.append("limit", this.pageSize);
      params.append("page", this.currentPage);
      params.append("typeId",this.detailData.PaperType)
      getMyPaperList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果列表---------------");
          //closeDebug console.log(res.data);
          (this.PaperData = res.data), (this.dataCount = res.count);
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
