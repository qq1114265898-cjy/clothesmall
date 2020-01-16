import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//把事件总线的原型给他赋值一个vue实例，到时候调用事件总线就去vue源码里面调用相关方法
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
