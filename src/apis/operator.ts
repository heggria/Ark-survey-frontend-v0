import req from '@/utils/service'

const fetchAllOperators = () => req('get', '/api/operator/listAll')
const fetchAllOperatorsLight = () => req('get', '/api/operator/listAllByLightweight')

export default {
	fetchAllOperators,
	fetchAllOperatorsLight
}
