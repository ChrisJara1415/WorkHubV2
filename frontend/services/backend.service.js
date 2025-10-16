import axios from 'axios'
process.loadEnvFile('../.env')

const BACK_URL = process.env.BACK_BASE_URL
const api = axios.create({
    baseURL: BACK_URL,
    headers: { 'Content-Type': 'application/json'}
})

export default api