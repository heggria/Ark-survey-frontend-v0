// * 自定义的message(alert)提示
import { ElMessage } from 'element-plus'

export default {
	//* 成功提示
	success(message: string) {
		ElMessage.success({
			message: message,
			type: 'success'
		})
	},

	//* 错误提示
	error(message: string) {
		ElMessage.error(message)
	},

	//* 消息提示
	info(message: string) {
		ElMessage(message)
	},

	//* 警告提示
	warning(message: string) {
		ElMessage.warning({
			message: message,
			type: 'warning'
		})
	}
}
