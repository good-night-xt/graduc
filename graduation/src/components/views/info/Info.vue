<template>
  <div class="info_container">
    <!-- 顶部导航栏 -->
    <navbar>
      <div slot="left">
        <div slot="left" class="icon iconfont left" @click="backClick">&#xe61d;</div>
      </div>
      <div slot="center">常用信息</div>
      <div slot="right">隐私</div>
    </navbar>

    <!-- 个人信息 -->
    <h3>个人信息</h3>
    <el-card class="box-card">
      <p>用户名：{{ name }} <slot name="edit"></slot></p> 
      <p>账号：{{ account }}</p>
      <p>会员等级：{{ grade }}</p>
    </el-card>


    <!-- footer -->
    <h5>没有更多了</h5>
  </div>
</template>

<script>
  import Navbar from '@/components/public/Navbar'

  export default {
    name: 'Info',
    components: {
      Navbar
    },
    mounted() {
      this.userObj = this.$store.state.userObj

      this.name = this.userObj.name
      this.account = this.userObj.account
      this.memberGrade()
    },
    data() {
      return {
        // 登录用户的个人信息
        userObj: null,
        // 个人信息中的名称
        name: '',
        // 个人信息的账号
        account: '',
        // 会员等级
        grade: ''
      }
    },
    methods: {
      // 顶部导航栏返回的点击
      backClick() {
        this.$router.push('/profile')
      },

      // 判断会员是什么级别
      memberGrade() {
        if (this.userObj.member == 0) {
          this.grade = '非会员'
        } else if (this.userObj.member == 1) {
          this.grade = '黄金会员'
        } else if (this.userObj.member == 2) {
          this.grade = '铂金会员'
        } else if (this.userObj.member == 3) {
          this.grade = '钻石会员'
        }
      }
    }
  }
</script>

<style scoped>
  .info_container {
    width: 100vw;
    height: 100vh;
    background-color:  rgb(206, 235, 233);
  }

  .box-card {
    width: 95vw;
    margin: 10px auto;
    margin-bottom: 30px;
  }

  h3 {
    color: rgb(216, 123, 79);
    text-align: center;
  }

  h5 {
    color: #ccc;
    text-align: center;
  }
</style>
