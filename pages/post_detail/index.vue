<template>
  <div class="post_detail_wrap">
<!--    <odoq-tabs />-->
    <div class="post_detail_contents_wrap">
      <div class="title_box">
        <textarea name="" id="" cols="30" rows="10" v-html="title" readonly></textarea>
        <div class="post_info_box">
          <span class="level">{{ level }}</span>
          <span class="nick_name">{{ nickName }}</span>
          <span class="date">{{ create_at }}</span>
          <span class="hits">조회수 {{ hits }}</span>
          <div class="report">
            <img src="@/assets/img/alert.png" alt="">신고
          </div>
        </div>
      </div>
      <div class="content_wrap">
        <textarea readonly v-html="content" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="recommend_btn" @click="onLike">
        <img src="@/assets/img/like.png" alt="like">
        <span>{{ likeCount }}</span>
      </div>
      <div class="ad_area">
        <img src="@/assets/img/ad_test.png" alt="광고">
      </div>
      <div class="empty_line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    title: '국어 수학 어려움',
    level: 1,
    nickName: '고양이',
    create_at: '16:30',
    hits: 123,
    content: '국어 수학도 어렵지만 코딩도 어려워요',
    like: false,
    likeCount: 0,
  }),
  methods: {
    onLike() {
      this.like = !this.like;
      if (this.like === true) {
        this.likeCount ++;
      } else {
        this.likeCount --;
      }
    },
  },
}
</script>
