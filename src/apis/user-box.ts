import { IOperatorBox } from '@/global/entity/operator'
import req from '@/utils/service'

interface userBoxData {
	userId: number
	data: any[]
}
const setUserBox = (data: userBoxData) => req('post', '/api/operator/setUsers', data)

const fetchUserBoxById = (userId: number) => req('get', '/api/operator/listUsers', { id: userId })
export default {
	setUserBox,
	fetchUserBoxById
}
