<template>
    <div class="aside-wrap">
        <div class="user-wrap">
            <a-avatar
                :size="75"
                class="avatar"
                :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                :src="accountStore.avatar ? accountStore.avatar : undefined"
            />
            <span class="font-18 user-name">{{ accountStore.nickname }}</span>
            <span class="font-14" style="margin-right:25px;">学院名称XXXX</span>
            <span class="font-14">学号XXXX</span>
        </div>
        <div class="time-wrap">
            <img :src="require('../assets/img/clock.png')" />
            <div>
                <div class="hour" v-text="hour"></div>
                <span class="font-14" v-text="date"></span>
            </div>
        </div>
        <div class="day-wrap">
            <span class="month">{{ daysInMonth }} April</span>
            <span class="font-12 day" v-text="day">tuesday </span>
        </div>
        <div class="calendar-wrap">
            <a-calendar :fullscreen="false">
                <template slot="headerRender">
                    <div></div>
                </template>
            </a-calendar>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { accountStore } from '@/store/Store';
export default {
    name: 'app-aside',
    components: {},
    props: {},
    data() {
        return {
            accountStore,
            loading: true,
            currentTime: moment(),
            hour: '',
            date: '',
            day: '',
            daysInMonth: '',
            interval: null,
        };
    },
    watch: {
        currentTime: {
            handler(val) {
                this.hour = val.format('LT');
                this.date = val.format('l');
                this.day = val.format('dddd');
                this.daysInMonth = val.daysInMonth();
            },
            immediate: true,
        },
    },
    mounted() {
        //显示时间
        this.interval = setInterval(() => {
            this.currentTime = moment();
        }, 1000);
    },

    methods: {},
    beforeDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },
};
</script>

<style scoped lang="less">
.aside-wrap {
    flex: 0 0 300px;
    border-radius: 10px;
}
.user-wrap {
    height: 240px;
    text-align: center;
    color: #fff;
    background: url(../assets/img/userbg.png) no-repeat;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.avatar {
    margin-top: 40px;
    border: 2px solid #b5cbee;
    border-radius: 50%;
}
.user-name {
    display: block;
    margin-top: 15px;
    margin-bottom: 20px;
}
.time-wrap {
    height: 178px;
    background-color: #597ede;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.hour {
    font-size: 40px;
}
.day-wrap {
    background-color: #597ede;
    color: #fff;
    height: 100px;
}
.month {
    display: block;
    font-size: 40px;
    margin-left: 24px;
}
.day {
    float: right;
    margin-right: 10px;
    width: 76px;
    height: 20px;
    background: #f77867;
    border-radius: 8px;
    text-align: center;
}
.calendar-wrap {
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 8px 10px 0px #a3bce2;
}
</style>
