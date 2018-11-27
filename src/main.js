// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Arise from './Arise';
import router from './router';
import VueI18n from 'vue-i18n';
import WidgetUserList from 'vca-widget-user'
import { WidgetTopNavigation, WidgetBottomNavigation } from 'vca-widget-navigation';
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

Vue.use(WidgetUserList, { 'i18n': i18n })
Vue.use(WidgetBottomNavigation, { 'i18n': i18n })
Vue.use(WidgetTopNavigation, { 'i18n': i18n })

/* eslint-disable no-new */

new Vue({
  el: '#arise',
  router,
  i18n,
  show: true,
  components: { Arise, WidgetUserList, WidgetTopNavigation, WidgetBottomNavigation },
  template: '<App/>',
  render: h => h(Arise)
}).$mount('#arise');

