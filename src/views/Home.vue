<template>
  <div class="home">
    <el-row
      :gutter="16"
      :xs="24"
      type="flex"
      style="flex-wrap: wrap"
      justify="center"
    >
      <el-col :md="24" :lg="7">
        <WelCome
          :name="name"
          :username="username"
          :role="role"
          :roleId="roleId"
          :college="college"
          :l_class="l_class"
          :l_number="l_number"
          :l_unmanage="l_unmanage"
          :t_sector="t_sector"
          :genderId="l_genderId"
          :stuItemNum="stuItemNum"
          :teaItemNum="teaItemNum"
          :totalItemNum="totalItemNum"
          :windowWidth="windowWidth"
        />

        <div class="info-inform" v-if="windowWidth < 720">
          <NumberCounter
            :stuNum="stuItemNum"
            :teaNum="teaItemNum"
            :instructorNum="l_instructor"
            v-if="roleId == 3"
          />
          <TeacherCounter
            :stuNum="stuItemNum"
            :teaNum="teaItemNum"
            :totalNum="totalItemNum"
            v-if="roleId == 4"
          />
          <PersonalCounter
            :allNum="stuItemNum"
            :majorNum="stuMajorNum"
            :classNum="stuClassNum"
            v-if="roleId == 5 || roleId == 6"
          />
          <CounterDetail
            :internationalNum="stuInternationalNum"
            :nationNum="stuNationNum"
            :provinceNum="stuProvinceNum"
            :schoolNum="stuSchoolNum"
            v-if="roleId == 1 || roleId == 2"
          />
          <Inform :roleId="roleId ? roleId : 5" />
        </div>
      </el-col>
      <el-col :md="24" :lg="17" v-if="windowWidth >= 720">
        <NumberCounter
          :stuNum="stuItemNum"
          :teaNum="teaItemNum"
          :instructorNum="l_instructor"
          v-if="roleId == 3"
        />
        <TeacherCounter
          :stuNum="stuItemNum"
          :teaNum="teaItemNum"
          :totalNum="totalItemNum"
          v-if="roleId == 4"
        />
        <PersonalCounter
          :allNum="stuItemNum"
          :majorNum="stuMajorNum"
          :classNum="stuClassNum"
          v-if="roleId == 5 || roleId == 6"
        />
        <template v-if="roleId == 1 || roleId == 2">
          <RecordCounter
            :paperNum="teaPaperNum"
            :bookNum="teaBookNum"
            :patentNum="teaPatentNum"
            :subjectNum="teaSubjectNum"
          />
          <CounterDetail
            :internationalNum="stuInternationalNum"
            :nationNum="stuNationNum"
            :provinceNum="stuProvinceNum"
            :schoolNum="stuSchoolNum"
          />
        </template>
        <el-divider direction="vertical" content-position="center" />
        <AwardShow :roleId="roleId ? roleId : 5" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { initDetail } from "../api";
import RecordCounter from "../components/RecordCounter.vue";
import Inform from "../components/Inform.vue";
import NumberCounter from "../components/NumberCounter.vue";
import PersonalCounter from "../components/PersonalCounter.vue";
import CounterDetail from "../components/CounterDetail.vue";
import TeacherCounter from "../components/TeacherCounter.vue";
import AwardShow from "../components/AwardShow.vue";
import WelCome from "../components/WelCome.vue";
export default {
  name: "Home",
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      stuItemNum: 0,
      stuMajorNum: 0,
      stuClassNum: 0,
      teaItemNum: 0,
      totalItemNum: 0,
      stuInternationalNum: 0,
      stuNationNum: 0,
      stuProvinceNum: 0,
      stuSchoolNum: 0,
      teaSubjectNum: 0,
      teaPatentNum: 0,
      teaBookNum: 0,
      teaPaperNum: 0,
      l_instructor: 0,
      l_unmanage: 0,
      l_number: 0, //个人奖状数
    };
  },
  watch: {
    windowWidth(val) {
      let that = this;
      //closeDebug console.log("实时屏幕宽度：", val, that.windowHeight);
    },
  },
  components: {
    NumberCounter,
    AwardShow,
    WelCome,
    Inform,
    CounterDetail,
    PersonalCounter,
    TeacherCounter,
    RecordCounter,
  },
  methods: {
    init() {
      let _this = this;
      initDetail()
        .then((res) => {
          //closeDebug console.log("-----------主页初始化---------------");
          if (res.code === 0) {
            // _this.$notify({
            //   title: "登陆成功",
            //   message: "欢迎回来",
            //   type: 'success'
            // });
            let obj = JSON.parse(res.msg);
            //closeDebug console.log("用户信息解析", obj);
            this.totalItemNum = obj.l_document; //总奖项数
            this.stuItemNum = obj.l_student; //学生奖项数
            this.stuMajorNum = obj.l_stumajor; //学生专业奖项数
            this.stuClassNum = obj.l_stuclass; //学生奖项数
            this.teaItemNum = obj.l_teacher; //教师奖项数
            this.stuInternationalNum = obj.l_international; //学生国际奖数
            this.stuNationNum = obj.l_nation; //学生国奖数
            this.stuProvinceNum = obj.l_province; //学生省奖数
            this.stuSchoolNum = obj.l_school; //学生校奖数
            this.teaPaperNum = obj.l_paper; //教师论文数
            this.teaPatentNum = obj.l_patent; //教师专利数
            this.teaSubjectNum = obj.l_subject; //教师项目数
            this.teaBookNum = obj.l_book; //教师著作数
            this.l_number = obj.l_number; //个人奖状数
            this.l_instructor = obj.l_instructor; //辅导员所管辖班级奖项数
            this.l_unmanage = obj.l_unmanage; //未审核奖项数
          } 
        })
        .catch((failResponse) => {});
    },
  },
  mounted() {
    this.init();
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        this.windowWidth = window.fullWidth; // 宽
      })();
    };
    if (document.documentElement.clientWidth < 720) {
      //closeDebug console.log("触发移动端布局");
    }
  },
  computed: {
    ...mapGetters([
      "name",
      "username",
      "role",
      "college",
      "t_sector",
      "l_genderId",
      "l_class",
      "roleId",
    ]),
  },
};
</script>

<style></style>
