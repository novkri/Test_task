import Vue from 'vue'
import App from './App.vue'
import messagePlugin from '@/utils/message.plugin'
// import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false

Vue.use(messagePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
