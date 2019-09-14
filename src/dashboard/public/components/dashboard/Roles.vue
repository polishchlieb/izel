<template>
    <div style="width: 100%">
        <div v-if="roles.length">
            <div class="viewcard blu">
                <div class="viewcardTitle">{{ $root.$data.strings.roles }}</div>
                <div class="viewcardDesc">{{ $root.$data.strings.enjoyRoles }}</div>
            </div>
            <div class="rolecat tab" v-for="(cat, i) in roles" :key="i">
                <div class="tab-title">{{ cat.name }}</div>
                <div class="tab-content">
                    <div class="rolecards">
                        <div class="rolecard" v-for="(role, i) in cat.roles" :key="i">
                            <div class="roleTop">
                                <div class="roleColor" :style="{ background: role.color }"></div>
                                <div class="roleName">{{ role.name }}</div>
                            </div>
                            <div class="roleButton"
                            :class="role.user ? 'red' : 'blu'" @click="clickrole(role.id)"
                            >{{ role.user ? $root.$data.strings.roleTrue : $root.$data.strings.roleFalse }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!roles.length">
            <div class="viewcard red">
                <div class="viewcardTitle">wow, such empty</div>
                <div class="viewcardDesc">{{ $root.$data.strings.askAdmin }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['guild'], // id, user
    data: function() {
        return {
            roles: []
        }
    },
    beforeMount: async function() {
        let roles = await fetch(`/api/roles?id=${this.$props.guild.user}&guild=${this.$props.guild.id}`)
        .then(resp => resp.json())
        this.roles = roles;
    },
    methods: {
        clickrole: function(id) {
            fetch('/api/roles', {
                method: "POST",
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({guild: this.$props.guild.id, role: id})
	        }).then(resp => {
                if(resp.ok) {
                    let catr = this.roles.find(cat => cat.roles.find(role => role.id == id));
                    let roler = catr.roles.find(role => role.id == id);
                    roler.user = !roler.user;

                    resp.json().then(data => {
                        if(data.added) {
                            this.$parent.notifytoggle(this.$root.$data.strings.roleSuccess+` ${roler.name}`, 1);
                        } else {
                            this.$parent.notifytoggle(this.$root.$data.strings.roleSuccessR+` ${roler.name}`, 1);
                        }
                    })
                } else {
                    this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.rolecards {
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

.rolecard {
    background: #363a3d;
    margin: 5px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    transition: 100ms;
}

.roleTop {
    display: flex;
    align-items: center;
    padding: 15px;
}

.roleName {
    line-height: 1;
    font-size: 1.5em;
    margin-left: 10px;
}
.roleColor {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.roleButton {
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

.rolecat {
    margin-bottom: 15px;
}

.rolecatTitle {
    font-weight: bolder;
    font-size: 1.5em;
}

</style>