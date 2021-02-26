import axios from 'axios'

export function getRegister(data) {
  return axios.post('http://localhost:5000/api/users/register', data)
}

export function getLoginData(data) {
  return axios.post('http://localhost:5000/api/users/login', data)
}

export function editUser(data) {
  return axios.post('http://localhost:5000/api/users/edit', data)
}
