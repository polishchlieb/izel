<template>
    <div class="container">
        <div class="header">
            <img class="icon appear" :src="`${guild.icon}?size=512`">
            <div class="title">
                {{ guild.guildName }}
            </div>
        </div>
        <div class="tab">
            <div class="tab-title">Top</div>
            <div class="tab-content">
                <div class="tile" v-for="(member, i) in guild.top" :key="i">
                    <span class="rank">{{ i + 1 }}</span>
                    <img class="av" width="30px" height="30px" :src="member.av">
                    <div class="nick">{{ member.tag }}</div>
                    <div class="progress">
                        <span :style="{ width: (member.messages / topScore) * 100 + '%' }">
                        </span>
                    </div>
                    <span class="score">{{ member.messages }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['guild'],
    mounted: function() {
        // TODO: Create progress bars based on user's points by user's level or something like that 
        this.guild.top.forEach(score => {
            if(score.messages > this.topScore) this.topScore = score.messages;
        });
        // console.dir(this.guild);
    },
    data: function() {
        return {
            topScore: 0
        };
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header {
    margin: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.title {
	padding: 20px;
	text-align: center;
	font-size: 2rem;
    font-weight: 300;
}

.icon {
	width: 120px;
	margin: auto;
	height: 120px;
	display: block;
	border-radius: 120px;
}

.tab {
    background: #2b2f33;
    width: 60%;
    border-radius: 3px;
}

.tab-title {
    padding: 15px;
    background: #1d6d9e;
    font-weight: bolder;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.tab-content {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

.tile {
    display: flex;
    align-items: center;
}

.rank {
    font-size: 150%;
    color: lightblue;
    padding: 10px;
}
.av {
	min-width: 30px;
	margin: auto;
    display: block;
	height: 30px;
	border-radius: 30px;
}

.av img {
    width: 100%;
    height: 100%;
}

.score {
    flex-grow: 1;
    width: 8%;
    padding: 10px 20px;
}

.nick {
    flex-grow: 1;
    padding: 10px;
    text-align: center;
    width: 25%;

    overflow: hidden;
    overflow-wrap: anywhere;
}
.progress {
    flex-grow: 0;
    height: 10px;
    position: relative;
    background: #40444b;
    border-radius: 555px;
    width: 100%;

    span {
	    display: block;
	    height: 100%;
	    border-radius: 25px;
	    background: #1d6d9e;
	    position: relative;
	    overflow: hidden;
    }
}

@media screen and (max-width: 1024px) {
    .progress {
        display: none;
    }

    .tab {
        width: 90%;
    }
}
</style>