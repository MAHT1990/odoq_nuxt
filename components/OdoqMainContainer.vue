<template>
  <div class="main_container">
    <odoq-question-container
      v-show="isAvailable"
      :question="question"
      @nextQuestionLoadEvent="loadNext"
    />
    <odoq-weekend-timer-container
      v-show="!isAvailable"
      @nextQuestionLoadEvent="loadNext"
    />
    <div class="verticalLine2"></div>
    <div>{{ weekday }}</div>
    <odoq-answer-container
      v-show="isAvailable"
      :question="question"
      :user-info="userInfo"
    />
    <odoq-answer-live
      v-if="isWriter"
      v-show="isAvailable"
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
      availableDays: 'common/availableDays',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      question: 'question/questionStore/question',
    }),
    isAvailable() {
      return this.availableDays.includes(this.weekday);
    },
    isWriter() {
      return [1, 2].includes(this.userInfo.userGrade);
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
