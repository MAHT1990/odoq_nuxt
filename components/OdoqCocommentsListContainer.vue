<template>
  <ul class="cocomment_list">
    <li class="cocomment" v-for="cocomment in cocomments" :key="cocomment.id">
      <div class="user_info_box flex">
        <div class="level">{{ cocomment.user_level }}</div>
        <div class="nick_name">{{ cocomment.user_name }}</div>
      </div>
      <div class="comment_content" v-html="cocomment.content"></div>
      <span class="date">{{ createdAt(cocomment) }}</span>
<!--      <span class="date">{{ cocomment.created_at.split('T')[0] }}</span>-->
<!--      <span class="date">{{ cocomment.created_at.split('T')[1] }}</span>-->
    </li>
  </ul>
</template>

<script>
import moment from "moment";

export default {
  props: {
    cocomments: {
      type: Array,
      required: false,
    },
  },
  methods: {
    createdAt(cocomment) {
      // return moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss');
      return moment(cocomment.created_at).format('YY-MM-DD HH:mm:ss');
    },
  }
}
</script>

<style scoped>

</style>
