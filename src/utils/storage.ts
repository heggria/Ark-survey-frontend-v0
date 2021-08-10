/**
 * @param name 名称
 * @param value 值
 * @param expires 过期时间(秒)
 */
interface IInput {
	name: string
	value: any
	expires: number
}

export default {
	// * 存取数值
	setItem: (params: IInput) => {
		// 参数适配  防止用户少输入参数
		const obj = {
			name: '', // 存入数据  属性
			value: '', // 属性值
			expires: -1, // 过期时间
			startTime: new Date().getTime() // 存入的时候 的时间
		}
		const options: any = {}
		// 将obj 和传进来的params 合并  放入到那个 options里面 实现js中浅拷贝
		Object.assign(options, obj, params)
		// 判断用户是否设置了过期时间
		if (options.expires >= 0) {
			//  以options.name为key,    options为值放进去
			options.expires *= 1000
			localStorage.setItem(options.name, JSON.stringify(options))
		} else {
			// 如果 options.expires 没有设置的话， 就判断一下value的类型
			// 注意 我们 的 localStorage 只能存储字符串 像是数组和对象要转换下
			let type = Object.prototype.toString.call(options.value)
			if (type == '[object Object]' || type == '[object Array]') {
				options.value = JSON.stringify(options.value)
			}
			localStorage.setItem(options.name, options.value)
		}
	},
	// 获取数值
	getItem: (name: string) => {
		let item: any = localStorage.getItem(name)
		// 判断 item 是否存在
		if (item) {
			// 先将取到的对象 看能转换成object 对象格式，不能就说明不是json字符串形式
			try {
				item = JSON.parse(item)
			} catch (error) {
				item = item
			}
			// 如果有expires的值,说明设置了失效时间
			if (item.expires) {
				// 获取当前时间
				let now = new Date().getTime()
				// 当前的时间和存入时候的时间 进行相减 和过期时间进行比较
				// 大于就说明过期了 清除存储  小于或者等于 就没有过期
				if (now - item.startTime > item.expires) {
					localStorage.removeItem(name)
					return undefined // 返回一个状态值
				} else {
					//缓存未过期，返回值
					return item.value
				}
			} else {
				// 没有设置过期时间，直接返回值
				return item
			}
		} else {
			return undefined // 如果item 值为undefined 则说明没有存储 返回false
		}
	},

	// 移除指定的缓存
	removeItem: (name: string) => {
		localStorage.removeItem(name)
	},
	// 移除所有的存储数据
	clear: () => {
		localStorage.clear()
	}
}
