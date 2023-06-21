<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper">
        <div class="popup_container popup_answer_container">

          <div class="popup_wrap">
            <div class="popup_title text-center">
              {{ isSolved ? correctMessage.main : wrongMessage.main }}
            </div>
            <div v-if="isSolved && !isOverLimit" class="popup_text_wrap">
              {{initValue.question.solve_count}}명이 답을 맞추셨습니다.
            </div>
            <div
              v-if="isCheated"
              class="popup_text_wrap"
              style="color: #002964; font-weight: bold"
            >
              먼저보기를 사용했군요! <br> 아쉽지만 답변통계에 반영되지 않습니다.
            </div>
            <div v-else class="popup_text_wrap">
              {{ isSolved ? correctMessage.sub : wrongMessage.sub }}
            </div>
<!--            <div class="popup_text_wrap">정답률 : {{initValue.question.solve_count/initValue.question.answer_count * 100}}%</div>-->
<!--            <div class="popup_text_wrap">{{initValue.question.solve_count/initValue.question.answer_count}}</div>-->
          </div>

          <div class="popup_btn_wrap">
            <button id="popup_btn_ok" class="product_buy_but" @click="ok">확인</button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Vue from 'vue';
import PopupMixin from '@/mixins/popupMixin';
export default Vue.extend({
  mixins: [PopupMixin],
  computed: {
    isCheated() {
      return this.initValue.question.cheated_users.includes(this.initValue.userInfo.userId);
    },
    isSolved() {
      return this.initValue.question.answer === this.initValue.answer;
    },
    hasSolvedInLimit() {
      return this.initValue.question.has_solved_in_limit;
    },
    isOverLimit() {
      return this.initValue.question.wrong_answer_count >= 5;
    },
    correctMessage() {
      let main = '';
      let sub = '';
      if (this.hasSolvedInLimit) {
        main = '정답입니다.'
        sub = '이미 레벨업하셨습니다.'
      } else {
        main = this.isOverLimit ? '정답입니다.' : '정답입니다.';
        sub = this.isOverLimit ? '5회 이상 오답으로 레벨업에 반영되지않습니다.' : '레벨업!!';
      }
      return { main, sub }
    },
    wrongMessage() {
      let main = '';
      let sub = '';
      if (this.hasSolvedInLimit) {
        main = '오답입니다.'
        sub = '이미 레벨업하셨습니다.'
      } else {
        main = this.isOverLimit ? '5회 이상 오답입니다.' : `${this.initValue.question.wrong_answer_count} / 5 회 오답입니다.`;
        sub = this.isOverLimit ? '레벨업에 반영되지않습니다.' : '5회 이상 오답시 레벨업에 반영되지않습니다.';
      }
      return { main, sub }
    },
  }
})
</script>

<style scoped>

</style>
