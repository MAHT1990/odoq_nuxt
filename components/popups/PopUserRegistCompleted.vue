<template>
  <client-only>
    <div class="popup-mask ">
      <div class="popup-wrapper">
        <div class="popup-container">

          <div class="popup_wrap">
            <div class="main_title text-center">회원가입 완료</div>
            <div class="popup_title text-center">
              <p>가입을 축하합니다!</p>
              <p>ODOQER가 되셨습니다.</p>
              <p v-if="name && name !== ''"><span>{{ name }}님</span></p>
            </div>
          </div>

        </div>
        <div class="popup_btn_wrap">
          <button @click="ok">확인</button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Vue from 'vue';
import PopupMixin from './popupMixin';

export default Vue.extend({
  mixins: [PopupMixin],
  props: {
    name: {
      type: String,
      default: '',
    },
  },
});
</script>
