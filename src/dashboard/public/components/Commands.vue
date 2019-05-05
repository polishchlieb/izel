<template>
    <div>
        <v-app dark>
            <v-layout align-center justify-center>
                <v-flex xs12 sm4 text-xs-center column>
                    <v-card>
                        <v-toolbar flat class="primary">
                            <v-toolbar-title>Commands</v-toolbar-title>
                        </v-toolbar>

                        <v-list>
                            <div v-for="(command, i) in commands" :key="i">
                                <div class="usage">{{ command.usage }}</div>
                                <div class="description">{{ command.description }}</div>
                            </div>
                        <v-list>
                    </v-card>
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

<style scoped>
.usage, .description {
    overflow: hidden;
    overflow-wrap: anywhere;
    font-weight: 500;
}
</style>