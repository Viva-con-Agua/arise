import Vue from 'vue'
import Es6Promise from 'es6-promise'
import Arise from './Arise.vue'
import router from './router'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import WidgetUserList from 'vca-widget-user'
import { WidgetTopNavigation, WidgetBottomNavigation } from 'vca-widget-navigation';
import en from '@/lang/en_US.json';
import de from '@/lang/de_VCA.json';
import enElement from 'element-ui/lib/locale/lang/en';
import deElement from 'element-ui/lib/locale/lang/de';
// const $t = Vue.t;


Es6Promise.polyfill()

Vue.use(VueI18n);

const locale =  navigator.language;
const i18n = new VueI18n({
    locale: locale,
    messages: {
        'en-US': Object.assign(en, enElement),
        'de-DE': Object.assign(de, deElement),
        'de': Object.assign(de, deElement),
        'en': Object.assign(en, enElement)
    }
});
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(WidgetUserList, { 'i18n': i18n })
Vue.use(WidgetBottomNavigation, { 'i18n': i18n })
Vue.use(WidgetTopNavigation, { 'i18n': i18n })

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    show: true,
    components: { Arise, WidgetUserList, WidgetTopNavigation, WidgetBottomNavigation },
    template: '<App/>',
    mounted() {
        /**
         * Required workaround for routing in IE
         * @type {mounted}
         */
        var app = this;

        if ("-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style) {
            window.addEventListener("hashchange",
                function () {
                    var currentPath = window.location.hash.slice(1);
                    if (app.$route.path !== currentPath) {
                        app.$router.replace(currentPath);
                    }
                },
                false);
        }
    },
    render: h => h(Arise)
}).$mount('#app')
