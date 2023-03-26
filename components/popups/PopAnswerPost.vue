<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper">
        <div class="popup_container">

          <div class="popup_wrap">
            <div class="popup_title text-center">{{title}}</div>
            <div class="popup_text_wrap">{{initValue.question.solve_count}}명이 답을 맞추셨습니다.</div>
            <div class="popup_text_wrap">정답률 : {{initValue.question.solve_count/initValue.question.answer_count * 100}}%</div>
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
  name: "PopAnswerPost"
})
</script>

<style scoped>

</style>
