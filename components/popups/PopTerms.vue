<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper">
        <div class="popup_container">
          <div class="terms_popup_wrap">
            <div class="popup_wrap">
              <div class="popup_title">{{ title }}</div>
              <div class="popup_text_wrap">
                <div v-if="title === '이용약관'">
                  <h1>제 1장 총칙</h1>
                  <h2>제 1조 (목적)</h2>
                  <p>
                    이 약관은 띵커스주식회사(이하 ‘회사’라 합니다)와 이용 고객(이하 ‘회원’이라 합니다)간에 회사가 제공하는 오돜 서비스(이하 ‘오돜’ 또는 ‘서비스’라 합니다)의 가입조건 및 이용에 관한 제반 사항과 기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.
                  </p>
                </div>
                <div v-if="title === '개인정보 취급방침'">
                  <h2>1. 수집하는 개인정보 항목</h2>
                  <p>
                    회사는 회원 가입, 고객 상담, 서비스의 제공 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                  </p>
                  <h3>수집항목</h3>
                </div>
              </div>
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
import PopupMixin from '@/mixins/popupMixin';

export default Vue.extend({
  mixins: [PopupMixin],
  methods: {},
});
</script>
