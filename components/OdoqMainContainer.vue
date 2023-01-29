<template>
  <div class="main_container">
    <OdoqWeekendTimerContainer
      v-if="weekday === 0 || weekday === 6"
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
      await this.$store.dispatch('question/questionStore/getQuestion');
    }
  }
}
</script>
