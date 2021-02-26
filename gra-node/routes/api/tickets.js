const express = require('express')
const router = express.Router()

const Ticket = require('../../models/Ticket')

// $route POST api/tickets
// @desc  车票请求信息
router.post("/", (req, res) => {
  if (!req.body.category) {
    Ticket.find({
      departure: req.body.departure,
      destination: req.body.destination,
      date: req.body.date
    }).then(tickets => {
      if (tickets) {
        res.json({ tickets: tickets })
      } else {
        res.status(400).json({ 'ticket': '出发地或目的地错误' })
      }
    }).catch(err => console.log(err))
  } else {
    Ticket.find({
      departure: req.body.departure,
      destination: req.body.destination,
      date: req.body.date,
      category: req.body.category
    }).then(tickets => {
      if (tickets) {
        res.json({ tickets: tickets })
      } else {
        res.status(400).json({ 'ticket': '出发地或目的地错误' })
      }
    }).catch(err => console.log(err))
  }
})

// $route POST api/tickets/buyTicket
// @desc  购买车票请求
router.post('/buyTicket', (req, res) => {
  Ticket.findOne({
    departure: req.body.data.departure,
    destination: req.body.data.destination,
    startTime: req.body.data.startTime,
    endTime: req.body.data.endTime,
    trainNum: req.body.data.trainNum,
    date: req.body.data.date,
  }).then((ticket) => {
    if (ticket) {
      // 拿到对应位置剩余的数量并减一
      const r = ticket[req.body.seat].residue - 1
      // 更新相应位置的数量
      const seat = req.body.seat
      Ticket.findOne({
        departure: req.body.data.departure,
        destination: req.body.data.destination,
        startTime: req.body.data.startTime,
        endTime: req.body.data.endTime,
        trainNum: req.body.data.trainNum,
        date: req.body.data.date,
      }, function (err, doc) {
        if (seat == 'second') {
          doc.set({ second: { residue: r } });
          doc.save();
        } else if (seat == 'first') {
          doc.set({ first: { residue: r } });
          doc.save();
        } else {
          doc.set({ noSeat: { residue: r } });
          doc.save();
        }
      })
      Ticket.findOne({
        departure: req.body.data.departure,
        destination: req.body.data.destination,
        startTime: req.body.data.startTime,
        endTime: req.body.data.endTime,
        trainNum: req.body.data.trainNum,
        date: req.body.data.date,
      }).then((ticket) => {
        res.json(ticket)
      })
    }
  })
})



module.exports = router
