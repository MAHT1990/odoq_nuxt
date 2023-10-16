<template>
  <div id="index">
    <OdoqHeader/>
<!--    <div class="verticalLine1"></div>-->
    <OdoqMainContainer/>
  </div>
</template>

<script>

import Utils from "@/plugins/utils";

export default {
  async asyncData({ store, req, redirect }) {
    // console.log('## asyncData in index.vue called');
    // 로그인 CHECK.
    const cookie = req? req.headers.cookie : document.cookie;
    if (Utils.getCookie(cookie, 'jwt')) {
        await store.dispatch('user/userAuthStore/checkLogin', cookie)
    }

    // SMS 동의여부 받아오기.
    await store.dispatch('sms/smsStore/getAcceptSms', {
      userId: store.getters['user/userAuthStore/userInfo'].userId,
    })
    // 문제 받아오기
    await store.dispatch('question/questionStore/getQuestion');

    // 문항 관련 사용자 History 받아오기.
    await store.dispatch('question/questionStore/getAnswerHistory',
      {
        userId: store.getters['user/userAuthStore/userInfo'].userId,
        questionId: store.getters['question/questionStore/question'].id,
      }
    )
    // 게시글 받아오기
    await store.dispatch('post/postStore/getPosts', {
      pageNumber: 1,
      pageSize: store.state.post.postStore.defaultPageSize,
    });
    // 공지사항 받아오기
    await store.dispatch('notice/noticeStore/getNotices', {
      pageNumber: 1,
      pageSize: store.state.notice.noticeStore.defaultPageSize,
    });

  },
  mounted() {
    if (!this.$store.getters['user/userAuthStore/isLogin']) {
      Utils.removeCookie('jwt');
    }
  }
}
</script>
