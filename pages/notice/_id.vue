<template>
  <div class="post_detail_wrap">
    <!--    <odoq-tabs />-->
    <div class="post_detail_contents_wrap">
      <div class="title_box">
        <textarea name="" id="" cols="30" rows="10" v-html="notice.title" readonly></textarea>
        <div class="post_info_box">
          <span class="grade">{{ notice.user_level }}</span>
          <span class="nick_name">{{ notice.user_name }}</span>
          <span class="date">{{ createdAt(notice) }}</span>
          <span class="hits">조회수 {{ notice.hit_count }}</span>
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
      </div>
      <div class="content_wrap">
        <div class="download"><i class="fa-solid fa-file-pdf"></i><a @click="downloadFile">{{notice.file_name.split('/')[1]}}</a></div>
        <div class="content" v-html="notice.content"></div>
        <img v-if="notice.img_url" class="image" :src="notice.img_url" alt="load Error">
      </div>
<!--      <div class="recommend_btn" @click="likePost">-->
<!--        <img v-if="isLikedInPage" :src="require(`@/assets/img/recommend.png`)" id="likeSrc" alt="like">-->
<!--        <img v-else :src="require(`@/assets/img/like.png`)" id="likeSrc" alt="like">-->
<!--        <span>{{ notice.like_count }}</span>-->
<!--      </div>-->
      <div class="ad_area">
        <img
          @click="moveToAd"
          src="@/assets/img/banner2.png"
          alt="광고">
      </div>
      <div class="empty_line"></div>
      <odoq-comments-list-container :comments="comments" />
    </div>
    <odoq-notice-list-container />
    <nuxt-link to="/" class="back_list_btn">메인으로</nuxt-link>
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
    // 공지글 정보 받아오기
    const resNotice = await store.dispatch('notice/noticeStore/getNotice', params.id);
    if (resNotice.result==='error') redirect('/');
    // 댓글 정보 받아오기
    await store.dispatch('notice/noticeStore/getComments', params.id);
  },
  data: () => ({
    open: false,
  }),
  computed: {
    ...mapGetters({
      notice: 'notice/noticeStore/notice',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      comments: 'notice/noticeStore/comments'
    }),
    downloadUrl() {
      return this.$utils.getDownloadUrl(this.notice.file_name);
    },
    isAuthor() {
      return this.notice.user_id === this.userInfo.userId;
    },
    isWriter() {
      return [1, 2].includes(this.userInfo.userGrade);
    },
  },
  async beforeMount() {
    // 게시글 목록 받아오기
    await this.$store.dispatch('notice/noticeStore/getNotices', {
      pageNumber: this.$utils.getPageNumber('notice') || 1,
      pageSize: this.$store.state.notice.noticeStore.defaultPageSize,
    });
    Utils.setRead('notice', this.notice.id);
    // console.log('localStorage: ', localStorage);
  },
  methods: {
    createdAt(post) {
      // return moment(notice.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(this.notice.created_at).format('YYYY-MM-DD HH:mm:ss');
    },
    async likePost(){
      if (this.isLogin) {
        const resData = await this.$store.dispatch('post/postStore/likePost', {
          postId: this.notice.id,
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
    async downloadFile() {
      // console.log('downloadFile');
      // console.log('this.notice.file_url: ', this.notice.file_url);
      // console.log('this.downloadUrl: ', this.downloadUrl);
      try {
        const res = await this.$axios.$get(this.downloadUrl, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.notice.file_name.split('/')[1]);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.log('파일 다운로드에 실패했습니다.', err);
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
                postId: this.notice.id,
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

