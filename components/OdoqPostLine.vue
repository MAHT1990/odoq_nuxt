<template>
  <div
    class="comment_line_box"
    @click="movePostDetail"
    :style="readPostStyle">
    <div style="width: 90%">
      <div
        class="comment_line_content">
        <div class="title">
          <i v-if="isSolution" class="fa-solid fa-pen">&nbsp;</i><span
          @mouseover="underline"
          @mouseleave="removeUnderline"
          :style="titleStyle"
        >{{ post.title }}</span>&nbsp;&nbsp;&nbsp;<i v-if="post.img_url" class="fa-solid fa-image"></i></div>
      </div>
      <!--    <div v-if="post.img_url && !post.blind" class="comment_line_image">-->
      <!--      <button @click="toggleShowImg">-->
      <!--        <i class="fa-solid fa-image"></i><span>&nbsp;&nbsp;{{showImg ? '숨기기' : '보기'}}</span>-->
      <!--      </button>-->
      <!--      <img-->
      <!--        v-if="showImg"-->
      <!--        :src="post.img_url"-->
      <!--        alt="이미지로드 실패"/>-->
      <!--    </div>-->
      <div class="content_info_box">
        <div class="content_info_tools">
          <div class="comment_line_user">
            <span class="grade" :class="getLevel(post.user_level)">{{ post.user_level }}</span>
            <span class="nick_name">{{ post.user_name }}</span>
            <!--          <i v-if="post.user_grade" class="fa-solid fa-crown" style="color:rgba(255, 171, 0, 0.8);"></i>-->
          </div>
          <div class="updated_at">{{ formattedUpdatedTime.split(' ')[0] }}</div>
          <div class="hits">조회수 {{ post.hit_count }}</div>
          <div class="comment_line_cocomment_and_like">
            <button class="comment_line_open_cocomment">
              <!--        <i class="fa-solid fa-caret-down"></i>답글 (댓글 개수)-->
            </button>
            <button class="comment_like">
              <i v-if="isLiked" class="fa-solid fa-thumbs-up"></i>
              <i v-else class="fa-regular fa-thumbs-up"></i>
              <span>{{ post.like_count }}</span>
            </button>
          </div>
        </div>
        <!--      <div class="comment_line_tool_box_btn_and_box">-->
        <!--        <button-->
        <!--          v-if="isWriter"-->
        <!--          class="comment_line_tool_box_btn"-->
        <!--          @click="openToolBox"-->
        <!--        ><i class="fa-solid fa-ellipsis-vertical"></i></button>-->
        <!--      </div>-->
      </div>
      <!--    <div class="comment_line_vertical_line"></div>--></div>
    <div class="comment_count_box">
      <div class="comment_count" :class="post.comments_count > 0 ? 'on' : ''">{{post.comments_count}}</div>
      <span>댓글</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Utils from "@/plugins/utils";
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
    defaultColor: '#000000',
    readColor: 'darkgray',
    isRead: false,
    currentPost: false,
  }),
  computed: {
    isWriter() {
      return parseInt(this.userInfo.userId, 10) === parseInt(this.post.user_id, 10) || parseInt(this.userInfo.userGrade, 10) === 2;
      // code above is too long, so I changed it to below:
    },
    formattedUpdatedTime() { return moment(this.post.created_at).format('YYYY-MM-DD HH:mm'); },
    isLiked() { return this.post.liked_users.includes(this.userInfo.userId); },
    isSolution() { return this.post.type.includes('solution'); },
    questionCode() { return this.post.type.split('_')[1]; },
    readPostStyle() {
      return {
        backgroundColor: this.currentPost ? '#f5f5f5' : 'white',
        color: this.isRead || this.currentPost ? this.readColor : this.defaultColor,
      }
    },
    titleStyle() {
      return {
        fontWeight: this.isSolution ? 'bold' : 'normal',
      }
    },
  },
  methods: {
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
    // toggleShowImg() {
    //   this.showImg = !this.showImg;
    // },
    movePostDetail() {
      this.$router.push({
        path: `/post/${this.post.id}`,
      });
    },
    underline(e) {
      e.target.style.textDecoration = 'underline';
    },
    removeUnderline(e) {
      e.target.style.textDecoration = 'none';
    }
  },
  beforeMount() {
    this.isRead = Utils.getReadPost() ? Utils.getReadPost().includes(this.post.id) : false;
    this.currentPost = parseInt(this.$route.params.id, 10) === parseInt(this.post.id, 10);
  }
}
</script>
