<template>
  <div class="navbar_container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  .navbar_container {
    display: flex;
    height: 66px;
    line-height: 66px;
    text-align: center;
  }

  .left {
    width: 66px;
  }

  .center {
    flex: 1;
  }

  .right {
    width: 100px;
    margin-right: 5px;
  }
</style>
