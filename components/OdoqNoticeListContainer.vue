<template>
  <div class="notice_list_container">
    <div>
      <odoq-notice-line
        v-for="notice in headNotices"
        :notice="notice"
        :key="notice.id"
      />
      <odoq-notice-line
        v-for="notice in expiredNotices"
        :notice="notice"
        :key="notice.id"
      />
    </div>
    <div
      v-if="hasNavigator"
      class="comment_list_navigator"
    >
      <button
        class="pagination_btn"
        id="comment_list_navigator_prev"
        @click="prevPage"
      ><i class="fa-solid fa-angle-left"></i>&nbsp;이전</button>
      <div id="comment_list_navigator_page_numbering">{{currentPage}}/{{totalPages}}</div>
      <button
        class="pagination_btn"
        id="comment_list_navigator_next"
        @click="nextPage"
      >다음&nbsp;<i class="fa-solid fa-angle-right"></i></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    headOnly: {
      type: Boolean,
      default: false,
    },
    hasNavigator: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      notices: 'notice/noticeStore/notices',
      currentPage: 'notice/noticeStore/currentPage',
      totalPages: 'notice/noticeStore/totalPages',
    }),
    headNotices() {
      return this.notices.filter(notice => notice.is_display)
    },
    expiredNotices() {
      return this.headOnly
        ? []
        : this.notices.filter(notice => !notice.is_display)
    },
  },
  methods: {
    prevPage() {
      const pageNumber = this.currentPage === 1 ? this.currentPage : this.currentPage - 1;
      this.$store.dispatch('notice/noticeStore/getNotices', {
        pageNumber,
        pageSize: this.$store.state.notice.noticeStore.defaultPageSize,
      });
      this.$utils.setPageNumber('notice', pageNumber);
    },
    nextPage() {
      const pageNumber = this.currentPage === this.totalPages ? this.currentPage : this.currentPage + 1;
      this.$store.dispatch('notice/noticeStore/getNotices', {
        pageNumber,
        pageSize: this.$store.state.notice.noticeStore.defaultPageSize,
      });
      this.$utils.setPageNumber('notice', pageNumber);
    },
  }
}
</script>

<style scoped>

</style>
