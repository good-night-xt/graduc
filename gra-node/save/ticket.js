const Ticket = require("../models/Ticket")
// 引入车票数据
const ticketList = require("../data/ticketsData/tickets.json")

// 将数据项储存进数据库中
function saveTicket() {
  ticketList.forEach(item => {
    var ticket = new Ticket(item)
    ticket.save()
          .then()
          .catch(err => console.log(err))
  });
}

module.exports = saveTicket

