<template>
    <router-view></router-view>
</template>

<script>
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import Commands from './components/Commands.vue';
import Radios from './components/Radios.vue';
import Ranking from './components/Ranking.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Login },
        { path: '/dashboard', component: Dashboard },
        { path: '/commands', component: Commands },
        { path: '/radios', component: Radios },
        { path: '/ranking/:id', component: Ranking }
    ]
});

export default {
    router,
    components: {
        Login, Dashboard
    }
}
</script>

<style lang="scss">
@-webkit-keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}

@keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}

.appear {
    animation: fadeIn .3s both;
    -webkit-animation: fadeIn .3s both;
}

html, body {
    height: 100%;
    margin: 0;
}

body {
    background: #23272a;
    color: white;
    overflow-y: scroll;
    font-family: 'Roboto Condensed', sans-serif;
}

.btn {
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 8px 24px;
    box-shadow: 3px 3px 21px -4px rgba(0, 0, 0, 0.75);
    transition: 300ms;

    &:hover {
        box-shadow: 3px 6px 21px 2px rgba(0, 0, 0, 0.75);
    }
}

.btn span {
    font-size: 100%;
    color: white;
    font-weight: 500;
    font-family: 'Roboto Condensed', sans-serif;
}
</style>
