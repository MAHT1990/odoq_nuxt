<template>
  <div class="comment_list_container">
    <div class="comment_list_filter">
      <button @click="emptyClick">
        최신순<i class="fa-solid fa-angle-down"></i>
      </button>
      <button @click="emptyClick">
        오늘의 댓글 추천순<i class="fa-solid fa-angle-down"></i>
      </button>
    </div>
    <div class="comment_list_filter_vertical_line"></div>
    <div class="comment_list_box">
      <OdoqPostLine
        v-for="post in arrayPost"
        :key="post.id"
        :post="post"
      />
    </div>
    <div class="comment_list_navigator">
      <button
        id="comment_list_navigator_prev"
        @click="prevPage"
      ><i class="fa-solid fa-angle-left"></i>&nbsp;이전</button>
      <div id="comment_list_navigator_page_numbering">{{currentPage}}/{{totalPages}}</div>
      <button
        id="comment_list_navigator_next"
        @click="nextPage"
      >다음&nbsp;<i class="fa-solid fa-angle-right"></i></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters({
      arrayPost: 'post/postStore/arrayPost',
      totalPosts: 'post/postStore/totalPosts',
      currentPage: 'post/postStore/currentPage',
      totalPages: 'post/postStore/totalPages',
    })
  },
  methods: {
    emptyClick() {
      console.log('emptyClick');
    },
    prevPage() {
      this.$store.dispatch('post/postStore/getPost', {
        pageNumber: this.currentPage - 1,
        pageSize: 7,
      });
    },
    nextPage() {
      this.$store.dispatch('post/postStore/getPost', {
        pageNumber: this.currentPage + 1,
        pageSize: 7,
      });
    }
  }
}
</script>
