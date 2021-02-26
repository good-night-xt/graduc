<template>
  <div class="code_container">
    <!-- 头部区域 -->
    <navbar>
      <div slot="left" class="icon iconfont left" @click="backClick">&#xe61d;</div>
      <div slot="center" class="center">付款码</div>
    </navbar>
    <!-- 付款码区域 -->
    <div class="code">
      <img src="../../../assets/img/pay_code/pay_code.png" alt="">
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/public/Navbar'

  export default {
    name: 'PayCode',
    components: {
      Navbar
    },
    methods: {
      // 返回按钮的点击
      backClick() {
        this.$router.push('/profile')
      }
    }
  }
</script>

<style scoped>
  .code_container {
    width: 100vw;
    height: 100vh;
    background-color:  rgb(206, 235, 233);
  }

  .code {
    width: 95vw;
    margin: 30px auto;
    text-align: center;
  }

  .code img {
    width: 100%;
  }
</style>
