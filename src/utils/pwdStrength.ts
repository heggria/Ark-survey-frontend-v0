const _WEAK = 33
const _MEDUIM = 66
const _STRONG = 100

const pwdStrength = (pwd: string): number => {
	if (pwd.length < 6 || pwd.length > 18) return 0
	if (pwd.match(/^[\w-_]+$/) === null) return 0

	if (pwd.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{9,18}$/)) {
		// * 9-18位的数字、字母、特殊字符，三个缺一不可 = 强
		return _STRONG
	}
	if (pwd.match(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{12,18}$/)) {
		// * 12-18位的数字+字母/字母+特殊字符/特殊字符+数字 = 强
		return _STRONG
	}

	if (pwd.match(/^(\d{12,18}$)|([a-z]{12,18}$)|([A-Z]{12,18}$)/)) {
		// * 12-18位纯数字/字母 = 中
		return _MEDUIM
	}
	if (pwd.match(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/)) {
		// * 6-12位的数字+字母/字母+特殊字符/特殊字符+数字 = 中
		return _MEDUIM
	}
	if (pwd.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,8}$/)) {
		// * 6-8位的数字、字母、特殊字符，三个缺一不可 = 中
		return _MEDUIM
	}

	if (pwd.match(/^(\d{6,12}$)|([a-z]{6,12}$)|([A-Z]{6,12}$)/)) {
		// * 6-12位纯数字/字母 = 弱
		return _WEAK
	}
	return 0 // * 匹配不到则为不合法
}

export default pwdStrength
