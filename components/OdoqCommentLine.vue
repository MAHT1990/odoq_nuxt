<template>
  <li class="comment">
    <div class="user_info_box flex">
      <div class="flex">
        <div class="grade level" :class="getLevel(comment.user_level)">{{ comment.user_level }}</div>
        <div class="nick_name">{{ comment.user_name }}</div>
      </div>
      <div class="text_tool_box">
        <span v-if="isAuthor || isWriter" @click="editComment">수정</span>
        <span v-if="isAuthor || isWriter" @click="blindComment">삭제</span>
      </div>
    </div>
    <div v-if="!comment.blind" class="comment_content" v-html="comment.content"></div>
    <div
      v-else
      class="comment_content"
      v-html="comment.blind_text"
      style="color: #707070; text-decoration-line: line-through; font-style: italic;"
    ></div>
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
import {mapGetters} from "vuex";

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
    ...mapGetters({
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
    }),
    postId() { return this.$route.params.id },
    isAuthor() {
      return parseInt(this.userInfo.userId) === parseInt(this.comment.user_id)
    },
    isWriter() {
      return [1, 2].includes(parseInt(this.userInfo.userGrade, 10))
    }
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
      if (!this.isLogin) return this.$popup.showAlertPopup('로그인 후 이용해주세요.');
      if (this.cocommentInput.content.length === 0) {
        return this.$popup.showAlertPopup('내용을 입력해주세요.');
      }
      const formData = new FormData();
      formData.append('user', this.userInfo.userId);
      formData.append('content', this.cocommentInput.content);
      formData.append('comment', this.comment.id);
      formData.append('cocomment', 'cocomment');
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
        this.$popup.showAlertPopup('답글이 등록되었습니다.');
      }
    },
    editComment() {
      const that = this;
      new this.$popup.PopCommentEdit({
        propsData: {
          title: '댓글 수정',
          initValue: {
            commentFlag: 'comment',
            postId: that.postId,
            comment: that.comment,
          },
          okCallback: async (params) => {
            const res = await this.$store.dispatch('post/postStore/editComment', params);
            this.$popup.showAlertPopup(res.message);
            params.$destroy();
          },
        },
      }).$mount();
    },
    blindComment() {
      // console.log('postBlind');
      const that = this;
      new this.$popup.PopConfirm({
        propsData: {
          title: '댓글을 블라인드 처리/취소하시겠습니까?',
          okCallback: async (params) => {
            // console.log('okCallback');
            // console.log('현재 댓글에 대한 정보를 보내 블라인드 처리한다.', this.initValue.post);
            const res = await this.$store.dispatch('post/postStore/blindComment', {
              commentFlag: 'comment',
              postId: that.postId,
              targetId: that.comment.id,
              userGrade: that.userInfo.userGrade,
            });
            if (res.result === 'success') this.$popup.showAlertPopup(res.message);
            else this.$popup.showAlertPopup('게시글 처리에 실패했습니다.');
            params.$destroy();
          },
        },
      }).$mount();
    },
    getLevel(getLevel) {
      if(getLevel < 10) {
        return 'black';
      } else if (getLevel < 20) {
        return 'blue';
      } else if (getLevel < 40) {
        return 'green';
      } else if (getLevel < 70) {
        return 'red';
      } else if (getLevel < 100) {
        return 'pink';
      } else {
        return 'king';
      }
    },
  },
}
</script>

<style scoped>

</style>
