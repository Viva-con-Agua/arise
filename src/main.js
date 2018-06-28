// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
const $t = Vue.t;


Vue.use(VueI18n)

Vue.config.productionTip = false;

const locale =  'de';

const i18n = new VueI18n({
    locale: locale,
    messages: {
        en: require('@/lang/lang'),
        de: require('@/lang/de_VCA'),
        ja: require('../node_modules/element-ui/lib/locale/lang/ja')
    }
});


/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app');

