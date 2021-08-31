<template>
	<div class="register">
		<el-form
			ref="registerForm"
			:model="form"
			label-position="right"
			label-width="100px"
			size="small"
		>
			<el-form-item
				label="用户名"
				prop="username"
				:error="unique.username"
				:rules="[
					{ required: true, message: '用户名不能为空!' },
					{
						type: 'string',
						pattern: /^[\w\u4e00-\u9fa5\u0800-\u4e00\-_]+$/,
						message: '用户名中不能有特殊字符!'
					}
				]"
			>
				<el-input
					v-model="form.username"
					size="small"
					placeholder="请输入用户名"
				></el-input>
			</el-form-item>
			<el-form-item
				label="昵称"
				prop="nickname"
				:error="unique.nickname"
				:rules="[
					{ required: true, message: '昵称不能为空!' },
					{
						type: 'string',
						pattern: /^[\w\u4e00-\u9fa5\u0800-\u4e00\-_]+$/,
						message: '昵称中不能有特殊字符!'
					}
				]"
			>
				<el-input v-model="form.nickname" size="small" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item
				label="邮箱"
				prop="email"
				:error="unique.email"
				:rules="[
					{ required: true, message: '邮箱不能为空!' },
					{ type: 'email', message: '请正确书写邮箱' }
				]"
			>
				<el-input v-model="form.email" size="small" placeholder="请输入邮箱地址"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
				:rules="[
					{ required: true, message: '密码不能为空!' },
					{ min: 6, max: 18, message: '密码应该在6-18位' },
					{ pattern: /^[\w-_]+$/, message: '密码应该只包含字母,数字和-_' }
				]"
			>
				<el-input
					v-model="form.password"
					size="small"
					placeholder="请输入密码"
					show-password
					clearable
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-progress
					:percentage="pwdStrength"
					:format="pwdStrengthText"
					:color="pwdColors"
				></el-progress>
			</el-form-item>
			<el-form-item
				label="确认密码"
				prop="checkPassword"
				:rules="[
					{
						required: true,
						pattern: new RegExp(`^${form.password}$`),
						message: '两次密码必须一致!'
					}
				]"
			>
				<el-input
					v-model="form.checkPassword"
					size="small"
					placeholder="请确认密码"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item
				label="邀请码"
				prop="invitation"
				:rules="[{ required: true, message: '邀请码不能为空!' }]"
			>
				<el-input
					v-model="form.invitation"
					size="small"
					placeholder="请输入邀请码"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button size="small" type="primary" plain @click="submit">注 册</el-button>
				<el-button size="small" @click="resetForm([])">重 置</el-button>
			</el-form-item>
			<el-form-item>
				<router-link to="/login">已有账号?点击登录</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'

let registerForm = $ref<any>(null)
const form = reactive({
	username: '',
	nickname: '',
	email: '',
	password: '',
	checkPassword: '',
	invitation: ''
})

const unique = reactive({
	username: '',
	email: '',
	nickname: ''
})
import { useRouter } from 'vue-router'
const router = useRouter()
import userApis from '@/apis/user'
const submit = (): void => {
	unique.username = ''
	unique.email = ''
	unique.nickname = ''

	// * 校验
	let flag = false
	registerForm.validate((valid: any) => {
		if (!valid) {
			flag = true
			return false
		}
	})
	if (flag) return
	// * 注册
	userApis
		.register({
			username: form.username,
			nickname: form.nickname,
			password: form.password,
			email: form.email
		})
		.then((response) => {
			// * 注册成功
			message.success(response.message + '!')
			setTimeout(() => {
				router.push('/login')
			}, 1000)
		})
		.catch((err) => {
			console.log(err)
			let data = err.data
			let message = data.message
			let statusCode = Number(data.statusCode)
			if (statusCode === 400) {
				let ifUnique = data.data
				if (ifUnique.username) unique.username = '用户名已被注册'
				if (ifUnique.nickname) unique.nickname = '昵称已被注册'
				if (ifUnique.email) unique.email = '邮箱已被注册'
			}
		})
}

const resetForm = (fileds: string[]): void => {
	if (fileds.length === 0) registerForm.resetFields()
	else registerForm.resetFields(fileds)
}

import getPwdStrength from '@/utils/pwdStrength'
import message from '@/utils/message'
const pwdStrength = computed(() => {
	let pwd = form.password
	return getPwdStrength(pwd)
})
const pwdStrengthText = (percentage: number) => {
	if (percentage === 0) return ''
	if (percentage < 34) return '弱'
	if (percentage < 67) return '中'
	return '强'
}
const pwdColors = reactive([
	{ color: '#f56c6c', percentage: 34 },
	{ color: '#409eff', percentage: 67 },
	{ color: '#67c23a', percentage: 100 }
])
</script>

<style lang="scss" scoped>
.register {
	position: absolute;
	top: 20vh;
	left: 50%;
	margin-left: -151.5px;
}
</style>
