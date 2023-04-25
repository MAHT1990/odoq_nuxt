<template>
  <div class="post_detail_wrap">
<!--    <odoq-tabs />-->
    <div class="post_detail_contents_wrap">
      <div class="title_box">
        <textarea name="" id="" cols="30" rows="10" v-html="contents.title" readonly></textarea>
        <div class="post_info_box">
          <span class="level">{{ contents.level }}</span>
          <span class="nick_name">{{ contents.nickName }}</span>
          <span class="date">{{ contents.create_at }}</span>
          <span class="hits">조회수 {{ contents.hits }}</span>
          <div class="report">
            <img src="@/assets/img/alert.png" alt="">신고
          </div>
        </div>
      </div>
      <div class="content_wrap">
        <textarea class="content" readonly v-html="contents.content"></textarea>
      </div>
      <div class="recommend_btn" @click="onLike">
        <img :src="require(`@/assets/img/${contents.likeSrc}`)" id="likeSrc" alt="like">
        <span>{{ contents.likeCount }}</span>
      </div>
      <div class="ad_area">
        <img src="@/assets/img/ad_test.png" alt="광고">
      </div>
      <div class="empty_line"></div>
      <odoq-comments :comments="comments" />
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    contents: {
      title: '국어 수학 어려움',
      level: 1,
      nickName: '고양이',
      create_at: '16:30',
      hits: 123,
      content: '국어 수학도 어렵지만 코딩도 어려워요',
      like: false,
      likeCount: 0,
      likeSrc: 'like.png',
    },
    comments: [
      {
        level: 1,
        nickName: '고양이',
        content: '아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음아 대학 학점도 지금 가망이 없음',
        create_at: '16:30',
        hits: 123,
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
