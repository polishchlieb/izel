<template>
    <div style="width: 100%;">
        <div class="tab">
            <div class="tab-title">Autorole</div>
            <div class="tab-content">
                <div class="row">
                    <div class="roleCt" :style="{ borderColor: settings.autorole.color }">
                        <div class="autoroleColor" v-if="settings.autorole.color.length > 0" :style="{background: settings.autorole.color}"></div>
                        <div class="autoroleColor" v-else style="background: #9ea0a4;"></div>
                        <div class="autoroleName">{{ settings.autorole.name.length > 0 ? settings.autorole.name : 'brak'}} </div>
                    </div>
                    <span style="flex: 1 100%"></span>
                    <div class="button blu" @click="popup('Autorole', 0, settings.roles)">{{ $root.$data.strings.change }}</div>
                    <div class="button red" @click="removeAutorole()" style="margin-left: 10px;">{{ $root.$data.strings.remove }}</div>
                </div>
            </div>
        </div>
        <!-- TODO bo mi sie nie chcialo teraz
        <div class="tab">
            <div class="tab-title">{{ $root.$data.strings.greeting }}</div>
            <div class="tab-content"></div>
        </div>
        <div class="tab">
            <div class="tab-title">{{ $root.$data.strings.goodbye }}</div>
            <div class="tab-content"></div>
        </div>-->
        <div class="tab">
            <div class="tab-title">{{ $root.$data.strings.roles }}</div>
            <div class="tab-content">
                <div class="roleCats" v-if="settings.selfroles">
                <div class="roleCat" v-for="(cat, i) in settings.selfroles" :key="i">
                    <div class="roleCatHeader">
                        <div class="roleCatName">{{ cat.name }}</div>
                        <div class="button red" @click="removeCat(cat.name)">{{ $root.$data.strings.removeCat }}</div>
                    </div>
                    <div class="roleList">
                        <div class="roleClick" v-for="(role, i) in cat.roles" :key="i">
                            <div class="roleTop">
                                <div class="roleColor" :style="{ background: role.color }"></div>
                                <div class="roleName">{{ role.name }}</div>
                            </div>
                            <div class="button blu" @click="removeRole(role.id)">{{ $root.$data.strings.removeRole }}</div>
                            <!--{{ role.name }}
                            <div class="button" @click="removeRole(role.id)">{{ $root.$data.strings.removeRole }}</div>
                        --></div>
                    </div>
                    <div class="button blu" @click="popup($root.$data.strings.addRole, 2, {roles: settings.roles, cat: cat.name})">{{ $root.$data.strings.addRole }}</div>
                </div>
                <div class="button blu" @click="popup($root.$data.strings.addCat, 3)">{{ $root.$data.strings.addCat }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
// autorole, greeting, goodbye, selfroles
export default {
    props: ['guild'], // id, user
    data: function() {
        return {
            settings: {}
        }
    },
    beforeMount: function() {
        this.reload();
    },
    methods: {
        reload: async function() {
            let settings = await fetch(`/api/admin?guild=${this.$props.guild.id}`)
            .then(resp => resp.json())
            this.settings = settings;
        },
        popup: function(title, type, data) {
            this.$parent.popuptoggle(title, type, data);
        },
        popupReturn: function(type, data) {
            if(type == 0) { // autorole 
                fetch('/api/admin', {
                    method: "POST",
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({guild: this.$props.guild.id, action: {id: "autorole", name: "set"}, value: data.id})
                })
                .then(resp => {
                    if(resp.ok) {
                        this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                        this.settings.autorole.id = data.id;
                        this.settings.autorole.name = data.name;
                        this.settings.autorole.color = data.color;
                    } else {
                        this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                    }
                })
            } else if (type == 2) { // dodawanie roli (rola)
                fetch('/api/admin', {
                    method: "POST",
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({guild: this.$props.guild.id, action: {id: "selfrole", name: "addRole"}, value: {role: data.role, category: data.cat}})
                })
                .then(resp => {
                    if(resp.ok) {
                        this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                        this.reload();
                    } else {
                        this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                    }
                })
            } else if (type == 3) { // dodawanie kategorii (tekst)
                 fetch('/api/admin', {
                    method: "POST",
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify({guild: this.$props.guild.id, action: {id: "selfrole", name: "addCat"}, value: data})
                })
                .then(resp => {
                    if(resp.ok) {
                        this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                        this.reload();
                    } else {
                        this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                    }
                })
            }
        },
        removeCat: function(name) {
            fetch('/api/admin', {
                method: "POST",
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({guild: this.$props.guild.id, action: {id: "selfrole", name: "removeCat"}, value: name})
            })
            .then(resp => {
                if(resp.ok) {
                    this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                    this.reload();
                } else {
                    this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                }
            })
        },
        removeRole: function(id) {
            fetch('/api/admin', {
                method: "POST",
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({guild: this.$props.guild.id, action: {id: "selfrole", name: "removeRole"}, value: id})
            })
            .then(resp => {
                if(resp.ok) {
                    this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                    this.reload();
                } else {
                    this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                }
            })
        },
        removeAutorole: function() {
            fetch('/api/admin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({guild: this.$props.guild.id, action: {id: "autorole", name: "remove"}, value: 'ss'})
            })
            .then(resp => {
                if(resp.ok) {
                    this.$parent.notifytoggle(this.$root.$data.strings.success, 1);
                    this.reload();
                } else {
                    console.dir(resp);
                    this.$parent.notifytoggle(this.$root.$data.strings.error, 0);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.roleCt {
    border-radius: 20px;
    border: 1px solid rgb(94, 94, 94);
    display: inline-flex;
    margin: auto;
    align-items: center;
    padding: 6px 15px;
}

.autoroleColor {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.autoroleName {
    margin-left: 5px;
}

.roleClick {
    background: #363a3d;
    margin: 5px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    transition: 100ms;
}

.roleCatName {
    font-size: 1.5em;
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

.tab {
    margin-bottom: 15px;
}

.row {
    padding: 15px 5px;
    display: flex;
    align-items: center;
}

.roleCat {
    margin-bottom: 15px;
}

.roleCatHeader {
    display: flex;
    justify-content: space-between;
}

.button {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 3px;
    cursor: pointer;
    transition: 100ms;    
    &:active {
        transform: scale(0.95);
    }
}

.blu {
    background: #1d5cb2;

    &:hover {
        background: #194a8f;
    }

}
.red {
    background: #ce3d40;

    &:hover {
        background: #a73032;
    }
}

</style>