<template>
  <div class="main_container">
    <OdoqWeekendTimerContainer
      v-if="isWeekEnd"
      @nextQuestionLoadEvent="loadNext"
    />
    <OdoqQuestionContainer
      v-else
      :question="question"
      @nextQuestionLoadEvent="loadNext"
    />
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
    isWeekEnd() {
      return this.weekday === 1 || this.weekday === 2;
    }
  },
  methods: {
    async loadNext() {
      this.weekday = new Date().getDay();
      await this.$store.dispatch('question/questionStore/getQuestion');
    }
  }
}
</script>
