import axios from 'axios'

export function ticketSearchData(data) {
  return axios.post('http://localhost:5000/api/tickets', data)
}