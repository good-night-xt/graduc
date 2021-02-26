const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  waitTravel: [
    {
      departure: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      trainNum: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      seat: {
        type: String,
        required: true
      }
    }
  ],
  waitPay: [
    {
      departure: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      trainNum: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      seat: {
        type: String,
        required: true
      }
    }
  ],
  waitComment: [
    {
      id: {
        type: String
      },
      comments: {
        type: String
      }
    }
  ],
  refund: [
    {
      departure: {
        type: String,
        required: true
      },
      destination: {
        type: String,
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      trainNum: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      seat: {
        type: String,
        required: true
      }
    }
  ],
})

module.exports = UserTicket = mongoose.model('userTickets', UserTicketSchema)
