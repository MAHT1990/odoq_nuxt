<template>
  <div class="post_detail_wrap">
<!--    <odoq-tabs />-->
    <div class="post_detail_contents_wrap">
      <div class="title_box">
        <textarea name="" id="" cols="30" rows="10" v-html="post.title" readonly></textarea>
        <div class="post_info_box">
          <span class="level">{{ post.user_level }}</span>
          <span class="nick_name">{{ post.user_name }}</span>
          <span class="date">{{ createdAt(post) }}</span>
          <span class="hits">조회수 {{ post.hit_count }}</span>
          <div class="report">
            <img src="@/assets/img/alert.png" alt="">신고
          </div>
        </div>
      </div>
      <div class="content_wrap">
        <textarea class="content" readonly v-html="post.content"></textarea>
        <img v-if="post.img_url" class="image" :src="post.img_url" alt="load Error">
      </div>
      <div class="recommend_btn" @click="likePost">
        <img v-if="isLikedInPage" :src="require(`@/assets/img/recommend.png`)" id="likeSrc" alt="like">
        <img v-else :src="require(`@/assets/img/like.png`)" id="likeSrc" alt="like">
        <span>{{ post.like_count }}</span>
      </div>
      <div class="ad_area">
        <img src="@/assets/img/ad_test.png" alt="광고">
      </div>
      <div class="empty_line"></div>
      <odoq-comments-list-container :comments="comments" />
    </div>
    <odoq-post-list-container/>
    <nuxt-link to="/" class="back_list_btn">목록으로</nuxt-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment/moment";
import Utils from "@/plugins/utils";

export default {
  async asyncData({ store, req, params, redirect }) {
    // 쿠키 확인해서 로그인 정보 확인 및 갱신.
    const cookie = req? req.headers.cookie : document.cookie;
    if (Utils.getCookie(cookie, 'jwt')) {
      await store.dispatch('user/userAuthStore/checkLogin', cookie)
    }
    // 게시글 정보 받아오기
    const resPost = await store.dispatch('post/postStore/getPost', params.id);
    if (resPost.result==='error') redirect('/');
    // 댓글 정보 받아오기
    await store.dispatch('post/postStore/getComments', params.id);
  },
  computed: {
    ...mapGetters({
      post: 'post/postStore/post',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      comments: 'post/postStore/comments'
    }),
    isLikedInPage() {
      return this.post.liked_users.includes(this.userInfo.userId);
    }
  },
  async created() {
    this.isLikedInPage = this.post.liked_users.includes(this.userInfo.userId);
    // 게시글 목록 받아오기
    await this.$store.dispatch('post/postStore/getPosts', {
      pageNumber: this.$utils.getPageNumber(),
      pageSize: 7,
    });
  },
  methods: {
    createdAt(post) {
      // return moment(post.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(post.created_at).format('YYYY-MM-DD HH:mm:ss');
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
}
</script>
