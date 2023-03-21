<template>
  <client-only>
    <div class="popup_mask" @click="closeNotice">
      <div class="popup_wrapper">
        <div class="popup_container">

          <div class="popup_wrap">
            <div class="popup_title text-center">{{title}}</div>
            <img :src="initValue.img_url" alt="이미지없음">
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
  methods: {
    closeNotice() {
      this.$destroy();
    },
  },
});
</script>

<style scoped>

</style>
