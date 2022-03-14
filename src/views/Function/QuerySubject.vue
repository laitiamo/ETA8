<template>
  <div class="query-subject">
    <h3 v-show="!ifShowDetail">管理科研项目</h3>
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
            v-model="form2Query.rankId"
            placeholder="全部等级"
            style="width: 140px"
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
          <el-select
            v-model="form2Query.levelId"
            placeholder="全部类型"
            style="width: 140px"
          >
            <el-option label="全部类型" value=""></el-option>
            <el-option
              v-for="opt in levelList"
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
        <el-form-item>
          <el-button type="primary" @click="onExportXLS"
            >导出项目记录信息(XLS)</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onExportZIP"
            >导出项目记录图片(ZIP)</el-button
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
    <SubjectDetail
      :detailData="detailData"
      :goback="goBack"
      v-show="ifShowDetail"
    >
    </SubjectDetail>
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
  getTeaSubjectList,
  getSubjectDetail,
  initQuerySubject,
  delTeaSubject,
  exportTeaSubjectXLS,
  exportTeaSubjectZIP,
} from "../../api";
import SubjectDetail from "../../components/SubjectDetail.vue";
import { mapGetters } from "vuex";
export default {
  name: "QuerySubject",
  components: { SubjectDetail },
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
        {
          name: "项目编号",
          value: "subjectNum",
          width: "150",
          ifShow: true,
        },
        { name: "项目名称", value: "subjectName", width: "auto", ifShow: true },
        {
          name: "所属单位",
          value: "subjectPlace",
          width: "180",
          ifShow: true,
        },
        { name: "项目类别", value: "rankName", width: "160", ifShow: true },
        { name: "项目级别", value: "levelName", width: "150", ifShow: true },
        { name: "负责人姓名", value: "name", width: "120", ifShow: true },
        { name: "教职工号", value: "username", width: "120", ifShow: false },
        { name: "所属学院", value: "collegeName", width: "240", ifShow: false },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "240",
          ifShow: true,
        },
        {
          name: "审核状态",
          value: "reviewName",
          width: "160",
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
        collegeId: "",
        sectorId: "",
        keyUsername: "", //用户id
        keyName: "", //姓名
        rankId: "", //项目记录等级
        levelId: "", //项目记录级别
        keySubjectNum: "", //项目编号
        keySubjectName: "", //项目名称
        keySubjectPlace: "", //项目所属单位
      },
      //下拉栏内容列表
      rankList: [],
      levelList: [],
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
        { name: "教职工号", value: "username", width: "120", ifShow: true },
        { name: "姓名", value: "name", width: "80", ifShow: false },
        { name: "学院名称", value: "collegeName", width: "240", ifShow: false },
        { name: "部门名称", value: "sectorName", width: "120", ifShow: false },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "200",
          ifShow: false,
        },
        {
          name: "审核状态",
          value: "reviewName",
          width: "120",
          ifShow: true,
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
          this.rankList = obj.rank;
          this.levelList = obj.level;
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
      getSubjectDetail(params)
        .then((res) => {
          //closeDebug console.log("-----------获取个人项目详情---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log("个人项目详情", obj);
          this.detailData = obj;
        })
        .catch((failResponse) => {});
      this.ifShowDetail = true;
    },
    //处理删除项目
    handleDel(index, row) {
      //closeDebug console.log("点击删除", index, row);
      let params = new URLSearchParams();
      params.append("id", row.id);
      let _this = this;
      delTeaSubject(params)
        .then((res) => {
          //closeDebug console.log("-----------删除项目---------------");
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
    //项目详情页面处理删除项目
    handleInDel() {
      //closeDebug console.log("点击删除", index, row);
      let params = new URLSearchParams();
      params.append("id", this.selectId);
      let _this = this;
      delTeaSubject(params)
        .then((res) => {
          //closeDebug console.log("-----------删除项目---------------");
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
    //返回重选项目
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
      params.append("rankId", this.form2Query.rankId); //获奖等级
      params.append("levelId", this.form2Query.levelId); //项目记录等级
      params.append("keySubjectNum", this.form2Query.keySubjectNum); //项目编号
      params.append("keySubjectName", this.form2Query.keySubjectName); //项目名称
      params.append("keySubjectPlace", this.form2Query.keySubjectPlace); //所属单位
      params.append("order", this.orderMode);
      params.append("field", this.orderField);
      getTeaSubjectList(params)
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
    //处理导出教师项目表格文件
    onExportXLS() {
      //closeDebug console.log("export XLS:", this.form2Query);
      //参数绑定「筛选参数」
      if (this.form2Query.levelId == "") {
        this.$message({
          message: "请选择项目类型",
          type: "warning",
        });
      } else {
        let params = new URLSearchParams();
        params.append("collegeId", this.form2Query.collegeId);
        params.append("sectorId", this.form2Query.sectorId);
        params.append("keyUsername", this.form2Query.keyUsername); //用户id
        params.append("keyName", this.form2Query.keyName); //姓名
        params.append("keySubjectNum", this.form2Query.keySubjectNum); //项目编号
        params.append("keySubjectName", this.form2Query.keySubjectName); //项目名称
        params.append("keySubjectPlace", this.form2Query.keySubjectPlace); //所属单位
        params.append("rankId", this.form2Query.rankId); //项目记录等级
        params.append("levelId", this.form2Query.levelId); //项目记录等级
        exportTeaSubjectXLS(params)
          .then((res) => {
            //closeDebug console.log("-----------导出教师项目表格文件---------------");
            //closeDebug console.log(res);
            const blob = new Blob([res.data]);
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            //new一个时间对象
            var nowDate = new Date().toLocaleDateString();
            downloadElement.download = decodeURIComponent(
              nowDate + "_教师项目.xls"
            );
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          })
          .catch((failResponse) => {});
      }
    },
    //处理导出教师项目表格文件
    onExportZIP() {
      //closeDebug console.log("export ZIP:", this.form2Query);
      //参数绑定「筛选参数」
      if (this.form2Query.levelId == "") {
        this.$message({
          message: "请选择项目类型",
          type: "warning",
        });
      } else {
        let params = new URLSearchParams();
        params.append("collegeId", this.form2Query.collegeId);
        params.append("sectorId", this.form2Query.sectorId);
        params.append("keyUsername", this.form2Query.keyUsername); //用户id
        params.append("keyName", this.form2Query.keyName); //姓名
        params.append("keySubjectNum", this.form2Query.keySubjectNum); //项目编号
        params.append("keySubjectName", this.form2Query.keySubjectName); //项目名称
        params.append("keySubjectPlace", this.form2Query.keySubjectPlace); //所属单位
        params.append("rankId", this.form2Query.rankId); //项目记录等级
        params.append("levelId", this.form2Query.levelId); //项目记录等级
        exportTeaSubjectZIP(params)
          .then((res) => {
            //closeDebug console.log("-----------导出教师项目表格文件---------------");
            //closeDebug console.log(res);
            const blob = new Blob([res.data]);
            var downloadElement = document.createElement("a");
            var href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            //new一个时间对象
            var nowDate = new Date().toLocaleDateString();
            downloadElement.download = decodeURIComponent(
              nowDate + "_教师项目图片.zip"
            );
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
          })
          .catch((failResponse) => {});
      }
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
