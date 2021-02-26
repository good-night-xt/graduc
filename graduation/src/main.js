import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 字体图标
import './assets/fonts/iconfont.css'
// 公共样式
import './assets/css/global.css'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$eventBus = new Vue()

// 引入element-ui
import './plugins/element-ui.js'
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
