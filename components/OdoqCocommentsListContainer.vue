<template>
  <ul class="cocomment_list">
    <li class="cocomment" v-for="cocomment in cocomments" :key="cocomment.id">
      <div class="user_info_box flex">
        <div class="flex">
          <div class="grade level" :class="getLevel(cocomment.user_level)">{{ cocomment.user_level }}</div>
          <div class="nick_name">{{ cocomment.user_name }}</div>
        </div>
        <div class="text_tool_box">
          <span v-if="isAuthor(cocomment) || isWriter" @click="editCocomment(cocomment)">수정</span>
          <span v-if="isAuthor(cocomment) || isWriter" @click="blindCocomment(cocomment)">삭제</span>
        </div>
      </div>
      <div v-if="!cocomment.blind" class="comment_content" v-html="cocomment.content"></div>
      <div
        v-else
        class="comment_content"
        v-html="cocomment.blind_text"
        style="color: #707070; text-decoration-line: line-through; font-style: italic;"
      ></div>
      <span class="date">{{ createdAt(cocomment) }}</span>
<!--      <span class="date">{{ cocomment.created_at.split('T')[0] }}</span>-->
<!--      <span class="date">{{ cocomment.created_at.split('T')[1] }}</span>-->
    </li>
  </ul>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  props: {
    cocomments: {
      type: Array,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
    }),
    postOrNoticeId() { return this.$route.params.id },
    isWriter() {
      return [1, 2].includes(parseInt(this.userInfo.userGrade, 10))
    },
    targetStore() {
      const target = this.$route.path.split('/')[1];
      return `${target}/${target}Store`
    }
  },
  methods: {
    isAuthor(cocomment) {
      return parseInt(this.userInfo.userId) === cocomment.user_id;
    },
    createdAt(cocomment) {
      // return moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(cocomment.created_at).format('YY-MM-DD HH:mm:ss');
    },
    editCocomment(cocomment) {
      const that = this;
      new this.$popup.PopCommentEdit({
        propsData: {
          title: '댓글 수정',
          initValue: {
            commentFlag: 'cocomment',
            postOrNoticeId: that.postOrNoticeId,
            cocomment,
          },
          okCallback: async (params) => {
            const res = await this.$store.dispatch(`${that.targetStore}/editCocomment`, params);
            this.$popup.showAlertPopup(res.message);
            params.$destroy();
          },
        },
      }).$mount();
    },
    blindCocomment(cocomment) {
      // console.log('postBlind');
      const that = this;
      new this.$popup.PopConfirm({
        propsData: {
          title: '답글을 블라인드 처리/취소하시겠습니까?',
          okCallback: async (params) => {
            // console.log('okCallback');
            // console.log('현재 댓글에 대한 정보를 보내 블라인드 처리한다.', this.initValue.post);
            const res = await this.$store.dispatch(`${that.targetStore}/blindCocomment`, {
              commentFlag: 'cocomment',
              postOrNoticeId: this.postOrNoticeId,
              targetId: cocomment.id,
              userGrade: this.userInfo.userGrade,
            });
            this.$popup.showAlertPopup(res.message);
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
  }
}
</script>

<style scoped>

</style>
