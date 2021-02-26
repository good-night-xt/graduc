import { addTicket } from '@/network/userTicket'

export default {
  // 异步获取userTicketList
  getUserTicketData(context, payload) {
    addTicket(payload).then((res) => {
      context.commit('getUserTicketList', res.data)
    })
  }
}
