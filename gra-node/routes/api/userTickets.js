const express = require('express')
const router = express.Router()

const UserTicket = require("../../models/UserTicket")
const User = require('../../models/User')

// $route GET api/userTickets/:user_account
// @desc  拿到所有该用户所有的车票信息
router.get("/:user_account", (req, res) => {
  User.findOne({ account: req.params.user_account }).then((user) => {
    UserTicket.findOne({ user: user._id }).then((userTicket) => {
      if (userTicket) {
        res.json({ userTicket: userTicket })
      } else {
        res.json({ userTicket: '该用户还没有车票记录' })
      }
    })
  })
})

// $route POST api/userTickets/userTicket
// @desc  存储该用户的购买车票记录
router.post("/userTicket", (req, res) => {
  const data = {}
  data.departure = req.body.departure
  data.destination = req.body.destination
  data.startTime = req.body.startTime
  data.endTime = req.body.endTime
  data.trainNum = req.body.trainNum
  data.date = req.body.date
  data.seat = req.body.seat

  User.findOne({ account: req.body.account }).then((user) => {
    if (req.body.genre == 'waitTravel') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          '$push': {
            'waitTravel': data
          }
        }, {
        'upsert': true
      }).then(() => {
        UserTicket.findOne({ user: user._id }).then((userTicket) => {
          res.json({ userTicket: userTicket })
        })
      })
    } else if (req.body.genre == 'waitPay') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          '$push': {
            'waitPay': data
          }
        }, {
        'upsert': true
      }).then(() => {
        UserTicket.findOne({ user: user._id }).then((userTicket) => {
          res.json({ userTicket: userTicket })
        })
      })
    } else if (req.body.genre == 'refund') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          '$push': {
            'refund': data
          }
        }, {
        'upsert': true
      }).then(() => {
        UserTicket.findOne({ user: user._id }).then((userTicket) => {
          res.json({ userTicket: userTicket })
        })
      })
    }
  })
})

// $route POST api/userTickets/deleteInfo
// @desc  删除该用户的某条车票记录
router.post('/deleteInfo', (req, res) => {
  User.findOne({ account: req.body.account }).then((user) => {
    const data = {}
    data.departure = req.body.departure
    data.destination = req.body.destination
    data.startTime = req.body.startTime
    data.endTime = req.body.endTime
    data.trainNum = req.body.trainNum
    data.date = req.body.date
    data.seat = req.body.seat

    if (req.body.genre == 'waitTravel') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          "$pull": {
            "waitTravel": data
          }
        }).then(() => {
          UserTicket.findOne({ user: user._id }).then((userTicket) => {
            res.json({ userTicket: userTicket })
          })
        })
    } else if (req.body.genre == 'waitPay') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          '$pull': {
            'waitPay': data
          }
        }).then(() => {
          UserTicket.findOne({ user: user._id }).then((userTicket) => {
            res.json({ userTicket: userTicket })
          })
        })
    } else if (req.body.genre == 'refund') {
      UserTicket.findOneAndUpdate({ user: user._id },
        {
          '$pull': {
            'refund': data
          }
        }).then(() => {
          UserTicket.findOne({ user: user._id }).then((userTicket) => {
            res.json({ userTicket: userTicket })
          })
        })
    }
  })
})

// $route POST api/userTickets/refund
// @desc  退款车票请求
router.post("/refund", (req, res) => {
  // 更改售票数量
  Ticket.findOne({
    departure: req.body.data.departure,
    destination: req.body.data.destination,
    startTime: req.body.data.startTime,
    endTime: req.body.data.endTime,
    trainNum: req.body.data.trainNum,
    date: req.body.data.date,
  }).then((ticket) => {
    // 根据对应位置数量加一
    const r = ticket[req.body.data.seat].residue + 1
    // 对应位置
    const seat = req.body.data.seat
    // 更新相应位置数量
    Ticket.findOne({
      departure: req.body.data.departure,
      destination: req.body.data.destination,
      startTime: req.body.data.startTime,
      endTime: req.body.data.endTime,
      trainNum: req.body.data.trainNum,
      date: req.body.data.date,
    }, function (err, doc) {
      if (seat == "first") {
        doc.set({ first: { residue: r } })
        doc.save()
      } else if (seat == "second") {
        doc.set({ second: { residue: r } })
        doc.save()
      } else if (seat == "noSeat") {
        doc.set({ noSeat: { residue: r } })
        doc.save()
      }
    })
  })
  // 更改对应用户的订单页数据
  User.findOne({ account: req.body.account }).then((user) => {
    // 删除退款项
    UserTicket.findOneAndUpdate({ user: user._id },
      {
        "$pull": {
          "waitTravel": req.body.data
        }
      }).then(() => {
        UserTicket.findOne({ user: user._id }).then((userTicket) => {
          res.json({ userTicket: userTicket })
        })
      })
    // 添加退款项
    UserTicket.findOneAndUpdate({ user: user._id },
      {
        "$push": {
          "refund": req.body.data
        }
      }, {
      'upsert': true
    }).then(() => {
      UserTicket.findOne({ user: user._id }).then((userTicket) => {
        res.json({ userTicket: userTicket })
      })
    })
  })
})


module.exports = router
