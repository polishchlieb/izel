<template>
    <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-toolbar flat class="primary">
                    <v-toolbar-title>{{ guildname }}</v-toolbar-title>
                </v-toolbar>

                <v-list>
                    <div class="tile paddin">
                        <span class="rank">{{ rank.i }}</span>
                        <v-avatar size="32px" class="av">
                            <img :src="rank.av">
                        </v-avatar>
                        <div class="nick">{{ rank.name }}#{{ rank.dsc }}</div>
                        <v-progress-linear color="white" :value="(rank.messages/topscore)*100" class="progress"></v-progress-linear>
                        <span class="score">{{ rank.messages }}</span>
                    </div>
                    <div class="tile" v-for="(member, i) in top" :key="i">
                        <span class="rank">{{ member.i }}</span>
                        <v-avatar size="32px" class="av">
                            <img :src="member.av">
                        </v-avatar>
                        <div class="nick">{{ member.name }}#{{ member.dsc }}</div>
                        <v-progress-linear :value="(member.messages/topscore)*100" color="#e0dbdb" class="progress"></v-progress-linear>
                        <span class="score">{{ member.messages }}</span>
                    </div>
                </v-list>
                
            </v-card>
            
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['guild'],
    data: function() {
        return {
            rank: null,
            top: [],
            topscore: 0,
            guildname: null
        }
    },
    mounted: function() {
        this.rank = this.$props.guild.rank;
        this.guildname = this.$props.guild.guildName;

        this.$props.guild.top.forEach(g => {
            if(g.messages > this.topscore) {
                this.topscore = g.messages;
            }
            this.top.push(g);
        })
        console.log(this.guildname)
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

