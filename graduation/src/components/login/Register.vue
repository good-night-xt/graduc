<template>
  <div class="register_container">
    <!-- logo -->
    <img src="@/assets/img/login/login.png" alt="">
    <h2>欢迎注册</h2>
    <!-- 提示密码错误区域 -->
    <div class="active" v-if="isTrue">确认密码错误</div>
    <div class="active" v-if="isNull">选项不能为空</div>
    <div class="active" v-if="isEnough">密码长度不能小于8位</div>
    <!-- 以下数据不要使用form表单  不然点击button时会刷新页面 -->
    <div>
      <label for="name" class="letter_space">名字:</label>
      <input type="text" id="name" placeholder="请输入名称" v-model="name">
      <br />
      <label for="account" class="letter_space">账号:</label>
      <input type="text" id="account" v-model="account" readonly>
      <br />
      <label for="password" class="letter_space">密码:</label>
      <input type="password" id="password" placeholder="请输入密码" v-model="password" @blur="confirmLength">
      <br/>
      <label for="confirmPassword">确认密码：</label>
      <input type="password" id="confirmPassword" placeholder="请再次输入密码确认" v-model="confirmPassword">
      <button @click="registerBtnClick">注册</button>
      <button @click="loginBtnClick">登录</button>
    </div>
  </div>
</template>

<script>
  import { getRegister } from '@/network/loginAndRegister'

  export default {
    name: 'Register',
    created() {
      // 生成随机账号
      this.makeAccount()
    },
    data() {
      return {
        // 名称
        name: '',
        // 账号
        account: '',
        // 密码
        password: '',
        // 确认密码
        confirmPassword: '',
        // 判断确认密码是否正确
        isTrue: false,
        // 判断是否有选项未填
        isNull: false,
        // 判断密码长度是否超过八位
        isEnough: false
      }
    },
    methods: {

      // 注册按钮的点击
      registerBtnClick() {
        // 名称，密码不能为空
        if (this.name === '' || this.password === '') {
          this.isNull = true
          return ;
        }
        if (this.password !== this.confirmPassword) {
          this.isTrue = true
        } else {
          // 将信息发给后端并保存
          var obj = {};
          obj.name = this.name;
          obj.account = this.account;
          obj.password = this.password;
          // 会员信息默认为0(非会员)
          obj.member = 0;
          
          getRegister(JSON.parse(JSON.stringify(obj)))

          // 将账号密码信息添加到登录页
          window.localStorage.setItem('registerObj', JSON.stringify(obj));
          // console.log(window.localStorage.getItem('registerObj'))

          // 同时转到登录页
          this.$router.push('/login')
        }
      },

      // 检查密码长度不能小于8位
      confirmLength() {
        if (this.password.length < 8) {
          this.isEnough = true
        }
      },

      // 生成随机账号
      makeAccount() {
        // 随机长度
        var numLength = parseInt(Math.random() * 7) + 5;
        var num = parseInt(Math.random() * Math.pow(10, numLength))
        // 随机账号
        this.account = num + ''
      },

      // 重置按钮的点击
      loginBtnClick() {
        this.$router.push('/login')
      },
    }
  }
</script>

<style scoped>
  .register_container {
    width: 80vw;
    height: 90vh;
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

  .letter_space {
    letter-spacing: 15px;
  }

  input {
    width: 65%;
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

  .active {
    width: 100%;
    color: red;
    text-align: center;
  }
</style>