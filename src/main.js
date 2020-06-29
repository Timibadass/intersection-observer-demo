import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
var dayjs = require('dayjs')

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')