import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';

import App from './App.vue';

Vue.use(Vuetify, {
    theme: {
        primary: colors.blue.darken2,
        secondary: colors.indigo.darken3,
        accent: colors.blue.darken2
    }
});

Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App)
});