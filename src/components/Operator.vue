<template>
	<div class="operator">
		<el-empty description="双击以编辑" :image-size="100" v-if="isEmpty"></el-empty>
		<div v-else>
			{{ operator.cName }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore()
import { computed } from 'vue'

const props = defineProps({
	id: Number,
	operatorId: Number
})
ref: isEmpty = computed(() => {
	let box = store.state.userBox.box[<number>props.id]
	return box === undefined || box.operatorId === 0
})
ref: operatorBox = computed(() => store.state.userBox.box[<number>props.id])
ref: operator = computed(() => store.state.operators.operatorsLight[operatorBox.operatorId - 1])
</script>

<style lang="scss" scoped>
.el-empty {
	padding: 20px 0;
}
.operator {
	width: 100px;

	.potential {
		position: absolute;
		left: -3px;
	}
	.elite-level {
		position: absolute;
		bottom: 30px;
		left: -3px;
	}
	.exp-level {
		position: absolute;
		bottom: 0;
		padding: 4%;
		border-radius: 100%;
		border: 2px transparent solid;
		line-height: 100%;
	}
}
</style>
