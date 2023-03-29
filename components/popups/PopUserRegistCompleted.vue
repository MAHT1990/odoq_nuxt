<template>
  <client-only>
    <div class="popup_mask" @click="ok">
      <div class="popup_wrapper">
        <div class="popup_container">

          <div class="popup_wrap popup_user_join_wrap">
            <h1 class="main_title text-center">회원가입 완료</h1>
            <div class="popup_title text-center">
              <h2>가입을 축하합니다!<br>ODOQER가 되셨습니다.</h2>
              <p v-if="name && name !== ''"><span>{{ name }}님</span></p>
            </div>
            <div class="popup_btn_wrap">
              <button @click="ok">확인</button>
            </div>
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
  props: {
    name: {
      type: String,
      default: '',
    },
  },
});
</script>
