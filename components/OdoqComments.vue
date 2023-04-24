<template>
  <div class="comments_wrap">
    <ul class="comments_list">
      <li class="comment" v-for="item in comments" :key="item.nickName">
        <div class="user_info_box flex">
          <div class="level">{{ item.level }}</div>
          <div class="nick_name">{{ item.nickName }}</div>
        </div>
        <div class="comment_content" v-html="item.content"></div>
        <div class="content_info_box">
          <span class="date">{{ item.create_at }}</span>
          <span class="hits">조회수 {{ item.hits }}</span>
          <button class="reply_btn">답글쓰기</button>
        </div>
      </li>
    </ul>
    <div class="write_comment_box flex">
      <textarea name="" id="" cols="30" rows="3"></textarea>
      <button class="comment_regist_btn">댓글</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OdoqComments",
  props: {
    comments: Array,
  },
}
</script>
