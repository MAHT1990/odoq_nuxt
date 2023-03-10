<template>
  <div class="main_container">
    <OdoqWeekendTimerContainer
      v-if="weekday === 2 || weekday === 3"
      @nextQuestionLoadEvent="loadNext"
    ></OdoqWeekendTimerContainer>
    <OdoqQuestionContainer
      v-else
      :question="question"
      @nextQuestionLoadEvent="loadNext"
    ></OdoqQuestionContainer>
    <div class="verticalLine2"></div>
    <div>{{ weekday }}</div>
    <OdoqAnswerContainer
      v-if="isLogin"
      :question-answer="question.answer"
    ></OdoqAnswerContainer>
    <OdoqPostContainer/>
    <OdoqFooter/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      weekday: new Date().getDay(),
      onOffSeason: true,
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/userAuthStore/isLogin',
      question: 'question/questionStore/question',
    }),
  },
  methods: {
    async loadNext() {
      this.weekday = new Date().getDay();
      await this.$store.dispatch('smsStore/sendAuthorSms', {
        answerCount: this.question.answer_count,
        solveCount: this.question.solve_count,
        solvePercent: this.question.answer_count / this.question.solve_count * 100,
      });
      console.log('previous question is ', this.question);
      await this.$store.dispatch('question/questionStore/getQuestion');
      console.log('current question is ', this.question);
      this.$store.dispatch('smsStore/sendStudentSms');
    }
  }
}
</script>
