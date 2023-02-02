<template>
  <client-only>
    <div class="popup_mask" @click="ok">
      <div class="popup_wrapper">
        <div class="popup_container">

          <div class="popup_wrap">
            <div class="popup_title text-center" :style="title.indexOf('\n') > -1 ? 'white-space: pre;' : ''">{{ title }}</div>
          </div>
          <div class="popup_btn_wrap">
            <button @click="ok">확인</button>
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
