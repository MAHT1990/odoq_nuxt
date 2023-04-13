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
            placeholder="댓글(풀이 이미지)를 입력해주세요."
            @blur="onBoxBlur"
            @focus="onBoxFocus"
          />
          <img
            :src="postInput.image.url"
            @click="removeImageFromPost"
          />
          <div class="comment_input_box_charnumbs_and_button">
            <div class="comment_input_box_charnumbs"><span>{{contentLength}}</span></div>
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
    </div>
    <OdoqPostListContainer
      ref="postListContainer"
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
      todayPosts: 'post/postStore/todayPosts',
    }),
    contentLength() {
      if (this.postInput.content.length > 0) {
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
        if (e.target.value.length === 0) e.target.rows = 1;
        else e.target.style.border = '2px solid #e0e0e0';
      }, 100);
    },
    async createPost() {
      // this.$refs.textareaContent.rows = 1;
      if (this.postInput.content.length === 0) {
        this.$popup.showAlertPopup('댓글을 입력해주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('user', this.userInfo.userId);
      formData.append('content', this.postInput.content);
      formData.append('filteringFlag', this.filteringFlag);
      formData.append('orderingFlag', this.$refs.postListContainer.orderingFlag);
      if (this.postInput.image.file) {
        formData.append('img', this.postInput.image.file);
      }
      // const formDataReform = {};
      // for (const key of formData.keys()) {
      //   formDataReform[key] = formData.get(key);
      // }
      // console.log('## PostContainer formDataReform', formDataReform);
      const res = await this.$store.dispatch(
        'post/postStore/createPost',
        formData,
      );
      if (res.data.result === 'success') {
        this.postInput.content = '';
        this.postInput.image.file = null;
        this.postInput.image.url = null;
        this.$refs.textareaContent.rows = 1;
        this.$popup.showAlertPopup('댓글이 등록되었습니다.');
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
