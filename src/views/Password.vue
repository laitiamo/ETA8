<template>
  <div class="password">
    <h3>修改密码</h3>
    <el-form
      :model="uploadForm"
      status-icon
      :rules="rules"
      ref="uploadForm"
      label-width="100px"
      class="demo-uploadForm"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input
          type="password"
          v-model="uploadForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="uploadForm.newPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="uploadForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <div class="captcha-input-container">
          <el-input
            type="captcha"
            v-model="uploadForm.captcha"
            autocomplete="off"
          ></el-input>
          <img
            class="captcha-img"
            src=""
            ref="code"
            alt="verify"
            @click="changeCode"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('uploadForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('uploadForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePass, getCaptcha } from "../api";
import { checkState } from "../api/index";
export default {
  name: "Password",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.uploadForm.checkPass !== "") {
          this.$refs.uploadForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.uploadForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCap = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      uploadForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
        captcha: "",
      },
      rules: {
        oldPass: { required: true, message: "请输入旧密码", trigger: "blur" },
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
          {
            pattern: new RegExp("^[a-zA-Z0-9_]{6,20}$"),
            message: "密码长度在6-20个字符，由数字和字母组成",
          },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateCap, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //得到验证码图片
    this.changeCode();
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //前端校验通过后，进行登陆操作
          let params = new URLSearchParams();
          let ifLogin = false;
          params.append("old-pass", this.uploadForm.oldPass);
          params.append("new-pass", this.uploadForm.newPass);
          params.append("new-pass-v", this.uploadForm.checkPass);
          params.append("captcha", this.uploadForm.captcha);
          checkState()
            .then((res) => {
              //closeDebug console.log("登陆状态检测请求成功", res);
              ifLogin = true;
            })
            .catch((err) => {
              //closeDebug console.log("登陆状态检测请求失败", err);
            })
            .finally(() => {
              if (!ifLogin) {
                _this.$message({
                  message: "登录状态异常，请重新登录",
                  type: "error",
                  showClose: true,
                });
                _this.$router.push({ path: "/" });
              } else {
                updatePass(params)
                  .then((res) => {
                    //closeDebug console.log("-----------提交密码修改---------------");
                    //closeDebug console.log(res);
                    if (res.code === 0) {
                      _this.$message({
                        message: res.msg,
                        type: "success",
                        showClose: true,
                      });
                      _this.$router.push({ path: "/eta/home" });
                    } else {
                      _this.$message({
                        message: res.msg,
                        type: "error",
                        showClose: true,
                      });
                      _this.changeCode();
                    }
                  })
                  .catch((failResponse) => {});
              }
            });
        } else {
          //closeDebug console.log("error submit!!");
          return false;
        }
      });
    },
    //获取随机数作来生成验证码
    getCaptchaKey() {
      let captchaKey = Math.random();
      return captchaKey;
    },
    //刷新验证码
    changeCode() {
      let _this = this;
      let captcha_key = this.getCaptchaKey();
      //此接口传入的是blob格式数据，再渲染至窗口
      getCaptcha(captcha_key)
        .then((res) => {
          //closeDebug console.log(res);
          _this.$refs.code.setAttribute("src", window.URL.createObjectURL(res));
        })
        .catch((err) => {
          //closeDebug console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.captcha-input-container {
  display: flex;
  flex-direction: row;
}
.captcha-img {
  height: 38px;
  width: 108px;
  margin-left: 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
