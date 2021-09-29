<template>
	<div>
		<el-row>
			<el-col :span="13">
				<el-switch
					style="display: block"
					v-model="editable"
					active-text="已拥有"
					inactive-text="未拥有"
					@click="dbCheck"
					:disabled="foucsIndex === -1"
				>
				</el-switch>
				<el-dialog title="警告" v-model="checkDeleteDialog" width="30%">
					<span>确认要删除吗？删除后数据将<b>无法</b>恢复</span>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click=";(checkDeleteDialog = false), (editable = true)"
								>取 消</el-button
							>
							<el-button
								type="danger"
								@click="
									store.commit(
										'userBox/deleteOperatorBox',
										operatorStates[foucsIndex].operatorId
									),
										(checkDeleteDialog = false),
										(editable = false),
										(foucsIndex = -1)
								"
								>确 定</el-button
							>
						</span>
					</template>
				</el-dialog>
				<el-divider></el-divider>
				<operator-box-edit
					v-if="editable"
					:operator-id="
						operatorStates[foucsIndex] ? operatorStates[foucsIndex].operatorId : 0
					"
				/>
				<el-empty v-else description="未持有干员无法编辑"> </el-empty>
			</el-col>
			<el-col :span="10" :offset="1">
				<el-row>
					<el-button class="save" size="small" @click="save"> 保存 </el-button>
				</el-row>
				<el-row>
					<el-collapse style="width: 100%">
						<el-collapse-item>
							<template #title> <h3>筛选:</h3> </template>
							<filter-operator
								:operators="operators"
								@change="setSuitableOperators"
							/>
						</el-collapse-item>
					</el-collapse>
				</el-row>
				<el-row class="box-view">
					<operator
						v-for="(state, index) in operatorStates"
						:operator-id="state.operatorId"
						:key="state.operatorId"
						@dblclick="foucsIndex = index"
						:class="[
							foucsIndex === index ? 'selected' : '',
							state.own ? '' : 'not-owned'
						]"
					/>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import type { IOperatorBox, IOperatorLight } from '@/global/entity/operator'
import operator from '@/apis/operator'
import userBoxApis from '@/apis/user-box'
import message from '@/utils/message'
import { onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import Operator from '@/components/Operator.vue'
import OperatorBoxEdit from './OperatorBoxEdit.vue'
import FilterOperator from '@/components/FilterOperators.vue'

const store = useStore()

let foucsIndex = $ref(-1)
let operators = $computed(() => store.state.operators.operatorsLight as IOperatorLight[])
let userBoxes = $computed(() => {
	let boxes = store.state.userBox.box as IOperatorBox[]
	return boxes
})

const suitableOperators = reactive<IOperatorLight[]>([])
const setSuitableOperators = (newVal: IOperatorLight[]) => {
	while (suitableOperators.length > 0) suitableOperators.pop()
	newVal.forEach((val) => {
		suitableOperators.push(val)
	})
	foucsIndex = -1
}
let operatorStates = $computed(() => {
	let own = new Array(operators.length).fill(false)
	let result = [] as any[]
	userBoxes.forEach((box) => {
		own[box.operatorId - 1] = true
	})
	suitableOperators.forEach((operator) => {
		result.push({
			own: own[operator.id - 1],
			operatorId: operator.id
		})
	})
	result.sort((a, b) => {
		if (!a.own && b.own) return 1
		return -1
	})
	return result
})

let editable = $ref(false)
let checkDeleteDialog = $ref(false)
watch($$(foucsIndex), () => {
	editable = operatorStates[foucsIndex] ? operatorStates[foucsIndex].own : false
})
const dbCheck = () => {
	if (foucsIndex == -1) return
	if (editable) {
		// * 未持有 -> 已持有
		store.commit('userBox/addNewBox', operatorStates[foucsIndex].operatorId)
		foucsIndex = 0 // ! 好吧我也不知道为什么新干员添加后会被排序到最上面，反正它就是能运行
	} else {
		// * 已持有 -> 未持有
		checkDeleteDialog = true
	}
}

const save = () => {
	let operatorBox = store.state.userBox.box
	let requestData = {
		userId: store.state.user.id,
		data: [] as any[]
	}
	operatorBox.forEach((box: IOperatorBox) => {
		if (box.operatorId > 0)
			requestData.data.push({
				potential: box.potential,
				eliteLevel: box.eliteLevel,
				expLevel: box.expLevel,
				skillLevel: box.skillsLevel,
				userSkillInfo: box.skills,
				operator: box.operatorId
			})
	})
	userBoxApis.setUserBox(requestData).then((response) => {
		if (response.stateCode === 200) message.success('保存成功！')
		else message.error('保存失败！')
	})
}
onMounted(() => {
	setTimeout(() => {
		store.dispatch('userBox/fetchUserBox', store.state.user.id)
	}, 100)
})
</script>

<style lang="scss" scoped>
.box-view {
	* {
		float: left;
	}
	height: 72.2vh;
	overflow: auto;
	.el-button {
		font-size: 45px;
	}
}
.selected {
	border: 1px solid #79bbff;
}
.not-owned {
	filter: grayscale(50%);
}

.save {
	width: 50%;
	margin: auto;
}
</style>
