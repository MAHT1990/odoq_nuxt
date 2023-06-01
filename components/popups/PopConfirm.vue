<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper pop_confirm_wrap">
        <div class="popup_container">

          <div class="popup_wrap">
            <h1 class="popup_title text-center">{{title}}</h1>
            <div v-if="message" class="popup_text_wrap">{{message}}</div>
          </div>
          <div class="popup_btn_wrap">
            <button class="gray_line_but" @click="cancel">취소</button>
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
  methods: {},
});
</script>
