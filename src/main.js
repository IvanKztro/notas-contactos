import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import '../public/css/style.css'
import Vuelidate from 'vuelidate'
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

// Agregamos la URL base de nuestra API
//axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.baseURL = 'https://appmevna.herokuapp.com/api';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
