import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入自定义UI组件库
import UI from '@/components/library'
// 导入重置样式库
import 'normalize.css'
// 导入自己的重置样式库
import '@/assets/styles/common.less'
createApp(App).use(store).use(ElementPlus).use(router).use(UI).mount('#app')
