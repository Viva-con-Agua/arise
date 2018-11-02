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
import axios from "axios/index";
import ErrorState from "@/components/ErrorState"
//Font Awesome iCon Library
library.add(faUserLock, faLockOpen, faCheckCircle, faSignInAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Router);
Vue.use(locale);



function loadView(view) {
  return () => import(/* webpackChunkName: '[request]' */ `@/views/${view}.vue`)
}
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: 'profile',
        },
        {
          path: '*',
          name: 'NotFound',
          redirect: 'error/404'
        },
        {
            path: '/crews',
            name: 'Crews',
            component: loadView('Crews'),
            meta: {
                'requiresAuth': true
            }
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
          component: loadView('defaultPage')
        },
        {
          path: "/signin/:redirectUrl",
            name: 'SignIn',
            component: loadView('SignIn')
        },
        {
            path: "/tasks",
            name: 'Tasks',
            component: loadView('Tasks'),
            meta: {
                'requiresAuth': true
            }
        },
        {
            path: "/oauth",
            name: 'OAuth',
            component: loadView('OAuth'),
            meta: {
                'requiresAuth': true
            }
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
          path: "/profile",
          name: 'Profile',
          component: loadView('Profile'),
            meta: {
                'requiresAuth': true
            }
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
        {
            path: "/users",
            name: 'Users',
            component: loadView('users'),
            meta: {
                'requiresAuth': true
            }
        },
        {
            path: "/error/:code",
            name: "ErrorState",
            component: ErrorState,
            props: true
        }

    ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      axios.get('/drops/webapp/identity')
          .then((response) => {
              if (response.status == 200) {
                  next();
              }
          })
          .catch(function (error) {
              switch (error.response.status) {
                  case 401:
                    // Not Authenticated!
                    next({path: '/signin', query: {redirect: to.fullPath}})
                    break;
                  case 403:
                    // Forbidden!
                    next({path: '/error/403'})
                    break;
                  case 404:
                    // redirect 404 error page
                    next({path: '/error/404'})
                    break;
                  case 500:
                    // redirect 500 error page
                    next({path: '/error/500'})
                    break;
              }
          })
  } else {
    next();
  }
});

export default router

