const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
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
  second: {
    price: {
      type: Number,
      required: true
    },
    residue: {
      type: Number,
      required: true
    }
  },
  first: {
    price: {
      type: Number,
      required: true
    },
    residue: {
      type: Number,
      required: true
    }
  },
  noSeat: {
    price: {
      type: Number,
      required: true
    },
    residue: {
      type: Number,
      required: true
    }
  },
  category: {
    type: Number,
    required: true
  }
})

module.exports = Ticket = mongoose.model('tickets', TicketSchema)