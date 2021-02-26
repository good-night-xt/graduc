<template>
  <div id="app">
    <keep-alive include="Home,Order,Travel,Profile"><router-view></router-view></keep-alive>
    <div v-show="isLogin">
      <main-tab-bar></main-tab-bar>
    </div>
  </div>
</template>

<script>
  import MainTabBar from './components/maintabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    },
    computed: {
      isLogin() {
        if(this.$route.path.includes('/login') || this.$route.path.includes('/register') || this.$route.path.includes('/ticketSearch') || 
        this.$route.path.includes('/info') || this.$route.path.includes('/member') || this.$route.path.includes('/payCode') || 
        this.$route.path.includes('/ticketBuy') || this.$route.path.includes('/personInfo')) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style scoped>

</style>