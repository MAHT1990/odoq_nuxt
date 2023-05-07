<template>
  <li class="comment">
    <div class="user_info_box flex">
      <div class="level">{{ comment.user_level }}</div>
      <div class="nick_name">{{ comment.user_name }}</div>
    </div>
    <div v-if="!comment.blind" class="comment_content" v-html="comment.content"></div>
    <div v-else class="comment_content" v-html="comment.blind_text"></div>
    <div class="content_info_box">
      <span class="date">{{ createdAt(comment) }}</span>
      <button class="reply_btn" @click="toggleInputUI">답글쓰기</button>
    </div>
    <odoq-cocomments-list-container :cocomments="comment.cocomments" />
    <div v-if="showInputUI" class="write_comment_box flex">
      <textarea v-model="cocommentInput.content" name="" id="" cols="30" rows="3"></textarea>
      <button class="comment_regist_btn" @click="createCocomment">답글</button>
    </div>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cocommentInput: {
        content: "",
      },
      showInputUI: false,
    }
  },
  computed: {
    userInfo() { return this.$store.getters['user/userAuthStore/userInfo'] },
    postId() { return this.$route.params.id },
  },
  methods: {
    createdAt(comment) {
      // return moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(comment.created_at).format('YY-MM-DD HH:mm:ss');
    },
    toggleInputUI() {
      this.showInputUI = !this.showInputUI;
    },
    async createCocomment() {
      if (this.cocommentInput.content.length === 0) {
        this.$popup.showAlertPopup('내용을 입력해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('user', this.userInfo.userId);
      formData.append('content', this.cocommentInput.content);
      formData.append('comment', this.comment.id);
      formData.append('flag', 'cocomment');
      // formData.append('filteringFlag', this.filteringFlag);

      // 이미지 추가시 사용
      // if (this.commentInput.image.file) {
      //   formData.append('img', this.commentInput.image.file);
      // }

      // const formDataReform = {};
      // for (const key of formData.keys()) {
      //   formDataReform[key] = formData.get(key);
      // }
      // console.log('## PostContainer formDataReform', formDataReform);
      const res = await this.$store.dispatch(
        'post/postStore/createCocomment', {
          postId: this.postId,
          formData,
        }
      );
      if (res.result === 'success') {
        this.cocommentInput.content = '';
        // this.commentInput.image.file = null;
      }
    },
  },
}
</script>

<style scoped>

</style>
