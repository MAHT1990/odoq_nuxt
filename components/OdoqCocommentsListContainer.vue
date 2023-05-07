<template>
  <ul class="cocomment_list" v-if="cocomments">
    <li class="cocomment" v-for="cocomment in cocomments" :key="cocomment">
      <div class="user_info_box flex">
        <div class="level">{{ cocomment.level }}</div>
        <div class="nick_name">{{ cocomment.nickName }}</div>
      </div>
      <div class="comment_content" v-html="cocomment.content"></div>
      <span class="date">{{ cocomment.created_at.split('T')[0] }}</span>
      <span class="date">{{ cocomment.created_at.split('T')[1] }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cocomments: {
      type: Array,
      required: false,
    },
  }
}
</script>

<style scoped>

</style>
