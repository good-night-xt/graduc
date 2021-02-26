<template>
  <div class="member_container">
    <!-- 顶部导航栏 -->
    <navbar>
      <div slot="left" class="icon iconfont left" @click="backClick">&#xe61d;</div>
      <div slot="center" class="center">会员中心</div>
      <div slot="right" class="icon iconfont right">规则说明</div>
    </navbar>

    <!-- 会员区域 -->
    <div class="member_play">
      <ul ref="container" @touchstart="start($event)" @touchmove="move($event)" @touchend="end">
        <li><img src="../../../assets/img/member/gold.jpg" ></li>
        <li><img src="../../../assets/img/member/platinum.jpg" ></li>
        <li><img src="../../../assets/img/member/diamond.jpg" ></li>
      </ul>
    </div>

    <!-- 相应会员说明区域 -->
    <div class="instruction">
      <div class="gold">
        <h4>黄金会员: </h4>
        <p>积分加速，酒店优享价，免费早餐，房型升级，酒店免费取消，延迟退房，积分兑代金券</p>
        <p>拿去花88折，机票新客专享</p>
      </div>
      <div class="platinum">
        <h4>铂金会员: </h4>
        <p>积分加速，酒店优享价，免费早餐，房型升级，酒店免费取消，延迟退房，积分兑代金券</p>
        <p>拿去花88折，机票新客专享</p>
        <p>借去花免息，分期免息</p>
      </div>
      <div class="diamond">
        <h4>钻石会员: </h4>
        <p>积分加速，酒店优享价，免费早餐，房型升级，酒店免费取消，延迟退房，积分兑代金券</p>
        <p>拿去花88折，机票新客专享</p>
        <p>借去花免息，分期免息</p>
        <p>机场贵宾厅，快速安检，延误补偿，白领定制体检，全球购骑士卡</p>
      </div>
    </div>

    <!-- 价格区域 -->
    <div class="price">
      <div class="price_left">
        {{ memberList[index] }} ￥{{ nowPrice }}
      </div>
      <div class="price_right" @click="buyClick">购买</div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/public/Navbar'

  export default {
    name: 'Member',
    components: {
      Navbar
    },
    computed: {
      nowPrice() {
        return this.priceList[this.index]
      }
    },
    data() {
      return {
        // 记录当前是第几张图片
        index: 0,

        // touchstart的起始位置以及后面x2的跟随位置
        x1: 0,
        // touchmove的实时位置
        x2: 0,
        // 记录touchstart的起始位置
        x0: 0,
        // 是否触发了touchstart事件
        flag: false,

        // 记录会员类型
        memberList: ['黄金会员', '铂金会员', '钻石会员'],
        // 记录会员价格表
        priceList: [58, 88, 108]
      }
    },
    methods: {
      // 返回按钮点击
      backClick() {
        this.$router.push('/profile')
      },

      // 购买按钮的点击
      buyClick() {
        this.$message({
          message: '购买成功',
          type: 'success'
        })
      },

      // 触摸滑动事件touchstart
      start(event) {
        this.flag = true
        // 记录下当前的x坐标
        this.x1 = event.touches[0].pageX
        // 记录最初起始位置
        this.x0 = this.x1
        
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
            this.index = this.index - 1 < 0 ? 3 - 1 : this.index - 1;
            // 完成整个活动过程至图片完整展示
            this.$refs.container.style.left = -this.index * 297 + 'px'
          } else {  // 左滑
            // 判断当前是第几张图片
            this.index = this.index + 1 > 3 - 1 ? 0 : this.index + 1;
            // 完成整个活动过程至图片完整展示
            this.$refs.container.style.left = -this.index * 297 + 'px'
          }

          // 恢复flag
          this.flag = false
        }
      },
    } 
  }
</script>

<style scoped>
  .member_container {
    width: 100vw;
    height: 100vh;
    background-color: rgb(206, 235, 233);
  }

  .center {
    font-size: 16px;
    font-weight: 800;
  }

  .right {
    font-size: 12px;
  }

  .member_play {
    position: relative;
    left: 0;
    top: 0;
    width: 297px;
    height: 123px;
    margin: 30px auto;
    overflow: hidden;
  }

  .member_play ul {
    display: flex;
    width: 891px;
    height: 123px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .member_play ul li {
    margin-right: 10px;
  }

  .price {
    width: 90vw;
    height: 45px;
    position: fixed;
    bottom: 20px;
    left: 5vw;
    line-height: 45px;
    text-align: center;
    color: tomato;
    display: flex;
    border: 2px solid rgb(230, 93, 93);
    border-radius: 20px;
    box-shadow: 0 2px #ccc;
    overflow: hidden;
    z-index: 9;
  }

  .price_left {
    width: 70%;
  }

  .price_right {
    flex: 1;
    background-color: rgb(214, 79, 55);
    border-radius: 20px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    color: #fff;
    transform: translateX(2px);
  }

  .instruction {
    width: 95vw;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 1px;
    border-radius: 16px;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 300;
    line-height: 24px;
    background-color: #fff;
  }

  .instruction h4 {
    margin-top: 20px;
  }
</style>
