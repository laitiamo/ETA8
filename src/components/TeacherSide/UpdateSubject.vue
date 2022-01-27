<template>
  <div>
    <el-row :gutter="20" v-show="!ifShowUpload">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item>
          <el-select
            v-model="form2Query.awardId"
            placeholder="全部类型"
            @change="QueryRecord"
            style="width: 140px"
          >
            <el-option label="全部类型" value=""></el-option>
            <el-option
              v-for="opt in rankList1"
              :key="opt.id"
              :label="opt.awardName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form2Query.paperId"
            placeholder="全部奖项"
            style="width: 300px"
          >
            <el-option label="全部奖项" value=""></el-option>
            <el-option
              v-for="opt in rankList2"
              :key="opt.id"
              :label="opt.awardName"
              :value="opt.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd" :disabled="true"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>


<script>
import { getSubjectList, getPerSubjectList } from "../../api";
export default {
  name: "UploadSubject",
  props: {
  },
  data() {
    return {
      ifShowUpload: true,
      form2Query: {
        awardId: "",
        paperId: "",
      },
      rankList1: [],
      rankList2: [],
    };
  },
  mounted() {
    this.initSubjectList();
  },
  methods: {
    initSubjectList() {
      getSubjectList()
        .then((res) => {
          //closeDebug console.log("-----------初始化查询参数---------------");
          let obj = JSON.parse(res.msg);
          //closeDebug console.log(obj);
          this.rankList1 = obj.rank3;
        })
        .catch((failResponse) => {});
    },
    //更新可供筛选的记录
    QueryRecord() {
      let _this = this;
      _this.form2Query.paperId = "";
      let params = new URLSearchParams();
      params.append("awardId", this.form2Query.awardId);
      getPerSubjectList(params)
        .then((res) => {
          //closeDebug console.log("-----------获取班级列表---------------");
          //closeDebug console.log(res);
          _this.rankList2 = res;
        })
        .catch((failResponse) => {});
    },
    formatter(row, column) {
      return row.address;
    },
    onAdd() {
      this.ifShowUpload = false;
    },
    UploadAwards() {
      this.ifShowUpload = false;
    },
  },
};
</script>
<style>
.div-font {
  font-size: 1.1em;
  font-weight: bold;
  color: black;
}
.detail-info {
  margin: 5px 0 10px 0;
  font-weight: normal;
  font-size: 0.9em;
}
.image-row {
  width: auto;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.row-container {
  min-height: 30px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(156, 156, 156, 0.849);
  margin-left: 10%;
  margin-right: 10%;
}
.row-title {
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}
.row-content {
  text-align: center;
  font-size: 0.9rem;
}
</style>
