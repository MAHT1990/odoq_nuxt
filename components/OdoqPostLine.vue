<template>
  <div class="comment_line">
    <div class="comment_line_user_and_updated_at_and_tool_box">
      <div class="comment_line_user_and_updated_at">
        <div class="comment_line_user">{{post.user_name}} &nbsp;<i v-if="post.user_grade" class="fa-solid fa-crown" style="color:rgba(255, 171, 0, 0.8);"></i></div>
        <div class="comment_line_updated_at">{{formattedUpdatedTime}}</div>
      </div>
      <div class="comment_line_tool_box_btn_and_box">
        <button
          v-if="isWriter"
          class="comment_line_tool_box_btn"
          @click="openToolBox"
        ><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </div>
    </div>
    <div
      v-if="post.blind === true"
      class="comment_line_content"
      style="color: #707070; text-decoration-line: line-through; font-style: italic;"
    >{{post.blind_text}} </div>
    <div v-else class="comment_line_content">{{post.content}}</div>
    <div v-if="post.img_url && !post.blind" class="comment_line_image">
      <button @click="toggleShowImg">
        <i class="fa-solid fa-image"></i><span>&nbsp;&nbsp;{{showImg ? '숨기기' : '보기'}}</span>
      </button>
      <img
        v-if="showImg"
        :src="post.img_url"
        alt="이미지로드 실패"/>
    </div>
    <div class="comment_line_cocomment_and_like">
      <button class="comment_line_open_cocomment">
<!--        <i class="fa-solid fa-caret-down"></i>답글 (댓글 개수)-->
      </button>
      <button class="comment_like">
        <i v-if="isLiked" class="fa-solid fa-thumbs-up" @click="likePost"></i><i v-else class="fa-regular fa-thumbs-up" @click="likePost"></i>&nbsp;<span>{{post.like_count}}</span>
      </button>
    </div>
    <div class="comment_line_vertical_line"></div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
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
  }),
  computed: {
    isLiked: {
      get() {
        return this.post.liked_users.includes(this.userInfo.userId);
      },
      set(v) {
        console.log('new Value in isLiked: ', v);
      }
    },
    isWriter() {
      return parseInt(this.userInfo.userId, 10) === parseInt(this.post.user_id, 10) || parseInt(this.userInfo.userGrade, 10) === 2;
      // code above is too long, so I changed it to below:
    },
    formattedUpdatedTime() {
      return moment(this.post.updated_at).format('YYYY-MM-DD HH:mm');
    },
  },
  methods: {
    toggleShowImg() {
      this.showImg = !this.showImg;
    },
    openToolBox(e){
      // console.log('ToolBox goes heeeeeere');
      new this.$popup.PopToolBox({
        propsData: {
          initValue: {
            post: this.post,
            userInfo: this.userInfo,
            isLogin: this.isLogin,
            left: e.pageX,
            top: e.pageY,
          }
        }
      }).$mount();
    },
    async likePost(){
      if (this.isLogin) {
        const resData = await this.$store.dispatch('post/postStore/likePost', {
          postId: this.post.id,
          userId: this.userInfo.userId,
        });
        // console.log('resData: ', resData);
        if (resData.result !== 'success') this.$popup.showAlertPopup('좋아요 실패');
        // console.log(this.post);
      } else {
        this.$popup.showAlertPopup('로그인이 필요한 서비스입니다.');
      }
    },
  },
  mounted() {
    // console.log('OdoqPostLine mounted');
    // console.log('userInfo: ', this.userInfo);
    // console.log('post를 좋아한 유저는', this.post.liked_users);
    // console.log('현재 user가 이 댓글을 좋아했나 ', this.post.liked_users.includes(this.userInfo.userId));
    this.isLiked = this.post.liked_users.includes(this.userInfo.userId);
  }
}
</script>
