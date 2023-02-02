<template>
  <div class="comment_container">
    <div class="comment_container_header">
      <div class="comment_container_header_today_and_my_comment">
        <div class="comment_container_header_today">오늘의 댓글 &nbsp; <span>0</span> 개</div>
        <div
          v-if="myPost"
          class="comment_container_header_my_comment"
          @click="toggleMyPost">내 댓글&nbsp;<i class="fa-solid fa-chevron-right"></i>
        </div>
        <div
          v-else
          class="comment_container_header_my_comment"
          @click="toggleMyPost">전체댓글&nbsp;<i class="fa-solid fa-chevron-right"></i>
        </div>
        <div></div>
      </div>
      <div class="comment_container_header_notice">관리자가 악성댓글을 감지하고 있습니다. 건강한 댓글 문화를 위해 노력하는 오도커가 됩시다.</div>
    </div>
    <div v-if="isLogin" class="comment_input_box">
      <div class="comment_input_box_form">
        <div class="comment_input_box_textarea_and_charnumbs_and_button">
          <textarea
            v-model="postInput.content"
            cols="40"
            rows="1"
            maxlength="500"
            placeholder="댓글을 입력해주세요."
            @focus="onBoxFocus"
            @blur="onBoxBlur"
            @keyup.enter="createPost"
          />
          <div class="comment_input_box_charnumbs_and_button">
            <div class="comment_input_box_charnumbs"><span>{{contentLength}}</span></div>
            <button
              class="comment_input_box_button"
              type="button"
              @click="createPost"
            >
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <OdoqPostListContainer/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {},
  data: () => ({
    myPost: false,
    postInput: {
      content:'',
    },
  }),
  computed: {
    ...mapGetters({
      isLogin: 'user/userAuthStore/isLogin',
      loginResult: 'user/userAuthStore/loginResult',
      question: 'question/questionStore/question',
      arrayPost: 'post/postStore/arrayPost',
    }),
    contentLength() {
      if (this.postInput.content.length > 0){
        return `${this.postInput.content.length}/500`;
      }
      return '';
    },
  },
  methods: {
    toggleMyPost() {
      this.myPost = !this.myPost;
    },
    onBoxFocus(e) {
      e.target.rows = 5;
    },
    onBoxBlur(e) {
      e.target.rows = 1;
    },
    async createPost() {
      const res = await this.$store.dispatch(
        'post/postStore/createPost',
        {
          user: this.loginResult.userId,
          content: this.postInput.content,
      });
      if (res) this.postInput.content = '';
    }
  },
}
</script>
