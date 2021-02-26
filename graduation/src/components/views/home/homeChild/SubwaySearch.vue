<template>
  <div class="ticket_container">
    <!-- 输入出发点和目的地 -->
    <div class="input_arrive">
      <input type="text" v-model="arriveData.startPlace">
      <span class="icon iconfont" @click="reversal">&#xe8c8;</span>
      <input type="text" v-model="arriveData.endPlace">
    </div>

    <!-- 查询时间 -->
    <div class="input_time">
      <!-- 日期选择框 -->
      <div class="block">
        <el-date-picker v-model="time" align="right" type="date" placeholder="选择日期" class="time_select"
          :clearable="false">
        </el-date-picker>
        <input type="text" readonly class="week" v-model="weekDay">
      </div>
    </div>

    <!-- 选择只看高铁 -->
    <div class="choose_subway">
      <!-- 点击选择框 -->
      <span @click="chooseClick" v-if="isTrue"></span>
      <span class="icon iconfont" @click="chooseClick" v-else>&#xe63e;</span>
      <span @click="chooseClick">只看高铁动车</span>
    </div>

    <!-- 点击搜索 -->
    <div class="search_btn">
      <button @click="searchBtnClick">搜索</button>
    </div>

    <!-- 搜索记录（展示最近的三条） -->
    <div class="search_history">
      <span v-for="(value, index) in Array.from(threeSearchHistory)" :key="index">
        {{value}}
      </span>
    </div>

    <!-- footer -->
    <footer-img>
      <a href="javaScript:;" slot="imageSlot" class="FooterImgA">
        <img src="@/assets/img/footer/subway_footer.png">
      </a>
    </footer-img>
  </div>

</template>

<script>
  import FooterImg from '@/components/public/FooterImg'
  import { ticketSearchData } from '@/network/ticketSearch'

  export default {
    name: 'SubwaySearch',
    components: {
      FooterImg
    },
    created() {
      // 如果出发地和目的地开始绑定了值，就将这个值保存进搜索记录中
      if (this.arriveData.startPlace) {
        this.threeSearchHistory.add(`${this.arriveData.startPlace} -> ${this.arriveData.endPlace}`)
      }

      // 拿到最近搜索的三条历史记录
      if (window.localStorage.getItem('searchHistory')) {
        this.threeSearchHistory = new Set(window.localStorage.getItem('searchHistory').split(','))
      } else {
        this.threeSearchHistory = new Set()
      }

      this.$nextTick(() => {
        // 设定星期
        this.weekDay = this.week()
        // 从三条历史记录中选择最后一条作为默认的出发地和目的地
        if (window.localStorage.getItem('searchHistory')) {
          var arr = []
          var arrSet = new Set()
          this.threeSearchHistory = new Set(window.localStorage.getItem('searchHistory').split(','))
          arrSet = this.threeSearchHistory
          arr = Array.from(arrSet)
          this.arriveData.startPlace = arr[arr.length - 1].split('->')[0].trim()
          this.arriveData.endPlace = arr[arr.length - 1].split('->')[1].trim()
        }
      })
    },
    mounted() {
      // 计算选择框绑定的事件
      var date = new Date();
      this.time = date.setDate(date.getDate() + 1)
    },
    data() {
      return {
        // 是否选中了只看高铁
        isTrue: true,
        // 出发地，目的地绑定数据
        arriveData: {
          startPlace: '成都南',
          endPlace: '彭山北'
        },
        // 车票时间（默认是明天）星期
        weekDay: '',
        // 日期选择框绑定日期（默认是明天）
        time: 0,
        // 是否点击日期选择框
        isActive: false,
        // 记录最新三条搜索记录
        threeSearchHistory: new Set(),
        // 只看高铁是否被选中
        category: false
      }
    },
    methods: {
      // 反转出发地，目的地
      reversal() {
        [this.arriveData.startPlace, this.arriveData.endPlace] = [this.arriveData.endPlace, this.arriveData.startPlace]
      },

      //计算明天是周几
      week() {
        var date = new Date()
        var w = date.getDay()
        w = w + 1 > 7 ? 1 : w + 1;
        var weekDay
        if (w == 1) {
          weekDay = '一'
        } else if (w == 2) {
          weekDay = '二'
        } else if (w == 3) {
          weekDay = '三'
        } else if (w == 4) {
          weekDay = '四'
        } else if (w == 5) {
          weekDay = '五'
        } else if (w == 6) {
          weekDay = '六'
        } else if (w == 7) {
          weekDay = '日'
        }

        return `周${weekDay}(明天)`
      },

      // 车票选择时间的点击
      timeClick() {
        this.isActive = true
      },

      // 点击勾选只看高铁
      chooseClick() {
        this.isTrue = !this.isTrue
        this.category = !this.category
      },

      // 搜索按钮的点击
      searchBtnClick() {
        // 这次的搜索记录和上次不一致(出发地或目的地改变)
        if (`${this.arriveData.startPlace} -> ${this.arriveData.endPlace}` != this.threeSearchHistory[Array.from(this.threeSearchHistory).length - 1]) {
          this.threeSearchHistory.add(`${this.arriveData.startPlace} -> ${this.arriveData.endPlace}`);
          // 保存的浏览记录超过三条，删除第一条
          if (Array.from(this.threeSearchHistory).length > 3) {
            var arr = Array.from(this.threeSearchHistory)
            arr.shift()
            this.threeSearchHistory = new Set(arr)
          }
        }
      
        // 处理time，只需月，日
        var date = new Date(this.time)
        var y = date.getMonth() + 1 + ''
        var d = date.getDate() + ''
        var str = y.padStart(2, '0') + '-' + d.padStart(2, '0')
        // 处理是否选中只看高铁信息
        let c;
        if(this.category) {
          c = 1
        }else {
          c = undefined
        }
        // 发送请求，拿到车票信息
        ticketSearchData({
          departure: this.arriveData.startPlace,
          destination: this.arriveData.endPlace,
          date: str,
          category: c
        }).then(res => {
          // this.$store.state.ticketList = res.data.tickets
          this.$store.commit("updateTicketList", res.data.tickets)
        }).then(() => {
          // 跳转到车票查询页面
          this.$router.push('/ticketSearch')
        })
      },
    },

    watch: {
      time(newValue) {
        var date = new Date(newValue)
        var w = date.getDay()
        var weekDay
        if (w == 1) {
          weekDay = '一'
        } else if (w == 2) {
          weekDay = '二'
        } else if (w == 3) {
          weekDay = '三'
        } else if (w == 4) {
          weekDay = '四'
        } else if (w == 5) {
          weekDay = '五'
        } else if (w == 6) {
          weekDay = '六'
        } else if (w == 7) {
          weekDay = '日'
        }

        this.weekDay = '周' + weekDay
      }
    },

    // 页面停用时将最新三条搜索记录存储到本地
    deactivated: function () {
      window.localStorage.setItem('searchHistory', Array.from(this.threeSearchHistory).join(','))
    },

    // 页面重新启用时将三条搜索记录赋值给threeSearchHistory
    activated() {
      // 拿到最近搜索的三条历史记录
      if (window.localStorage.getItem('searchHistory')) {
        this.threeSearchHistory = new Set(window.localStorage.getItem('searchHistory').split(','))
      } else {
        this.threeSearchHistory = new Set()
      }
    }
  }
