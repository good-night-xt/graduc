const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
// 引入userTickets.js
const userTickets = require("./routes/api/userTickets");
// 引入tickets.js
const tickets = require("./routes/api/tickets")

// 引入ticket.js(车票信息)
// const ticketSave = require('./save/ticket');
// ticketSave();

// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件(放在路由之前)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db)
        .then(() => console.log('mongoDB connected'))
        .catch(err => console.log(err))

// 使用中间件实现允许跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
})

// 使用routes
app.use("/api/users", users);
app.use("/api/userTickets", userTickets)
app.use("/api/tickets", tickets)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
