<template>
    <div>
            <div class="command-ct">
                <h1>Radios</h1>
                <h2>Use &amp;radio &lt;name&gt;, &amp; is your prefix</h2>
                <div class="table">
                    <div class="item-group" v-for="(cat, i) in categories" :key=i>
                        <div class="item cat-title">{{ cat.name }}</div>
                        <div class="item" v-for="(radio, i) in cat.radios" :key=i>
                            <div class="name">
                                {{ radio.title }}
                            </div>
                    </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            categories: []
        }
    },
    mounted: function() {
        fetch('/api/radios')
            .then(res => res.json())
            .then(resp => {
                resp.forEach(radio => {
                    let bb = this.categories.find(cat => cat.name == radio.country);
                    if(bb) bb.radios.push(radio);
                    if(!bb) {
                        this.categories.push({
                            name: radio.country,
                            radios: [ radio ]
                        })
                    }
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

h2 {
    font-weight: 500;
    font-size: 1rem;
    margin: 5px;
}

.command-ct {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.table {
    display: flex;
}



.item {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid hsla(0,0%,100%,.04);
}

.name {
    width: 15em;
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
</style>