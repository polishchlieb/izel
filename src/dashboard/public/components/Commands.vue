<template id="commands">
    <div>
        <div class="command-ct">
            <h1>Commands</h1>
            <div class="table">
                <div class="item-group" v-for="(cat, i) in categories" :key=i>
                    <div class="item cat-title">{{ cat.name }}</div>
                    <div class="item appear" v-for="(command, i) in cat.commands" :key=i>
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
    </div>
</template>

<script>
export default {
    data: () => ({
        categories: [
            { name: 'admin', commands: [] },
            { name: 'music', commands: [] },
            { name: 'music (DJ)', commands: [] },
            { name: 'stats', commands: [] },
            { name: 'tool', commands: [] }
        ]
    }),
    mounted: function() {
        fetch('/api/commands')
            .then(res => res.json())
            .then(resp => {
                resp.sort((a, b) => {
                    if(a.names[0] < b.names[0]) return -1;
                    if(a.names[0] > b.names[0]) return 1;
                    return 0;
                });
                resp.forEach(cmd => {
                    let bb = this.categories.find(cat => cat.name == cmd.category);
                    if(!bb || bb.name == 'developer') return;
                    else bb.commands.push(cmd);
                });
            });
    }
};
</script>

<style scoped>
@-webkit-keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}

@keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}

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
    border-bottom: 1px solid hsla(0, 0%, 100%, .04);
}

.name {
    width: 5em;
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
