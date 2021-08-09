<template>
	<div class="login">
		<el-form ref="loginForm" :model="form">
			<el-form-item
				label=""
				prop="username"
				:rules="[{ required: true, message: '不能为空!' }]"
				:error="userCheck"
			>
				<el-input
					v-model="form.username"
					size="small"
					placeholder="请输入用户名/邮箱"
				></el-input>
			</el-form-item>
			<el-form-item
				label=""
				prop="password"
				:rules="[{ required: true, message: '不能为空!' }]"
				:error="pwdCheck"
			>
				<el-input
					v-model="form.password"
					size="small"
					placeholder="请输入密码"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button size="small" type="primary" plain @click="submit">登 录</el-button>
				<el-button size="small" @click="resetForm([])">重 置</el-button>
			</el-form-item>
			<el-form-item>
				<router-link to="/register">没有账号?点击注册</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import store from '@/store'
import message from '@/utils/message'
import { ref, reactive, onMounted } from 'vue'

ref: loginForm = ref<any>()
ref: userCheck = ''
ref: pwdCheck = ''
const form = reactive({
	username: '',
	password: ''
})

import { useRouter } from 'vue-router'
const router = useRouter()
import userApis from '@/apis/user'
const submit = (): void => {
	userCheck = ''
	pwdCheck = ''
	// * 校验
	let flag = false
	loginForm.validate((valid: any) => {
		if (!valid) {
			flag = true
			return false
		}
	})
	if (flag) return
	// * 登录
	userApis
		.login(form)
		.then((response) => {
			console.log(response)
			message.success('登录成功!')
			store.commit('user/login', {
				id: response.data.id,
				token: response.data.token
			})
			setTimeout(() => {
				store.dispatch('user/refreshUserInfo')
				router.push('/')
			}, 1000)
			// * 事先获取干员和全站数据
			store.dispatch('operators/setAllOperatorsLight')
		})
		.catch((err) => {
			let data = err.data
			let message = data.message
			let statusCode = Number(data.statusCode)
			if (statusCode === 400) {
				if (message.match(/用户/g)) userCheck = message + '!'
				if (message.match(/密码/g)) pwdCheck = message + '!'
			}
		})
}

const resetForm = (fileds: string[]): void => {
	if (fileds.length === 0) loginForm.resetFields()
	else loginForm.resetFields(fileds)
}
</script>

<style lang="scss" scoped>
.login {
	position: absolute;
	top: 20vh;
	left: 50%;
	margin-left: -80px;
}
</style>
