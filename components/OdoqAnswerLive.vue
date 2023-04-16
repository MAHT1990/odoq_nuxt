<template>
  <div class="answer_live_container">
    <div class="asnwer_live_title_and_count">
      <div class="answer_live_title">AnswerLIVE</div>
      <div class="answer_live_count">{{answerLive.solveCount}} / {{answerLive.answerCount}}</div>
    </div>
    <div class="answer_live_box">
      <div
        v-for="(answr, idx) in answerLive.answers"
        :key="idx"
        class="answer_live_box_content"
      >
        <div class="answer_live_box_content_user_name">{{ answr.user_name }}</div>
        <div class="answer_live_box_content_answer">&nbsp;&nbsp;&nbsp;&nbsp;{{ answr.answer }}</div>
        <div class="answer_live_box_content_is_solved">&nbsp;&nbsp;&nbsp;&nbsp;{{ isSolved(answr) }}</div>
        <div class="answer_live_box_content_created_at">&nbsp;&nbsp;&nbsp;&nbsp;{{ createdAt(answr) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import moment from 'moment';

export default {
  name: "OdoqAnswerLive",
  props: {
    question: Object,
    userInfo: Object,
  },
  data() {
    return {
      intervalId: null,
    }
  },
  computed: {
     ...mapGetters({
       answerLive: 'question/questionStore/answerLive'
     }),
    // make answr.is_solved to '맞음' or '틀림'
  },
  created() {
    this.getAnswerLive();
    this.intervalId = setInterval(this.getAnswerLive, 10000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  methods: {
    getAnswerLive() {
      this.$store.dispatch('question/questionStore/getAnswerLive', {
        questionId: this.question.id
      });
      console.log('## OdoqAnswerLive > getAnswerLive: ', this.answerLive);
    },
    isSolved(answr) {
      return answr.is_solved ? '맞음' : '틀림';
    },
    createdAt(answr) {
      // return moment(answr.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(answr.created_at).format('HH:mm:ss');
    },
  }
}
</script>

<style scoped>

</style>
