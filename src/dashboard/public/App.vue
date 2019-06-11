<template>
    <router-view></router-view>
</template>

<script>
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import Commands from './components/Commands.vue';
import Radios from './components/Radios.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { path: '/dashboard', component: Dashboard },
        { path: '/commands', component: Commands },
        { path: '/radios', component: Radios }
    ]
});

export default {
    router,
    components: {
        Login, Dashboard
    }
}
</script>