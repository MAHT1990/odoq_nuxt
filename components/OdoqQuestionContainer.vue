<template>
  <div class="question_container">
    <div class="question_container_header">
      <p class="season_box">Season {{ questionValidated.season }} #{{ questionValidated.code }}</p>
      <p class="countdown_box">{{ timerFormat }}</p>
    </div>
    <div class="question_box">
      <img v-if="hasImg" :src="questionValidated.img_url" alt="load Error">
    </div>
  </div>
</template>

<script>

export default {
  props: {
    question: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      hasImg: true,
      secondRemain: null,
      intervalIds: [],
    }
  },
  computed: {
    questionValidated() {
      // console.log('question origin is ', this.question);
      if(Object.keys(this.question).length === 0) {
        return {
          code: '현재 문항없음',
          season: '현재 문항없음',
          img_url: '@/assets/img/testQuestion.jpg',
          answer: '현재 문항없음',
          answer_count: '현재 문항없음',
          solve_count: '현재 문항없음',
          second_remain: '현재 문항없음',
        }
      }
      return this.question;
    },
    timerFormat() {
      const formatter = (num) => {
        return num < 10 ? `0${num}` : num;
      }
      if (typeof this.secondRemain === 'number'){
        const hour = formatter(parseInt(this.secondRemain / 3600));
        const min = formatter(parseInt((this.secondRemain % 3600) / 60));
        const sec = formatter(parseInt(this.secondRemain % 60));

        return `${hour}:${min}:${sec}`;
      }
      return this.secondRemain
    }
  },
  watch: {
    secondRemain(timeRemain) {
      if (timeRemain <= 0) {
        this.clearTimer();
        this.$emit('nextQuestionLoadEvent')
      }
    },
    question(oldQuestion) {
      setTimeout(this.timerStarter, 500);
    }
  },
  mounted() {
    this.timerStarter();
  },
  methods: {
    startTimer() {
      const intervalId = setInterval(() => {
        this.secondRemain--
      }, 1000);
      this.intervalIds.push(intervalId);
    },
    clearTimer() {
      this.intervalIds.forEach(intervalId => {
        clearInterval(intervalId);
      });
      this.intervalIds = [];
    },
    timerStarter() {
      if (this.question.second_remain > 0) {
        this.secondRemain = this.question.second_remain;
        // Timer 시작.
        if (this.intervalIds.length === 0) {
          this.startTimer();
        } else {
          this.clearTimer();
          this.startTimer();
        }
      } else {
        this.secondRemain = 'COMING SOON';
      }
    },
  },
}
</script>
