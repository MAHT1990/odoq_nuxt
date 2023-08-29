<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper pop_confirm_wrap">
        <div class="popup_container">
          <div class="popup_mypage_container">
            <header>
              <h1>MyPage</h1>
            </header>
            <div class="input_wrap">
              <p class="title">{{ params.userInfo.name.text }}</p>
              <input
                id="name"
                v-model="params.userInfo.name.value"
                class="user_creation_form_container_input"
                type="text"
                placeholder="변경할 닉네임"
                name="name"
              >
            </div>
            <div class="input_wrap">
              <p>{{ params.userInfo.password.text }}</p>
              <input
                id="password"
                v-model="params.userInfo.password.value"
                class="user_creation_form_container_input"
                type="password"
                placeholder="비밀번호 확인"
                name="password"
              >
            </div>
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
  data() {
    return {
      params: {
        userInfo: {
          password: {
            text: '비밀번호',
            value: '',
          },
          name: {
            text: '닉네임',
            value: '',
          },
        },
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.params.userInfo.name.value = this.initValue.userInfo.userName || '';
    },
  },
});
</script>
