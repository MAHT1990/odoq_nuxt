<template>
  <li class="comment">
    <div class="user_info_box flex">
      <div class="level">{{ comment.user_level }}</div>
      <div class="nick_name">{{ comment.user_name }}</div>
    </div>
    <div v-if="!comment.blind" class="comment_content" v-html="comment.content"></div>
    <div v-else class="comment_content" v-html="comment.blind_text"></div>
    <div class="content_info_box">
      <span class="date">{{ comment.created_at }}</span>
      <button class="reply_btn">답글쓰기</button>
    </div>
    <odoq-cocomments-list-container :cocomments="comment.cocoments" />
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>
