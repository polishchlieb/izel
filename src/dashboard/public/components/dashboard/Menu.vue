<template>
    <div class="container">
        <div class="main left">
            <h1>{{ $root.$data.strings.welcome }}</h1>
            <img class="av appear" :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`">
            <div class="username appear">{{ user.username }}#{{ user.discriminator }}</div>
        </div>
        <div class="main">
            <h4>{{ $root.$data.strings.guilds }}</h4>
            <div class="guilds">
                <div class="guild appear" @click="$parent.select(guild.id)" v-for="(guild, i) in guilds" :key="i">
                <div class="guildbar">
                    <div class="icon-ct">
                        <div class="leftbar" v-if="(guild.permissions & 8) == 8">Admin</div>
                        <img class="icon appear" v-if="guild.icon" :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`">
                        <img class="icon appear" v-else src="http://www.deusens.com/wp-content/uploads/2017/04/Hiperdino-Portfolio.png">
                    </div>       
                    <span class="name">
                        {{ guild.name }}
                    </span>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'guilds'],
    data: () => ({
    })
};
</script>

<style lang="scss" scoped>
.container {
    margin: auto;
    align-items: flex-start;
    justify-content: center;
}

.main {
    flex: 1;
    justify-content: center;
    align-items: center;
}

h1 {
    font-weight: 300;
    font-size: 2rem;
    margin: 30px;
}

.av {
	width: 120px;
	margin: auto;
	height: 120px;
	display: block;
	border-radius: 120px;
}

.username {
	text-align: center;
	width: auto;
	display: block;
	margin: 10px;
	font-size: 1.5em;
}

@media screen and (min-width: 768px) {
    .container {
        display: flex;
        flex-direction: row;
        width: 70%;
    }
}

.left {
    display: flex;
    flex-direction: column;
}

.guild {
    display: flex;

    margin: 10px;
    border-radius: 5px;
    background: #2b2f33;

    transition: 200ms;
    will-change: background-color;
    cursor: pointer;

    animation: fadeIn .3s both;
	-webkit-animation: fadeIn .3s both;

    &:hover {
        background: #1d5cb2;
    }
}
.leftbar {
    width: 100%;
    padding: 3px;
    background: #d33131;
    border-radius: 15px;
    text-align: center;
    margin: 5px;
    font-weight: 600;
    font-size: .8em;
}

.guildbar {
    display: flex;
    //flex-direction: column;
    padding: 10px;
    width: 100%;
    justify-items: center;
    align-items: center;
}

.icon-ct {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
}

.icon {
    width: 60px;
	margin: auto;
	height: 60px;
	display: block;
    padding: 5px 5px 5px 5px;
	border-radius: 120px;
}

.name {
    text-align: center;
    padding: 5px;
    font-weight: bolder;
}

a {
    color: gold;
    text-decoration: none;
}

</style>
