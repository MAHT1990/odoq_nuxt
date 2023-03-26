<template>
  <div class="main_container">
    <odoq-question-container
      v-if="!isWeekend"
      :question="question"
      @nextQuestionLoadEvent="loadNext"
    />
    <odoq-weekend-timer-container
      v-if="isWeekend"
      @nextQuestionLoadEvent="loadNext"
    />
    <div class="verticalLine2"></div>
    <div>{{ weekday }}</div>
    <odoq-answer-container
      v-if="isLogin"
      :question="question"
      :user-info="userInfo"
    ></odoq-answer-container>
    <odoq-post-container/>
    <odoq-footer/>
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
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      question: 'question/questionStore/question',
    }),
    isWeekend() {
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
