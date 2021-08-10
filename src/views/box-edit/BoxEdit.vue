<template>
	<div>
		<el-row>
			<el-col :span="14">
				<operator-box-edit />
			</el-col>
			<el-col :span="10">
				<el-row class="box-view">
					<operator
						v-for="count in boxNum"
						:id="count - 1"
						:key="count"
						@dblclick="edit(count)"
						:class="foucsIndex === count - 1 ? 'selected' : ''"
					/>
					<el-button
						class="operator"
						type="text"
						icon="el-icon-plus"
						@click="addNewBox"
					></el-button>
				</el-row>
				<el-divider />
				<el-row>
					<el-button class="save" size="small" @click="save"> 保存 </el-button>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import userBoxApis from '@/apis/user-box'
import Operator from '@/components/Operator.vue'
import type { IOperatorBox } from '@/global/entity/operator'
import message from '@/utils/message'
import OperatorBoxEdit from '@/views/box-edit/OperatorBoxEdit.vue'
import { computed, onMounted } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

ref: boxNum = computed(() => store.state.userBox.box.length)
ref: foucsIndex = computed(() => store.state.userBox.focusIndex)

const edit = (index: number) => {
	store.commit('userBox/focusChange', index - 1)
}
const addNewBox = () => {
	store.commit('userBox/addNewEmptyBox')
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
	display: flex;
	flex-wrap: wrap;
	.operator {
		margin: 0 5px;
		user-select: none;
		width: 100px;
		height: 188px;
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
.save {
	width: 50%;
	margin: auto;
}
</style>
