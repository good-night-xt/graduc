<template>
  <div class="buy_info_container">
    <!-- 列车信息 -->
    <div class="train_info">
      <div class="left">
        <p class="fontClass">{{ time }}</p>
        <p>{{ ticketMessage.startTime }}</p>
        <p class="fontClass">{{ ticketMessage.departure }}</p>
      </div>
      <div class="center">
        <p class="fontClass">{{ ticketMessage.trainNum }}</p>
        <p>----------></p>
        <p class="fontClass">{{ journeyTime }}</p>
      </div>
      <div class="right">
        <p class="fontClass">{{ time }}</p>
        <p>{{ ticketMessage.endTime }}</p>
        <p class="fontClass">{{ ticketMessage.destination }}</p>
      </div>
    </div>
    <!-- 车票信息 -->
    <el-card>
      <div class="second">
        <div class="fixation">二等座</div>
        <div class="price">￥{{ ticketMessage.second.price }}</div>
        <div>有票</div>
        <div>
          <el-button type="warning" @click="bookClick('second')">预订</el-button>
        </div>
      </div>
      <div class="once">
        <div class="fixation">一等座</div>
        <div class="price">￥{{ ticketMessage.first.price }}</div>
        <div>有票</div>
        <div>
          <el-button type="warning" @click="bookClick('first')">预订</el-button>
        </div>
      </div>
      <div class="noSeat">
        <div class="fixation">无座</div>
        <div class="price">￥{{ ticketMessage.noSeat.price }}</div>
        <div>有票</div>
        <div>
          <el-button type="warning" @click="bookClick('noSeat')">预订</el-button>
        </div>
      </div>
    </el-card>
    <!-- 预订确认对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="90%">
      <span>确定花费￥{{ money }}元预订该票吗?</span>
      <span slot="footer">
        <el-button @click="exitBtnClick">取 消</el-button>
        <el-button type="primary" @click="ensureBtnClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { buyTicket } from '@/network/buyTicket'
  import { ticketSearchData } from '@/network/ticketSearch'
  import { addTicket } from '@/network/userTicket'

  export default {
    name: 'BuyInfo',
    props: {
      ticketMessage: {
        type: Object,
        default: () => { }
      }
    },
    mounted() {
      // console.log(this.ticketMessage)
      var date = this.ticketMessage.date
      // 将date转为相应的时间
      var arr = date.split('-');
      // 月，日
      var str = arr[0] + '月' + arr[1] + '日'
      // 手动添加年
      var d = new Date()
      var y = d.getFullYear()

      var str2 = y + '-' + date
      var date2 = new Date(str2)
      // 拿到该车票对应的星期
      var w = date2.getDay()
      var weekDay
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

      // 设置日期，星期
      this.time = str + ' ' + weekDay
      // 设置路程时长
      this.journeyTime = this.timeDiff(this.ticketMessage.startTime, this.ticketMessage.endTime)
    },
    data() {
      return {
        // 日期，星期展示
        time: '',
        // 路程时长
        journeyTime: '',
        // 预订对话框
        dialogVisible: false,
        // 购票费用
        money: 0,
        // 当前是几等票
        seat: ''
      }
    },
    methods: {
      // 给两个时间做差值
      timeDiff(value1, value2) {
        // 将对应的字符串转换为数字，并去掉前置0
        var time1 = value1.split(':')
        // 将时间转换为分钟
        time1 = Number(time1[0] * 60) + Number(time1[1])

        var time2 = value2.split(':')
        // 将时间转换为分钟
        time2 = Number(time2[0] * 60) + Number(time2[1])

        // 计算差值
        var str;
        if (Math.abs(time1 - time2) > 60) {
          str = Math.abs(time1 - time2) / 60 + '时' + Math.abs(time1 - time2) % 60 + '分钟'
        } else if (Math.abs(time1 - time2) == 60) {
          str = '1小时'
        } else {
          str = Math.abs(time1 - time2) + '分钟'
        }
        return str
      },

      // 预订按钮点击
      bookClick(str) {
        // 显示确认对话框
        this.dialogVisible = true
        // 修正费用
        this.money = this.ticketMessage[str].price
        // 设置当前是几等票
        this.seat = str
      },

      // 确认购票
      ensureBtnClick() {
        // 关闭对话框
        this.dialogVisible = false
        // 发送购票请求
        // 当前购票的列车信息
        var obj = {}
        obj.departure = this.ticketMessage.departure
        obj.destination = this.ticketMessage.destination
        obj.startTime = this.ticketMessage.startTime
        obj.endTime = this.ticketMessage.endTime
        obj.trainNum = this.ticketMessage.trainNum
        obj.date = this.ticketMessage.date
        obj.seat = this.seat
        // 发送的请求信息
        var sendObj = {}
        sendObj.data = obj
        sendObj.seat = this.seat

        // 发送购票请求
        buyTicket(sendObj).then((res) => {
          // 更新相应的车票信息
          let data = res.data
          // 请求当前车票(购票)信息
          ticketSearchData({
            departure: data.departure,
            destination: data.destination,
            date: data.date
          }).then((res) => {
            // 更新ticketList数据，更新视图
            this.$store.commit("updateTicketList", res.data.tickets)
          })
        })

        obj.account = this.$store.state.userObj.account
        obj.genre = 'waitTravel'
        // 保存该用户的待出行票
        addTicket(obj).then((res) => {
          this.$store.state.userTicketLists = res.data.userTicket
          this.$eventBus.$emit("updateUserTicketData")
        })
      },

      // 对话框取消按钮的点击
      exitBtnClick() {
        this.dialogVisible = false
        // 将该车票计入待付款
        var obj = {}
        obj.departure = this.ticketMessage.departure
        obj.destination = this.ticketMessage.destination
        obj.startTime = this.ticketMessage.startTime
        obj.endTime = this.ticketMessage.endTime
        obj.trainNum = this.ticketMessage.trainNum
        obj.date = this.ticketMessage.date
        obj.account = this.$store.state.userObj.account
        obj.genre = 'waitPay'

        // 保存该用户的待付款车票
        addTicket(obj).then((res) => {
          this.$store.state.userTicketLists = res.data.userTicket
          this.$eventBus.$emit("updateUserTicketData")
        })
      }
    }
  }
</script>

<style scoped>
  .buy_info_container {
    width: 100vw;
    height: 100vh;
  }

  .train_info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 95vw;
    margin: 0 auto;
  }

  .left,
  .right,
  .center {
    text-align: center;
  }

  p {
    font-size: 18px;
    color: #fff;
  }

  .fontClass {
    font-size: 12px;
    font-weight: 300;
    color: #ddd;
  }

  .el-card {
    width: 95vw;
    margin: 20px auto;
    border-radius: 10px;
  }

  .second,
  .once {
    border-bottom: 1px dotted #ccc;
  }

  .second,
  .once,
  .noSeat {
    margin-top: 15px;
    display: flex;
    line-height: 40px;
    justify-content: space-around;
  }

  .price {
    width: 70px;
  }

  .fixation {
    width: 70px;
  }
</style>