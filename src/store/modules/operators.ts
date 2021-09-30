import operatorApis from '@/apis/operator'
import { IOperatorLight } from '@/global/entity/operator'

const operators = {
	namespaced: true,
	state: {
		operatorsLight: [] as IOperatorLight[],
		tags: [] as string[]
	},
	mutations: {
		setOperatosLight(state: any, operatorsLight: IOperatorLight[]) {
			state.operatorsLight = operatorsLight
		},
		addTag(state: any, newTag: string) {
			let tags = state.tags as string[]
			let flag = true
			tags.forEach((tag) => {
				if (tag === newTag)
					// 已经存在
					flag = false
			})
			if (flag) tags.push(newTag)
		}
	},
	actions: {
		setAllOperatorsLight(context: any) {
			operatorApis.fetchAllOperatorsLight().then((response) => {
				let data = response.data as any[]
				data.forEach((operator) => {
					operator.profession = operator.profession.toLowerCase()
					operator.tags = operator.tags.split(/,/g)
					operator.tags.forEach((tag: string) => {
						context.commit('addTag', tag)
					})
				})
				context.commit('setOperatosLight', data)
			})
		}
	}
}

export default operators
