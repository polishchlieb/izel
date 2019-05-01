<template>
    <div>
        <v-app dark>
            <v-toolbar color="primary" app>
                <v-toolbar-side-icon @click="drawer = !drawer">
                    <v-icon v-if="drawer == true">
                        arrow_back
                    </v-icon>
                </v-toolbar-side-icon>
                <v-toolbar-title>izel</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat @click="logout()">Logout</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-navigation-drawer app v-model="drawer">                
                <v-toolbar color="primary">
                    <v-toolbar-title>Guilds</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile avatar v-for="(guild, i) in guilds" :key="i" @click="select(guild.id)">
                        <v-list-tile-avatar>
                            <v-img v-if="guild.icon" :src="'https://cdn.discordapp.com/icons/'+guild.id+'/'+guild.icon+'.png'"></v-img>
                            <v-img v-else src="https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png"></v-img>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ guild.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            
            <v-content>
                <v-container fluid>
                    <Guild v-if="selected" :guild="selected"></Guild>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
import Guild from './Guild.vue';
export default {
    data: function() {
        return {
            drawer: true,
            guilds: [],
            selected: null
        }
    },
    beforeMount: function() {
        fetch('/api/guilds')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(guild => {
                this.guilds.push(guild)
            })
        })
    },
    created: function() {
        fetch('/api/check')
        .then(resp => {
            if(!resp.ok) {
                this.$router.push('/')
            }
        })
        .catch(err => {
            this.$router.push('/')
        })
    },
    methods: {
        select(id) {
            this.selected = null;
            fetch('/api/guild?guild='+id)
            .then(resp => resp.json())
            .then(data => {
                this.selected = data;
            })
            this.drawer = false;
        },
        logout() {
            window.location = '/api/logout'
        }
    },
    components: {
        Guild
    }
}
</script>

<style>
</style>