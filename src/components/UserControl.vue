<template>
	<div class="user-control">
		<div v-if="userId === undefined || userId === 0">
			<router-link to="/login"><el-button type="text">登录</el-button></router-link>
			|
			<router-link to="/register"><el-button type="text">注册</el-button></router-link>
		</div>
		<div v-else>
			<el-dropdown class="user">
				<span class="el-dropdown-link">
					<span style="font-size: 17px; line-height: 58px">{{ username }}</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item icon="el-icon-lock" @click="logout">
							登 出
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

let userId = $computed(() => store.state.user.id)
let username = $computed(() => store.state.user.username)

const logout = () => {
	store.commit('user/logout')
	router.push('/')
}
</script>

<style lang="scss" scoped>
//
</style>
