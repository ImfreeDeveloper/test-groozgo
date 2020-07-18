import axios from 'axios'

const baseURL = 'https://dev.cargo.direct/api'
const tokenAPIForBik = 'Token 5d7f541af5b3cc8e369890f92a07574ecc68861a'

export async function fetchWithAuth (method, url, data = {}) {
  const token = localStorage.getItem('token') || ''
  let headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = token
  }

  const axiosCreate = axios.create({
    baseURL,
    headers
  })

  return axiosCreate({
    method,
    url,
    data
  })
}

export async function fetchBik (method, url, data = {}) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': tokenAPIForBik
  }

  const axiosCreate = axios.create({
    headers
  })

  return axiosCreate({
    method,
    url,
    data
  })
}
