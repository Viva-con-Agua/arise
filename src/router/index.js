import Vue from 'vue'
import Router from 'vue-router'

import Vuex from 'vuex'
import 'es6-promise/auto'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VeeValidate from 'vee-validate'
// import Vuetify from 'vuetify'
import Element from 'element-ui'
//import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/de'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/better_index.css'
// import DataTables from 'vue-data-table'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import '@/assets/css/quill.vca.css'
import {library } from '@fortawesome/fontawesome-svg-core'
import { faUserLock, faLockOpen, faCheckCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import different Views

/*
const SignIn = () => import('../views/SignIn');
const SignUp = () => System.import('../views/SignUp');
const Crews = () => System.import('../views/Crews');
const Tasks = () => System.import('../views/Tasks');
const OAuth = () => System.import('../views/OAuth');
const finishSignup = () => System.import('../views/finishSignup');
const resetPassword = () => System.import('../views/resetPassword');
const resetPasswordDone = () => System.import('../views/resetPasswordDone');
const resetPasswordInstructions = () => System.import('../views/resetPasswordInstructions');
const resetPasswordInstructionsPool1 = () => System.import('../views/resetPasswordInstructionsPool1');
const startResetPassword = () => System.import('../views/startResetPassword');*/


Vue.component('font-awesome-icon', FontAwesomeIcon);

//Font Awesome iCon Library
library.add(faUserLock, faLockOpen, faCheckCircle, faSignInAlt);

Vue.use(Router);
Vue.use(Element, {locale});

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
    routes: [
              {
            path: '/',
            name: 'SignIn',
            component: loadView('SignIn')
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
            path: "/signin",
            name: 'SignIn',
            component: loadView('Signin')
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
            path: "/finishSignup",
            name: 'finishSignup',
            component: loadView('finishSignUp')
        },
        {
            path: "/startResetPassword",
            name: 'startResetPassword',
            component: loadView('startResetPassword')
        },
        {
            path: "/resetPassword",
            name: 'resetPassword',
            component: loadView('resetPassword')
        },
        {
            path: "/resetPasswordDone",
            name: 'resetPasswordDone',
            component: loadView('resetPasswordDone')
        },
        {
            path: "/resetPasswordInstructions",
            name: 'resetPasswordInstructions',
            component: loadView('resetPasswordInstructions')
        },
        {
            path: "/resetPasswordInstructionsPool1",
            name: 'resetPasswordInstructionsPool1',
            component: loadView('resetPasswordInstructionsPool1')
        }

    ]
});

//Vue.use(Vuex),
//Vue.use(SuiVue),
//Vue.use(VueAxios, axios),
//Vue.use(VeeValidate),
//Vue.use(Vuetify),

//Vue.use(DataTables),
//Vue.use(VueQuillEditor)

