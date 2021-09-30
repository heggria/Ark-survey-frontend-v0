<template>
	<div class="filter-operators">
		<table>
			<filter-operator-item
				v-for="filter in filterOptions"
				:key="filter.key"
				:en-name="filter.key"
				:name="filter.name"
				:options="filter.options"
				:reset-flag="resetFlag"
				@change="updateFilter"
			/>
		</table>
		<el-button type="danger" size="small" style="float: right" @click="reset">重 置</el-button>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore()
import { inject, onBeforeUpdate, onMounted, onUpdated, reactive, watch } from 'vue'
import FilterOperatorItem from './FilterOperatorItem.vue'
import type { IOperatorLight } from '@/global/entity/operator'

const props = defineProps({
	operators: Array // * 全部的干员
})
const emits = defineEmits(['change']) // * 当筛选条件改变时触发
let resetFlag = $ref(true)
const reset = () => {
	resetFlag = !resetFlag
}

const filterOptions = reactive({
	rate: {
		key: 'rate',
		name: '星级',
		options: [
			{ name: '1', value: 1 },
			{ name: '2', value: 2 },
			{ name: '3', value: 3 },
			{ name: '4', value: 4 },
			{ name: '5', value: 5 },
			{ name: '6', value: 6 }
		]
	},
	profession: {
		key: 'profession',
		name: '职业',
		options: [
			{ name: '近卫干员', value: 'warrior' },
			{ name: '狙击干员', value: 'sniper' },
			{ name: '重装干员', value: 'tank' },
			{ name: '医疗干员', value: 'medic' },
			{ name: '辅助干员', value: 'support' },
			{ name: '术士干员', value: 'caster' },
			{ name: '特种干员', value: 'special' },
			{ name: '先锋干员', value: 'pioneer' }
		]
	},
	tags: {
		key: 'tags',
		name: '标签',
		options: [] as any[]
	}
})
let tags = $computed(() => {
	let tags = store.state.operators.tags as string[]
	filterOptions['tags'].options = []
	tags.forEach((tag) => {
		filterOptions['tags'].options.push({ name: tag, value: tag })
	})
	return tags
})

const filters = ['rate', 'profession', 'tags'] // * 所有的类型
const filterItems = reactive<any>({})
const updateFilter = (values: any[], name: string) => {
	filterItems[name] = values
}
const filterAction = () => {
	let operators = props.operators as IOperatorLight[] | undefined
	if (operators === undefined || operators === null)
		// * 没有要筛选的干员，返回空数组
		emits('change', [])
	let result = [] as IOperatorLight[]
	operators?.forEach((operator: any) => {
		// * 遍历所有干员
		let flag = true
		filters.forEach((filterName) => {
			if (flag) {
				let filterItem = filterItems[filterName] as any[]
				if (typeof operator[filterName] === 'object') {
					// * 对象或者数组，需要遍历(条件为或)
					let allFlag = false
					operator[filterName].forEach((item: any) => {
						if (filterItem.findIndex((val) => val === item) >= 0) allFlag = true
					})
					if (!allFlag) flag = false
				} else {
					// * 普通数据类型，直接比较
					if (filterItem.findIndex((val) => val === operator[filterName]) === -1)
						// * 未找到符合条件的干员,flag为false
						flag = false
				}
			}
		})
		if (flag) result.push(operator)
	})
	emits('change', result)
}
// * 触发时机: 筛选条件改变，干员列表改变
watch(filterItems, () => {
	filterAction()
})
watch(props, () => {
	filterAction()
})
onMounted(() => {
	emits('change', props.operators ? props.operators : [])
})
</script>

<style lang="scss" scoped>
//
</style>
