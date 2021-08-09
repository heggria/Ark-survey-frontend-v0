import operatorApis from '@/apis/operator'
import { IOperatorLight } from '@/global/entity/operator'

const operators = {
	namespaced: true,
	state: {
		operatorsLight: [] as IOperatorLight[]
	},
	mutations: {
		setOperatosLight(state: any, operatorsLight: IOperatorLight[]) {
			state.operatorsLight = operatorsLight
		}
	},
	actions: {
		setAllOperatorsLight(context: any) {
			operatorApis.fetchAllOperatorsLight().then((response) => {
				let data = response.data
				context.commit('setOperatosLight', data)
			})
		}
	}
}

export default operators
