import axios from 'axios'

export const carapi = axios.create({
  baseURL: 'https://gregslist-server.herokuapp.com/api/cars',
  timeout: 3000
})

export const houseapi = axios.create({
  baseURL: 'https://gregslist-server.herokuapp.com/api/houses',
  timeout: 3000
})

export const jobapi = axios.create({
  baseURL: 'https://gregslist-server.herokuapp.com/api/jobs',
  timeout: 3000
})
