<template>
  <div class="answer_live_container">
    <div class="asnwer_live_title_and_count">
      <div class="answer_live_title">
        <span>Billboard</span>&nbsp;
        <span>LIVE</span> : {{answersLives?.length}}명
      </div>
      <form class="answer_search">
        <div>
          <label for="search">닉네임 검색</label><input type="text" id="search">
        </div>
        <button type="button">
          <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.0549 13.0039 15.5117 12.1487 15.7675 11.2256C16.0234 10.3024 16.072 9.33413 15.91 8.38998C15.44 5.60998 13.12 3.38997 10.32 3.04997C9.33559 2.92544 8.33576 3.02775 7.397 3.34906C6.45824 3.67038 5.60542 4.20219 4.90381 4.90381C4.20219 5.60542 3.67038 6.45824 3.34906 7.397C3.02775 8.33576 2.92544 9.33559 3.04997 10.32C3.38997 13.12 5.60998 15.44 8.38998 15.91C9.33413 16.072 10.3024 16.0234 11.2256 15.7675C12.1487 15.5117 13.0039 15.0549 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.49997 14C7.00997 14 4.99997 11.99 4.99997 9.49997C4.99997 7.00997 7.00997 4.99997 9.49997 4.99997C11.99 4.99997 14 7.00997 14 9.49997C14 11.99 11.99 14 9.49997 14Z' fill='%230051C8'/%3E%3C/svg%3E%0A" alt="">
        </button>
      </form>
<!--      <div class="answer_live_count">{{answerLive.solveCount}} {{answerLive.answerCount}}</div>-->
    </div>
    <div class="answer_live_box">
      <div
        v-for="(answr, idx) in answersLives"
        :key="idx"
        class="answer_live_box_content"
      >
        <div class="rank">
          {{idx + 1}}
          <span v-if="idx === 0">st.</span>
          <span v-if="idx === 1">nd.</span>
          <span v-if="idx === 2">rd.</span>
        </div>
        <div class="flex">
          <div class="grade" :class="getLevel(answr.user_level)">{{ answr.user_level }}</div>
          <div class="answer_live_box_content_user_name">{{ answr.user_name }}</div>
        </div>
<!--        <div class="answer_live_box_content_answer">&nbsp;&nbsp;&nbsp;&nbsp;{{ answr.answer }}</div>-->
<!--        <div class="answer_live_box_content_is_solved">&nbsp;&nbsp;&nbsp;&nbsp;{{ isSolved(answr) }}</div>-->
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
      answersLives: [],
      intervalId: null,
    }
  },
  computed: {
     ...mapGetters({
       answerLive: 'question/questionStore/answerLive'
     }),
    // make answr.is_solved to '맞음' or '틀림'
  },
  mounted() {
    this.getAnswerLive();
    this.intervalId = setInterval(this.getAnswerLive, 10000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  methods: {
    async getAnswerLive() {
      await this.$store.dispatch('question/questionStore/getAnswerLive', {
        questionId: this.question.id
      });
      if (this.answerLive.answers !== undefined) {
        this.answersLives = this.answerLive.answers.filter((e) => e.is_solved === true);
        this.answersLives.sort((a, b) => {
          const timeA = moment(a.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('HH:mm:ss');
          const timeB = moment(b.created_at, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').format('HH:mm:ss');
          return timeA.localeCompare(timeB);
        })
      }
      // console.log('## OdoqAnswerLive > getAnswerLive: ', this.answerLive);
    },
    isSolved(answr) {
      return answr.is_solved ? '맞음' : '틀림';
    },
    createdAt(answr) {
      // return moment(answr.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(answr.created_at).format('HH:mm:ss');
    },
    getLevel(getLevel) {
      if(getLevel < 10) {
        return 'black';
      } else if (getLevel < 20) {
        return 'blue';
      } else if (getLevel < 40) {
        return 'green';
      } else if (getLevel < 70) {
        return 'red';
      } else if (getLevel < 100) {
        return 'pink';
      } else {
        return 'king';
      }
    },
  }
}
</script>

<style scoped>

</style>
