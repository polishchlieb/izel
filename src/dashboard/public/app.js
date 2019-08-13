import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

const strings = require('./strings/en');

Vue.use(VueRouter);

new Vue({
    el: '#app',
    data: {
        locale: "undefined",
        strings
    },
    render: h => h(App)
});