import userBoxApis from '@/apis/user-box'
import type { IOperatorLight, IOperatorBox } from '@/global/entity/operator'
const userBox = {
	namespaced: true,
	state: {
		box: [] as IOperatorBox[]
	},
	mutations: {
		addNewBox(state: any, operaorId: number) {
			state.box.push({
				operatorId: operaorId,
				potential: 0,
				eliteLevel: 0,
				expLevel: 0,
				skillsLevel: 1,
				skills: []
			})
		},
		reset(state: any) {
			state.box = []
		},
		selectOperator(state: any, payload: any) {
			let { index, operatorId } = payload
			state.box[index].operatorId = operatorId
		},
		setOperatorBoxes(state: any, boxes: IOperatorBox[]) {
			state.box = boxes
		},
		deleteOperatorBox(state: any, id: number) {
			let result = [] as IOperatorBox[]
			state.box.forEach((box: IOperatorBox) => {
				if (box.operatorId !== id) result.push(box)
			})
			state.box = result
		}
	},
	actions: {
		fetchUserBox(context: any, userId: number) {
			userBoxApis.fetchUserBoxById(userId).then((response) => {
				let data = response.data
				let box = data.map((operator: any) => {
					return {
						potential: operator.potential,
						eliteLevel: operator.eliteLevel,
						expLevel: operator.expLevel,
						skillsLevel: operator.skillLevel,
						skills: operator.userSkillInfo,
						operatorId: operator.operatorId
					} as IOperatorBox
				})
				if (box) context.commit('setOperatorBoxes', box)
				else context.commit('setOperatorBoxes', [])
			})
		}
	}
}

export default userBox
