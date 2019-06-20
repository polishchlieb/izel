<template>
    <div class="login-ct">
        <div>
            <img height="200" contain :src="image">
        </div>
        <div>
            <img height="100" contain :src="betterlogo">
        </div>
        <div>
            <div class="btn icon-btn" @click="open('/api/login')">
                <img width="25px" src="https://discordapp.com/assets/28174a34e77bb5e5310ced9f95cb480b.png">
                <span>Login with Discord</span>
            </div>
        </div>
    </div>
</template>

<script>
import Image from '../assets/izel.png';
import BetterLogo from '../assets/better-logo.png';

export default {
    data: function() {
        return {
            betterlogo: BetterLogo,
            image: Image
        };
    },
    created: function() {
        fetch('/api/check')
            .then(resp => {
                if(resp.ok) this.$router.push({ path: '/dashboard' });
            });
    },
    methods: {
        open(url) {
            window.location = url;
        }
    }
}
</script>

<style lang="scss">
.login-ct {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}

.a {
    text-decoration: none;
}

.commands {
    color: gray;
}

.icon-btn {
    background: #7289DA;
    margin: auto;
    padding: 18px 10px !important;
    width: 250px;
    cursor: pointer;
    user-select: none;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & span {
        font-size: 1em !important;
        text-decoration: none;
    }

    & img {
        justify-content: left;
    }
}
</style>