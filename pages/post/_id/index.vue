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
      <div class="recommend_btn" @click="onLike">
        <img :src="require(`@/assets/img/like.png`)" id="likeSrc" alt="like">
        <span>{{ post.like_count }}</span>
      </div>
      <div class="ad_area">
        <img src="@/assets/img/ad_test.png" alt="광고">
      </div>
      <div class="empty_line"></div>
      <odoq-comments :comments="comments" />
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
  async asyncData({ store, req, params }) {
    const cookie = req? req.headers.cookie : document.cookie;
    if (Utils.getCookie(cookie, 'jwt')) {
      await store.dispatch('user/userAuthStore/checkLogin', cookie)
    }
    await store.dispatch('post/postStore/getPost', params.id);
    // 게시글 받아오기
    await store.dispatch('post/postStore/getPosts', {
      pageNumber: 1,
      pageSize: 7,
    });
  },
  computed: {
    ...mapGetters({
      post: 'post/postStore/post',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
    }),
  },
  data: () => ({
    comments: [
      {
        level: 1,
        nickName: '고양이',
        content: '아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음',
        create_at: '16:30',
        hits: 123,
        cocomments: [
          {
            level: 12,
            nickName: '강아지',
            content: '아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음',
            create_at: '2023.04.09T16:30',
          },
          {
            level: 23,
            nickName: '오리',
            content: '로또 1등 당첨되면 하고 싶은 것은?',
            create_at: '2023.04.09T02:23',
          },
        ],
      },
      {
        level: 2,
        nickName: '공룡고기',
        content: '이거보고 정신이 번쩍 들어서 모닝 코딩',
        create_at: '06:30',
        hits: 321,
      }
    ],
  }),
  methods: {
    createdAt(post) {
      // return moment(post.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(post.created_at).format('YYYY-MM-DD HH:mm:ss');
    },
    onLike() {
      this.contents.like = !this.contents.like;
      if (this.contents.like === true) {
        this.contents.likeCount ++;
        this.contents.likeSrc = 'recommend.png';
      } else {
        this.contents.likeCount --;
        this.contents.likeSrc = 'like.png';
      }
    },
  },
}
</script>
