import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个 axios 实例
const api = axios.create({
	baseURL: '/api', // 所有的请求地址前缀部分
	timeout: 15 * 60 * 1000, // 请求超时时间毫秒
	// withCredentials: true, // 异步请求携带cookie
	headers: {
		// 设置后端需要的传参类型
		// 'Content-Type': 'application/json',
		// 'token': 'your token',
		// 'X-Requested-With': 'XMLHttpRequest',
	},
})

// 添加请求拦截器
api.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		config.url = "http://" + window.localStorage.getItem("c-api-host") + config.url;
		return config
	},
	function (error) {
		// 对请求错误做些什么
		console.log(error)
		return Promise.reject(error)
	}
)

// 添加响应拦截器
api.interceptors.response.use(
	function (response) {
		if (response.data.status != 200) {
			ElMessage.error(response.data.message)
			return Promise.reject(response.data.message)
		}
		return response
	},
	function (error) {
		console.log(error)
		return Promise.reject(error)
	}
)

export default api