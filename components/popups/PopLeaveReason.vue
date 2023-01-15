<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper">
        <div class="popup_container">
          <div class="popup_wrap">
            <div class="popup_title text-center">재가입은 불가 합니다.</br> 정말 회원 탈퇴하시겠습니까?</div>
          </div>
        </div>

        <div class="popup_btn_wrap">
          <button @click="cancel" class="line_btn">취소</button>
          <button @click="ok">확인</button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import PopupMixin from './popupMixin';

export default Vue.extend({
  mixins: [PopupMixin],
  data: () => ({
    leaveType: [],
    params: {
      leave_type: '',
      reason: '',
      password: '',
    },
  }),
  async created() {
    if (this.leaveType.length === 0) {
      await this.$store.dispatch('common/getCodes', 'leave_type');
      this.leaveType = this.codesArray('leave_type');
    }
  },
  computed: {
    ...mapGetters({
      codesArray: 'common/codesArray',
    }),
  },
});
</script>
