// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Arise from './Arise';
import router from './router';
import VueI18n from 'vue-i18n';
const $t = Vue.t;


Vue.use(VueI18n);

Vue.config.productionTip = false;

const locale =  navigator.language;

const i18n = new VueI18n({
    locale: locale,
    messages: {
        'en-US': require('@/lang/en_US'),
        'de-DE': require('@/lang/de_VCA'),
        'ja-JA': require('../node_modules/element-ui/lib/locale/lang/ja')
    }
});


/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  i18n,
  show: true,
  components: { Arise },
  template: '<App/>',
  render: h => h(Arise)
}).$mount('#arise');

