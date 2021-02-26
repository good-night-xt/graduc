<template>
  <div class="footer_container">
    <slot name="imageSlot"></slot>
  </div>
</template>

<script>
  export default {
    name: 'FooterImg'
  }
</script>

<style scoped>
  .footer_container {
    width: 90vw;
    height: 150px;
    margin: 0 auto;
    text-align: center;
    line-height: 150px;
    margin-top: 30px;
    border: 1px solid #aaa;
    border-radius: 10px;
    overflow: hidden;
  }

</style>
