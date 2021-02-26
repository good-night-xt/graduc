<template>
  <div class="carousel_container" ref="boxContainer">
    <div class="img_container" ref="container" @touchstart="start($event)" @touchmove="move($event)" @touchend="end">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    data() {
      return {
        // 图片的宽度值
        everyWidth: 0,
        // 图片的高度值
        everyHeight: 0,
        // 图片的数量
        imgNum: 0,

        // 用于关闭当前的轮播
        time1: null,
        // 里层轮播
        time2: null,
        // 记录当前是第几张图片
        index: -1,

        // touchstart的起始位置以及后面x2的跟随位置
        x1: 0,
        // touchmove的实时位置
        x2: 0,
        // 记录touchstart的起始位置
        x0: 0,
        // 是否触发了touchstart事件
        flag: false,
      }
    },
    mounted() {
      setTimeout(() => {
      // 取得图片的宽度
      let img = new Image()
      // 获取第一张图片的信息
      img.src = this.$refs.container.children[0].src
      // 取得图片的宽度
      this.everyWidth = img.width + 'px'
      // 取得图片的高度
      this.everyHeight = img.height + 'px'
      // 图片数量
      this.imgNum = this.$refs.container.children.length

      // 设置图片容器的宽度以及最外层容器的宽度
      this.$refs.container.style.width = parseFloat(this.everyWidth) * this.imgNum + 'px'
      this.$refs.boxContainer.style.width = this.everyWidth
      // 设置图片容器的高度以及最外层容器的高度
      this.$refs.container.style.height = this.everyHeight
      this.$refs.boxContainer.style.height = this.everyHeight

      // 启动图片轮播
      this.carouselImg(this.everyWidth, this.imgNum)
      }, 100)
    },

    methods: {
      // 图片轮播
      carouselImg(everyWidth, allLength) {
        // 避免重启定时器时位置发生变化
        if (!this.$refs.container.style.left) {
          this.$refs.container.style.left = 0
        }
        this.time1 = setInterval(() => {
          this.index++;
          if (this.index > allLength - 1) {
            // 将图片定位到第一张（index = 0）图片
            // console.log(this.$refs.container)
            this.$refs.container.style.transition = 'none'
            this.$refs.container.style.left = 0
            // 再快速的将图片定位到第二张（index = 1）图片 （第一张和第五张图片相同，避免停留时间过长）
            this.index = 1
            setTimeout(() => {
              this.$refs.container.style.transition = 'all 0.5s'
              this.$refs.container.style.left = -parseFloat(this.everyWidth) * this.index + 'px'
            }, 10)
          } else {
            this.$refs.container.style.transition = 'all 0.5s'
            this.$refs.container.style.left = -parseFloat(this.everyWidth) * this.index + 'px'
          }

        }, 2000)
      },

      // 触摸滑动事件touchstart
      start(event) {
        this.flag = true
        // 记录下当前的x坐标
        this.x1 = event.touches[0].pageX
        // 记录最初起始位置
        this.x0 = this.x1
        // 关闭当前的两个定时器
        clearInterval(this.time2)
        clearInterval(this.time1)

      },

      // 触摸滑动事件touchmove
      move(event) {
        if (this.flag) {
          // 实时记录触摸滑动的距离
          this.x2 = event.touches[0].pageX
          // 不用判断左滑还是右滑
          this.$refs.container.style.left = parseFloat(this.$refs.container.style.left) + (this.x2 - this.x1) + 'px'
          // 跟随x2现在的位置
          this.x1 = event.touches[0].pageX
        }
      },

      // 触摸滑动事件touchend
      end() {
        if (this.flag) {
          // 判断是左滑还是右滑
          if (this.x2 - this.x0 > 0) { // 右滑
            // 判断当前是第几张图片
            this.index = this.index - 1 < 0 ? this.imgNum - 1 : this.index - 1;
            // 完成整个活动过程至图片完整展示
            this.$refs.container.style.left = -this.index * parseFloat(this.everyWidth) + 'px'
          } else {  // 左滑
            // 判断当前是第几张图片
            this.index = this.index + 1 > this.imgNum - 1 ? 0 : this.index + 1;
            // 完成整个活动过程至图片完整展示
            this.$refs.container.style.left = -this.index * parseFloat(this.everyWidth) + 'px'
          }

          // 恢复两个定时器
          this.carouselImg(this.everyWidth, this.imgNum)

          // 恢复flag
          this.flag = false

        }
      },

    },

    // 如果有需要背景颜色变化
    watch: {
      index: {
        handler(newValue) {
          this.index = newValue
          // 将值通过事件总线传递给home组件
          this.$eventBus.$emit('changeBackground', this.index)
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>
  .carousel_container {
    position: relative;
    top: 0;
    left: 0;
    border-radius: 10px;
    margin: 20px auto;
    overflow: hidden;
  }

  .img_container {
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    border-radius: 10px;
  }
</style>