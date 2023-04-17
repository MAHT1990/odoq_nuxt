<template>
    <div class="weekend_timer_container">
        <div class="weekend_timer_container_header"></div>
        <div class="weekend_timer_box">
          {{ timerFormat }}
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      secondRemain: 0,
      intervalId: null,
    }
  },
  computed: {
    timerFormat() {
      if (typeof this.secondRemain === 'number'){
        const formatter = (num) => {
          return num < 10 ? `0${num}` : num
        }
        const hour = formatter(parseInt(this.secondRemain / 3600));
        const min = formatter(parseInt((this.secondRemain % 3600) / 60));
        const sec = formatter(parseInt(this.secondRemain % 60));

        return `${hour}:${min}:${sec}`;
      }
      return 'COMING SOON'
    }
  },
  watch: {
    secondRemain(timeRemain) {
      if (timeRemain <= 0) {
        clearInterval(this.intervalId)
        this.$emit('nextQuestionLoadEvent')
      }
    }
  },
  created() {
    this.secondRemain = this.calcRemainTime();
    this.timerStarter();
  },
  methods: {
    timerStarter() {
      this.intervalId = setInterval(() => {
        this.secondRemain --;
      }, 1000);
    },
    calcRemainTime() {
      // 한국은 월요일(1)이 첫 요일이다.
      // 주말은 6, 0이다.
      const now = moment();
      // console.log('## OdoqWeekendTimerContainer\'s calcRemainTime > now is ', now);
      const trgtDay = this.$store.getters['common/availableDays'][0];
      const nextFirst = moment()
        .add((7 + (trgtDay - now.day()))%7, 'days')
        .hour(0).minute(0).second(0);
      // console.log('## OdoqWeekendTimerContainer\'s calcRemainTime > nextFirst is ', nextFirst);
      const remainTime = nextFirst.diff(now);
      return parseInt(remainTime / 1000);
    }
  },
}
</script>
