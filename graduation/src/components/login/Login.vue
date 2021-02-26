<template>
  <div class="login_container">
    <!-- logo -->
    <img src="../../assets/img/login/login.png" alt="">
    <h2>欢迎登录</h2>
    <!-- 提示账号密码错误区域 -->
    <div class="active" v-if="isTrue">账号或密码错误</div>
    <!-- 以下数据不要使用form表单  不然点击button时会刷新页面 -->
    <div> 
      <label for="account">账号：</label>
      <input type="text" id="account" placeholder="请输入账号" v-model="account">
      <br />
      <label for="password">密码：</label>
      <input type="password" id="password" placeholder="请输入密码" v-model="password">
      <button @click="loginBtnClick">登录</button>
      <button @click="resetBtnClick">重置</button>
    </div>
    <!-- 点击注册区域 -->
    <div class="register">
      <a href="javascript:;" @click="registerClick">如没有账号，请点击此处进行注册</a>
    </div>
  </div>
</template>

<script>
  import { getLoginData } from '@/network/loginAndRegister'

  export default {
    name: 'Login',
    mounted() {
      // 判断是否本地已有账号注册
      if(window.localStorage.getItem('registerObj')) {
        var obj = JSON.parse(window.localStorage.getItem('registerObj'));
        this.account = obj.account;
        this.password = obj.password;
      }
    },
    data() {
      return {
        // 账号
        account: '',
        // 密码
        password: '',
        // 判断输入账号密码是否有误
        isTrue: false
      }
    },
    methods: {
      // 登录按钮的点击
      loginBtnClick() {
        // 登录的账号，密码
        var obj = {};
        obj.account = this.account;
        obj.password = this.password;

        // 发送登录请求
        getLoginData(JSON.parse(JSON.stringify(obj))).then((res) => {
          // console.log(res)
          if(res.status === 200) {
            // 保存登录用户的个人信息
            this.$store.state.userObj = res.data.userData;
            // console.log(this.$store.state.userObj)
            // 将token值保存在sessionStorage中
            window.sessionStorage.setItem('localToken', res.data.token);
            this.$router.push('/home')
          }else {
            this.isTrue = true;
          }
        })
      },

      // 重置按钮的点击
      resetBtnClick() {
        this.account = '',
        this.password = ''
      },

      // 注册
      registerClick() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .login_container {
    width: 80vw;
    height: 65vh;
    border: 1px solid #ccc;
    padding: 0px 10px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h2 {
    width: 100%;
    text-align: center;
  }

  img {
    width: 50px;
    height: 50px;
    border: 1px solid #aaa;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;

    transform: translate(calc((80vw - 50px) / 2), -25px);
  }

  input {
    width: 80%;
    height: 25px;
    padding: 8px 4px;
    margin: 30px auto;
    border-radius: 4px;
    outline-style: none;
  }

  button {
    width: 80px;
    height: 50px;
    margin-top: 10px;
    margin-left: 50px;
    /* color: #fff; */
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: 3px;
    outline: none;
  }
  
  .register {
    margin: 25px auto;
    text-align: center;
    color: blue;
  }

  .active {
    width: 100%;
    color: red;
    text-align: center;
  }
</style>