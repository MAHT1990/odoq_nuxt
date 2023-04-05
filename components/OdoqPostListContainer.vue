<template>
  <div class="comment_list_container">
    <div class="comment_list_filter">
      <button
        ref="buttonOrderAll"
        @click="orderPost('latest')"
      >최신순<i class="fa-solid fa-angle-down"></i>
      </button>
      <button
        ref="buttonOrderMy"
        @click="orderPost('likeCount')"
      >추천순<i class="fa-solid fa-angle-down"></i>
      </button>
    </div>
    <div class="comment_list_filter_vertical_line"></div>
    <div class="comment_list_box">
      <OdoqPostLine
        v-for="post in arrayPosts"
        :key="post.id"
        :post="post"
        :user-info="userInfo"
        :is-login="isLogin"
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
  props: {
    filteringFlag: {
      type: String,
      default: 'all',
    }
  },
  data () {
    return {
      orderingFlag: '',
      buttonColor: {
        activated: 'rgba(0, 81, 200, 255)',
        deactivated: 'rgba(153, 153, 153, 255)',
      },
    };
  },
  computed: {
    ...mapGetters({
      arrayPosts: 'post/postStore/arrayPosts',
      totalPosts: 'post/postStore/totalPosts',
      currentPage: 'post/postStore/currentPage',
      totalPages: 'post/postStore/totalPages',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
    }),
  },
  watch: {
    /**
     * @description
     * 1. filteringFlag가 변경되면, 해당 filteringFlag에 맞게 post를 나열.
     * @return {Promise<void>}
     */
    async filteringFlag() {
      await this.$store.dispatch('post/postStore/getPost', {
        pageNumber: 1,
        pageSize: 7,
        filteringFlag: this.filteringFlag,
        userId: this.userInfo.userId,
      });
    },
    /**
     * @description
     * 1. orderingFlag가 변경되면, 해당 orderingFlag에 맞는 색상으로 버튼 색상을 변경한다.
     */
    orderingFlag() {
      this.$refs.buttonOrderAll.style.color = this.orderingFlag === 'latest' ? this.buttonColor.activated : this.buttonColor.deactivated;
      this.$refs.buttonOrderMy.style.color = this.orderingFlag === 'likeCount' ? this.buttonColor.activated : this.buttonColor.deactivated;
    },
  },
  methods: {
    /**
     * @description
     * 1. orderingFlag를 변경하고, 해당 orderingFlag에 맞게 post를 나열한다.
     * 2. orderingFlag가 변경되지 않으면, 아무것도 하지 않는다.
     * 3. 부모로부터 받은 filteringFlag를 함께 전달해야.
     * @param orderingFlag
     * @return {Promise<void>}
     */
    orderPost(orderingFlag) {
      if (this.orderingFlag === orderingFlag) return
      this.orderingFlag = orderingFlag;
      this.$store.dispatch('post/postStore/getPost', {
        pageNumber: 1,
        pageSize: 7,
        filteringFlag: this.filteringFlag,
        orderingFlag: this.orderingFlag,
        userId: this.userInfo.userId,
      });
    },
    prevPage() {
      this.$store.dispatch('post/postStore/getPost', {
        pageNumber: this.currentPage === 1 ? this.currentPage : this.currentPage - 1,
        pageSize: 7,
      });
    },
    nextPage() {
      this.$store.dispatch('post/postStore/getPost', {
        pageNumber: this.currentPage === this.totalPages ? this.currentPage : this.currentPage + 1,
        pageSize: 7,
      });
    }
  }
}
</script>
