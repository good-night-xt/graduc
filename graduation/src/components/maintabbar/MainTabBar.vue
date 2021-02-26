<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img src="@/assets/img/tabbar/sy.png" slot="img">
      <img src="@/assets/img/tabbar/syActive.png" slot="imgActive">
      <p slot="text">首页</p>
    </tab-bar-item>
    <tab-bar-item path="/order">
      <img src="@/assets/img/tabbar/dd.png" slot="img">
      <img src="@/assets/img/tabbar/ddActive.png" slot="imgActive">
      <p slot="text">订单</p>
    </tab-bar-item>
    <tab-bar-item path="/travel">
      <img src="@/assets/img/tabbar/lx.png" slot="img">
      <img src="@/assets/img/tabbar/lxActive.png" slot="imgActive">
      <p slot="text">服务</p>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="@/assets/img/tabbar/wd.png" slot="img">
      <img src="@/assets/img/tabbar/wdActive.png" slot="imgActive">
      <p slot="text">我的</p>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from '../tabbar/TabBar'
  import TabBarItem from '../tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
  .tab-bar-item img {
    width: 24px;
  }

  * {
    margin: 0;
    padding: 0;
  }
</style>