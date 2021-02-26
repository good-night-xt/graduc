<template>
  <div class="ticket_container">
    <el-card class="box-card">
      <div class="ticket_message">
        <div class="left">
          <span>{{ ticketMessage.startTime }}</span>
          <br />
          <span>{{ ticketMessage.departure }}</span>
        </div>
        <div class="center">
          <slot name="date"></slot>
          <span>----------></span>
          <br />
          <span>{{ ticketMessage.trainNum }}</span>
        </div>
        <div class="right">
          <span>{{ ticketMessage.endTime }}</span>
          <br />
          <span>{{ ticketMessage.destination }}</span>
        </div>
      </div>
      <slot name="seat"></slot>
      <slot name="delete"></slot>
      <slot name="refund"></slot>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Ticket",
    props: {
      ticketMessage: {
        type: Object,
        default: () => { }
      }
    }
  }
</script>

<style scoped>
  .ticket_container {
    width: 95vw;
    margin: 20px auto;
  }

  .ticket_message {
    background-color: #fff;
    display: flex;
  }

  .ticket_message div {
    flex: 1;
    text-align: center;
  }

  .left,
  .right {
    box-sizing: border-box;
    padding-top: 10px;
  }

  
</style>