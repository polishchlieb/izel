<template>
    <div class="container">
        <h1>{{ $root.$data.strings.welcome }}</h1>
        <img class="av appear" :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`">
        <div class="username appear">{{ user.username }}#{{ user.discriminator }}</div>
        <h4>{{ $root.$data.strings.guilds }}</h4>
        <div class="guilds">
            <div class="guild appear" @click="$parent.select(guild.id)" v-for="(guild, i) in guilds" :key="i">
                <div class="guildbar">
                    <div class="leftbar" v-if="(guild.permissions & 8) == 8">Admin</div>
                    <div class="icon-ct">
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
	font-size: 200%;
}

@media screen and (min-width: 1024px) {
    .guilds {
        grid-template-columns: repeat(3, 33%)
    }
}

.guilds {
    width: 60%;
    display: grid;
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
    flex-direction: column;
    padding: 10px;
    width: 100%;
    justify-items: center;
    align-items: center;
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

</style>
