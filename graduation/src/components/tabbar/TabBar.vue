<template>
  <div class="tab-bar"><slot></slot></div>
</template>

<script>

  export default {
    name: 'TabBar',
  }
</script>

<style scoped>
  .tab-bar {
    width: 100%;
    height: 49px;
    box-shadow: 1px 0px 1px #f6f6f6;

    display: flex;
    
    position: fixed;
    bottom: 0;
    left: 0;

    z-index: 99;
  }
</style>