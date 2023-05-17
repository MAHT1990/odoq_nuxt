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
          <span class="layer" @click="writeMore">
            <img v-if="isAuthor || isWriter" src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 20C11.45 20 10.979 19.804 10.587 19.412C10.195 19.02 9.99934 18.5493 10 18C10 17.45 10.196 16.979 10.588 16.587C10.98 16.195 11.4507 15.9993 12 16C12.55 16 13.021 16.196 13.413 16.588C13.805 16.98 14.0007 17.4507 14 18C14 18.55 13.804 19.021 13.412 19.413C13.02 19.805 12.5493 20.0007 12 20ZM12 14C11.45 14 10.979 13.804 10.587 13.412C10.195 13.02 9.99934 12.5493 10 12C10 11.45 10.196 10.979 10.588 10.587C10.98 10.195 11.4507 9.99934 12 10C12.55 10 13.021 10.196 13.413 10.588C13.805 10.98 14.0007 11.4507 14 12C14 12.55 13.804 13.021 13.412 13.413C13.02 13.805 12.5493 14.0007 12 14ZM12 8C11.45 8 10.979 7.804 10.587 7.412C10.195 7.02 9.99934 6.54934 10 6C10 5.45 10.196 4.979 10.588 4.587C10.98 4.195 11.4507 3.99934 12 4C12.55 4 13.021 4.196 13.413 4.588C13.805 4.98 14.0007 5.45067 14 6C14 6.55 13.804 7.021 13.412 7.413C13.02 7.805 12.5493 8.00067 12 8Z' fill='%239D9D9D'/%3E%3C/svg%3E%0A" alt="더보기">
          </span>
          <ul class="layer_list" id="layerList">
            <li class="edit_text" @click="editPost">수정하기</li>
            <li class="delete_text" @click="deletePost">삭제하기</li>
          </ul>
          <div class="report">
            <img src="@/assets/img/alert.png" alt="">신고
          </div>
        </div>
<!--        <div>-->
<!--          <span>수정</span>-->
<!--          <span>삭제</span>-->
<!--        </div>-->
      </div>
      <div class="content_wrap">
        <pre class="content" v-html="post.content" :style="{ height: calculateHeight(post) + 'px' }"></pre>
        <img v-if="post.img_url" class="image" :src="post.img_url" alt="load Error">
      </div>
      <div class="recommend_btn" @click="likePost">
        <img v-if="isLikedInPage" :src="require(`@/assets/img/recommend.png`)" id="likeSrc" alt="like">
        <img v-else :src="require(`@/assets/img/like.png`)" id="likeSrc" alt="like">
        <span>{{ post.like_count }}</span>
      </div>
      <div class="ad_area">
        <img
          @click="moveToAd"
          src="@/assets/img/banner1.png"
          alt="광고">
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
  data: () => ({
    open: false,
  }),
  computed: {
    ...mapGetters({
      post: 'post/postStore/post',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      comments: 'post/postStore/comments'
    }),
    isLikedInPage() {
      return this.post.liked_users.includes(this.userInfo.userId);
    },
    isAuthor() {
      return this.post.user_id === this.userInfo.userId;
    },
    isWriter() {
      return [1, 2].includes(this.userInfo.userGrade);
    },
  },
  async beforeMount() {
    // 게시글 목록 받아오기
    await this.$store.dispatch('post/postStore/getPosts', {
      pageNumber: this.$utils.getPageNumber() || 1,
      pageSize: 7,
    });
    Utils.setReadPost(this.post.id);
    console.log('localStorage: ', localStorage);
  },
  methods: {
    calculateHeight() {
      return (post) => {
        const lineHeight = 'auto';
        const lines = post.content.split('\n');
        const lineCount = Math.max(lines.length, 1);
        return lineHeight * lineCount;
      };
    },
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
    writeMore() {
      const list = document.getElementById('layerList');
      this.open = !this.open;
      if (this.open === true) {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }
    },
    editPost() {
      // console.log('way to edit Post');
      this.$popup.showAlertPopup('게시글 수정은 준비중입니다.');
    },
    deletePost() {
      // console.log('way to delete Post');
      new this.$popup.PopConfirm({
        propsData: {
          title: '게시글을 삭제하시겠습니까?',
          okCallback: async (params) => {
            const res = await this.$store.dispatch('post/postStore/deletePost', {
              postId: this.post.id,
            });
            this.$popup.showAlertPopup(res.message);
            params.$destroy();
            this.$router.replace('/');
          },
        },
      }
      ).$mount();
    },
    moveToAd() {
      // move to http://jmmath9.com
      window.open('http://jmmath9.com', '_blank');
    },
  },
}
</script>
