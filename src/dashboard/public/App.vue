<template>
    <router-view></router-view>
</template>

<script>
    import VueRouter from 'vue-router';

    import Dashboard from './components/Dashboard.vue';
    import Login from './components/Login.vue';

    const router = new VueRouter({
        mode: 'history',
        routes: [
            { path: '/', component: Login },
            { path: '/dashboard', component: Dashboard }
        ]
    })
    export default {
        router,
        components: {
            Login, Dashboard
        }
    }
</script>

<style>

</style>
