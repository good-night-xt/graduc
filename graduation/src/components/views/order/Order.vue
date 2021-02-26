<template>
  <div class="order_container">
    <!-- 头部 -->
    <div class="top_bar">全部订单</div>
    <!-- 头部下标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <p v-show="isShow(allTicketLists)">该用户还没有该类型车票</p>
        <div v-for="(item, index) in allTicketLists" :key="index">
          <ticket :ticketMessage="item">
            <p slot="date">{{ item.date }}</p>
            <span slot="seat" class="deal_seat">{{ item.seat }}</span>
            <el-button slot="delete" type="info" @click="deleteBtnClick(item)">删除</el-button>
          </ticket>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待出行" name="second ">
        <p v-show="isShow(waitTravel)">该用户还没有该类型车票</p>
        <div v-for="(item, index) in waitTravel" :key="index" class="wait_travel">
          <ticket :ticketMessage="item">
            <p slot="date">{{ item.date }}</p>
            <span slot="seat" class="deal_seat">{{ item.seat }}</span>
            <el-button slot="delete" type="info" @click="deleteBtnClick(item)">删除</el-button>
            <el-button slot="delete" type="info" @click="refundBtnClick(item)">退款</el-button>
          </ticket>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="third">
        <p v-show="isShow(waitPay)">该用户还没有该类型车票</p>
        <div v-for="(item, index) in waitPay" :key="index">
          <ticket :ticketMessage="item">
            <p slot="date">{{ item.date }}</p>
            <span slot="seat" class="deal_seat">{{ item.seat }}</span>
            <el-button slot="delete" type="info" @click="deleteBtnClick(item)">删除</el-button>
          </ticket>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待点评" name="fourth ">
        <p v-show="isShow(waitComment)">该用户还没有该类型车票</p>
        <div v-for="(item, index) in waitComment" :key="index">
          <ticket :ticketMessage="item">
            <p slot="date">{{ item.date }}</p>
            <span slot="seat" class="deal_seat">{{ item.seat }}</span>
            <el-button slot="delete" type="info" @click="deleteBtnClick(item)">删除</el-button>
          </ticket>
        </div>
      </el-tab-pane>
      <el-tab-pane label="退款单" name="fifth">
        <p v-show="isShow(refund)">该用户还没有该类型车票</p>
        <div v-for="(item, index) in refund" :key="index">
          <ticket :ticketMessage="item">
            <p slot="date">{{ item.date }}</p>
            <span slot="seat" class="deal_seat">{{ item.seat }}</span>
            <el-button slot="delete" type="info" @click="deleteBtnClick(item)">删除</el-button>
          </ticket>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Ticket from '@/components/public/Ticket'
  import { getTicketList, deleteTicket, refundTicket } from '@/network/userTicket'

  export default {
    name: 'Order',
    components: {
      Ticket
    },
    created() {
      this.getUserTicketListData()
    },
    mounted() {
      // 其他处发生订单数据变化，该组件的视图相应变化
      this.$eventBus.$on("updateUserTicketData", () => {
        this.getUserTicketListData()
      })
    },
    data() {
      return {
        // 当前活跃的部分
        activeName: 'first',
        // 用于接受该用户车票信息
        userTicketLists: [],
        // 全部订单
        allTicketLists: [],
        // 待出行
        waitTravel: [],
        // 待付款
        waitPay: [],
        // 待点评
        waitComment: [],
        // 退款单
        refund: []
      }
    },
    methods: {
      handleClick(tab) {
        this.activeName = tab.name
      },

      // 是否显示没该类型车票
      isShow(data) {
        if (!data || data.length == 0) {
          return true
        } else {
          return false
        }
      },

      // 页面初始化请求数据
      getUserTicketListData() {
        getTicketList(this.$store.state.userObj.account).then((res) => {
          this.$nextTick(() => {
            this.$store.state.userTicketList = res.data.userTicket
            this.waitTravel = this.$store.state.userTicketList.waitTravel
            this.addLogo(this.waitTravel, 'waitTravel')
            this.waitPay = this.$store.state.userTicketList.waitPay
            this.addLogo(this.waitPay, 'waitPay')
            this.waitComment = this.$store.state.userTicketList.waitComment
            this.addLogo(this.waitComment, 'waitComment')
            this.refund = this.$store.state.userTicketList.refund
            this.addLogo(this.refund, 'refund')
            this.allTicketLists = []
            if (this.waitTravel) {
              this.allTicketLists.push(...this.waitTravel)
            }
            if (this.waitPay) {
              this.allTicketLists.push(...this.waitPay)
            }
            if (this.waitComment) {
              this.allTicketLists.push(...this.waitComment)
            }
            if (this.refund) {
              this.allTicketLists.push(...this.refund)
            }
          })
        })
      },

      // 车票删除按钮的点击
      deleteBtnClick(data) {
        // 发送删除车票请求
        const obj = {}
        obj.account = this.$store.state.userObj.account
        obj.departure = data.departure
        obj.destination = data.destination
        obj.startTime = data.startTime
        obj.endTime = data.endTime
        obj.trainNum = data.trainNum
        obj.date = data.date
        obj.genre = data.logo
        obj.seat = data.seat
        // 转换座次
        if (obj.seat == "一等座") {
          obj.seat = "first"
        } else if (obj.seat == "二等座") {
          obj.seat = "second"
        } else if (obj.seat == "无座") {
          obj.seat = "noSeat"
        }
        // 发起删除请求
        deleteTicket(obj).then(() => {
          // 刷新this.$store.state.userTicketList数据
          this.getUserTicketListData()
        })
      },

      // 退款按钮的点击
      refundBtnClick(item) {
        var obj = {}
        obj.data = {...item}
        obj.account = this.$store.state.userObj.account
        delete obj.data.logo
        delete obj.data._id
        // 转换座次
        if (obj.data.seat == "一等座") {
          obj.data.seat = "first"
        } else if (obj.data.seat == "二等座") {
          obj.data.seat = "second"
        } else if (obj.data.seat == "无座") {
          obj.data.seat = "noSeat"
        }

        // 发送退款请求
        refundTicket(obj).then(() => {
          // 刷新this.$store.state.userTicketList数据
          this.getUserTicketListData()
        })
      },

      // 给每个数组的数组项添加标识（属于哪个类型）
      // 处理座次
      addLogo(list, str) {
        if (list && list.length != 0) {
          list.forEach(item => {
            item.logo = str
            // 转换座次
            if (item.seat == "first") {
              item.seat = "一等座"
            } else if (item.seat == "second") {
              item.seat = "二等座"
            } else if (item.seat == "noSeat") {
              item.seat = "无座"
            }
          })
        }
      },

    }
  }
</script>

<style scoped>
  .order_container {
    height: calc(100vh - 50px);
    background-color: rgb(207, 219, 231);
    overflow: auto;
  }

  .order_container::-webkit-scrollbar {
    display: none;
    transform: translateX();
  }

  .top_bar {
    width: 100vw;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-weight: 800;
    border-bottom: 1px solid #aaa;
  }

  .el-tabs {
    width: 95vw;
    margin: 10px auto;
  }

  .el-tab-pane {
    font-size: 16px;
  }

  .el-button {
    transform: translateX(114px);
  }

  .wait_travel .el-button {
    transform: translateX(33px);
  }

  .deal_seat {
    display: inline-block;
    width: 104px;
    text-align: center;
  }
</style>