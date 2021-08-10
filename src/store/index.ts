import { createStore } from 'vuex'
import userBox from './modules/user-box'
import user from './modules/user'
import operators from './modules/operators'

export default createStore({
	modules: {
		userBox,
		user,
		operators
	}
})
