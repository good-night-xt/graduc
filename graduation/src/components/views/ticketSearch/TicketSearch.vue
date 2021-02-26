<template>
  <div class="ticket_search_container">
    <!-- 顶部栏 -->
    <navbar>
      <div slot="left" class="icon iconfont left" @click="backClick">&#xe61d;</div>
      <div slot="center" class="center">{{ startPlace }} --> {{ endPlace }}
      </div>
      <div slot="right" class="icon iconfont right">
        <span>上车</span>
        <br />
        <span>补票</span>
      </div>
    </navbar>

    <!-- 顶部车票时间栏 -->
    <div class="time_bar">
      <!-- 左边 -->
      <div ref="leftRef" class="time_left">
        <div v-for="(item, index) in timeList" :key="index" :class="{ active: isActive == index }"
          @click="timeItemClick(index)">
          <span>{{ weekList[index] }}</span>
          <br />
          <span>{{ item }}</span>
        </div>
      </div>
      <!-- 右边 -->
      <div class="time_right">
        <span class="icon iconfont">&#xe628;</span>
        <br />
        <span>日历</span>
      </div>
    </div>

    <!-- 车票展示区域 -->
    <div class="ticket_display" v-for="(item, index) in ticketMessageList" :key="index">
      <ticket :ticketMessage="item" @click.native="ticketItemClick(index)">
        <div slot="seat" class="seat">
          <span>二等座<span class="attention">{{ ticketList[index].second }}</span></span>
          <span>一等座<span class="attention">{{ ticketList[index].first }}</span></span>
          <span>无座<span class="attention">{{ ticketList[index].noSeat }}</span></span>
        </div>
      </ticket>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/public/Navbar'
  import ticket from '@/components/public/Ticket'

  export default {
    name: 'TicketSearch',
    created() {
      setTimeout(() => {
        // 时间栏时间展示
        this.dealTime();

        // 车票数据
        this.ticketMessageList = this.$store.state.ticketList
        this.startPlace = this.ticketMessageList[0].departure
        this.endPlace = this.ticketMessageList[0].destination

        this.ticketMessageList.forEach((item) => {
          var obj = {};
          // 二等座是否有票
          if (item.second.residue) {
            obj.second = item.second.residue + '张'
          } else {
            obj.second = '抢'
          }

          // 一等座是否有票
          if (item.first.residue) {
            obj.first = item.first.residue + '张'
          } else {
            obj.first = '抢'
          }
          // 二等座是否有票
          if (item.noSeat.residue) {
            obj.noSeat = '有票'
          } else {
            obj.noSeat = '无票'
          }
          this.ticketList.push(obj)
        })

        // 将要显示几号
        var str = this.ticketMessageList[0].date.split("-")[1];
        var date = new Date()
        var nowDay = date.getDate()
        this.num = Number(str) - nowDay

        this.isActive = this.num
        // 偏移相应的位置
        this.$nextTick(() => {
          this.$refs.leftRef.scrollLeft = this.isActive * 38
        })
      }, 0);
    },
    data() {
      return {
        // 日期表
        timeList: [],
        // 星期表
        weekList: [],
        // 选中的时间
        isActive: 1,
        // 车票数据
        ticketMessageList: [],
        // 判断今天是该显示几号（数组第几个）
        num: 0,
        // 出发地
        startPlace: '',
        // 目的地
        endPlace: '',
        // 车票数据信息
        ticketList: []
      }
    },
    components: {
      Navbar,
      ticket
    },
    methods: {
      // 顶部返回按钮的点击
      backClick() {
        this.$router.push('/home')
      },

      // 顶部时间栏对于时间的处理
      dealTime() {
        var date = new Date()
        // 今天的年，月，日，星期
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var w = date.getDay();

        // 这个月的最后一天的日期
        var lastDay;

        if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
          lastDay = 31
        } else if (m == 2) {
          if (y % 100 != 0 && y % 4 == 0 || y % 400 == 0) {
            lastDay = 29
          } else {
            lastDay = 28
          }
        } else {
          lastDay = 30
        }

        // 将时间push到timeList(日期表)中
        for (let i = d; i <= lastDay; i++) {
          this.timeList.push(i);

          // 将星期表同时也添加到星期表中
          w = w + 1 > 7 ? 1 : w + 1;
          var weekDay;
          if (w == 1) {
            weekDay = '周一'
          } else if (w == 2) {
            weekDay = '周二'
          } else if (w == 3) {
            weekDay = '周三'
          } else if (w == 4) {
            weekDay = '周四'
          } else if (w == 5) {
            weekDay = '周五'
          } else if (w == 6) {
            weekDay = '周六'
          } else if (w == 7) {
            weekDay = '周日'
          }
          this.weekList.push(weekDay)
        }
      },

      // 顶部时间栏的点击
      timeItemClick(index) {
        this.isActive = index
      },

      // 具体车票点击跳转
      ticketItemClick(index) {
        this.$router.push({
          name: 'TicketBuy',
          params: {
            ticketItemMessage: this.ticketMessageList[index]
          }
        })
      }
    }
  }
</script>

<style scoped>
  .ticket_search_container {
    width: 100vw;
    height: 100vh;
    background-color: azure;
  }

  .time_bar {
    display: flex;
    overflow: hidden;
  }

  .time_left::-webkit-scrollbar {
    display: none;
    transform: translateX();
  }

  .time_left {
    height: 50px;
    display: flex;
    flex: 1;
    /* justify-content: space-around; */
    align-items: center;
    white-space: nowrap;
    text-align: center;
    overflow-x: auto;
  }

  .time_left div {
    height: 50px;
    padding: 2px 3px;
    margin-left: 10px;
  }

  .time_right {
    width: 65px;
    font-size: 16px;
    text-align: center;
  }

  .right {
    box-sizing: border-box;
    padding-top: 17px;
    font-size: 12px;
    line-height: 16px;
  }

  .active {
    background-color: #ddd;
  }

  .seat {
    margin-top: 20px;
    border-top: 2px solid #ccc;
    display: flex;
    text-align: center;
  }

  .seat span {
    flex: 1;
    margin-top: 10px;
  }

  .attention {
    margin-left: 2px;
    color: rgb(235, 235, 91);
  }
</style>