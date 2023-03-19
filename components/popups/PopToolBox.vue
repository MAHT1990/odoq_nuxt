<template>
    <div class = "comment_line_tool_box">
      <button @click="postEditOpen" class="comment_edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button @click="postBlind" class="comment_blind">
        <i class="fa-solid fa-eraser"></i>
      </button>
<!--      <button>-->
<!--        <i class="fa-solid fa-triangle-exclamation"></i>-->
<!--      </button>-->
    </div>
</template>

<script>
import Vue from "vue";
import popupMixin from "@/mixins/popupMixin";

export default Vue.extend({
  mixins: [popupMixin],
  methods: {
    postEditOpen() {
      console.log('postEditOpen');
    },
    postBlind() {
      // console.log('postBlind');
      new this.$popup.PopConfirm({
        propsData: {
          title: '게시글을 블라인드 처리하시겠습니까?',
          okCallback: async (params) => {
            // console.log('okCallback');
            // console.log('현재 댓글에 대한 정보를 보내 블라인드 처리한다.', this.initValue.post);
            const res = await this.$store.dispatch('post/postStore/blindPost', {
              postId: this.initValue.post.id,
              userGrade: this.initValue.userInfo.userGrade,
            });
            if (res.result === 'success') {
              this.$popup.showAlertPopup(res.message);
            } else {
              this.$popup.showAlertPopup('게시글 처리에 실패했습니다.');
            }
            params.$destroy();
          },
        },
      }).$mount();
      this.$destroy();
    },
  },
  mounted() {
    this.$el.style.left = this.initValue.left + 'px';
    this.$el.style.top = this.initValue.top + 'px';
  },
});
</script>
