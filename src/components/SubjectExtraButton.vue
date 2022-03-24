<template>
  <div class="upload-mid-subject">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :xs="6" :sm="6" :md="3" :lg="3" :xl="3">
        <el-button @click="onSelectPaper">上传成果</el-button>
      </el-col>
      <el-col :xs="6" :sm="6" :md="3" :lg="3" :xl="3">
        <el-button @click="onSelectEdit" type="danger">申请变更</el-button>
      </el-col>
      <el-col :xs="6" :sm="6" :md="3" :lg="3" :xl="3">
        <el-button @click="onUploadFile">中期检查</el-button>
      </el-col>
      <el-col :xs="6" :sm="6" :md="3" :lg="3" :xl="3">
        <el-button @click="handleFinish" type="primary">申请结题</el-button>
      </el-col>
    </el-row>
    <!-- 上传成果 -->
    <el-dialog title="成果选择" :visible.sync="ifShowPaperDialog" width="90%">
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
              @click="handlePaperSelect(scope.$index, scope.row)"
              style="margin-right: 10px"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 申请修改 -->
    <el-dialog title="申请修改" :visible.sync="ifShowEditDialog" width="90%">
      <el-form ref="form" :model="EditData" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="7" :xs="24"
            ><el-form-item label="项目名称" class="no-padding">
              <el-input v-model="detailData.subject" readonly></el-input>
            </el-form-item> </el-col
          ><el-col :span="7" :xs="24">
            <el-form-item label="负责人姓名" class="no-padding">
              <el-input v-model="detailData.name" readonly></el-input>
            </el-form-item> </el-col
          ><el-col :span="7" :xs="24">
            <el-form-item label="所属单位" class="no-padding">
              <el-input v-model="detailData.place" readonly></el-input>
            </el-form-item> </el-col
          ><el-col :span="7" :xs="24">
            <el-form-item label="所属学院" class="no-padding">
              <el-input v-model="detailData.college" readonly></el-input>
            </el-form-item> </el-col
          ><el-col :span="7" :xs="24">
            <el-form-item label="立项时间" class="no-padding">
              <el-input v-model="detailData.time" readonly></el-input>
            </el-form-item> </el-col
          ><el-col :span="7" :xs="24">
            <el-form-item label="计划完成时间" class="no-padding">
              <el-input v-model="detailData.finishAt" readonly></el-input>
            </el-form-item> </el-col
        ></el-row>
        <el-form-item label="请选择变更类型" prop="editType">
          <el-radio-group v-model="EditData.editType" size="medium">
            <!-- 1在数据库中是默认不变更状态 -->
            <el-radio border label="2">预算变更</el-radio>
            <el-radio border label="3">成员变更</el-radio>
            <el-radio border label="4">延期变更</el-radio>
            <el-radio border label="5">中止变更</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目附件" required prop="editFileList">
          <el-upload
            class="img-upload"
            ref="upload"
            action="#"
            :auto-upload="false"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="FileList"
            :multiple="true"
            list-type="text"
            :limit="5"
            accept=".pdf"
          >
            <el-button size="small">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传 PDF 格式文件，且总大小不超过100MB，最多上传5份
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: 40px" size="medium">
          <el-button type="primary" @click="handleEdit" :loading="submitButton"
            >立即提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 中期检查 -->
    <el-dialog
      title="中期检查报告上传"
      :visible.sync="ifShowMidDialog"
      width="90%"
    >
      <i class="header-icon el-icon-info"></i>
      <el-upload
        class="upload-card"
        ref="upload"
        action="#"
        :auto-upload="false"
        :on-remove="handleRemove2"
        :on-exceed="handleExceed2"
        :on-change="handleChange2"
        :file-list="FileList2"
        :multiple="true"
        list-type="text"
        :limit="5"
        accept=".pdf"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">
          只能上传 PDF 格式文件，且总大小不超过100MB，最多上传5份
        </div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifShowMidDialog = false">取 消</el-button>
        <el-button type="primary" @click="uploadMid">立即提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  uploadMidSubject,
  updateSubjectPaper,
  ApplyFinishSubject,
  getPaperSelectList,
  ApplyEdit,
} from "../api";
export default {
  name: "SubjectExtraButton",
  props: { detailData: {}, goback: { type: Function }, id: Number },
  data() {
    return {
      ifShowEditDialog: false,
      ifShowPaperDialog: false,
      ifShowMidDialog: false,
      ifShowMidDialog: false,
      dialogFileUrl: "", //文件预览的url
      PaperData: [{}],
      submitButton: false,
      FileList: [],
      FileList2: [],
      EditData: [
        {
          editType: "",
          editFileList: [],
        },
      ],
      PaperColumns: [
        { name: "成果类型", value: "typeName", width: "130", ifShow: true },
        { name: "成果名称", value: "paperName", width: "auto", ifShow: true },
        { name: "成果单位", value: "paperPlace", width: "auto", ifShow: true },
        {
          name: "成果审核状态",
          value: "reviewName",
          width: "auto",
          ifShow: true,
        },
        {
          name: "记录上传时间",
          value: "createAt",
          width: "200",
          ifShow: true,
        },
        {
          name: "记录审核时间",
          value: "reviewAt",
          width: "200",
          ifShow: true,
        },
      ],
      SubjectFileList: [],
    };
  },
  methods: {
    //展示中期检查页
    onUploadFile() {
      this.ifShowMidDialog = true;
    },
    //展示上传成果页
    onSelectPaper() {
      this.ifShowPaperDialog = true;
      this.getPaperData();
    },
    //展示项目变更页
    onSelectEdit() {
      this.ifShowEditDialog = true;
    },
    getPaperData() {
      let _this = this;
      //参数绑定「分页大小、页码」
      getPaperSelectList()
        .then((res) => {
          //closeDebug console.log("-----------获取个人成果列表---------------");
          //closeDebug console.log(res.data);
          (_this.PaperData = res), (_this.dataCount = res.count);
        })
        .catch((failResponse) => {});
    },
    //上传成果
    handlePaperSelect(index, row) {
      let _this = this;
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("SubjectId", this.id);
      params.append("PaperId", row.id);
      updateSubjectPaper(params)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
          if (res.code === 0) {
            _this.ifShowPaperDialog = false;
            _this.$message({
              message: res.msg,
              type: "success",
            });
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    //申请变更
    handleEdit() {
      let _this = this;
      _this.submitButton = true;
      _this.$message({
        dangerouslyUseHTMLString: true,
        duration: 0,
        type: "success",
        message:
          '<strong>上传中,请勿关闭页面</strong><i class="el-icon-loading"></i>',
      });

      //closeDebug console.log();
      let data2upload = new FormData();
      //获取实际input组件的文件
      let filesList = this.EditData.editFileList;
      //循环加入多文件
      for (let i = 0; i < filesList.length; i++) {
        data2upload.append("file", filesList[i].raw, filesList[i].raw.name);
      }
      data2upload.append("SubjectId", this.id);
      data2upload.append("type", this.EditData.editType);
      data2upload.append("reviewId", this.detailData.reviewId);
      ApplyEdit(data2upload)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
          if (res.code === 0) {
            _this.$message.closeAll();
            _this.submitButton = false;
            _this.$notify({
              title: res.msg,
              message: "项目变更文件上传成功！请刷新页面",
              type: "success",
              duration: 0,
            });
            _this.ifShowEditDialog = false;
            _this.goback();
          } else {
            _this.$message.closeAll();
            _this.submitButton = false;
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
          _this.$refs.upload.clearFiles();
        })
        .catch((failResponse) => {});
    },
    //申请结题
    handleFinish(index) {
      let _this = this;
      //closeDebug console.log("点击查看", index, row);
      let params = new URLSearchParams();
      params.append("SubjectId", this.id);
      params.append("reviewId", this.detailData.reviewId);
      ApplyFinishSubject(params)
        .then((res) => {
          //closeDebug console.log("-----------删除奖项---------------");
          if (res.code === 0) {
            _this.$notify({
              title: res.msg,
              message: "结题申请成功！等待管理员审核……",
              type: "success",
              duration: 0,
            });
            _this.goback();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
    },
    //上传中期检查
    uploadMid() {
      let _this = this;
      //closeDebug console.log("uploadMid");
      // 通过 FormData 对象上传文件
      var formData = new FormData();
      formData.append("id", this.id);
      //循环加入多文件
      let filesList = this.SubjectFileList;
      for (let i = 0; i < filesList.length; i++) {
        formData.append("file", filesList[i].raw, filesList[i].raw.name);
        //closeDebug console.log("加入了一个文件");
      }
      uploadMidSubject(formData)
        .then((res) => {
          //closeDebug console.log("-----------更新文件---------------");
          //closeDebug console.log("服务器返回值：", res);
          if (res.code === 0) {
            _this.$notify({
              title: res.msg,
              message: "中期检查申请成功！请刷新页面",
              type: "success",
              duration: 0,
            });
            _this.goback();
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
          _this.$refs.upload.clearFiles();
        })
        .catch((failResponse) => {});
      this.ifShowMidDialog = false;
    },
    //处理已上传文件与表单内容的同步
    handleChange(file, FileList) {
      //closeDebug console.log("添加文件后", file, FileList);
      this.EditData.editFileList = FileList;
    },
    //处理已上传的文件的删除
    handleRemove(file, FileList) {
      //closeDebug console.log("删除文件后", file, FileList);
    },
    //处理上传文件超过限制
    handleExceed(files, FileList) {
      //closeDebug console.log("数量超出限制时", files, FileList);
      this.$message({
        message: "已达到文件数量上限",
        type: "error",
      });
    },
    //处理已上传文件与表单内容的同步
    handleChange2(file, FileList) {
      //closeDebug console.log("添加文件后", file, FileList);
      this.SubjectFileList = FileList;
    },
    //处理已上传的文件的删除
    handleRemove2(file, FileList) {
      //closeDebug console.log("删除文件后", file, FileList);
    },
    //处理上传文件超过限制
    handleExceed2(files, FileList) {
      //closeDebug console.log("数量超出限制时", files, FileList);
      this.$message({
        message: "已达到文件数量上限",
        type: "error",
      });
    },
  },
};
</script>

<style>
.upload-card .el-upload-dragger {
  width: 100% !important;
}
.upload-card .el-upload {
  width: 100%;
}
</style>
