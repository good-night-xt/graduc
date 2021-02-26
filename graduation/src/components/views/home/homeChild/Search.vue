<template>
  <div class="search_container">
    <!-- 选择购买的票种 -->
    <div class="choose_ticket">
      <span @click="subwayClick" :class="{active: isActive}">火车票</span>
      <span @click="busClick" :class="{active: !isActive}">汽车票</span>
    </div>
    <keep-alive include="SubwaySearch, BusSearch"><router-view></router-view></keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data() {
      return {
        isActive: true
      }
    },
    methods: {
      // 火车票点击
      subwayClick() {
        this.isActive = true
        this.$router.push('/home/subway')
      },
      // 汽车票点击
      busClick() {
        this.isActive = false
        this.$router.push('/home/bus')
      }
    }
  }
</script>

<style scoped>
  .search_container {
    width: 100vw;
    height: 69vh;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #fff;
  }

  .choose_ticket {
    width: 100%;
    height: 50px;

    line-height: 50px;
    text-align: center;
    font-weight: 500;
    display: flex;
  }

  .choose_ticket span {
    flex: 1;
    background-color: #eee;
  }

  .choose_ticket span:nth-child(1) {
    border-top-left-radius: 10px;
  }

  .choose_ticket span:nth-child(2) {
    border-top-right-radius: 10px;
  }

  .active {
    background-color: #fff !important;
    transform: translateY(-5px);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>