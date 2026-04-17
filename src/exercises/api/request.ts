import axios, { Axios, AxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
})
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data
    if (code !== 200) {
      return Promise.reject(new Error(msg))
    }
    return res.data
  },
  (error) => Promise.reject(error)
)
interface ApiResponse<T> {
    code: number;
    msg:string;
    data: T
}
function request<T>(config:AxiosRequestConfig) {
    return service(config) as Promise<ApiResponse<T>>
}
export default request