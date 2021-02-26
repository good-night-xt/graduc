<template>
  <div class="ticket_container">
    <!-- 输入出发点和目的地 -->
    <div class="input_arrive">
      <input type="text" v-model="busArriveData.startPlace">
      <span class="icon iconfont" @click="reversal">&#xe636;</span>
      <input type="text" v-model="busArriveData.endPlace">
    </div>

    <!-- 查询时间 -->
    <div class="input_time">
      <input type="text" v-model="ticket.day">
      <input type="text" class="week" v-model="ticket.weekDay">
    </div>

    <!-- 选择只看卧铺 -->
    <div class="choose_bus">
      <!-- 点击选择框 -->
      <span @click="chooseClick" v-if="isTrue"></span>
      <span class="icon iconfont" @click="chooseClick" v-else>&#xe63e;</span>
      <span @click="chooseClick">只看卧铺</span>
    </div>

    <!-- 点击搜索 -->
    <div class="search_btn">
      <button @click="searchBtnClick">搜索</button>
    </div>

    <!-- 搜索记录（展示最近的三条） -->
    <div class="search_history">
      <span v-for="(value, index) in Array.from(threeBusSearchHistory)" :key="index">
        {{value}}
      </span>
    </div>

    <!-- footer -->
    <footer-img>
      <a href="#" class="FooterImgA" slot="imageSlot">
        <img src="@/assets/img/footer/bus_footer.jpg">
      </a>
    </footer-img>
  </div>

</template>

<script>
  import FooterImg from '@/components/public/FooterImg'

  export default {
    name: 'BusSearch',
    components: {
      FooterImg
    },
    created() {
      // window.localStorage.removeItem('busSearchHistory')
      // 如果出发地和目的地开始绑定了值，就将这个值保存进搜索记录中
      if (this.busArriveData.startPlace) {
        this.threeBusSearchHistory.add(`${this.busArriveData.startPlace} -> ${this.busArriveData.endPlace}`)
      }
      // console.log(window.localStorage.getItem('busSearchHistory'))
      // 拿到最近搜索的三条历史记录
      this.threeBusSearchHistory = window.localStorage.getItem('busSearchHistory') ? new Set(window.localStorage.getItem('busSearchHistory').split(',')) : new Set()
      // console.log(this.threeBusSearchHistory)
    },
    data() {
      return {
        // 是否选中了只看高铁
        isTrue: true,
        // 出发地，目的地绑定数据
        busArriveData: {
          startPlace: '德阳',
          endPlace: '中江'
        },
        // 车票时间（默认是明天）
        ticket: {
          // 月 日
          day: `${new Date().getMonth() + 1}月${new Date().getDate() + 1}日`,
          weekDay: this.week()
        },
        // 记录最新三条搜索记录
        threeBusSearchHistory: new Set()
      }
    },
    methods: {
      // 反转出发地，目的地
      reversal() {
        [this.busArriveData.startPlace, this.busArriveData.endPlace] = [this.busArriveData.endPlace, this.busArriveData.startPlace]
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

      // 点击勾选只看卧铺
      chooseClick() {
        this.isTrue = !this.isTrue
      },

      // 搜索按钮的点击
      searchBtnClick() {
        // 这次的搜索记录和上次不一致(出发地或目的地改变)
        if (`${this.busArriveData.startPlace} -> ${this.busArriveData.endPlace}` != this.threeBusSearchHistory[Array.from(this.threeBusSearchHistory).length - 1]) {
          this.threeBusSearchHistory.add(`${this.busArriveData.startPlace} -> ${this.busArriveData.endPlace}`);
          // 保存的浏览记录超过三条，删除第一条
          if (Array.from(this.threeBusSearchHistory).length > 3) {
            var arr = Array.from(this.threeBusSearchHistory)
            arr.shift()
            this.threeBusSearchHistory = new Set(arr)
          }
        }
      },

    },
    // 页面停用时将最新三条搜索记录存储到本地
    deactivated: function () {
      // console.log(this.threeBusSearchHistory)
      window.localStorage.setItem('busSearchHistory', Array.from(this.threeBusSearchHistory).join(','))
      // console.log(window.localStorage.getItem('busSearchHistory'))
    },
    // 页面重新启用时将三条搜索记录赋值给threeBusSearchHistory
    activated() {
      this.threeBusSearchHistory = new Set(window.localStorage.getItem('busSearchHistory').split(','))
      // console.log(window.localStorage.getItem('busSearchHistory'))
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

  .choose_bus {
    width: 90%;
    height: 50px;
    margin: 0 auto;
  }

  .choose_bus {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
  }

  .choose_bus span {
    display: inline-block;
    text-align: center;
  }

  .choose_bus span:first-child {
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

  .FooterImgA a {
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
