<template>
    <div class="weekend_timer_container">

        <div class="weekend_timer_container_header">
        </div>

        <div class="weekend_timer_box">
          {{ timerFormat }}
        </div>
    </div>
</template>

<script>
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
      const now = new Date();
      // 한국은 월요일이 첫 요일이다.
      const nextWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (7 - (now.getDay()-1))%7
      );
      const remainTime = nextWeek.getTime() - now.getTime();
      return parseInt(remainTime / 1000);
    }
  },
}
</script>
