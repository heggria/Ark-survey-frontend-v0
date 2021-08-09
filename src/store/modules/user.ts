import storage from '@/utils/storage'
import userApis from '@/apis/user'

const user = {
	namespaced: true,
	state: {
		username: '',
		id: 0,
		nickname: '',
		role: 0,
		email: '',
		registerDate: ''
	},
	mutations: {
		login(state: any, payload: any) {
			state.id = payload.id
			console.log(state.id)
			storage.setItem({
				name: 'token',
				value: payload.token,
				expires: 8 * 3600
			})
			storage.setItem({
				name: 'id',
				value: payload.id,
				expires: 8 * 3600
			})
		},
		logout(state: any) {
			state.username = ''
			state.id = 0
			storage.removeItem('token')
			storage.removeItem('id')
		},
		setUserInfo(state: any, payload: any) {
			state.username = payload.username
			state.id = payload.id
			state.nickname = payload.nickname
			state.email = payload.email
			state.role = payload.role
			state.registerDate =
				payload.registerDate.match(/T/gi) === null
					? payload.registerDate
					: payload.registerDate.replace(/T/gi, ' ')
		},
		refresh(state: any) {
			// * 重新获取用户数据
			state.id = storage.getItem('id') === undefined ? 0 : storage.getItem('id')
		}
	},
	actions: {
		refreshUserInfo(context: any) {
			userApis.fetchUserById(context.state.id).then((response) => {
				let data = response.data
				context.commit('setUserInfo', data)
			})
		}
	}
}

export default user
