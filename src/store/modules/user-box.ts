import userBoxApis from '@/apis/user-box'
import type { IOperatorBox } from '@/global/entity/operator'
const userBox = {
	namespaced: true,
	state: {
		box: [],
		focusIndex: 0
	},
	mutations: {
		addNewEmptyBox(state: any) {
			state.box.push({
				operatorId: 0,
				potential: 0,
				eliteLevel: 0,
				expLevel: 0,
				skillsLevel: 1,
				skills: []
			})
		},
		reset(state: any, payload: number) {
			state.box = []
			for (let i = 0; i < payload; ++i)
				state.box.push({
					operatorId: 0,
					potential: 0,
					eliteLevel: 0,
					expLevel: 0,
					skillsLevel: 1,
					skills: []
				})
		},
		focusChange(state: any, payload: number) {
			state.focusIndex = payload
		},
		selectOperator(state: any, payload: any) {
			let { index, operatorId } = payload
			state.box[index].operatorId = operatorId
		},
		setOperatorBox(state: any, payload: IOperatorBox) {
			state.box[state.focusIndex] = {
				operatorId: payload.operatorId,
				potential: payload.potential,
				eliteLevel: payload.eliteLevel,
				expLevel: payload.expLevel,
				skillsLevel: payload.skillsLevel,
				skills: []
			}
			payload.skills.forEach((level: number) => {
				state.box[state.focusIndex].skills.push(level)
			})
		},
		setOperatorBoxes(state: any, payload: IOperatorBox[]) {
			state.box = payload
		}
	},
	actions: {
		fetchUserBox(context: any, payload: number) {
			userBoxApis.fetchUserBoxById(payload).then((response) => {
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
				if (box && box.length > 0) context.commit('setOperatorBoxes', box)
				else context.commit('addNewEmptyBox')
			})
		}
	}
}

export default userBox
