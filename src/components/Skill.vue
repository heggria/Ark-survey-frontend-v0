<template>
	<div class="skill">
		<div>
			<div class="skill-img" :class="skillKey"></div>
			<div class="skill-name">{{ props.skillName }}</div>
		</div>
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
let skillKey = $computed(() => props.skillKey?.replace(/\[/, '_').replace(/\]/, ''))

const props = defineProps({
	eliteLevel: Number,
	skillLevel: Number,
	skillKey: String,
	skillName: String
})
let upDisabled = $computed(() => {
	if (props.eliteLevel && props.eliteLevel < 2) return true
	if (props.skillLevel && (props.skillLevel < 7 || props.skillLevel === 10)) return true
	return false
})
let downDisabled = $computed(() => {
	if (props.eliteLevel && props.eliteLevel < 2) return true
	if (props.skillLevel && props.skillLevel <= 7) return true
	return false
})
</script>

<style lang="scss" scoped>
@import '@/assets/SkillImage/skillImg.scss';
.skill {
	display: flex;
	flex-direction: row;
	.skill-img {
		@include skill;
		border: 1px solid black;
		zoom: 1.4;
	}
	.skill-name {
		text-align: center;
	}
}
.button-group {
	height: 100%;
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
		text-align: center;
	}
}
</style>
