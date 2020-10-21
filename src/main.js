import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

//引入 vant ui
import Vant from 'vant'
import 'vant/lib/index.css'

//引入fastclick (移动端300毫秒延迟处理)
import FastClick from 'fastclick'
//图片懒加载 
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast'

Vue.config.productionTip = false;

// 使用 vant
Vue.use(Vant)

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
