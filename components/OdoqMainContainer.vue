<template>
  <div class="main_container">
    <odoq-question-container
      v-show="!isWeekend"
      :question="question"
      @nextQuestionLoadEvent="loadNext"
    />
    <odoq-weekend-timer-container
      v-show="isWeekend"
      @nextQuestionLoadEvent="loadNext"
    />
    <div class="verticalLine2"></div>
    <div>{{ weekday }}</div>
    <odoq-answer-container
      v-if="isLogin"
      :question="question"
      :user-info="userInfo"
    />
    <odoq-post-container/>
    <odoq-footer/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      weekday: null,
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
      return this.weekday === 6 || this.weekday === 0;
    }
  },
  methods: {
    async loadNext() {
      this.weekday = new Date().getDay();
      await this.$store.dispatch('question/questionStore/getQuestion');
    }
  },
  created() {
    this.weekday = new Date().getDay();
  }
}
</script>
