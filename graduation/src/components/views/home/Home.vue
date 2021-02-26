<template>
  <div class="home_container" ref="homeRef">
    <!-- 顶部栏 -->
    <navbar>
      <div slot="left" class="icon iconfont left">&#xe61d;</div>
      <div slot="center" class="center">火车票</div>
      <div slot="right" class="icon iconfont right">&#xe696;购买会员</div>
    </navbar>

    <!-- 轮播图 -->
    <carousel @changeBg="changeBg"></carousel>

    <!-- 搜索栏 -->
    <search></search>
  </div>
</template>

<script>
  import Navbar from '../../public/Navbar'
  import Carousel from './homeChild/Carousel'
  import Search from './homeChild/Search'

  export default {
    name: 'Home',
    components: {
      Navbar,
      Carousel,
      Search
    },
    data() {
      return {
        // 背景色数组
        colorArray: null,
        // 将当前路径本地储存
        leavePath: ''
      }
    },
    mounted() {
      // 背景跟随轮播图变化
      this.$eventBus.$on('changeBackground', (index) => {
        // console.log(index)
        this.$refs.homeRef.style.backgroundColor = this.colorArray[index]
      })
    },
    methods: {
      // 背景根据图片进行变化
      changeBg(colorArr) {
        // 拿到carousel传过来的背景颜色数组
        this.colorArray = colorArr
      }
    },
    // 恢复该页面之前的路径
    activated() {
      this.$router.push(window.sessionStorage.getItem('goPath'))
    },
    // 将当前路径本地储存，方便切回页面，路径不变
    beforeRouteLeave(to, from, next) {
      this.leavePath = this.$route.path
      window.sessionStorage.setItem('goPath', this.leavePath)
      next()
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .home_container {
    height: calc(100vh - 50px);
    background-color: rgb(206, 235, 233);
  }

  .home_container div {
    font-size: 18px !important;
    letter-spacing: 2px;
    color: #000;
  }

  .home_container .left {
    box-sizing: border-box;
    padding-top: 2px;
  }

  .center {
    font-weight: 600;
  }

  .right {
    font-weight: 800;
  }
</style>