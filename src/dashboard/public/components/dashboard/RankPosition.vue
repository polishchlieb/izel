<template>
    <div class="member">
        <div class="member-left">
            <div class="memberPosition" :class="extra.user == member.id ? 'act' : ''">
                {{ extra.pos }}
            </div>
            <div class="memberIcon">
                <img :src="member.av">
            </div>
            <div class="memberUsername">
                {{ member.tag }}
            </div>
        </div>
        <div class="member-right">
            <div class="memberMessages">
                <div class="memberMessagesTitle">{{ $root.$data.strings.points }}</div>
                <div class="memberMessagesVal">{{ member.points }}</div>
            </div>
            <div class="memberMessages">
                <div class="memberMessagesTitle">{{ $root.$data.strings.level }}</div>
                <div class="memberMessagesVal">{{ member.level }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['member', 'extra']
}
</script>

<style lang="scss" scoped>
.member {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
}

.member-left {
    width: 100%;
}

.member-left, .member-right {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.memberPosition {
    background: #363a3d;
    //background: #1d5cb2;
    width: 35px;
    height: 35px;
    border-radius: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

.act {
    background: #1d5cb2;
}

.memberIcon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 15px;

    & img {
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}

.memberUsername {
    font-weight: 600;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 15px;
}

.memberMessages {
    display: flex;
    height: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
}

.memberMessagesTitle {
    font-size: 15px;
    line-height: 1;
    margin-bottom: 1px;
    color: #949ba3;
}

.memberMessagesVal {
    font-size: 20px;
    font-weight: bolder;
    line-height: 1;
    margin-top: 5px;
}


</style>