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

            <v-card v-if="admin">
                <v-toolbar flat class="primary">
                    <v-toolbar-title>Administrator</v-toolbar-title>
                </v-toolbar>

                <v-container>
                    Prefix: <input type="text" v-model="a_prefix"><br>
                    Language:
                    <select v-model="a_language">
                        <option :v-for="language in languages" :value="language">{{ language }}</option>
                    </select><br>
                    <button @click="save">Save</button><br>

                    <div class="update">{{ update }}</div>
                </v-container>
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
            admin: null,
            update: '',

            a_prefix: '',
            languages: ['polski', 'English'],
            a_language: null
        };
    },
    methods: {
        save() {
            fetch(`/api/admin?guild=${this.$props.guild.id}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prefix: this.a_prefix,
                        language: this.a_language
                    })
                }
            );

            this.update = 'updated (chyba)';
            setTimeout(() => this.update = '', 2000);
        }
    },
    mounted: function() {
        this.guildname = this.$props.guild.guildName;
        this.top = this.$props.guild.top;
        this.admin = this.$props.guild.admin;
        this.a_prefix = this.$props.guild.prefix;
        this.a_language = this.$props.guild.language;
    }
}
</script>

<style scoped>
.tile {
    display: flex;
    align-items: center;
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
.update {
    color: #26d326;
}
</style>
