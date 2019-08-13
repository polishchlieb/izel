<template>
    <div>
        <div class="top">
            <span class="top-title">izel</span>
            <span style="flex: 1 1;"></span>
            <div class="top-btn" :class="{ selected: view <= 1 }" @click="viewSet(0)">{{ $root.$data.strings.guilds }}</div>
            <div class="top-btn" :class="{ selected: view == 3 }" @click="viewSet(3)">{{ $root.$data.strings.radios }}</div>
            <div class="top-btn" :class="{ selected: view == 2 }" @click="viewSet(2)">{{ $root.$data.strings.commands }}</div>
            <div class="top-btn logout" @click="logout()">{{ $root.$data.strings.logout }}</div>
        </div>
        <Menu :user="userData" :guilds="guilds" v-if="view == 0"></Menu>
        <Guild v-if="view == 1" :guild="selected"></Guild>
        <Commands v-if="view == 2"></Commands>
        <Radios v-if="view == 3"></Radios>
    </div>
</template>

<script>
import Menu from './dashboard/Menu.vue';
import Guild from './dashboard/Guild.vue';

import Commands from './Commands.vue';
import Radios from './Radios.vue';

export default {
    components: { Menu, Guild, Commands, Radios },
    data: () => ({
        guilds: [],
        selected: {},
        commandsSelected: null,
        view: 0,
        userData: null, // logged user data
    }),
    created: async function() {
        // check if logged in
        const resp = await fetch('/api/check');
        if(resp.ok) {
            const data = await resp.json();
            this.userData = data.data;

            fetch('/api/guilds?id='+this.userData.id)
            .then(resp => resp.json())
            .then(data => {
                data.guilds.forEach(guild => {
                    this.guilds.push(guild);
                });
            });
        } else this.$router.push('/');

        // locale
        this.$root.$data.locale = this.userData.locale;
        if(this.userData.locale == 'pl') { // polski
            this.$root.$data.strings = require('../strings/pl');;
        } else { // english
            this.$root.$data.strings = require('../strings/en');
        }
    },
    methods: {
        select(id) {
            fetch(`/api/guild?guild=${id}`)
                .then(resp => resp.json())
                .then(data => {
                    this.selected = data;
                    this.viewSet(1);
                });
        },
        viewSet(id) {
            this.view = id;
        },
        logout() {
            window.location = '/api/logout';
        }
    }
};
</script>

<style lang="scss" scoped>
.top {
    background: #202225;
    box-shadow: 2px 3px 3px rgba(0,0,0,.24);
    display: flex;
    top: 0;

    .top-btn {
        cursor: pointer;
        padding: 20px;
        transition: 200ms;
        will-change: opacity;

        &:hover {
            opacity: 0.7;
        }
    }

    .top-title {
        font-weight: 600;
        padding: 20px;
    }

    .selected {
        background: #1d5cb2;
        will-change: background-color;

        &:hover {
            opacity: 1;
            background: #194a8f;
        }
    }

    .logout {
        background: #d32a27;
        will-change: background-color;

        &:hover {
            opacity: 1;
            background: #b41f1f;
        }
    }
}


</style>
