<template>
  <div class="answer_live_container">
    <div class="asnwer_live_title_and_count">
      <div class="answer_live_title">
        <span>ANSWERLIVE</span>&nbsp;
        <span>LIVE</span> : {{ answersLives?.length }}명
      </div>
      <form class="answer_search">
        <div>
          <label for="search">닉네임 검색</label><input type="text" id="search" @input="searchUser">
        </div>
        <button type="button">
          <img
            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.0549 13.0039 15.5117 12.1487 15.7675 11.2256C16.0234 10.3024 16.072 9.33413 15.91 8.38998C15.44 5.60998 13.12 3.38997 10.32 3.04997C9.33559 2.92544 8.33576 3.02775 7.397 3.34906C6.45824 3.67038 5.60542 4.20219 4.90381 4.90381C4.20219 5.60542 3.67038 6.45824 3.34906 7.397C3.02775 8.33576 2.92544 9.33559 3.04997 10.32C3.38997 13.12 5.60998 15.44 8.38998 15.91C9.33413 16.072 10.3024 16.0234 11.2256 15.7675C12.1487 15.5117 13.0039 15.0549 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.49997 14C7.00997 14 4.99997 11.99 4.99997 9.49997C4.99997 7.00997 7.00997 4.99997 9.49997 4.99997C11.99 4.99997 14 7.00997 14 9.49997C14 11.99 11.99 14 9.49997 14Z' fill='%230051C8'/%3E%3C/svg%3E%0A"
            alt="">
        </button>
      </form>
    </div>
    <div class="answer_live_box">
      <div
        v-for="(answr, idx) in resultAnswersLives"
        :key="idx"
        class="answer_live_box_content"
      >
        <div class="rank">
          {{ answr.rank }}
          <span v-if="answr.rank === 1">st.</span>
          <span v-if="answr.rank === 2">nd.</span>
          <span v-if="answr.rank === 3">rd.</span>
        </div>
        <div class="flex">
          <div class="grade" :class="$utils.getUserLabel(answr).userClass">{{ $utils.getUserLabel(answr).content }}</div>
          <div class="answer_live_box_content_user_name">{{ answr.user_name }}</div>
        </div>
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
      filteredAnswersLives: [],
    }
  },
  computed: {
    ...mapGetters({
      answerLive: 'question/questionStore/answerLive'
    }),
    resultAnswersLives() {
      return this.filteredAnswersLives.length > 0
        ? this.filteredAnswersLives
        : this.answersLives;
    },
  },
  mounted() {
    this.getAnswerLive();
    // this.intervalId = setInterval(this.getAnswerLive, 10000);
  },
  methods: {
    /**
     * @description 정답 라이브 정보를 가져와 가공한다.
     * 정답만, 중복제거, 시간순으로 정렬
     * @return {Promise<void>}
     */
    async getAnswerLive() {
      await this.$store.dispatch('question/questionStore/getAnswerLive', {
        questionId: this.question.id
      });
      if (this.answerLive.answers !== undefined) {
        this.answersLives = this.answerLive.answers
          .filter((e) => e.is_solved === true)
          .reduce((acc, cur) => {
            const isExist = acc.find((e) => e.user_name === cur.user_name);
            if (!isExist) { acc.push(cur) }
            return acc;
          }, [])
          .sort((a, b) => {
            const timeA = moment(a.created_at).format('YY-MM-DD HH:mm:ss');
            const timeB = moment(b.created_at).format('YY-MM-DD HH:mm:ss');
            return timeA.localeCompare(timeB);
          })
        this.answersLives.forEach((answr) => {
          answr.rank = this.answersLives.indexOf(answr) + 1;
        });
        // 같은 user_name 의 중복을 제거한다.
      }
    },
    searchUser(e) {
      this.filteredAnswersLives = this.answersLives.filter((answer) => answer.user_name.includes(e.target.value));
    },
    isSolved(answr) {
      return answr.is_solved ? '맞음' : '틀림';
    },
    createdAt(answr) {
      return moment(answr.created_at).format('HH:mm:ss');
    },
  }
}
</script>

<style scoped>

</style>
