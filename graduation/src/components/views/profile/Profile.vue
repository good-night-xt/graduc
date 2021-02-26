<template>
  <div class="profile_container">
    <!-- 头部区域 -->
    <div class="top_container">
      <img src="../../../assets/img/login/login.png" alt="">
      <span>{{ name }}</span>
      <span>{{ grade }}</span>
    </div>
    <!-- 收藏，足迹 -->
    <el-card class="box-card card2">
      <div class="text item">
        <div class="icon iconfont">
          15<br />
          <span>积分</span>
        </div>
        <div class="icon iconfont">
          0<br />
          <span>代金券</span>
        </div>
        <div class="icon iconfont">
          0<br />
          <span>收藏</span>
        </div>
        <div class="icon iconfont">
          6<br />
          <span>足迹</span>
        </div>
      </div>
    </el-card>
    <!-- 我的订单 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix" @click="orderClick">
        <span>我的订单</span>
        <span>查看我的全部订单&gt;</span>
      </div>
      <div class="text item">
        <div class="icon iconfont">
          &#xe644;<br />
          <span>待付款</span>
        </div>
        <div class="icon iconfont">
          &#xe613;<br />
          <span>待出行</span>
        </div>
        <div class="icon iconfont">
          &#xe621;<br />
          <span>待点评</span>
        </div>
        <div class="icon iconfont">
          &#xe639;<br />
          <span>退款单</span>
        </div>
      </div>
    </el-card>
    <!-- footer -->
    <el-card class="box-card card2">
      <div class="text item">
        <div class="icon iconfont" @click="infoClick">
          &#xe624;<br />
          <span>常用信息</span>
        </div>
        <div class="icon iconfont" @click="memberClick">
          &#xe622;<br />
          <span>VIP会员</span>
        </div>
        <div class="icon iconfont">
          &#xe6b4;<br />
          <span>我的点评</span>
        </div>
        <div class="icon iconfont" @click="codeClick">
          &#xe646;<br />
          <span>付款码</span>
        </div>
      </div>
    </el-card>
    <!-- 修改个人信息按钮 -->
    <el-row>
      <el-button type="info" round @click="editClick">修改个人信息</el-button>
    </el-row>
    <!-- 退出登录按钮 -->
    <el-row>
      <el-button type="info" round @click="exitBtnClick">退出登录</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    created() {
      this.$nextTick(() => {
        // 拿到登录用户的个人信息
        this.user = this.$store.state.userObj

        // 名称
        this.name = this.user.name

        // 判断会员等级
        this.memberGrade()
      })
    },
    data() {
      return {
        // 登录用户的个人信息
        user: null,
        // 会员等级
        grade: '',
        // 名称
        name: ''
      }
    },
    methods: {
      // 我的订单点击
      orderClick() {
        this.$router.push('/order')
      },

      // 退出按钮的点击
      exitBtnClick() {
        this.$router.push('/')
      },

      // 常用信息点击
      infoClick() {
        this.$router.push('/info')
      },

      // 会员点击
      memberClick() {
        this.$router.push('/member')
      },

      // 付款码的点击
      codeClick() {
        this.$router.push('/payCode')
      },

      // 修改信息的点击
      editClick() {
        this.$router.push('/personInfo')
      },

      // 判断会员是什么级别
      memberGrade() {
        if (this.user.member == 0) {
          this.grade = '非会员'
        } else if (this.user.member == 1) {
          this.grade = '黄金会员'
        } else if (this.user.member == 2) {
          this.grade = '铂金会员'
        } else if (this.user.member == 3) {
          this.grade = '钻石会员'
        }
      }
    }
  }
</script>

<style scoped>
  .profile_container {
    height: calc(100vh - 50px);
    background-color: rgb(206, 235, 233);
    padding-top: 10px;
    box-sizing: border-box;
  }

  .top_container {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bolder;
  }

  .top_container img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-left: 10px;
    vertical-align: middle;
  }

  .top_container span {
    margin-left: 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    display: flex;
    margin-bottom: 18px;
    align-items: center;
    justify-content: center;
  }

  .item .icon {
    flex: 1;
    font-size: 28px;
    text-align: center;
    color: rgb(87, 212, 216);
  }

  .item .icon span {
    font-size: 14px;
    color: #555;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .clearfix span:last-child {
    float: right;
  }

  .box-card {
    width: 95vw;
    margin: 20px auto;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .card2 .item .icon {
    color: #999;
  }

  .el-button {
    width: 95vw;
    height: 64px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 800;
    margin-left: 2.5vw;
    margin-top: 10px;
  }
</style>