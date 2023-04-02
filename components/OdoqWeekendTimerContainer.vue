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
        const hour = parseInt(this.secondRemain / 3600);
        const min = parseInt((this.secondRemain % 3600) / 60);
        const sec = parseInt(this.secondRemain % 60);

        return `${this.timerFormatter(hour)}:${this.timerFormatter(min)}:${this.timerFormatter(sec)}`;
      }
      return this.secondRemain
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
    timerFormatter(num) {
      return num < 10 ? `0${num}` : num
    },
    timerStarter() {
      this.intervalId = setInterval(() => {
        this.secondRemain --;
      }, 1000);
    },
    calcRemainTime() {
      // 한국은 월요일(1)이 첫 요일이다.
      // 주말은 6, 0이다.
      const now = moment();
      console.log('## OdoqWeekendTimerContainer\'s calcRemainTime > now is ', now);
      const nextWeek = moment().add(7 - (now.day() + 6)%7, 'days').hour(0).minute(0).second(0);
      console.log('## OdoqWeekendTimerContainer\'s calcRemainTime > nextWeek is ', nextWeek);
      const remainTime = nextWeek.diff(now);
      return parseInt(remainTime / 1000);
    }
  },
}
</script>
