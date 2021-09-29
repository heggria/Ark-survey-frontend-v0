<template>
	<div class="operator">
		<div class="operator-img" :class="operator.key"></div>
		<div style="text-align: center; width: 100%">{{ operator.cName }}</div>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import type { IOperatorBox, IOperatorLight } from '@/global/entity/operator'
const store = useStore()

const props = defineProps({
	operatorId: Number
})

let operator = $computed(() => {
	return store.state.operators.operatorsLight[(props.operatorId as number) - 1] as IOperatorLight
})
</script>

<style lang="scss" scoped>
@import '@/assets/OperatorImage/operatorImgOrigin.scss';
.el-empty {
	padding: 0;
	:deep(.el-empty__description) {
		margin: 0;
	}
}
.operator {
	margin: 5px;
	user-select: none;
	width: 108px;
	height: 135px;
	.operator-img {
		@include operatorOrigin;
		zoom: 1.2;
	}
}
</style>
