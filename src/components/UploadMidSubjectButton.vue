<template>
  <div class="upload-mid-subject">
    <el-button @click="onUploadFIle" style="margin:10px" type="primary"
      >中期检查</el-button
    >
    <el-dialog
      title="中期检查报告上传"
      :visible.sync="ifShowUpdateDialog"
      width="90%"
    >
      <i class="header-icon el-icon-info"></i>
      <el-upload
        class="upload-card"
        ref="upload"
        action="#"
        :auto-upload="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :file-list="FileList"
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
        <el-button @click="ifShowUpdateDialog = false">取 消</el-button>
        <el-button type="primary" @click="uploadMid">立即提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadMidSubject } from "../api";
export default {
  name: "UploadMidSubjectButton",
  props: ["id"],
  data() {
    return {
      id: this.id,
      ifShowUpdateDialog: false,
      dialogFileUrl: "", //文件预览的url
      SubjectFileList: [],
    };
  },
  methods: {
    //打开更新文件弹窗
    onUploadFIle() {
      this.ifShowUpdateDialog = true;
    },
    // 文件上传
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
              message:
                "上传成功！返回后请刷新页面",
              type: "success",
              duration: 0,
            });
          } else {
            _this.$message({
              message: res.msg,
              type: "error",
            });
          }
          _this.$refs.upload.clearFiles();
        })
        .catch((failResponse) => {});
      this.ifShowUpdateDialog = false;
    },
    //处理已上传文件与表单内容的同步
    handleChange(file, fileList) {
      //closeDebug console.log("添加文件后", file, fileList);
      this.SubjectFileList = fileList;
    },
    //处理已上传的文件的删除
    handleRemove(file, fileList) {
      //closeDebug console.log("删除文件后", file, fileList);
    },
    //处理上传文件超过限制
    handleExceed(files, fileList) {
      //closeDebug console.log("数量超出限制时", files, fileList);
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
