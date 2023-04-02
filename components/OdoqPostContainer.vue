<template>
  <div class="comment_container">
    <div class="comment_container_header">
      <div class="comment_container_header_today_and_my_comment">
        <div class="comment_container_header_today">오늘의 댓글 &nbsp; <span>{{ todayPosts }}</span> 개</div>
        <div
          v-if="filteringFlag==='all'"
          class="comment_container_header_my_comment"
          @click="toggleMyPost">내 댓글&nbsp;<i class="fa-solid fa-chevron-right"></i>
        </div>
        <div
          v-else-if="filteringFlag==='my'"
          class="comment_container_header_my_comment"
          @click="toggleMyPost">전체댓글&nbsp;<i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div class="comment_container_header_notice">관리자가 악성댓글을 감지하고 있습니다. 건강한 댓글 문화를 위해 노력하는 오도커가 됩시다.</div>
    </div>
    <div
      v-if="isLogin" class="comment_input_box"
    >
      <div class="comment_input_box_form">
        <div class="comment_input_box_textarea_and_charnumbs_and_button">
          <textarea
            ref="textareaContent"
            v-model="postInput.content"
            cols="40"
            rows="1"
            maxlength="500"
            placeholder="댓글을 입력해주세요."
            @blur="onBoxBlur"
            @focus="onBoxFocus"
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
    <OdoqPostListContainer
      :filtering-flag="filteringFlag"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {},
  data: () => ({
    filteringFlag: 'all',
    postInput: {
      content:'',
    },
  }),
  computed: {
    ...mapGetters({
      isLogin: 'user/userAuthStore/isLogin',
      userInfo: 'user/userAuthStore/userInfo',
      todayPosts: 'post/postStore/todayPosts',
    }),
    contentLength() {
      if (this.postInput.content.length > 0){
        return `${this.postInput.content.length}/${this.$refs.textareaContent.maxLength}`;
      }
      return '';
    },
  },
  methods: {
    toggleMyPost() {
      this.filteringFlag = this.filteringFlag === 'all' ? 'my' : 'all';
    },
    onBoxFocus(e) {
      e.target.rows = 5;
    },
    onBoxBlur(e) {
      setTimeout(() => {
        e.target.rows = 1;
      }, 150);
    },
    async createPost() {
      // this.$refs.textareaContent.rows = 1;
      if (this.postInput.content.length === 0) {
        this.$popup.showAlertPopup('댓글을 입력해주세요.');
        return;
      }
      const res = await this.$store.dispatch(
        'post/postStore/createPost',
        {
          user: this.userInfo.userId,
          content: this.postInput.content,
          filteringFlag: this.filteringFlag,
      });
      if (res.data.result === 'success') this.postInput.content = '';
    }
  },
}
</script>
