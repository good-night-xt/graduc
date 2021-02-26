import axios from 'axios'

// 购票时该类型票数量减一
export async function buyTicket(data) {
  return await axios.post('http://localhost:5000/api/tickets/buyTicket', data)
}

