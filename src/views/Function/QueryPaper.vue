<template>
  <div class="query-paper">
    <h3 v-show="!ifShowDetail">管理成果记录</h3>
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
            v-model="form2Query.keyAwardName"
            placeholder="搜索成果名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form2Query.keyAwardPlace"
            placeholder="搜索所属单位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onExportXLS"
            >导出成果记录信息(XLS)</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onExportZIP"
            >导出成果记录图片(ZIP)</el-button
          >
        </el-form-item>
      </el-form>
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
          label="操作"
          :width="teaWidth"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleShow(scope.$index, scope.row)"
              style="margin-right: 10px"
              >查看</el-button
            >
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
    <PaperDetail
      :detailData="detailData"
      :goback="goBack"
      v-show="ifShowDetail"
    >
    </PaperDetail>
    <el-row type="flex" justify="center">
      <el-popconfirm
        confirm-button-text="确认删除"
        cancel-button-text="不用了"
        confirm-button-type="danger"
        cancel-button-type=""
        icon="el-icon-info"
        icon-color="red"
        title="警告：确认删除？此操作不可逆！"
        @confirm="handleInDel()"
        v-if="windowWidth <= 720"
      >
        <el-button
          v-show="ifShowDetail"
          style="margin: 10px"
          type="primary"
          slot="reference"
          v-if="roleId === 1"
          >删除记录</el-button
        >
      </el-popconfirm>
    </el-row>
  </div>
</template>

<script>
import {
  getTeaPaperList,
  getPaperDetail,
  initQueryPaper,
  delTeaPaper,
  exportTeaPaperXLS,
  exportTeaPaperZIP,
} from "../../api";
import PaperDetail from "../../components/PaperDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "QueryPaper",
  components: { PaperDetail },
  computed: {},
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      selectId: 0,
      ifSmall: false,
      paginationLayout: "prev, pager,next, jumper, ->, total, sizes",
      ifShowDetail: false,
      teaWidth: 150,
      // 数据列
      Columns: [
        { name: "成果名称", value: "paperName", width: "200", ifShow: true },
        { name: "所属单位", value: "paperPlace", width: "auto", ifShow: true },
        { name: "成果等级", value: "rankName", width: "120", ifShow: true },
        { name: "审核状态", value: "reviewName", width: "120", ifShow: true },
        { name: "负责人姓名", value: "name", width: "120", ifShow: true },
        { name: "教职工号", value: "username", width: "120", ifShow: false },
        { name: "所属学院", value: "collegeName", width: "240", ifShow: false },
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
        keyAwardName: "", //成果名
        keyAwardPlace: "", //期刊名
      },
      //下拉栏内容列表
      typeList: [],
      collegeList: [],
      sectorList: [],
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
      this.teaWidth = 80;
      this.Columns = [
        { name: "成果名称", value: "paperName", width: "200", ifShow: true },
        { name: "所属单位", value: "paperPlace", width: "auto", ifShow: false },
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
          ifShow: true,
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
      this.selectId = row.id;
      getPaperDetail(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果详情---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log("个人成果详情", obj);
          this.detailData = obj;
        })
        .catch((failResponse) => {});
      this.ifShowDetail = true;
    },
    //处理删除成果
    handleDel(index, row) {
      //closeDebug console.log("点击删除", index, row);
      let params = new URLSearchParams();
      params.append("id", row.id);
      let _this = this;
      delTeaPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------删除成果---------------");
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
    //成果详情页面处理删除成果
    handleInDel() {
      //closeDebug console.log("点击删除", index, row);
      let params = new URLSearchParams();
      params.append("id", this.selectId);
      let _this = this;
      delTeaPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------删除成果---------------");
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
      this.selectId = 0;
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
      getTeaPaperList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取筛选后的表格数据---------------");
          //closeDebug console.log(res.data);
          this.tableData = res.data;
          this.dataCount = res.count;
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
    //处理导出教师成果表格文件
    onExportXLS() {
      //closeDebug console.log("export XLS:", this.form2Query);
      //参数绑定「筛选参数」
      let params = new URLSearchParams();
      params.append("collegeId", this.form2Query.collegeId);
      params.append("sectorId", this.form2Query.sectorId);
      params.append("keyUsername", this.form2Query.keyUsername); //用户id
      params.append("keyName", this.form2Query.keyName); //姓名
      params.append("typeId", this.form2Query.typeId); //成果等级
      params.append("keyAwardName", this.form2Query.keyAwardName); //成果名
      params.append("keyAwardPlace", this.form2Query.keyAwardPlace); //期刊名
      exportTeaPaperXLS(params)
        .then((res) => {
          //closeDebug console.log("-----------导出教师成果表格文件---------------");
          //closeDebug console.log(res);
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          //new一个时间对象
          var nowDate = new Date().toLocaleDateString();
          downloadElement.download = decodeURIComponent(
            nowDate + "_教师成果.xls"
          );
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        })
        .catch((failResponse) => {});
    },
    //处理导出教师成果表格文件
    onExportZIP() {
      //closeDebug console.log("export ZIP:", this.form2Query);
      //参数绑定「筛选参数」
      let params = new URLSearchParams();
      params.append("collegeId", this.form2Query.collegeId);
      params.append("sectorId", this.form2Query.sectorId);
      params.append("keyUsername", this.form2Query.keyUsername); //用户id
      params.append("keyName", this.form2Query.keyName); //姓名
      params.append("typeId", this.form2Query.typeId); //成果等级
      params.append("keyAwardName", this.form2Query.keyAwardName); //成果名
      params.append("keyAwardPlace", this.form2Query.keyAwardPlace); //期刊名
      exportTeaPaperZIP(params)
        .then((res) => {
          //closeDebug console.log("-----------导出教师成果表格文件---------------");
          //closeDebug console.log(res);
          const blob = new Blob([res.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          //new一个时间对象
          var nowDate = new Date().toLocaleDateString();
          downloadElement.download = decodeURIComponent(
            nowDate + "_教师成果图片.zip"
          );
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        })
        .catch((failResponse) => {});
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
