import Vue from 'vue'
import Router from 'vue-router'
import 'es6-promise/auto'
import '@/assets/css/better_index.css'
import locale from 'element-ui/lib/locale/lang/de'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/quill.vca.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserLock, faLockOpen, faCheckCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//Font Awesome iCon Library
library.add(faUserLock, faLockOpen, faCheckCircle, faSignInAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Router);
Vue.use(locale);
Vue.use(locale);



function loadView(view) {
  return () => import(/* webpackChunkName: '[request]' */ `@/views/${view}.vue`)
}
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: loadView('index'),
            meta: {
              requiresAuth: true
            }
        },
        {
          path: '*',
          name: '404',
          component: loadView('404')
        },
        {
            path: '/crews',
            name: 'Crews',
            component: loadView('Crews')
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: loadView('SignUp')
        },
        {
          path: '/finishsignup',
          name: 'finishSignup',
          component: loadView('finishSignup')
        },
        {
          path: '/signin',
          name: 'SignInDefault',
          redirect: '/signin/L2FyaXNlLyMvcHJvZmlsZQ=='
        },
        {
          path: "/signin/:redirectUrl",
            name: 'SignIn',
            component: loadView('SignIn')
        },
        {
            path: "/tasks",
            name: 'Tasks',
            component: loadView('Tasks')
        },
        {
            path: "/oauth",
            name: 'OAuth',
            component: loadView('OAuth')
        },
        {
            path: "/startResetPassword",
            name: 'startResetPassword',
            component: loadView('startResetPassword')
        },
        {
            path: "/resetPassword/:token",
            name: 'resetPassword',
            component: loadView('resetPassword')
        },
        {
            path: "/resetPasswordDone",
            name: 'resetPasswordDone',
            component: loadView('resetPasswordDone')
        },
       /* {
            path: "/resetPasswordInstructions",
            name: 'resetPasswordInstructions',
            component: loadView('resetPasswordInstructions'),
        },*/
        {
            path: "/resetPasswordInstructions/:pool",
            name: 'resetPasswordInstructions',
            component: loadView('resetPasswordInstructions')
        },
        {
          path: "/Profile",
          name: 'Profile',
          component: loadView('Profile')
        },
        {
          path: "/changePassword",
          name: 'changePassword',
          component: loadView('changePassword')
        },
        {
          path: "/changeEMail",
          name: 'changeEMail',
          component: loadView('changeEMail')
        },

    ]
});

/*var Auth = {
  loggedIn: false,
  signin: function() { this.loggedIn = true },
  signout: function() { this.loggedIn = false }
};

var Login = {
  template: '<input type="submit" value="Login" v-on:click="login">',
  methods: {
    : function() {
      Auth.login();
      router.push(this.$route.query.redirect);
    }
  }
};

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.loggedIn) {
    next({path: '/login', query: {redirect: to.fullPath}});
  }else {
    next();
  }
});*/

//Vue.use(Vuex),
//Vue.use(SuiVue),
//Vue.use(VueAxios, axios),
//Vue.use(VeeValidate),
//Vue.use(Vuetify),

//Vue.use(DataTables),
//Vue.use(VueQuillEditor)

