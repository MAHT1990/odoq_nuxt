<template>
  <div class="comment_line">
    <div class="comment_line_user_and_updated_at_and_tool_box">
      <div class="comment_line_user_and_updated_at">
        <div class="comment_line_user">{{post.user}}</div>
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
        <i class="fa-solid fa-caret-down"></i>답글 (댓글 개수)
      </button>
      <button class="comment_like">
        <i class="fa-regular fa-thumbs-up"></i>&nbsp;<span>{{post.like_count}}</span>
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
    }
  },
  methods: {
    openToolBox(){
      console.log('ToolBox goes heeeeeere');
    }
  }
}
</script>

<style scoped>

</style>
