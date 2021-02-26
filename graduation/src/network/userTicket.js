import axios from 'axios'

// 查询用户所有车票信息
export function getTicketList(user_account) {
  return axios.get('http://localhost:5000/api/userTickets/' + user_account)
}

// 添加用户购票信息
export function addTicket(data) {
  return axios.post('http://localhost:5000/api/userTickets/userTicket', data)
}

// 删除用户某条车票信息
export function deleteTicket(data) {
  return axios.post('http://localhost:5000/api/userTickets/deleteInfo', data)
}

// 用户某条退款车票信息
export function refundTicket(data) {
  return axios.post('http://localhost:5000/api/userTickets/refund', data)
}
