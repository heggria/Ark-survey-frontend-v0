import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import BoxEdit from '@/views/box-edit/Main.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/box-edit',
		name: 'BoxEdit',
		component: BoxEdit,
		meta: {
			requireLogin: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			requireGuest: true
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			requireGuest: true
		}
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

import message from '@/utils/message'
import storage from '@/utils/storage'

router.beforeEach((to, from, next) => {
	const token = storage.getItem('token')

	if (to.meta.requireLogin) {
		// * 需要登录
		if (!token) {
			message.warning('你还未登录!')
			next({ name: 'Login' })
		} else {
			next()
		}
	} else if (to.meta.requireGuest) {
		// * 已经登录的用户无需访问
		if (token) {
			next({ name: 'Home' })
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router
