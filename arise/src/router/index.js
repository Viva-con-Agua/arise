import Vue from 'vue'
import Router from 'vue-router'
import SuiVue from 'semantic-ui-vue'
import VeeValidate from 'vee-validate'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(Router),
Vue.use(SuiVue),
Vue.use(VeeValidate),
Vue.use(Vuelidate),
Vue.use(VueAxios, axios);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }

  ]
});
