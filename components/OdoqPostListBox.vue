<template>
  <div class="comment_list_box">
    <OdoqPostLine
      v-for="post in arrayPost"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters({
      arrayPost: 'post/postStore/arrayPost',
    })
  },
  watch: {
    'arrayPost': function (val) {
      console.log(val);
    },
  }
}
</script>

<style scoped>

</style>
