import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/de'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/better_index.css'
//import '@/router/index.css'
import DataTables from 'vue-data-table'
import SignIn from '../views/SignIn'
// import HelloWorld from '/components/HelloWorld'
import SignUp from '../views/SignUp'
import Crews from '../views/Crews'
import Tasks from '../views/Tasks'
import OAuth from '../views/OAuth'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/css/quill.vca.css'

Vue.use(Router)

export default new Router({
    routes: [
/*        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },*/

        {
            path: '/crews',
            name: 'Crews',
            component: Crews
        },

        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },

        {
            path: "/signin",
            name: 'SignIn',
            component: SignIn
        },

        {
            path: "/tasks",
            name: 'Tasks',
            component: Tasks
        },

        {
            path: "/oauth",
            name: 'OAuth',
            component: OAuth
        }

    ]
});

Vue.use(Vuex),
//Vue.use(SuiVue),
Vue.use(VueAxios, axios),
Vue.use(Vuetify),
Vue.use(Element, { locale }),
Vue.use(VueI18n),
Vue.use(DataTables),
Vue.use(VueQuillEditor)




//Vue.use(Vuetable),
//Vue.use(VueGoodTable);
//Vue.use(ClientTable),
//Vue.use(ClientTable, [options = {preserveState : true}], [useVuex = false],  [template = 'default']);


// VeeValidate.Validator.extend('verify_password', {
//   getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
//   validate: value => {
//   var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//   return strongRegex.test(value);
// }
// });
//
// VeeValidate.Validator.extend('verify_mobile', {
//   getMessage: field => `The mobile number must contain at least: the country code & a prefix of 4 Numbers. e.g. +49-1523-456789`,
//   validate: value => {
//   var mobileRegex = new RegExp("^(?=.*[0\+])(?=.*[0-9]{4})(?=.*[-/\\s])(?=.*([0-9]{4,}))(?=.*[-/\\s])(?=.*[0-9]{4,})");
//   return mobileRegex.test(value);
// }
//});

/*const locales = {
    en: {
        hello: "Hello World!",
    },
    de: {
        hello: "Hallo Welt!",
    }
};

i18next.init ({
    lng: 'de',
    resources: {
        en: { translation: locales.en },
        de: { translation: locales.de },
    }
});

const i18n = new VueI18Next(i18next);


new Vue({
    i18n: i18n,
});*/




/*const dictionary = {
  en: {
    messages:{
      hello: 'Hello world.'

    }
  },
  de: {
    messages:{
      hello: 'Hallo Welt.'
    }
  },
};

const i18n = new Vuei18n({
    locale: 'de',
    dictionary
});
*/


// Validator.localize(dictionary);
//
// const validator = new Validator({ email: 'email' });

