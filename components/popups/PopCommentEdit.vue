<template>
  <client-only>
    <div class="popup_mask">
      <div class="popup_wrapper pop_confirm_wrap">
        <div class="popup_container">

          <div class="popup_wrap">
            <h1 class="popup_title text-center">{{title}}</h1>
            <div  v-if="message" class="popup_text_wrap">{{message}}</div>
            <input
              v-model="params.content"
              placeholder="내용을 입력하세요."
              :style="{fontSize: '20px'}"
            >
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
import Vue from "vue";
import PopupMixin from "@/mixins/popupMixin";
export default Vue.extend({
  mixins: [PopupMixin],
  data() {
    return {
      params: {
        targetId: null,
        content: '',
        postId: null,
      },
    };
  },
  created() {
    console.log('## PopCommentEdit > this.initValue', this.initValue);
    const target = this.initValue.commentFlag === 'cocomment'
      ? this.initValue.cocomment
      : this.initValue.comment;

    console.log('## PopCommentEdit > target', target);

    this.params.commentFlag = this.initValue.commentFlag;
    this.params.targetId = target.id;
    this.params.content = target.content;
    this.params.postId = this.initValue.postId;

  },
});
</script>
