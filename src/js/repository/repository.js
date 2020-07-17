import axios from 'axios'

let baseURL = 'https://dev.cargo.direct/api'

// const token = localStorage.getItem('token')
//
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

export default axios.create({
  baseURL
})
