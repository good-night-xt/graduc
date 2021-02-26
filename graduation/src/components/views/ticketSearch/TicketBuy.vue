<template>
  <div class="ticket_buy_container">
    <!-- 顶部栏 -->
    <navbar>
      <div slot="left" class="icon iconfont left" @click="backClick">&#xe61d;</div>
      <div slot="center" class="center">{{ ticketMessage.trainNum }}</div>
    </navbar>
    <!-- 车票信息 -->
    <buy-info :ticketMessage="ticketMessage"></buy-info>
  </div>
</template>

<script>
  import Navbar from '@/components/public/Navbar'
  import BuyInfo from './BuyInfo'
  // import { ticketSearchData } from '@/network/ticketSearch'

  export default {
    name: 'TicketBuy',
    components: {
      Navbar,
      BuyInfo
    },
    data() {
      return {
        ticketMessage: this.$route.params.ticketItemMessage
      }
    },
    methods: {
      backClick() {
        this.$router.push('/ticketSearch')
      }
    }
  }
</script>

<style scoped>
  .ticket_buy_container {
    width: 100vw;
    height: 100vh;
    background-color: rgb(64, 158, 158);
  }
</style>
