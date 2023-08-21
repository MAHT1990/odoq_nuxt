<template>
  <div
    class="comment_line_box"
    @click="movePostDetail"
    :style="readPostStyle">
    <div style="width: 90%">
      <div
        class="comment_line_content">
        <div class="title">
          <div>
            <!--            <i v-if="isSolution" class="fa-solid fa-pen"></i>-->
            <img v-if="isSolution" class="icon_pen"
                 src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.84 2.72998C16.45 2.72998 16.07 2.87998 15.77 3.16998L13.65 5.28998L18.95 10.6L21.07 8.49998C21.67 7.88998 21.67 6.93998 21.07 6.35998L17.9 3.16998C17.6 2.87998 17.22 2.72998 16.84 2.72998ZM12.94 5.99998L4.84 14.11L7.4 14.39L7.58 16.68L9.86 16.85L10.15 19.41L18.25 11.3M4.25 15.04L2.5 21.73L9.2 19.94L8.96 17.78L6.65 17.61L6.47 15.29' fill='black'/%3E%3C/svg%3E%0A"
                 alt="">
          </div>
          <div>
            <span
              class="title_text"
              @mouseover="underline"
              @mouseleave="removeUnderline"
              :style="titleStyle"
            >{{ post.title }}
            </span>
          </div>
          <div><i v-if="post.img_url" class="fa-solid fa-image"></i></div>
        </div>
      </div>
      <div class="content_info_box">
        <div class="content_info_tools">
          <div class="comment_line_user">
            <span class="grade" :class="userLabel.userClass">{{ userLabel.content }}</span>
            <span class="nick_name">{{ post.user_name }}</span>
          </div>
          <div class="updated_at">{{ formattedUpdatedTime.split(' ')[0] }}</div>
          <div class="hits">조회수 {{ post.hit_count }}</div>
        </div>
      </div>
    </div>
    <div class="comment_count_box">
      <div class="comment_count" :class="post.comments_count > 0 ? 'on' : ''">{{ post.comments_count }}</div>
      <span>댓글</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Utils from "@/plugins/utils";

export default {
  props: {
    question: {
      type: Object
    },
    post: {
      type: Object
    },
    userInfo: {
      type: Object
    },
    isLogin: {
      type: Boolean
    }
  },
  data: () => ({
    showImg: false,
    defaultColor: '#000000',
    readColor: 'darkgray',
    isRead: false,
    currentPost: false,
  }),
  computed: {
    isWriter() {
      return parseInt(this.userInfo.userId, 10) === parseInt(this.post.user_id, 10) || parseInt(this.userInfo.userGrade, 10) === 2;
    },
    formattedUpdatedTime() {
      return moment(this.post.created_at).format('YYYY-MM-DD HH:mm');
    },
    isLiked() {
      return this.post.liked_users.includes(this.userInfo.userId);
    },
    isSolution() {
      return this.post.type.includes('solution');
    },
    questionCode() {
      return this.post.type.split('_')[1];
    },
    readPostStyle() {
      return {
        backgroundColor: this.currentPost ? '#f5f5f5' : 'white',
        color: this.isRead || this.currentPost ? this.readColor : this.defaultColor,
      }
    },
    titleStyle() {
      return {fontWeight: this.isSolution ? 'bold' : 'normal'}
    },
    userLabel() {
      return this.$utils.getUserLabel(this.post);
    }
  },
  methods: {
    // toggleShowImg() {
    //   this.showImg = !this.showImg;
    // },
    movePostDetail() {
      const that = this;
      const move = () => {
        this.$router.push({path: `/post/${this.post.id}`})
      };
      // 풀이글에 대하여.
      if (this.isSolution) {
        // 로그인 안했으면
        if (!this.isLogin) return this.$popup.showAlertPopup('풀이글은 로그인후 열람 가능합니다.');
        // 이전 문항이면
        if (!this.post.type.includes((this.question.id).toString())) return move()
        // 이미 cheating 했으면,
        if (this.question.cheated_users.includes(this.userInfo.userId)) return move();
        // 정답 제출 안됐으면,
        if (!this.question.solved_users.includes(this.userInfo.userId)) {
          new this.$popup.PopConfirm({
            propsData: {
              title: '먼저보기',
              subTitle: '풀이를 먼저보시면 답안통계가 반영되지않습니다.',
              message: '풀이를 먼저보시면 답안통계가 반영되지않습니다.',
              okCallback: async (params) => {
                const res = await that.$store.dispatch('question/questionStore/cheatAnswer', {
                  userId: that.userInfo.userId,
                  questionId: that.question.id,
                });
                if (res.result === 'success') move()
                else that.$popup.showAlertPopup('열람 오류.');
                params.$destroy();
              }
            },
          }).$mount();
        } else move(); // 문항을 풀었으면,
      } else move(); // 풀이글이 아니면,
    },
    underline(e) {
      e.target.style.textDecoration = 'underline';
    },
    removeUnderline(e) {
      e.target.style.textDecoration = 'none';
    }
  },
  beforeMount() {
    this.isRead = Utils.getRead('post') ? Utils.getRead('post').includes(this.post.id) : false;
    this.currentPost = parseInt(this.$route.params.id, 10) === parseInt(this.post.id, 10);
    // console.log(this.post);
  }
}
</script>
