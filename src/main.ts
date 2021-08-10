import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/packages/theme-chalk/src/base.scss'
import animate from 'animate.css'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus).use(animate)

app.mount('#app')
