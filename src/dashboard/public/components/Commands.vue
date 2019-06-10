<template id="commands">
    <div>
        <v-app dark>
            <div class="command-ct">
                <h1>Commands</h1>
                <div class="table">
                    <div class="item-group" v-for="(cat, i) in categories" :key=i>
                        <div class="item cat-title">{{ cat.name }}</div>
                        <div class="item" v-for="(command, i) in cat.commands" :key=i>
                            <div class="name">
                                {{ command.names[0] }}
                            </div>
                            <div class="desc">
                                {{ command.description }}
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </v-app>
            <!--<v-layout>
                <v-flex xs12 sm10 offset-sm1 column>
                    <v-card id="commands">
                        <v-toolbar flat class="primary">
                            <v-toolbar-title>Commands</v-toolbar-title>
                        </v-toolbar>

                        <v-list>
                            <div v-for="(command, i) in commands" :key="i" class="flex-list">
                                <div class="usage">{{ command.usage }}</div>
                                <div class="description">{{ command.description }}</div>
                                {{ command.category }}
                            </div>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>-->
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            categories: [
                {
                    name: 'admin',
                    commands: []
                },
                {
                    name: 'developer',
                    commands: []
                },
                {
                    name: 'music',
                    commands: []
                },
                {
                    name: 'stats',
                    commands: []
                },
                {
                    name: 'tool',
                    commands: []
                }
            ]
        }
    },
    props: ['dashboard'],
    mounted: function() {
        fetch('/api/commands')
            .then(res => res.json())
            .then(resp => {
                resp.sort((a, b) => {
                    if(a.names[0] < b.names[0]) return -1;
                    if(a.names[0] > b.names[0]) return 1;
                    return 0;
                })
                resp.forEach(cmd => {
                    let bb = this.categories.find(cat => cat.name == cmd.category);
                    bb.commands.push(cmd);
                })

                
            });
    }
}
</script>

<style scoped>
h1 {
    font-weight: 300;
    font-size: 3rem;
    margin: 30px;
}

.command-ct {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid hsla(0,0%,100%,.04);
}

.name {
    width: 10em;
    font-weight: bolder;
    padding: 15px;
}

.desc {
    padding: 15px;
}

.cat {
    padding: 15px;
}

.cat-title {
    padding: 15px;
    background: #1d6d9e;
    font-weight: bolder;
    border-radius: 3px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

/*
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
*/
</style>
