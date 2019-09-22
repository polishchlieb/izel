<template>
    <div>
        <div class="command-ct">
            <h1>{{ $root.$data.strings.radios }}</h1>
            <input type="text" class="search" v-model="search" placeholder="search for radios">
            <div class="container">
                <div class="radios">
                    <div class="radio" v-for="(radio, i) in filtered" :key="i">
                        <div class="radio-imgct">
                            <img :src="radio.img" class="radio-img" alt="no icon oof">
                        </div>
                        <div class="radio-name">{{ radio.title }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        radios: [],
        search: ''
    }),
    computed: {
        filtered: function() {
            return this.radios.filter(item => item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        }
    },
    mounted: function() {
        fetch('/api/radios')
            .then(res => res.json())
            .then(resp => {
                resp.forEach(radio => {
                    this.radios.push(radio);
                });
                this.radios.sort((a, b) => {
                        if(a.country < b.country) return -1;
                        if(a.country > b.country) return 1;
                        return 0;
                    })
            });
    }
}
</script>

<style lang="scss" scoped>
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

.search {
    width: 90%;
    background: none;
    border: 0;
    outline: 0;
    font: inherit;
    font-size: 2em;
    padding: 5px;
    color: #d6d4d4; // #b8b4b4;
    font-weight: 200;
    border-bottom: 1px #4f4f55 solid;
}
.search::placeholder {
    color: #b8b4b4;
    font-style: italic;
}

.radios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
}

.container, .radios {
    width: 100%;
}

.radio {
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover > .radio-imgct {
        background: #1d5cb2;
    }
}

.radio-imgct {
    width: 64px;
    height: 64px;
    background: rgb(51, 56, 59);
    border-radius: 16px;
    padding: 5px;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 200ms;
    will-change: background;
}
.radio-img {
    width: 64px;
    border-radius: 16px;
}

.radio-name {
    padding-top: 10px;
    font-size: 1.2em;
    user-select: none;
}
</style>