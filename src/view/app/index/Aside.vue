<template>
    <div class="aside-wrap">
        <div class="user-wrap">
            <a-avatar
                :size="75"
                class="avatar"
                :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                :src="accountStore.avatar ? accountStore.avatar : defaultImg()"
            />
            <span class="font-18 user-name">{{ accountStore.nickname }}</span>
            <span class="font-14 org-name" v-if="accountStore.orgFullName">{{ accountStore.orgFullName }}</span>
            <span class="font-14 code" v-if="accountStore.code">{{ accountStore.code }}</span>
        </div>
        <div class="time-wrap">
            <!-- <img :src="require('../assets/img/clock.png')" /> -->
            <echart :chartData="clockChart" style="width: 150px; height: 150px;"></echart>
            <div>
                <div class="hour" v-text="hour"></div>
                <span class="font-14" v-text="date"></span>
            </div>
        </div>
        <div class="day-wrap">
            <span class="month">{{ daysInMonth }} {{ dayEngelish }}</span>
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
import echart from '@/component/echarts/ClockChart.vue';
export default {
    name: 'app-aside',
    components: { echart },
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
            dayEngelish: '',
            interval: null,
            clockChart: {
                chartId: 'clockChart',
            },
        };
    },
    watch: {
        currentTime: {
            handler(val) {
                this.hour = val.format('LT');
                this.date = val.format('l');
                this.day = val.format('dddd');
                this.daysInMonth = val.daysInMonth();
                this.dayEngelish = val._d.toDateString().split(' ')[1];
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

    methods: {
        defaultImg() {
            return require(`../assets/img/moren.png`);
        },
    },
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
    overflow: hidden;
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
    padding-top: 20px;
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
.org-name + .code {
    margin-left: 25px;
}
</style>
