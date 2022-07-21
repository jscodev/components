import Vue from 'vue'
import App from './App.vue'
import components from '@/index'
import router from './router/index'

Vue.config.productionTip = false;

Vue.use(components)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