</script>

<style scoped>
  .input_arrive,
  .input_time {
    width: 90%;
    height: 70px;
    border-bottom: 1px dotted #ddd;
    margin: 0 auto;
    padding: 10px 0px;
    box-sizing: border-box;
  }

  .block {
    display: flex;
    line-height: 50px;
  }

  .time_select {
    display: inline-block;
    width: 95%;
    height: 100%;
  }

  .input_arrive span {
    display: inline-block;
    text-align: center;
    line-height: 50px;
    width: 20%;
  }

  .input_arrive input,
  .input_time input {
    height: 50px;
    border: 0;
    outline: none;
  }

  .input_arrive input {
    width: 40%;
    font-size: 18px;
    box-sizing: border-box;
  }

  .input_arrive input:nth-child(1) {
    padding-left: 10px;
    text-align: left;
  }

  .input_arrive input:last-child {
    padding-right: 10px;
    text-align: right;
  }

  .input_time input:first-child {
    width: 25%;
    font-size: 18px;
  }

  .input_time .week {
    color: #555;
    font-size: 14px;
  }

  .search_btn button {
    display: inline-block;
    width: 100%;
    height: 50px;
    border-radius: 20px;
    border: 0;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    line-height: 30px;
    letter-spacing: 5px;
    background-color: rgb(219, 70, 70);
  }

  .choose_subway,
  .search_btn {
    width: 90%;
    height: 50px;
    margin: 0 auto;
  }

  .choose_subway {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
  }

  .choose_subway span {
    display: inline-block;
    text-align: center;
  }

  .choose_subway span:first-child {
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    color: blue;
    font-weight: 600;
    border: 1px solid #555;
    border-radius: 50%;
    margin-right: 10px;
  }

  .search_history {
    height: 60px;
    text-align: center;
    line-height: 30px;
    margin: 0 auto;
    padding-left: 20px;
    white-space: nowrap;
    overflow-x: auto;
  }

  .search_history::-webkit-scrollbar {
    display: none;
  }

  .search_history span {
    display: inline-block;
    padding: 2px 4px;
    height: 30px;
    margin-right: 10px;
    border-radius: 10px;
    margin: 30px auto;
    margin-right: 10px;
    margin-bottom: 0;
    font-size: 10px;
    background-color: #ddd;
  }

  .FooterImgA {
    display: inline-block;
    width: 100%;
    height: 150px;
    background-color: black;
  }

  .FooterImgA img {
    width: 100%;
    height: 100%;
  }
</style>