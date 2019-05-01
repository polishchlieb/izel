<template>
    <div>
        <v-app dark>
            <v-layout align-center justify-center>
                <v-flex xs12 sm4 text-xs-center column>
                    <div>
                        <v-img height="100" contain v-bind:src="betterlogo"></v-img>
                    </div>
                    <div>
                        <a href="/api/login">
                        <v-btn large color="primary">Login with Discord
                            <v-icon right dark>arrow_forward</v-icon>
                        </v-btn>
                        </a>
                    </div>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
import BetterLogo from '../assets/better-logo.png';
export default {
    data: function() {
        return {
            betterlogo: BetterLogo
        }
    },
    created: function() {
        fetch('/api/check')
        .then(resp => {
            if(resp.ok) this.$router.push({path: '/dashboard'});
        })
    }
}
</script>

<style scoped>
</style>
