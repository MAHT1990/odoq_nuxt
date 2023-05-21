<template>
  <div class="comments_wrap">
    <ul class="comments_list">
          <odoq-comment-line
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
    </ul>
    <div class="write_comment_box flex">
      <textarea v-model="commentInput.content" name="" id="" cols="30" rows="3"></textarea>
      <button class="comment_regist_btn" @click="createComment">댓글</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: [],
  },
  data: () => ({
    commentInput: {
      content: "",
    },
  }),
  computed: {
    userInfo() { return this.$store.getters['user/userAuthStore/userInfo'] },
    isLogin() { return this.$store.getters['user/userAuthStore/isLogin'] },
    postOrNoticeId() { return this.$route.params.id },
    targetStore() {
      const target = this.$route.path.split('/')[1];
      return `${target}/${target}Store`
    }
  },
  methods: {
    async createComment() {
      if (!this.isLogin) {
        this.$popup.showAlertPopup('로그인 후 이용해주세요.');
        return;
      }
      if (this.commentInput.content.length === 0) {
        this.$popup.showAlertPopup('내용을 입력해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('user', this.userInfo.userId);
      formData.append('content', this.commentInput.content);

      // Backend Validation 때문에 분기 처리해줘야함.
      if (this.$route.name.includes('post')) formData.append('post', this.postOrNoticeId);
      if (this.$route.name.includes('notice')) formData.append('notice', this.postOrNoticeId);
      // formData.append('filteringFlag', this.filteringFlag);

      // 이미지 추가시 사용
      // if (this.commentInput.image.file) {
      //   formData.append('img', this.commentInput.image.file);
      // }
      const res = await this.$store.dispatch(
        `${this.targetStore}/createComment`,
        {
          postOrNoticeId: this.postOrNoticeId,
          formData
        }
      );

      if (res.result === 'success') {
        this.commentInput.content = '';
        // this.commentInput.image.file = null;
        // this.commentInput.image.url = null;
        this.$popup.showAlertPopup('댓글이 등록되었습니다.');
      }
    },
  }
}
</script>
