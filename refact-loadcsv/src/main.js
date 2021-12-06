import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
