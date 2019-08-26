<template>
    <div class="container">
        <!--<div class="header">
            <img class="icon appear" :src="`${guild.icon}?size=512`">
            <div class="title">
                {{ guild.guildName }}
            </div>
        </div>-->
        <div class="view appear">
            <div class="menu">
                <div class="menuoption" :class="view == 0 ? 'selected' : ''" @click="view = 0">
                    <i class="material-icons">bar_chart</i>
                    <div class="menulabel">Ranking</div>
                </div>
                <div class="menuoption" :class="view == 1 ? 'selected' : ''" @click="view = 1">
                    <i class="material-icons">add_box</i>
                    <div class="menulabel">{{ $root.$data.strings.roles }}</div>
                </div>
                <div class="menuoption" :class="view == 2 ? 'selected' : ''" @click="view = 2" v-if="guild.admin">
                    <i class="material-icons">settings</i>
                    <div class="menulabel">{{ $root.$data.strings.settings }}</div>
                </div>
            </div>
            <div style="flex-grow: 2;" v-if="view == 0">
                <div class="viewcard blu">
                    <div class="viewcardTitle">{{ $root.$data.strings.newPointsTitle }}</div>
                    <div class="viewcardDesc">{{ $root.$data.strings.newPointsDesc }}</div>
                </div>
                <div class="tab" v-if="view == 0">
                    <div class="tab-title">Top</div>
                       <div class="tab-content">
                          <RankPosition v-for="(member, i) in guild.top" :key="i" :member="member" :extra="{ pos: i+1, user: guild.userID }"></RankPosition>
                    </div>
                </div>
            </div>
            <Roles style="flex-grow: 2;" v-else-if="view == 1" :guild="{ id: guild.id, user: guild.userID }"></Roles>
            <Settings ref="settings" style="flex-grow: 2;" v-else-if="view == 2" :guild="{ id: guild.id, user: guild.userID }"></Settings>
        </div>
        <transition name="anotify">
            <div class="notify" v-if="notify">
                <div class="notifyBar" style="background: #d32a27;" v-if="notifyType == 0"></div>
                <div class="notifyBar" style="background: #1d5cb2;" v-if="notifyType == 1"></div>
                <div class="notifyMessage">{{ notify }}</div>
            </div>
        </transition>
        <div class="popup-back" v-if="popupShow">
        </div>
        <transition name="apopup">
            <div class="popup-ct" v-if="popupShow">
                <div class="popup">
                    <div class="popupHeader">
                        <div class="popupTitle">{{ popupTitle }}</div>
                    </div>
                    <div class="popupContent" v-if="popupType == 0 /* role */">
                        <div class="list">
                            <div class="listPos" v-for="(role, i) in popupData" :key="i" :style="{color: role.color}"
                            @click="popupclose(); $refs.settings.popupReturn(0, role)"
                            >{{ role.name }}</div>
                            <div class="norole">{{ $root.$data.strings.norole }}</div>
                        </div>
                        <div class="popupButton red" @click="popupclose()">{{ $root.$data.strings.cancel }}</div>
                    </div>
                    <div class="popupContent" v-if="popupType == 1 /* kanały */ ">
                        <div class="list">
                            <div class="listPos" v-for="(role, i) in popupData" :key="i" :style="{color: role.color}"
                            @click="popupclose(); $refs.settings.popupReturn(0, role)"
                            >{{ role.name }}</div>
                            <div class="norole">{{ $root.$data.strings.norole }}</div>
                        </div>
                        <div class="popupButton red" @click="popupclose()">{{ $root.$data.strings.cancel }}</div>
                    </div>
                    <div class="popupContent" v-if="popupType == 2 /* selfrole */">
                        <div class="list">
                            <div class="listPos" v-for="(role, i) in popupData.roles" :key="i" :style="{color: role.color}"
                            @click="popupclose(); $refs.settings.popupReturn(2, {role: role, cat: popupData.cat})"
                            >{{ role.name }}</div>
                            <div class="norole">{{ $root.$data.strings.norole }}</div>
                        </div>
                        <div class="popupButton red" @click="popupclose()">{{ $root.$data.strings.cancel }}</div>
                    </div>
                    <div class="popupContent" v-if="popupType == 3 /* 2 - dodawanie roli, 3 - dodawanie kategorii*/">
                        <input class="popupInput" placeholder="type" v-model="popupData">
                        <div class="popupButtons">
                            <div class="popupButton dblu" @click="popupclose(); $refs.settings.popupReturn(3, popupData)">{{ $root.$data.strings.confirm }}</div>
                            <div class="popupButton red" @click="popupclose()">{{ $root.$data.strings.cancel }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import RankPosition from "./RankPosition.vue";
import Roles from "./Roles.vue";
import Settings from "./Settings.vue";
import { setTimeout } from 'timers';

export default {
    props: ['guild'],
    components: { RankPosition, Roles, Settings },
    mounted: function() {
        // TODO: Create progress bars based on user's points by user's level or something like that 
        this.guild.top.forEach(score => {
            if(score.points > this.topScore) this.topScore = score.points;
        });
    },
    data: function() {
        return {
            view: 0,
            notify: "",
            notifyType: 2,
            topScore: 0,
            // popup
            popupShow: false,
            popupType: 420,
            popupTitle: "",
            popupData: {}
        };
    },
    methods: {
        notifytoggle: function(msg, type) {
            this.notifyType = type;
            this.notify = msg;
            setTimeout(() => {
                this.notify = ""
            }, 2000)
        },
        popuptoggle: function(title, type, data) {
            this.popupShow = true;
            this.popupType = type;
            this.popupTitle = title;
            this.popupData = data;
        },
        popupclose: function() {
            this.popupShow = false;
        }
    }
}
</script>

<style lang="scss">
.blu {
    background: linear-gradient(90deg, #0d8ac2 0%, #189fad 100%);
    transition: 100ms;
}

.dblu {
    background: #0a62c5;
}

.red {
    background: linear-gradient(90deg, rgba(213,51,61,1) 0%, rgb(248, 64, 64) 100%);
}

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

.menuoption {
    & i {
        padding: 5px;
    }
    background: #2b2f33;
    width: 100px;
    cursor: pointer;
    display: flex;
    padding: 10px 40px 10px 10px;
    align-items: center;
    transition: 100ms;

    &:not(.selected):hover {
        background: #282b2e;
    }
}

.selected {
    background: #1d5cb2;

    &:hover {
        background: #154992;
    }
}

.tab {
    background: #2b2f33;
    border-radius: 3px;
    flex-grow: 2;
}

.view {
    margin: 20px;
    width: 70%;
    display: flex;
    align-items: flex-start;
}

.tab-title {
    padding: 15px;
    //background: #1d6d9e;
    font-weight: bolder;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.tab-content {
    //box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 5px 15px;
}

.viewcard {
    border-radius: 3px;
    flex-grow: 2;
    padding: 15px;
}

.viewcardTitle {
    font-weight: bolder;
    font-size: 1.3rem;
}

@media screen and (max-width: 1024px) {
    .view {
        flex-direction: column;
        margin: 0;
        width: 100%;
        align-items: center;
    }

    .popup {
        width: 100%;
    }

    .menu {
        display: flex;
        width: 100%;
        margin-top: 10px;
    }

    .menuoption {
        flex-grow: 1;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
}

@media screen and (min-width: 1024px) {
    .popup {
        width: 25%;
    }

    .menu {
        margin-right: 20px;
    }

    .menuoption {
        &:first-child {
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }

        &:last-child {
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
        }
    }
}


.notify {
    display: inline-flex;
    background: #262a2c;
    margin: 15px;
    width: 300px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    right: 0;
}

.notifyBar {
    border-radius: 5px;
    width: 4px;
}
.notifyMessage {
    padding: 15px;
    font-size: .9em;
    font-weight: 600;
}

.popup-back {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(0, 0, 0);
    opacity: 0.5;
}

.popup-ct {
    z-index: 3;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup {
    background: #202225;
    border-radius: 3px;
}
.popupHeader {
    background: #1d5cb2;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    vertical-align: middle;
    font-weight: 600;
}
.popupClose {
    padding: 3px;
    transition: 100ms;
    cursor: pointer;
    
    &:hover {
        color: #222;
    }
}

.popupInput {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 15px;
    background: #202225;
    border: none;
    outline: none;
    color: white;
    font: inherit;
}
.popupButton {
    padding: 10px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    transition: 150ms;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        transform: scale(0.9);
    }
}
.popupButtons {
    display: flex;
    
    & .popupButton {
        flex-grow: 1;
    }
}

.list {
    overflow-y: scroll;
    height: 60vh;
    position: relative;
}
.norole {
    padding: 15px;
    transition: 100ms;
    user-select: none;
    font-style: italic;
    background: #2e3135;
}

.listPos {
    cursor: pointer;
    padding: 15px;
    font-weight: 600;
    border-bottom: 1px solid #2b2f33;
    transition: 100ms;

    &:hover {
        background: #2d2f33;
    }

    &:active {
        transform: scale(0.9)
    }
}

div.mdl-layout__drawer > nav.mdl-navigation > a.mdl-navigation__link {
    display: inline-flex;
    vertical-align: middle;
}

.anotify-enter-active, .anotify-leave-active {
    transition: opacity .3s;
}

.anotify-enter, .anotify-leave-to {
    opacity: 0;
}

.apopup-enter-active {
    transition: transform .3s;
}
.apopup-enter, .apopup-leave-to {
    transform: scale(0.7);
}

</style>