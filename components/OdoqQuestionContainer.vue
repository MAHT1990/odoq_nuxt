<template>
  <div class="question_container">
    <div class="question_container_header">
      <p class="season_box">Season {{ question.season }} #{{ question.code }}</p>
      <p class="countdown_box">{{ timerFormat }}</p>
    </div>
    <div class="question_box">
      <img v-if="hasImg" :src="question.img_url" alt="load Error">
      <img v-else src="@/assets/img/testQuestion2.jpg" alt="load Error">
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
      intervalId: null,
    }
  },
  computed: {
    timerFormat() {
      const hour = parseInt(this.secondRemain / 3600);
      const min = parseInt((this.secondRemain % 3600) / 60);
      const sec = parseInt(this.secondRemain % 60);

      return `${this.timerFormatter(hour)}:${this.timerFormatter(min)}:${this.timerFormatter(sec)}`;
    }
  },
  watch: {
    secondRemain(timeRemain) {
      if (timeRemain <= 0) {
        clearInterval(this.intervalId)
        this.$emit('nextQuestionLoadEvent')
      }
    },
    question(oldQuestion) {
      setTimeout(this.timerStarter, 1000);
    }
  },
  created() {
    this.timerStarter();
  },
  methods: {
    timerFormatter(num) {
      return num < 10 ? "0" + num : num;
    },
    timerStarter() {
      if (this.question.second_remain > 0) {
        this.secondRemain = this.question.second_remain;
        // Timer 시작.
        this.intervalId = setInterval(() => {
          this.secondRemain--
        }, 1000)
      } else {
        this.secondRemain = 'THIS IS THE LAST';
      }
    }
  },
}
</script>
