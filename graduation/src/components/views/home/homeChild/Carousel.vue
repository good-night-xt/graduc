<template>
  <swiper>
    <img src="@/assets/img/home/one.png" alt="">
    <img src="@/assets/img/home/two.jpg" alt="">
    <img src="@/assets/img/home/three.jpg" alt="">
    <img src="@/assets/img/home/four.jpg" alt="">
    <img src="@/assets/img/home/one.png" alt="">
  </swiper>
</template>

<script>
  import Swiper from '@/components/public/Swiper'

  export default {
    name: 'Carousel',
    components: {
      Swiper
    },
    mounted() {
      this.$emit('changeBg', this.colorArr)
    },
    data() {
      return {
        colorArr: ['rgb(227, 240, 245)', 'rgb(245, 203, 204)', 'rgb(206, 235, 233)', ' rgb(252, 189, 0)', 'rgb(227, 240, 245)']
      }
    }
  }
</script>

<style scoped>
  div {
    background-color: rgb(252, 189, 0);
  }
</style>