<template>
    <div>
        <v-app dark>
            <v-layout align-center justify-center>
                <v-flex xs12 sm4 text-xs-center column>
                    <div>
                        <v-img height="200" contain :src="image"></v-img>
                    </div>
                    <div>
                        <v-img height="100" contain :src="betterlogo"></v-img>
                    </div>
                    <div>
                        <a href="/api/login">
                            <v-btn large color="primary">Login with Discord
                                <v-icon right dark>arrow_forward</v-icon>
                            </v-btn>
                        </a>
                        <a class="a" href="/commands">
                            <div class="commands">Command list</div>
                        </a>
                    </div>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
import Image from '../assets/izel.png';
import BetterLogo from '../assets/better-logo.png';

export default {
    data: function() {
        return {
            betterlogo: BetterLogo,
            image: Image
        }
    },
    created: function() {
        fetch('/api/check')
            .then(resp => {
                if(resp.ok) this.$router.push({ path: '/dashboard' });
            });
    }
}
</script>

<style>
.a {
    text-decoration: none;
}

.commands {
    color: gray;
}
</style>