<template>
  <div class="comment_line">
    <div class="comment_line_user_and_updated_at_and_tool_box">
      <div class="comment_line_user_and_updated_at">
        <div class="comment_line_user">{{post.user_name}} &nbsp;<i v-if="post.user_grade" class="fa-solid fa-crown" style="color:rgba(255, 171, 0, 0.8);"></i></div>
        <div class="comment_line_updated_at">{{post.updated_at}}</div>
      </div>
      <div class="comment_line_tool_box_btn_and_box">
        <button
          class="comment_line_tool_box_btn"
          @click="openToolBox"
        ></button>
      </div>
    </div>
    <div class="comment_line_content">{{post.content}}</div>
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
  computed: {
    isLiked() {
      return this.post.liked_users.includes(this.userInfo.userId);
    },
  },
  methods: {
    openToolBox(){
      console.log('ToolBox goes heeeeeere');
    },
    async likePost(){
      // console.log('likePost in OdoqPostLine');
      // console.log('userInfo in likePost: ', this.userInfo);
      // console.log('isLogin in likePost: ', this.isLogin);
      if (this.isLogin) {
        const resData = await this.$store.dispatch('post/postStore/likePost', {
          postId: this.post.id,
          userId: this.userInfo.userId,
        });
        // console.log('resData: ', resData);
        if (resData.result === 'success') this.isLiked = !this.isLiked;
        else this.$popup.showAlertPopup('좋아요 실패');
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
