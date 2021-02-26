const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  account: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  member: {
    type: Number,
    required: true
  }
})

module.exports = User = mongoose.model("users", UserSchema);
