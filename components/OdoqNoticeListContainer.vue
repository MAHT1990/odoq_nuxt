<template>
  <div>
    <odoq-notice-line
      v-for="item in notices"
      :item="item"
      :key="item.title"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      notices: 'notice/noticeStore/notices'
    }),
  },
}
</script>

<style scoped>

</style>
