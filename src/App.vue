<template>
	<div id="app">
		<el-container>
			<el-header class="header">
				<el-button icon="el-icon-s-unfold" circle @click="show = !show"></el-button>
				<router-link to="login" class="title">
					<h3 class="title">调查站</h3>
				</router-link>
				<user-control class="user-con" />
			</el-header>
			<el-container>
				<el-aside v-show="path !== '/login' && path !== '/register'">
					<el-menu router :collapse="show">
						<el-menu-item v-for="item in items" :key="item.title" :index="item.route">
							<i :class="item.icon"></i>
							<template #title>{{ item.title }}</template>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view v-slot="{ Component }">
						<transition
							:duration="1000"
							name="custom-classes-transition"
							enter-active-class="animate__animated animate__fadeInRight"
							leave-active-class="animate__animated animate__fadeOutRightBig"
						>
							<component :is="Component" />
						</transition>
					</router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
	store.commit('user/refresh')
	if (store.state.user.id !== 0) {
		store.dispatch('user/refreshUserInfo')
		store.dispatch('operators/setAllOperatorsLight')
	}
	store.commit('userBox/reset', 1)
})

import UserControl from '@/components/UserControl.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let path = $computed(() => route.fullPath)

let show = $ref(false)
const items = reactive([
	{
		icon: 'el-icon-edit',
		title: 'BOX编辑',
		route: '/box-edit'
	}
])
</script>

<style lang="scss" scoped>
.header {
	position: relative;
	top: -3px;
	width: 100%;
	box-shadow: 0px 3px 3px #b3b0b0;
	.title {
		display: inline-flex;
		text-decoration: none;
		color: black;
	}
	.user-con {
		float: right;
	}
}
.el-aside {
	.el-menu {
		height: 75vh;
	}
	min-width: 150px;
	max-width: 300px;
	width: 18% !important;
}

.el-main {
	overflow-x: hidden;
}
</style>
