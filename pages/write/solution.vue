<template>
  <div class="write_wrap">
    <div v-if="isLogin" class="comment_input_box">
      <div class="write_header">
        <button class="close_btn" type="button" @click="$router.back()">
          <img src="data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.8821 5L4.9375 19.9446' stroke='%231A1A1A' stroke-width='1.3' stroke-miterlimit='10' stroke-linecap='round'/%3E%3Cpath d='M19.9368 19.9446L4.99219 5' stroke='%231A1A1A' stroke-width='1.3' stroke-miterlimit='10' stroke-linecap='round'/%3E%3C/svg%3E%0A" alt="뒤로가기">
        </button>
        <button
          class="regist_btn"
          type="button"
          @click="createPost"
        >
          등록
        </button>
      </div>
      <div class="write_contents">
        <div class="textarea_wrap">
          <textarea
            v-model="postInput.title"
            class="title"
            maxlength="100"
            placeholder="제목"
            cols="1"
          />
          <div class="comment_input_box_charnumbs_and_button">
            <div class="comment_input_box_charnumbs"><span></span></div>
            <div class="comment_input_box_buttons">
              <label for="image_file" class="comment_input_box_button">
                <i class="fa-solid fa-image"></i>
              </label>
              <input
                ref="imageInput"
                type="file"
                id="image_file"
                @change="addImageToPost"
                accept="image/*"
                style="display: none;"
              />
            </div>
          </div>
          <textarea
            ref="textareaContent"
            class="content"
            v-model="postInput.content"
            cols="40"
            rows="1"
            placeholder="내용을 입력하세요."
          />
        </div>
        <img
          class="attached_img"
          :src="postInput.image.url"
          @click="removeImageFromPost"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import Utils from "@/plugins/utils";

export default {
  props: {},
  /**
   * 페이지를 새로고침하면, store 데이터를 초기화 시킨다.
   * 그러므로, 사용자 정보와 문항정보를 다시 가져와야함.
   * 비정상적인 접근을 막기위해.
   * @param store
   * @param req
   * @returns {Promise<void>}
   */
  async asyncData({ store, req }) {
    // 로그인 check & 사용자정보 가져오기
    const cookie = req? req.headers.cookie : document.cookie;
    if (Utils.getCookie(cookie, 'jwt')) {
      await store.dispatch('user/userAuthStore/checkLogin', cookie)
    }

    // 문제 받아오기
    await store.dispatch('question/questionStore/getQuestion');
  },
  data: () => ({
    postInput: {
      title: '',
      content: '',
      image: {
        file: null,
        url: null,
      },
    },
  }),
  computed: {
    ...mapGetters({
      isLogin: 'user/userAuthStore/isLogin',
      userInfo: 'user/userAuthStore/userInfo',
      question: 'question/questionStore/question',
    }),
    // contentLength() {
    //   if (this.postInput.content.length > 0) {
    //     return `${this.postInput.content.length}/${this.$refs.textareaContent.maxLength}`;
    //   }
    //   return '';
    // },
  },
  mounted() {
    // console.log('## WriteSolution mounted');
    // console.log('# isLogin', this.isLogin);
    // console.log('# userInfo', this.userInfo);
    // console.log('# question', this.question);
    if (!this.isLogin) {
      this.$popup.showAlertPopup('로그인 후 이용해주세요.');
      this.$router.replace('/');
      return
    }
    if (!this.question.solved_users.includes(this.userInfo.userId)) {
      this.$popup.showAlertPopup('정답 제출 이후 등록이 가능해요.');
      this.$router.replace('/');
    }
    this.postInput.title = `[${this.question.code}]${this.userInfo.userName}님의 풀이`
  },
  methods: {
    async createPost() {
      // this.$refs.textareaContent.rows = 1;
      if (this.postInput.title.length === 0) {
        this.$popup.showAlertPopup('제목을 입력해주세요.');
        return;
      }
      if (this.postInput.content.length === 0) {
        this.$popup.showAlertPopup('내용을 입력해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('type', `solution_${this.question.id}`);
      formData.append('title', this.postInput.title);
      formData.append('user', this.userInfo.userId);
      formData.append('content', this.postInput.content);
      // formData.append('filteringFlag', this.filteringFlag);
      // formData.append('orderingFlag', this.$refs.postListContainer.orderingFlag);
      if (this.postInput.image.file) {
        formData.append('img', this.postInput.image.file);
      }
      const res = await this.$store.dispatch(
        'post/postStore/createPost',
        formData,
      );
      if (res.data.result === 'success') {
        this.postInput.content = '';
        this.postInput.image.file = null;
        this.postInput.image.url = null;
        this.$refs.textareaContent.rows = 1;
        this.$popup.showAlertPopup('게시글이 등록되었습니다.');
        this.$router.replace('/');
      }
    },
    addImageToPost(e) {
      if (e.target.files.length === 0) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.postInput.image.file = file;
        this.postInput.image.url = reader.result;
      };
    },
    removeImageFromPost() {
      this.postInput.image.file = null;
      this.postInput.image.url = null;
      this.$refs.imageInput.value = '';
    },
  },
}
</script>
