<template>
	<div class="select-operator">
		<div class="select">
			<el-form label-width="80px" label-position="right">
				<el-form-item label="星级">
					<el-button
						v-for="count in 6"
						:key="count"
						type="primary"
						:class="form.rates[count] ? '' : 'box-not-selected'"
						@click="setStars(count)"
					>
						{{ count }}
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-divider content-position="left">符合条件的干员</el-divider>
		<div class="operators">
			<el-button
				v-for="operator in suitableOperators"
				:key="operator.id"
				type="text"
				class="operator"
				@click="selectOperator(operator)"
				:class="operator.id === selectedOperator.operatorId ? 'operator-selected' : ''"
			>
				{{ operator.cName }}
			</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { IOperatorBox, IOperatorLight } from '@/global/entity/operator'
import { computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

ref: index = computed(() => store.state.userBox.focusIndex)
ref: operators = computed(() => store.state.operators.operatorsLight)
ref: selectedOperator = computed(() => store.state.userBox.box[index])

const form = reactive({
	rates: [undefined, true, true, true, true, true, true] as boolean[]
})
const setStars = (rate: number) => {
	form.rates[rate] = !form.rates[rate]
}

ref: suitableOperators = computed(() => {
	return operators.filter((operator: IOperatorLight) => {
		let flag = true
		store.state.userBox.box.forEach((box: IOperatorBox) => {
			// * 不能重复选择
			flag = flag && box.operatorId !== operator.id
		})
		return flag
	})
})

watch(form, (form) => {
	suitableOperators = operators.filter((operator: IOperatorLight) => {
		let flag = true
		flag = flag && form.rates[operator.rate] // * 稀有度筛选
		return flag
	})
})
const selectOperator = (operator: IOperatorLight) => {
	store.commit('userBox/selectOperator', {
		index: index,
		operatorId: operator.id
	})
	emit('close-dialog')
}

const emit = defineEmits(['close-dialog'])
</script>

<style lang="scss" scoped>
.box-not-selected {
	background-color: white;
	color: black;
}
.operator {
	margin-left: 5px;
	padding: 0 3px;
	margin-top: 2px;
	min-height: 25px;
	:hover {
		border-color: #409eff;
	}
}
.operator-selected {
	background-color: #409eff;
	color: white;
}
</style>
