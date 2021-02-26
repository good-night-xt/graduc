

export default {
  // 获取当前用户的订单数据
  getUserTicketList(state, data) {
    state.userTicketList = data.userTicket
  },

  // 更新当前ticketList
  updateTicketList(state, data) {
    state.ticketList = data
  }
}