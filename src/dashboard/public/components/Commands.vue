<template>
    <div>
        <v-app dark v-if="!$props.dashboard">
            <v-layout>
                <!-- xs12 sm4 text-xs-center -->
                <v-flex xs12 sm10 offset-sm1 column>
                    <v-card>
                        <v-toolbar flat class="primary">
                            <v-toolbar-title>Commands</v-toolbar-title>
                        </v-toolbar>

                        <v-list>
                            <div v-for="(command, i) in commands" :key="i" class="flex-list">
                                <div class="usage">{{ command.usage }}</div>
                                <div class="description">{{ command.description }}</div>
                            </div>
                        </v-list>
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
    props: ['dashboard'],
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
    flex-grow: 1;
    flex-basis: 50%;
    padding: 15px;
}

.flex-list {
    display: flex;
}

.flex-list:nth-child(even) {
    background: #383838;
}
</style>