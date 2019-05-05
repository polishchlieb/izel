<template>
    <div>
        <v-app dark>
            <v-layout align-center justify-center>
                <v-flex xs12 sm4 text-xs-center column>
                    <div v-for="(command, i) in commands" :key="i">
                        {{ command.names[Math.floor(Math.random() * command.names.length)] }}
                    </div>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            commands: []
        }
    },
    mounted: function() {
        fetch('/api/commands')
            .then(res => res.json())
            .then(resp => {
                this.commands = resp;
            });
    }
}
</script>