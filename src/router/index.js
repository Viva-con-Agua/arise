import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import 'es6-promise/auto'
import SuiVue from 'semantic-ui-vue'
//import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/de'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

//import styles from './src/index.css'
//import '@/element-ui/lib/theme-chalk/index.css'
import '@/router/index.css'
import DataTables from 'vue-data-table'
import focus from 'vue-focus'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'


//import { ClientTable, Event} from 'vue-tables-2'
//import VueGoodTable from 'vue-good-table'
import SignIn from '../views/SignIn'
// import HelloWorld from '/components/HelloWorld'
import SignUp from '../views/SignUp'
import Crews from '../views/Crews'

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
        }

    ]
});

Vue.use(Vuex),
Vue.use(SuiVue),
Vue.use(VueAxios, axios),
Vue.use(Vuetify),
Vue.use(Element, { locale }),
Vue.use(VueI18n),

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.use(DataTables),
Vue.use(require('vue-shortkey')),
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyDnoNOeMPDa7WkC8NVxO6IZV3K6MRNLA0M',
  version: '',
});

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

const messages = {
    en: {
        hello: 'hello',
        enLocale // Or use `Object.assign({ message: 'hello' }, enLocale)`
    },
    de: {
        hello: 'hallo',
        deLocale
    },
    zh: {
        hello: '你好',
        zhLocale // Or use `Object.assign({ message: '你好' }, zhLocale)`
    }
};
// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'de', // set locale
    messages,// set locale messages
});

new Vue({ i18n }).$mount('#app');