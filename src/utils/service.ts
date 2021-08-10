import axios from 'axios'
import message from './message'
import router from '@/router'
import storage from './storage'

const instance = axios.create({
	baseURL: '',
	timeout: 10000
})

// * 请求拦截器
instance.interceptors.request.use((config: any) => {
	// * token
	if (storage.getItem('token')) {
		config.headers.Authorization = 'Bearer ' + storage.getItem('token')
	}
	return config
})

// * 响应拦截器
instance.interceptors.response.use(
	(response: any) => {
		let data = response.data
		if (data.stateCode !== null && data.stateCode !== undefined) {
			data.stateCode = Number(data.stateCode)
		}
		return response.data
	},
	(error: any) => {
		let stateCode = error.response.data.statusCode
		if (stateCode === 401) {
			// * 未登录
			message.warning('你还没有登录!')
			setTimeout(() => {
				router.replace('/login')
			}, 1900)
		}
		if (stateCode === 500) {
			message.error('后台发生错误，请联系管理员!')
		}
		return Promise.reject(error.response)
	}
)

export default function (method: string, url: string, data: any = null): Promise<any> {
	method = method.toLowerCase()
	if (method === 'post') return instance.post(url, data)
	if (method === 'get') return instance.get(url, { params: data })
	if (method === 'delete') return instance.delete(url, { params: data })
	if (method === 'put') return instance.put(url, data)
	message.error('出现未知错误!')
	return null as any
}
