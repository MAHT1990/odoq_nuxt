<template>
  <div class="answer_live_container">
    <div class="answer_live_title">실시간 답변</div>
    <div class="answer_live_box">
      <div class="answer_live_box_title">답변</div>
      <div
        v-for="(answr, idx) in answerLive.answers"
        :key="idx"
        class="answer_live_box_content"
      >
        <div class="answer_live_box_content_title">{{ answr.answer }}</div>
        <div class="answer_live_box_content_text">{{ answr.is_solved }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "OdoqAnswerLive",
  data() {
    return {
      intervalId: null,
    }
  },
  props: {
    question: Object,
    userInfo: Object,
  },
  computed: {
     ...mapGetters({
       answerLive: 'question/questionStore/answerLive'
     }),
  },
  methods: {
    getAnswerLive() {
      this.$store.dispatch('question/questionStore/getAnswerLive', {
        questionId: this.question.id
      });
      console.log('## OdoqAnswerLive > getAnswerLive: ', this.answerLive);
    },
  },
  created() {
    this.getAnswerLive();
    this.intervalId = setInterval(this.getAnswerLive, 10000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  }
}
</script>

<style scoped>

</style>
