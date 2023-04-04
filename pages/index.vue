<template>
  <div id="index">
    <OdoqHeader/>
    <div class="verticalLine1"></div>
    <OdoqMainContainer/>
  </div>
</template>

<script>

import Utils from "@/plugins/utils";

export default {
  async asyncData({ store, req }) {
    console.log('## asyncData in index.vue called');
    // 로그인 CHECK.
    try {
      const cookie = req? req.headers.cookie : document.cookie;
      if (Utils.getCookie(cookie, 'jwt')) {
        // console.log('## jwt cookie exists. (index.vue)', Utils.getCookie(cookie, 'jwt'));
        store.commit(
          'user/userAuthStore/checkLogin',
          {isLogin: true, cookie})
      };
    } catch (TypeError) {
      console.log('TypeError');
    }

    // SMS 동의여부 받아오기.
    await store.dispatch('sms/smsStore/getAcceptSms', {
      userId: store.getters['user/userAuthStore/userInfo'].userId,
    });

    // 문제 받아오기
    await store.dispatch('question/questionStore/getQuestion');

    // 문항 관련 사용자 History 받아오기.
    await store.dispatch('question/questionStore/getAnswerHistory',
      {
        userId: store.getters['user/userAuthStore/userInfo'].userId,
        questionId: store.getters['question/questionStore/question'].id,
      }
    );

    // 댓글 받아오기
    await store.dispatch('post/postStore/getPost', {
      pageNumber: 1,
      pageSize: 7,
    });

    // 공지사항 받아오기
    await store.dispatch('notice/noticeStore/getNotice');

  },
  mounted() {
    console.log(this.$utils);
  }
}
</script>
