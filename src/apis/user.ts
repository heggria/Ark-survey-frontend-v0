import req from '@/utils/service'

const fetchAllUsers = () => req('get', '/api/user/list')

interface IRegister {
	username: string
	nickname: string
	password: string
	email: string
}
const register = (user: IRegister) => req('post', '/api/user/register', user)

interface ILogin {
	username: string
	password: string
}
const login = (user: ILogin) => req('post', '/api/user/login', user)

const fetchUserById = (id: number) => req('get', `/api/user/findById`, { id })

export default {
	fetchAllUsers,
	register,
	login,
	fetchUserById
}
