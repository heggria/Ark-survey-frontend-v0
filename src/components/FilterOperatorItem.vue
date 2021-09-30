<template>
	<tr class="filter-operator-item">
		<td>
			<div class="title">{{ props.name }}</div>
		</td>
		<td>
			<div class="content">
				<el-button
					type="primary"
					size="mini"
					v-for="(option, index) in options"
					:key="index"
					:class="flags[index] ? 'choose' : 'not-choose'"
					@click="flags[index] = !flags[index]"
				>
					{{ option.name }}
				</el-button>
			</div>
		</td>
	</tr>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, watch } from 'vue'

const props = defineProps({
	enName: String,
	name: String,
	options: Array,
	resetFlag: Boolean
})
const emits = defineEmits(['change'])
interface IOption {
	name: string
	value: any
}
let options = $computed(() => {
	let options = props.options as IOption[]
	for (let i = 0; i < options.length; ++i) flags.push(true)
	return options
})
const flags = reactive<boolean[]>([])
watch($$(flags), () => {
	if (options) {
		let result = [] as any[]
		flags.forEach((flag, index) => {
			if (flag) result.push(options[index].value)
		})
		emits('change', result, props.enName)
	}
})
onMounted(() => {
	if (options) {
		let result = [] as any[]
		options.forEach((option) => {
			result.push(option.value)
		})
		emits('change', result, props.enName)
	}
})

let resetFlag = $computed(() => props.resetFlag)
watch($$(resetFlag), () => {
	for (let i = 0; i < flags.length; ++i) flags[i] = true
})
</script>

<style lang="scss" scoped>
.filter-operator-item {
	display: flex;
	flex-wrap: nowrap;
}
.title {
	display: inline-block;
	font-weight: bold;
	width: 50px;
	font-size: 16px;
	text-align: center;
}
.content {
	display: inline-flex;
	flex-wrap: wrap;
	.not-choose {
		color: #409eff;
		background-color: #ecf5ff;
		border-color: #b3d8ff;
	}
	.el-button {
		margin: 0 5px 5px 0;
	}
}
</style>
