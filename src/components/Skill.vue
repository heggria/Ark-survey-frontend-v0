<template>
	<div class="skill">
		<div class="img"></div>
		<div class="button-group">
			<el-button
				type="text"
				class="button"
				icon="el-icon-plus"
				:disabled="upDisabled"
				@click="emit('skill-up')"
			></el-button>
			<span>{{ props.skillLevel }}</span>
			<el-button
				type="text"
				class="button"
				icon="el-icon-minus"
				:disabled="downDisabled"
				@click="emit('skill-down')"
			></el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const emit = defineEmits(['skill-up', 'skill-down'])

const props = defineProps({
	eliteLevel: Number,
	skillLevel: Number
})
ref: upDisabled = computed(() => {
	if (props.eliteLevel && props.eliteLevel < 2) return true
	if (props.skillLevel && (props.skillLevel < 7 || props.skillLevel === 10)) return true
	return false
})
ref: downDisabled = computed(() => {
	if (props.eliteLevel && props.eliteLevel < 2) return true
	if (props.skillLevel && props.skillLevel <= 7) return true
	return false
})
</script>

<style lang="scss" scoped>
.skill {
	display: flex;
	flex-direction: row;
}
.img {
	width: 10vw;
	height: 10vw;
	border: 1px solid black;
}
.button-group {
	height: 10vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 3vw;
	.button {
		width: 100%;
		height: 3vw;
		margin: 0;
	}
	span {
		position: relative;
		left: 50%;
		margin-left: -5px;
	}
}
</style>
