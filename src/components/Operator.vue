<template>
	<div class="operator">
		<el-empty description="双击以编辑" :image-size="100" v-if="isEmpty"></el-empty>
		<div v-else>
			<div class="operator-img" :class="operator.key"></div>
			<div style="text-align: center; width: 100%">{{ operator.cName }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import type { IOperatorBox, IOperatorLight } from '@/global/entity/operator'
const store = useStore()

const props = defineProps({
	id: Number,
	operatorId: Number
})
let isEmpty = $computed(() => {
	let box = store.state.userBox.box[<number>props.id]
	return box === undefined || box.operatorId === 0
})
let operatorBox = $computed(() => store.state.userBox.box[<number>props.id] as IOperatorBox)
let operator = $computed(() => {
	let operatorBox = store.state.userBox.box[<number>props.id]
	return store.state.operators.operatorsLight[operatorBox.operatorId - 1] as IOperatorLight
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
		zoom: 1;
	}
}
</style>
