<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-toolbar flat class="primary">
                    <v-toolbar-title>{{ guildname }}</v-toolbar-title>
                </v-toolbar>

                <v-list>
                    <div class="tile" v-for="(member, i) in top" :key="i">
                        <span class="rank">{{ i + 1 }}</span>
                        <v-avatar size="32px" class="av">
                            <img :src="member.av">
                        </v-avatar>
                        <div class="nick">{{ member.tag }}</div>
                        <v-progress-linear :value="(member.messages - 200 * member.level) / 2" color="#e0dbdb" class="progress"></v-progress-linear>
                        <span class="score">{{ member.messages }}</span>
                    </div>
                </v-list>
            </v-card>

            <v-card v-if="true">
                <v-toolbar flat class="primary">
                    <v-toolbar-title>Administrator</v-toolbar-title>
                </v-toolbar>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['guild'],
    data: function() {
        return {
            top: [],
            guildname: null,
            isAdmin: false
        };
    },
    mounted: function() {
        this.guildname = this.$props.guild.guildName;
        this.top = this.$props.guild.top;
    }
}
</script>

<style scoped>
    .tile {
        display: flex;
        align-items: center;
    }
    .paddin {
        background: #0173bb;
    }
    .rank, .nick, .score {
        overflow: hidden;
        overflow-wrap: anywhere;
        font-weight: 500;
    }
    .rank {
        width: 30px;
        margin: 10px;
    }
    .progress {
        border-radius: 10px;
    }
    .nick {
        display: block;
        width: 250px;
        max-width: 200px;
        text-overflow: ellipsis;
        text-align: center;
    }
    .score {
        width: 100px;
        text-align: center;
    }
</style>
