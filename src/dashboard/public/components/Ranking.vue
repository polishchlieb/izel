<template>
    <div>
        <div class="top">
            <span class="top-title">izel</span>
            <span style="flex: 1 1;"></span>
            <div class="top-btn selected">Guild</div>
            <div class="top-btn" @click="$router.push('/radios')">Radios</div>
            <div class="top-btn" @click="$router.push('/commands')">Commands</div>
            <div class="top-btn" @click="$router.push('/')" style="background: #1d6d9e">Login</div>
        </div>
        <div class="heade">
        <img class="icon appear" :src="`${icon}?size=512`">
        <div class="title">
            {{ name }}
        </div>
        <div class="viewport">
            <div class="tab">
                <div class="tab-title">Top</div>
                <div class="tab-content">
                    <RankPosition v-for="(member, i) in ranking" :key="i" :member="member" :extra="{ pos: i+1, user: 1 }"></RankPosition>
                </div>
            </div>
        </div>
        </div>
    </div>
    
</template>

<script>
import RankPosition from './dashboard/RankPosition.vue';

export default {
    components: { RankPosition },
    data: function() {
        return {
            icon: "",
            name: "",
            ranking: []
        }
    },
    beforeMount: function() {
        fetch('/api/ranking/'+this.$route.params.id)
        .then(resp => {
            if(resp.ok) {
                resp.json()
                .then(data => {
                    this.name = data.guildName;
                    this.icon = data.icon;
                    this.ranking = data.top;
                })
            } else {
                name = "invalid id";
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.heade {
    margin: 20px;
}

.title {
	padding: 20px;
	text-align: center;
	font-size: 2rem;
    font-weight: 300;
}

.icon {
	width: 80px;
	margin: auto;
	height: 80px;
	display: block;
	border-radius: 120px;
}

@media screen and (min-width: 768px) {
    .viewport {
        width: 60%;
        margin: auto;
    }
}
</style>